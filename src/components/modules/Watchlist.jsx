import React, { useState, useEffect } from 'react';

const Watchlist = () => {
  const [symbols, setSymbols] = useState('');
  const [period, setPeriod] = useState('1y');
  const [topN, setTopN] = useState(5);

  useEffect(() => {
    // Load from session storage
    const stored = sessionStorage.getItem('watchlistSymbols');
    const defaultStocks = stored ? JSON.parse(stored) : ['AAPL', 'MSFT', 'GOOGL', 'TSLA'];
    setSymbols(defaultStocks.join(', '));
    
    setPeriod('1y');
    setTopN(5);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const symbolsArray = symbols.split(',').map(s => s.trim()).filter(s => s);
    sessionStorage.setItem('watchlistSymbols', JSON.stringify(symbolsArray));
    console.log('Watchlist analysis requested:', { symbols: symbolsArray, period, topN });
    const analysisData = await analyzeWatchlist(symbolsArray, period, topN);
    displayResults(analysisData);
  };

  const analyzeWatchlist = async (symbols, period, topN) => {
    return {
      symbols: symbols,
      period: period,
      topN: topN,
      analysis: 'Watchlist analysis results'
    };
  };

  const displayResults = (data) => {
    console.log('Watchlist analysis results:', data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="page-header text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Watchlist Analysis</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Track your watchlist stocks and get investment recommendations.</p>
      </div>
      
      <form id="watchlist-form" onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="controls-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="form-group md:col-span-2">
            <label htmlFor="symbols" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Watchlist Symbols:</label>
            <textarea
              id="symbols"
              rows="2"
              placeholder="Enter watchlist symbols..."
              value={symbols}
              onChange={(e) => setSymbols(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="period" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Period:</label>
            <select
              id="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="1mo">1 Month</option>
              <option value="3mo">3 Months</option>
              <option value="6mo">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="2y">2 Years</option>
              <option value="5y">5 Years</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="top_n" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Top N:</label>
            <select
              id="top_n"
              value={topN}
              onChange={(e) => setTopN(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="3">Top 3</option>
              <option value="5">Top 5</option>
              <option value="10">Top 10</option>
              <option value="15">Top 15</option>
              <option value="20">Top 20</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200">
          Analyze Watchlist
        </button>
      </form>
    </div>
  );
};

export default Watchlist;
