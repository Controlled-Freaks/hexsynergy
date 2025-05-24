# HexSynergy - Sustainable Digital Workspace Platform

![HexSynergy Logo](public/assets/logo_2.png)

## 🌱 Project Overview

**HexSynergy** is an innovative sustainability tracking and gamification platform developed for Hexaware Technologies. It transforms workplace energy consumption monitoring into an engaging, reward-based experience while driving real environmental impact through data-driven insights and behavioral change.

### 🎯 Mission Statement
*"Powering Tomorrow's Green Digital Workspace"* - HexSynergy empowers employees to actively participate in sustainability initiatives through real-time energy tracking, gamified rewards, and comprehensive environmental impact visualization.

---

## 🚀 Key Features

### 📊 **Real-Time Energy Monitoring**
- **Live Dashboard**: Track energy consumption across laptops, lighting, HVAC, and other devices
- **Building Analytics**: Monitor energy usage across multiple office locations (Chennai, Mumbai, Bengaluru, Hyderabad)
- **Department Comparison**: Compare energy efficiency between different teams and departments
- **Floor-wise Tracking**: Detailed energy consumption mapping for each floor and zone

### 🎮 **Gamification & Rewards System**
- **Awe Points**: Earn points for sustainable behaviors (dark mode usage, seating optimization, energy saving)
- **Leaderboards**: Department and individual rankings with real-time updates
- **Achievement System**: Unlock badges and milestones for consistent eco-friendly actions
- **Progress Tracking**: Visual progress indicators and goal setting

### 🏢 **Smart Building Integration**
- **Interactive Floor Maps**: Visual representation of energy usage patterns
- **Proximity-based Optimization**: Smart seating suggestions for optimal AC and lighting usage
- **Elevator vs Stairs Tracking**: Encourage stair usage with gamified incentives
- **Smart Lighting Controls**: Automated lighting optimization based on occupancy

### 📈 **Sustainability Analytics**
- **Carbon Footprint Tracking**: Real-time CO₂ emissions monitoring and reduction metrics
- **Renewable Energy Visualization**: Track transition to green energy sources (96% renewable target)
- **Waste Management**: Monitor recyclable waste and circular economy initiatives
- **Water Conservation**: Track water usage and recycling efforts

### 🔔 **Intelligent Notifications**
- **Energy Saving Alerts**: Personalized recommendations for reducing consumption
- **Behavioral Nudges**: Smart suggestions for sustainable practices
- **Achievement Notifications**: Real-time celebration of eco-friendly milestones
- **System Alerts**: Equipment optimization and maintenance notifications

---

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18.3.1** - Modern component-based UI development
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Lightning-fast build tool and development server

### **UI/UX Libraries**
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icon library

### **Data Visualization**
- **Recharts** - Composable charting library for React
- **Three.js** - 3D graphics and interactive globe visualizations
- **Custom Charts** - Specialized sustainability metrics visualization

### **State Management & Routing**
- **React Context API** - Global state management for user data and metrics
- **React Router DOM** - Client-side routing and navigation
- **TanStack Query** - Server state management and caching

### **Development & Testing**
- **Vitest** - Fast unit testing framework
- **Testing Library** - Simple and complete testing utilities
- **ESLint** - Code linting and quality assurance
- **TypeScript ESLint** - TypeScript-specific linting rules

---

## 📁 Project Structure

