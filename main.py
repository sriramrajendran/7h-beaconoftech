#!/usr/bin/env python3
"""
Stock Recommendation CLI Application
"""

import sys

try:
    from stock_analyzer import StockAnalyzer
except ImportError as e:
    print(f"Error: Failed to import stock_analyzer module.")
    print(f"Details: {e}")
    print(f"\nPlease ensure all dependencies are installed:")
    print(f"  pip install -r requirements.txt")
    sys.exit(1)

try:
    from colorama import Fore, Style, init
    from tabulate import tabulate
except ImportError as e:
    print(f"Error: Failed to import required modules. Please install dependencies:")
    print(f"  pip install colorama tabulate")
    print(f"Details: {e}")
    sys.exit(1)

import argparse

# Initialize colorama for cross-platform colored output
init(autoreset=True)


def print_header():
    """Print application header"""
    print(f"\n{Fore.CYAN}{'='*60}")
    print(f"{Fore.CYAN}  Stock Technical Analysis & Recommendation System")
    print(f"{Fore.CYAN}{'='*60}{Style.RESET_ALL}\n")


def print_recommendation(recommendation_data: dict):
    """Print formatted recommendation"""
    rec = recommendation_data['recommendation']
    score = recommendation_data['score']
    
    # Color code based on recommendation
    if 'STRONG BUY' in rec or 'BUY' in rec:
        color = Fore.GREEN
    elif 'SELL' in rec or 'STRONG SELL' in rec:
        color = Fore.RED
    else:
        color = Fore.YELLOW
    
    print(f"\n{Fore.CYAN}{'─'*60}")
    print(f"{Fore.CYAN}  RECOMMENDATION: {color}{rec}{Style.RESET_ALL}")
    print(f"{Fore.CYAN}  Score: {color}{score}{Style.RESET_ALL}")
    print(f"{Fore.CYAN}{'─'*60}{Style.RESET_ALL}\n")
    
    print(f"{Fore.YELLOW}Reasoning:{Style.RESET_ALL}")
    for i, reason in enumerate(recommendation_data['reasoning'], 1):
        print(f"  {i}. {reason}")


def print_indicators(summary: dict):
    """Print technical indicators in a table"""
    if not summary:
        return
    
    print(f"\n{Fore.CYAN}{'─'*60}")
    print(f"{Fore.CYAN}  TECHNICAL INDICATORS{Style.RESET_ALL}")
    print(f"{Fore.CYAN}{'─'*60}{Style.RESET_ALL}\n")
    
    table_data = [
        ["Company", summary.get('company_name', 'N/A')],
        ["Current Price", f"${summary.get('current_price', 0):.2f}"],
        ["Price Change", f"{summary.get('price_change_pct', 0):+.2f}%"],
        ["RSI (14)", f"{summary.get('rsi', 0):.2f}"],
        ["MACD", f"{summary.get('macd', 0):.2f}"],
        ["MACD Signal", f"{summary.get('macd_signal', 0):.2f}"],
        ["SMA (20)", f"${summary.get('sma_20', 0):.2f}"],
        ["SMA (50)", f"${summary.get('sma_50', 0):.2f}"],
        ["SMA (200)", f"${summary.get('sma_200', 0):.2f}"],
        ["BB Upper", f"${summary.get('bb_upper', 0):.2f}"],
        ["BB Lower", f"${summary.get('bb_lower', 0):.2f}"],
    ]
    
    print(tabulate(table_data, headers=["Indicator", "Value"], tablefmt="grid"))


def analyze_stock(symbol: str, period: str = "1y"):
    """Analyze a single stock"""
    print(f"\n{Fore.YELLOW}Analyzing {symbol}...{Style.RESET_ALL}")
    
    analyzer = StockAnalyzer(symbol, period)
    
    if not analyzer.fetch_data():
        print(f"{Fore.RED}Failed to fetch data for {symbol}{Style.RESET_ALL}")
        return False
    
    analyzer.calculate_indicators()
    summary = analyzer.get_summary()
    recommendation = analyzer.get_recommendation()
    
    print_indicators(summary)
    print_recommendation(recommendation)
    
    return True


