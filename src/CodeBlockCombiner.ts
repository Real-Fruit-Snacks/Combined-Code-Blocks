import { CodeBlock, CombineCodeBlocksSettings } from './types';
import * as yaml from 'js-yaml';

export class CodeBlockCombiner {
	private settings: CombineCodeBlocksSettings;

	constructor(settings: CombineCodeBlocksSettings) {
		this.settings = settings;
	}

	public resolveSettings(content: string): CombineCodeBlocksSettings {
		const frontmatter = this.parseFrontmatter(content);
		if (!frontmatter || typeof frontmatter !== 'object') return this.settings;
		const overrides = frontmatter['combine-code-blocks'] || {};
		
		// Normalize language lists to lowercase
		if (overrides.languageIncludeList) {
			overrides.languageIncludeList = overrides.languageIncludeList.map((lang: string) => lang.toLowerCase());
		}
		if (overrides.languageExcludeList) {
			overrides.languageExcludeList = overrides.languageExcludeList.map((lang: string) => lang.toLowerCase());
		}
		
		return { ...this.settings, ...overrides };
	}

	private parseFrontmatter(content: string): any {
		// Handle both LF and CRLF line endings
		const normalizedContent = content.replace(/\r\n/g, '\n');
		const match = normalizedContent.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
		if (!match) return null;
		try {
			return yaml.load(match[1]);
		} catch {
			return null;
		}
	}

	public combineCodeBlocks(content: string, settingsOverride?: CombineCodeBlocksSettings): string | null {
		const settings = settingsOverride || this.settings;
		const codeBlocks = this.extractCodeBlocks(content, settings);
		if (codeBlocks.length === 0) {
			return null;
		}
		const combinedContent = this.combineBlocks(codeBlocks, settings);
		const detectedLanguage = settings.languageDetection ? this.detectMostCommonLanguage(codeBlocks) : '';
		return this.formatCombinedBlock(combinedContent, detectedLanguage, settings);
	}

	private extractCodeBlocks(content: string, settings: CombineCodeBlocksSettings): CodeBlock[] {
		const codeBlocks: CodeBlock[] = [];
		const lines = content.split('\n');
		let inCodeBlock = false;
		let currentBlock: Partial<CodeBlock> = {};
		let blockContent: string[] = [];
		let skipNextBlock = false;
		let codeBlockDepth = 0; // Track nested code blocks

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];

			// Check for combine:ignore tag (only when not in a code block)
			if (!inCodeBlock && line.trim() === '<!-- combine:ignore -->') {
				skipNextBlock = true;
				continue;
			}
			
			// Check for code block start - be more strict about the pattern
			const codeBlockMatch = line.match(/^```(\w*)(.*)$/);
			if (codeBlockMatch && !inCodeBlock) {
				// Only start a new block if we're not already in one
				inCodeBlock = true;
				codeBlockDepth = 1;
				currentBlock = {
					language: (codeBlockMatch[1] || '').trim(),
					startLine: i + 1,
					content: ''
				};
				blockContent = [];
				continue;
			}

			// Check for code block end
			if (line.trim() === '```' && inCodeBlock && codeBlockDepth === 1) {
				inCodeBlock = false;
				codeBlockDepth = 0;
				currentBlock.endLine = i + 1;
				currentBlock.content = blockContent.join('\n');
				
				// Language filtering - normalize to lowercase for comparison
				const lang = (currentBlock.language || '').toLowerCase();
				const { languageIncludeList, languageExcludeList } = settings;
				let include = true;
				
				// Include list takes precedence - if specified, only include those languages
				if (languageIncludeList && languageIncludeList.length > 0) {
					include = languageIncludeList.includes(lang) || (lang === '' && languageIncludeList.includes('plain'));
				}
				
				// Exclude list - exclude these languages
				if (languageExcludeList && languageExcludeList.length > 0) {
					if (languageExcludeList.includes(lang) || (lang === '' && languageExcludeList.includes('plain'))) {
						include = false;
					}
				}
				
				// Only add if not skipped and passes language filter
				if (!skipNextBlock && include) {
					codeBlocks.push(currentBlock as CodeBlock);
				}
				skipNextBlock = false;
				continue;
			}