```
hexsynergy/
├── public/                          # Static assets
│   ├── assets/logo_2.png           # HexSynergy logo
│   └── favicon.ico                 # Site favicon
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── leaderboard/           # Leaderboard-specific components
│   │   ├── admin/                 # Admin panel components
│   │   ├── DashboardCard.tsx      # Main dashboard card component
│   │   ├── EnergyConsumptionCard.tsx
│   │   ├── SustainabilityChart.tsx
│   │   ├── FloorMap.tsx           # Interactive building floor maps
│   │   ├── AwePointsCard.tsx      # Gamification points display
│   │   └── ...                    # Other specialized components
│   ├── contexts/                  # React Context providers
│   │   ├── AuthContext.tsx        # Authentication state management
│   │   └── DataContext.tsx        # Real-time data management
│   ├── data/                      # Data management and constants
│   │   ├── constants.ts           # Unified data constants
│   │   ├── mockData.ts            # Mock data for development
│   │   ├── sustainabilityData.ts  # HexAware sustainability metrics
│   │   └── leaderboardTimeData.ts # Gamification data
│   ├── hooks/                     # Custom React hooks
│   │   ├── useLeaderboard.ts      # Leaderboard data management
│   │   └── use-toast.ts           # Toast notification system
│   ├── pages/                     # Main application pages
│   │   ├── Index.tsx              # Landing page with live metrics
│   │   ├── Dashboard.tsx          # Main energy dashboard
│   │   ├── Leaderboard.tsx        # Gamification leaderboards
│   │   ├── Admin.tsx              # Administrative controls
│   │   └── Login.tsx              # Authentication page
│   ├── test/                      # Test suites
│   │   ├── Stage1-EnergyTracking-Simple.test.tsx
│   │   ├── Stage2-CarbonEmissions-Simple.test.tsx
│   │   ├── Stage3-Gamification-Simple.test.tsx
│   │   └── Stage4-ProximityAndAlerts-Simple.test.tsx
│   └── lib/                       # Utility functions
└── tests/                         # Additional test files
```

---

## 📊 Data Sources & Methodology

### **HexAware Sustainability Reports**
- **2023 Data**: Baseline energy consumption and carbon emissions
- **2024 Data**: Current year performance metrics and improvements
- **2025 Forecasting**: Predictive analytics based on current trends and initiatives

### **Real-Time Data Integration**
- **Building Management Systems**: Live energy consumption from HVAC, lighting, and equipment
- **Employee Devices**: Laptop energy usage, screen time, and power management settings
- **Environmental Sensors**: Occupancy detection, temperature, and lighting levels
- **Renewable Energy Sources**: Solar panel output and grid energy mix

### **Synthetic Data Generation**
Generated using **GitHub Copilot** for:
- Employee behavior patterns and energy usage profiles
- Department-wise consumption variations
- Seasonal energy consumption trends
- Gamification engagement metrics

---

## 🧪 Testing Strategy

### **Comprehensive Test Coverage**
The application includes extensive testing across four key stages:

#### **Stage 1: Energy Tracking (TC#1-3, TC#14-15, TC#24-25)**
```typescript
// Example test cases
- ✅ Dashboard tracks laptop energy consumption
- ✅ Dark Mode reduces energy usage display
- ✅ Real-time energy data updates
- ✅ Disconnected laptop scenarios
- ✅ Multiple devices simultaneously
```

#### **Stage 2: Carbon Emissions (TC#4-6, TC#16-17, TC#26-27)**
- Carbon footprint calculation accuracy
- Emissions reduction tracking
- Renewable energy impact measurement

#### **Stage 3: Gamification (TC#7-9, TC#18-19, TC#28-29)**
- Awe Points earning mechanisms
- Leaderboard ranking algorithms
- Achievement unlock conditions

#### **Stage 4: Proximity & Alerts (TC#10-13, TC#20-23, TC#30-33)**
- Smart seating optimization
- Proximity-based energy savings
- Intelligent notification system

### **Testing Commands**
```bash
# Run all tests
npm run test

# Run specific test stages
npm run test:stage1  # Energy Tracking
npm run test:stage2  # Carbon Emissions
npm run test:stage3  # Gamification
npm run test:stage4  # Proximity & Alerts

# Test with UI
npm run test:ui

# Coverage report
npm run test:coverage
```

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** package manager

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd hexsynergy
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173` to view the application

### **Build for Production**
```bash
# Production build
npm run build

