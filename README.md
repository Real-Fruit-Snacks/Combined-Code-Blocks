# Obsidian Combine Code Blocks Plugin

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks?style=for-the-badge)](https://github.com/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks/releases/latest)
[![GitHub All Releases](https://img.shields.io/github/downloads/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks/total?style=for-the-badge)](https://github.com/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks/releases)
[![GitHub](https://img.shields.io/github/license/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks?style=for-the-badge)](https://github.com/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks/blob/main/LICENSE)

A powerful Obsidian plugin that intelligently combines all code blocks in a note into a single, beautifully styled code block. Perfect for consolidating scattered code snippets, creating comprehensive code summaries, and maintaining clean documentation with **stunning visual presentation**.

## ✨ Features

- 🔗 **Smart Code Block Combination** - Automatically merge all code blocks in a note
- 🎯 **Intelligent Language Detection** - Detects the most common programming language
- 🎨 **Beautiful Styling Options** - Choose from callout styles, enhanced formatting, and more
- 📍 **Simple Output** - Combined blocks are automatically appended to the end of your note
- 🏷️ **Language Filtering** - Include or exclude specific programming languages
- 🗂️ **Language Grouping** - Organize code blocks by programming language with emoji icons
- 📝 **Source References** - Optionally include original line number references
- 🚫 **Selective Exclusion** - Skip specific code blocks with `<!-- combine:ignore -->`
- ⚙️ **Per-Note Configuration** - Override settings using YAML frontmatter
- 🎛️ **Customizable Separators** - Define custom text between combined blocks
- 🔽 **Collapsible Sections** - Create expandable/collapsible code blocks
- ⚡ **Custom Icons** - Personalize with custom header icons

## 🎨 Visual Styling Options

### Callout Style (Recommended)
Creates beautiful, themed callout blocks that integrate seamlessly with Obsidian:

```
> [!example]+ ⚡ Combined Code Blocks
> ```javascript
> console.log("Hello World!");
> ```
```

### Enhanced Styling
Adds visual enhancements with horizontal rules and language labels:

```
---
## ⚡ Combined Code Blocks
---
**Language:** `javascript`
```

### Language Grouping with Icons
Organizes code by language with beautiful emoji icons:

```
### 🟨 JAVASCRIPT
### 🐍 PYTHON
### ☕ JAVA
```

## 🚀 Quick Start

### Installation

#### From Obsidian Community Plugins
1. Open **Settings** → **Community Plugins**
2. Disable **Safe Mode**
3. Click **Browse** and search for "Combine Code Blocks"
4. Install and enable the plugin

#### Manual Installation
1. Download the latest release from [GitHub Releases](https://github.com/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks/releases)
2. Extract `main.js` and `manifest.json` to your vault's `.obsidian/plugins/combine-code-blocks/` folder
3. Enable the plugin in **Settings** → **Community Plugins**

### Basic Usage

1. Open a note with multiple code blocks
2. Open the command palette (`Ctrl/Cmd + Shift + P`)
3. Run **"Combine Code Blocks"**
4. The combined code block will be appended to the end of your note with beautiful styling

## 📖 Documentation

### Commands

| Command | Description |
|---------|-------------|
| `Combine Code Blocks` | Creates or updates the combined code block |

### Configuration

#### Core Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Separator Text** | Text inserted between combined code blocks | `\n\n// --- Next Code Block ---\n\n` |
| **Language Detection** | Automatically detect the most common language | `true` |
| **Language Include List** | Comma-separated languages to include | *(empty - all languages)* |
| **Language Exclude List** | Comma-separated languages to exclude | *(empty)* |
| **Group by Language** | Organize blocks by programming language | `false` |
| **Include Source Reference** | Add original line number comments | `false` |

#### 🎨 Styling Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Use Callout Style** | Create beautiful callout-style blocks | `true` |
| **Callout Type** | Type of callout (info, tip, success, warning, error, example, quote, note) | `example` |
| **Callout Formatting** | Formatting style for callouts (header-only, full-content, compact) | `header-only` |
| **Enhanced Styling** | Add visual enhancements like horizontal rules | `true` |
| **Custom Header Icon** | Customize the header icon | `⚡` |
| **Show Language Labels** | Display language information prominently | `true` |
| **Use Collapsible Sections** | Make code blocks expandable/collapsible | `false` |

#### Output Behavior

The plugin always appends the combined code block to the end of your note, keeping things simple and predictable. This ensures no accidental content overwrites and provides a consistent experience.

### Advanced Usage

#### Per-Note Configuration

Override plugin settings for individual notes using YAML frontmatter:

```yaml
---
combine-code-blocks:
  languageIncludeList: [python, javascript]
  languageExcludeList: [markdown]
  groupByLanguage: true
  includeSourceReference: true
  useCalloutStyle: true
  calloutType: "tip"
  calloutFormatting: "compact"
  customHeaderIcon: "🔥"
---
```

#### Excluding Specific Code Blocks

Add `<!-- combine:ignore -->` immediately above any code block to exclude it:

```markdown
<!-- combine:ignore -->
```python
print("This block will be ignored")
```

```python
print("This block will be included")
```
```

### 🎨 Styling Examples

#### Callout Style (Most Beautiful)
```markdown
> [!example]+ ⚡ Combined Code Blocks
> ```javascript
> console.log("Hello from JavaScript!");
> 
> // --- Next Code Block ---
> 
> function greet(name) {
>   return `Hello, ${name}!`;
> }
> ```
```

#### Enhanced Styling with Language Labels
```markdown
---

## ⚡ Combined Code Blocks

---

**Language:** `javascript`

```javascript
console.log("Hello from JavaScript!");
```
```

#### Grouped by Language with Icons
```markdown
---

## ⚡ Combined Code Blocks

---

### 🟨 JAVASCRIPT

```javascript
console.log("Hello from JavaScript!");
```

### 🐍 PYTHON

```python
print("Hello from Python!")
```
```

#### Collapsible Sections
```markdown
---

## ⚡ Combined Code Blocks

---

<details>
<summary><strong>Click to expand JAVASCRIPT</strong></summary>

```javascript
console.log("Hello from JavaScript!");
```

</details>
```

#### With Source References
```markdown
> [!example]+ ⚡ Combined Code Blocks
> ```javascript
> // Source: lines 5-7
> console.log("Hello from JavaScript!");
> 
> // --- Next Code Block ---
> 
> // Source: lines 12-16
> function greet(name) {
>   return `Hello, ${name}!`;
> }
> ```
```

### 🌈 Language Icons

The plugin automatically adds beautiful emoji icons for different programming languages:

- 🟨 JavaScript
- 🔷 TypeScript  
- 🐍 Python
- ☕ Java
- ⚙️ C/C++
- 🔵 C#
- 🐹 Go
- 🦀 Rust
- 🐘 PHP
- 💎 Ruby
- 🍎 Swift
- 🟣 Kotlin
- 🌐 HTML
- 🎨 CSS/SCSS
- 🗃️ SQL
- 🐚 Bash/Shell
- 💙 PowerShell
- 📄 YAML/JSON
- 📝 Markdown
- 📄 Plain text

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks.git
cd Obsidian-Combined-Code-Blocks

# Install dependencies
npm install

# Build the plugin
npm run build

# Development mode (auto-rebuild)
npm run dev
```

### Project Structure

```
├── src/
│   ├── types.ts           # TypeScript interfaces
│   └── CodeBlockCombiner.ts # Core logic
├── main.ts                # Plugin entry point
├── manifest.json          # Plugin manifest
├── package.json           # Dependencies and scripts
└── README.md             # Documentation
```

## 🐛 Troubleshooting

### Combined Block Not Appearing
- Verify you have code blocks in your note
- Check language filtering settings
- Ensure blocks aren't marked with `<!-- combine:ignore -->`

### Styling Issues
- Try different callout types (example, note, tip, warning)
- Toggle enhanced styling on/off
- Check if your theme supports callouts

### Output Behavior
The plugin always appends combined code blocks to the end of your note, ensuring consistency and preventing any accidental content overwrites.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the [Obsidian](https://obsidian.md/) community
- Inspired by the need for better code organization in technical notes
- Thanks to all contributors and users providing feedback

## 📞 Support

- 🐛 [Report bugs](https://github.com/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks/issues)
- 💡 [Request features](https://github.com/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks/issues)
- 💬 [Join discussions](https://github.com/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks/discussions)

---

<div align="center">

**[⭐ Star this repo](https://github.com/Real-Fruit-Snacks/Obsidian-Combined-Code-Blocks) if you find it useful!**

Made with ❤️ for the Obsidian community

</div> 