			// Handle nested code blocks (count depth but don't extract)
			if (inCodeBlock) {
				if (line.trim().startsWith('```')) {
					codeBlockDepth++;
				} else if (line.trim() === '```' && codeBlockDepth > 1) {
					codeBlockDepth--;
				}
				blockContent.push(line);
			}
		}

		return codeBlocks;
	}

	private getSourceReferenceComment(language: string, startLine: number, endLine: number): string {
		const lang = language.toLowerCase();
		let commentStart = '//';
		
		// Use appropriate comment syntax for different languages
		if (['python', 'ruby', 'perl', 'bash', 'shell', 'yaml', 'r'].includes(lang)) {
			commentStart = '#';
		} else if (['html', 'xml', 'markdown'].includes(lang)) {
			return `<!-- Source: lines ${startLine}-${endLine} -->`;
		} else if (['sql'].includes(lang)) {
			commentStart = '--';
		} else if (['css', 'scss', 'less'].includes(lang)) {
			return `/* Source: lines ${startLine}-${endLine} */`;
		}
		
		return `${commentStart} Source: lines ${startLine}-${endLine}`;
	}

	private combineBlocks(codeBlocks: CodeBlock[], settings: CombineCodeBlocksSettings): string {
		if (settings.groupByLanguage) {
			// Group code blocks by language
			const groups: { [lang: string]: CodeBlock[] } = {};
			for (const block of codeBlocks) {
				const lang = block.language || 'plain';
				if (!groups[lang]) groups[lang] = [];
				groups[lang].push(block);
			}
			
			// Build grouped output with enhanced styling
			let result = '';
			const languages = Object.keys(groups).sort();
			
			languages.forEach((lang, groupIndex) => {
				const blocks = groups[lang];
				if (groupIndex > 0) result += '\n\n';
				
				// Enhanced language header styling
				if (settings.enhancedStyling || settings.useCalloutStyle) {
					const langIcon = this.getLanguageIcon(lang);
					result += `### ${langIcon} ${lang.toUpperCase()}\n\n`;
				} else {
					result += `### ${lang}\n\n`;
				}
				
				// Add language-specific code block
				result += `\`\`\`${lang}\n`;
				
				blocks.forEach((block, index) => {
					let content = block.content;
					if (settings.includeSourceReference) {
						content = this.getSourceReferenceComment(lang, block.startLine, block.endLine) + '\n' + content;
					}
					if (index < blocks.length - 1) {
						content += settings.separatorText;
					}
					result += content;
				});
				
				result += '\n\`\`\`';
			});
			
			return result;
		} else {
			return codeBlocks.map((block, index) => {
				let content = block.content;
				if (settings.includeSourceReference) {
					content = this.getSourceReferenceComment(block.language, block.startLine, block.endLine) + '\n' + content;
				}
				if (index < codeBlocks.length - 1) {
					content += settings.separatorText;
				}
				return content;
			}).join('');
		}
	}

	private getLanguageIcon(language: string): string {
		const icons: { [key: string]: string } = {
			'javascript': '🟨',
			'typescript': '🔷',
			'python': '🐍',
			'java': '☕',
			'cpp': '⚙️',
			'c': '⚙️',
			'csharp': '🔵',
			'go': '🐹',
			'rust': '🦀',
			'php': '🐘',
			'ruby': '💎',
			'swift': '🍎',
			'kotlin': '🟣',
			'html': '🌐',
			'css': '🎨',
			'scss': '🎨',
			'sql': '🗃️',
			'bash': '🐚',
			'shell': '🐚',
			'powershell': '💙',
			'yaml': '📄',
			'json': '📋',
			'xml': '📰',
			'markdown': '📝',
			'plain': '📄'
		};
		return icons[language.toLowerCase()] || '📄';
	}

	private detectMostCommonLanguage(codeBlocks: CodeBlock[]): string {
		const languageCount: { [key: string]: number } = {};
		
		codeBlocks.forEach(block => {
			const lang = block.language.toLowerCase();
			if (lang) {
				languageCount[lang] = (languageCount[lang] || 0) + 1;
			}
		});

		if (Object.keys(languageCount).length === 0) {
			return '';
		}

		// Find the most common language
		let mostCommon = '';
		let maxCount = 0;
		
		Object.entries(languageCount).forEach(([lang, count]) => {
			if (count > maxCount) {
				maxCount = count;
				mostCommon = lang;
			}
		});

		return mostCommon;
	}

	private formatCombinedBlock(content: string, language: string, settings: CombineCodeBlocksSettings): string {
		const heading = settings.outputHeadingText || '🧩 Combined Code Blocks';
		const customIcon = settings.customHeaderIcon || '⚡';
		
		if (settings.useCalloutStyle) {
			// Create a beautiful callout-style block with proper code formatting
			const calloutType = settings.calloutType || 'example';
			const calloutHeader = `${customIcon} ${heading}`;
			const calloutFormatting = settings.calloutFormatting || 'header-only';
			
			if (settings.groupByLanguage) {
				// For grouped content, use callout header with regular formatting
				if (calloutFormatting === 'header-only') {
					return `> [!${calloutType}]+ ${calloutHeader}

${content}`;
				} else {
					// Full callout formatting (may break with long lines)
					return `> [!${calloutType}]+ ${calloutHeader}
> 
> ${content.split('\n').join('\n> ')}`;
				}
			} else {
				const languageTag = language ? language : '';
				
				if (calloutFormatting === 'header-only') {
					// Use callout header with regular code block (best for long lines)
					return `> [!${calloutType}]+ ${calloutHeader}

\`\`\`${languageTag}
${content}
\`\`\``;
				} else {
					// Full callout formatting (may break with long lines)
					const formattedContent = content.split('\n').map(line => `> ${line}`).join('\n');
					return `> [!${calloutType}]+ ${calloutHeader}
> 
> \`\`\`${languageTag}
${formattedContent}
> \`\`\``;
				}
			}
		} else if (settings.enhancedStyling) {
			// Enhanced styling without callout
			const styledHeader = `---\n\n## ${customIcon} ${heading}\n\n---`;
			
			if (settings.groupByLanguage) {
				return `${styledHeader}\n\n${content}`;
			} else {
				const languageTag = language ? language : '';
				let styledContent = content;
				
				// Add language label if enabled
				if (settings.showLanguageLabels && language) {
					styledContent = `**Language:** \`${language}\`\n\n${styledContent}`;
				}
				
				// Use collapsible sections if enabled
				if (settings.useCollapsibleSections) {
					return `${styledHeader}

<details>
<summary><strong>Click to expand ${language ? language.toUpperCase() : 'CODE'}</strong></summary>

\`\`\`${languageTag}
${styledContent}
\`\`\`

</details>`;
				} else {
					return `${styledHeader}

\`\`\`${languageTag}
${styledContent}
\`\`\``;
				}
			}
		} else {
			// Original simple format
			if (settings.groupByLanguage) {
				return `## ${heading}\n\n${content}`;
			} else {
				const languageTag = language ? language : '';
				return `## ${heading}\n\n\`\`\`${languageTag}
${content}
\`\`\``;
			}
		}
	}
} 