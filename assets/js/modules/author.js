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
                ${this.generateMediaSection()}
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
        return `
            <div class="author-section">
                <h4>📄 Publications and Scholarly Work</h4>
                <ul class="achievement-list">
                    <li><strong>Patent:</strong> <a href="https://patents.google.com/patent/US11704637B2/en" target="_blank" rel="noopener">US Patent US11704637B2 - System and method to accept third-party payments</a> (<a href="https://www.goveda.com/patent/US-11704637-B2" target="_blank" rel="noopener">GoVeda mirror</a>) - Featured in <a href="https://dallasinnovates.com/dallas-invents-158-patents-granted-for-week-of-july-18/" target="_blank" rel="noopener">Dallas Innovates</a></li>
                    <li><strong>DZone:</strong> <a href="https://dzone.com/articles/data-contracts-circuit-breaker" target="_blank" rel="noopener">Data Contracts as Circuit Breaker for Model Reliability</a></li>
                    <li><strong>Dataversity:</strong> <a href="https://www.dataversity.net/articles/the-context-poisoning-crisis-why-metadata-is-the-new-security-perimeter/" target="_blank" rel="noopener">The Context Poisoning Crisis: Why Metadata Is the New Security Perimeter</a></li>
                    <li><strong>HackerNoon:</strong> <a href="https://hackernoon.com/the-builders-dilemma-balancing-creativity-and-consistency-in-agentic-workflows" target="_blank" rel="noopener">The Builder's Dilemma: Balancing Creativity and Consistency in Agentic Workflows</a></li>
                    <li><strong>HackerNoon:</strong> <a href="https://hackernoon.com/your-ai-generated-code-tests-might-be-lying-to-you" target="_blank" rel="noopener">Your AI-Generated Code Tests Might Be Lying to You</a></li>
                    <li><strong>HackerNoon:</strong> <a href="https://hackernoon.com/cut-inter-agent-latency-by-80percent-with-grpc-streaming" target="_blank" rel="noopener">Cut Inter-Agent Latency by 80% With gRPC Streaming</a></li>
                    <li><strong>BizTech Foundation:</strong> <a href="https://biztechfoundation.org/2026/04/04/agents-over-oracles-moving-enterprise-ai-from-conversation-to-coordination/" target="_blank" rel="noopener">Agents Over Oracles: Moving Enterprise AI from Conversation to Coordination</a></li>
                    <li><strong>CDO Magazine:</strong> <a href="https://www.cdomagazine.tech/opinion-analysis/agentic-ai-governance-3-ways-data-governance-must-evolve-for-autonomous-ai" target="_blank" rel="noopener">Agentic AI Governance: 3 Ways Data Governance Must Evolve for Autonomous AI</a></li>
                    <li><strong>FinTech Bloom:</strong> <a href="https://fintechbloom.com/architecture-of-resilience-building-compliant-open-api-ecosystems-for-regulated-industries/" target="_blank" rel="noopener">Architecture of Resilience: Building Compliant Open API Ecosystems for Regulated Industries</a></li>
                    <li><strong>LeadDev:</strong> <a href="https://leaddev.com/community/sriramprabhu-rajendran" target="_blank" rel="noopener">LeadDev Community Profile</a></li>
                    <li><strong>Dev.to:</strong> <a href="https://dev.to/rsri/beyond-the-single-prompt-orchestrating-parallel-context-isolation-pci-with-claude-code-f58" target="_blank" rel="noopener">Beyond the Single Prompt: Orchestrating Parallel Context Isolation</a></li>
                    <li><strong>Dev.to:</strong> <a href="https://dev.to/rsri/why-your-next-enterprise-chatbot-should-write-its-own-graphql-queries-4inh" target="_blank" rel="noopener">Why Your Next Enterprise Chatbot Should Write Its Own GraphQL Queries</a></li>
                    <li><strong>Medium:</strong> <a href="https://medium.com/@rajen.sriram/evolution-of-story-points-the-construction-to-curation-shift-97b06b9114fc" target="_blank" rel="noopener">Evolution of Story Points: The Construction-to-Curation Shift</a></li>
                    <li><strong>The Digital Project Manager:</strong> <a href="https://thedigitalprojectmanager.com/career/how-leaders-are-helping-project-managers-level-up/" target="_blank" rel="noopener">From Junior to Strategic: How Leaders Are Helping Project Managers Level Up</a></li>
                    <li><strong>IEEE ICCBI:</strong> <a href="https://www.iccbi.com/schedule.html" target="_blank" rel="noopener">IEEE ICCBI Conference Presentation</a></li>
                    <li><strong>IEEE AIS 2026:</strong> <a href="https://ais-conference.org/2026/program_details.php" target="_blank" rel="noopener">AIS 2026 Conference Program</a></li>
                    <li><strong>IJCA:</strong> <a href="https://www.ijcaonline.org/archives/volume187/number102/real-time-resilience-scaling-financial-risk-assessment-with-event-driven-cloud-architectures/" target="_blank" rel="noopener">Real-Time Resilience: Scaling Financial Risk Assessment with Event-Driven Cloud Architectures</a></li>
                    <li><strong>CSC Journals (IJE):</strong> <a href="https://www.cscjournals.org/library/manuscriptinfo.php?mc=IJE-526" target="_blank" rel="noopener">International Journal of Engineering - IJE-526</a></li>
                    <li><strong>Google Scholar:</strong> <a href="https://scholar.google.com/citations?user=OGYePQEAAAAJ" target="_blank" rel="noopener">Google Scholar Profile</a></li>
                    <li><strong>ResearchGate:</strong> <a href="https://www.researchgate.net/profile/Sriramprabhu-Rajendran" target="_blank" rel="noopener">ResearchGate Profile</a></li>
                    <li><strong>ORCID:</strong> <a href="https://orcid.org/0009-0009-6137-0877" target="_blank" rel="noopener">ORCID Profile</a></li>
                </ul>
            </div>
        `;
    }

    generateSpeakingSection() {
        return `
            <div class="author-section">
                <h4>🎤 Speaking Engagements and Conferences</h4>
                <ul class="achievement-list">
                    <li><a href="https://mitechcon.net/speakers/sriramprabhu-rajendran/" target="_blank" rel="noopener">MITechCon 2026 - Speaker</a></li>
                    <li><a href="https://www.scrs.in/conference/CIMA2026/speaker/talk/22986" target="_blank" rel="noopener">SCRS CIMA 2026 - Conference Speaker</a></li>
                    <li><a href="https://apidays.global/archive/2025/new-york-d3c79" target="_blank" rel="noopener">API Days New York 2025</a> - <a href="https://www.youtube.com/watch?v=IK5hQhuRM0E" target="_blank" rel="noopener">Watch the Talk</a></li>
                    <li><a href="https://apiworld.co/speakers/" target="_blank" rel="noopener">API World - Speaker</a></li>
                    <li><a href="https://cloudxconf.com/speakers/" target="_blank" rel="noopener">CloudX Conference - Speaker</a></li>
                    <li><a href="https://physical.f50.ai/dallas" target="_blank" rel="noopener">Physical AI Summit Dallas 2026</a> - <a href="https://physical.f50.ai/schedule" target="_blank" rel="noopener">Schedule</a></li>
                    <li><a href="https://mcna-conference.org/2026/program.php" target="_blank" rel="noopener">MCNA 2026 Conference</a></li>
                    <li><a href="https://ce2ct.gehu.ac.in/download/Final-Program-Schedule_CE2CT_2026_July%202-4-2026.pdf" target="_blank" rel="noopener">IEEE CE2CT 2026 Conference</a></li>
                    <li><a href="https://mitechcon.events/MITechCon2026#/speakers" target="_blank" rel="noopener">MITechCon 2026 Speaker Directory</a></li>
                </ul>
            </div>
        `;
    }

    generateMediaSection() {
        return `
            <div class="author-section">
                <h4>📰 Media Features and Interviews</h4>
                <ul class="achievement-list">
                    <li><strong>Authority Magazine:</strong> <a href="https://medium.com/authority-magazine/ai-beyond-writing-sriramprabhu-rajendran-on-practical-everyday-use-cases-for-ai-2b33e1f51c07" target="_blank" rel="noopener">AI Beyond Writing: Sriramprabhu Rajendran On Practical Everyday Use Cases for AI</a></li>
                    <li><strong>Authority Magazine:</strong> <a href="https://medium.com/authority-magazine/guardians-of-ai-sriramprabhu-rajendran-on-how-ai-leaders-are-keeping-ai-safe-ethical-cea3c043b358" target="_blank" rel="noopener">Guardians of AI: Sriramprabhu Rajendran On How AI Leaders Are Keeping AI Safe and Ethical</a></li>
                    <li><strong>Authority Magazine:</strong> <a href="https://medium.com/authority-magazine/creating-a-culture-of-courage-sriramprabhu-rajendran-on-how-leaders-can-create-an-environment-where-7c2120c0f10c" target="_blank" rel="noopener">Creating a Culture of Courage</a></li>
                    <li><strong>ValiantCEO:</strong> <a href="https://valiantceo.com/sriramprabhu-rajendran-insights-from-an-independent-researcher-thought-leader/" target="_blank" rel="noopener">Sriramprabhu Rajendran: Insights from an Independent Researcher and Thought Leader</a></li>
                    <li><strong>TechTarget:</strong> <a href="https://www.techtarget.com/searcherp/feature/Hybrid-architecture-as-a-permanent-enterprise-model" target="_blank" rel="noopener">Hybrid Architecture as a Permanent Enterprise Model</a></li>
                    <li><strong>Dice:</strong> <a href="https://www.dice.com/career-advice/speed-vs.-risk-experts-weigh-in-on-using-ai-coding-assistants" target="_blank" rel="noopener">Speed vs. Risk: Experts Weigh In on Using AI Coding Assistants</a></li>
                    <li><strong>She Rises Studios:</strong> <a href="https://www.sherisesstudios.com/post/resilient-leadership-the-case-for-self-healing-in-the-next-generation-of-systems-1" target="_blank" rel="noopener">Resilient Leadership: The Case for Self-Healing in the Next Generation of Systems</a></li>
                </ul>
            </div>
        `;
    }

    generateJudgingSection() {
        return `
            <div class="author-section">
                <h4>⚖️ Judging and Technical Committees</h4>
                <ul class="achievement-list">
                    <li><strong>Globee Awards:</strong> <a href="https://globeeawards.com/2026-judges-artificial-intelligence/" target="_blank" rel="noopener">2026 Judge - Artificial Intelligence</a> | <a href="https://globeeawards.com/2026-judges-excellence-awards/" target="_blank" rel="noopener">Excellence Awards</a> | <a href="https://globeeawards.com/2026-judges-achievement-awards/" target="_blank" rel="noopener">Achievement Awards</a></li>
                    <li><a href="https://credential.globeeawards.com/f1aed24e-a05d-43f3-b570-b63329c34f87#acc.gZGReXmv" target="_blank" rel="noopener">Globee Judge Credential - Excellence</a> | <a href="https://credential.globeeawards.com/c1930da5-d4d2-4d21-bcab-3d393b8ad792#acc.01CRyJ7X" target="_blank" rel="noopener">AI</a> | <a href="https://credential.globeeawards.com/af705e86-b4e6-42d3-b984-450cc0759d26#acc.Ev0bqfCZ" target="_blank" rel="noopener">Achievement</a></li>
                    <li><a href="https://bdaa-conference.com/" target="_blank" rel="noopener">BDAA 2026 - Big Data Analytics and Applications Conference</a></li>
                    <li><a href="https://worldaiiotcongress.org/technical-committee/" target="_blank" rel="noopener">World AI IoT Congress - Technical Committee</a></li>
                    <li><a href="https://2ai-conference.org/committee/organizingCommitte" target="_blank" rel="noopener">2AI Conference - Organizing Committee</a></li>
                    <li><a href="https://la-hacks-2025.devpost.com/" target="_blank" rel="noopener">LA Hacks 2025 - Judge</a></li>
                    <li><a href="https://campus.kennesaw.edu/colleges-departments/ccse/events/computing-showcase/sp26-cday-program.php" target="_blank" rel="noopener">Kennesaw State University - Computing Showcase Judge</a></li>
                    <li><a href="https://devpost.com/sriramprabhu-rajendran/challenges" target="_blank" rel="noopener">Devpost Judging Portfolio</a></li>
                </ul>
            </div>
        `;
    }

    generateMembershipsSection() {
        return `
            <div class="author-section">
                <h4>🏛️ Professional Memberships and Fellowships</h4>
                <ul class="achievement-list">
                    <li><strong>IEEE:</strong> Senior Member</li>
                    <li><strong>IOASD:</strong> <a href="https://ioasd.org/2025/08/page/3/" target="_blank" rel="noopener">Royal Fellow</a></li>
                    <li><strong>SCRS:</strong> <a href="https://scrs.in/scrs-fellow/2034" target="_blank" rel="noopener">SCRS Fellow</a></li>
                    <li><strong>Scholars Academic and Scientific Society:</strong> <a href="https://www.sassociety.com/membership-id-sas-sefm-753-2026/" target="_blank" rel="noopener">Eminent Fellow (SEFM)</a></li>
                    <li><strong>IETE:</strong> <a href="https://www.iete.org/iete-membership/" target="_blank" rel="noopener">Member</a></li>
                    <li><strong>Sigma Xi:</strong> Member</li>
                    <li><strong>ADPList:</strong> <a href="https://adplist.org/mentors/sriramprabhu-rajendran-moxrqalw" target="_blank" rel="noopener">Mentor</a></li>
                </ul>
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
