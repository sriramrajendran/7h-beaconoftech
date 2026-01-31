# 📈 BeaconOfTech - Personal Tech Insights Platform by Sriram Rajendran

![BeaconOfTech ](doc/readme.png)

A **personal, non-commercial platform** by **Sriram Rajendran** for sharing tech insights, innovation analysis, and educational content. This project serves as a personal branding platform and knowledge-sharing hub, featuring educational tech blogs, playbooks, projects, and learning resources - all running entirely on GitHub Pages.

## 👨‍💻 **About the Author**

**Sriram Rajendran** - Technology enthusiast and knowledge sharer. This platform represents my personal journey in exploring and documenting technology innovations, insights, and learning experiences.

## 🌐 **Live Platform**

**Personal Platform:** `https://sriramrajendran.github.io/7h-beaconoftech/`

## ✨ **Platform Features**

### **Educational Content**
- **Tech Insights Blog** - Personal articles on technology trends and innovations
- **Technical Playbooks** - Step-by-step guides and best practices
- **Project Showcases** - Personal projects and learning experiments
- **Knowledge Sharing** - Educational resources and research materials

### **Learning Resources**
- **Personal Blog** - Insights and reflections on technology
- **Educational Articles** - Research and analysis on tech trends
- **Project Documentation** - Learning journey and experiments
- **Knowledge Base** - Curated resources and references

### **Platform Purpose**
- **Personal Branding** - Establishing professional presence
- **Knowledge Sharing** - Educational content and insights
- **Learning Journey** - Documenting technology exploration
- **Community Engagement** - Connecting with fellow learners

### **User Experience**
- **Modern Responsive Design:** Clean interface with smooth animations
- **Educational Focus:** Content organized for learning and discovery
- **Personal Touch:** Reflects author's perspective and insights
- **Mobile Friendly:** Accessible on all devices

## 🚀 **Quick Start**

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/sriramrajendran/7h-beaconoftech.git
cd 7h-beaconoftech

# Kill any existing processes on ports 8000 and 8001
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
lsof -ti:8001 | xargs kill -9 2>/dev/null || true

# Serve locally (any static server)
python3 -m http.server 8000
# or
npx serve .

# Open http://localhost:8000
```

### **Running Tests**
```bash
# Kill any existing processes on port 8001
lsof -ti:8001 | xargs kill -9 2>/dev/null || true

# Serve test runner
python3 -m http.server 8001 --directory tests

# Open http://localhost:8001
# Click "Run All Tests" to verify functionality
```

## 📊 **How to Use the Platform**

### **Exploring Tech Insights**
1. Click **Tech Insights** in the sidebar
2. Browse personal articles on technology trends
3. Read detailed analysis and perspectives
4. Engage with educational content

### **Learning Resources**
1. Click **Playbooks** for step-by-step guides
2. Explore **Projects** for practical examples
3. Use **About** section to learn more about the author
4. Navigate through different educational sections

## 🎯 **Platform Purpose & Values**

### **Educational Mission**
- **Knowledge Sharing:** Providing insights and learning resources
- **Personal Growth:** Documenting technology journey and experiences
- **Community Building:** Connecting with fellow technology enthusiasts
- **Innovation Tracking:** Exploring emerging trends and developments

### **Non-Commercial Commitment**
- **Free Access:** All content available without charge
- **No Monetization:** No advertising, subscriptions, or paid services
- **Educational Focus:** Primary goal is learning and knowledge sharing
- **Personal Initiative:** Individual project, not a business venture

## 🌐 **Deployment Options**

### **Cloudflare Pages (Recommended)**
**Modern deployment with global CDN and free SSL:**

1. **Create Cloudflare Pages Project:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/pages)
   - Connect your GitHub repository
   - Select `7h-beaconoftech` repo
   - Build settings: Framework preset `None`, Build command empty, Output directory `/`

2. **Automatic Deployment:**
   ```bash
   git add .
   git commit -m "Deploy to Cloudflare Pages"
   git push origin main
   ```

3. **Live site:** Available at `https://7h-beaconoftech.pages.dev` or your custom domain

**Benefits:** Free SSL, global CDN, zero maintenance, automatic deployments

### **GitHub Pages (Legacy)**
**Original deployment method:**

1. **Push changes to main:**
   ```bash
   git add .
   git commit -m "Update GitHub Pages version"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` and `/ (root)`
   - Save

3. **Live site:** `https://sriramrajendran.github.io/7h-beaconoftech/`

**Note:** Consider migrating to Cloudflare Pages for better performance and features.

### **Local Development**
```bash
# Serve locally for testing
python3 -m http.server 8000
# Open http://localhost:8000
```

### **Configuration**
The application uses a centralized JSON configuration file:

