import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CodeBlockCombiner } from './src/CodeBlockCombiner';
import { CombineCodeBlocksSettings } from './src/types';

const DEFAULT_SETTINGS: CombineCodeBlocksSettings = {
	separatorText: '\n\n// --- Next Code Block ---\n\n',
	languageDetection: true,
	languageIncludeList: [],
	languageExcludeList: [],
	groupByLanguage: false,
	includeSourceReference: false,
	// Styling options
	useCalloutStyle: true,
	calloutType: 'example',
	calloutFormatting: 'header-only',
	enhancedStyling: true,
	customHeaderIcon: '⚡',
	showLanguageLabels: true,
	useCollapsibleSections: false
}

export default class CombineCodeBlocksPlugin extends Plugin {
	settings: CombineCodeBlocksSettings;
	private codeBlockCombiner: CodeBlockCombiner;

	async onload() {
		await this.loadSettings();
		
		this.codeBlockCombiner = new CodeBlockCombiner(this.settings);

		// Add command to combine code blocks
		this.addCommand({
			id: 'combine-code-blocks',
			name: 'Combine Code Blocks',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.combineCodeBlocks(editor, view);
			}
		});



		// Add settings tab
		this.addSettingTab(new CombineCodeBlocksSettingTab(this.app, this));
	}

	onunload() {
		// Cleanup if needed
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		// Update the CodeBlockCombiner if it exists
		if (this.codeBlockCombiner) {
			this.codeBlockCombiner = new CodeBlockCombiner(this.settings);
		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
		// Update the CodeBlockCombiner with new settings
		this.codeBlockCombiner = new CodeBlockCombiner(this.settings);
	}



	private combineCodeBlocks(editor: Editor, view: MarkdownView) {
		try {
			const content = editor.getValue();
			
			// Validate content
			if (!content || content.trim().length === 0) {
				new Notice('Document is empty or contains no content.');
				return;
			}
			
			const resolvedSettings = this.codeBlockCombiner.resolveSettings(content);
			const combinedBlock = this.codeBlockCombiner.combineCodeBlocks(content, resolvedSettings);
			
					if (combinedBlock) {
			try {
				// Always append to the end of the note
				const newContent = content + '\n\n' + combinedBlock;
				editor.setValue(newContent);
				new Notice('Code blocks combined successfully!');
			} catch (insertError) {
				console.error('Error inserting combined block:', insertError);
				new Notice('Error inserting combined block. Please try again.');
			}
		} else {
				new Notice('No code blocks found to combine.');
			}
		} catch (error) {
			console.error('Error combining code blocks:', error);
			new Notice('An error occurred while combining code blocks. Please check the console for details.');
		}
	}


}

class CombineCodeBlocksSettingTab extends PluginSettingTab {
	plugin: CombineCodeBlocksPlugin;

	constructor(app: App, plugin: CombineCodeBlocksPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		containerEl.createEl('h2', {text: 'Combine Code Blocks Settings'});

		new Setting(containerEl)
			.setName('Separator Text')
			.setDesc('Text to insert between combined code blocks')
			.addText(text => text
				.setPlaceholder('Enter separator text')
				.setValue(this.plugin.settings.separatorText)
				.onChange(async (value) => {
					this.plugin.settings.separatorText = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Language Detection')
			.setDesc('Automatically detect the most common language')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.languageDetection)
				.onChange(async (value) => {
					this.plugin.settings.languageDetection = value;
					await this.plugin.saveSettings();
				}));



		new Setting(containerEl)
			.setName('Language Include List')
			.setDesc('Comma-separated list of languages to include (leave blank for all)')
			.addText(text => text
				.setPlaceholder('e.g. python,javascript')
				.setValue((this.plugin.settings.languageIncludeList || []).join(','))
				.onChange(async (value) => {
					this.plugin.settings.languageIncludeList = value.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Language Exclude List')
			.setDesc('Comma-separated list of languages to exclude')
			.addText(text => text
				.setPlaceholder('e.g. markdown')
				.setValue((this.plugin.settings.languageExcludeList || []).join(','))
				.onChange(async (value) => {
					this.plugin.settings.languageExcludeList = value.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
					await this.plugin.saveSettings();
				}));



		new Setting(containerEl)
			.setName('Group by Language')
			.setDesc('Group combined code blocks by language in the output')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.groupByLanguage || false)
				.onChange(async (value) => {
					this.plugin.settings.groupByLanguage = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Include Source Reference')
			.setDesc('Add a comment before each combined block indicating its original line number or section')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.includeSourceReference || false)
				.onChange(async (value) => {
					this.plugin.settings.includeSourceReference = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Use Callout Style')
			.setDesc('Use a callout style for the combined code block')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.useCalloutStyle ?? true)
				.onChange(async (value) => {
					this.plugin.settings.useCalloutStyle = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Callout Type')
			.setDesc('Type of callout to use')
			.addDropdown(drop => drop
				.addOption('example', 'Example')
				.addOption('note', 'Note')
				.addOption('tip', 'Tip')
				.addOption('info', 'Info')
				.addOption('success', 'Success')
				.addOption('warning', 'Warning')
				.addOption('error', 'Error')
				.addOption('quote', 'Quote')
				.setValue(this.plugin.settings.calloutType || 'example')
				.onChange(async (value) => {
					this.plugin.settings.calloutType = value as any;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Callout Formatting')
			.setDesc('Formatting style for the callout')
			.addDropdown(drop => drop
				.addOption('header-only', 'Header Only')
				.addOption('full-content', 'Full Content')
				.addOption('compact', 'Compact')
				.setValue(this.plugin.settings.calloutFormatting || 'header-only')
				.onChange(async (value) => {
					this.plugin.settings.calloutFormatting = value as any;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Enhanced Styling')
			.setDesc('Use enhanced styling for the combined code block')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enhancedStyling ?? true)
				.onChange(async (value) => {
					this.plugin.settings.enhancedStyling = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Custom Header Icon')
			.setDesc('Custom icon to use for the combined code block')
			.addText(text => text
				.setPlaceholder('Enter custom icon')
				.setValue(this.plugin.settings.customHeaderIcon || '')
				.onChange(async (value) => {
					this.plugin.settings.customHeaderIcon = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Show Language Labels')
			.setDesc('Show language labels for each combined code block')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.showLanguageLabels ?? true)
				.onChange(async (value) => {
					this.plugin.settings.showLanguageLabels = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Use Collapsible Sections')
			.setDesc('Use collapsible sections for the combined code block')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.useCollapsibleSections || false)
				.onChange(async (value) => {
					this.plugin.settings.useCollapsibleSections = value;
					await this.plugin.saveSettings();
				}));
	}
} 