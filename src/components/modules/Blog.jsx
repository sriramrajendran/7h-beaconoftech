import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "The Art and Science of Software Estimations: A Practical Guide",
      excerpt: "Master software estimation techniques with proven strategies, real-world examples, and data-driven approaches to deliver accurate project timelines.",
      category: "Project Management",
      date: "2025-01-22",
      readTime: "14 min",
      tags: ["estimations", "project-management", "agile", "planning"],
      contentType: "markdown",
      markdownFile: "/assets/blog/software-estimations-guide.md",
    },
    {
      id: 2,
      title: "Integrating Generative AI into Modern Web Applications",
      excerpt: "Practical strategies for implementing Gen AI capabilities in web applications, from chat interfaces to automated content generation.",
      category: "Gen AI",
      date: "2025-08-18",
      readTime: "10 min",
      tags: ["genai", "openai", "javascript", "web-development"],
      contentType: "markdown",
      markdownFile: "/assets/blog/generative-ai-web-applications.md",
    },
    {
      id: 3,
      title: "GenAI Risks and Guardrails: A Practical Guide to Safe AI Implementation",
      excerpt: "Understanding critical GenAI risks like memory poisoning and hallucinations, and implementing effective guardrails including temperature control, multi-LLM evaluation, and safety filters.",
      category: "Gen AI",
      date: "2026-01-04",
      readTime: "15 min",
      tags: ["genai", "safety", "guardrails", "hallucinations", "ai-security"],
      contentType: "markdown",
      markdownFile: "/assets/blog/genai-risks-guardrails.md",
    },
    {
      id: 4,
      title: "AWS Lambda Cold Start Explained (With Fixes)",
      excerpt: "Deep dive into AWS Lambda cold start issues, their causes, performance impact, and proven strategies to minimize or eliminate cold starts in production.",
      category: "Serverless",
      date: "2025-04-25",
      readTime: "11 min",
      tags: ["aws", "lambda", "cold-start", "performance", "serverless"],
      contentType: "markdown",
      markdownFile: "/assets/blog/aws-lambda-cold-start.md",
    },
    {
      id: 5,
      title: "Building Scalable Microservices with Node.js",
      excerpt: "Learn how to design and implement microservices architecture using Node.js, Express, and modern deployment practices.",
      category: "Architecture",
      date: "2026-01-27",
      readTime: "8 min",
      tags: ["microservices", "nodejs", "architecture", "scalability"],
      contentType: "markdown",
      markdownFile: "/assets/blog/building-scalable-microservices.md",
    },
  ]);

  const simpleMarkdownParse = (markdown) => {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      // In React, we can't directly use document.createElement inside functional component scope like this
      // This needs to be handled by a dedicated component or library if complex markdown is expected.
      // For now, a simplified approach: directly return pre-formatted code.
      const escapedCode = code.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
      return `<pre><code className="language-${lang || 'text'}">${escapedCode}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Lists
    html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');

    // Wrap in paragraphs if not already wrapped
    if (!html.startsWith('<')) {
      html = '<p>' + html + '</p>';
    }

    return html;
  };

  const markdownParser = {
    parse: (markdown) => {
        // Given the constraint "Do NOT introduce new libraries", we rely on simpleMarkdownParse
        // The original code checked for `marked` library, but we're not including it.
        const html = simpleMarkdownParse(markdown);
        // Add table class for styling
        return html.replace(/<table>/g, '<table className="markdown-table">');
    },
  };

  const escapeHtml = (text) => {
    const div = document.createElement('div'); // This will run in client-side only (Astro client:load)
    div.textContent = text;
    return div.innerHTML;
  };

  const loadMarkdownFile = async (filePath) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load markdown file: ${filePath}`);
      }
      const markdown = await response.text();
      return markdownParser.parse(markdown);
    } catch (error) {
      console.error('Error loading markdown file:', error);
      return `<p>Error loading content: ${error.message}</p>`;
    }
  };

  const loadBlogPostFromMarkdown = async (postData) => {
    const content = await loadMarkdownFile(postData.markdownFile);
    return {
      ...postData,
      content,
      contentType: 'markdown',
    };
  };

  const addBlogPost = (post) => {
    setBlogPosts((prevPosts) => [
      {
        ...post,
        id: prevPosts.length > 0 ? Math.max(...prevPosts.map(p => p.id)) + 1 : 1,
        date: new Date().toISOString().split('T')[0],
      },
      ...prevPosts,
    ]);
  };

  const createMarkdownBlogPost = (title, excerpt, category, tags, readTime, markdownFileName) => {
    return {
      title,
      excerpt,
      category,
      tags,
      readTime,
      contentType: 'markdown',
      markdownFile: `/assets/blog/${markdownFileName}`,
      date: new Date().toISOString().split('T')[0],
    };
  };

  useEffect(() => {
    // Initialize sample markdown posts (for demonstration)
    const initializeSampleMarkdownPosts = async () => {
        const samplePosts = [
            createMarkdownBlogPost(
                "Building Scalable Microservices with Node.js",
                "Learn how to design and implement microservices architecture using Node.js, Express, and modern deployment practices.",
                "Architecture",
                ["microservices", "nodejs", "architecture", "scalability"],
                "8 min",
                "building-scalable-microservices.md"
            ),
            // createMarkdownBlogPost(
            //     "React Performance Optimization Tips",
            //     "Essential techniques for optimizing React applications including memoization, code splitting, and bundle size reduction.",
            //     "Frontend",
            //     ["react", "performance", "optimization", "frontend"],
            //     "6 min",
            //     "react-performance-tips.md"
            // ) // This post does not have a corresponding markdown file in the assets
        ];

        for (const post of samplePosts) {
            // Check if post already exists to prevent duplication on re-renders
            if (!blogPosts.some(existingPost => existingPost.title === post.title)) {
                await addMarkdownBlogPostFromFile(post);
            }
        }
    };
    initializeSampleMarkdownPosts();
  }, []); // Run once on mount

  const updateBlogPost = (postId, updates) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, ...updates } : post))
    );
  };

  const deleteBlogPost = (postId) => {
    setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const getBlogPosts = () => {
    return blogPosts;
  };

  const getBlogPost = (postId) => {
    return blogPosts.find((post) => post.id === postId);
  };

  const getCategories = () => {
    const categoryCount = {};
    blogPosts.forEach((post) => {
      categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
    });

    return Object.keys(categoryCount).map((name) => ({
      name,
      count: categoryCount[name],
    }));
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const showFullPost = async (postId) => {
    const post = getBlogPost(postId);
    if (!post) return;

    let content = post.content;

    if (post.contentType === 'markdown' && post.markdownFile) {
        content = await loadMarkdownFile(post.markdownFile);
        content = content.replace(/^<h1[^>]*>.*?<\/h1>/i, ''); // Remove first H1
    } else if (post.contentType === 'markdown' && !post.markdownFile) {
        content = markdownParser.parse(post.content);
        content = content.replace(/^<h1[^>]*>.*?<\/h1>/i, ''); // Remove first H1
    }
    
    // This content will be rendered dynamically in the PageManager or a dedicated BlogPage component
    // For now, logging to console as direct DOM manipulation is removed
    console.log('Full Post Content:', content);
  };

  const showBlogList = () => {
    // This will trigger a state change in PageManager to show the blog list
    // In React, this would involve a context or prop drilling to the parent PageManager
    console.log('showBlogList called - navigate to blog list');
  };

  const generateFeaturedPost = (post) => {
    if (!post) return null;
    return (
      <section className="featured-post p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
        <div className="flex-1">
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2 block">{post.category}</span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
          <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readTime} read</span>
          </div>
          <button className="mt-6 px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300" onClick={() => showFullPost(post.id)}>
            Read Full Article
          </button>
        </div>
      </section>
    );
  };

  const generatePostCard = (post) => {
    if (!post) return null;
    return (
      <article className="post-card bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs mb-2 block">{post.category}</span>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h4>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{post.excerpt}</p>
        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 text-xs">
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 transition duration-200" onClick={() => showFullPost(post.id)}>
          Read More
        </button>
      </article>
    );
  };

  const generateRecentPostsSection = (posts) => {
    if (!posts || posts.length === 0) return null;
    return (
      <section className="recent-posts mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <React.Fragment key={post.id}>{generatePostCard(post)}</React.Fragment>
          ))}
        </div>
      </section>
    );
  };

  const generateCategoriesSection = () => {
    const categories = getCategories();
    if (!categories || categories.length === 0) return null;
    return (
      <section className="categories-section">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="category-card bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm text-center">
              <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{category.name}</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{category.count} articles</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Method for PageManager compatibility
  const generateTechBlogContent = () => {
    const posts = getBlogPosts();
    const categories = getCategories();

    return (
      <div className="blog-container container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Tech Blog</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Insights on modern software development</p>
        </header>
        
        {generateFeaturedPost(posts[0])}
        {generateRecentPostsSection(posts.slice(1))}
        {generateCategoriesSection()}
      </div>
    );
  };

  return generateTechBlogContent();
};

export default Blog;
