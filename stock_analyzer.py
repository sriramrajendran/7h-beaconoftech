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
                
            # Ensure we have enough data
            if len(self.data) < 50:
                print(f"Warning: Limited data for {self.symbol}. Need at least 50 days.")
                return False
                
            return True
        except Exception as e:
            print(f"Error fetching data for {self.symbol}: {str(e)}")
            return False
    
    def calculate_indicators(self):
        """Calculate all technical indicators"""
        if self.data is None or self.data.empty:
            return
        
        df = self.data.copy()
        
        # Trend Indicators
        macd = MACD(close=df['Close'])
        self.indicators['MACD'] = macd.macd().iloc[-1]
        self.indicators['MACD_Signal'] = macd.macd_signal().iloc[-1]
        self.indicators['MACD_Histogram'] = macd.macd_diff().iloc[-1]
        
        # Moving Averages
        sma_20 = SMAIndicator(close=df['Close'], window=20)
        sma_50 = SMAIndicator(close=df['Close'], window=50)
        sma_200 = SMAIndicator(close=df['Close'], window=200)
        ema_12 = EMAIndicator(close=df['Close'], window=12)
        ema_26 = EMAIndicator(close=df['Close'], window=26)
        
        self.indicators['SMA_20'] = sma_20.sma_indicator().iloc[-1]
        self.indicators['SMA_50'] = sma_50.sma_indicator().iloc[-1]
        self.indicators['SMA_200'] = sma_200.sma_indicator().iloc[-1]
        self.indicators['EMA_12'] = ema_12.ema_indicator().iloc[-1]
        self.indicators['EMA_26'] = ema_26.ema_indicator().iloc[-1]
        
        # Momentum Indicators
        rsi = RSIIndicator(close=df['Close'], window=14)
        self.indicators['RSI'] = rsi.rsi().iloc[-1]
        
        stoch = StochasticOscillator(high=df['High'], low=df['Low'], close=df['Close'])
        self.indicators['Stoch_K'] = stoch.stoch().iloc[-1]
        self.indicators['Stoch_D'] = stoch.stoch_signal().iloc[-1]
        
        # Volatility Indicators
        bb = BollingerBands(close=df['Close'], window=20, window_dev=2)
        self.indicators['BB_Upper'] = bb.bollinger_hband().iloc[-1]
        self.indicators['BB_Lower'] = bb.bollinger_lband().iloc[-1]
        self.indicators['BB_Middle'] = bb.bollinger_mavg().iloc[-1]
        
        atr = AverageTrueRange(high=df['High'], low=df['Low'], close=df['Close'])
        self.indicators['ATR'] = atr.average_true_range().iloc[-1]
        
        # Volume Indicators
        obv = OnBalanceVolumeIndicator(close=df['Close'], volume=df['Volume'])
        self.indicators['OBV'] = obv.on_balance_volume().iloc[-1]
        
        # Current price
        self.indicators['Current_Price'] = df['Close'].iloc[-1]
        self.indicators['Price_Change_Pct'] = ((df['Close'].iloc[-1] - df['Close'].iloc[-2]) / df['Close'].iloc[-2]) * 100
        
        # Store full dataframes for analysis
        self.data = df
    
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
        if macd > macd_signal and macd_hist > 0:
            score += 2
            reasons.append("MACD bullish crossover detected")
        elif macd < macd_signal and macd_hist < 0:
            score -= 2
            reasons.append("MACD bearish crossover detected")
        
        # Moving Average Analysis
        ma_bullish_signals = 0
        if current_price > sma_20:
            score += 1
            ma_bullish_signals += 1
        if current_price > sma_50:
            score += 1
            ma_bullish_signals += 1
        if current_price > sma_200:
            score += 1
            ma_bullish_signals += 1
        
        if ma_bullish_signals == 3:
            reasons.append("Price above all major moving averages (bullish)")
        elif ma_bullish_signals == 0:
            score -= 2
            reasons.append("Price below all major moving averages (bearish)")
        
        # Golden Cross / Death Cross
        if sma_50 > sma_200:
            score += 1
            reasons.append("Golden Cross pattern (SMA50 > SMA200)")
        else:
            score -= 1
            reasons.append("Death Cross pattern (SMA50 < SMA200)")
        
        # Bollinger Bands Analysis
        if current_price < bb_lower:
            score += 1
            reasons.append("Price near lower Bollinger Band (potential bounce)")
        elif current_price > bb_upper:
            score -= 1
            reasons.append("Price near upper Bollinger Band (potential pullback)")
        
        # Stochastic Oscillator
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
        
        return {
            'symbol': self.symbol,
            'company_name': info.get('longName', 'N/A'),
            'current_price': round(self.indicators['Current_Price'], 2),
            'price_change_pct': round(self.indicators['Price_Change_Pct'], 2),
            'rsi': round(self.indicators['RSI'], 2),
            'macd': round(self.indicators['MACD'], 2),
            'macd_signal': round(self.indicators['MACD_Signal'], 2),
            'sma_20': round(self.indicators['SMA_20'], 2),
            'sma_50': round(self.indicators['SMA_50'], 2),
            'sma_200': round(self.indicators['SMA_200'], 2),
            'bb_upper': round(self.indicators['BB_Upper'], 2),
            'bb_lower': round(self.indicators['BB_Lower'], 2),
        }