def analyze_multiple_stocks(symbols: list, period: str = "1y"):
    """Analyze multiple stocks and compare"""
    print(f"\n{Fore.YELLOW}Analyzing {len(symbols)} stocks...{Style.RESET_ALL}\n")
    
    results = []
    
    for symbol in symbols:
        analyzer = StockAnalyzer(symbol, period)
        
        if analyzer.fetch_data():
            analyzer.calculate_indicators()
            summary = analyzer.get_summary()
            recommendation = analyzer.get_recommendation()
            
            results.append({
                'symbol': symbol,
                'company': summary.get('company_name', 'N/A'),
                'price': summary.get('current_price', 0),
                'change': summary.get('price_change_pct', 0),
                'rsi': summary.get('rsi', 0),
                'recommendation': recommendation['recommendation'],
                'score': recommendation['score']
            })
        else:
            print(f"{Fore.RED}Skipping {symbol} - data unavailable{Style.RESET_ALL}")
    
    if results:
        print(f"\n{Fore.CYAN}{'─'*100}")
        print(f"{Fore.CYAN}  COMPARISON RESULTS{Style.RESET_ALL}")
        print(f"{Fore.CYAN}{'─'*100}{Style.RESET_ALL}\n")
        
        table_data = []
        for r in results:
            # Color code recommendation
            rec = r['recommendation']
            if 'STRONG BUY' in rec or 'BUY' in rec:
                rec_display = f"{Fore.GREEN}{rec}{Style.RESET_ALL}"
            elif 'SELL' in rec or 'STRONG SELL' in rec:
                rec_display = f"{Fore.RED}{rec}{Style.RESET_ALL}"
            else:
                rec_display = f"{Fore.YELLOW}{rec}{Style.RESET_ALL}"
            
            table_data.append([
                r['symbol'],
                r['company'][:30],  # Truncate long names
                f"${r['price']:.2f}",
                f"{r['change']:+.2f}%",
                f"{r['rsi']:.2f}",
                rec_display,
                r['score']
            ])
        
        headers = ["Symbol", "Company", "Price", "Change %", "RSI", "Recommendation", "Score"]
        print(tabulate(table_data, headers=headers, tablefmt="grid"))
        
        # Sort by score (best first)
        results_sorted = sorted(results, key=lambda x: x['score'], reverse=True)
        print(f"\n{Fore.YELLOW}Top Recommendations (by score):{Style.RESET_ALL}")
        for i, r in enumerate(results_sorted[:5], 1):
            print(f"  {i}. {r['symbol']} - {r['recommendation']} (Score: {r['score']})")


