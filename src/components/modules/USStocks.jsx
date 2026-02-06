import React, { useState } from 'react';

const USStocks = () => {
  const [period, setPeriod] = useState('1y');
  const [topN, setTopN] = useState(10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('US Stocks analysis requested:', { period, topN });
    const analysisData = await analyzeUSStocks(period, topN);
    displayResults(analysisData);
  };

  const analyzeUSStocks = async (period, topN) => {
    return {
      period: period,
      topN: topN,
      analysis: 'US Stocks analysis results'
    };
  };

  const displayResults = (data) => {
    console.log('US Stocks analysis results:', data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="page-header text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">US Stocks Analysis</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Get top BUY recommendations from major US stocks with detailed technical analysis.</p>
      </div>
      
      <form id="us-stocks-form" onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="controls-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              <option value="5">Top 5</option>
              <option value="10">Top 10</option>
              <option value="15">Top 15</option>
              <option value="20">Top 20</option>
              <option value="30">Top 30</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200">
          Analyze US Stocks
        </button>
      </form>
    </div>
  );
};

export default USStocks;
