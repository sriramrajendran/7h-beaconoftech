// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    // Set active nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if ((currentPath === '/' && link.id === 'nav-portfolio') || 
            (currentPath === '/watchlist' && link.id === 'nav-watchlist') ||
            (currentPath === '/market' && link.id === 'nav-market') ||
            (currentPath === '/etf' && link.id === 'nav-etf')) {
            link.classList.add('active');
        }
    });
    
    // Auto-load data based on page type
    const pageType = window.PAGE_TYPE || 
                    (currentPath === '/watchlist' ? 'watchlist' : 
                     currentPath === '/market' ? 'market' :
                     currentPath === '/etf' ? 'etf' : 'portfolio');
    
    if (pageType === 'portfolio' || pageType === 'watchlist') {
        // Load config stocks and then auto-analyze
        const stocks = await loadConfigStocks();
        if (stocks && stocks.length > 0) {
            // Small delay to ensure form is ready
            setTimeout(() => {
                autoAnalyzePortfolio(stocks);
            }, 100);
        }
    } else if (pageType === 'market') {
        // Auto-analyze market
        setTimeout(() => {
            autoAnalyzeMarket();
        }, 100);
    } else if (pageType === 'etf') {
        // Auto-analyze ETFs
        setTimeout(() => {
            autoAnalyzeETF();
        }, 100);
    }
});

// Load stocks from config file
async function loadConfigStocks() {
    try {
        const pageType = window.PAGE_TYPE || 
                        (window.location.pathname === '/watchlist' ? 'watchlist' : 'portfolio');
        
        // Only load for portfolio/watchlist pages
        if (pageType !== 'market' && pageType !== 'etf') {
            const response = await fetch(`/api/config_stocks?type=${pageType}`);
            const data = await response.json();
            
            if (data.success && data.stocks.length > 0) {
                const symbolsTextarea = document.getElementById('symbols');
                if (symbolsTextarea) {
                    symbolsTextarea.value = data.stocks.join(', ');
                }
                return data.stocks;
            } else {
                const symbolsTextarea = document.getElementById('symbols');
                if (symbolsTextarea) {
                    symbolsTextarea.placeholder = 'No stocks found in config file. Enter stock symbols manually.';
                }
                return [];
            }
        }
        return [];
    } catch (error) {
        console.error('Error loading config stocks:', error);
        const symbolsTextarea = document.getElementById('symbols');
        if (symbolsTextarea) {
            symbolsTextarea.placeholder = 'Error loading config. Enter stock symbols manually.';
        }
        return [];
    }
}

// Auto-analyze portfolio/watchlist
async function autoAnalyzePortfolio(stocks) {
    const symbols = stocks.join(', ');
    const period = document.getElementById('portfolio-period')?.value || '1y';
    const topN = parseInt(document.getElementById('top-n')?.value || '10');
    const resultsDiv = document.getElementById('portfolio-results');
    
    if (!symbols || symbols.trim() === '') {
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch('/analyze_portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symbols, period, top_n: topN })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Portfolio analysis failed');
        }
        
        displayPortfolioResults(data, resultsDiv);
    } catch (error) {
        showError(resultsDiv, error.message);
    } finally {
        hideLoading();
    }
}

// Auto-analyze market
async function autoAnalyzeMarket() {
    const period = document.getElementById('market-period')?.value || '1y';
    const topN = parseInt(document.getElementById('market-top-n')?.value || '10');
    const resultsDiv = document.getElementById('portfolio-results');
    
    showLoading();
    
    try {
        const response = await fetch('/analyze_market', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ period, top_n: topN })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Market analysis failed');
        }
        
        displayMarketResults(data, resultsDiv);
    } catch (error) {
        showError(resultsDiv, error.message);
    } finally {
        hideLoading();
    }
}

// Auto-analyze ETF
async function autoAnalyzeETF() {
    const period = document.getElementById('market-period')?.value || '1y';
    const topN = parseInt(document.getElementById('market-top-n')?.value || '10');
    const resultsDiv = document.getElementById('portfolio-results');
    
    showLoading();
    
    try {
        const response = await fetch('/analyze_etf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ period, top_n: topN })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'ETF analysis failed');
        }
        
        displayMarketResults(data, resultsDiv);
    } catch (error) {
        showError(resultsDiv, error.message);
    } finally {
        hideLoading();
    }
}

// Portfolio/Watchlist Analysis
const portfolioForm = document.getElementById('portfolio-form');
if (portfolioForm) {
    portfolioForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const symbols = document.getElementById('symbols').value.trim();
    const period = document.getElementById('portfolio-period').value;
    const topN = parseInt(document.getElementById('top-n').value);
    const resultsDiv = document.getElementById('portfolio-results');
    
    if (!symbols) {
        showError(resultsDiv, 'Please enter stock symbols');
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch('/analyze_portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symbols, period, top_n: topN })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Portfolio analysis failed');
        }
        
        displayPortfolioResults(data, resultsDiv);
    } catch (error) {
        showError(resultsDiv, error.message);
    } finally {
        hideLoading();
    }
    });
}