def analyze_portfolio(symbols: list, period: str = "1y", top_n: int = 10):
    """Analyze portfolio and provide top BUY and SELL recommendations"""
    print(f"\n{Fore.YELLOW}Analyzing portfolio of {len(symbols)} stocks...{Style.RESET_ALL}")
    print(f"{Fore.YELLOW}This may take a few moments...{Style.RESET_ALL}\n")
    
    results = []
    failed_symbols = []
    
    for i, symbol in enumerate(symbols, 1):
        print(f"{Fore.CYAN}[{i}/{len(symbols)}]{Style.RESET_ALL} Analyzing {symbol}...", end=' ', flush=True)
        
        analyzer = StockAnalyzer(symbol, period)
        
        if analyzer.fetch_data():
            analyzer.calculate_indicators()
            summary = analyzer.get_summary()
            recommendation = analyzer.get_recommendation()
            
            results.append({
                'symbol': symbol,
                'company': summary.get('company_name', 'N/A'),
                'price': summary.get('current_price', 0),
                'change': summary.get('price_change_pct', 0),
                'rsi': summary.get('rsi', 0),
                'macd': summary.get('macd', 0),
                'sma_20': summary.get('sma_20', 0),
                'sma_50': summary.get('sma_50', 0),
                'recommendation': recommendation['recommendation'],
                'score': recommendation['score'],
                'reasoning': recommendation['reasoning']
            })
            print(f"{Fore.GREEN}✓{Style.RESET_ALL}")
        else:
            failed_symbols.append(symbol)
            print(f"{Fore.RED}✗{Style.RESET_ALL}")
    
    if failed_symbols:
        print(f"\n{Fore.RED}Failed to analyze {len(failed_symbols)} stocks: {', '.join(failed_symbols)}{Style.RESET_ALL}")
    
    if not results:
        print(f"\n{Fore.RED}No stocks were successfully analyzed.{Style.RESET_ALL}")
        return
    
    # Sort by score (highest to lowest)
    results_sorted = sorted(results, key=lambda x: x['score'], reverse=True)
    
    # Separate BUY and SELL recommendations
    buy_stocks = [r for r in results_sorted if 'BUY' in r['recommendation']]
    sell_stocks = [r for r in results_sorted if 'SELL' in r['recommendation']]
    hold_stocks = [r for r in results_sorted if r['recommendation'] == 'HOLD']
    
    # Display Top 10 BUY Recommendations
    print(f"\n{Fore.CYAN}{'='*100}")
    print(f"{Fore.CYAN}  TOP {min(top_n, len(buy_stocks))} BUY RECOMMENDATIONS{Style.RESET_ALL}")
    print(f"{Fore.CYAN}{'='*100}{Style.RESET_ALL}\n")
    
    if buy_stocks:
        buy_table = []
        for i, r in enumerate(buy_stocks[:top_n], 1):
            buy_table.append([
                i,
                r['symbol'],
                r['company'][:35],
                f"${r['price']:.2f}",
                f"{r['change']:+.2f}%",
                f"{r['rsi']:.2f}",
                f"{Fore.GREEN}{r['recommendation']}{Style.RESET_ALL}",
                f"{Fore.GREEN}{r['score']}{Style.RESET_ALL}"
            ])
        
        headers = ["#", "Symbol", "Company", "Price", "Change %", "RSI", "Recommendation", "Score"]
        print(tabulate(buy_table, headers=headers, tablefmt="grid"))
    else:
        print(f"{Fore.YELLOW}No BUY recommendations found in portfolio.{Style.RESET_ALL}")
    
    # Display Top 10 SELL Recommendations
    print(f"\n{Fore.CYAN}{'='*100}")
    print(f"{Fore.CYAN}  TOP {min(top_n, len(sell_stocks))} SELL RECOMMENDATIONS{Style.RESET_ALL}")
    print(f"{Fore.CYAN}{'='*100}{Style.RESET_ALL}\n")
    
    if sell_stocks:
        # Sort sell stocks by score (lowest first, as negative scores are worse)
        sell_stocks_sorted = sorted(sell_stocks, key=lambda x: x['score'])
        
        sell_table = []
        for i, r in enumerate(sell_stocks_sorted[:top_n], 1):
            sell_table.append([
                i,
                r['symbol'],
                r['company'][:35],
                f"${r['price']:.2f}",
                f"{r['change']:+.2f}%",
                f"{r['rsi']:.2f}",
                f"{Fore.RED}{r['recommendation']}{Style.RESET_ALL}",
                f"{Fore.RED}{r['score']}{Style.RESET_ALL}"
            ])
        
        headers = ["#", "Symbol", "Company", "Price", "Change %", "RSI", "Recommendation", "Score"]
        print(tabulate(sell_table, headers=headers, tablefmt="grid"))
    else:
        print(f"{Fore.YELLOW}No SELL recommendations found in portfolio.{Style.RESET_ALL}")
    
    # Summary Statistics
    print(f"\n{Fore.CYAN}{'='*100}")
    print(f"{Fore.CYAN}  PORTFOLIO SUMMARY{Style.RESET_ALL}")
    print(f"{Fore.CYAN}{'='*100}{Style.RESET_ALL}\n")
    
    summary_data = [
        ["Total Analyzed", len(results)],
        [f"{Fore.GREEN}BUY Recommendations{Style.RESET_ALL}", len(buy_stocks)],
        [f"{Fore.RED}SELL Recommendations{Style.RESET_ALL}", len(sell_stocks)],
        [f"{Fore.YELLOW}HOLD Recommendations{Style.RESET_ALL}", len(hold_stocks)],
        ["Average Score", f"{sum(r['score'] for r in results) / len(results):.2f}"],
        ["Highest Score", f"{results_sorted[0]['symbol']}: {results_sorted[0]['score']}"],
        ["Lowest Score", f"{results_sorted[-1]['symbol']}: {results_sorted[-1]['score']}"]
    ]
    
    print(tabulate(summary_data, headers=["Metric", "Value"], tablefmt="grid"))
    
    # Show top 3 BUY with reasoning
    if buy_stocks:
        print(f"\n{Fore.CYAN}{'─'*100}")
        print(f"{Fore.CYAN}  DETAILED ANALYSIS: TOP 3 BUY RECOMMENDATIONS{Style.RESET_ALL}")
        print(f"{Fore.CYAN}{'─'*100}{Style.RESET_ALL}\n")
        
        for i, r in enumerate(buy_stocks[:3], 1):
            print(f"{Fore.GREEN}{i}. {r['symbol']} - {r['company']}{Style.RESET_ALL}")
            print(f"   Price: ${r['price']:.2f} | Score: {r['score']} | RSI: {r['rsi']:.2f}")
            print(f"   Key Reasons:")
            for reason in r['reasoning'][:3]:  # Show top 3 reasons
                print(f"     • {reason}")
            print()


