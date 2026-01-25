# 7H Stock Analyzer - JavaScript Implementation Specification

## Overview
A comprehensive stock analysis web application that provides AI-powered investment insights using technical analysis. The application features a modern, responsive UI with multiple analysis modes and advanced pattern recognition capabilities.

## Core Features

### 1. Multi-Page Application Structure
- **Portfolio Analysis** - Analyze user's portfolio stocks
- **Watchlist Analysis** - Track and analyze watchlist stocks  
- **Market Analysis** - Discover opportunities across US market
- **ETF/Index Analysis** - Analyze major ETFs and indexes
- **Import Portfolio** - Import from brokerage CSV files

### 2. Technical Analysis Engine
- **Primary Indicators**: RSI, MACD, SMA (20, 50, 200), EMA (12, 26)
- **Advanced Indicators**: Bollinger Bands, Stochastic Oscillator, ATR, OBV
- **Pattern Recognition**: VCP (Volatility Contraction Pattern), Divergence Analysis
- **Crossover Detection**: Enhanced with volume confirmation
- **Recommendation System**: BUY/SELL/HOLD with scoring (-10 to +10)

### 3. Advanced Pattern Analysis
- **VCP Patterns**: Strong/Weak volatility contraction detection
- **RSI Divergence**: Bullish/Bearish divergence with strength scoring
- **MACD Divergence**: Momentum-based divergence analysis
- **Enhanced Crossovers**: Multiple timeframe crossover detection
- **Breakout Setups**: Pattern-based breakout opportunities

## UI/UX Specification