// Market Analysis
const marketForm = document.getElementById('market-form');
if (marketForm) {
    marketForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const period = document.getElementById('market-period').value;
        const topN = parseInt(document.getElementById('market-top-n').value);
        const resultsDiv = document.getElementById('portfolio-results');
        
        showLoading();
        
        try {
            const response = await fetch('/analyze_market', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ period, top_n: topN })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Market analysis failed');
            }
            
            displayMarketResults(data, resultsDiv);
        } catch (error) {
            showError(resultsDiv, error.message);
        } finally {
            hideLoading();
        }
    });
}

// ETF Analysis
const etfForm = document.getElementById('etf-form');
if (etfForm) {
    etfForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const period = document.getElementById('market-period').value;
        const topN = parseInt(document.getElementById('market-top-n').value);
        const resultsDiv = document.getElementById('portfolio-results');
        
        showLoading();
        
        try {
            const response = await fetch('/analyze_etf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ period, top_n: topN })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'ETF analysis failed');
            }
            
            displayMarketResults(data, resultsDiv);
        } catch (error) {
            showError(resultsDiv, error.message);
        } finally {
            hideLoading();
        }
    });
}


function displayPortfolioResults(data, container) {
    const { buy_stocks, sell_stocks, summary, failed_symbols } = data;
    
    let html = '<div class="results">';
    
    // Summary Statistics
    html += `
        <div class="result-section">
            <h3>Portfolio Summary</h3>
            <div class="portfolio-summary">
                <div class="summary-card">
                    <div class="summary-value">${summary.total}</div>
                    <div class="summary-label">Total Analyzed</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value" style="color: var(--success);">${summary.buy_count}</div>
                    <div class="summary-label">BUY Recommendations</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value" style="color: var(--danger);">${summary.sell_count}</div>
                    <div class="summary-label">SELL Recommendations</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value" style="color: var(--warning);">${summary.hold_count}</div>
                    <div class="summary-label">HOLD Recommendations</div>
                </div>
                <div class="summary-card">
                    <div class="summary-value">${summary.avg_score}</div>
                    <div class="summary-label">Average Score</div>
                </div>
            </div>
        </div>
    `;
    
    // Top BUY Recommendations
    if (buy_stocks.length > 0) {
        html += `
            <div class="result-section">
                <h3 style="color: var(--success);">Top ${buy_stocks.length} BUY Recommendations</h3>
                <table class="stocks-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Symbol</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>1D %</th>
                            <th>1W %</th>
                            <th>1M %</th>
                            <th>6M %</th>
                            <th>1Y %</th>
                            <th>RSI</th>
                        <th>Recommendation</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${buy_stocks.map((stock, idx) => `
                            <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${idx}" onclick="showStockDetail('${stock.symbol}', ${idx})">
                                <td>${idx + 1}</td>
                                <td><strong>${stock.symbol}</strong></td>
                                <td>${stock.company}</td>
                                <td>$${stock.price.toFixed(2)}</td>
                                <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                </td>
                                <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                </td>
                                <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                </td>
                                <td>${stock.rsi.toFixed(2)}</td>
                                <td><span class="recommendation-badge ${getRecommendationClass(stock.recommendation)}">${stock.recommendation}</span></td>
                                <td class="score-positive">${stock.score}</td>
                                <td><button class="btn-detail" onclick="event.stopPropagation(); showStockDetail('${stock.symbol}', ${idx})">Details</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += '<div class="result-section"><p class="info-text">No BUY recommendations found.</p></div>';
    }
    
    // Top SELL Recommendations
    if (sell_stocks.length > 0) {
        html += `
            <div class="result-section">
                <h3 style="color: var(--danger);">Top ${sell_stocks.length} SELL Recommendations</h3>
                <table class="stocks-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Symbol</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>1D %</th>
                            <th>1W %</th>
                            <th>1M %</th>
                            <th>6M %</th>
                            <th>1Y %</th>
                            <th>RSI</th>
                        <th>Recommendation</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${sell_stocks.map((stock, idx) => `
                            <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${buy_stocks.length + idx}" onclick="showStockDetail('${stock.symbol}', ${buy_stocks.length + idx})">
                                <td>${idx + 1}</td>
                                <td><strong>${stock.symbol}</strong></td>
                                <td>${stock.company}</td>
                                <td>$${stock.price.toFixed(2)}</td>
                                <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                </td>
                                <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                </td>
                                <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                </td>
                                <td>${stock.rsi.toFixed(2)}</td>
                                <td><span class="recommendation-badge recommendation-sell">${stock.recommendation}</span></td>
                                <td class="score-negative">${stock.score}</td>
                                <td><button class="btn-detail" onclick="event.stopPropagation(); showStockDetail('${stock.symbol}', ${buy_stocks.length + idx})">Details</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += '<div class="result-section"><p class="info-text">No SELL recommendations found.</p></div>';
    }
    
    // HOLD Recommendations
    if (data.hold_stocks && data.hold_stocks.length > 0) {
        html += `
            <div class="result-section">
                <h3 style="color: var(--warning);">HOLD Recommendations (${data.hold_stocks.length})</h3>
                <table class="stocks-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Symbol</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>1D %</th>
                            <th>1W %</th>
                            <th>1M %</th>
                            <th>6M %</th>
                            <th>1Y %</th>
                            <th>RSI</th>
                        <th>Recommendation</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.hold_stocks.map((stock, idx) => `
                            <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${buy_stocks.length + sell_stocks.length + idx}" onclick="showStockDetail('${stock.symbol}', ${buy_stocks.length + sell_stocks.length + idx})">
                                <td>${idx + 1}</td>
                                <td><strong>${stock.symbol}</strong></td>
                                <td>${stock.company}</td>
                                <td>$${stock.price.toFixed(2)}</td>
                                <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                </td>
                                <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                </td>
                                <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                </td>
                                <td>${stock.rsi.toFixed(2)}</td>
                                <td><span class="recommendation-badge recommendation-hold">${stock.recommendation}</span></td>
                                <td style="color: var(--warning);">${stock.score}</td>
                                <td><button class="btn-detail" onclick="event.stopPropagation(); showStockDetail('${stock.symbol}', ${buy_stocks.length + sell_stocks.length + idx})">Details</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += '<div class="result-section"><p class="info-text">No HOLD recommendations found.</p></div>';
    }
    
    // Store all stocks for detail view
    window.allStocks = [...(buy_stocks || []), ...(sell_stocks || []), ...(data.hold_stocks || [])];
    
    // Failed symbols
    if (failed_symbols && failed_symbols.length > 0) {
        html += `
            <div class="error-message">
                <strong>Failed to analyze:</strong> ${failed_symbols.join(', ')}
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

function displayMarketResults(data, container) {
    const { buy_recommendations, total_analyzed, failed_symbols } = data;
    
    let html = '<div class="results">';
    
    html += `
        <div class="result-section">
            <h3>Top ${buy_recommendations.length} BUY Recommendations</h3>
            <p class="info-text">Analyzed ${total_analyzed} stocks from US market</p>
            <table class="stocks-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Symbol</th>
                        <th>Company</th>
                        <th>Price</th>
                        <th>1D %</th>
                        <th>1W %</th>
                        <th>1M %</th>
                        <th>6M %</th>
                        <th>1Y %</th>
                        <th>RSI</th>
                        <th>Recommendation</th>
                        <th>Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${buy_recommendations.map((stock, idx) => `
                            <tr class="stock-row" data-symbol="${stock.symbol}" data-index="${idx}" onclick="showStockDetail('${stock.symbol}', ${idx})">
                                <td>${idx + 1}</td>
                                <td><strong>${stock.symbol}</strong></td>
                                <td>${stock.company}</td>
                                <td>$${stock.price.toFixed(2)}</td>
                                <td class="${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                </td>
                                <td class="${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                </td>
                                <td class="${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                </td>
                                <td class="${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                </td>
                                <td>${stock.rsi.toFixed(2)}</td>
                                <td><span class="recommendation-badge recommendation-buy">${stock.recommendation}</span></td>
                                <td class="score-positive">${stock.score}</td>
                                <td><button class="btn-detail" onclick="event.stopPropagation(); showStockDetail('${stock.symbol}', ${idx})">Details</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    
    // Store stocks for detail view
    window.allStocks = buy_recommendations || [];
    
    if (failed_symbols && failed_symbols.length > 0) {
        html += `
            <div class="error-message">
                <strong>Failed to analyze:</strong> ${failed_symbols.slice(0, 10).join(', ')}${failed_symbols.length > 10 ? '...' : ''}
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// Store stocks data globally for detail view
let stockDetailsCache = {};

function showStockDetail(symbol, index) {
    const stocks = window.allStocks || [];
    const stock = stocks[index];
    
    if (!stock) return;
    
    const detailModal = document.getElementById('stock-detail-modal');
    if (detailModal) {
        detailModal.remove();
    }
    
    const fundamental = stock.fundamental || {};
    
    const modal = document.createElement('div');
    modal.id = 'stock-detail-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${symbol} - ${stock.company}</h2>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="analysis-container">
                    <div class="analysis-section">
                        <h3>Technical Analysis</h3>
                        <div class="indicators-grid">
                            <div class="indicator-card">
                                <div class="indicator-label">Current Price</div>
                                <div class="indicator-value">$${stock.price.toFixed(2)}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">1D Change</div>
                                <div class="indicator-value ${stock.change_1d >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1d >= 0 ? '+' : ''}${stock.change_1d.toFixed(2)}%
                                </div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">1W Change</div>
                                <div class="indicator-value ${stock.change_1w >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1w >= 0 ? '+' : ''}${stock.change_1w.toFixed(2)}%
                                </div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">1M Change</div>
                                <div class="indicator-value ${stock.change_1m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_1m >= 0 ? '+' : ''}${stock.change_1m.toFixed(2)}%
                                </div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">6M Change</div>
                                <div class="indicator-value ${stock.change_6m >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change_6m >= 0 ? '+' : ''}${stock.change_6m.toFixed(2)}%
                                </div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">1Y Change</div>
                                <div class="indicator-value ${(stock.change_1y || 0) >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${(stock.change_1y || 0) >= 0 ? '+' : ''}${(stock.change_1y || 0).toFixed(2)}%
                                </div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">RSI (14)</div>
                                <div class="indicator-value">${stock.rsi.toFixed(2)}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">MACD</div>
                                <div class="indicator-value">${stock.macd ? stock.macd.toFixed(2) : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">SMA (20)</div>
                                <div class="indicator-value">${stock.sma_20 ? '$' + stock.sma_20.toFixed(2) : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">SMA (50)</div>
                                <div class="indicator-value">${stock.sma_50 ? '$' + stock.sma_50.toFixed(2) : 'N/A'}</div>
                            </div>
                        </div>
                        <div style="margin-top: 20px;">
                            <strong>Recommendation:</strong> 
                            <span class="recommendation-badge ${getRecommendationClass(stock.recommendation)}">${stock.recommendation}</span>
                            <strong style="margin-left: 15px;">Score:</strong> 
                            <span class="${stock.score >= 0 ? 'score-positive' : 'score-negative'}">${stock.score}</span>
                        </div>
                        <h4 style="margin-top: 15px;">Reasoning:</h4>
                        <ul class="reasoning-list">
                            ${(stock.reasoning || []).map(reason => `<li>${reason}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="analysis-section">
                        <h3>Fundamental Analysis</h3>
                        <div class="indicators-grid">
                            <div class="indicator-card">
                                <div class="indicator-label">P/E Ratio</div>
                                <div class="indicator-value">${fundamental.pe_ratio !== undefined ? fundamental.pe_ratio : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Forward P/E</div>
                                <div class="indicator-value">${fundamental.forward_pe !== undefined ? fundamental.forward_pe : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">P/B Ratio</div>
                                <div class="indicator-value">${fundamental.pb_ratio !== undefined ? fundamental.pb_ratio : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Dividend Yield</div>
                                <div class="indicator-value">${fundamental.dividend_yield !== undefined ? fundamental.dividend_yield + '%' : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Market Cap</div>
                                <div class="indicator-value">${fundamental.market_cap || 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">EPS</div>
                                <div class="indicator-value">${fundamental.eps !== undefined ? '$' + fundamental.eps : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Revenue Growth</div>
                                <div class="indicator-value">${fundamental.revenue_growth !== undefined ? fundamental.revenue_growth + '%' : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Earnings Growth</div>
                                <div class="indicator-value">${fundamental.earnings_growth !== undefined ? fundamental.earnings_growth + '%' : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">ROE</div>
                                <div class="indicator-value">${fundamental.roe !== undefined ? fundamental.roe + '%' : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Profit Margin</div>
                                <div class="indicator-value">${fundamental.profit_margin !== undefined ? fundamental.profit_margin + '%' : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Debt to Equity</div>
                                <div class="indicator-value">${fundamental.debt_to_equity !== undefined ? fundamental.debt_to_equity : 'N/A'}</div>
                            </div>
                            <div class="indicator-card">
                                <div class="indicator-label">Beta</div>
                                <div class="indicator-value">${fundamental.beta !== undefined ? fundamental.beta : 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on ESC key press
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Make function available globally
window.showStockDetail = showStockDetail;

function getRecommendationClass(recommendation) {
    if (recommendation.includes('STRONG BUY')) {
        return 'recommendation-strong-buy';
    } else if (recommendation.includes('BUY')) {
        return 'recommendation-buy';
    } else if (recommendation.includes('SELL')) {
        return 'recommendation-sell';
    } else {
        return 'recommendation-hold';
    }
}

function showError(container, message) {
    container.innerHTML = `<div class="error-message">${message}</div>`;
}

function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

