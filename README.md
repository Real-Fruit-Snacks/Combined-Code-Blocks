# Obsidian Combine Code Blocks Plugin

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Real-Fruit-Snacks/Combined-Code-Blocks?style=for-the-badge)](https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks/releases/latest)
[![GitHub All Releases](https://img.shields.io/github/downloads/Real-Fruit-Snacks/Combined-Code-Blocks/total?style=for-the-badge)](https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks/releases)
[![GitHub](https://img.shields.io/github/license/Real-Fruit-Snacks/Combined-Code-Blocks?style=for-the-badge)](https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks/blob/main/LICENSE)

A powerful Obsidian plugin that intelligently combines all code blocks in a note into a single, beautifully styled code block. Perfect for consolidating scattered code snippets, creating comprehensive code summaries, and maintaining clean documentation with **stunning visual presentation**.

## ✨ Features

- 🔗 **Smart Code Block Combination** - Automatically merge all code blocks in a note
- 🎯 **Intelligent Language Detection** - Detects the most common programming language
- 🎨 **Beautiful Styling Options** - Choose from callout styles, enhanced formatting, and more
- 📍 **Flexible Output Positioning** - Choose where to place the combined block (top, bottom, after heading, or at cursor)
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
1. Download the latest release from [GitHub Releases](https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks/releases)
2. Extract `main.js` and `manifest.json` to your vault's `.obsidian/plugins/combine-code-blocks/` folder
3. Enable the plugin in **Settings** → **Community Plugins**

### Basic Usage

1. Open a note with multiple code blocks
2. Open the command palette (`Ctrl/Cmd + Shift + P`)
3. Run **"Combine Code Blocks"**
4. The combined code block will appear at your chosen location with beautiful styling

## 📖 Documentation

### Commands

| Command | Description |
|---------|-------------|
| `Combine Code Blocks` | Creates or updates the combined code block |
| `Remove Combined Code Block` | Removes the existing combined code block |

### Configuration

#### Core Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Separator Text** | Text inserted between combined code blocks | `\n\n// --- Next Code Block ---\n\n` |
| **Language Detection** | Automatically detect the most common language | `true` |
| **Language Include List** | Comma-separated languages to include | *(empty - all languages)* |
| **Language Exclude List** | Comma-separated languages to exclude | *(empty)* |
| **Output Location** | Where to insert the combined block | `bottom` |
| **Output Heading Text** | Custom heading for the combined section | `🧩 Combined Code Blocks` |
| **Group by Language** | Organize blocks by programming language | `false` |
| **Include Source Reference** | Add original line number comments | `false` |

#### 🎨 Styling Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Use Callout Style** | Create beautiful callout-style blocks | `true` |
| **Callout Type** | Type of callout (example, note, tip, warning) | `example` |
| **Enhanced Styling** | Add visual enhancements like horizontal rules | `true` |
| **Custom Header Icon** | Customize the header icon | `⚡` |
| **Show Language Labels** | Display language information prominently | `true` |
| **Use Collapsible Sections** | Make code blocks expandable/collapsible | `false` |

#### Output Locations

- **`bottom`** - At the end of the note *(default)*
- **`top`** - At the beginning of the note
- **`afterHeading`** - After a heading matching the output heading text
- **`atCursor`** - At the current cursor position

### Advanced Usage

#### Per-Note Configuration

Override plugin settings for individual notes using YAML frontmatter:

```yaml
---
combine-code-blocks:
  languageIncludeList: [python, javascript]
  languageExcludeList: [markdown]
  outputLocation: top
  groupByLanguage: true
  includeSourceReference: true
  outputHeadingText: "📋 My Combined Code"
  useCalloutStyle: true
  calloutType: "tip"
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
git clone https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks.git
cd Combined-Code-Blocks

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

### Output Location Issues
- **`afterHeading`**: Searches for headings containing words from your output heading text
- **`atCursor`**: Places the block at your current cursor position
- Falls back to `bottom` if the specified location isn't found

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

- 🐛 [Report bugs](https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks/issues)
- 💡 [Request features](https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks/issues)
- 💬 [Join discussions](https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks/discussions)

---

<div align="center">

**[⭐ Star this repo](https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks) if you find it useful!**

Made with ❤️ for the Obsidian community

</div> 