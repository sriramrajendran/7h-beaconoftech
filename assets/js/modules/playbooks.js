// Playbooks Module - Modular playbooks content and functionality
class PlaybooksModule {
    constructor() {
        this.playbooks = [
            {
                id: 1,
                title: "Getting Started with React Hooks",
                difficulty: "Beginner",
                duration: "45 min",
                category: "Frontend",
                description: "Learn the fundamentals of React Hooks and how to use them to build modern React applications.",
                topics: ["useState", "useEffect", "useContext", "Custom Hooks"],
                prerequisites: ["Basic JavaScript", "ES6 Features", "HTML/CSS"],
                steps: [
                    {
                        title: "Introduction to React Hooks",
                        content: "React Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 as a way to use state and lifecycle methods without writing a class.",
                        code: `import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}`
                    },
                    {
                        title: "Understanding useState",
                        content: "The useState Hook lets you add state to functional components. It returns an array with two elements: the current state value and a function to update it.",
                        code: `const [state, setState] = useState(initialValue);

// Example with object
const [user, setUser] = useState({
    name: 'John',
    age: 30
});

// Updating state
setUser(prevUser => ({
    ...prevUser,
    age: prevUser.age + 1
}));`
                    },
                    {
                        title: "Using useEffect for Side Effects",
                        content: "The useEffect Hook lets you perform side effects in functional components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.",
                        code: `import React, { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);
    
    useEffect(() => {
        fetchData()
            .then(result => setData(result))
            .catch(error => console.error(error));
            
        // Cleanup function
        return () => {
            // cleanup code here
        };
    }, [dependency]); // Dependency array
    
    return <div>{data ? data : 'Loading...'}</div>;
}`
                    }
                ]
            },
            {
                id: 2,
                title: "Building RESTful APIs with Node.js",
                difficulty: "Intermediate",
                duration: "60 min",
                category: "Backend",
                description: "Learn how to design and implement RESTful APIs using Node.js, Express, and MongoDB.",
                topics: ["Express.js", "REST Principles", "MongoDB", "Authentication"],
                prerequisites: ["JavaScript", "Node.js Basics", "HTTP Protocol"],
                steps: [
                    {
                        title: "Setting up Express Server",
                        content: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.",
                        code: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our API!' });
});

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`
                    },
                    {
                        title: "Creating RESTful Routes",
                        content: "RESTful APIs use HTTP methods to perform CRUD operations. Here's how to implement standard REST routes.",
                        code: `// GET all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new user
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});`
                    }
                ]
            },
            {
                id: 3,
                title: "Docker Containerization Fundamentals",
                difficulty: "Beginner",
                duration: "30 min",
                category: "DevOps",
                description: "Master the basics of Docker containerization and learn how to containerize your applications.",
                topics: ["Docker Basics", "Dockerfile", "Docker Compose", "Container Management"],
                prerequisites: ["Command Line", "Basic Linux", "Application Deployment"],
                steps: [
                    {
                        title: "Understanding Docker Concepts",
                        content: "Docker is a platform that uses OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries, and configuration files.",
                        code: `# Basic Docker commands
docker --version                    # Check Docker version
docker info                         # Get system information
docker images                       # List available images
docker ps                           # List running containers
docker ps -a                        # List all containers

# Pull and run an image
docker pull nginx:latest
docker run -d -p 8080:80 --name my-nginx nginx`
                    },
                    {
                        title: "Creating a Dockerfile",
                        content: "A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image.",
                        code: `# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "app.js" ]`
                    }
                ]
            }
        ];
    }

    generatePlaybooksContent() {
        return `
            <div class="page-header">
                <h2>Playbooks</h2>
                <p>That worked out for me, sharing for educational purposes only</p>
            </div>
            
            <div class="playbooks-container">
                ${this.generatePlaybookFilters()}
                ${this.generatePlaybooksList()}
            </div>
        `;
    }

    generatePlaybookFilters() {
        const categories = this.getCategories();
        const difficulties = this.getDifficulties();
        
        return `
            <section class="playbook-filters">
                <div class="filter-group">
                    <h4>Category</h4>
                    <div class="filter-options">
                        ${categories.map(cat => `
                            <button class="filter-btn" onclick="playbooksModule.filterByCategory('${cat}')">
                                ${cat}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="filter-group">
                    <h4>Difficulty</h4>
                    <div class="filter-options">
                        ${difficulties.map(diff => `
                            <button class="filter-btn" onclick="playbooksModule.filterByDifficulty('${diff}')">
                                ${diff}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    generatePlaybooksList() {
        return `
            <section class="playbooks-list">
                <div class="playbooks-grid">
                    ${this.playbooks.map(playbook => this.generatePlaybookCard(playbook)).join('')}
                </div>
            </section>
        `;
    }

    generatePlaybookCard(playbook) {
        const difficultyClass = playbook.difficulty.toLowerCase();
        return `
            <article class="playbook-card">
                <div class="card-header">
                    <span class="playbook-category">${playbook.category}</span>
                    <span class="playbook-difficulty ${difficultyClass}">${playbook.difficulty}</span>
                </div>
                
                <div class="card-content">
                    <h3>${playbook.title}</h3>
                    <p class="playbook-description">${playbook.description}</p>
                    
                    <div class="playbook-meta">
                        <span class="duration">⏱️ ${playbook.duration}</span>
                        <span class="topics-count">📚 ${playbook.topics.length} topics</span>
                    </div>
                    
                    <div class="playbook-topics">
                        ${playbook.topics.slice(0, 3).map(topic => 
                            `<span class="topic-tag">${topic}</span>`
                        ).join('')}
                        ${playbook.topics.length > 3 ? 
                            `<span class="topic-tag">+${playbook.topics.length - 3} more</span>` : ''
                        }
                    </div>
                    
                    <button class="start-playbook-btn" onclick="playbooksModule.startPlaybook(${playbook.id})">
                        Start Playbook
                    </button>
                </div>
            </article>
        `;
    }

    startPlaybook(playbookId) {
        const playbook = this.playbooks.find(p => p.id === playbookId);
        if (!playbook) return;
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="playbook-viewer">
                <button class="back-btn" onclick="playbooksModule.showPlaybooksList()">
                    ← Back to Playbooks
                </button>
                
                <div class="playbook-header">
                    <div class="playbook-info">
                        <h1>${playbook.title}</h1>
                        <p>${playbook.description}</p>
                        
                        <div class="playbook-meta">
                            <span class="playbook-category">${playbook.category}</span>
                            <span class="playbook-difficulty ${playbook.difficulty.toLowerCase()}">${playbook.difficulty}</span>
                            <span class="playbook-duration">⏱️ ${playbook.duration}</span>
                        </div>
                    </div>
                </div>
                
                <div class="playbook-content">
                    ${this.generatePlaybookSteps(playbook)}
                </div>
            </div>
        `;
    }

    generatePlaybookSteps(playbook) {
        return `
            <div class="playbook-steps">
                ${playbook.steps.map((step, index) => `
                    <div class="playbook-step" id="step-${index}">
                        <h3>Step ${index + 1}: ${step.title}</h3>
                        <div class="step-content">
                            <p>${step.content}</p>
                            ${step.code ? `
                                <div class="code-block">
                                    <pre><code>${this.escapeHtml(step.code)}</code></pre>
                                    <button class="copy-btn" onclick="playbooksModule.copyCode(this)">
                                        📋 Copy Code
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showPlaybooksList() {
        if (typeof pageManager !== 'undefined') {
            pageManager.loadPage('tech-playbooks');
        }
    }

    filterByCategory(category) {
        const filtered = this.playbooks.filter(p => p.category === category);
        this.displayFilteredPlaybooks(filtered);
    }

    filterByDifficulty(difficulty) {
        const filtered = this.playbooks.filter(p => p.difficulty === difficulty);
        this.displayFilteredPlaybooks(filtered);
    }

    displayFilteredPlaybooks(playbooks) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-header">
                <h2>Playbooks</h2>
                <p>Filtered results (${playbooks.length} playbooks)</p>
            </div>
            
            <div class="playbooks-container">
                <button class="clear-filter-btn" onclick="playbooksModule.showPlaybooksList()">
                    Clear Filter
                </button>
                
                <section class="playbooks-list">
                    <div class="playbooks-grid">
                        ${playbooks.map(playbook => this.generatePlaybookCard(playbook)).join('')}
                    </div>
                </section>
            </div>
        `;
    }

    copyCode(button) {
        const codeBlock = button.parentElement.querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            button.textContent = '✅ Copied!';
            setTimeout(() => {
                button.textContent = '📋 Copy Code';
            }, 2000);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getCategories() {
        return [...new Set(this.playbooks.map(p => p.category))];
    }

    getDifficulties() {
        return [...new Set(this.playbooks.map(p => p.difficulty))];
    }

    // Content management methods
    addPlaybook(playbook) {
        this.playbooks.push({
            ...playbook,
            id: this.playbooks.length + 1
        });
    }

    updatePlaybook(playbookId, updates) {
        const index = this.playbooks.findIndex(p => p.id === playbookId);
        if (index !== -1) {
            this.playbooks[index] = { ...this.playbooks[index], ...updates };
        }
    }

    deletePlaybook(playbookId) {
        this.playbooks = this.playbooks.filter(p => p.id !== playbookId);
    }

    getPlaybooks() {
        return this.playbooks;
    }

    getPlaybook(playbookId) {
        return this.playbooks.find(p => p.id === playbookId);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlaybooksModule;
} else {
    window.PlaybooksModule = PlaybooksModule;
}
