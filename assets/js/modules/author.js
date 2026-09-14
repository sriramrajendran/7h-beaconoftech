// Author Module - Modular author content and functionality
class AuthorModule {
    constructor() {
        this.authorData = {
            name: "Sriramprabhu Rajendran",
            alternateName: "Sriram Prabhu Rajendran",
            otherName: "Sriram Rajendran",
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
                ${this.generatePublicationsSection()}
                ${this.generateSpeakingSection()}
                ${this.generateJudgingSection()}
                ${this.generateMembershipsSection()}
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

    generatePublicationsSection() {
        const linkBtn = (url, label) => `<a href="${url}" target="_blank" rel="noopener" style="display:inline-block;padding:0.2rem 0.6rem;border:1px solid #e2e8f0;border-radius:0.375rem;font-size:0.8rem;font-weight:500;color:#3b82f6;text-decoration:none;margin:0.15rem 0.25rem 0.15rem 0;transition:all 0.2s ease;">${label}</a>`;
        const badge = (label) => `<span style="display:inline-block;background:#dbeafe;color:#1e40af;padding:0.35rem 0.75rem;border-radius:0.375rem;font-size:0.8rem;font-weight:600;margin:1rem 0 0.5rem;">${label}</span>`;
        const item = (content) => `<div style="padding:0.7rem 0;border-bottom:1px solid #f1f5f9;font-size:0.9rem;line-height:1.6;">${content}</div>`;

        return `
            <div class="author-section">
                <h4>📄 Patent</h4>
                ${item(`<strong>US11704637B2:</strong> System and method to accept third-party data
                    ${linkBtn('https://patents.google.com/patent/US11704637B2/en', 'View Patent')}
                    ${linkBtn('https://www.goveda.com/patent/US-11704637-B2', 'Goveda')}
                    ${linkBtn('https://dallasinnovates.com/dallas-invents-158-patents-granted-for-week-of-july-18/', 'Dallas Innovates')}`)}
            </div>
            <div class="author-section">
                <h4>📄 Research and Publications</h4>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;">
                    <div>
                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:0.5rem;">Scholarly Articles - Published</h5>
                        ${item(`<strong>IEEE ICCBI 2026:</strong> Behavioral-Centric AI: Enhancing Cognitive Efficiency in High-Stakes Obligation Management (Dubai)
                            ${linkBtn('https://www.iccbi.com/schedule.html', 'View')}`)}
                        ${item(`<strong>IEEE AIS 2026:</strong> Coordinating Specialized AI Agents for Compliance-Preserving Migration (San Antonio, TX)
                            ${linkBtn('https://ais-conference.org/2026/program_details.php', 'View')}`)}
                        ${item(`<strong>IEEE CE2CT 2026:</strong> Decoupling Complex Domain Logic: A Bounded Context Approach (India)`)}
                        ${item(`<strong>International Journal of Engineering (IJE-526):</strong> Optimizing Kafka-Based Event Streams for Low-Latency Financial Transaction Processing
                            ${linkBtn('https://www.cscjournals.org/library/manuscriptinfo.php?mc=IJE-526', 'View')}`)}
                        ${item(`<strong>IJCA:</strong> Event-Driven Architecture Patterns for Real-Time Financial Risk Assessment
                            ${linkBtn('https://www.ijcaonline.org/archives/volume187/number102/real-time-resilience-scaling-financial-risk-assessment-with-event-driven-cloud-architectures/', 'View')}`)}
                    </div>
                    <div>
                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:0.5rem;">Research Profiles</h5>
                        ${item(`${linkBtn('https://scholar.google.com/citations?user=OGYePQEAAAAJ', 'Google Scholar')}
                            ${linkBtn('https://www.researchgate.net/profile/Sriramprabhu-Rajendran', 'ResearchGate')}
                            ${linkBtn('https://orcid.org/0009-0009-6137-0877', 'ORCID')}`)}

                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin:1rem 0 0.5rem;">Peer Review</h5>
                        ${item(`<strong>100+ papers reviewed</strong> for IEEE and various international conferences across 30+ venues`)}
                    </div>
                </div>
            </div>
            <div class="author-section">
                <h4>📝 Technical Articles</h4>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;">
                    <div>
                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:0.5rem;">Peer Reviewed Articles</h5>
                        ${badge('LeadDev')}
                        ${item(`<a href="https://leaddev.com/reporting/its-time-to-rethink-how-we-measure-engineering-productivity" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">It is Time to Rethink How We Measure Engineering Productivity</a>`)}
                        ${item(`<a href="https://leaddev.com/community/sriramprabhu-rajendran" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Author Profile - LeadDev</a>`)}
                        ${badge('DZone')}
                        ${item(`<a href="https://dzone.com/articles/data-contracts-circuit-breaker" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Data Contracts as "Circuit Breaker" for Model Reliability</a>`)}
                        ${badge('Dataversity')}
                        ${item(`<a href="https://www.dataversity.net/articles/the-context-poisoning-crisis-why-metadata-is-the-new-security-perimeter/" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">The Context Poisoning Crisis: Why Metadata Is the New Security Perimeter</a>`)}
                        ${badge('HackerNoon')}
                        ${item(`<a href="https://hackernoon.com/the-builders-dilemma-balancing-creativity-and-consistency-in-agentic-workflows" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">The Builder Dilemma: Balancing Creativity and Consistency in Agentic Workflows</a>`)}
                        ${item(`<a href="https://hackernoon.com/your-ai-generated-code-tests-might-be-lying-to-you" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Your AI-Generated Code Tests Might Be Lying to You</a>`)}
                        ${item(`<a href="https://hackernoon.com/cut-inter-agent-latency-by-80percent-with-grpc-streaming" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Cut Inter-Agent Latency by 80% with gRPC Streaming</a>`)}
                        ${badge('BizTech Foundation')}
                        ${item(`<a href="https://biztechfoundation.org/2026/04/04/agents-over-oracles-moving-enterprise-ai-from-conversation-to-coordination/" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Agents Over Oracles: Moving Enterprise AI from Conversation to Coordination</a>`)}
                    </div>
                    <div>
                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:0.5rem;">Blogs</h5>
                        ${badge('Dev.to')}
                        ${item(`<a href="https://dev.to/rsri/mutation-testing-the-missing-safety-net-for-ai-generated-code-54kn" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Mutation Testing: The Missing Safety Net for AI-Generated Code</a>`)}
                        ${item(`<a href="https://dev.to/rsri/why-your-next-enterprise-chatbot-should-write-its-own-graphql-queries-4inh" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Why Your Next Enterprise Chatbot Should Write Its Own GraphQL Queries</a>`)}
                        ${item(`<a href="https://dev.to/rsri/beyond-the-single-prompt-orchestrating-parallel-context-isolation-pci-with-claude-code-f58" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Beyond the Single Prompt: Orchestrating Parallel Context Isolation with Claude Code</a>`)}
                        ${item(`<a href="https://dev.to/rsri/why-story-points-dont-work-in-the-ai-era-and-what-should-take-their-place-instead-5a27" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Why Story Points Do Not Work in the AI Era</a>`)}
                        ${badge('Medium')}
                        ${item(`<a href="https://medium.com/@rajen.sriram/evolution-of-story-points-the-construction-to-curation-shift-97b06b9114fc" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Evolution of Story Points: The Construction to Curation Shift</a>`)}
                        ${badge('BeaconOfTech')}
                        ${item(`<a href="https://beaconoftech.com/#author" target="_blank" rel="noopener" style="color:#1e293b;text-decoration:none;">Personal Technical Blog - Author Page</a>`)}
                    </div>
                </div>
            </div>
        `;
    }

    generateSpeakingSection() {
        const linkBtn = (url, label) => `<a href="${url}" target="_blank" rel="noopener" style="display:inline-block;padding:0.2rem 0.6rem;border:1px solid #e2e8f0;border-radius:0.375rem;font-size:0.8rem;font-weight:500;color:#3b82f6;text-decoration:none;margin:0.15rem 0.25rem 0.15rem 0;transition:all 0.2s ease;">${label}</a>`;
        const item = (content) => `<div style="padding:0.7rem 0;border-bottom:1px solid #f1f5f9;font-size:0.9rem;line-height:1.6;">${content}</div>`;

        return `
            <div class="author-section">
                <h4>🎤 Speaking and Media</h4>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;">
                    <div>
                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:0.5rem;">Conference Speaking</h5>
                        ${item(`<strong>API Days, NY:</strong> Agent-Ready Orchestration - Engineering APIs for the Execution Layer
                            ${linkBtn('https://apidays.global/archive/2025/new-york-d3c79', 'View Event')}
                            ${linkBtn('https://www.youtube.com/watch?v=IK5hQhuRM0E', 'Watch')}`)}
                        ${item(`<strong>CIMA 2026, India:</strong> Keynote Speaker
                            ${linkBtn('https://www.scrs.in/conference/CIMA2026/speaker/talk/22986', 'View Talk')}
                            ${linkBtn('https://scrs.in/conference/CIMA2026/page/CIMA_2026_Program_Schedule', 'Schedule')}`)}
                        ${item(`<strong>API World, Santa Clara, CA:</strong> Speaker
                            ${linkBtn('https://apiworld.co/speakers/', 'View Speakers')}`)}
                        ${item(`<strong>CloudX Conference, Santa Clara, CA:</strong> Speaker
                            ${linkBtn('https://cloudxconf.com/speakers/', 'View Speakers')}`)}
                        ${item(`<strong>F50 Physical AI Summit, Dallas:</strong> Featured Speaker
                            ${linkBtn('https://physical.f50.ai/dallas', 'View Event')}
                            ${linkBtn('https://physical.f50.ai/schedule', 'Schedule')}`)}
                        ${item(`<strong>MITechCon 2026:</strong> Speaker
                            ${linkBtn('https://mitechcon.net/speakers/sriramprabhu-rajendran/', 'Speaker Profile')}
                            ${linkBtn('https://mitechcon.events/MITechCon2026#/speakers', 'Directory')}`)}
                        ${item(`<strong>MCNA 2026, San Antonio:</strong> Speaker
                            ${linkBtn('https://mcna-conference.org/2026/program.php', 'Program')}`)}
                        ${item(`<strong>IEEE CE2CT 2026, India:</strong> Presenter
                            ${linkBtn('https://ce2ct.gehu.ac.in/download/Final-Program-Schedule_CE2CT_2026_July%202-4-2026.pdf', 'Schedule')}`)}
                    </div>
                    <div>
                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:0.5rem;">Media Features and Interviews</h5>
                        ${item(`<strong>CDO Magazine:</strong> Agentic AI Governance: 3 Ways Data Governance Must Evolve for Autonomous AI
                            ${linkBtn('https://www.cdomagazine.tech/opinion-analysis/agentic-ai-governance-3-ways-data-governance-must-evolve-for-autonomous-ai', 'Read')}`)}
                        ${item(`<strong>TechTarget:</strong> Hybrid Architecture as a Permanent Enterprise Model
                            ${linkBtn('https://www.techtarget.com/searcherp/feature/Hybrid-architecture-as-a-permanent-enterprise-model', 'Read')}`)}
                        ${item(`<strong>Dice:</strong> Speed vs. Risk: Experts Weigh In on Using AI Coding Assistants
                            ${linkBtn('https://www.dice.com/career-advice/speed-vs.-risk-experts-weigh-in-on-using-ai-coding-assistants', 'Read')}`)}
                        ${item(`<strong>The Digital Project Manager:</strong> How Leaders Are Helping Project Managers Level Up
                            ${linkBtn('https://thedigitalprojectmanager.com/career/how-leaders-are-helping-project-managers-level-up/', 'Read')}`)}
                        ${item(`<strong>FinTech Bloom:</strong> Architecture of Resilience: Building Compliant Open API Ecosystems
                            ${linkBtn('https://fintechbloom.com/architecture-of-resilience-building-compliant-open-api-ecosystems-for-regulated-industries/', 'Read')}`)}
                        ${item(`<strong>She Rises Studios:</strong> Resilient Leadership: The Case for Self-Healing in the Next Generation of Systems
                            ${linkBtn('https://www.sherisesstudios.com/post/resilient-leadership-the-case-for-self-healing-in-the-next-generation-of-systems-1', 'Read')}`)}
                        ${item(`<strong>Authority Magazine:</strong> AI Beyond Writing: Practical Everyday Use Cases for AI
                            ${linkBtn('https://medium.com/authority-magazine/ai-beyond-writing-sriramprabhu-rajendran-on-practical-everyday-use-cases-for-ai-2b33e1f51c07', 'Read')}`)}
                        ${item(`<strong>Authority Magazine:</strong> Guardians of AI: How AI Leaders Are Keeping AI Safe and Ethical
                            ${linkBtn('https://medium.com/authority-magazine/guardians-of-ai-sriramprabhu-rajendran-on-how-ai-leaders-are-keeping-ai-safe-ethical-cea3c043b358', 'Read')}`)}
                        ${item(`<strong>Authority Magazine:</strong> Creating a Culture of Courage
                            ${linkBtn('https://medium.com/authority-magazine/creating-a-culture-of-courage-sriramprabhu-rajendran-independent-researcher-and-industry-thought-9e9d6df296a3', 'Read')}`)}
                        ${item(`<strong>ValiantCEO:</strong> Insights from an Independent Researcher and Thought Leader
                            ${linkBtn('https://valiantceo.com/sriramprabhu-rajendran-insights-from-an-independent-researcher-thought-leader/', 'Read')}`)}
                    </div>
                </div>
            </div>
        `;
    }

    generateMediaSection() {
        return '';
    }

    generateJudgingSection() {
        const linkBtn = (url, label) => `<a href="${url}" target="_blank" rel="noopener" style="display:inline-block;padding:0.2rem 0.6rem;border:1px solid #e2e8f0;border-radius:0.375rem;font-size:0.8rem;font-weight:500;color:#3b82f6;text-decoration:none;margin:0.15rem 0.25rem 0.15rem 0;transition:all 0.2s ease;">${label}</a>`;
        const item = (content) => `<div style="padding:0.7rem 0;border-bottom:1px solid #f1f5f9;font-size:0.9rem;line-height:1.6;">${content}</div>`;

        return `
            <div class="author-section">
                <h4>⚖️ Judging and Technical Committees</h4>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;">
                    <div>
                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:0.5rem;">Hackathon and Capstone Judging</h5>
                        ${item(`UCLA (LA Hacks) - Hackathon Judge ${linkBtn('https://la-hacks-2025.devpost.com/', 'View')}`)}
                        ${item(`Georgia Tech - Capstone Projects Judge`)}
                        ${item(`Kennesaw State University - Capstone Projects Judge ${linkBtn('https://campus.kennesaw.edu/colleges-departments/ccse/events/computing-showcase/sp26-cday-program.php', 'View')}`)}
                        ${item(`University of Kansas (HackKU) - Hackathon Judge`)}
                        ${item(`${linkBtn('https://devpost.com/sriramprabhu-rajendran/challenges', 'Devpost Judging Portfolio')}`)}
                    </div>
                    <div>
                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:0.5rem;">Industry Awards Judging</h5>
                        ${item(`<strong>Globee Awards - Artificial Intelligence:</strong> Judge
                            ${linkBtn('https://globeeawards.com/2026-judges-artificial-intelligence/', 'View')}
                            ${linkBtn('https://credential.globeeawards.com/c1930da5-d4d2-4d21-bcab-3d393b8ad792#acc.01CRyJ7X', 'Credential')}`)}
                        ${item(`<strong>Globee Awards - Excellence:</strong> Judge
                            ${linkBtn('https://globeeawards.com/2026-judges-excellence-awards/', 'View')}
                            ${linkBtn('https://credential.globeeawards.com/f1aed24e-a05d-43f3-b570-b63329c34f87#acc.gZGReXmv', 'Credential')}`)}
                        ${item(`<strong>Globee Awards - Achievement:</strong> Judge
                            ${linkBtn('https://globeeawards.com/2026-judges-achievement-awards/', 'View')}
                            ${linkBtn('https://credential.globeeawards.com/af705e86-b4e6-42d3-b984-450cc0759d26#acc.Ev0bqfCZ', 'Credential')}`)}

                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin:1rem 0 0.5rem;">Technical Program Committees</h5>
                        ${item(`<strong>BDAA International Committee</strong> ${linkBtn('https://bdaa-conference.com/', 'Visit')}`)}
                        ${item(`<strong>IEEE World AI IoT Congress</strong> ${linkBtn('https://worldaiiotcongress.org/technical-committee/', 'Visit')}`)}
                        ${item(`<strong>2AI Conference Committee</strong> ${linkBtn('https://2ai-conference.org/committee/organizingCommitte', 'Visit')}`)}
                    </div>
                </div>
            </div>
        `;
    }

    generateMembershipsSection() {
        const linkBtn = (url, label) => `<a href="${url}" target="_blank" rel="noopener" style="display:inline-block;padding:0.2rem 0.6rem;border:1px solid #e2e8f0;border-radius:0.375rem;font-size:0.8rem;font-weight:500;color:#3b82f6;text-decoration:none;margin:0.15rem 0.25rem 0.15rem 0;transition:all 0.2s ease;">${label}</a>`;
        const item = (content) => `<div style="padding:0.7rem 0;border-bottom:1px solid #f1f5f9;font-size:0.9rem;line-height:1.6;">${content}</div>`;

        return `
            <div class="author-section">
                <h4>🏛️ Recognition</h4>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;">
                    <div>
                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:0.5rem;">Professional Memberships</h5>
                        ${item(`<strong>IEEE Senior Member</strong> ${linkBtn('https://ieeexplore.ieee.org/Xplore/guesthome.jsp', 'IEEE')}`)}
                        ${item(`<strong>Sigma Xi Full Member</strong> ${linkBtn('https://hub.sigmaxi.org/personalsnapshot', 'Portal')}`)}
                        ${item(`<strong>IETE Fellow</strong> ${linkBtn('https://www.iete.org/iete-membership/', 'IETE')}`)}
                        ${item(`<strong>SAS Eminent Fellow</strong> ${linkBtn('https://www.sassociety.com/membership-id-sas-sefm-753-2026/', 'View')} ${linkBtn('https://www.sassociety.com/category/sefm/page/2/', 'Fellows List')}`)}
                        ${item(`<strong>IOASD Royal Fellow</strong> ${linkBtn('https://ioasd.org/2025/08/page/3/', 'IOASD')}`)}
                        ${item(`<strong>SCRS Fellow</strong> ${linkBtn('https://scrs.in/scrs-fellow/2034', 'View')}`)}
                        ${item(`<strong>IAENG Member</strong> ${linkBtn('https://www.iaeng.org/', 'IAENG')}`)}
                    </div>
                    <div>
                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin-bottom:0.5rem;">Certifications</h5>
                        ${item(`AWS Certified Solutions Architect - Professional (2022)`)}
                        ${item(`AWS Certified Solutions Architect - Associate (2017, renewed 2025)`)}
                        ${item(`IBM Certified SOA Solutions Architect (2014)`)}

                        <h5 style="font-size:0.95rem;font-weight:600;border-bottom:2px solid #e2e8f0;padding-bottom:0.5rem;margin:1rem 0 0.5rem;">Mentorship</h5>
                        ${item(`<strong>ADPList Mentor:</strong> Active mentor for engineering and technology professionals ${linkBtn('https://adplist.org/mentors/sriramprabhu-rajendran-moxrqalw', 'View Profile')}`)}
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
