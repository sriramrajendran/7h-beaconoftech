import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon';

const Playbooks = () => {
  const [playbooks, setPlaybooks] = useState([
    {
      id: 1,
      title: "The Vibe Coding Guide",
      difficulty: "Beginner",
      duration: "30 min",
      category: "Development Philosophy",
      description: "Master the art of intuitive development, flow states, and creative coding practices that make programming feel natural and enjoyable.",
      topics: ["Vibe Coding", "Flow State", "Intuitive Development", "Creative Programming", "Mindfulness", "Productivity"],
      prerequisites: ["Basic Programming Knowledge", "Open Mindset", "Willingness to Experiment"],
      contentType: "markdown",
      markdownFile: "/assets/playbooks/vibe-coding-guide.md",
    },
    {
      id: 2,
      title: "Building Real-Time LLM Based Chatbots with WebSockets",
      difficulty: "Intermediate",
      duration: "60 min",
      category: "Full Stack",
      description: "Master WebSocket implementation for building real-time chatbots with React UI, FastAPI backend, and LLM integration with RAG setup.",
      topics: ["WebSockets", "React", "FastAPI", "LLM Integration", "RAG", "Real-time Communication"],
      prerequisites: ["React Basics", "Node.js/Python", "API Development", "WebSocket Concepts"],
      contentType: "markdown",
      markdownFile: "/assets/playbooks/real-time-chatbots-websockets.md",
    },
    {
      id: 4,
      title: "Advanced Docker & ECS Deployment Patterns",
      difficulty: "Intermediate",
      duration: "60 min",
      category: "DevOps",
      description: "Master Docker multi-stage builds, ECS service definitions, blue-green deployments, and cost optimization strategies for production environments.",
      topics: ["Docker", "ECS", "Multi-stage Builds", "Blue-Green Deployment", "Cost Optimization", "Production Patterns"],
      prerequisites: ["Docker Basics", "AWS Fundamentals", "Container Concepts", "CI/CD Knowledge"],
      contentType: "markdown",
      markdownFile: "/assets/playbooks/advanced-docker-ecs-deployment.md",
    },
    {
      id: 5,
      title: "Building High-Performance APIs with gRPC and Node.js",
      difficulty: "Intermediate",
      duration: "60 min",
      category: "Backend",
      description: "Master gRPC protocol buffers, streaming implementations, connection pooling, and performance optimization for high-throughput APIs.",
      topics: ["gRPC", "Protocol Buffers", "Node.js", "Streaming", "Performance Optimization", "Load Balancing"],
      prerequisites: ["Node.js Advanced", "API Design", "Performance Concepts", "Networking Basics"],
      contentType: "markdown",
      markdownFile: "/assets/playbooks/high-performance-grpc-nodejs.md",
    },
  ]);

  const [selectedPlaybook, setSelectedPlaybook] = useState(null);
  const [playbookContent, setPlaybookContent] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [activeDifficultyFilter, setActiveDifficultyFilter] = useState('all');
  const [filteredPlaybooks, setFilteredPlaybooks] = useState(playbooks);

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
      const html = simpleMarkdownParse(markdown);
      return html.replace(/<table>/g, '<table className="markdown-table">');
    },
  };

  const loadMarkdownFile = async (filePath) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load markdown file: ${filePath}`);
      }
      const markdown = await response.text();
      return markdown;
    } catch (error) {
      console.error('Error loading markdown file:', error);
      return `<p>Error loading content: ${error.message}</p>`;
    }
  };

  const showFullPlaybook = async (id) => {
    const playbook = playbooks.find((p) => p.id === id);
    if (!playbook) {
      console.error('Playbook not found');
      return;
    }

    setSelectedPlaybook(playbook);

    if (playbook.contentType === 'markdown' && playbook.markdownFile) {
      try {
        const markdown = await loadMarkdownFile(playbook.markdownFile);
        const cleanMarkdown = markdown.replace(/^# .+\n\n/m, '');
        let content = markdownParser.parse(cleanMarkdown);
        const titleRegex = new RegExp(`<h1[^>]*>.*${playbook.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*</h1>`, 'gi');
        content = content.replace(titleRegex, '');
        content = content.replace(/<h1[^>]*>.*?<\/h1>/gi, '');
        setPlaybookContent(content);
      } catch (error) {
        console.error('Error loading playbook content:', error);
        setPlaybookContent(`<p>Error loading content: ${error.message}</p>`);
      }
    }
  };

  const handleCategoryFilter = (category) => {
    setActiveCategoryFilter(category);
  };

  const handleDifficultyFilter = (difficulty) => {
    setActiveDifficultyFilter(difficulty);
  };

  useEffect(() => {
    let filtered = playbooks;

    if (activeCategoryFilter !== 'all') {
      filtered = filtered.filter((playbook) =>
        playbook.category.toLowerCase().includes(activeCategoryFilter.toLowerCase())
      );
    }

    if (activeDifficultyFilter !== 'all') {
      filtered = filtered.filter((playbook) =>
        playbook.difficulty.toLowerCase() === activeDifficultyFilter.toLowerCase()
      );
    }

    setFilteredPlaybooks(filtered);
  }, [activeCategoryFilter, activeDifficultyFilter, playbooks]);

  const generatePlaybookCard = (playbook) => {
    const difficultyClass = playbook.difficulty.toLowerCase();
    const difficultyColorClass = difficultyClass === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
      difficultyClass === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
        'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';

    return (
      <article className="playbook-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="card-header flex justify-between items-center mb-4">
          <span className="playbook-category text-blue-600 dark:text-blue-400 font-semibold text-sm">{playbook.category}</span>
          <span className={`playbook-difficulty text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColorClass}`}>{playbook.difficulty}</span>
        </div>

        <div className="card-content">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{playbook.title}</h3>
          <p className="playbook-description text-gray-700 dark:text-gray-300 mb-4">{playbook.description}</p>

          <div className="playbook-meta flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="duration">⏱️ {playbook.duration}</span>
            <span className="topics-count">📚 {playbook.topics.length} topics</span>
          </div>

          <div className="playbook-topics flex flex-wrap gap-2 mb-4">
            {playbook.topics.slice(0, 3).map((topic, idx) => (
              <span key={idx} className="topic-tag bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">{topic}</span>
            ))}
            {playbook.topics.length > 3 && (
              <span className="topic-tag bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">+{playbook.topics.length - 3} more</span>
            )}
          </div>
        </div>

        <div className="card-footer mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            className="start-playbook-btn w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={() => showFullPlaybook(playbook.id)}
          >
            Start Playbook →
          </button>
        </div>
      </article>
    );
  };

  const generateFeaturedPlaybook = (playbook) => {
    if (!playbook) return null;

    const difficultyClass = playbook.difficulty.toLowerCase();
    const difficultyColorClass = difficultyClass === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
      difficultyClass === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
        'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';

    return (
      <section className="featured-post p-6 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md mb-8">
        <div className="featured-content">
          <div className="flex justify-between items-start mb-4">
            <span className="playbook-category text-blue-600 dark:text-blue-400 font-semibold text-sm">{playbook.category}</span>
            <span className={`playbook-difficulty text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColorClass}`}>{playbook.difficulty}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{playbook.title}</h3>
          <p className="post-excerpt text-gray-700 dark:text-gray-300 mb-4">{playbook.description}</p>
          <div className="playbook-meta flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="duration">⏱️ {playbook.duration}</span>
            <span className="topics-count">📚 {playbook.topics.length} topics</span>
          </div>
          <div className="playbook-topics flex flex-wrap gap-2 mb-6">
            {playbook.topics.slice(0, 3).map((topic, idx) => (
              <span key={idx} className="topic-tag bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">{topic}</span>
            ))}
            {playbook.topics.length > 3 && (
              <span className="topic-tag bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">+{playbook.topics.length - 3} more</span>
            )}
          </div>
          <button
            className="read-more-btn px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={() => showFullPlaybook(playbook.id)}
          >
            Start Playbook →
          </button>
        </div>
      </section>
    );
  };

  const generateRecentPlaybooksSection = (playbooks) => {
    if (!playbooks || playbooks.length === 0) return null;

    return (
      <section className="recent-posts mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">More Playbooks</h2>
        <div className="playbooks-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playbooks.map((playbook) => (
            <React.Fragment key={playbook.id}>{generatePlaybookCard(playbook)}</React.Fragment>
          ))}
        </div>
      </section>
    );
  };

  const generatePlaybooksContent = () => {
    if (selectedPlaybook && playbookContent !== null) {
      const difficultyClass = selectedPlaybook.difficulty.toLowerCase();
      const difficultyColorClass = difficultyClass === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
        difficultyClass === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
          'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';

      return (
        <div className="playbook-viewer container mx-auto px-4 py-8">
          <button
            className="back-btn mb-6 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition duration-200"
            onClick={() => {
              setSelectedPlaybook(null);
              setPlaybookContent(null);
            }}
          >
            ← Back to Playbooks
          </button>

          <div className="playbook-header mb-8">
            <div className="playbook-info">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{selectedPlaybook.title}</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{selectedPlaybook.description}</p>

              <div className="playbook-meta flex flex-wrap gap-4">
                <span className="playbook-category text-blue-600 dark:text-blue-400 font-semibold">{selectedPlaybook.category}</span>
                <span className={`playbook-difficulty text-xs font-medium px-2.5 py-0.5 rounded-full ${difficultyColorClass}`}>{selectedPlaybook.difficulty}</span>
                <span className="playbook-duration text-gray-600 dark:text-gray-400">⏱️ {selectedPlaybook.duration}</span>
              </div>
            </div>
          </div>

          <div className="playbook-content prose prose-lg dark:prose-invert max-w-none">
            <div className="post-content" dangerouslySetInnerHTML={{ __html: playbookContent }} />
          </div>
        </div>
      );
    }

    const featuredPlaybook = filteredPlaybooks[0];
    const recentPlaybooks = filteredPlaybooks.slice(1, 4);

    return (
      <div className="blog-container container mx-auto px-4 py-8">
        <div className="page-header text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Playbooks</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Sharing on information that worked out for me</p>
        </div>

        <div className="filters-section mb-8">
          <div className="filter-group mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <div className="filter-options flex flex-wrap gap-2">
              <button
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeCategoryFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleCategoryFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeCategoryFilter === 'development' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleCategoryFilter('development')}
              >
                Development
              </button>
              <button
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeCategoryFilter === 'backend' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleCategoryFilter('backend')}
              >
                Backend
              </button>
              <button
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeCategoryFilter === 'devops' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleCategoryFilter('devops')}
              >
                DevOps
              </button>
              <button
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeCategoryFilter === 'fullstack' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleCategoryFilter('fullstack')}
              >
                Full Stack
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
            <div className="filter-options flex flex-wrap gap-2">
              <button
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeDifficultyFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleDifficultyFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeDifficultyFilter === 'beginner' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleDifficultyFilter('beginner')}
              >
                Beginner
              </button>
              <button
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeDifficultyFilter === 'intermediate' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleDifficultyFilter('intermediate')}
              >
                Intermediate
              </button>
              <button
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeDifficultyFilter === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleDifficultyFilter('advanced')}
              >
                Advanced
              </button>
            </div>
          </div>
        </div>

        <div id="playbooks-content">
          {generateFeaturedPlaybook(featuredPlaybook)}
          {generateRecentPlaybooksSection(recentPlaybooks)}
        </div>
      </div>
    );
  };

  return generatePlaybooksContent();
};

export default Playbooks;