def main():
    """Main function"""
    parser = argparse.ArgumentParser(
        description='Stock Technical Analysis and Recommendation System',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python main.py AAPL
  python main.py AAPL MSFT GOOGL
  python main.py AAPL --period 6mo
  python main.py --watchlist AAPL,MSFT,GOOGL
  python main.py --portfolio --watchlist AAPL,MSFT,GOOGL,TSLA,NVDA
  python main.py --portfolio-file portfolio.txt
  python main.py --portfolio --watchlist AAPL,MSFT,GOOGL --top-n 20
        """
    )
    
    parser.add_argument(
        'symbols',
        nargs='*',
        help='Stock ticker symbol(s) to analyze (e.g., AAPL MSFT GOOGL)'
    )
    
    parser.add_argument(
        '--period',
        '-p',
        default='1y',
        choices=['1mo', '3mo', '6mo', '1y', '2y', '5y'],
        help='Time period for analysis (default: 1y)'
    )
    
    parser.add_argument(
        '--watchlist',
        '-w',
        help='Comma-separated list of symbols (e.g., AAPL,MSFT,GOOGL)'
    )
    
    parser.add_argument(
        '--portfolio',
        action='store_true',
        help='Analyze as portfolio and show top 10 BUY/SELL recommendations'
    )
    
    parser.add_argument(
        '--portfolio-file',
        '-f',
        help='Read stock symbols from a file (one symbol per line)'
    )
    
    parser.add_argument(
        '--top-n',
        '-n',
        type=int,
        default=10,
        help='Number of top recommendations to show (default: 10)'
    )
    
    args = parser.parse_args()
    
    print_header()
    
    symbols = []
    
    if args.watchlist:
        symbols = [s.strip().upper() for s in args.watchlist.split(',')]
    elif args.symbols:
        symbols = [s.upper() for s in args.symbols]
    else:
        # Interactive mode
        print(f"{Fore.YELLOW}Enter stock symbol(s) separated by spaces (or comma-separated):{Style.RESET_ALL}")
        user_input = input("> ").strip()
        if ',' in user_input:
            symbols = [s.strip().upper() for s in user_input.split(',')]
        else:
            symbols = [s.upper() for s in user_input.split()]
    
    # Read from portfolio file if provided
    if args.portfolio_file:
        try:
            with open(args.portfolio_file, 'r') as f:
                file_symbols = [line.strip().upper() for line in f if line.strip() and not line.strip().startswith('#')]
                symbols.extend(file_symbols)
                print(f"{Fore.GREEN}Loaded {len(file_symbols)} symbols from {args.portfolio_file}{Style.RESET_ALL}")
        except FileNotFoundError:
            print(f"{Fore.RED}Error: Portfolio file '{args.portfolio_file}' not found.{Style.RESET_ALL}")
            sys.exit(1)
        except Exception as e:
            print(f"{Fore.RED}Error reading portfolio file: {e}{Style.RESET_ALL}")
            sys.exit(1)
    
    if not symbols:
        print(f"{Fore.RED}No symbols provided. Exiting.{Style.RESET_ALL}")
        sys.exit(1)
    
    # Remove duplicates while preserving order
    seen = set()
    symbols = [s for s in symbols if not (s in seen or seen.add(s))]
    
    # Determine analysis mode
    if args.portfolio or len(symbols) > 5:
        # Portfolio analysis mode
        analyze_portfolio(symbols, args.period, args.top_n)
    elif len(symbols) == 1:
        analyze_stock(symbols[0], args.period)
    else:
        analyze_multiple_stocks(symbols, args.period)
    
    print(f"\n{Fore.CYAN}{'='*60}")
    print(f"{Fore.CYAN}  Analysis Complete")
    print(f"{Fore.CYAN}{'='*60}{Style.RESET_ALL}\n")


if __name__ == "__main__":
    main()

