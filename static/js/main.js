// Single Stock Analysis
document.getElementById('single-stock-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const symbol = document.getElementById('symbol').value.trim().toUpperCase();
    const period = document.getElementById('period').value;
    const resultsDiv = document.getElementById('single-results');
    
    if (!symbol) {
        showError(resultsDiv, 'Please enter a stock symbol');
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symbol, period })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Analysis failed');
        }
        
        displaySingleStockResults(data, resultsDiv);
    } catch (error) {
        showError(resultsDiv, error.message);
    } finally {
        hideLoading();
    }
});

// Portfolio Analysis
document.getElementById('portfolio-form').addEventListener('submit', async (e) => {
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

function displaySingleStockResults(data, container) {
    const { summary, recommendation } = data;
    
    const recClass = getRecommendationClass(recommendation.recommendation);
    
    container.innerHTML = `
        <div class="results">
            <div class="result-section">
                <h3>Analysis Results for ${data.symbol}</h3>
                
                <div class="indicators-grid">
                    <div class="indicator-card">
                        <div class="indicator-label">Current Price</div>
                        <div class="indicator-value">$${summary.current_price.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">Price Change</div>
                        <div class="indicator-value ${summary.price_change_pct >= 0 ? 'score-positive' : 'score-negative'}">
                            ${summary.price_change_pct >= 0 ? '+' : ''}${summary.price_change_pct.toFixed(2)}%
                        </div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">RSI (14)</div>
                        <div class="indicator-value">${summary.rsi.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">MACD</div>
                        <div class="indicator-value">${summary.macd.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">SMA (20)</div>
                        <div class="indicator-value">$${summary.sma_20.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">SMA (50)</div>
                        <div class="indicator-value">$${summary.sma_50.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">SMA (200)</div>
                        <div class="indicator-value">$${summary.sma_200.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">BB Upper</div>
                        <div class="indicator-value">$${summary.bb_upper.toFixed(2)}</div>
                    </div>
                    <div class="indicator-card">
                        <div class="indicator-label">BB Lower</div>
                        <div class="indicator-value">$${summary.bb_lower.toFixed(2)}</div>
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <h3>Recommendation</h3>
                    <div class="recommendation-badge ${recClass}">
                        ${recommendation.recommendation}
                    </div>
                    <div style="margin-top: 15px;">
                        <strong>Score:</strong> 
                        <span class="${recommendation.score >= 0 ? 'score-positive' : 'score-negative'}">
                            ${recommendation.score}
                        </span>
                    </div>
                    
                    <h4 style="margin-top: 20px; margin-bottom: 10px;">Reasoning:</h4>
                    <ul class="reasoning-list">
                        ${recommendation.reasoning.map(reason => `<li>${reason}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
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
                            <th>Change %</th>
                            <th>RSI</th>
                            <th>Recommendation</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${buy_stocks.map((stock, idx) => `
                            <tr>
                                <td>${idx + 1}</td>
                                <td><strong>${stock.symbol}</strong></td>
                                <td>${stock.company}</td>
                                <td>$${stock.price.toFixed(2)}</td>
                                <td class="${stock.change >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
                                </td>
                                <td>${stock.rsi.toFixed(2)}</td>
                                <td><span class="recommendation-badge recommendation-buy">${stock.recommendation}</span></td>
                                <td class="score-positive">${stock.score}</td>
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
                            <th>Change %</th>
                            <th>RSI</th>
                            <th>Recommendation</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sell_stocks.map((stock, idx) => `
                            <tr>
                                <td>${idx + 1}</td>
                                <td><strong>${stock.symbol}</strong></td>
                                <td>${stock.company}</td>
                                <td>$${stock.price.toFixed(2)}</td>
                                <td class="${stock.change >= 0 ? 'score-positive' : 'score-negative'}">
                                    ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
                                </td>
                                <td>${stock.rsi.toFixed(2)}</td>
                                <td><span class="recommendation-badge recommendation-sell">${stock.recommendation}</span></td>
                                <td class="score-negative">${stock.score}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else {
        html += '<div class="result-section"><p class="info-text">No SELL recommendations found.</p></div>';
    }
    
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

function getRecommendationClass(recommendation) {
    if (recommendation.includes('BUY')) {
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

