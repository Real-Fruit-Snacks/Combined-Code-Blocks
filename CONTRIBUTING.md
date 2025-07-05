# Contributing to Obsidian Combine Code Blocks Plugin

Thank you for your interest in contributing to the Obsidian Combine Code Blocks Plugin! We welcome contributions from the community and are grateful for any help you can provide.

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Git
- Obsidian (for testing)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Combined-Code-Blocks.git
   cd Combined-Code-Blocks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the plugin**
   ```bash
   npm run build
   ```

4. **Set up for development**
   ```bash
   # For auto-rebuild during development
   npm run dev
   ```

5. **Link to your Obsidian vault** (for testing)
   ```bash
   # Create a symbolic link or copy the files to your vault's plugins folder
   # Example: ~/.obsidian/plugins/combine-code-blocks/
   ```

## 🛠️ Development Workflow

### Project Structure

```
├── src/
│   ├── types.ts              # TypeScript interfaces and types
│   └── CodeBlockCombiner.ts  # Core plugin logic
├── main.ts                   # Plugin entry point
├── manifest.json             # Plugin metadata
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── esbuild.config.mjs        # Build configuration
└── README.md                 # Documentation
```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update types in `src/types.ts` if needed

3. **Test your changes**
   - Build the plugin: `npm run build`
   - Copy to your Obsidian vault and test thoroughly
   - Test edge cases and different configurations

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add language grouping option
fix: resolve cursor position insertion bug
docs: update README with new examples
refactor: improve code block extraction logic
```

## 🧪 Testing

### Manual Testing

1. **Basic functionality**
   - Create notes with multiple code blocks
   - Test the "Combine Code Blocks" command
   - Verify output appears in correct location

2. **Settings testing**
   - Test all plugin settings
   - Verify frontmatter overrides work
   - Test language filtering

3. **Edge cases**
   - Empty notes
   - Notes with no code blocks
   - Malformed code blocks
   - Very large notes
   - Different language combinations

### Testing Checklist

- [ ] Basic combine functionality works
- [ ] All output locations work correctly
- [ ] Language filtering works as expected
- [ ] Frontmatter overrides function properly
- [ ] `<!-- combine:ignore -->` tags are respected
- [ ] Source references display correctly
- [ ] Language grouping works
- [ ] Plugin settings save and load correctly
- [ ] Remove combined block command works

## 📝 Documentation

### Updating Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new functions
- Update type definitions
- Include examples for new features

### Writing Good Documentation

- Use clear, concise language
- Include code examples
- Explain the "why" not just the "how"
- Update troubleshooting section if needed

## 🐛 Bug Reports

### Before Submitting a Bug Report

1. Check if the issue already exists in [GitHub Issues](https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks/issues)
2. Try to reproduce the bug with minimal steps
3. Test with default plugin settings
4. Check if the issue occurs with other plugins disabled

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Obsidian version: [e.g. 1.4.13]
- Plugin version: [e.g. 1.0.0]
- OS: [e.g. Windows 11, macOS 13.0]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

### Before Submitting a Feature Request

1. Check existing issues and discussions
2. Consider if the feature fits the plugin's scope
3. Think about how it would work with existing features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've thought about.

**Additional context**
Any other context, mockups, or examples.
```

## 🔄 Pull Request Process

### Before Submitting

1. Ensure your code follows the project's style
2. Test your changes thoroughly
3. Update documentation if needed
4. Make sure the build passes: `npm run build`

### Pull Request Guidelines

1. **Title**: Use a clear, descriptive title
2. **Description**: Explain what your PR does and why
3. **Testing**: Describe how you tested your changes
4. **Breaking Changes**: Note any breaking changes
5. **Related Issues**: Link to related issues

### Pull Request Template

```markdown
## Description
Brief description of what this PR does.

## Changes Made
- List of changes made
- Another change

## Testing
- [ ] Tested manually in Obsidian
- [ ] Tested edge cases
- [ ] All existing functionality still works

## Screenshots (if applicable)
Add screenshots to show the changes.

## Related Issues
Fixes #123
```

## 📋 Code Style

### TypeScript Guidelines

- Use TypeScript strict mode
- Define proper types for all functions
- Use meaningful variable and function names
- Add JSDoc comments for public methods

### Code Formatting

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in objects and arrays
- Keep lines under 100 characters when possible

### Example Code Style

```typescript
/**
 * Combines code blocks from the given content
 * @param content The markdown content to process
 * @param settings The plugin settings to use
 * @returns The combined code block or null if no blocks found
 */
public combineCodeBlocks(
  content: string, 
  settings: CombineCodeBlocksSettings
): string | null {
  const codeBlocks = this.extractCodeBlocks(content, settings);
  
  if (codeBlocks.length === 0) {
    return null;
  }
  
  // Process the blocks...
  return this.formatCombinedBlock(combinedContent, language, settings);
}
```

## 🎯 Areas for Contribution

We welcome contributions in these areas:

### High Priority
- Bug fixes and stability improvements
- Performance optimizations
- Better error handling
- Accessibility improvements

### Medium Priority
- New output formats
- Additional language support
- Integration with other plugins
- UI/UX improvements

### Low Priority
- Code refactoring
- Documentation improvements
- Additional tests
- Build process improvements

## 📞 Getting Help

If you need help with development:

1. Check the [GitHub Discussions](https://github.com/Real-Fruit-Snacks/Combined-Code-Blocks/discussions)
2. Look at existing issues and PRs
3. Join the Obsidian Discord community
4. Create a discussion thread for questions

## 📜 Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- README acknowledgments section

Thank you for contributing to the Obsidian Combine Code Blocks Plugin! 🎉 