import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon'; // Assuming Icon component is created

const CandlestickPatterns = () => {
  const [patterns, setPatterns] = useState(() => ({
    bullish: [
      {
        id: 'hammer',
        name: 'Hammer',
        type: 'Bullish Reversal',
        reliability: 'High',
        description: 'A single candlestick pattern with a small body at the top and a long lower shadow (at least twice the body length). Indicates potential reversal from downtrend.',
        signals: [
          'Small real body at upper end of range',
          'Long lower shadow (2-3x body length)',
          'Little or no upper shadow',
          'Appears after a downtrend',
        ],
        tradingStrategy: 'Enter long position after confirmation candle closes above hammer high. Stop loss below hammer low. Target previous resistance levels.',
      },
      {
        id: 'inverted-hammer',
        name: 'Inverted Hammer',
        type: 'Bullish Reversal',
        reliability: 'Medium-High',
        description: 'A single candlestick with a small body at the bottom and a long upper shadow. Signals potential reversal when found at the bottom of a downtrend.',
        signals: [
          'Small real body at lower end of range',
          'Long upper shadow (2-3x body length)',
          'Little or no lower shadow',
          'Requires bullish confirmation',
        ],
        tradingStrategy: 'Wait for bullish confirmation candle. Enter long when next candle closes above inverted hammer high. Stop loss below the low.',
      },
      {
        id: 'bullish-engulfing',
        name: 'Bullish Engulfing',
        type: 'Bullish Reversal',
        reliability: 'High',
        description: 'A two-candle pattern where a large bullish candle completely engulfs the previous bearish candle. Strong reversal signal.',
        signals: [
          'First candle is bearish',
          'Second candle is bullish and larger',
          'Second candle body engulfs first',
          'Appears after downtrend',
        ],
        tradingStrategy: 'Enter long after engulfing candle closes. Stop loss below the low of the pattern. Target equals pattern height projected upward.',
      },
      {
        id: 'morning-star',
        name: 'Morning Star',
        type: 'Bullish Reversal',
        reliability: 'High',
        description: 'A three-candle pattern signaling the end of a downtrend. Consists of a bearish candle, a small-bodied candle, and a bullish candle.',
        signals: [
          'First candle: Long bearish',
          'Second candle: Small body (star)',
          'Third candle: Long bullish',
          'Third closes above first midpoint',
        ],
        tradingStrategy: 'Enter long after third candle confirms. Stop loss below star candle low. Target previous resistance or measured move.',
      },
      {
        id: 'piercing-line',
        name: 'Piercing Line',
        type: 'Bullish Reversal',
        reliability: 'Medium-High',
        description: 'A two-candle pattern where a bullish candle opens below the previous bearish close and closes above its midpoint.',
        signals: [
          'First candle is bearish',
          'Second opens below first close',
          'Second closes above first midpoint',
          'Strong buying pressure',
        ],
        tradingStrategy: 'Enter long after pattern completes. Stop loss below second candle low. Target previous swing high.',
      },
      {
        id: 'three-white-soldiers',
        name: 'Three White Soldiers',
        type: 'Bullish Reversal',
        reliability: 'High',
        description: 'Three consecutive long bullish candles with higher closes, indicating strong buying momentum.',
        signals: [
          'Three consecutive bullish candles',
          'Each opens within previous body',
          'Each closes near its high',
          'Progressive upward movement',
        ],
        tradingStrategy: 'Enter on pullback after pattern. Stop loss below first candle low. Watch for overbought conditions.',
      },
      {
        id: 'bullish-harami',
        name: 'Bullish Harami',
        type: 'Bullish Reversal',
        reliability: 'Medium',
        description: 'A two-candle pattern where a small bullish candle is contained within the previous large bearish candle.',
        signals: [
          'First candle is large bearish',
          'Second candle is small bullish',
          'Second contained within first',
          'Indicates trend exhaustion',
        ],
        tradingStrategy: 'Wait for confirmation. Enter long when price breaks above pattern high. Stop loss below pattern low.',
      },
      {
        id: 'tweezer-bottom',
        name: 'Tweezer Bottom',
        type: 'Bullish Reversal',
        reliability: 'Medium',
        description: 'Two or more candles with matching lows, indicating strong support and potential reversal.',
        signals: [
          'Two consecutive candles',
          'Matching or near-matching lows',
          'First candle bearish, second bullish',
          'Shows support level',
        ],
        tradingStrategy: 'Enter after bullish confirmation. Stop loss below tweezer lows. Target previous resistance.',
      },
    ],
    bearish: [
      {
        id: 'shooting-star',
        name: 'Shooting Star',
        type: 'Bearish Reversal',
        reliability: 'High',
        description: 'A single candlestick with a small body at the bottom and a long upper shadow. Indicates potential reversal from uptrend.',
        signals: [
          'Small real body at lower end',
          'Long upper shadow (2-3x body)',
          'Little or no lower shadow',
          'Appears after uptrend',
        ],
        tradingStrategy: 'Enter short after confirmation candle closes below shooting star low. Stop loss above high. Target support levels.',
      },
      {
        id: 'hanging-man',
        name: 'Hanging Man',
        type: 'Bearish Reversal',
        reliability: 'Medium-High',
        description: 'Similar to hammer but appears at top of uptrend. Small body at top with long lower shadow signals potential reversal.',
        signals: [
          'Small body at upper range',
          'Long lower shadow',
          'Appears after uptrend',
          'Requires bearish confirmation',
        ],
        tradingStrategy: 'Wait for bearish confirmation. Enter short when next candle closes below hanging man low. Stop loss above high.',
      },
      {
        id: 'bearish-engulfing',
        name: 'Bearish Engulfing',
        type: 'Bearish Reversal',
        reliability: 'High',
        description: 'A two-candle pattern where a large bearish candle completely engulfs the previous bullish candle.',
        signals: [
          'First candle is bullish',
          'Second candle is bearish and larger',
          'Second body engulfs first',
          'Appears after uptrend',
        ],
        tradingStrategy: 'Enter short after engulfing candle closes. Stop loss above pattern high. Target equals pattern height projected down.',
      },
      {
        id: 'evening-star',
        name: 'Evening Star',
        type: 'Bearish Reversal',
        reliability: 'High',
        description: 'A three-candle pattern signaling the end of an uptrend. Consists of a bullish candle, a small-bodied candle, and a bearish candle.',
        signals: [
          'First candle: Long bullish',
          'Second candle: Small body (star)',
          'Third candle: Long bearish',
          'Third closes below first midpoint',
        ],
        tradingStrategy: 'Enter short after third candle confirms. Stop loss above star candle high. Target previous support levels.',
      },
      {
        id: 'dark-cloud-cover',
        name: 'Dark Cloud Cover',
        type: 'Bearish Reversal',
        reliability: 'Medium-High',
        description: 'A two-candle pattern where a bearish candle opens above the previous bullish close and closes below its midpoint.',
        signals: [
          'First candle is bullish',
          'Second opens above first close',
          'Second closes below first midpoint',
          'Strong selling pressure',
        ],
        tradingStrategy: 'Enter short after pattern completes. Stop loss above second candle high. Target previous swing low.',
      },
      {
        id: 'three-black-crows',
        name: 'Three Black Crows',
        type: 'Bearish Reversal',
        reliability: 'High',
        description: 'Three consecutive long bearish candles with lower closes, indicating strong selling momentum.',
        signals: [
          'Three consecutive bearish candles',
          'Each opens within previous body',
          'Each closes near its low',
          'Progressive downward movement',
        ],
        tradingStrategy: 'Enter on bounce after pattern. Stop loss above first candle high. Watch for oversold conditions.',
      },
      {
        id: 'bearish-harami',
        name: 'Bearish Harami',
        type: 'Bearish Reversal',
        reliability: 'Medium',
        description: 'A two-candle pattern where a small bearish candle is contained within the previous large bullish candle.',
        signals: [
          'First candle is large bullish',
          'Second candle is small bearish',
          'Second contained within first',
          'Indicates trend exhaustion',
        ],
        tradingStrategy: 'Wait for confirmation. Enter short when price breaks below pattern low. Stop loss above pattern high.',
      },
      {
        id: 'tweezer-top',
        name: 'Tweezer Top',
        type: 'Bearish Reversal',
        reliability: 'Medium',
        description: 'Two or more candles with matching highs, indicating strong resistance and potential reversal.',
        signals: [
          'Two consecutive candles',
          'Matching or near-matching highs',
          'First candle bullish, second bearish',
          'Shows resistance level',
        ],
        tradingStrategy: 'Enter after bearish confirmation. Stop loss above tweezer highs. Target previous support.',
      },
    ],
    continuation: [
      {
        id: 'rising-three-methods',
        name: 'Rising Three Methods',
        type: 'Bullish Continuation',
        reliability: 'Medium-High',
        description: 'A five-candle pattern showing a brief consolidation within an uptrend before continuation.',
        signals: [
          'Long bullish candle',
          'Three small bearish candles',
          'Fifth candle long bullish',
          'Consolidation within first candle range',
        ],
        tradingStrategy: 'Enter long on fifth candle close. Stop loss below consolidation low. Target measured move from first candle.',
      },
      {
        id: 'falling-three-methods',
        name: 'Falling Three Methods',
        type: 'Bearish Continuation',
        reliability: 'Medium-High',
        description: 'A five-candle pattern showing a brief consolidation within a downtrend before continuation.',
        signals: [
          'Long bearish candle',
          'Three small bullish candles',
          'Fifth candle long bearish',
          'Consolidation within first candle range',
        ],
        tradingStrategy: 'Enter short on fifth candle close. Stop loss above consolidation high. Target measured move from first candle.',
      },
      {
        id: 'upside-tasuki-gap',
        name: 'Upside Tasuki Gap',
        type: 'Bullish Continuation',
        reliability: 'Medium',
        description: 'A three-candle pattern with a gap up followed by a bearish candle that closes within the gap.',
        signals: [
          'Two bullish candles with gap',
          'Third candle bearish',
          'Third closes within gap',
          'Uptrend continuation signal',
        ],
        tradingStrategy: 'Enter long after pattern completes. Stop loss below third candle low. Target continuation of uptrend.',
      },
      {
        id: 'downside-tasuki-gap',
        name: 'Downside Tasuki Gap',
        type: 'Bearish Continuation',
        reliability: 'Medium',
        description: 'A three-candle pattern with a gap down followed by a bullish candle that closes within the gap.',
        signals: [
          'Two bearish candles with gap',
          'Third candle bullish',
          'Third closes within gap',
          'Downtrend continuation signal',
        ],
        tradingStrategy: 'Enter short after pattern completes. Stop loss above third candle high. Target continuation of downtrend.',
      },
    ],
    neutral: [
      {
        id: 'doji',
        name: 'Doji',
        type: 'Neutral/Reversal',
        reliability: 'Medium',
        description: 'A single candle where open and close are virtually equal, indicating indecision in the market.',
        signals: [
          'Open equals close (or very close)',
          'Can have upper and lower shadows',
          'Indicates market indecision',
          'Context determines direction',
        ],
        tradingStrategy: 'Wait for confirmation candle. Trade in direction of confirmation. Stop loss beyond doji range.',
      },
      {
        id: 'spinning-top',
        name: 'Spinning Top',
        type: 'Neutral',
        reliability: 'Low-Medium',
        description: 'A candle with a small body and long shadows on both sides, showing indecision and potential reversal.',
        signals: [
          'Small real body',
          'Long upper and lower shadows',
          'Shows indecision',
          'Can signal trend change',
        ],
        tradingStrategy: 'Wait for directional confirmation. Trade breakout direction. Use tight stops.',
      },
      {
        id: 'high-wave',
        name: 'High Wave',
        type: 'Neutral',
        reliability: 'Medium',
        description: 'Similar to spinning top but with extremely long shadows, indicating high volatility and uncertainty.',
        signals: [
          'Very small body',
          'Extremely long shadows',
          'High volatility',
          'Major indecision',
        ],
        tradingStrategy: 'Avoid trading until clear direction emerges. Wait for strong confirmation candle.',
      },
    ],
  }));

  const [activeFilter, setActiveFilter] = useState('all');

  const generateHammerSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="40" width="20" height="15" fill="#10b981" opacity="0.9" />
      <line x1="50" y1="55" x2="50" y2="130" stroke="#10b981" strokeWidth="3" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Hammer</text>
    </svg>
  );

  const generateInvertedHammerSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="95" width="20" height="15" fill="#10b981" opacity="0.9" />
      <line x1="50" y1="20" x2="50" y2="95" stroke="#10b981" strokeWidth="3" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Inv. Hammer</text>
    </svg>
  );

  const generateBullishEngulfingSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="60" width="15" height="30" fill="#ef4444" opacity="0.9" />
      <line x1="32.5" y1="50" x2="32.5" y2="100" stroke="#ef4444" strokeWidth="2" />
      <rect x="60" y="40" width="15" height="60" fill="#10b981" opacity="0.9" />
      <line x1="67.5" y1="30" x2="67.5" y2="110" stroke="#10b981" strokeWidth="2" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Bull Engulf</text>
    </svg>
  );

  const generateMorningStarSVG = () => (
    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="40" width="20" height="50" fill="#ef4444" opacity="0.9" />
      <line x1="30" y1="30" x2="30" y2="100" stroke="#ef4444" strokeWidth="2" />
      <rect x="65" y="75" width="20" height="15" fill="#94a3b8" opacity="0.9" />
      <line x1="75" y1="65" x2="75" y2="100" stroke="#94a3b8" strokeWidth="2" />
      <rect x="110" y="40" width="20" height="50" fill="#10b981" opacity="0.9" />
      <line x1="120" y1="30" x2="120" y2="100" stroke="#10b981" strokeWidth="2" />
      <text x="75" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Morning Star</text>
    </svg>
  );

  const generatePiercingLineSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="40" width="15" height="50" fill="#ef4444" opacity="0.9" />
      <line x1="32.5" y1="30" x2="32.5" y2="100" stroke="#ef4444" strokeWidth="2" />
      <rect x="60" y="55" width="15" height="45" fill="#10b981" opacity="0.9" />
      <line x1="67.5" y1="45" x2="67.5" y2="110" stroke="#10b981" strokeWidth="2" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Piercing</text>
    </svg>
  );

  const generateThreeWhiteSoldiersSVG = () => (
    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="70" width="20" height="40" fill="#10b981" opacity="0.9" />
      <line x1="25" y1="60" x2="25" y2="115" stroke="#10b981" strokeWidth="2" />
      <rect x="55" y="50" width="20" height="40" fill="#10b981" opacity="0.9" />
      <line x1="65" y1="40" x2="65" y2="95" stroke="#10b981" strokeWidth="2" />
      <rect x="95" y="30" width="20" height="40" fill="#10b981" opacity="0.9" />
      <line x1="105" y1="20" x2="105" y2="75" stroke="#10b981" strokeWidth="2" />
      <text x="75" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">3 White Soldiers</text>
    </svg>
  );

  const generateBullishHaramiSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="20" height="70" fill="#ef4444" opacity="0.9" />
      <line x1="40" y1="20" x2="40" y2="110" stroke="#ef4444" strokeWidth="2" />
      <rect x="55" y="60" width="15" height="20" fill="#10b981" opacity="0.9" />
      <line x1="62.5" y1="50" x2="62.5" y2="85" stroke="#10b981" strokeWidth="2" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Bull Harami</text>
    </svg>
  );

  const generateTweezerBottomSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="50" width="15" height="50" fill="#ef4444" opacity="0.9" />
      <line x1="32.5" y1="40" x2="32.5" y2="110" stroke="#ef4444" strokeWidth="2" />
      <rect x="60" y="60" width="15" height="40" fill="#10b981" opacity="0.9" />
      <line x1="67.5" y1="50" x2="67.5" y2="110" stroke="#10b981" strokeWidth="2" />
      <line x1="20" y1="110" x2="80" y2="110" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Tweezer Bot</text>
    </svg>
  );

  const generateShootingStarSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="95" width="20" height="15" fill="#ef4444" opacity="0.9" />
      <line x1="50" y1="20" x2="50" y2="95" stroke="#ef4444" strokeWidth="3" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Shooting Star</text>
    </svg>
  );

  const generateHangingManSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="40" width="20" height="15" fill="#ef4444" opacity="0.9" />
      <line x1="50" y1="55" x2="50" y2="130" stroke="#ef4444" strokeWidth="3" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Hanging Man</text>
    </svg>
  );

  const generateBearishEngulfingSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="60" width="15" height="30" fill="#10b981" opacity="0.9" />
      <line x1="32.5" y1="50" x2="32.5" y2="100" stroke="#10b981" strokeWidth="2" />
      <rect x="60" y="40" width="15" height="60" fill="#ef4444" opacity="0.9" />
      <line x1="67.5" y1="30" x2="67.5" y2="110" stroke="#ef4444" strokeWidth="2" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Bear Engulf</text>
    </svg>
  );

  const generateEveningStarSVG = () => (
    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="50" width="20" height="50" fill="#10b981" opacity="0.9" />
      <line x1="30" y1="40" x2="30" y2="110" stroke="#10b981" strokeWidth="2" />
      <rect x="65" y="35" width="20" height="15" fill="#94a3b8" opacity="0.9" />
      <line x1="75" y1="25" x2="75" y2="60" stroke="#94a3b8" strokeWidth="2" />
      <rect x="110" y="50" width="20" height="50" fill="#ef4444" opacity="0.9" />
      <line x1="120" y1="40" x2="120" y2="110" stroke="#ef4444" strokeWidth="2" />
      <text x="75" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Evening Star</text>
    </svg>
  );

  const generateDarkCloudCoverSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="60" width="15" height="50" fill="#10b981" opacity="0.9" />
      <line x1="32.5" y1="50" x2="32.5" y2="120" stroke="#10b981" strokeWidth="2" />
      <rect x="60" y="45" width="15" height="45" fill="#ef4444" opacity="0.9" />
      <line x1="67.5" y1="35" x2="67.5" y2="100" stroke="#ef4444" strokeWidth="2" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Dark Cloud</text>
    </svg>
  );

  const generateThreeBlackCrowsSVG = () => (
    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="30" width="20" height="40" fill="#ef4444" opacity="0.9" />
      <line x1="25" y1="20" x2="25" y2="75" stroke="#ef4444" strokeWidth="2" />
      <rect x="55" y="50" width="20" height="40" fill="#ef4444" opacity="0.9" />
      <line x1="65" y1="40" x2="65" y2="95" stroke="#ef4444" strokeWidth="2" />
      <rect x="95" y="70" width="20" height="40" fill="#ef4444" opacity="0.9" />
      <line x1="105" y1="60" x2="105" y2="115" stroke="#ef4444" strokeWidth="2" />
      <text x="75" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">3 Black Crows</text>
    </svg>
  );

  const generateBearishHaramiSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="20" height="70" fill="#10b981" opacity="0.9" />
      <line x1="40" y1="20" x2="40" y2="110" stroke="#10b981" strokeWidth="2" />
      <rect x="55" y="60" width="15" height="20" fill="#ef4444" opacity="0.9" />
      <line x1="62.5" y1="50" x2="62.5" y2="85" stroke="#ef4444" strokeWidth="2" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Bear Harami</text>
    </svg>
  );

  const generateTweezerTopSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="60" width="15" height="40" fill="#10b981" opacity="0.9" />
      <line x1="32.5" y1="40" x2="32.5" y2="110" stroke="#10b981" strokeWidth="2" />
      <rect x="60" y="50" width="15" height="50" fill="#ef4444" opacity="0.9" />
      <line x1="67.5" y1="40" x2="67.5" y2="110" stroke="#ef4444" strokeWidth="2" />
      <line x1="20" y1="40" x2="80" y2="40" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Tweezer Top</text>
    </svg>
  );

  const generateRisingThreeMethodsSVG = () => (
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="50" width="20" height="60" fill="#10b981" opacity="0.9" />
      <line x1="30" y1="40" x2="30" y2="120" stroke="#10b981" strokeWidth="2" />
      <rect x="60" y="75" width="15" height="20" fill="#ef4444" opacity="0.8" />
      <rect x="90" y="70" width="15" height="25" fill="#ef4444" opacity="0.8" />
      <rect x="120" y="72" width="15" height="23" fill="#ef4444" opacity="0.8" />
      <rect x="155" y="45" width="20" height="65" fill="#10b981" opacity="0.9" />
      <line x1="165" y1="35" x2="165" y2="120" stroke="#10b981" strokeWidth="2" />
      <text x="100" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Rising 3 Methods</text>
    </svg>
  );

  const generateFallingThreeMethodsSVG = () => (
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="20" height="60" fill="#ef4444" opacity="0.9" />
      <line x1="30" y1="20" x2="30" y2="100" stroke="#ef4444" strokeWidth="2" />
      <rect x="60" y="55" width="15" height="20" fill="#10b981" opacity="0.8" />
      <rect x="90" y="50" width="15" height="25" fill="#10b981" opacity="0.8" />
      <rect x="120" y="52" width="15" height="23" fill="#10b981" opacity="0.8" />
      <rect x="155" y="40" width="20" height="65" fill="#ef4444" opacity="0.9" />
      <line x1="165" y1="30" x2="165" y2="115" stroke="#ef4444" strokeWidth="2" />
      <text x="100" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Falling 3 Methods</text>
    </svg>
  );

  const generateUpsideTasukiGapSVG = () => (
    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="70" width="20" height="40" fill="#10b981" opacity="0.9" />
      <line x1="30" y1="60" x2="30" y2="115" stroke="#10b981" strokeWidth="2" />
      <rect x="65" y="40" width="20" height="35" fill="#10b981" opacity="0.9" />
      <line x1="75" y1="30" x2="75" y2="80" stroke="#10b981" strokeWidth="2" />
      <rect x="110" y="55" width="20" height="30" fill="#ef4444" opacity="0.9" />
      <line x1="120" y1="45" x2="120" y2="90" stroke="#ef4444" strokeWidth="2" />
      <text x="75" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Upside Tasuki</text>
    </svg>
  );

  const generateDownsideTasukiGapSVG = () => (
    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="20" height="40" fill="#ef4444" opacity="0.9" />
      <line x1="30" y1="20" x2="30" y2="75" stroke="#ef4444" strokeWidth="2" />
      <rect x="65" y="60" width="20" height="35" fill="#ef4444" opacity="0.9" />
      <line x1="75" y1="50" x2="75" y2="100" stroke="#ef4444" strokeWidth="2" />
      <rect x="110" y="50" width="20" height="30" fill="#10b981" opacity="0.9" />
      <line x1="120" y1="40" x2="120" y2="85" stroke="#10b981" strokeWidth="2" />
      <text x="75" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Downside Tasuki</text>
    </svg>
  );

  const generateDojiSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="30" x2="50" y2="110" stroke="#94a3b8" strokeWidth="3" />
      <line x1="45" y1="70" x2="55" y2="70" stroke="#94a3b8" strokeWidth="4" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Doji</text>
    </svg>
  );

  const generateSpinningTopSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="42" y="65" width="16" height="20" fill="#3b82f6" opacity="0.9" />
      <line x1="50" y1="30" x2="50" y2="110" stroke="#3b82f6" strokeWidth="3" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">Spinning Top</text>
    </svg>
  );

  const generateHighWaveSVG = () => (
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="44" y="68" width="12" height="14" fill="#3b82f6" opacity="0.9" />
      <line x1="50" y1="20" x2="50" y2="120" stroke="#3b82f6" strokeWidth="3" />
      <text x="50" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">High Wave</text>
    </svg>
  );

  const getPatternSVG = (id) => {
    switch (id) {
      case 'hammer': return generateHammerSVG();
      case 'inverted-hammer': return generateInvertedHammerSVG();
      case 'bullish-engulfing': return generateBullishEngulfingSVG();
      case 'morning-star': return generateMorningStarSVG();
      case 'piercing-line': return generatePiercingLineSVG();
      case 'three-white-soldiers': return generateThreeWhiteSoldiersSVG();
      case 'bullish-harami': return generateBullishHaramiSVG();
      case 'tweezer-bottom': return generateTweezerBottomSVG();
      case 'shooting-star': return generateShootingStarSVG();
      case 'hanging-man': return generateHangingManSVG();
      case 'bearish-engulfing': return generateBearishEngulfingSVG();
      case 'evening-star': return generateEveningStarSVG();
      case 'dark-cloud-cover': return generateDarkCloudCoverSVG();
      case 'three-black-crows': return generateThreeBlackCrowsSVG();
      case 'bearish-harami': return generateBearishHaramiSVG();
      case 'tweezer-top': return generateTweezerTopSVG();
      case 'rising-three-methods': return generateRisingThreeMethodsSVG();
      case 'falling-three-methods': return generateFallingThreeMethodsSVG();
      case 'upside-tasuki-gap': return generateUpsideTasukiGapSVG();
      case 'downside-tasuki-gap': return generateDownsideTasukiGapSVG();
      case 'doji': return generateDojiSVG();
      case 'spinning-top': return generateSpinningTopSVG();
      case 'high-wave': return generateHighWaveSVG();
      default: return null;
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const generatePatternCard = (pattern, category) => {
    const categoryClass = category === 'bullish' ? 'text-green-600 dark:text-green-400' :
      category === 'bearish' ? 'text-red-600 dark:text-red-400' :
        category === 'continuation' ? 'text-blue-600 dark:text-blue-400' : 'text-yellow-600 dark:text-yellow-400';

    const reliabilityColor = pattern.reliability === 'High' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
      pattern.reliability === 'Medium-High' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
        pattern.reliability === 'Medium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'; // Defaulting to warning

    return (
      <div className="pattern-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" data-pattern-id={pattern.id}>
        <div className="pattern-visual flex justify-center items-center h-40 bg-gray-50 dark:bg-gray-700 rounded-md mb-4">
          {getPatternSVG(pattern.id)}
        </div>
        <div className="pattern-info">
          <div className="pattern-header flex justify-between items-center mb-2">
            <h4 className="pattern-name text-xl font-semibold text-gray-900 dark:text-white">{pattern.name}</h4>
            <span className={`pattern-badge text-xs font-medium px-2.5 py-0.5 rounded ${categoryClass}`}>{pattern.type}</span>
          </div>
          <div className="pattern-reliability flex items-center mb-3">
            <span className="reliability-label text-sm text-gray-600 dark:text-gray-400 mr-2">Reliability:</span>
            <span className={`reliability-value text-xs font-medium px-2 py-0.5 rounded-full ${reliabilityColor}`}>{pattern.reliability}</span>
          </div>
          <p className="pattern-description text-gray-700 dark:text-gray-300 mb-4">{pattern.description}</p>
          <div className="pattern-details space-y-3">
            <h5 className="text-md font-semibold text-gray-800 dark:text-gray-200">Key Signals:</h5>
            <ul className="pattern-signals list-disc list-inside text-gray-700 dark:text-gray-300 ml-4 space-y-1">
              {pattern.signals.map((signal, idx) => (
                <li key={idx}>{signal}</li>
              ))}
            </ul>
            <h5 className="text-md font-semibold text-gray-800 dark:text-gray-200 mt-4">Trading Strategy:</h5>
            <p className="pattern-strategy text-gray-700 dark:text-gray-300">{pattern.tradingStrategy}</p>
          </div>
        </div>
      </div>
    );
  };

  const generatePatternSection = (category, title, description) => {
    const categoryPatterns = patterns[category];
    const categoryClass = category === 'bullish' ? 'text-green-600 dark:text-green-400' :
      category === 'bearish' ? 'text-red-600 dark:text-red-400' :
        category === 'continuation' ? 'text-blue-600 dark:text-blue-400' : 'text-yellow-600 dark:text-yellow-400';

    const isVisible = activeFilter === 'all' || activeFilter === category;

    return (
      <div className={`pattern-section ${isVisible ? 'block' : 'hidden'} mb-12`} data-category={category}>
        <div className="section-header text-center mb-8">
          <h3 className={`section-title text-3xl font-bold mb-3 ${categoryClass}`}>{title}</h3>
          <p className="section-description text-lg text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <div className="patterns-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryPatterns.map((pattern) => (
            <React.Fragment key={pattern.id}>{generatePatternCard(pattern, category)}</React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const generateCandlestickPatternsContent = () => {
    return (
      <div className="candlestick-patterns-page container mx-auto px-4 py-8">
        <div className="page-header text-center mb-12">
          <div className="header-content-wrapper flex flex-col items-center">
            <div className="header-icon-wrapper text-blue-600 dark:text-blue-400 mb-4">
              <Icon iconName="candlestick-chart" className="w-16 h-16" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Candlestick Patterns</h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">Master candlestick patterns to identify price action signals and market sentiment</p>
            </div>
          </div>
        </div>

        <div className="patterns-filter flex flex-wrap justify-center gap-4 mb-12">
          <button
            className={`filter-btn flex items-center px-6 py-3 rounded-full text-lg font-medium transition duration-300
              ${activeFilter === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
            onClick={() => handleFilterClick('all')}
          >
            <Icon iconName="layout-grid" className="mr-2" />
            All Patterns
          </button>
          <button
            className={`filter-btn flex items-center px-6 py-3 rounded-full text-lg font-medium transition duration-300
              ${activeFilter === 'bullish' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
            onClick={() => handleFilterClick('bullish')}
          >
            <Icon iconName="trending-up" className="mr-2" />
            Bullish
          </button>
          <button
            className={`filter-btn flex items-center px-6 py-3 rounded-full text-lg font-medium transition duration-300
              ${activeFilter === 'bearish' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
            onClick={() => handleFilterClick('bearish')}
          >
            <Icon iconName="trending-down" className="mr-2" />
            Bearish
          </button>
          <button
            className={`filter-btn flex items-center px-6 py-3 rounded-full text-lg font-medium transition duration-300
              ${activeFilter === 'continuation' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
            onClick={() => handleFilterClick('continuation')}
          >
            <Icon iconName="arrow-right" className="mr-2" />
            Continuation
          </button>
          <button
            className={`filter-btn flex items-center px-6 py-3 rounded-full text-lg font-medium transition duration-300
              ${activeFilter === 'neutral' ? 'bg-gray-500 text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
            onClick={() => handleFilterClick('neutral')}
          >
            <Icon iconName="minus" className="mr-2" />
            Neutral
          </button>
        </div>

        {generatePatternSection('bullish', 'Bullish Candlestick Patterns', 'Patterns indicating potential upward price movement')}
        {generatePatternSection('bearish', 'Bearish Candlestick Patterns', 'Patterns indicating potential downward price movement')}
        {generatePatternSection('continuation', 'Continuation Patterns', 'Patterns indicating trend continuation')}
        {generatePatternSection('neutral', 'Neutral Patterns', 'Patterns indicating market indecision')}
      </div>
    );
  };

  return generateCandlestickPatternsContent();
};

export default CandlestickPatterns;
