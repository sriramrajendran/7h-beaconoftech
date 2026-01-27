# BeaconOfTech Blog - Markdown Support

This directory contains markdown files for the BeaconOfTech blog system. The blog module now supports both HTML and markdown content.

## How to Add a New Markdown Blog Post

### 1. Create the Markdown File
Create a new `.md` file in this directory with your blog content:

```markdown
# Your Blog Title

Your blog content here with **bold**, *italic*, and `code` formatting.

## Subheading

- List item 1
- List item 2
- List item 3

```javascript
// Code blocks are supported
const example = "Hello World";
console.log(example);
```

[Link text](https://example.com)
```

### 2. Add Blog Post to blog.js
Add the blog post to the `blogPosts` array in `/assets/js/modules/blog.js`:

```javascript
{
    id: 8, // Use next available ID
    title: "Your Blog Title",
    excerpt: "Brief description of your blog post",
    category: "Category Name",
    date: "2026-01-27", // Today's date
    readTime: "5 min", // Estimated reading time
    tags: ["tag1", "tag2", "tag3"],
    contentType: "markdown",
    markdownFile: "assets/blog/your-file-name.md"
}
```

### 3. Or Use the Helper Method
You can also use the helper method to create markdown blog posts:

```javascript
const newPost = blogModule.createMarkdownBlogPost(
    "Your Blog Title",
    "Brief description",
    "Category",
    ["tag1", "tag2", "tag3"],
    "5 min",
    "your-file-name.md"
);

blogModule.addBlogPost(newPost);
```

## Supported Markdown Features

The built-in markdown parser supports:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Code Blocks**: ```javascript ... ```
- **Inline Code**: `code`
- **Links**: `[text](url)`
- **Lists**: `* item` or `1. item`
- **Line Breaks**: Double newline or single newline

## File Organization

- Place all markdown blog files in this directory
- Use descriptive filenames (e.g., `react-performance-tips.md`)
- Keep filenames relatively short and URL-friendly

## Categories

Common blog categories include:
- Frontend
- Backend
- Architecture
- DevOps
- Security
- Performance
- JavaScript
- React
- Node.js
- Cloud
- AI/ML

## Tips for Writing Great Blog Posts

1. **Use clear, descriptive titles**
2. **Write compelling excerpts** (around 150 characters)
3. **Include relevant tags** for better discoverability
4. **Estimate reading time** accurately
5. **Use proper markdown formatting** for readability
6. **Include code examples** where helpful
7. **Add internal and external links** for context

## Example Blog Post Structure

```markdown
# Your Amazing Blog Post

A brief introduction to your topic.

## Main Point 1

Detailed explanation with examples.

### Sub-point

More specific details.

## Code Example

```javascript
function example() {
    return "Hello, World!";
}
```

## Conclusion

Summary and key takeaways.
```

## Testing

To test your markdown blog post:

1. Save your `.md` file in this directory
2. Add the blog post entry to `blog.js`
3. Open the application in your browser
4. Navigate to the Tech Blog section
5. Click on your blog post to verify rendering

The markdown content will be automatically converted to HTML when displayed.
