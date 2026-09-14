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
        return `
            <div class="author-section">
                <h4>📄 Patent</h4>
                <div class="publications-list">
                    <div class="publication-item">
                        <span class="publication-source">US Patent</span>
                        <span><strong>US11704637B2:</strong> System and method to accept third-party data
                            <a href="https://patents.google.com/patent/US11704637B2/en" target="_blank" rel="noopener">View Patent</a>
                            <a href="https://www.goveda.com/patent/US-11704637-B2" target="_blank" rel="noopener">Goveda</a>
                            <a href="https://dallasinnovates.com/dallas-invents-158-patents-granted-for-week-of-july-18/" target="_blank" rel="noopener">Dallas Innovates</a>
                        </span>
                    </div>
                </div>
            </div>
            <div class="author-section">
                <h4>📄 Research and Publications</h4>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h5>Scholarly Articles - Published</h5>
                        <div class="publications-list">
                            <div class="publication-item">
                                <span class="publication-source">IEEE ICCBI</span>
                                <span>Behavioral-Centric AI: Enhancing Cognitive Efficiency in High-Stakes Obligation Management (Dubai)
                                    <a href="https://www.iccbi.com/schedule.html" target="_blank" rel="noopener">View</a>
                                    <a href="https://ieeexplore.ieee.org/document/11619689" target="_blank" rel="noopener">IEEE Xplore</a>
                                </span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">IEEE AIS</span>
                                <span>Coordinating Specialized AI Agents for Compliance-Preserving Migration (San Antonio, TX)
                                    <a href="https://ais-conference.org/2026/program_details.php" target="_blank" rel="noopener">View</a>
                                    <a href="https://ieeexplore.ieee.org/abstract/document/11621268" target="_blank" rel="noopener">IEEE Xplore</a>
                                </span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">IEEE CE2CT</span>
                                <span>Decoupling Complex Domain Logic: A Bounded Context Approach (India)
                                    <a href="https://ce2ct.gehu.ac.in/" target="_blank" rel="noopener">Conference</a>
                                </span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">IJE</span>
                                <span>Optimizing Kafka-Based Event Streams for Low-Latency Financial Transaction Processing <a href="https://www.cscjournals.org/library/manuscriptinfo.php?mc=IJE-526" target="_blank" rel="noopener">View</a></span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">IJCA</span>
                                <span>Event-Driven Architecture Patterns for Real-Time Financial Risk Assessment
                                    <a href="https://www.ijcaonline.org/archives/volume187/number102/real-time-resilience-scaling-financial-risk-assessment-with-event-driven-cloud-architectures" target="_blank" rel="noopener">View</a>
                                    <a href="https://www.ijcaonline.org/archives/volume187/number102/" target="_blank" rel="noopener">Issue</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="skill-category">
                        <h5>Research Profiles</h5>
                        <div class="conference-tags">
                            <a href="https://scholar.google.com/citations?user=OGYePQEAAAAJ" target="_blank" rel="noopener" class="conference-tag">Google Scholar</a>
                            <a href="https://www.researchgate.net/profile/Sriramprabhu-Rajendran" target="_blank" rel="noopener" class="conference-tag">ResearchGate</a>
                            <a href="https://orcid.org/0009-0009-6137-0877" target="_blank" rel="noopener" class="conference-tag">ORCID</a>
                            <a href="https://www.linkedin.com/in/rsri" target="_blank" rel="noopener" class="conference-tag">LinkedIn</a>
                            <a href="https://github.com/sriramrajendran" target="_blank" rel="noopener" class="conference-tag">GitHub</a>
                        </div>
                        <h5>Peer Review</h5>
                        <ul class="achievement-list">
                            <li><strong>100+ papers reviewed</strong> for IEEE and various international conferences across 30+ venues</li>
                        </ul>
                        <h5>Conferences Reviewed For</h5>
                        <div class="conference-tags">
                            <a href="https://amity.edu/ICETM2026/Default.asp" target="_blank" rel="noopener" class="conference-tag">ICETM <small>(Long Island, NY)</small></a>
                            <a href="https://ce2ct.gehu.ac.in/" target="_blank" rel="noopener" class="conference-tag">CE2CT <small>(India)</small></a>
                            <a href="https://worldaiiotcongress.org/" target="_blank" rel="noopener" class="conference-tag">AIIoT <small>(Seattle, WA)</small></a>
                            <a href="https://ariia.in/" target="_blank" rel="noopener" class="conference-tag">ARIIA <small>(India)</small></a>
                            <a href="https://www.icias.org/" target="_blank" rel="noopener" class="conference-tag">ICoIAS <small>(China)</small></a>
                            <a href="https://ietcint.com/" target="_blank" rel="noopener" class="conference-tag">ICETCI <small>(India)</small></a>
                            <a href="https://amlds.site/" target="_blank" rel="noopener" class="conference-tag">AMLDS <small>(Osaka, Japan)</small></a>
                            <a href="https://www.stesi.in/" target="_blank" rel="noopener" class="conference-tag">STESI <small>(India)</small></a>
                            <a href="https://www.icbda.org/" target="_blank" rel="noopener" class="conference-tag">ICBDA <small>(Tokyo, Japan)</small></a>
                            <a href="https://www.ieee-discover.org/" target="_blank" rel="noopener" class="conference-tag">IEEE DISCOVER <small>(India)</small></a>
                            <a href="https://iccitx.chaire-connected-innovation.fr/" target="_blank" rel="noopener" class="conference-tag">ICCITX <small>(Paris, France)</small></a>
                            <a href="https://www.iccpct.in/" target="_blank" rel="noopener" class="conference-tag">ICCPCT <small>(India)</small></a>
                            <a href="https://difcon.mmu.edu.my/citic.html" target="_blank" rel="noopener" class="conference-tag">CITIC <small>(Malaysia)</small></a>
                            <a href="https://www.ic2pct.co.in/" target="_blank" rel="noopener" class="conference-tag">IC2PCT <small>(India)</small></a>
                            <a href="https://www.iecon2026.org/#top" target="_blank" rel="noopener" class="conference-tag">IECON <small>(India)</small></a>
                            <a href="https://ic4.co.in/" target="_blank" rel="noopener" class="conference-tag">InC4 <small>(India)</small></a>
                            <a href="https://research-conf.com/" target="_blank" rel="noopener" class="conference-tag">ISGAIE <small>(Morocco)</small></a>
                            <a href="https://icdcece.in/" target="_blank" rel="noopener" class="conference-tag">ICDCECE <small>(India)</small></a>
                            <a href="https://iciccs.in/" target="_blank" rel="noopener" class="conference-tag">ICICACS <small>(India)</small></a>
                            <a href="https://2ai-conference.org/" target="_blank" rel="noopener" class="conference-tag">2AI <small>(India)</small></a>
                            <a href="https://conf-imns.org/2026/index.html" target="_blank" rel="noopener" class="conference-tag">IMNS <small>(Atlanta, GA)</small></a>
                            <a href="https://2026.aspac-temscon.com/" target="_blank" rel="noopener" class="conference-tag">TEMSCON-ASPAC <small>(India)</small></a>
                            <a href="https://ceect.org/" target="_blank" rel="noopener" class="conference-tag">CEECT <small>(India)</small></a>
                            <a href="https://cvmi2026.coeptech.ac.in" target="_blank" rel="noopener" class="conference-tag">CVMI <small>(India)</small></a>
                            <a href="https://iciscn.in/index.php" target="_blank" rel="noopener" class="conference-tag">ICISCN <small>(India)</small></a>
                            <a href="https://sasigd.org/" target="_blank" rel="noopener" class="conference-tag">SASIGD <small>(India)</small></a>
                            <a href="https://www.cicba.in/" target="_blank" rel="noopener" class="conference-tag">CICBA <small>(India)</small></a>
                            <a href="https://2026.softcom.fesb.unist.hr" target="_blank" rel="noopener" class="conference-tag">SoftCom <small>(Split, Croatia)</small></a>
                            <a href="https://temsmet2026.sithyd.edu.in/index.html" target="_blank" rel="noopener" class="conference-tag">TEMSMET <small>(Hyderabad)</small></a>
                            <a href="https://ieee-uemcon.org/" target="_blank" rel="noopener" class="conference-tag">UEMCON <small>(NY)</small></a>
                            <a href="https://icacit.org.pe/symposium/" target="_blank" rel="noopener" class="conference-tag">ICACIT <small>(Chile)</small></a>
                            <a href="https://www.icecer.com/" target="_blank" rel="noopener" class="conference-tag">ICECER <small>(Turkey)</small></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="author-section">
                <h4>📝 Technical Articles</h4>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h5>Peer Reviewed Articles</h5>
                        <div class="publications-list">
                            <div class="publication-item">
                                <span class="publication-source">LeadDev</span>
                                <a href="https://leaddev.com/reporting/its-time-to-rethink-how-we-measure-engineering-productivity" target="_blank" rel="noopener">It is Time to Rethink How We Measure Engineering Productivity</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">LeadDev</span>
                                <a href="https://leaddev.com/community/sriramprabhu-rajendran" target="_blank" rel="noopener">Author Profile</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">DZone</span>
                                <a href="https://dzone.com/articles/data-contracts-circuit-breaker" target="_blank" rel="noopener">Data Contracts as "Circuit Breaker" for Model Reliability</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Dataversity</span>
                                <a href="https://www.dataversity.net/articles/the-context-poisoning-crisis-why-metadata-is-the-new-security-perimeter" target="_blank" rel="noopener">The Context Poisoning Crisis: Why Metadata Is the New Security Perimeter</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">HackerNoon</span>
                                <a href="https://hackernoon.com/the-builders-dilemma-balancing-creativity-and-consistency-in-agentic-workflows" target="_blank" rel="noopener">The Builder Dilemma: Balancing Creativity and Consistency</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">HackerNoon</span>
                                <a href="https://hackernoon.com/your-ai-generated-code-tests-might-be-lying-to-you" target="_blank" rel="noopener">Your AI-Generated Code Tests Might Be Lying to You</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">HackerNoon</span>
                                <a href="https://hackernoon.com/cut-inter-agent-latency-by-80percent-with-grpc-streaming" target="_blank" rel="noopener">Cut Inter-Agent Latency by 80% with gRPC Streaming</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">BizTech</span>
                                <a href="https://biztechfoundation.org/2026/04/04/agents-over-oracles-moving-enterprise-ai-from-conversation-to-coordination" target="_blank" rel="noopener">Agents Over Oracles: Moving Enterprise AI from Conversation to Coordination</a>
                            </div>
                        </div>
                    </div>
                    <div class="skill-category">
                        <h5>Blogs</h5>
                        <div class="publications-list">
                            <div class="publication-item">
                                <span class="publication-source">Dev.to</span>
                                <a href="https://dev.to/rsri/mutation-testing-the-missing-safety-net-for-ai-generated-code-54kn" target="_blank" rel="noopener">Mutation Testing: The Missing Safety Net for AI-Generated Code</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Dev.to</span>
                                <a href="https://dev.to/rsri/why-your-next-enterprise-chatbot-should-write-its-own-graphql-queries-4inh" target="_blank" rel="noopener">Why Your Next Enterprise Chatbot Should Write Its Own GraphQL Queries</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Dev.to</span>
                                <a href="https://dev.to/rsri/beyond-the-single-prompt-orchestrating-parallel-context-isolation-pci-with-claude-code-f58" target="_blank" rel="noopener">Beyond the Single Prompt: Orchestrating Parallel Context Isolation</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Dev.to</span>
                                <a href="https://dev.to/rsri/why-story-points-dont-work-in-the-ai-era-and-what-should-take-their-place-instead-5a27" target="_blank" rel="noopener">Why Story Points Do Not Work in the AI Era</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Medium</span>
                                <a href="https://medium.com/@rajen.sriram/evolution-of-story-points-the-construction-to-curation-shift-97b06b9114fc" target="_blank" rel="noopener">Evolution of Story Points: The Construction to Curation Shift</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">BizTech Bytes</span>
                                <a href="https://www.linkedin.com/feed/update/urn:li:activity:7465037320950452224/" target="_blank" rel="noopener">Enterprise AI Thought Leadership - Guest Post</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">BeaconOfTech</span>
                                <a href="https://beaconoftech.com/#author" target="_blank" rel="noopener">Personal Technical Blog - Author Page</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateSpeakingSection() {
        return `
            <div class="author-section">
                <h4>🎤 Speaking and Media</h4>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h5>Conference Speaking</h5>
                        <div class="publications-list">
                            <div class="publication-item">
                                <span class="publication-source">API Days</span>
                                <span>Agent-Ready Orchestration - Engineering APIs for the Execution Layer (NY)
                                    <a href="https://www.apidays.global/archive/2026/new-york" target="_blank" rel="noopener">Event</a>
                                    <a href="https://apidays.global/archive/2025/new-york-d3c79" target="_blank" rel="noopener">Archive</a>
                                    <a href="https://www.youtube.com/watch?v=IK5hQhuRM0E" target="_blank" rel="noopener">Watch</a>
                                </span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">CIMA 2026</span>
                                <span>Keynote Speaker (India)
                                    <a href="https://www.scrs.in/conference/CIMA2026/speaker/talk/22986" target="_blank" rel="noopener">Talk</a>
                                    <a href="https://www.scrs.in/conference/CIMA2026" target="_blank" rel="noopener">Conference</a>
                                    <a href="https://scrs.in/conference/CIMA2026/page/CIMA_2026_Program_Schedule" target="_blank" rel="noopener">Schedule</a>
                                </span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">API World</span>
                                <span>Speaker (Santa Clara, CA)
                                    <a href="https://apiworld.co/speakers" target="_blank" rel="noopener">Speakers</a>
                                    <a href="https://apiworld.co/speakers/" target="_blank" rel="noopener">Speakers 2</a>
                                </span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">CloudX</span>
                                <span>Speaker (Santa Clara, CA) <a href="https://cloudxconf.com/speakers/" target="_blank" rel="noopener">Speakers</a></span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">F50 AI Summit</span>
                                <span>Featured Speaker (Dallas)
                                    <a href="https://physical.f50.ai/dallas" target="_blank" rel="noopener">Event</a>
                                    <a href="https://physical.f50.ai/schedule" target="_blank" rel="noopener">Schedule</a>
                                </span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">MITechCon</span>
                                <span>Speaker
                                    <a href="https://www.mitechcon.net/speakers/sriramprabhu-rajendran/" target="_blank" rel="noopener">Profile</a>
                                    <a href="https://www.mitechcon.org/speakers/" target="_blank" rel="noopener">Speakers</a>
                                    <a href="https://mitechcon.events/MITechCon2026#/speakers" target="_blank" rel="noopener">Directory</a>
                                </span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">MCNA 2026</span>
                                <span>Speaker (San Antonio) <a href="https://mcna-conference.org/2026/program.php" target="_blank" rel="noopener">Program</a></span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">IEEE CE2CT</span>
                                <span>Presenter (India) <a href="https://ce2ct.gehu.ac.in/download/Final-Program-Schedule_CE2CT_2026_July%202-4-2026.pdf" target="_blank" rel="noopener">Schedule</a></span>
                            </div>
                        </div>
                    </div>
                    <div class="skill-category">
                        <h5>Media Features and Interviews</h5>
                        <div class="publications-list">
                            <div class="publication-item">
                                <span class="publication-source">CDO Magazine</span>
                                <a href="https://www.cdomagazine.tech/opinion-analysis/agentic-ai-governance-3-ways-data-governance-must-evolve-for-autonomous-ai" target="_blank" rel="noopener">Agentic AI Governance: 3 Ways Data Governance Must Evolve</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">TechTarget</span>
                                <a href="https://www.techtarget.com/searcherp/feature/Hybrid-architecture-as-a-permanent-enterprise-model" target="_blank" rel="noopener">Hybrid Architecture as a Permanent Enterprise Model</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Dice</span>
                                <a href="https://www.dice.com/career-advice/speed-vs.-risk-experts-weigh-in-on-using-ai-coding-assistants" target="_blank" rel="noopener">Speed vs. Risk: Experts Weigh In on Using AI Coding Assistants</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">DPM</span>
                                <a href="https://thedigitalprojectmanager.com/career/how-leaders-are-helping-project-managers-level-up/" target="_blank" rel="noopener">How Leaders Are Helping Project Managers Level Up</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">FinTech Bloom</span>
                                <a href="https://fintechbloom.com/architecture-of-resilience-building-compliant-open-api-ecosystems-for-regulated-industries/" target="_blank" rel="noopener">Architecture of Resilience: Building Compliant Open API Ecosystems</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">She Rises</span>
                                <a href="https://www.sherisesstudios.com/post/resilient-leadership-the-case-for-self-healing-in-the-next-generation-of-systems-1" target="_blank" rel="noopener">Resilient Leadership: The Case for Self-Healing Systems</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Authority Mag</span>
                                <a href="https://medium.com/authority-magazine/ai-beyond-writing-sriramprabhu-rajendran-on-practical-everyday-use-cases-for-ai-2b33e1f51c07" target="_blank" rel="noopener">AI Beyond Writing: Practical Everyday Use Cases for AI</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Authority Mag</span>
                                <a href="https://medium.com/authority-magazine/guardians-of-ai-sriramprabhu-rajendran-on-how-ai-leaders-are-keeping-ai-safe-ethical-cea3c043b358" target="_blank" rel="noopener">Guardians of AI: How AI Leaders Are Keeping AI Safe</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Authority Mag</span>
                                <a href="https://medium.com/authority-magazine/creating-a-culture-of-courage-sriramprabhu-rajendran-independent-researcher-and-industry-thought-9e9d6df296a3" target="_blank" rel="noopener">Creating a Culture of Courage</a>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">ValiantCEO</span>
                                <a href="https://valiantceo.com/sriramprabhu-rajendran-insights-from-an-independent-researcher-thought-leader" target="_blank" rel="noopener">Insights from an Independent Researcher and Thought Leader</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateMediaSection() {
        return '';
    }

    generateJudgingSection() {
        return `
            <div class="author-section">
                <h4>⚖️ Judging and Technical Committees</h4>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h5>Hackathon and Capstone Judging</h5>
                        <div class="publications-list">
                            <div class="publication-item">
                                <span>UCLA (LA Hacks) - Hackathon Judge <a href="https://la-hacks-2025.devpost.com/" target="_blank" rel="noopener">View</a></span>
                            </div>
                            <div class="publication-item">
                                <span>Georgia Tech - Capstone Projects Judge</span>
                            </div>
                            <div class="publication-item">
                                <span>Kennesaw State University - Capstone Projects Judge <a href="https://campus.kennesaw.edu/colleges-departments/ccse/events/computing-showcase/sp26-cday-program.php" target="_blank" rel="noopener">View</a></span>
                            </div>
                            <div class="publication-item">
                                <span>University of Kansas (HackKU) - Hackathon Judge</span>
                            </div>
                            <div class="publication-item">
                                <a href="https://devpost.com/sriramprabhu-rajendran/challenges" target="_blank" rel="noopener">Devpost Judging Portfolio</a>
                            </div>
                        </div>
                    </div>
                    <div class="skill-category">
                        <h5>Industry Awards Judging</h5>
                        <div class="publications-list">
                            <div class="publication-item">
                                <span class="publication-source">Globee AI</span>
                                <span>Judge <a href="https://globeeawards.com/2026-judges-artificial-intelligence" target="_blank" rel="noopener">View</a> <a href="https://globeeawards.com/2026-judges-artificial-intelligence/" target="_blank" rel="noopener">View 2</a> <a href="https://credential.globeeawards.com/c1930da5-d4d2-4d21-bcab-3d393b8ad792#acc.01CRyJ7X" target="_blank" rel="noopener">Credential</a></span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Globee Excellence</span>
                                <span>Judge <a href="https://globeeawards.com/2026-judges-excellence-awards" target="_blank" rel="noopener">View</a> <a href="https://globeeawards.com/2026-judges-excellence-awards/" target="_blank" rel="noopener">View 2</a> <a href="https://credential.globeeawards.com/f1aed24e-a05d-43f3-b570-b63329c34f87#acc.gZGReXmv" target="_blank" rel="noopener">Credential</a></span>
                            </div>
                            <div class="publication-item">
                                <span class="publication-source">Globee Achievement</span>
                                <span>Judge <a href="https://globeeawards.com/2026-judges-achievement-awards" target="_blank" rel="noopener">View</a> <a href="https://globeeawards.com/2026-judges-achievement-awards/" target="_blank" rel="noopener">View 2</a> <a href="https://credential.globeeawards.com/af705e86-b4e6-42d3-b984-450cc0759d26#acc.Ev0bqfCZ" target="_blank" rel="noopener">Credential</a></span>
                            </div>
                        </div>
                        <h5>Technical Program Committees</h5>
                        <div class="publications-list">
                            <div class="publication-item">
                                <span><strong>BDAA International Committee</strong> <a href="https://bdaa-conference.com" target="_blank" rel="noopener">Visit</a> <a href="https://bdaa-conference.com/" target="_blank" rel="noopener">Visit 2</a></span>
                            </div>
                            <div class="publication-item">
                                <span><strong>IEEE World AI IoT Congress</strong> <a href="https://worldaiiotcongress.org/technical-committee" target="_blank" rel="noopener">Visit</a> <a href="https://worldaiiotcongress.org/technical-committee/" target="_blank" rel="noopener">Visit 2</a></span>
                            </div>
                            <div class="publication-item">
                                <span><strong>2AI Conference Committee</strong> <a href="https://2ai-conference.org/committee/OrganizingCommitte" target="_blank" rel="noopener">Visit</a></span>
                            </div>
                            <div class="publication-item">
                                <span><strong>CITIC</strong> <a href="https://difcon.mmu.edu.my/citic.html" target="_blank" rel="noopener">Visit</a></span>
                            </div>
                            <div class="publication-item">
                                <span><strong>CICBA</strong> <a href="https://www.cicba.in/committee.html" target="_blank" rel="noopener">Visit</a></span>
                            </div>
                            <div class="publication-item">
                                <span><strong>IEEE UEMCON</strong> <a href="https://ieee-uemcon.org/technical-program-committee/" target="_blank" rel="noopener">Visit</a></span>
                            </div>
                            <div class="publication-item">
                                <span><strong>ICACIT</strong> <a href="https://icacit.org.pe/symposium/reviews/" target="_blank" rel="noopener">Visit</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateMembershipsSection() {
        return `
            <div class="author-section">
                <h4>🏛️ Recognition</h4>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h5>Professional Memberships</h5>
                        <div class="publications-list">
                            <div class="publication-item"><span><strong>IEEE Senior Member</strong> <a href="https://ieeexplore.ieee.org/Xplore/guesthome.jsp" target="_blank" rel="noopener">IEEE</a></span></div>
                            <div class="publication-item"><span><strong>Sigma Xi Full Member</strong> <a href="https://hub.sigmaxi.org/personalsnapshot" target="_blank" rel="noopener">Portal</a></span></div>
                            <div class="publication-item"><span><strong>IETE Fellow</strong> <a href="https://www.iete.org/iete-membership/" target="_blank" rel="noopener">IETE</a></span></div>
                            <div class="publication-item"><span><strong>SAS Eminent Fellow</strong> <a href="https://www.sassociety.com/membership-id-sas-sefm-753-2026/" target="_blank" rel="noopener">View</a> <a href="https://www.sassociety.com/category/sefm/page/2/" target="_blank" rel="noopener">Fellows List</a></span></div>
                            <div class="publication-item"><span><strong>IOASD Royal Fellow</strong> <a href="https://ioasd.org/2025/08/page/3/" target="_blank" rel="noopener">IOASD</a></span></div>
                            <div class="publication-item"><span><strong>SCRS Fellow</strong> <a href="https://scrs.in/scrs-fellow/2034" target="_blank" rel="noopener">View</a></span></div>
                            <div class="publication-item"><span><strong>IAENG Member</strong> <a href="https://www.iaeng.org/" target="_blank" rel="noopener">IAENG</a></span></div>
                        </div>
                    </div>
                    <div class="skill-category">
                        <h5>Certifications</h5>
                        <ul class="achievement-list">
                            <li>AWS Certified Solutions Architect - Professional <small>2022</small></li>
                            <li>AWS Certified Solutions Architect - Associate <small>2017, renewed 2025</small></li>
                            <li>IBM Certified SOA Solutions Architect <small>2014</small></li>
                        </ul>
                        <h5>Mentorship</h5>
                        <div class="publications-list">
                            <div class="publication-item">
                                <span class="publication-source">ADPList</span>
                                <span>Active mentor for engineering and technology professionals <a href="https://adplist.org/mentors/sriramprabhu-rajendran-moxrqalw" target="_blank" rel="noopener">View Profile</a></span>
                            </div>
                        </div>
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
