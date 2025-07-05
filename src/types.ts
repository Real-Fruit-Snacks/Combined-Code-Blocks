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
	languageIncludeList?: string[];
	languageExcludeList?: string[];
	outputLocation?: OutputLocation;
	outputHeadingText?: string;
	groupByLanguage?: boolean;
	includeSourceReference?: boolean;
} 