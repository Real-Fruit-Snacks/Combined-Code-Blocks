export type OutputLocation = 'top' | 'bottom' | 'afterHeading' | 'atCursor';

export interface CodeBlock {
	language: string;
	content: string;
	startLine: number;
	endLine: number;
}

export interface CombineCodeBlocksSettings {
	separatorText: string;
	languageDetection: boolean;
	preserveOriginalBlocks: boolean;
	languageIncludeList: string[];
	languageExcludeList: string[];
	outputLocation: 'top' | 'bottom' | 'afterHeading' | 'atCursor';
	outputHeadingText: string;
	groupByLanguage: boolean;
	includeSourceReference: boolean;
	// Styling options
	useCalloutStyle: boolean;
	calloutType: 'info' | 'tip' | 'success' | 'warning' | 'error' | 'example' | 'quote' | 'note';
	calloutFormatting: 'header-only' | 'full-content' | 'compact';
	enhancedStyling: boolean;
	customHeaderIcon: string;
	showLanguageLabels: boolean;
	useCollapsibleSections: boolean;
} 