**`input/config.json`** contains:
- **Stock lists** - Portfolio, watchlist, market, and ETF symbols
- **UI themes** - Colors, responsive breakpoints, animations
- **API settings** - Yahoo Finance endpoints, timeouts, retry logic
- **Analysis parameters** - Technical indicator periods, recommendation thresholds

### **Customizing Configuration**
Edit `input/config.json` to:
- Add/remove stock symbols
- Adjust analysis parameters
- Modify UI themes
- Change API settings

Example configuration section:
```json
{
  "portfolio": {
    "symbols": ["AAPL", "MSFT", "GOOGL"],
    "defaultPeriod": "1y",
    "defaultTopN": 5
  },
  "ui": {
    "theme": {
      "primary": "#667eea",
      "secondary": "#764ba2"
    }
  }
}
```

## 🧪 **Testing**

### **Unit Tests**
Comprehensive test suite for critical components:

```bash
# Open test runner in browser
python3 -m http.server 8000
# Navigate to http://localhost:8000/tests/test-runner.html
```

### **Test Coverage**
- ✅ **StockAnalyzer Class** - Core analysis engine, technical indicators, recommendations
- ✅ **PageManager Class** - Page management, form handling, symbol parsing  
- ✅ **Main GitHub App** - UI utilities, error handling, loading states
- ✅ **Integration Tests** - End-to-end workflows, API integration
- ✅ **Performance Tests** - Large dataset handling, response times

### **Running Tests**
1. **Browser Testing** - Open `tests/test-runner.html`
2. **Individual Test Suites** - Run specific component tests
3. **Continuous Integration** - Tests run automatically on GitHub Actions

### **Test Categories**
- **Unit Tests** - Individual function testing
- **Integration Tests** - Component interaction testing
- **Performance Tests** - Large dataset validation
- **Error Handling** - Edge cases and failure scenarios

## 📁 **Project Structure**

```
beaconoftech-stock-analysis/
├── index.html                 # Main entry point
├── assets/                    # Static assets
│   ├── css/
│   │   └── style.css         # Styling
│   └── js/
│       ├── stock-analyzer.js  # Core analysis engine
│       ├── pages.js           # Page management
│       └── main-github.js     # Main application logic
├── tests/                     # Test suite
│   ├── test-runner.html       # Browser test runner
│   ├── stock-analyzer.test.js # StockAnalyzer tests
│   ├── pages.test.js          # PageManager tests
│   ├── main-github.test.js    # Main app tests
│   └── README.md             # Test documentation
├── input/                     # Configuration files
│   └── config.json           # JSON configuration (stocks, themes, API settings)
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI/CD pipeline
├── doc/
│   ├── spec.md               # Project specifications
│   └── readme.png            # Branding image
├── .nojekyll                  # GitHub Pages optimization
└── README.md                 # This file
```

## ⚠️ **Important Legal Notice**

**Personal Platform Disclaimer:** This is a personal, non-commercial platform created and maintained by Sriram Rajendran for educational purposes and knowledge sharing only.

**Not Professional Advice:** All content provided on this platform is for educational and informational purposes only. No professional, financial, investment, or technical advice is provided. The content represents personal opinions and experiences.

**Non-Commercial Nature:** This platform is not a money-making organization. There are no paid services, advertisements, subscription fees, or commercial activities. All content is provided free of charge for educational purposes.

**Educational Purpose:** This platform serves as a personal branding and knowledge-sharing initiative. It is not affiliated with any commercial entity or professional service provider.

**No Liability:** The author is not responsible for any decisions made based on the content provided. Users should exercise their own judgment and consult appropriate professionals for specific needs.

**Data Sources:** Any data or information referenced is for educational purposes only and may not be real-time or accurate. Always verify information from official sources.

## 🚨 **Platform Limitations**

The following features are intentionally not available as this is a personal, non-commercial educational platform:
- ❌ **Commercial Services** - No paid features or premium content
- ❌ **Professional Advice** - No consulting or professional services
- ❌ **Automated Systems** - No alerts, notifications, or automated services
- ❌ **Data Storage** - No persistent user data or accounts
- ❌ **Support Services** - No formal customer support or SLA

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make changes to frontend code only
4. Test locally with `python3 -m http.server 8000`
5. Submit a pull request`

## 📞 **Connect & Learn**

- **GitHub Issues:** Report bugs or suggest educational content improvements
- **Documentation:** This README covers all platform information
- **Live Platform:** Visit the GitHub Pages site to explore educational content
- **Personal Connection:** Follow @rajen.sriram for updates and insights


---

## 📜 **Usage Terms**

This platform is provided as-is for educational and personal branding purposes. All content reflects personal opinions and experiences of Sriram Rajendran.

**🚀 Ready to explore technology insights and learn with BeaconOfTech?** Visit the personal platform or run locally to start your educational journey today!
