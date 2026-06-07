// Author Module - Modular author content and functionality
class AuthorModule {
    constructor() {
        this.authorData = {
            name: "Sriramprabhu Rajendran",
            alternateName: "Sriram Rajendran",
            title: "Senior Engineering Leader",
            experience: "20 years",
            email: "sriramprabhu.rajendran@ieee.org",
            photo: "assets/images/author-photo.jpg",
            social: {
                linkedin: "https://www.linkedin.com/in/rsri",
                github: "https://github.com/sriramrajendran",
                scholar: "https://scholar.google.com/citations?user=OGYePQEAAAAJ",
                orcid: "https://orcid.org/0009-0009-6137-0877",
                beaconoftech: "https://beaconoftech.com/#author"
            }
        };
    }

    generateAuthorContent() {
        return `
            <div class="author-container">
                ${this.generateProfileSection()}
                ${this.generateContentSections()}
            </div>
        `;
    }

    generateProfileSection() {
        return `
            <div class="author-profile">
                <div class="author-avatar">
                    <img src="${this.authorData.photo}" alt="${this.authorData.name}" class="author-photo">
                </div>
                <div class="author-info">
                    <h3>${this.authorData.name}</h3>
                    <div class="author-title-row">
                        <p class="author-title">${this.authorData.title}</p>
                    </div>
                    <div class="author-links">
                        <a href="${this.authorData.social.linkedin}" target="_blank" class="social-link">
                            <span class="social-icon">💼</span> LinkedIn
                        </a>
                        <a href="${this.authorData.social.github}" target="_blank" class="social-link">
                            <span class="social-icon">💻</span> GitHub
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    generateContentSections() {
        return `
            <div class="author-content">
                ${this.generateProfessionalBackground()}
                ${this.generateTechnologyExpertise()}
                ${this.generateLeadershipSection()}
                ${this.generateBeyondIndustrySection()}
                ${this.generateCertificationsSection()}
                ${this.generatePhilosophySection()}
                ${this.generatePhotographySection()}
                ${this.generateContactSection()}
            </div>
        `;
    }

    generateProfessionalBackground() {
        return `
            <div class="author-section">
                <h4>👨‍💻 Professional Background</h4>
                <p>Innovative, results-focused Software Engineering Leader with <strong>${this.authorData.experience} of experience</strong>, specializing in cloud-native architectures, Generative AI, and enterprise-scale systems.</p>
                <p>Leading cross-functional teams, and delivering transformative solutions from concept to production across all organizational levels.</p>
                <p><strong>Deep Technical Expertise:</strong> Deep hands-on experience designing and implementing scalable, resilient, high-performing systems using modern technologies including Gen AI, Java, Spring Boot, Microservices, AWS, Docker, Kubernetes, Kafka, Node.js, REST/SOAP, GraphQL, SQL, NoSQL (MongoDB, Cassandra, DynamoDB), and full-stack development.</p>
                <p><strong>Cloud Proficiency:</strong> Skilled in leveraging cloud platforms for building state-of-the-art, event-driven and serverless architectures.</p>
                <p><strong>Architecture & Design:</strong> Proven expertise in data modeling, distributed systems design, performance optimization, chaos engineering, design patterns, and building resilient cloud-native platforms. Extensive experience delivering products using microservices, serverless computing, event-driven architecture (EDA), and modern CI/CD pipelines.</p>
            </div>
        `;
    }

    generateTechnologyExpertise() {
        return `
            <div class="author-section">
                <h4>🚀 Technology Expertise</h4>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h5>Gen AI</h5>
                        <ul>
                            <li>Generative AI</li>
                            <li>Large Language Models (LLMs)</li>
                            <li>Agentic Coding</li>
                            <li>RAG</li>
                            <li>AI Integration Patterns</li>
                            <li>ML Pipelines</li>
                            <li>Model Fine-tuning</li>
                            <li>Vector Databases</li>
                            <li>Embeddings</li>
                            <li>AI-Powered Automation</li>
                            <li>Responsible AI</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Technologies</h5>
                        <ul>
                            <li>Java</li>
                            <li>Microservices</li>
                            <li>Docker</li>
                            <li>Kubernetes</li>
                            <li>Maven</li>
                            <li>REST/SOAP</li>
                            <li>GraphQL</li>
                            <li>NodeJS</li>
                            <li>Python</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Cloud</h5>
                        <ul>
                            <li>AWS</li>
                            <li>Serverless</li>
                            <li>Azure</li>
                            <li>Red Hat OpenShift</li>
                            <li>Cloudflare</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Frameworks</h5>
                        <ul>
                            <li>Spring Boot</li>
                            <li>Spring Cloud</li>
                            <li>Spring Batch</li>
                            <li>Hibernate</li>
                            <li>Express.js</li>
                            <li>JSF (earlier)</li>
                            <li>Struts (earlier)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Middleware</h5>
                        <ul>
                            <li>Kafka</li>
                            <li>AWS SQS/SNS</li>
                            <li>Spring Cloud</li>
                            <li>REST APIs</li>
                            <li>gRPC</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Containers & Orchestration</h5>
                        <ul>
                            <li>Docker</li>
                            <li>Kubernetes</li>
                            <li>ECS</li>
                            <li>EKS</li>
                            <li>Fargate</li>
                            <li>JBoss (earlier)</li>
                            <li>JBoss EAP (earlier)</li>
                            <li>WebSphere (earlier)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Databases (SQL)</h5>
                        <ul>
                            <li>PostgreSQL</li>
                            <li>SQL Server</li>
                            <li>Aurora</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Databases (NoSQL)</h5>
                        <ul>
                            <li>Cassandra</li>
                            <li>AWS DynamoDB</li>
                            <li>DocumentDB/MongoDB</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Testing</h5>
                        <ul>
                            <li>Cucumber</li>
                            <li>Gherkin</li>
                            <li>JUnit</li>
                            <li>Mockito</li>
                            <li>ATDD</li>
                            <li>TDD</li>
                            <li>Chaos Engineering</li>
                            <li>Mutation Testing</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>CI/CD</h5>
                        <ul>
                            <li>Jenkins</li>
                            <li>GitHub Actions</li>
                            <li>AWS CodePipeline</li>
                            <li>Maven</li>
                            <li>Gradle</li>
                            <li>Artifactory</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Security</h5>
                        <ul>
                            <li>OAuth 2.0</li>
                            <li>JWT</li>
                            <li>SAML</li>
                            <li>Zero-Trust Architecture</li>
                            <li>AWS IAM</li>
                            <li>Secrets Management</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Observability</h5>
                        <ul>
                            <li>Observe</li>
                            <li>Splunk</li>
                            <li>Kibana</li>
                            <li>Grafana</li>
                            <li>CloudWatch</li>
                            <li>X-Ray</li>
                            <li>Distributed Tracing</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Architecture Patterns</h5>
                        <ul>
                            <li>Agentic Architecture</li>
                            <li>Event-Driven Architecture</li>
                            <li>Domain-Driven Design</li>
                            <li>CQRS</li>
                            <li>Saga Pattern</li>
                            <li>Circuit Breaker</li>
                            <li>Microservices</li>
                            <li>Serverless</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>Earlier Experience</h5>
                        <ul>
                            <li>SOA</li>
                            <li>WODM</li>
                            <li>Selenium</li>
                            <li>Drools</li>
                            <li>JBPM</li>
                            <li>CA Wily Introscope</li>
                            <li>IBM BPM</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h5>OS & Enterprise</h5>
                        <ul>
                            <li>macOS</li>
                            <li>Linux</li>
                            <li>Windows</li>
                            <li>IBM WPS</li>
                            <li>WESB</li>
                            <li>IBM MQ</li>
                            <li>DataPower</li>
                            <li>WSRR</li>
                            <li>JBPM</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    generateLeadershipSection() {
        return `
            <div class="author-section">
                <h4>🎯 Leadership & Innovation</h4>
                <ul class="achievement-list">
                    <li><strong>Leadership & Mentorship:</strong> Adept at recruiting, mentoring, and leading high-performing cross-functional teams. Strong advocate for innovation, inclusion, psychological safety, and fostering a culture of continuous learning and collaboration.</li>
                    <li><strong>Passion & Vision:</strong> Staying at the frontier of tech trends including Gen AI, LLMs, and emerging AI and cloud technologies. Passionate about experimenting with new tools and sharing knowledge through blogs and community engagement.</li>
                    <li><strong>Leadership Philosophy:</strong> Strong sense of engineering craftsmanship and accountability for team success. Encourages out-of-the-box thinking, cutting-edge technology adoption, and a collaborative, empowering work environment.</li>
                    <li><strong>Strategic Collaboration:</strong> Strategic collaboration across product executive leadership, design, and engineering disciplines, adept at balancing competing priorities while fostering inclusive, high-performing teams.</li>
                    <li><strong>Diversity & Inclusion:</strong> Champion of innovation, dedicated to fostering innovation, diversity, and inclusion while driving impactful business outcomes and building enduring value for customers.</li>
                </ul>
            </div>
        `;
    }

    generateBeyondIndustrySection() {
        return `
        `;
    }

    generateCertificationsSection() {
        return `
            <div class="author-section">
                <h4>🏅 Architecture Certifications</h4>
                <ul class="achievement-list">
                    <li>AWS Certified Solutions Architect – Associate <small>2025</small></li>
                    <li>AWS Certified Solutions Architect – Professional <small>2022</small></li>
                    <li>AWS Certified Solutions Architect – Associate <small>2017</small></li>
                    <li>IBM Certified SOA Solutions Architect <small>2014</small></li>
                </ul>
            </div>
        `;
    }

    generatePhilosophySection() {
        return `
            <div class="author-section">
                <h4>💡 Professional Philosophy</h4>
                <p>Committed to fostering diversity, inclusion, and continuous learning, resulting in impactful business outcomes and lasting value for customers. Passionate about technology advancement and engineering excellence, with a proven ability to design robust architectures and optimize performance in fast-paced environments.</p>
            </div>
        `;
    }

    generatePhotographySection() {
        return `
            <div class="author-section">
                <h4>📸 Photography & Creative Pursuits</h4>
                <p>Beyond the world of technology, I have a deep passion for photography - capturing moments, exploring perspectives, and finding beauty in the ordinary. Photography provides a creative balance to the logical precision of software engineering, allowing me to see the world through different lenses both literally and figuratively.</p>
                <div class="photography-link">
                    <a href="https://www.instagram.com/rajen.sriram/" target="_blank" class="social-link instagram-link">
                        <span class="social-icon">📷</span> Check out my photography on Instagram
                    </a>
                </div>
            </div>
        `;
    }

    generateContactSection() {
        return `
            <div class="author-section">
                <h4>📧 Get in Touch</h4>
                <p>Interested in collaboration, have questions about technology leadership, or want to discuss innovative projects? Feel free to reach out!</p>
                <div class="contact-methods">
                    <a href="${this.authorData.social.linkedin}" target="_blank" class="contact-button">
                        <span class="button-icon">💼</span> Connect on LinkedIn
                    </a>
                    <a href="${this.authorData.social.github}" target="_blank" class="contact-button">
                        <span class="button-icon">💻</span> View on GitHub
                    </a>
                </div>
            </div>
        `;
    }

    // Method to update author data (for future maintainability)
    updateAuthorData(newData) {
        this.authorData = { ...this.authorData, ...newData };
    }

    // Method to get author data (for potential future use)
    getAuthorData() {
        return this.authorData;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthorModule;
} else {
    window.AuthorModule = AuthorModule;
}
