#!/usr/bin/env python3
"""
Flask Web Application for Stock Technical Analysis
"""

from flask import Flask, render_template, request, jsonify
from stock_analyzer import StockAnalyzer
import json
import os
from typing import List, Dict

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

CONFIG_PORTFOLIO_FILE = 'config_portfolio.txt'
CONFIG_WATCHLIST_FILE = 'config_watchlist.txt'


def load_stocks_from_config(filename: str) -> List[str]:
    """Load stock symbols from config file"""
    stocks = []
    if os.path.exists(filename):
        try:
            with open(filename, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#'):
                        stocks.append(line.upper())
        except Exception as e:
            print(f"Error reading {filename}: {e}")
    return stocks


@app.route('/')
def index():
    """Home page - Portfolio stocks"""
    return render_template('index.html', page_type='portfolio')


@app.route('/watchlist')
def watchlist():
    """Watchlist page"""
    return render_template('index.html', page_type='watchlist')


@app.route('/market')
def market():
    """US Market analysis page"""
    return render_template('index.html', page_type='market')


@app.route('/etf')
def etf():
    """ETF/Index analysis page"""
    return render_template('index.html', page_type='etf')


@app.route('/api/config_stocks', methods=['GET'])
def get_config_stocks():
    """Get stocks from config files"""
    try:
        config_type = request.args.get('type', 'portfolio')  # 'portfolio' or 'watchlist'
        
        if config_type == 'watchlist':
            filename = CONFIG_WATCHLIST_FILE
        else:
            filename = CONFIG_PORTFOLIO_FILE
        
        stocks = load_stocks_from_config(filename)
        
        return jsonify({
            'success': True,
            'type': config_type,
            'stocks': stocks
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/analyze', methods=['POST'])
def analyze_stock():
    """Analyze a single stock"""
    try:
        data = request.get_json()
        symbol = data.get('symbol', '').upper().strip()
        period = data.get('period', '1y')
        
        if not symbol:
            return jsonify({'error': 'Stock symbol is required'}), 400
        
        analyzer = StockAnalyzer(symbol, period)
        
        if not analyzer.fetch_data():
            return jsonify({'error': f'Failed to fetch data for {symbol}'}), 404
        
        analyzer.calculate_indicators()
        summary = analyzer.get_summary()
        recommendation = analyzer.get_recommendation()
        
        result = {
            'success': True,
            'symbol': symbol,
            'summary': summary,
            'recommendation': recommendation
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/analyze_portfolio', methods=['POST'])
def analyze_portfolio():
    """Analyze multiple stocks for portfolio recommendations"""
    try:
        data = request.get_json()
        symbols_str = data.get('symbols', '')
        period = data.get('period', '1y')
        top_n = int(data.get('top_n', 10))
        
        if not symbols_str:
            return jsonify({'error': 'Stock symbols are required'}), 400
        
        # Parse symbols (comma or space separated)
        symbols = [s.strip().upper() for s in symbols_str.replace(',', ' ').split() if s.strip()]
        
        if not symbols:
            return jsonify({'error': 'No valid stock symbols provided'}), 400
        
        results = []
        failed_symbols = []
        
        for symbol in symbols:
            try:
                analyzer = StockAnalyzer(symbol, period)
                
                if analyzer.fetch_data():
                    analyzer.calculate_indicators()
                    summary = analyzer.get_summary()
                    recommendation = analyzer.get_recommendation()
                    
                    fundamental = summary.get('fundamental', {})
                    
                    results.append({
                        'symbol': symbol,
                        'company': summary.get('company_name', 'N/A'),
                        'price': round(summary.get('current_price', 0), 2),
                        'change': round(summary.get('price_change_pct', 0), 2),
                        'rsi': round(summary.get('rsi', 0), 2),
                        'macd': round(summary.get('macd', 0), 2),
                        'sma_20': round(summary.get('sma_20', 0), 2),
                        'sma_50': round(summary.get('sma_50', 0), 2),
                        'recommendation': recommendation['recommendation'],
                        'score': recommendation['score'],
                        'reasoning': recommendation['reasoning'],
                        'fundamental': fundamental
                    })
                else:
                    failed_symbols.append(symbol)
            except Exception as e:
                failed_symbols.append(f"{symbol} ({str(e)})")
        
        if not results:
            return jsonify({'error': 'No stocks were successfully analyzed'}), 404
        
        # Sort by score
        results_sorted = sorted(results, key=lambda x: x['score'], reverse=True)
        
        # Separate BUY and SELL
        buy_stocks = [r for r in results_sorted if 'BUY' in r['recommendation']]
        sell_stocks = sorted([r for r in results_sorted if 'SELL' in r['recommendation']], 
                            key=lambda x: x['score'])
        hold_stocks = [r for r in results_sorted if r['recommendation'] == 'HOLD']
        
        # Calculate statistics
        avg_score = sum(r['score'] for r in results) / len(results) if results else 0
        highest = results_sorted[0] if results_sorted else None
        lowest = results_sorted[-1] if results_sorted else None
        
        portfolio_result = {
            'success': True,
            'total_analyzed': len(results),
            'buy_stocks': buy_stocks[:top_n],
            'sell_stocks': sell_stocks[:top_n],
            'hold_stocks': hold_stocks,
            'failed_symbols': failed_symbols,
            'summary': {
                'total': len(results),
                'buy_count': len(buy_stocks),
                'sell_count': len(sell_stocks),
                'hold_count': len(hold_stocks),
                'avg_score': round(avg_score, 2),
                'highest': highest,
                'lowest': lowest
            }
        }
        
        return jsonify(portfolio_result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Major US stocks for market analysis
MAJOR_US_STOCKS = [
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META', 'TSLA', 'BRK-B',
    'V', 'UNH', 'JNJ', 'WMT', 'MA', 'PG', 'JPM', 'HD', 'DIS', 'BAC',
    'VZ', 'ADBE', 'CMCSA', 'NFLX', 'KO', 'PFE', 'NKE', 'MRK', 'PEP',
    'T', 'INTC', 'CSCO', 'AMD', 'ABT', 'QCOM', 'AVGO', 'CVX', 'WFC',
    'COST', 'MCD', 'TMO', 'MDT', 'HON', 'UPS', 'BMY', 'UNP', 'LIN',
    'RTX', 'AMGN', 'LOW', 'PM', 'NEE', 'INTU', 'C', 'GS', 'SBUX'
]


# Major ETFs and Indexes
MAJOR_ETFS = [
    'SPY', 'QQQ', 'DIA', 'IWM', 'VTI', 'VOO', 'VEA', 'VWO', 'AGG',
    'GLD', 'SLV', 'USO', 'TLT', 'HYG', 'LQD', 'EEM', 'EFA', 'IEFA',
    'IEMG', 'VGK', 'VPL', 'BND', 'BSV', 'BNDX', 'VTEB', 'SCHX', 'SCHF',
    'SCHM', 'SCHA', 'ITOT', 'IXUS', 'IJH', 'IJR', 'IEFA', 'IEMG'
]


@app.route('/analyze_market', methods=['POST'])
def analyze_market():
    """Analyze US market stocks and return top BUY recommendations"""
    try:
        data = request.get_json()
        period = data.get('period', '1y')
        top_n = int(data.get('top_n', 10))
        
        results = []
        failed_symbols = []
        
        # Analyze major US stocks
        for symbol in MAJOR_US_STOCKS:
            try:
                analyzer = StockAnalyzer(symbol, period)
                
                if analyzer.fetch_data():
                    analyzer.calculate_indicators()
                    summary = analyzer.get_summary()
                    recommendation = analyzer.get_recommendation()
                    
                    # Only include BUY recommendations
                    if 'BUY' in recommendation['recommendation']:
                        fundamental = summary.get('fundamental', {})
                        results.append({
                            'symbol': symbol,
                            'company': summary.get('company_name', 'N/A'),
                            'price': round(summary.get('current_price', 0), 2),
                            'change': round(summary.get('price_change_pct', 0), 2),
                            'rsi': round(summary.get('rsi', 0), 2),
                            'recommendation': recommendation['recommendation'],
                            'score': recommendation['score'],
                            'reasoning': recommendation['reasoning'],
                            'fundamental': fundamental
                        })
            except Exception as e:
                failed_symbols.append(f"{symbol} ({str(e)})")
        
        if not results:
            return jsonify({'error': 'No BUY recommendations found in US market'}), 404
        
        # Sort by score (highest first) and take top N
        results_sorted = sorted(results, key=lambda x: x['score'], reverse=True)[:top_n]
        
        return jsonify({
            'success': True,
            'total_analyzed': len(MAJOR_US_STOCKS),
            'buy_recommendations': results_sorted,
            'failed_symbols': failed_symbols
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/analyze_etf', methods=['POST'])
def analyze_etf():
    """Analyze ETFs/Indexes and return top BUY recommendations"""
    try:
        data = request.get_json()
        period = data.get('period', '1y')
        top_n = int(data.get('top_n', 10))
        
        results = []
        failed_symbols = []
        
        # Analyze major ETFs
        for symbol in MAJOR_ETFS:
            try:
                analyzer = StockAnalyzer(symbol, period)
                
                if analyzer.fetch_data():
                    analyzer.calculate_indicators()
                    summary = analyzer.get_summary()
                    recommendation = analyzer.get_recommendation()
                    
                    # Only include BUY recommendations
                    if 'BUY' in recommendation['recommendation']:
                        fundamental = summary.get('fundamental', {})
                        results.append({
                            'symbol': symbol,
                            'company': summary.get('company_name', 'N/A'),
                            'price': round(summary.get('current_price', 0), 2),
                            'change': round(summary.get('price_change_pct', 0), 2),
                            'rsi': round(summary.get('rsi', 0), 2),
                            'recommendation': recommendation['recommendation'],
                            'score': recommendation['score'],
                            'reasoning': recommendation['reasoning'],
                            'fundamental': fundamental
                        })
            except Exception as e:
                failed_symbols.append(f"{symbol} ({str(e)})")
        
        if not results:
            return jsonify({'error': 'No BUY recommendations found in ETFs'}), 404
        
        # Sort by score (highest first) and take top N
        results_sorted = sorted(results, key=lambda x: x['score'], reverse=True)[:top_n]
        
        return jsonify({
            'success': True,
            'total_analyzed': len(MAJOR_ETFS),
            'buy_recommendations': results_sorted,
            'failed_symbols': failed_symbols
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)

