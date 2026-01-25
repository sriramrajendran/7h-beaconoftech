// JavaScript Stock Analyzer - Client-side replacement for Flask backend
class StockAnalyzer {
    constructor(symbol, period = '1y') {
        this.symbol = symbol.toUpperCase();
        this.period = period;
        this.data = null;
        this.apiConfig = {
            strategy: 'live',
            corsProxies: [
                'https://api.allorigins.win/raw?url=',
                'https://corsproxy.io/?',
                'https://cors-anywhere.herokuapp.com/'
            ],
            timeout: 10000,
            retryAttempts: 3,
            useMockData: false
        };
    }

    updateAPIConfig(config) {
        this.apiConfig = { ...this.apiConfig, ...config };
        console.log('API config updated:', this.apiConfig);
    }

    async fetchStockData() {
        try {
            console.log(`Fetching data for ${this.symbol}...`);
            
            // Method 1: Try direct Yahoo Finance API first
            let data = await this.tryDirectAPI();
            if (data) {
                return this.processData(data);
            }
            
            // Method 2: Try CORS proxy
            console.log('Direct API failed, trying CORS proxy...');
            data = await this.tryCORSProxy();
            if (data) {
                return this.processData(data);
            }
            
            // Method 3: Try alternative API (Alpha Vantage free tier)
            console.log('CORS proxy failed, trying alternative API...');
            data = await this.tryAlternativeAPI();
            if (data) {
                return this.processAlternativeData(data);
            }
            
            throw new Error(`All data sources failed for ${this.symbol}`);
            
        } catch (error) {
            console.error(`Error fetching data for ${this.symbol}:`, error);
            throw new Error(`Failed to fetch data for ${this.symbol}: ${error.message}`);
        }
    }
    
    async tryDirectAPI() {
        try {
            const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${this.symbol}?interval=1d&range=${this.period}`;
            const response = await fetch(yahooUrl);
            
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.log('Direct API attempt failed:', error.message);
            return null;
        }
    }
    
    async tryCORSProxy() {
        // Use configured CORS proxies
        const proxies = this.apiConfig.corsProxies || [
            'https://corsproxy.io/?',
            'https://api.allorigins.win/raw?url=',
            'https://cors-anywhere.herokuapp.com/'
        ];
        
        for (const proxy of proxies) {
            try {
                console.log(`Trying CORS proxy: ${proxy}`);
                const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${this.symbol}?interval=1d&range=${this.period}`;
                
                let proxyUrl;
                if (proxy.includes('allorigins')) {
                    proxyUrl = proxy + encodeURIComponent(yahooUrl);
                } else {
                    proxyUrl = proxy + yahooUrl;
                }
                
                const response = await fetch(proxyUrl, {
                    timeout: this.apiConfig.timeout
                });
                
                if (response.ok) {
                    let data = await response.json();
                    
                    // Handle different proxy response formats
                    if (proxy.includes('allorigins')) {
                        // allorigins returns the raw response
                        data = JSON.parse(data.contents);
                    }
                    
                    console.log(`✅ Successfully fetched data via ${proxy}`);
                    return data;
                } else {
                    console.log(`❌ Proxy ${proxy} returned status: ${response.status}`);
                }
            } catch (error) {
                console.log(`❌ Proxy ${proxy} failed: ${error.message}`);
                continue;
            }
        }
        
