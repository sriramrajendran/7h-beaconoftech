import React, { useState, useEffect } from 'react';
import Icon from './ui/Icon';
import { useAppContext } from '../contexts/AppContext';
import Blog from './modules/Blog';
import Playbooks from './modules/Playbooks';
import Projects from './modules/Projects';
import Patterns from './modules/Patterns';
import CandlestickPatterns from './modules/CandlestickPatterns';
import Author from './modules/Author';
import Portfolio from './modules/Portfolio';
import Watchlist from './modules/Watchlist';
import Screener from './modules/Screener';

const PageManager = () => {
    const { currentPage, isClient, setCurrentPage } = useAppContext();
    const [config, setConfig] = useState(null);

    const initializeConfig = async () => {
        await loadConfig();
        console.log('PageManager: Configuration loaded and initialized');
    };

    useEffect(() => {
        if (!isClient) return; // Skip on server
        
        console.log('PageManager: Constructor called');
        initializeModules();
        initializeConfig();
        initializeSessionStorage();
        
        // Reinitialize Lucide icons after component mount
        if (typeof window !== 'undefined' && window.lucide) {
            setTimeout(() => window.lucide.createIcons(), 100);
        }
        
        // setupCollapsibleMenus(); // This will be handled by React components
        // setupTableControls(); // This will be handled by React components

        // Page state is now managed by AppContext, no need for duplicate hash handling here

    }, [isClient]);

    const initializeModules = () => {
        console.log('PageManager: Modules initialized');
    };

    const initializeSessionStorage = () => {
        if (!sessionStorage.getItem('portfolioSymbols')) {
            sessionStorage.setItem('portfolioSymbols', JSON.stringify(getDefaultStocks('portfolio')));
        }
        if (!sessionStorage.getItem('watchlistSymbols')) {
            sessionStorage.setItem('watchlistSymbols', JSON.stringify(getDefaultStocks('watchlist')));
        }
    };

    const saveSymbolsToSession = (pageType, symbols) => {
        const storageKey = pageType === 'portfolio' ? 'portfolioSymbols' : 'watchlistSymbols';
        sessionStorage.setItem(storageKey, JSON.stringify(symbols));
    };

    const loadSymbolsFromSession = (pageType) => {
        const storageKey = pageType === 'portfolio' ? 'portfolioSymbols' : 'watchlistSymbols';
        const stored = sessionStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : getDefaultStocks(pageType);
    };

    // This functionality will be handled by React components with state for navigation.
    const setupCollapsibleMenus = () => {
        console.log('setupCollapsibleMenus called - to be refactored into React components');
    };

    // This functionality will be handled by React components with state for search and filter.
    const setupTableControls = () => {
        console.log('setupTableControls called - to be refactored into React components');
    };

    // This functionality will be handled by React components with state for search and filter.
    const applyTableFilters = () => {
        console.log('applyTableFilters called - to be refactored into React components');
    };

    const loadConfig = async () => {
        try {
            const isLocal = window.location.hostname === 'localhost' ||
                           window.location.hostname === '127.0.0.1' ||
                           window.location.hostname.startsWith('192.168.') ||
                           window.location.hostname.startsWith('10.');
            
            const isCloudflare = window.location.hostname.includes('pages.dev') ||
                                window.location.hostname.includes('beaconoftech.com');
            
            let configFileName;
            if (isLocal) {
                configFileName = 'config.local.json';
            } else if (isCloudflare) {
                configFileName = 'config.cloudflare.json';
            } else {
                configFileName = 'config.github.json';
            }
            
            console.log(`Loading ${isLocal ? 'local' : isCloudflare ? 'Cloudflare' : 'GitHub Pages'} configuration...`);
            
            const response = await fetch(`input/${configFileName}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${configFileName}: ${response.status}`);
            }
            
            setConfig(await response.json());
            console.log(`Configuration loaded for ${config?.environment}:`, config);
            
            // Update API strategy based on config (to be refactored)
            // if (window.stockAnalyzer) {
            //     window.stockAnalyzer.updateAPIConfig(config.api);
            // }
            
            // Show configuration status to user
            if (config?.api?.fallback?.useMockData) {
                console.log(' Mock data enabled - using demo data for testing');
            } else {
                console.log(' Live data enabled - attempting to fetch real market data');
            }
            
        } catch (error) {
            console.error('Failed to load configuration:', error);
            console.log(' Using fallback configuration with mock data...');
            
            setConfig({
                environment: 'fallback',
                portfolio: { symbols: ['AAPL', 'MSFT', 'GOOGL', 'TSLA'], defaultPeriod: '1y', defaultTopN: 5 },
                watchlist: { symbols: ['SPY', 'QQQ', 'IWM'], defaultPeriod: '6mo', defaultTopN: 3 },
                market: { symbols: ['AAPL', 'MSFT', 'GOOGL', 'AMZN'], defaultPeriod: '3mo', defaultTopN: 10 },
                etf: { symbols: ['SPY', 'QQQ', 'IWM'], defaultPeriod: '6mo', defaultTopN: 8 },
                api: { 
                    strategy: 'mock',
                    fallback: { useMockData: true }
                }
            });
            
            // Update API config for fallback (to be refactored)
            // if (window.stockAnalyzer) {
            //     window.stockAnalyzer.updateAPIConfig(config.api);
            // }
        }
    };

    const getDefaultStocks = (pageType) => {
        if (!config) {
            return ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];
        }
        return config[pageType]?.symbols || ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];
    };

    const getDefaultPeriod = (pageType) => {
        return config?.[pageType]?.defaultPeriod || '1y';
    };

    const getDefaultTopN = (pageType) => {
        return config?.[pageType]?.defaultTopN || 5;
    };

    const updateTagline = (pageType) => {
        // This will be handled by React components and state
        console.log(`updateTagline called for ${pageType}`);
    };
    
    const updateSidebarFooter = (showAttribution) => {
        // This will be handled by React components and state
        console.log(`updateSidebarFooter called with ${showAttribution}`);
    };

    // Helper methods for fundamental data generation (single set, no duplicates)
    const generateMarketCap = (price) => {
        if (!price) return 'N/A';
        const marketCap = price * (1000000000 + Math.random() * 9000000000);
        if (marketCap >= 1000000000000) {
            return `$${(marketCap / 1000000000000).toFixed(1)}T`;
        } else if (marketCap >= 1000000000) {
            return `$${(marketCap / 1000000000).toFixed(1)}B`;
        } else if (marketCap >= 1000000) {
            return `$${(marketCap / 1000000).toFixed(1)}M`;
        }
        return `$${marketCap.toFixed(0)}`;
    };
    
    const generatePERatio = (symbol) => {
        const peRatios = {
            'AAPL': '28.5',
            'MSFT': '32.1',
            'GOOGL': '25.8',
            'TSLA': '68.2',
            'NVDA': '45.3',
            'AMZN': '52.7',
            'META': '24.9'
        };
        return peRatios[symbol] || (15 + Math.random() * 35).toFixed(1);
    };
    
    const generateEPS = (symbol) => {
        const epsValues = {
            'AAPL': '6.05',
            'MSFT': '11.82',
            'GOOGL': '5.61',
            'TSLA': '3.12',
            'NVDA': '18.45',
            'AMZN': '2.85',
            'META': '13.64'
        };
        return `$${epsValues[symbol] || (1 + Math.random() * 20).toFixed(2)}`;
    };
    
    const generateVolume = () => {
        const volume = Math.floor(Math.random() * 50000000) + 10000000;
        if (volume >= 1000000) {
            return `${(volume / 1000000).toFixed(1)}M`;
        }
        return `${(volume / 1000).toFixed(0)}K`;
    };
    
    const generateAvgVolume = () => {
        const volume = Math.floor(Math.random() * 40000000) + 8000000;
        if (volume >= 1000000) {
            return `${(volume / 1000000).toFixed(1)}M`;
        }
        return `${(volume / 1000).toFixed(0)}K`;
    };
    
    const showStockDetails = (symbol) => {
        console.log('showStockDetails called for:', symbol);
        // Stock details modal functionality
    };
    
    const displayDetailedModal = (stock) => {
        console.log('displayDetailedModal called for:', stock.symbol);
    };

    const getRecommendationClass = (recommendation) => {
        if (!recommendation || typeof recommendation !== 'string') return 'recommendation-hold';
        if (recommendation.includes('BUY')) return 'recommendation-buy';
        if (recommendation.includes('SELL')) return 'recommendation-sell';
        return 'recommendation-hold';
    };
    
    const getRSIClass = (rsi) => {
        if (rsi >= 70) return 'overbought';
        if (rsi <= 30) return 'oversold';
        return 'neutral';
    };
    
    const generatePatternBadge = (type, pattern) => {
        if (!pattern || pattern.status === 'none') {
            return <span className="pattern-badge pattern-none">—</span>;
        }
        
        let badgeClass = 'pattern-none';
        let content = '—';
        let title = '';
        
        switch(type) {
            case 'vcp':
                if (pattern.status === 'strong') {
                    badgeClass = 'pattern-strong-vcp';
                    content = 'VCP';
                    title = 'Strong Volatility Contraction Pattern';
                } else if (pattern.status === 'weak') {
                    badgeClass = 'pattern-weak-vcp';
                    content = 'VCP';
                    title = 'Weak Volatility Contraction Pattern';
                }
                break;
            case 'rsi_div':
                if (pattern.status === 'bullish') {
                    badgeClass = 'pattern-bullish';
                    content = '↑';
                    title = 'Bullish RSI Divergence';
                } else if (pattern.status === 'bearish') {
                    badgeClass = 'pattern-bearish';
                    content = '↓';
                    title = 'Bearish RSI Divergence';
                }
                break;
            case 'macd_div':
                if (pattern.status === 'bullish') {
                    badgeClass = 'pattern-bullish';
                    content = '↑';
                    title = 'Bullish MACD Divergence';
                } else if (pattern.status === 'bearish') {
                    badgeClass = 'pattern-bearish';
                    content = '↓';
                    title = 'Bearish MACD Divergence';
                }
                break;
            case 'cross':
                if (pattern.status === 'confirmed') {
                    badgeClass = 'pattern-confirmed';
                    content = '✓';
                    title = 'Confirmed Crossover';
                } else if (pattern.status === 'unconfirmed') {
                    badgeClass = 'pattern-unconfirmed';
                    content = '○';
                    title = 'Unconfirmed Crossover';
                }
                break;
            case 'breakout':
                if (pattern.status === 'setup') {
                    badgeClass = 'pattern-bullish';
                    content = 'BO';
                    title = 'Breakout Setup Detected';
                }
                break;
        }
        
        return <span className={`pattern-badge ${badgeClass}`} title={title}>{content}</span>;
    };

    const generatePatternCard = (title, pattern) => {
        if (!pattern || pattern.status === 'none') {
            return (
                <div className="pattern-card">
                    <div className="pattern-title">{title}</div>
                    <div className="pattern-status pattern-none">No Pattern</div>
                    <div className="pattern-description">No significant pattern detected</div>
                </div>
            );
        }
        
        let statusClass = 'pattern-none';
        let statusText = 'None';
        
        switch(pattern.status) {
            case 'strong':
                statusClass = 'pattern-strong-vcp';
                statusText = 'Strong';
                break;
            case 'weak':
                statusClass = 'pattern-weak-vcp';
                statusText = 'Weak';
                break;
            case 'bullish':
                statusClass = 'pattern-bullish';
                statusText = 'Bullish';
                break;
            case 'bearish':
                statusClass = 'pattern-bearish';
                statusText = 'Bearish';
                break;
            case 'confirmed':
                statusClass = 'pattern-confirmed';
                statusText = 'Confirmed';
                break;
            case 'unconfirmed':
                statusClass = 'pattern-unconfirmed';
                statusText = 'Unconfirmed';
                break;
            case 'setup':
                statusClass = 'pattern-bullish';
                statusText = 'Setup';
                break;
        }
        
        return (
            <div className="pattern-card">
                <div className="pattern-title">{title}</div>
                <div className={`pattern-status ${statusClass}`}>{statusText}</div>
                {pattern.strength && <div className="pattern-strength">Strength: {pattern.strength}</div>}
                {pattern.confidence && <div className="pattern-strength">Confidence: {pattern.confidence}</div>}
                {pattern.description && <div className="pattern-description">{pattern.description}</div>}
                {pattern.indicators && (
                    <div className="pattern-indicators">
                        <ul>
                            {pattern.indicators.map((ind, index) => <li key={index}>{ind}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    const handleFormSubmit = async (pageType) => {
        console.log(`handleFormSubmit called for ${pageType}`);
        // Form submission functionality
    };

    const getCurrentPageContent = () => {
        // If no page is selected, show welcome content (Header and Welcome are handled by AppLayout)
        if (!currentPage || currentPage === '') {
            return (
                <div className="space-y-8" suppressHydrationWarning={true}>
                    {/* Feature Cards */}
                    <section aria-labelledby="features-heading" suppressHydrationWarning={true}>
                        <h2 id="features-heading" className="sr-only">Key Features</h2>
                        <div className="feature-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                            <article className="feature-card bg-card-bg border border-border rounded-2xl p-6 shadow-md flex flex-col items-center text-center min-h-[200px]" aria-labelledby="ai-ml-title">
                                <div className="feature-icon w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center text-white mb-4">
                                    <Icon iconName="brain" className="w-6 h-6" />
                                </div>
                                <h3 id="ai-ml-title" className="text-xl font-semibold text-text mb-2 font-display">AI & Machine Learning</h3>
                                <p className="text-text-light text-base leading-relaxed">Deep dives into LLMs, computer vision, and the practical applications of AI in production systems.</p>
                            </article>
                            <article className="feature-card bg-card-bg border border-border rounded-2xl p-6 shadow-md flex flex-col items-center text-center min-h-[200px]" aria-labelledby="software-arch-title">
                                <div className="feature-icon w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center text-white mb-4">
                                    <Icon iconName="code" className="w-6 h-6" />
                                </div>
                                <h3 id="software-arch-title" className="text-xl font-semibold text-text mb-2 font-display">Software Architecture</h3>
                                <p className="text-text-light text-base leading-relaxed">Microservices, distributed systems, and cloud-native patterns for building resilient applications.</p>
                            </article>
                            <article className="feature-card bg-card-bg border border-border rounded-2xl p-6 shadow-md flex flex-col items-center text-center min-h-[200px]" aria-labelledby="perf-eng-title">
                                <div className="feature-icon w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center text-white mb-4">
                                    <Icon iconName="zap" className="w-6 h-6" />
                                </div>
                                <h3 id="perf-eng-title" className="text-xl font-semibold text-text mb-2 font-display">Performance Engineering</h3>
                                <p className="text-text-light text-base leading-relaxed">Optimization techniques, monitoring strategies, and scaling lessons from high-traffic systems.</p>
                            </article>
                        </div>
                    </section>
                    
                    {/* About Section */}
                    <section className="about-section bg-card-bg border border-border rounded-2xl shadow-lg p-8" aria-labelledby="about-heading" suppressHydrationWarning={true}>
                        <div className="about-content grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div className="about-text">
                                <h2 id="about-heading" className="about-title text-3xl font-bold font-display text-text mb-6 text-center lg:text-left">About BeaconOfTech</h2>
                                <p className="text-base text-text mb-4 leading-relaxed">Personal platform by <strong className="font-semibold text-accent">Sriram Rajendran</strong> for sharing technology insights, innovation analysis, and educational content.</p>
                                <p className="text-sm text-text-light leading-relaxed">Focused on emerging tech trends, AI developments, and digital transformation perspectives from hands-on experience.</p>
                            </div>
                            <div className="about-focus">
                                <h3 className="text-lg font-semibold text-text mb-4 font-display">Core Focus Areas</h3>
                                <ul className="space-y-2">
                                    <li className="text-sm text-text-light leading-relaxed pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-accent before:font-semibold">Technology Innovation & Trends</li>
                                    <li className="text-sm text-text-light leading-relaxed pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-accent before:font-semibold">AI & Machine Learning Insights</li>
                                    <li className="text-sm text-text-light leading-relaxed pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-accent before:font-semibold">Digital Transformation Strategies</li>
                                    <li className="text-sm text-text-light leading-relaxed pl-6 relative before:content-['→'] before:absolute before:left-0 before:text-accent before:font-semibold">Educational Knowledge Sharing</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
        
        switch(currentPage) {
            case 'tech-blog':
                return <Blog />;
            case 'tech-playbooks':
                return <Playbooks />;
            case 'tech-projects':
                return <Projects />;
            case 'patterns':
                return <Patterns />;
            case 'candlestick-patterns':
                return <CandlestickPatterns />;
            case 'author':
                return <Author />;
            case 'portfolio':
                return <Portfolio />;
            case 'watchlist':
                return <Watchlist />;
            case 'screener':
                return <Screener />;
            case 'us-stocks':
                return <USStocks />;
            case 'etf':
                return <ETF />;
            case 'crypto':
                return <Crypto />;
            default:
                return <div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Page not found</h2></div>;
        }
    };

    return (
        <div id="page-manager-root">
            {getCurrentPageContent()}
        </div>
    );
};

export default PageManager;
