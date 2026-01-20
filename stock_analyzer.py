"""
Stock Technical Analysis and Recommendation System
"""

try:
    import yfinance as yf
except ImportError as e:
    print(f"Error: Failed to import yfinance. Please install it using: pip install yfinance")
    print(f"Details: {e}")
    raise

try:
    import pandas as pd
    import numpy as np
except ImportError as e:
    print(f"Error: Failed to import pandas or numpy. Please install using: pip install pandas numpy")
    print(f"Details: {e}")
    raise

try:
    from ta.trend import MACD, EMAIndicator, SMAIndicator
    from ta.momentum import RSIIndicator, StochasticOscillator
    from ta.volatility import BollingerBands, AverageTrueRange
    from ta.volume import OnBalanceVolumeIndicator
except ImportError as e:
    print(f"Error: Failed to import ta library. Please install it using: pip install ta")
    print(f"Details: {e}")
    raise

from datetime import datetime, timedelta
from typing import Dict, List, Tuple
import warnings
warnings.filterwarnings('ignore')


class StockAnalyzer:
    """Main class for stock technical analysis"""
    
    def __init__(self, symbol: str, period: str = "1y"):
        """
        Initialize stock analyzer
        
        Args:
            symbol: Stock ticker symbol (e.g., 'AAPL', 'MSFT')
            period: Data period ('1mo', '3mo', '6mo', '1y', '2y', '5y')
        """
        self.symbol = symbol.upper()
        self.period = period
        self.stock = None
        self.data = None
        self.indicators = {}
        
    def fetch_data(self) -> bool:
        """Fetch stock data from Yahoo Finance"""
        try:
            self.stock = yf.Ticker(self.symbol)
            self.data = self.stock.history(period=self.period)
            
            if self.data.empty:
                print(f"Error: No data found for {self.symbol}")
                return False
                
            # Ensure we have enough data for basic indicators
            if len(self.data) < 14:
                print(f"Warning: Limited data for {self.symbol}. Need at least 14 days for basic indicators.")
                return False
            
            # Try to pre-fetch info to have it ready (non-blocking)
            try:
                # Access info to trigger fetch, but don't wait too long
                _ = self.stock.info
            except:
                pass  # Info fetch failed, but we can still proceed
                
            return True
        except Exception as e:
            print(f"Error fetching data for {self.symbol}: {str(e)}")
            return False
    
    def calculate_indicators(self):
        """Calculate all technical indicators"""
        if self.data is None or self.data.empty:
            return
        
        df = self.data.copy()
        
        # Trend Indicators (only calculate if enough data)
        if len(df) >= 26:
            macd = MACD(close=df['Close'])
            self.indicators['MACD'] = macd.macd().iloc[-1]
            self.indicators['MACD_Signal'] = macd.macd_signal().iloc[-1]
            self.indicators['MACD_Histogram'] = macd.macd_diff().iloc[-1]
        else:
            self.indicators['MACD'] = None
            self.indicators['MACD_Signal'] = None
            self.indicators['MACD_Histogram'] = None
        
        # Moving Averages (only calculate if enough data)
        sma_20 = SMAIndicator(close=df['Close'], window=20)
        if len(df) >= 20:
            self.indicators['SMA_20'] = sma_20.sma_indicator().iloc[-1]
        else:
            self.indicators['SMA_20'] = None
            
        if len(df) >= 50:
            sma_50 = SMAIndicator(close=df['Close'], window=50)
            self.indicators['SMA_50'] = sma_50.sma_indicator().iloc[-1]
        else:
            self.indicators['SMA_50'] = None
            
        if len(df) >= 200:
            sma_200 = SMAIndicator(close=df['Close'], window=200)
            self.indicators['SMA_200'] = sma_200.sma_indicator().iloc[-1]
        else:
            self.indicators['SMA_200'] = None
            
        ema_12 = EMAIndicator(close=df['Close'], window=12)
        ema_26 = EMAIndicator(close=df['Close'], window=26)
        
        if len(df) >= 12:
            self.indicators['EMA_12'] = ema_12.ema_indicator().iloc[-1]
        else:
            self.indicators['EMA_12'] = None
            
        if len(df) >= 26:
            self.indicators['EMA_26'] = ema_26.ema_indicator().iloc[-1]
        else:
            self.indicators['EMA_26'] = None
        
        # Momentum Indicators
        rsi = RSIIndicator(close=df['Close'], window=14)
        self.indicators['RSI'] = rsi.rsi().iloc[-1]
        
        stoch = StochasticOscillator(high=df['High'], low=df['Low'], close=df['Close'])
        self.indicators['Stoch_K'] = stoch.stoch().iloc[-1]
        self.indicators['Stoch_D'] = stoch.stoch_signal().iloc[-1]
        
        # Volatility Indicators (only calculate if enough data)
        if len(df) >= 20:
            bb = BollingerBands(close=df['Close'], window=20, window_dev=2)
            self.indicators['BB_Upper'] = bb.bollinger_hband().iloc[-1]
            self.indicators['BB_Lower'] = bb.bollinger_lband().iloc[-1]
            self.indicators['BB_Middle'] = bb.bollinger_mavg().iloc[-1]
        else:
            self.indicators['BB_Upper'] = None
            self.indicators['BB_Lower'] = None
            self.indicators['BB_Middle'] = None
        
        atr = AverageTrueRange(high=df['High'], low=df['Low'], close=df['Close'])
        self.indicators['ATR'] = atr.average_true_range().iloc[-1]
        
        # Volume Indicators
        obv = OnBalanceVolumeIndicator(close=df['Close'], volume=df['Volume'])
        self.indicators['OBV'] = obv.on_balance_volume().iloc[-1]
        
        # Current price and price changes for different periods
        self.indicators['Current_Price'] = df['Close'].iloc[-1]
        self.indicators['Price_Change_Pct'] = ((df['Close'].iloc[-1] - df['Close'].iloc[-2]) / df['Close'].iloc[-2]) * 100
        
        # Calculate price changes for different periods
        self.indicators['Price_Change_1d_Pct'] = self.indicators['Price_Change_Pct']  # Daily change
        
        # Weekly change (5 trading days)
        if len(df) >= 5:
            self.indicators['Price_Change_1w_Pct'] = ((df['Close'].iloc[-1] - df['Close'].iloc[-6]) / df['Close'].iloc[-6]) * 100
        else:
            self.indicators['Price_Change_1w_Pct'] = 0
            
        # Monthly change (21 trading days approximately)
        if len(df) >= 21:
            self.indicators['Price_Change_1m_Pct'] = ((df['Close'].iloc[-1] - df['Close'].iloc[-22]) / df['Close'].iloc[-22]) * 100
        else:
            self.indicators['Price_Change_1m_Pct'] = 0
            
        # 6-month change (126 trading days approximately)
        if len(df) >= 126:
            self.indicators['Price_Change_6m_Pct'] = ((df['Close'].iloc[-1] - df['Close'].iloc[-127]) / df['Close'].iloc[-127]) * 100
        else:
            self.indicators['Price_Change_6m_Pct'] = 0
            
        # 1-year change (252 trading days approximately)
        if len(df) >= 252:
            self.indicators['Price_Change_1y_Pct'] = ((df['Close'].iloc[-1] - df['Close'].iloc[-253]) / df['Close'].iloc[-253]) * 100
        elif len(df) >= 200:  # If we have at least ~200 days, use the earliest available data
            self.indicators['Price_Change_1y_Pct'] = ((df['Close'].iloc[-1] - df['Close'].iloc[0]) / df['Close'].iloc[0]) * 100
        else:
            self.indicators['Price_Change_1y_Pct'] = 0
        
        # Store full dataframes for analysis
        self.data = df
    
    def get_fundamental_indicators(self) -> Dict:
        """Get fundamental analysis indicators"""
        if not self.stock:
            return {}
        
        try:
            # Try to get info, may need to fetch it explicitly with timeout handling
            info = {}
            try:
                # Try regular info first
                info = self.stock.info
                # Sometimes info returns empty dict if not ready
                if not info or (isinstance(info, dict) and len(info) < 5):
                    # Try fast_info as backup
                    try:
                        fast_info = self.stock.fast_info
                        if fast_info and isinstance(fast_info, dict):
                            info.update(fast_info)
                    except:
                        pass
            except Exception as e:
                # If info fails, try fast_info
                try:
                    info = self.stock.fast_info or {}
                except:
                    info = {}
            
            # Continue even if info is minimal - we'll try to get what we can
            
            # Helper function to safely get values with fallbacks
            def safe_get(keys, default='N/A'):
                """Try multiple key names"""
                if isinstance(keys, str):
                    keys = [keys]
                
                for key in keys:
                    value = info.get(key)
                    if value is not None and value != '':
                        # Handle string 'None' or empty strings
                        if isinstance(value, str) and value.lower() in ['none', 'null', '']:
                            continue
                        return value
                return default
            
            # Get market cap with multiple attempts
            market_cap = safe_get(['marketCap', 'market_cap', 'totalMarketCap'], 0)
            if isinstance(market_cap, (int, float)) and market_cap > 0:
                if market_cap >= 1e12:
                    market_cap_str = f"${market_cap/1e12:.2f}T"
                elif market_cap >= 1e9:
                    market_cap_str = f"${market_cap/1e9:.2f}B"
                elif market_cap >= 1e6:
                    market_cap_str = f"${market_cap/1e6:.2f}M"
                else:
                    market_cap_str = f"${market_cap:,.0f}"
            else:
                market_cap_str = 'N/A'
            
            # Get current price from data if available
            current_price = self.indicators.get('Current_Price', 0) if self.indicators else 0
            
            fundamental = {
                'pe_ratio': safe_get(['trailingPE', 'trailingP/E', 'peRatio', 'pe']),
                'forward_pe': safe_get(['forwardPE', 'forwardP/E', 'forwardPeRatio']),
                'pb_ratio': safe_get(['priceToBook', 'priceToBookRatio', 'pb', 'p/b']),
                'dividend_yield': safe_get(['dividendYield', 'dividend_yield', 'yield', 'trailingAnnualDividendYield', 'fiveYearAvgDividendYield']),
                'market_cap': market_cap_str,
                'market_cap_raw': market_cap if isinstance(market_cap, (int, float)) and market_cap > 0 else 0,
                'eps': safe_get(['trailingEps', 'epsTrailing12Months', 'eps', 'earningsPerShare']),
                'revenue_growth': safe_get(['revenueGrowth', 'revenue_growth', 'quarterlyRevenueGrowth', 'revenueGrowthRate']),
                'earnings_growth': safe_get(['earningsQuarterlyGrowth', 'earningsGrowth', 'quarterlyEarningsGrowth', 'earnings_growth']),
                'debt_to_equity': safe_get(['debtToEquity', 'debtToEquityRatio', 'totalDebt/totalEquity']),
                'roe': safe_get(['returnOnEquity', 'returnOnEquityTTM', 'roe']),
                'profit_margin': safe_get(['profitMargins', 'profitMargin', 'profit_margin', 'netProfitMargin']),
                '52_week_high': safe_get(['fiftyTwoWeekHigh', '52WeekHigh', 'fifty_two_week_high']),
                '52_week_low': safe_get(['fiftyTwoWeekLow', '52WeekLow', 'fifty_two_week_low']),
                'avg_volume': safe_get(['averageVolume', 'averageVolume10days', 'avgVolume']),
                'beta': safe_get(['beta', 'beta3Year']),
            }
            
            # Format dividend yield - Yahoo Finance returns dividend yield inconsistently:
            # - Sometimes as percentage decimal (0.79 = 0.79%, 0.41 = 0.41%)
            # - Sometimes as actual decimal (0.0238 = 2.38%)
            # - Sometimes trailingAnnualDividendYield is 0 (suspended dividends) but fiveYearAvgDividendYield has historical data
            if isinstance(fundamental['dividend_yield'], (int, float)) and fundamental['dividend_yield'] != 'N/A':
                # If current dividend yield is 0, try to use 5-year average for context
                if fundamental['dividend_yield'] == 0:
                    five_year_avg = safe_get(['fiveYearAvgDividendYield'])
                    if five_year_avg and five_year_avg != 'N/A':
                        fundamental['dividend_yield'] = round(five_year_avg, 2)
                elif fundamental['dividend_yield'] < 0.1:
                    # Convert decimal to percentage
                    fundamental['dividend_yield'] = round(fundamental['dividend_yield'] * 100, 2)
                else:
                    # Already in percentage format, just round
                    fundamental['dividend_yield'] = round(fundamental['dividend_yield'], 2)
            
            for key in ['revenue_growth', 'earnings_growth']:
                if isinstance(fundamental[key], (int, float)) and fundamental[key] != 'N/A':
                    # These are typically already in percentage form (0.028 = 2.8%)
                    if abs(fundamental[key]) < 1:
                        fundamental[key] = round(fundamental[key] * 100, 2)
                    else:
                        fundamental[key] = round(fundamental[key], 2)
            
            # ROE and Profit Margin are already in decimal form and should be converted to percentage
            for key in ['roe', 'profit_margin']:
                if isinstance(fundamental[key], (int, float)) and fundamental[key] != 'N/A':
                    # These are already in decimal form (0.00186 = 0.186%) and need conversion
                    fundamental[key] = round(fundamental[key] * 100, 2)
            
            # Format other numeric values
            for key in ['pe_ratio', 'forward_pe', 'pb_ratio', 'eps', 'debt_to_equity', 'beta', '52_week_high', '52_week_low', 'avg_volume']:
                if isinstance(fundamental[key], (int, float)) and fundamental[key] != 'N/A':
                    fundamental[key] = round(fundamental[key], 2)
            
            # Convert N/A strings back to proper format
            for key in fundamental:
                if fundamental[key] == 'N/A':
                    fundamental[key] = 'N/A'
                elif fundamental[key] == 0 and key not in ['pe_ratio', 'forward_pe', 'pb_ratio', 'eps', 'dividend_yield']:
                    # Some values might legitimately be 0, but for these fields 0 usually means N/A
                    if key in ['pe_ratio', 'forward_pe', 'pb_ratio', 'eps', 'debt_to_equity', 'roe', 'profit_margin', 'beta']:
                        fundamental[key] = 'N/A'
            
            return fundamental
        except Exception as e:
            print(f"Error getting fundamental indicators for {self.symbol}: {str(e)}")
            import traceback
            traceback.print_exc()
            return {}
    
    def get_recommendation(self) -> Dict:
        """
        Generate stock recommendation based on technical indicators
        
        Returns:
            Dictionary with recommendation, score, and reasoning
        """
        if not self.indicators:
            return {
                'recommendation': 'NEUTRAL',
                'score': 0,
                'reasoning': 'No indicators calculated'
            }
        
        score = 0
        reasons = []
        
        current_price = self.indicators['Current_Price']
        rsi = self.indicators['RSI']
        macd = self.indicators['MACD']
        macd_signal = self.indicators['MACD_Signal']
        macd_hist = self.indicators['MACD_Histogram']
        sma_20 = self.indicators['SMA_20']
        sma_50 = self.indicators['SMA_50']
        sma_200 = self.indicators['SMA_200']
        bb_upper = self.indicators['BB_Upper']
        bb_lower = self.indicators['BB_Lower']
        stoch_k = self.indicators['Stoch_K']
        stoch_d = self.indicators['Stoch_D']
        
        # RSI Analysis
        if rsi < 30:
            score += 2
            reasons.append("RSI indicates oversold condition (RSI < 30)")
        elif rsi > 70:
            score -= 2
            reasons.append("RSI indicates overbought condition (RSI > 70)")
        elif 30 <= rsi <= 50:
            score += 1
            reasons.append("RSI in neutral-bullish range")
        else:
            score -= 1
            reasons.append("RSI in neutral-bearish range")
        
        # MACD Analysis
        if macd is not None and macd_signal is not None and macd_hist is not None:
            if macd > macd_signal and macd_hist > 0:
                score += 2
                reasons.append("MACD bullish crossover detected")
            elif macd < macd_signal and macd_hist < 0:
                score -= 2
                reasons.append("MACD bearish crossover detected")
        
        # Moving Average Analysis
        ma_bullish_signals = 0
        if sma_20 is not None and current_price > sma_20:
            score += 1
            ma_bullish_signals += 1
        if sma_50 is not None and current_price > sma_50:
            score += 1
            ma_bullish_signals += 1
        if sma_200 is not None and current_price > sma_200:
            score += 1
            ma_bullish_signals += 1
        
        total_ma_signals = sum([
            1 if sma_20 is not None else 0,
            1 if sma_50 is not None else 0,
            1 if sma_200 is not None else 0
        ])
        
        if total_ma_signals > 0:
            if ma_bullish_signals == total_ma_signals:
                reasons.append("Price above all available moving averages (bullish)")
            elif ma_bullish_signals == 0:
                score -= 2
                reasons.append("Price below all available moving averages (bearish)")
        
        # Golden Cross / Death Cross (only if both SMAs are available)
        if sma_50 is not None and sma_200 is not None:
            if sma_50 > sma_200:
                score += 1
                reasons.append("Golden Cross pattern (SMA50 > SMA200)")
            else:
                score -= 1
                reasons.append("Death Cross pattern (SMA50 < SMA200)")
        
        # Bollinger Bands Analysis
        if bb_lower is not None and bb_upper is not None:
            if current_price < bb_lower:
                score += 1
                reasons.append("Price near lower Bollinger Band (potential bounce)")
            elif current_price > bb_upper:
                score -= 1
                reasons.append("Price near upper Bollinger Band (potential pullback)")
        
        # Stochastic Oscillator
        if stoch_k is not None and stoch_d is not None:
            if stoch_k < 20 and stoch_d < 20:
                score += 1
                reasons.append("Stochastic indicates oversold")
            elif stoch_k > 80 and stoch_d > 80:
                score -= 1
                reasons.append("Stochastic indicates overbought")
        
        # Price momentum
        price_change = self.indicators['Price_Change_Pct']
        if price_change > 2:
            score += 1
            reasons.append("Strong positive price momentum")
        elif price_change < -2:
            score -= 1
            reasons.append("Strong negative price momentum")
        
        # Determine recommendation
        if score >= 5:
            recommendation = "STRONG BUY"
        elif score >= 2:
            recommendation = "BUY"
        elif score >= -1:
            recommendation = "HOLD"
        elif score >= -4:
            recommendation = "SELL"
        else:
            recommendation = "STRONG SELL"
        
        return {
            'recommendation': recommendation,
            'score': score,
            'reasoning': reasons,
            'indicators': self.indicators
        }
    
    def get_summary(self) -> Dict:
        """Get a summary of the stock analysis"""
        if not self.indicators:
            return {}
        
        info = self.stock.info if self.stock else {}
        fundamental = self.get_fundamental_indicators()
        
        summary = {
            'symbol': self.symbol,
            'company_name': info.get('longName', 'N/A'),
            'current_price': round(self.indicators['Current_Price'], 2),
            'price_change_pct': round(self.indicators['Price_Change_Pct'], 2),
            'price_change_1d_pct': round(self.indicators['Price_Change_1d_Pct'], 2),
            'price_change_1w_pct': round(self.indicators.get('Price_Change_1w_Pct', 0), 2),
            'price_change_1m_pct': round(self.indicators.get('Price_Change_1m_Pct', 0), 2),
            'price_change_6m_pct': round(self.indicators.get('Price_Change_6m_Pct', 0), 2),
            'price_change_1y_pct': round(self.indicators.get('Price_Change_1y_Pct', 0), 2),
            'rsi': round(self.indicators['RSI'], 2) if self.indicators['RSI'] is not None else 0,
            'macd': round(self.indicators['MACD'], 2) if self.indicators['MACD'] is not None else 0,
            'macd_signal': round(self.indicators['MACD_Signal'], 2) if self.indicators['MACD_Signal'] is not None else 0,
            'sma_20': round(self.indicators['SMA_20'], 2) if self.indicators['SMA_20'] is not None else 0,
            'sma_50': round(self.indicators['SMA_50'], 2) if self.indicators['SMA_50'] is not None else 0,
            'sma_200': round(self.indicators['SMA_200'], 2) if self.indicators['SMA_200'] is not None else 0,
            'bb_upper': round(self.indicators['BB_Upper'], 2) if self.indicators['BB_Upper'] is not None else 0,
            'bb_lower': round(self.indicators['BB_Lower'], 2) if self.indicators['BB_Lower'] is not None else 0,
        }
        
        # Add fundamental indicators
        summary['fundamental'] = fundamental
        
        return summary

