import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CodeBlockCombiner } from './src/CodeBlockCombiner';
import { CombineCodeBlocksSettings } from './src/types';

const DEFAULT_SETTINGS: CombineCodeBlocksSettings = {
	separatorText: '\n\n// --- Next Code Block ---\n\n',
	languageDetection: true,
	preserveOriginalBlocks: true,
	languageIncludeList: [],
	languageExcludeList: [],
	outputLocation: 'bottom',
	outputHeadingText: '🧩 Combined Code Blocks',
	groupByLanguage: false,
	includeSourceReference: false,
	// New styling options
	useCalloutStyle: true,
	calloutType: 'example',
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

		// Add command to remove combined code block
		this.addCommand({
			id: 'remove-combined-code-block',
			name: 'Remove Combined Code Block',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.removeCombinedCodeBlock(editor, view);
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
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	private combineCodeBlocks(editor: Editor, view: MarkdownView) {
		const content = editor.getValue();
		const resolvedSettings = this.codeBlockCombiner.resolveSettings(content);
		const combinedBlock = this.codeBlockCombiner.combineCodeBlocks(content, resolvedSettings);
		if (combinedBlock) {
			let newContent = content;
			// Remove existing combined block if it exists
			const lines = content.split('\n');
			const lastCombinedBlockIndex = this.findLastCombinedBlockIndex(lines);
			if (lastCombinedBlockIndex !== -1) {
				lines.splice(lastCombinedBlockIndex, lines.length - lastCombinedBlockIndex);
				newContent = lines.join('\n');
			}
			const location = resolvedSettings.outputLocation || 'bottom';
			if (location === 'top') {
				newContent = combinedBlock + '\n\n' + newContent;
			} else if (location === 'afterHeading') {
				// Look for a specific heading pattern that user wants to insert after
				const targetHeading = resolvedSettings.outputHeadingText || '🧩 Combined Code Blocks (auto-generated)';
				// Remove the emoji and special chars for a more flexible search
				const cleanHeading = targetHeading.replace(/[^\w\s]/g, '').trim();
				const headingRegex = new RegExp(`^#+\\s+.*${cleanHeading.split(' ').join('.*')}.*$`, 'mi');
				const headingMatch = newContent.match(headingRegex);
				if (headingMatch) {
					const insertPos = newContent.indexOf(headingMatch[0]) + headingMatch[0].length;
					newContent = newContent.slice(0, insertPos) + '\n\n' + combinedBlock + newContent.slice(insertPos);
				} else {
					// fallback to bottom
					newContent = newContent + '\n\n' + combinedBlock;
				}
			} else if (location === 'atCursor') {
				const cursor = editor.getCursor();
				const cursorIndex = editor.posToOffset(cursor);
				// Insert at cursor with proper spacing
				const beforeCursor = newContent.slice(0, cursorIndex);
				const afterCursor = newContent.slice(cursorIndex);
				const needsSpaceBefore = beforeCursor.length > 0 && !beforeCursor.endsWith('\n');
				const needsSpaceAfter = afterCursor.length > 0 && !afterCursor.startsWith('\n');
				newContent = beforeCursor + 
					(needsSpaceBefore ? '\n\n' : '') + 
					combinedBlock + 
					(needsSpaceAfter ? '\n\n' : '') + 
					afterCursor;
			} else {
				// bottom (default)
				newContent = newContent + '\n\n' + combinedBlock;
			}
			editor.setValue(newContent);
			new Notice('Code blocks combined successfully!');
		} else {
			new Notice('No code blocks found to combine.');
		}
	}

	private removeCombinedCodeBlock(editor: Editor, view: MarkdownView) {
		const content = editor.getValue();
		const lines = content.split('\n');
		const lastCombinedBlockIndex = this.findLastCombinedBlockIndex(lines);
		
		if (lastCombinedBlockIndex !== -1) {
			lines.splice(lastCombinedBlockIndex, lines.length - lastCombinedBlockIndex);
			editor.setValue(lines.join('\n'));
			new Notice('Combined code block removed!');
		} else {
			new Notice('No combined code block found to remove.');
		}
	}

	private findLastCombinedBlockIndex(lines: string[]): number {
		// Look for the combined code block heading pattern (more robust)
		for (let i = lines.length - 1; i >= 0; i--) {
			const line = lines[i];
			// Check for the heading pattern that indicates a combined block
			if (line.match(/^##\s+.*[Cc]ombined.*[Cc]ode.*[Bb]locks.*/)) {
				return i;
			}
		}
		return -1;
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
			.setName('Preserve Original Blocks')
			.setDesc('Keep original code blocks when combining')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.preserveOriginalBlocks)
				.onChange(async (value) => {
					this.plugin.settings.preserveOriginalBlocks = value;
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
			.setName('Output Location')
			.setDesc('Where to insert the combined code block')
			.addDropdown(drop => drop
				.addOption('top', 'Top of note')
				.addOption('bottom', 'Bottom of note')
				.addOption('afterHeading', 'After heading')
				.addOption('atCursor', 'At cursor')
				.setValue(this.plugin.settings.outputLocation || 'bottom')
				.onChange(async (value) => {
					this.plugin.settings.outputLocation = value as any;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Output Heading Text')
			.setDesc('Heading text to display above the combined code block')
			.addText(text => text
				.setPlaceholder('e.g. 🧩 Combined Code Blocks (auto-generated)')
				.setValue(this.plugin.settings.outputHeadingText || '')
				.onChange(async (value) => {
					this.plugin.settings.outputHeadingText = value;
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
				.setValue(this.plugin.settings.useCalloutStyle || false)
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
				.addOption('warning', 'Warning')
				.setValue(this.plugin.settings.calloutType || 'example')
				.onChange(async (value) => {
					this.plugin.settings.calloutType = value as any;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Enhanced Styling')
			.setDesc('Use enhanced styling for the combined code block')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enhancedStyling || false)
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
				.setValue(this.plugin.settings.showLanguageLabels || false)
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