# Preview production build
npm run preview
```

---

## 🎨 User Interface & Experience

### **Design Philosophy**
- **Eco-Friendly Color Palette**: Green, blue, and earth tones reflecting sustainability
- **Glassmorphism Effects**: Modern, translucent design elements
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Accessibility First**: WCAG compliant with keyboard navigation and screen reader support

### **Key UI Components**

#### **Interactive Dashboard**
- Real-time energy consumption meters
- Animated progress bars and charts
- Live notification system
- Contextual action recommendations

#### **3D Visualizations**
- **Energy Saving Globe**: Interactive 3D Earth showing global impact
- **Building Floor Maps**: Isometric view of office layouts with energy hotspots
- **Sustainability Metrics**: Animated counters and progress indicators

#### **Gamification Elements**
- **Awe Points Display**: Dynamic point accumulation with visual effects
- **Achievement Badges**: Unlockable rewards for sustainable behaviors
- **Leaderboard Rankings**: Competitive elements with department comparisons
- **Progress Tracking**: Visual journey mapping for sustainability goals

---

## 🔧 Development Features

### **Code Quality & Standards**
- **TypeScript**: Full type safety with strict mode enabled
- **ESLint**: Comprehensive linting rules for code consistency
- **Error Boundaries**: Graceful error handling and recovery
- **Performance Optimization**: Lazy loading and code splitting

### **Development Tools**
- **Hot Module Replacement**: Instant updates during development
- **Source Maps**: Debugging support for production builds
- **Component Storybook**: Isolated component development (planned)
- **Automated Testing**: Continuous integration with test automation

### **Data Management**
- **Unified Constants**: Single source of truth for all data structures
- **Type-Safe APIs**: Strongly typed data interfaces
- **Mock Data System**: Comprehensive fake data for development
- **Real-Time Updates**: WebSocket integration for live metrics

---

## 📈 Sustainability Impact Metrics

### **Current Achievements (2024-2025)**
- **🌱 2,847 tons** CO₂ reduction through renewable energy initiatives
- **⚡ 96%** of Chennai campus energy from green power sources
- **♻️ 2,250 kg** of dry recyclable waste processed
- **🌊 Zero-water discharge** policy implementation
- **🌳 10,000+ trees** planted as part of urban reforestation
- **☀️ 2,450 kW** solar capacity across Hexaware offices

### **2025 Forecasted Goals**
- **Carbon Neutral Operations**: 100% renewable energy transition
- **50% Energy Reduction**: Through smart building optimization
- **Employee Engagement**: 90% participation in sustainability programs
- **Waste Elimination**: Zero-waste-to-landfill certification

---

## 🏆 Awards & Recognition

### **Gamification System**
- **Awe Points**: Earn points for sustainable actions
- **Leaderboards**: Department and individual rankings
- **Achievement Badges**: Unlock rewards for consistent eco-friendly behavior
- **Monthly Challenges**: Seasonal sustainability competitions

### **Recognition Levels**
- **Bronze Level**: 0-499 Awe Points
- **Silver Level**: 500-999 Awe Points  
- **Gold Level**: 1000-1999 Awe Points
- **Platinum Level**: 2000+ Awe Points

---

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Standards**
- Follow TypeScript best practices
- Maintain test coverage above 80%
- Use semantic commit messages
- Update documentation for new features

---

## 📞 Support & Contact

### **Development Team: EcoFuelers**
- **Project Lead**: [Team Lead Name]
- **Frontend Developers**: React/TypeScript specialists
- **UI/UX Designers**: Sustainability-focused design team
- **Data Scientists**: Environmental impact analysts

### **Technical Support**
- **Documentation**: Comprehensive guides and API references
- **Issue Tracking**: GitHub Issues for bug reports and feature requests
- **Community**: Developer community for collaboration and support

---

## 📄 License

This project is proprietary software developed for **Hexaware Technologies**. All rights reserved.

**Copyright © 2025 HexSynergy by Hexaware Technologies. All rights reserved.**

---

## 🌟 Acknowledgments

- **Hexaware Technologies** - For supporting sustainable innovation
- **EcoFuelers Team** - Dedicated developers building for a greener future
- **GitHub Copilot** - AI-assisted development and test case generation
- **Open Source Community** - For the amazing tools and libraries that make this possible

---

*"Code for a Greener Future"* - **EcoFuelers**

![Sustainability Badge](https://img.shields.io/badge/Sustainability-Focused-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple)
![Test Coverage](https://img.shields.io/badge/Coverage-85%25-brightgreen)
