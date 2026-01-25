// Playbooks Module - Modular playbooks content and functionality
class PlaybooksModule {
    constructor() {
        this.playbooks = [
            {
                id: 1,
                title: "The Vibe Coding Guide",
                difficulty: "Beginner",
                duration: "30 min",
                category: "Development Philosophy",
                description: "Master the art of intuitive development, flow states, and creative coding practices that make programming feel natural and enjoyable.",
                topics: ["Vibe Coding", "Flow State", "Intuitive Development", "Creative Programming", "Mindfulness", "Productivity"],
                prerequisites: ["Basic Programming Knowledge", "Open Mindset", "Willingness to Experiment"],
                steps: [
                    {
                        title: "Understanding Vibe Coding Philosophy",
                        content: "Vibe coding is about finding your natural rhythm in development. It's the state where code flows effortlessly, problems solve themselves, and time seems to disappear. This approach emphasizes intuition over rigid processes, creativity over convention, and flow over force. The key is understanding your personal coding patterns, recognizing when you're in the zone, and creating environments that foster this state consistently.",
                        code: `# Vibe Coding Principles:
# - Trust your intuition and first instincts
# - Code when you feel inspired, not when you feel obligated
# - Let problems marinate before diving in
# - Follow your energy, not just your schedule
# - Embrace imperfection and iteration
# - Create a coding sanctuary that feels right
# - Listen to what the code wants to become`
                    },
                    {
                        title: "Creating Your Optimal Coding Environment",
                        content: "Your physical and digital environment dramatically impacts your coding vibe. The right setup removes friction and lets you enter flow states naturally. Consider lighting, sound, ergonomics, and digital distractions. Some developers thrive with ambient music, others need silence. Some prefer dark themes, others light. The key is personalization - create a space that makes you want to code, not one that makes you feel like you should code.",
                        code: `# Environment Setup Checklist:
# - Comfortable seating and proper lighting
# - Minimal distractions (physical and digital)
# - Background noise that helps you focus
# - Tools and shortcuts that feel natural
# - Code editor theme that pleases your eyes
# - Snippets and templates that match your style
# - Time of day when your energy peaks`
                    },
                    {
                        title: "Mastering Flow States in Development",
                        content: "Flow states are the holy grail of vibe coding - those magical periods where you're fully immersed and code pours out naturally. Achieving flow requires the right balance of challenge and skill, clear goals, and immediate feedback. Learn to recognize when you're approaching flow, protect that state fiercely, and understand how to return to it when interrupted. The best code often emerges from these flow periods.",
                        code: `# Flow State Indicators:
# - Time distortion (hours feel like minutes)
# - Self-consciousness disappears
# - Problem-solving becomes automatic
# - Code writes itself through you
# - You feel energized, not drained
# - Complete focus on the task at hand`
                    },
                    {
                        title: "Sustainable Vibe Coding Practices",
                        content: "Vibe coding isn't about chaotic bursts followed by burnout. It's about sustainable practices that keep you in the zone consistently. This includes knowing when to push forward and when to rest, maintaining energy through the day, and preventing the common pitfalls that lead to developer fatigue. The goal is a career-long relationship with coding that stays fresh, exciting, and aligned with your natural rhythms.",
                        code: `# Sustainability Practices:
# - Honor your natural energy cycles
# - Take real breaks that actually refresh you
# - End coding sessions while you still have energy
# - Celebrate small wins and progress
# - Maintain work-life harmony
# - Keep learning and exploring new approaches`
                    }
                ]
            },
            {
                id: 2,
                title: "Building Real-Time Chatbots with WebSockets",
                difficulty: "Intermediate",
                duration: "60 min",
                category: "Full Stack",
                description: "Master WebSocket implementation for building real-time chatbots with React UI, FastAPI backend, and LLM integration with RAG setup.",
                topics: ["WebSockets", "React", "FastAPI", "LLM Integration", "RAG", "Real-time Communication"],
                prerequisites: ["React Basics", "Node.js/Python", "API Development", "WebSocket Concepts"],
                steps: [
                    {
                        title: "Understanding WebSocket Architecture",
                        content: "WebSockets provide full-duplex communication channels over a single TCP connection, perfect for real-time chat applications. Unlike HTTP's request-response cycle, WebSockets maintain persistent connections enabling instant bidirectional messaging. This architecture is ideal for chatbots, live notifications, collaborative applications, and real-time data streaming where immediate response times are critical.",
                        code: `// WebSocket vs HTTP Comparison
// HTTP: Request-Response (stateless)
// WebSocket: Persistent connection (stateful)

// WebSocket handshake process
// 1. Client sends HTTP Upgrade request
// 2. Server responds with 101 Switching Protocols  
// 3. Persistent WebSocket connection established
// 4. Bidirectional messaging begins

// WebSocket message types
// - Text messages (JSON, plain text)
// - Binary messages (files, images)  
// - Control frames (ping/pong, close)`
                    },
                    {
                        title: "Setting up WebSocket Server with Node.js",
                        content: "Node.js with Socket.IO provides excellent WebSocket support with automatic fallbacks, room management, and event-driven architecture. The server handles connection management, event broadcasting, and room-based messaging. Key considerations include authentication, error handling, and connection lifecycle management.",
                        code: `// WebSocket Server Implementation
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
});

// Connection manager
const connections = new Map();

io.on('connection', (socket) => {
    console.log(\`User connected: \${socket.id}\`);
    connections.set(socket.id, socket);
    
    // Handle chat messages
    socket.on('send_message', async (data) => {
        try {
            const { content, roomId, useAi } = data;
            
            // Process with LLM if needed
            let response = content;
            if (useAi) {
                response = await processWithLLM(content);
            }
            
            // Broadcast to room
            socket.to(roomId).emit('new_message', {
                userId: socket.id,
                content: response,
                timestamp: new Date().toISOString()
            });
            
        } catch (error) {
            socket.emit('error', { message: 'Failed to send message' });
        }
    });
    
    socket.on('disconnect', () => {
        connections.delete(socket.id);
        console.log(\`User disconnected: \${socket.id}\`);
    });
});

server.listen(3000, () => {
    console.log('WebSocket server running on port 3000');
});

async function processWithLLM(message) {
});`
                    },
                    {
                        title: "Service Discovery and Load Balancing",
                        content: "Service discovery enables microservices to find and communicate with each other without hardcoded dependencies. Load balancing distributes incoming requests across multiple instances of a service to improve performance and reliability.",
                        code: `// Service Discovery with Consul
const consul = require('consul')({ host: 'localhost' });

// Register services
const userService = require('./services/userService');
const productService = require('./services/productService');

// Register with Consul
consul.agent({
    name: 'user-service',
    address: 'localhost:3001',
    port: 3001
});

consul.agent({
    name: 'product-service',
    address: 'localhost:3002',
    port: 3002
});

// Service discovery client
const getServiceUrl = (serviceName) => {
    const service = consul.agent.service.list({ service: serviceName }).pop();
    if (service) {
        return \`\${service.Address}:\${service.Port}\`;
    }
    throw new Error(\`Service \${serviceName} not found\`);
};

// Load balancing with round-robin
const roundRobin = (services) => {
    let index = 0;
    return () => {
        const service = services[index];
        index = (index + 1) % services.length;
        return service;
    };
};

// Usage
const productServices = ['localhost:3002', 'localhost:3003', 'localhost:3004'];
const getNextProductService = roundRobin(productServices);`
                    }
                ]
            },
            {
                id: 4,
                title: "Advanced Docker & ECS Deployment Patterns",
                difficulty: "Intermediate",
                duration: "60 min",
                category: "DevOps",
                description: "Master advanced Docker patterns and AWS ECS deployment for production-ready applications with CI/CD pipelines.",
                topics: ["Docker", "AWS ECS", "CI/CD", "Production", "Deployment"],
                prerequisites: ["Docker Basics", "AWS Basics", "Command Line", "Application Deployment"],
                steps: [
                    {
                        title: "Multi-Stage Docker Builds",
                        content: "Multi-stage builds optimize Docker images by separating build-time dependencies from runtime dependencies. This reduces final image size and improves security by excluding build tools and development dependencies from production images.",
                        code: `# Multi-Stage Dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm test

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`
                    },
                    {
                        title: "AWS ECS Deployment",
                        content: "Amazon ECS (Elastic Container Service) simplifies Docker container management at scale. It provides automatic scaling, load balancing, and service discovery out of the box. ECS integrates with other AWS services like ALB, RDS, and CloudWatch.",
                        code: `# ECS Task Definition Example
{
    "family": "FARGATE",
    "taskRoleArn": "arn:aws:iam::123456789012:role/ecs-task-role",
    "containerDefinitions": [
        {
            "name": "my-app",
            "image": "my-app:latest",
            "portMappings": [
                {
                    "containerPort": 3000,
                    "protocol": "tcp",
                    "hostPort": 80
                }
            ]
        }
    ],
    "requiresCompatibilities": [
        {
            "taskDefinition": "arn:aws:iam::123456789012:role/ecs-task-role"
        }
    ],
    "networkMode": "awsvpc",
    "cpu": "256",
    "memory": "512"
}

# ECS Service Definition
{
    "family": "FARGATE",
    "serviceName": "my-app-service",
    "taskDefinition": "arn:aws:iam::123456789012:role/ecs-task-role",
    "desiredCount": 2
}

# Auto Scaling Policy
{
    "targetCapacity": 10,
    "minimumScalingStepSize": 1,
    "maximumScalingStepSize": 2
}`
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