### Layout Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Header Section                        │
│  📈 7H Stock Analyzer - AI-Powered Investment Insights │
├─────────────┬───────────────────────────────────────────┤
│   Sidebar   │            Main Content Area              │
│   Navigation│                                           │
│             │  ┌─────────────────────────────────────┐ │
│ 🏠 Portfolio│  │        Page-Specific Content        │ │
│ ⭐ Watchlist│  │                                     │ │
│ 📊 Market   │  │  • Forms for user input             │ │
│ 📈 ETFs     │  │  • Analysis results display          │ │
│ 📥 Import   │  │  • Tables and charts                │ │
│             │  │  • Interactive elements             │ │
│             │  └─────────────────────────────────────┘ │
│             │                                           │
│             │         Footer Section                   │
│         ⚠️ Disclaimer & Copyright Info                │
└─────────────┴───────────────────────────────────────────┘
```

### Design System

#### Color Palette
```css
:root {
    --primary: #2563eb;           /* Primary blue */
    --primary-dark: #1e40af;      /* Darker blue */
    --success: #10b981;            /* Green for positive */
    --danger: #ef4444;             /* Red for negative */
    --warning: #f59e0b;            /* Yellow for caution */
    --bg: #f8fafc;                 /* Light background */
    --card-bg: #ffffff;            /* White cards */
    --text: #1e293b;               /* Main text */
    --text-light: #64748b;         /* Secondary text */
    --border: #e2e8f0;             /* Borders */
    --shadow: rgba(0, 0, 0, 0.1);  /* Drop shadows */
}
```

#### Typography
- **Font Family**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Font Sizes**: 
  - Headers: 1.8rem (main), 1.5rem (section), 1.25rem (subsection)
  - Body: 0.85rem (base), 0.75rem (small), 0.65rem (tiny)
  - Forms: 0.9rem (labels), 0.9rem (inputs)

#### Component Styles
- **Cards**: Rounded corners (16px), drop shadows, white background
- **Buttons**: Pill-shaped, hover effects, transform animations
- **Tables**: Compact design, hover states, color-coded indicators
- **Forms**: Clean inputs with focus states, proper spacing
- **Loading**: Full-screen overlay with spinner

### Page-Specific Features

#### 1. Portfolio/Watchlist Pages
**Form Elements:**
- Textarea for stock symbols (auto-loaded from config)
- Select dropdown for time period (1mo to 5y)
- Number input for top N recommendations (1-50)
- Primary action button with hover effects

**Results Display:**
- Summary cards with key metrics (Total, Buy/Sell/Hold counts, Avg Score)
- Detailed results table with 15+ columns
- Pattern badges for advanced analysis
- Interactive rows with hover states
- Modal popups for detailed stock analysis

#### 2. Market/ETF Pages
**Simplified Form:**
- Time period selector (default 6mo)
- Top N recommendations input (1-20)
- Auto-analysis on page load

**Results Display:**
- BUY recommendations only (filtered by score)
- Market-wide analysis summary
- Failed symbols handling with error messages

#### 3. Import Portfolio Page
**Upload Form:**
- File input with drag-and-drop styling
- Brokerage selector (Auto-detect, Robinhood, E-Trade, etc.)
- Checkboxes for storage options
- Import button with validation

**Results Display:**
- Import summary with portfolio statistics
- Individual holding cards with P&L information
- Success/error messaging
- Storage confirmation

### Data Tables Specification

#### Portfolio Results Table
**Columns:**
1. **Rank** - Sequential numbering (1-N)
2. **Symbol** - Stock ticker with company tooltip
3. **Price** - Current price with 2 decimal places
4. **1D %** - 1-day change percentage
5. **1W %** - 1-week change percentage  
6. **1M %** - 1-month change percentage
7. **6M %** - 6-month change percentage
8. **1Y %** - 1-year change percentage
9. **RSI** - Relative Strength Index value
10. **VCP** - Volatility Contraction Pattern badge
11. **RSI Div** - RSI Divergence indicator
12. **MACD Div** - MACD Divergence indicator
13. **Cross** - Enhanced Crossover status
14. **Breakout** - Breakout Setup indicator
15. **Recommendation** - BUY/SELL/HOLD badge
16. **Score** - Numerical score (-10 to +10)

**Table Features:**
- Responsive design with horizontal scroll
- Hover effects on rows (subtle background change, slight translate)
- Color-coded recommendations (green/red/yellow)
- Compact column widths for data density
- Pattern badges with tooltips
- Click-to-view detailed analysis modal

### Pattern Badge System

#### Badge Types
- **VCP Pattern**: Green gradient (Strong), Orange gradient (Weak)
- **RSI Divergence**: Green up arrow (Bullish), Red down arrow (Bearish)
- **MACD Divergence**: Same as RSI but for MACD
- **Crossovers**: Green checkmark (Confirmed), Orange circle (Unconfirmed)
- **Breakout**: Pattern-specific indicators

#### Badge Styling
```css
.pattern-badge {
    display: inline-block;
    padding: 1px 4px;
    border-radius: 8px;
    font-size: 9px;
    font-weight: 600;
    text-align: center;
    min-width: 18px;
    cursor: help;
    transition: all 0.2s ease;
    line-height: 1.2;
}
```

### Modal System

#### Stock Detail Modal
**Layout:**
- Full-screen overlay with blur effect
- Centered modal with rounded corners
- Header with stock symbol and close button
- Scrollable content area

**Content Sections:**
1. **Basic Information**
   - Company name, current price, changes
   - Recommendation badge and score
   - Key technical indicators

2. **Advanced Pattern Analysis**
   - VCP Pattern card with strength indicators
   - RSI Divergence analysis with explanations
   - MACD Divergence analysis
   - Enhanced Crossovers with volume confirmation
   - Breakout Setup details

3. **Technical Indicators Grid**
   - RSI, MACD, Moving Averages
   - Bollinger Bands, Stochastic
   - ATR, OBV values

### Responsive Design

#### Desktop (>768px)
- Sidebar: 160px width with full text labels
- Main content: Max-width 1200px, centered
- Tables: Full column display with hover effects
- Modals: Max-width 1200px

#### Mobile (≤768px)
- Sidebar: 60px width, icon-only navigation
- Tables: Compact design, reduced font sizes
- Forms: Single column layout
- Modals: Full-width with reduced padding

### Interactive Elements

#### Loading States
- Full-screen overlay with spinner
- Contextual loading messages
- Smooth fade-in animations

#### Error Handling
- User-friendly error messages
- Form validation feedback
- API error display with suggestions

#### Animations
- Button hover effects (translateY, shadow)
- Table row hover states
- Modal fade-in/out
- Card hover effects

## API Integration

### Endpoints
- `POST /analyze_portfolio` - Portfolio analysis
- `POST /analyze_market` - Market analysis  
- `POST /analyze_etf` - ETF analysis
- `POST /api/import_portfolio` - Portfolio import
- `GET /api/config_stocks` - Load configuration
- `GET /api/portfolio_summary` - Portfolio summary

### Response Format
```javascript
{
  "success": true,
  "buy_stocks": [...],
  "sell_stocks": [...],
  "hold_stocks": [...],
  "summary": {
    "total": 10,
    "buy_count": 4,
    "sell_count": 2,
    "hold_count": 4,
    "avg_score": 2.5
  },
  "failed_symbols": []
}
```

## Implementation Priority

### Phase 1: Core Functionality
1. Basic layout and navigation
2. Portfolio analysis page
3. Results table display
4. Form handling and validation

### Phase 2: Advanced Features
1. Pattern badge system
2. Modal detail views
3. Import portfolio functionality
4. Market/ETF analysis pages

### Phase 3: Polish & Optimization
1. Responsive design refinement
2. Animation and transitions
3. Error handling improvements
4. Performance optimization