        console.log('⚠️ All CORS proxies failed');
        return null;
    }
    
    async tryAlternativeAPI() {
        // Check if mock data is enabled in config
        if (this.apiConfig.useMockData) {
            console.log('Mock data enabled in configuration, using mock data...');
            const mockData = this.generateMockData();
            
            // Add a flag to indicate this is mock data
            mockData.chart.result[0].meta.isMockData = true;
            mockData.chart.result[0].meta.mockDataWarning = 'Using demo data for testing purposes';
            
            return this.processData(mockData);
        }
        
        // If mock data is disabled, try alternative APIs or return null
        console.log('Mock data disabled, no alternative APIs available');
        return null;
    }
    
    generateMockData() {
        const basePrice = 100 + Math.random() * 900; // Random price between $100-$1000
        const days = this.period === '1mo' ? 30 : this.period === '3mo' ? 90 : this.period === '6mo' ? 180 : 365;
        
        const timestamps = [];
        const closes = [];
        const highs = [];
        const lows = [];
        const volumes = [];
        
        const now = Date.now() / 1000;
        
        // Create realistic patterns for testing
        for (let i = days; i >= 0; i--) {
            timestamps.push(now - (i * 24 * 3600));
            
            let price;
            const progress = i / days;
            
            // Create different patterns based on symbol
            if (this.symbol.includes('AAPL') || this.symbol.includes('MSFT')) {
                // Strong uptrend with some consolidation (VCP-like)
                const trend = basePrice * (1 + progress * 0.3); // 30% uptrend
                const consolidation = progress > 0.7 ? Math.sin(progress * 20) * 0.02 : 0;
                price = trend * (1 + consolidation);
            } else if (this.symbol.includes('TSLA') || this.symbol.includes('NVDA')) {
                // Volatile with potential divergences
                const volatility = 0.04; // Higher volatility
                const trend = basePrice * (1 + progress * 0.2);
                const randomWalk = (Math.random() - 0.5) * 2 * volatility;
                price = trend * (1 + randomWalk);
            } else {
                // General market movement
                const volatility = 0.02;
                const trend = basePrice * (1 + progress * 0.1);
                const change = (Math.random() - 0.5) * 2 * volatility;
                price = trend * (1 + change);
            }
            
            closes.push(price);
            highs.push(price * 1.02);
            lows.push(price * 0.98);
            
            // Volume pattern - decreasing during consolidation (VCP signal)
            let volume;
            if (progress > 0.7 && (this.symbol.includes('AAPL') || this.symbol.includes('MSFT'))) {
                // Decreasing volume during consolidation
                volume = Math.floor((10000000 - (progress - 0.7) * 20000000) * Math.random());
            } else {
                volume = Math.floor(Math.random() * 10000000) + 1000000;
            }
            volumes.push(volume);
        }
        
        return {
            chart: {
                result: [{
                    timestamp: timestamps,
                    indicators: {
                        quote: [{
                            close: closes,
                            high: highs,
                            low: lows,
                            volume: volumes
                        }]
                    },
                    meta: {
                        symbol: this.symbol,
                        currency: 'USD',
                        regularMarketPrice: closes[closes.length - 1],
                        chartPreviousClose: closes[closes.length - 2] || closes[closes.length - 1],
                        longName: `${this.symbol} Corporation`
                    }
                }]
            }
        };
    }
    
    processData(data) {
        if (!data.chart?.result?.[0]) {
            throw new Error(`No data found for ${this.symbol}. Symbol may be invalid or delisted.`);
        }

        const result = data.chart.result[0];
        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];
        const meta = result.meta;

        // Validate data quality
        if (!quotes || !quotes.close || quotes.close.length === 0) {
            throw new Error(`Invalid price data for ${this.symbol}`);
        }

        this.data = {
            timestamps,
            close: quotes.close,
            high: quotes.high,
            low: quotes.low,
            volume: quotes.volume,
            meta: {
                symbol: meta.symbol,
                currency: meta.currency,
                currentPrice: meta.regularMarketPrice,
                previousClose: meta.chartPreviousClose,
                company: meta.longName || this.symbol,
                isMockData: meta.isMockData || false,
                mockDataWarning: meta.mockDataWarning || null
            }
        };

        console.log(`Successfully fetched data for ${this.symbol}:`, this.data.meta);
        
        // Show warning if using mock data
        if (this.data.meta.isMockData) {
            console.warn('⚠️ Using mock/demo data for testing');
        }
        
        return true;
    }
    
    processAlternativeData(data) {
        // Process mock data the same way
        return this.processData(data);
    }

    calculateRSI(periods = 14) {
        if (!this.data || this.data.close.length < periods) return null;

        const closes = this.data.close.filter(v => v !== null);
        if (closes.length < periods) return null;

        let gains = 0;
        let losses = 0;

        for (let i = 1; i < closes.length; i++) {
            const change = closes[i] - closes[i - 1];
            if (change >= 0) {
                gains += change;
            } else {
                losses -= change;
            }
        }

        const avgGain = gains / periods;
        const avgLoss = losses / periods;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        const rsi = 100 - (100 / (1 + rs));

        return rsi;
    }

    calculateSMA(periods) {
        if (!this.data || this.data.close.length < periods) return null;

        const closes = this.data.close.filter(v => v !== null);
        if (closes.length < periods) return null;

        const recent = closes.slice(-periods);
        const sum = recent.reduce((a, b) => a + b, 0);
        return sum / periods;
    }

    calculateEMA(periods) {
        if (!this.data || this.data.close.length < periods) return null;

        const closes = this.data.close.filter(v => v !== null);
        if (closes.length < periods) return null;

        const multiplier = 2 / (periods + 1);
        let ema = closes[0];

        for (let i = 1; i < closes.length; i++) {
            ema = (closes[i] * multiplier) + (ema * (1 - multiplier));
        }

        return ema;
    }

    calculateMACD() {
        if (!this.data || this.data.close.length < 26) return null;

        const ema12 = this.calculateEMA(12);
        const ema26 = this.calculateEMA(26);
        
        if (ema12 === null || ema26 === null) return null;

        return {
            macd: ema12 - ema26,
            signal: null, // Would need historical EMA of MACD line
            histogram: null
        };
    }

    calculateBollingerBands(periods = 20, stdDev = 2) {
        if (!this.data || this.data.close.length < periods) return null;

        const closes = this.data.close.filter(v => v !== null);
        if (closes.length < periods) return null;

        const recent = closes.slice(-periods);
        const sma = recent.reduce((a, b) => a + b, 0) / periods;
        
        const variance = recent.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / periods;
        const standardDeviation = Math.sqrt(variance);

        return {
            upper: sma + (standardDeviation * stdDev),
            middle: sma,
            lower: sma - (standardDeviation * stdDev)
        };
    }

    calculateStochastic(periods = 14) {
        if (!this.data || this.data.close.length < periods || !this.data.high || !this.data.low) return null;

        const closes = this.data.close.filter(v => v !== null);
        const highs = this.data.high.filter(v => v !== null);
        const lows = this.data.low.filter(v => v !== null);
        
        if (closes.length < periods || highs.length < periods || lows.length < periods) return null;

        const recentClose = closes[closes.length - 1];
        const recentHighs = highs.slice(-periods);
        const recentLows = lows.slice(-periods);
        
        const highestHigh = Math.max(...recentHighs);
        const lowestLow = Math.min(...recentLows);
        
        const k = ((recentClose - lowestLow) / (highestHigh - lowestLow)) * 100;
        
        return {
            k: k,
            d: null // Would need smoothing
        };
    }

    getRecommendation() {
        if (!this.data) return null;

        const rsi = this.calculateRSI();
        const sma20 = this.calculateSMA(20);
        const sma50 = this.calculateSMA(50);
        const sma200 = this.calculateSMA(200);
        const macd = this.calculateMACD();
        const bollinger = this.calculateBollingerBands();
        const stochastic = this.calculateStochastic();
        const currentPrice = this.data.meta.currentPrice;

        let score = 0;
        let reasoning = [];

        // RSI Analysis
        if (rsi !== null) {
            if (rsi < 30) {
                score += 2;
                reasoning.push('RSI oversold (< 30)');
            } else if (rsi > 70) {
                score -= 2;
                reasoning.push('RSI overbought (> 70)');
            } else if (rsi < 50) {
                score += 1;
                reasoning.push('RSI bullish momentum');
            } else {
                score -= 1;
                reasoning.push('RSI bearish momentum');
            }
        }

        // Moving Averages
        if (sma20 !== null && sma50 !== null && sma200 !== null) {
            if (currentPrice > sma20) score += 1;
            if (currentPrice > sma50) score += 1;
            if (currentPrice > sma200) score += 1;
            
            if (sma20 > sma50 && sma50 > sma200) {
                score += 1;
                reasoning.push('Golden cross pattern');
            } else if (sma20 < sma50 && sma50 < sma200) {
                score -= 1;
                reasoning.push('Death cross pattern');
            }
            
            if (currentPrice < sma20 && currentPrice < sma50 && currentPrice < sma200) {
                score -= 2;
                reasoning.push('Price below all major MAs');
            }
        }

        // MACD
        if (macd !== null && macd.macd > 0) {
            score += 2;
            reasoning.push('Bullish MACD');
        } else if (macd !== null && macd.macd < 0) {
            score -= 2;
            reasoning.push('Bearish MACD');
        }

        // Bollinger Bands
        if (bollinger !== null) {
            if (currentPrice < bollinger.lower) {
                score += 1;
                reasoning.push('Near lower Bollinger Band');
            } else if (currentPrice > bollinger.upper) {
                score -= 1;
                reasoning.push('Near upper Bollinger Band');
            }
        }

        // Stochastic
        if (stochastic !== null) {
            if (stochastic.k < 20) {
                score += 1;
                reasoning.push('Stochastic oversold');
            } else if (stochastic.k > 80) {
                score -= 1;
                reasoning.push('Stochastic overbought');
            }
        }

        // Determine recommendation
        let recommendation;
        if (score >= 5) {
            recommendation = 'STRONG BUY';
        } else if (score >= 2) {
            recommendation = 'BUY';
        } else if (score >= -1) {
            recommendation = 'HOLD';
        } else if (score >= -4) {
            recommendation = 'SELL';
        } else {
            recommendation = 'STRONG SELL';
        }

        // Advanced pattern analysis
        const vcpPattern = this.detectVCPPattern();
        const rsiDivergence = this.detectRSIDivergence();
        const macdDivergence = this.detectMACDDivergence();
        const enhancedCrossovers = this.detectEnhancedCrossovers();
        const breakoutSetup = this.detectBreakoutSetup();

        return {
            recommendation,
            score,
            reasoning: reasoning.join(', ') || 'Neutral indicators',
            indicators: {
                rsi,
                sma20,
                sma50,
                sma200,
                macd,
                bollinger,
                stochastic,
                currentPrice
            },
            vcp_pattern: vcpPattern,
            rsi_divergence: rsiDivergence,
            macd_divergence: macdDivergence,
            enhanced_crossovers: enhancedCrossovers,
            breakout_setup: breakoutSetup
        };
    }

    // Advanced pattern detection methods
    detectVCPPattern() {
        if (!this.data || this.data.close.length < 50) {
            return { status: 'none', description: 'Insufficient data for VCP analysis' };
        }

        const closes = this.data.close.filter(v => v !== null);
        const volumes = this.data.volume?.filter(v => v !== null) || [];
        
        if (closes.length < 50) {
            return { status: 'none', description: 'Insufficient data for VCP analysis' };
        }

        // Calculate volatility over recent periods
        const recentVolatility = this.calculateVolatility(closes.slice(-20));
        const midVolatility = this.calculateVolatility(closes.slice(-40, -20));
        const earlyVolatility = this.calculateVolatility(closes.slice(-60, -40));

        // Check for volatility contraction
        const contractionRatio = recentVolatility / midVolatility;
        const overallContraction = recentVolatility / earlyVolatility;

        // Check for price consolidation (price range narrowing)
        const recentRange = Math.max(...closes.slice(-20)) - Math.min(...closes.slice(-20));
        const midRange = Math.max(...closes.slice(-40, -20)) - Math.min(...closes.slice(-40, -20));
        const rangeContraction = recentRange / midRange;

        // Volume analysis (should be decreasing during contraction)
        let volumeDecreasing = false;
        if (volumes.length >= 40) {
            const recentAvgVol = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;
            const midAvgVol = volumes.slice(-40, -20).reduce((a, b) => a + b, 0) / 20;
            volumeDecreasing = recentAvgVol < midAvgVol * 0.8;
        }

        if (contractionRatio < 0.7 && overallContraction < 0.6 && rangeContraction < 0.8) {
            const strength = volumeDecreasing ? 'strong' : 'weak';
            return {
                status: strength,
                strength: `${(overallContraction * 100).toFixed(1)}% volatility contraction`,
                confidence: volumeDecreasing ? 'high' : 'medium',
                description: `Volatility Contraction Pattern detected with ${strength} characteristics`,
                indicators: [
                    `Volatility reduced by ${((1 - contractionRatio) * 100).toFixed(1)}%`,
                    `Price range narrowed by ${((1 - rangeContraction) * 100).toFixed(1)}%`,
                    volumeDecreasing ? 'Supporting volume decrease' : 'Limited volume confirmation'
                ]
            };
        }

        return { status: 'none', description: 'No VCP pattern detected' };
    }

    detectRSIDivergence() {
        if (!this.data || this.data.close.length < 30) {
            return { status: 'none', description: 'Insufficient data for RSI divergence analysis' };
        }

        const closes = this.data.close.filter(v => v !== null);
        if (closes.length < 30) {
            return { status: 'none', description: 'Insufficient data for RSI divergence analysis' };
        }

        // Get RSI values for the period
        const rsiValues = [];
        for (let i = 14; i < closes.length; i++) {
            const rsi = this.calculateRSIForRange(closes.slice(i - 14, i + 1));
            if (rsi !== null) rsiValues.push(rsi);
        }

        if (rsiValues.length < 15) {
            return { status: 'none', description: 'Insufficient RSI data for divergence analysis' };
        }

        // Check for bullish divergence (price making lower lows, RSI making higher lows)
        const recentPrices = closes.slice(-15);
        const recentRSI = rsiValues.slice(-15);
        
        const priceLows = this.findLows(recentPrices);
        const rsiLows = this.findLows(recentRSI);

        if (priceLows.length >= 2 && rsiLows.length >= 2) {
            const lastPriceLow = priceLows[priceLows.length - 1];
            const prevPriceLow = priceLows[priceLows.length - 2];
            const lastRSILow = rsiLows[rsiLows.length - 1];
            const prevRSILow = rsiLows[rsiLows.length - 2];

            if (lastPriceLow.value < prevPriceLow.value && lastRSILow.value > prevRSILow.value) {
                return {
                    status: 'bullish',
                    strength: 'moderate',
                    confidence: 'medium',
                    description: 'Bullish RSI divergence: price making lower lows while RSI making higher lows',
                    indicators: [
                        `Price low: ${lastPriceLow.value.toFixed(2)} vs ${prevPriceLow.value.toFixed(2)}`,
                        `RSI low: ${lastRSILow.value.toFixed(1)} vs ${prevRSILow.value.toFixed(1)}`,
                        'Potential bullish reversal signal'
                    ]
                };
            }
        }

        // Check for bearish divergence (price making higher highs, RSI making lower highs)
        const priceHighs = this.findHighs(recentPrices);
        const rsiHighs = this.findHighs(recentRSI);

        if (priceHighs.length >= 2 && rsiHighs.length >= 2) {
            const lastPriceHigh = priceHighs[priceHighs.length - 1];
            const prevPriceHigh = priceHighs[priceHighs.length - 2];
            const lastRSIHigh = rsiHighs[rsiHighs.length - 1];
            const prevRSIHigh = rsiHighs[rsiHighs.length - 2];

            if (lastPriceHigh.value > prevPriceHigh.value && lastRSIHigh.value < prevRSIHigh.value) {
                return {
                    status: 'bearish',
                    strength: 'moderate',
                    confidence: 'medium',
                    description: 'Bearish RSI divergence: price making higher highs while RSI making lower highs',
                    indicators: [
                        `Price high: ${lastPriceHigh.value.toFixed(2)} vs ${prevPriceHigh.value.toFixed(2)}`,
                        `RSI high: ${lastRSIHigh.value.toFixed(1)} vs ${prevRSIHigh.value.toFixed(1)}`,
                        'Potential bearish reversal signal'
                    ]
                };
            }
        }

        return { status: 'none', description: 'No RSI divergence detected' };
    }

    detectMACDDivergence() {
        if (!this.data || this.data.close.length < 30) {
            return { status: 'none', description: 'Insufficient data for MACD divergence analysis' };
        }

        // Simplified MACD divergence detection
        const closes = this.data.close.filter(v => v !== null);
        const macdValues = [];
        
        // Calculate MACD values over time
        for (let i = 26; i < closes.length; i++) {
            const ema12 = this.calculateEMAForRange(closes.slice(i - 12, i + 1), 12);
            const ema26 = this.calculateEMAForRange(closes.slice(i - 26, i + 1), 26);
            if (ema12 !== null && ema26 !== null) {
                macdValues.push(ema12 - ema26);
            }
        }

        if (macdValues.length < 15) {
            return { status: 'none', description: 'Insufficient MACD data for divergence analysis' };
        }

        // Similar divergence logic as RSI but with MACD
        const recentPrices = closes.slice(-15);
        const recentMACD = macdValues.slice(-15);
        
        const priceLows = this.findLows(recentPrices);
        const macdLows = this.findLows(recentMACD);

        if (priceLows.length >= 2 && macdLows.length >= 2) {
            const lastPriceLow = priceLows[priceLows.length - 1];
            const prevPriceLow = priceLows[priceLows.length - 2];
            const lastMACDLow = macdLows[macdLows.length - 1];
            const prevMACDLow = macdLows[macdLows.length - 2];

            if (lastPriceLow.value < prevPriceLow.value && lastMACDLow.value > prevMACDLow.value) {
                return {
                    status: 'bullish',
                    strength: 'moderate',
                    confidence: 'medium',
                    description: 'Bullish MACD divergence detected',
                    indicators: [
                        'Price making lower lows',
                        'MACD making higher lows',
                        'Momentum divergence signal'
                    ]
                };
            }
        }

        return { status: 'none', description: 'No MACD divergence detected' };
    }

    detectEnhancedCrossovers() {
        if (!this.data || this.data.close.length < 50) {
            return { status: 'none', description: 'Insufficient data for crossover analysis' };
        }

        const closes = this.data.close.filter(v => v !== null);
        const currentPrice = closes[closes.length - 1];
        
        const sma20 = this.calculateSMA(20);
        const sma50 = this.calculateSMA(50);
        const sma200 = this.calculateSMA(200);
        const volumes = this.data.volume?.filter(v => v !== null) || [];

        if (!sma20 || !sma50 || !sma200) {
            return { status: 'none', description: 'Insufficient data for moving averages' };
        }

        // Check for golden cross (50-day crossing above 200-day)
        const prevSMA50 = this.calculateSMAForRange(closes.slice(-51, -1), 50);
        const prevSMA200 = this.calculateSMAForRange(closes.slice(-201, -1), 200);
        
        if (sma50 > sma200 && prevSMA50 <= prevSMA200) {
            const volumeConfirmation = volumes.length > 0 ? volumes[volumes.length - 1] > volumes[volumes.length - 2] * 1.2 : false;
            return {
                status: 'confirmed',
                strength: 'strong',
                confidence: volumeConfirmation ? 'high' : 'medium',
                description: 'Golden cross detected: 50-day SMA crossing above 200-day SMA',
                indicators: [
                    `50-day SMA: $${sma50.toFixed(2)}`,
                    `200-day SMA: $${sma200.toFixed(2)}`,
                    volumeConfirmation ? 'Volume confirmation present' : 'Limited volume confirmation'
                ]
            };
        }

        // Check for death cross (50-day crossing below 200-day)
        if (sma50 < sma200 && prevSMA50 >= prevSMA200) {
            return {
                status: 'confirmed',
                strength: 'strong',
                confidence: 'high',
                description: 'Death cross detected: 50-day SMA crossing below 200-day SMA',
                indicators: [
                    `50-day SMA: $${sma50.toFixed(2)}`,
                    `200-day SMA: $${sma200.toFixed(2)}`,
                    'Bearish long-term signal'
                ]
            };
        }

        // Check for potential crossovers
        if (Math.abs(sma50 - sma200) / sma200 < 0.02) {
            return {
                status: 'unconfirmed',
                strength: 'weak',
                confidence: 'low',
                description: 'Moving averages in close proximity - potential crossover forming',
                indicators: [
                    `50-day SMA: $${sma50.toFixed(2)}`,
                    `200-day SMA: $${sma200.toFixed(2)}`,
                    'Monitor for crossover confirmation'
                ]
            };
        }

        return { status: 'none', description: 'No significant crossovers detected' };
    }

    detectBreakoutSetup() {
        if (!this.data || this.data.close.length < 30) {
            return { status: 'none', description: 'Insufficient data for breakout analysis' };
        }

        const closes = this.data.close.filter(v => v !== null);
        const highs = this.data.high?.filter(v => v !== null) || [];
        const lows = this.data.low?.filter(v => v !== null) || [];
        const volumes = this.data.volume?.filter(v => v !== null) || [];
        
        if (closes.length < 30 || highs.length < 30 || lows.length < 30) {
            return { status: 'none', description: 'Insufficient data for breakout analysis' };
        }

        const currentPrice = closes[closes.length - 1];
        const recentHighs = highs.slice(-20);
        const recentLows = lows.slice(-20);
        
        const resistanceLevel = Math.max(...recentHighs);
        const supportLevel = Math.min(...recentLows);
        const range = resistanceLevel - supportLevel;
        const rangePercent = (range / supportLevel) * 100;

        // Check for consolidation (tight range)
        if (rangePercent < 5 && currentPrice > resistanceLevel * 0.98) {
            const recentVolume = volumes.length > 5 ? volumes.slice(-5).reduce((a, b) => a + b, 0) / 5 : 0;
            const avgVolume = volumes.length > 20 ? volumes.slice(-20).reduce((a, b) => a + b, 0) / 20 : 0;
            const volumeIncrease = recentVolume > avgVolume * 1.5;

            return {
                status: 'setup',
                strength: volumeIncrease ? 'strong' : 'moderate',
                confidence: volumeIncrease ? 'high' : 'medium',
                description: 'Breakout setup detected after consolidation phase',
                indicators: [
                    `Consolidation range: ${rangePercent.toFixed(1)}%`,
                    `Resistance at: $${resistanceLevel.toFixed(2)}`,
                    `Current price: $${currentPrice.toFixed(2)}`,
                    volumeIncrease ? 'Above-average volume' : 'Normal volume'
                ]
            };
        }

        return { status: 'none', description: 'No breakout setup detected' };
    }

    // Helper methods for pattern detection
    calculateVolatility(prices) {
        if (prices.length < 2) return 0;
        
        const returns = [];
        for (let i = 1; i < prices.length; i++) {
            returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
        }
        
        const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
        const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
        return Math.sqrt(variance) * Math.sqrt(252); // Annualized volatility
    }

    findLows(data) {
        const lows = [];
        for (let i = 1; i < data.length - 1; i++) {
            if (data[i] < data[i - 1] && data[i] < data[i + 1]) {
                lows.push({ index: i, value: data[i] });
            }
        }
        return lows;
    }

    findHighs(data) {
        const highs = [];
        for (let i = 1; i < data.length - 1; i++) {
            if (data[i] > data[i - 1] && data[i] > data[i + 1]) {
                highs.push({ index: i, value: data[i] });
            }
        }
        return highs;
    }

    calculateRSIForRange(prices, periods = 14) {
        if (prices.length < periods) return null;
        
        let gains = 0;
        let losses = 0;

        for (let i = 1; i < prices.length; i++) {
            const change = prices[i] - prices[i - 1];
            if (change >= 0) {
                gains += change;
            } else {
                losses -= change;
            }
        }

        const avgGain = gains / periods;
        const avgLoss = losses / periods;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }

    calculateEMAForRange(prices, periods) {
        if (prices.length < periods) return null;
        
        const multiplier = 2 / (periods + 1);
        let ema = prices[0];

        for (let i = 1; i < prices.length; i++) {
            ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
        }

        return ema;
    }

    calculateSMAForRange(prices, periods) {
        if (prices.length < periods) return null;
        const recent = prices.slice(-periods);
        return recent.reduce((a, b) => a + b, 0) / periods;
    }

    getSummary() {
        if (!this.data) return null;

        const closes = this.data.close.filter(v => v !== null);
        if (closes.length < 2) return null;

        const currentPrice = this.data.meta.currentPrice;
        const previousClose = this.data.meta.previousClose;
        const recommendation = this.getRecommendation();

        // Calculate price changes
        const change1d = ((currentPrice - previousClose) / previousClose) * 100;
        
        let change1w = null, change1m = null, change6m = null, change1y = null;
        const timestamps = this.data.timestamps;
        
        if (timestamps.length > 7) {
            const weekAgoIndex = timestamps.findIndex(t => t >= Date.now() / 1000 - 7 * 24 * 3600);
            if (weekAgoIndex > 0 && closes[weekAgoIndex]) {
                change1w = ((currentPrice - closes[weekAgoIndex]) / closes[weekAgoIndex]) * 100;
            }
        }
        
        if (timestamps.length > 30) {
            const monthAgoIndex = timestamps.findIndex(t => t >= Date.now() / 1000 - 30 * 24 * 3600);
            if (monthAgoIndex > 0 && closes[monthAgoIndex]) {
                change1m = ((currentPrice - closes[monthAgoIndex]) / closes[monthAgoIndex]) * 100;
            }
        }
        
        if (timestamps.length > 180) {
            const sixMonthsAgoIndex = timestamps.findIndex(t => t >= Date.now() / 1000 - 180 * 24 * 3600);
            if (sixMonthsAgoIndex > 0 && closes[sixMonthsAgoIndex]) {
                change6m = ((currentPrice - closes[sixMonthsAgoIndex]) / closes[sixMonthsAgoIndex]) * 100;
            }
        }
        
        if (timestamps.length > 365) {
            const yearAgoIndex = timestamps.findIndex(t => t >= Date.now() / 1000 - 365 * 24 * 3600);
            if (yearAgoIndex > 0 && closes[yearAgoIndex]) {
                change1y = ((currentPrice - closes[yearAgoIndex]) / closes[yearAgoIndex]) * 100;
            }
        }

        return {
            symbol: this.symbol,
            company_name: this.data.meta.company,
            current_price: currentPrice,
            price_change_pct: change1d,
            price_change_1d_pct: change1d,
            price_change_1w_pct: change1w,
            price_change_1m_pct: change1m,
            price_change_6m_pct: change6m,
            price_change_1y_pct: change1y,
            rsi: recommendation.indicators.rsi,
            macd: recommendation.indicators.macd?.macd,
            sma_20: recommendation.indicators.sma20,
            sma_50: recommendation.indicators.sma50,
            vcp_pattern: {}, // Simplified for GitHub Pages
            rsi_divergence: {},
            macd_divergence: {},
            enhanced_crossovers: {},
            breakout_setup: {},
            fundamental: {} // Would need additional API calls
        };
    }
}

// Batch analyzer for multiple stocks
class BatchStockAnalyzer {
    constructor(symbols, period = '1y', batchSize = 10) {
        this.symbols = symbols;
        this.period = period;
        this.batchSize = batchSize;
    }

    async analyzeAll() {
        const results = {};
        
        for (const symbol of this.symbols) {
            try {
                const analyzer = new StockAnalyzer(symbol, this.period);
                const success = await analyzer.fetchStockData();
                
                if (success) {
                    const summary = analyzer.getSummary();
                    const recommendation = analyzer.getRecommendation();
                    
                    results[symbol] = {
                        summary,
                        recommendation
                    };
                } else {
                    results[symbol] = { error: 'Failed to fetch data' };
                }
            } catch (error) {
                results[symbol] = { error: error.message };
            }
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return results;
    }
}

// Global stock analyzer instance for configuration updates
window.stockAnalyzer = new StockAnalyzer('AAPL');

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StockAnalyzer, BatchStockAnalyzer };
}
