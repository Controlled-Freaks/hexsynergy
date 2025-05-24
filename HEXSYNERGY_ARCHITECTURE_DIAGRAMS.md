# HexSynergy - Comprehensive Architecture Diagrams

---

**Document Version:** 1.0  
**Date:** May 24, 2025  
**Prepared By:** EcoFuelers Development Team  
**Project:** HexSynergy - Renewable Energy Consumption Dashboard  

---

## 1. Technical Architecture Diagram

This comprehensive diagram shows the complete technical structure of the HexSynergy application, including all layers, components, and integrations based on the actual codebase.

```mermaid
graph TB
    subgraph "Client Layer"
        BROWSER[Web Browser]
        MOBILE[Mobile Browser]
        PWA[Progressive Web App]
    end
    
    subgraph "Frontend Application - React 18.3.1 + TypeScript 5.5.3"
        subgraph "Application Core"
            APP[App.tsx<br/>Main Entry Point]
            ROUTER[React Router DOM<br/>Navigation System]
            ERROR[ErrorBoundary<br/>Error Handling]
        end
        
        subgraph "Context Providers & State Management"
            AUTH_CTX[AuthContext<br/>Authentication State]
            DATA_CTX[DataContext<br/>Real-time Data Management]
            QUERY[TanStack Query<br/>Server State & Caching]
            TOOLTIP[TooltipProvider<br/>UI Tooltips]
        end
        
        subgraph "Protected Routing System"
            PROTECTED[ProtectedRoute<br/>Access Control]
            ROUTES[Route Definitions<br/>/, /login, /dashboard, /leaderboard, /admin]
        end
        
        subgraph "Page Components"
            INDEX[Index.tsx<br/>Landing Page with Live Metrics]
            LOGIN[Login.tsx<br/>Authentication]
            DASHBOARD[Dashboard.tsx<br/>Energy Dashboard with Tabs]
            LEADERBOARD[Leaderboard.tsx<br/>Gamification Rankings]
            ADMIN[Admin.tsx<br/>Administrative Controls]
            NOTFOUND[NotFound.tsx<br/>404 Handler]
        end
        
        subgraph "Feature Components Layer"
            subgraph "Energy Monitoring"
                ENERGY_CARD[EnergyConsumptionCard<br/>Real-time Energy Display]
                SUSTAINABILITY[SustainabilityChart<br/>Recharts Visualizations]
                LIVE_METRICS[LiveMetricsPanel<br/>Real-time Data Display]
                BUILDING_OVERVIEW[BuildingOverviewCard<br/>Building Statistics]
                DEPT_COMPARISON[DepartmentComparisonCard<br/>Department Analytics]
            end
            
            subgraph "Gamification System"
                AWE_POINTS[AwePointsCard<br/>Points & Achievements]
                LEADERBOARD_HEADER[LeaderboardHeader<br/>Rankings Display]
                LEADERBOARD_LIST[LeaderboardList<br/>User Rankings]
                TOP_PODIUM[TopThreePodium<br/>Top Performers]
                DEPT_RANKINGS[DepartmentRankings<br/>Team Competition]
                USER_PROGRESS[UserProgressCard<br/>Individual Progress]
            end
            
            subgraph "Smart Building Features"
                FLOOR_MAP[FloorMap<br/>Interactive Building Layout]
                ELEVATOR_USAGE[ElevatorUsageCard<br/>Elevator vs Stairs Tracking]
                SMART_LIGHTING[SmartLightingCard<br/>Lighting Control]
                EMPLOYEE_CARD[EmployeeCard<br/>Employee Profiles]
            end
            
            subgraph "Real-time Features"
                LIVE_NOTIFICATIONS[LiveNotifications<br/>Real-time Alerts]
                ECO_IMPACT[EcoImpactCounter<br/>Live Impact Metrics]
                ENERGY_GLOBE[EnergySavingGlobe<br/>3D Three.js Visualization]
                SUSTAINABILITY_GLOBE[SustainabilityGlobe<br/>Global Impact View]
            end
        end
        
        subgraph "UI Component Library - shadcn/ui + Tailwind CSS"
            BASIC_UI[Button, Card, Dialog, Input, Select]
            ADVANCED_UI[Tabs, Charts, Progress, Avatar, Badge]
            LAYOUT_UI[Accordion, Carousel, Navigation, Sidebar]
            FORM_UI[Form, Checkbox, Radio, Switch, Slider]
            FEEDBACK_UI[Toast, Alert, Tooltip, Popover]
        end
        
        subgraph "Utility Layer"
            HOOKS[Custom Hooks<br/>useLeaderboard, use-toast, use-mobile]
            UTILS[lib/utils.ts<br/>Utility Functions]
            FILTERS[DashboardFilters<br/>Data Filtering]
            NAVBAR[NavBar<br/>Navigation Component]
        end
    end
    
    subgraph "Data Management Layer"
        subgraph "Static Data Sources"
            MOCK_DATA[mockData.ts<br/>Employee & Building Mock Data]
            SUSTAINABILITY_DATA[sustainabilityData.ts<br/>HexAware Sustainability Metrics]
            CONSTANTS[constants.ts<br/>Unified System Constants]
            LEADERBOARD_DATA[leaderboardTimeData.ts<br/>Gamification Time Data]
        end
        
        subgraph "Data Processing Functions"
            SAFE_METRICS[safeGetMetricValue<br/>Safe Data Access]
            SAFE_PERCENTAGE[safeGetPercentage<br/>Safe Percentage Calculation]
            DATA_VALIDATION[Data Validation Functions]
            DATA_AGGREGATION[Data Aggregation Logic]
        end
    end
    
    subgraph "External Integration Layer"
        subgraph "Building Management Systems"
            HVAC_SYSTEMS[HVAC Control Systems<br/>Temperature & Air Quality]
            LIGHTING_SYSTEMS[Smart Lighting Systems<br/>Automated Light Control]
            SECURITY_SYSTEMS[Security & Access Control<br/>Building Security]
            ENERGY_METERS[Energy Monitoring Systems<br/>Real-time Consumption]
        end
        
        subgraph "IoT Infrastructure"
            PROXIMITY_SENSORS[Proximity Sensors<br/>Employee Location Tracking]
            OCCUPANCY_SENSORS[Occupancy Detectors<br/>Space Utilization]
            ENVIRONMENTAL_SENSORS[Environmental Sensors<br/>Temperature, Humidity, Light]
            BLUETOOTH_BEACONS[Bluetooth Beacons<br/>Indoor Positioning]
        end
        
        subgraph "Enterprise Systems"
            ACTIVE_DIRECTORY[Active Directory<br/>Authentication & Authorization]
            HR_SYSTEMS[HR Management Systems<br/>Employee Data]
            FACILITY_MGMT[Facility Management<br/>Building Operations]
            REPORTING_SYSTEMS[Enterprise Reporting<br/>Business Intelligence]
        end
        
        subgraph "External APIs"
            WEATHER_API[Weather Services<br/>Environmental Data]
            ENERGY_GRID[Energy Grid APIs<br/>Grid Information]
            CARBON_API[Carbon Footprint APIs<br/>Emission Calculations]
            MAPPING_SERVICES[Mapping Services<br/>Location Services]
        end
    end
    
    subgraph "Development & Testing Infrastructure"
        subgraph "Build & Development"
            VITE[Vite 5.4.1<br/>Build Tool & Dev Server]
            TYPESCRIPT[TypeScript Compiler<br/>Type Checking]
            ESLINT[ESLint<br/>Code Linting]
            TAILWIND[Tailwind CSS<br/>Styling Framework]
        end
        
        subgraph "Testing Framework"
            VITEST[Vitest<br/>Unit Testing Framework]
            REACT_TESTING[React Testing Library<br/>Component Testing]
            JSDOM[JSDOM<br/>DOM Simulation]
            TEST_SETUP[test/setup.ts<br/>Test Configuration]
        end
        
        subgraph "Test Suites"
            STAGE1[Stage1-EnergyTracking-Simple.test.tsx<br/>Energy Monitoring Tests]
            STAGE2[Stage2-CarbonEmissions-Simple.test.tsx<br/>Carbon Footprint Tests]
            STAGE3[Stage3-Gamification-Simple.test.tsx<br/>Gamification Tests]
            STAGE4[Stage4-ProximityAndAlerts-Simple.test.tsx<br/>Smart Building Tests]
        end
    end
    
    subgraph "Deployment & Infrastructure"
        subgraph "Development Environment"
            DEV_SERVER[Local Development Server<br/>Hot Module Replacement]
            DEV_TOOLS[Development Tools<br/>VS Code, Browser DevTools]
        end
        
        subgraph "Production Environment"
            CDN[Content Delivery Network<br/>Static Asset Distribution]
            LOAD_BALANCER[Load Balancer<br/>Traffic Distribution]
            APP_SERVERS[Application Servers<br/>React App Hosting]
            MONITORING[Application Monitoring<br/>Performance & Error Tracking]
        end
    end
    
    %% Connections
    BROWSER --> APP
    MOBILE --> APP
    PWA --> APP
    
    APP --> ROUTER
    APP --> ERROR
    APP --> AUTH_CTX
    APP --> DATA_CTX
    APP --> QUERY
    APP --> TOOLTIP
    
    ROUTER --> PROTECTED
    PROTECTED --> INDEX
    PROTECTED --> LOGIN
    PROTECTED --> DASHBOARD
    PROTECTED --> LEADERBOARD
    PROTECTED --> ADMIN
    ROUTER --> NOTFOUND
    
    DASHBOARD --> ENERGY_CARD
    DASHBOARD --> SUSTAINABILITY
    DASHBOARD --> LIVE_METRICS
    DASHBOARD --> BUILDING_OVERVIEW
    DASHBOARD --> DEPT_COMPARISON
    DASHBOARD --> AWE_POINTS
    DASHBOARD --> FLOOR_MAP
    DASHBOARD --> ELEVATOR_USAGE
    DASHBOARD --> SMART_LIGHTING
    DASHBOARD --> EMPLOYEE_CARD
    
    LEADERBOARD --> LEADERBOARD_HEADER
    LEADERBOARD --> LEADERBOARD_LIST
    LEADERBOARD --> TOP_PODIUM
    LEADERBOARD --> DEPT_RANKINGS
    LEADERBOARD --> USER_PROGRESS
    
    INDEX --> LIVE_NOTIFICATIONS
    INDEX --> ECO_IMPACT
    INDEX --> ENERGY_GLOBE
    INDEX --> SUSTAINABILITY_GLOBE
    
    DATA_CTX --> MOCK_DATA
    DATA_CTX --> SUSTAINABILITY_DATA
    DATA_CTX --> CONSTANTS
    DATA_CTX --> LEADERBOARD_DATA
    DATA_CTX --> SAFE_METRICS
    DATA_CTX --> SAFE_PERCENTAGE
    
    DATA_CTX --> HVAC_SYSTEMS
    DATA_CTX --> LIGHTING_SYSTEMS
    DATA_CTX --> SECURITY_SYSTEMS
    DATA_CTX --> ENERGY_METERS
    DATA_CTX --> PROXIMITY_SENSORS
    DATA_CTX --> OCCUPANCY_SENSORS
    DATA_CTX --> ENVIRONMENTAL_SENSORS
    DATA_CTX --> BLUETOOTH_BEACONS
    
    AUTH_CTX --> ACTIVE_DIRECTORY
    DATA_CTX --> HR_SYSTEMS
    DATA_CTX --> FACILITY_MGMT
    DATA_CTX --> REPORTING_SYSTEMS
    DATA_CTX --> WEATHER_API
    DATA_CTX --> ENERGY_GRID
    DATA_CTX --> CARBON_API
    DATA_CTX --> MAPPING_SERVICES
    
    VITE --> APP
    TYPESCRIPT --> APP
    ESLINT --> APP
    TAILWIND --> APP
    
    VITEST --> STAGE1
    VITEST --> STAGE2
    VITEST --> STAGE3
    VITEST --> STAGE4
    REACT_TESTING --> STAGE1
    JSDOM --> TEST_SETUP
    
    DEV_SERVER --> APP
    CDN --> APP_SERVERS
    LOAD_BALANCER --> APP_SERVERS
    APP_SERVERS --> MONITORING
```

---

## 2. Functional Architecture Diagram

This comprehensive diagram shows the complete functional flow of the HexSynergy application, including business processes, user journeys, and system interactions.

```mermaid
graph TB
    subgraph "User Personas & Access Points"
        subgraph "Primary Users"
            EMPLOYEE[👤 Employee<br/>Daily energy tracking<br/>Gamification participation<br/>Sustainability actions]
            DEPT_MANAGER[👨‍💼 Department Manager<br/>Team performance monitoring<br/>Energy optimization<br/>Goal setting]
            FACILITY_MANAGER[🏢 Facility Manager<br/>Building operations<br/>System optimization<br/>Maintenance coordination]
            SUSTAINABILITY_OFFICER[🌱 Sustainability Officer<br/>ESG reporting<br/>Policy implementation<br/>Impact measurement]
            ADMIN[⚙️ System Administrator<br/>User management<br/>System configuration<br/>Data oversight]
        end
        
        subgraph "Access Methods"
            WEB_ACCESS[🌐 Web Browser Access<br/>Desktop & Mobile]
            PWA_ACCESS[📱 Progressive Web App<br/>Mobile Experience]
            DASHBOARD_ACCESS[📊 Dashboard Interface<br/>Real-time Monitoring]
        end
    end
    
    subgraph "Core Business Processes"
        subgraph "Energy Monitoring & Analytics"
            ENERGY_COLLECTION[⚡ Energy Data Collection<br/>• Laptop usage tracking<br/>• Dark mode detection<br/>• Screen time monitoring<br/>• Device power settings]
            
            BUILDING_MONITORING[🏢 Building Systems Monitoring<br/>• HVAC energy consumption<br/>• Lighting system usage<br/>• Projector & equipment tracking<br/>• Elevator usage patterns]
            
            REAL_TIME_PROCESSING[🔄 Real-time Data Processing<br/>• Data validation & normalization<br/>• Trend analysis & predictions<br/>• Anomaly detection<br/>• Performance calculations]
            
            ENERGY_VISUALIZATION[📈 Energy Visualization<br/>• Real-time dashboards<br/>• Historical trend analysis<br/>• Comparative analytics<br/>• Interactive charts & maps]
        end
        
        subgraph "Carbon Footprint Management"
            CARBON_CALCULATION[🌍 Carbon Footprint Calculation<br/>• Individual emission tracking<br/>• Department-level aggregation<br/>• Building-wide calculations<br/>• Grid carbon intensity factors]
            
            SUSTAINABILITY_REPORTING[📋 Sustainability Reporting<br/>• ESG metrics compilation<br/>• Progress toward goals<br/>• Impact visualization<br/>• Compliance reporting]
            
            FORECASTING[🔮 Predictive Analytics<br/>• 2025 emission forecasting<br/>• Trend-based projections<br/>• Goal achievement modeling<br/>• Scenario planning]
        end
        
        subgraph "Gamification & Engagement System"
            BEHAVIOR_TRACKING[🎯 Behavioral Tracking<br/>• Dark mode usage<br/>• Seating optimization<br/>• Energy-saving actions<br/>• Stair vs elevator usage]
            
            POINTS_ENGINE[🏆 Awe Points Engine<br/>• Action detection & validation<br/>• Point calculation & multipliers<br/>• Credit conversion system<br/>• Achievement unlocking]
            
            LEADERBOARD_SYSTEM[🥇 Leaderboard System<br/>• Individual rankings<br/>• Department competitions<br/>• Building-wide contests<br/>• Time-based challenges]
            
            ACHIEVEMENT_SYSTEM[🎖️ Achievement System<br/>• Badge definitions & criteria<br/>• Milestone tracking<br/>• Progress visualization<br/>• Social recognition]
        end
        
        subgraph "Smart Building Automation"
            PROXIMITY_DETECTION[📍 Proximity Detection<br/>• Employee location tracking<br/>• Occupancy pattern analysis<br/>• Space utilization metrics<br/>• Movement optimization]
            
            SEATING_OPTIMIZATION[🪑 Seating Optimization<br/>• Energy-efficient suggestions<br/>• Collaboration considerations<br/>• AC usage minimization<br/>• Zone-based recommendations]
            
            AUTOMATED_CONTROLS[🤖 Automated Environmental Controls<br/>• AC adjustment in vacated zones<br/>• Lighting optimization<br/>• Temperature regulation<br/>• Equipment power management]
            
            BUILDING_INTELLIGENCE[🧠 Building Intelligence<br/>• Occupancy-based automation<br/>• Energy load balancing<br/>• Predictive maintenance<br/>• Efficiency optimization]
        end
    end
    
    subgraph "User Journey Flows"
        subgraph "Employee Daily Journey"
            LOGIN_FLOW[🔐 Authentication Flow<br/>• Secure login process<br/>• Role-based access<br/>• Session management<br/>• Multi-factor authentication]
            
            DAILY_MONITORING[📊 Daily Energy Monitoring<br/>• Personal dashboard access<br/>• Real-time consumption view<br/>• Goal progress tracking<br/>• Recommendation review]
            
            SUSTAINABLE_ACTIONS[🌱 Sustainable Actions<br/>• Dark mode activation<br/>• Seating relocation<br/>• Energy-saving behaviors<br/>• Stair usage preference]
            
            GAMIFICATION_ENGAGEMENT[🎮 Gamification Engagement<br/>• Points earning activities<br/>• Leaderboard participation<br/>• Achievement unlocking<br/>• Social competition]
        end
        
        subgraph "Manager Oversight Journey"
            TEAM_MONITORING[👥 Team Performance Monitoring<br/>• Department energy metrics<br/>• Team member progress<br/>• Goal achievement tracking<br/>• Comparative analysis]
            
            OPTIMIZATION_STRATEGIES[📈 Optimization Strategies<br/>• Energy reduction planning<br/>• Team goal setting<br/>• Incentive program design<br/>• Performance improvement]
            
            REPORTING_ANALYSIS[📊 Reporting & Analysis<br/>• Performance report generation<br/>• Trend analysis review<br/>• ROI calculation<br/>• Strategic planning]
        end
        
        subgraph "Facility Management Journey"
            BUILDING_OVERSIGHT[🏢 Building Operations Oversight<br/>• System performance monitoring<br/>• Energy consumption analysis<br/>• Equipment status tracking<br/>• Maintenance scheduling]
            
            AUTOMATION_MANAGEMENT[⚙️ Automation Management<br/>• Control system configuration<br/>• Optimization rule setting<br/>• Override management<br/>• Safety protocol maintenance]
            
            EFFICIENCY_OPTIMIZATION[⚡ Efficiency Optimization<br/>• Energy usage optimization<br/>• Cost reduction strategies<br/>• System performance tuning<br/>• Sustainability improvements]
        end
    end
    
    subgraph "Data Flow & Integration Processes"
        subgraph "Real-time Data Pipeline"
            DATA_INGESTION[📥 Data Ingestion<br/>• IoT sensor data collection<br/>• Building system integration<br/>• Device API connections<br/>• External service integration]
            
            DATA_PROCESSING[⚙️ Data Processing<br/>• Real-time stream processing<br/>• Data validation & cleansing<br/>• Aggregation & calculation<br/>• Pattern recognition]
            
            DATA_DISTRIBUTION[📤 Data Distribution<br/>• Real-time dashboard updates<br/>• Notification triggering<br/>• Alert generation<br/>• Report compilation]
        end
        
        subgraph "Business Intelligence Flow"
            ANALYTICS_ENGINE[🧮 Analytics Engine<br/>• Trend analysis<br/>• Predictive modeling<br/>• Comparative analytics<br/>• Performance metrics]
            
            INSIGHT_GENERATION[💡 Insight Generation<br/>• Recommendation algorithms<br/>• Optimization suggestions<br/>• Anomaly identification<br/>• Improvement opportunities]
            
            DECISION_SUPPORT[🎯 Decision Support<br/>• Strategic recommendations<br/>• ROI calculations<br/>• Impact projections<br/>• Goal tracking]
        end
        
        subgraph "Notification & Alert System"
            ALERT_GENERATION[🚨 Alert Generation<br/>• Energy saving opportunities<br/>• System anomalies<br/>• Achievement notifications<br/>• Goal reminders]
            
            NOTIFICATION_DELIVERY[📬 Notification Delivery<br/>• Real-time in-app alerts<br/>• Email notifications<br/>• Mobile push notifications<br/>• Desktop notifications]
            
            ENGAGEMENT_TRIGGERS[🎯 Engagement Triggers<br/>• Behavioral nudges<br/>• Gamification prompts<br/>• Social recognition<br/>• Challenge invitations]
        end
    end
    
    subgraph "Integration & External Systems"
        subgraph "Building System Integration"
            BMS_INTEGRATION[🏢 Building Management Systems<br/>• HVAC control integration<br/>• Lighting system connection<br/>• Security system interface<br/>• Energy meter integration]
            
            IOT_INTEGRATION[📡 IoT Infrastructure<br/>• Sensor network management<br/>• Device communication protocols<br/>• Data collection automation<br/>• Real-time monitoring]
        end
        
        subgraph "Enterprise System Integration"
            ENTERPRISE_INTEGRATION[🏢 Enterprise Systems<br/>• Active Directory authentication<br/>• HR system integration<br/>• Facility management connection<br/>• Reporting system interface]
            
            EXTERNAL_API_INTEGRATION[🌐 External API Integration<br/>• Weather service integration<br/>• Energy grid data connection<br/>• Carbon footprint APIs<br/>• Mapping service integration]
        end
    end
    
    subgraph "Outcomes & Impact Measurement"
        subgraph "Environmental Impact"
            CARBON_REDUCTION[🌍 Carbon Footprint Reduction<br/>• 2,847+ tons CO₂ reduction<br/>• 96% renewable energy usage<br/>• Zero-water discharge policy<br/>• 10,000+ trees planted]
            
            ENERGY_SAVINGS[⚡ Energy Consumption Reduction<br/>• 50% energy reduction target<br/>• Real-time optimization<br/>• Behavioral change impact<br/>• System efficiency gains]
        end
        
        subgraph "Business Impact"
            COST_SAVINGS[💰 Financial Benefits<br/>• ₹5M+ annual cost savings<br/>• Operational efficiency gains<br/>• Maintenance optimization<br/>• ROI achievement]
            
            EMPLOYEE_ENGAGEMENT[👥 Employee Engagement<br/>• 90% user adoption target<br/>• 75% gamification participation<br/>• Behavioral change adoption<br/>• Cultural transformation]
        end
        
        subgraph "Operational Excellence"
            SYSTEM_PERFORMANCE[⚙️ System Performance<br/>• 99.5% system availability<br/>• <2 second response times<br/>• Real-time data processing<br/>• Automated operations]
            
            SUSTAINABILITY_GOALS[🎯 Sustainability Goals<br/>• Carbon neutrality progress<br/>• ESG compliance<br/>• Industry recognition<br/>• Best practice development]
        end
    end
    
    %% User Flow Connections
    EMPLOYEE --> LOGIN_FLOW
    LOGIN_FLOW --> DAILY_MONITORING
    DAILY_MONITORING --> SUSTAINABLE_ACTIONS
    SUSTAINABLE_ACTIONS --> GAMIFICATION_ENGAGEMENT
    
    DEPT_MANAGER --> TEAM_MONITORING
    TEAM_MONITORING --> OPTIMIZATION_STRATEGIES
    OPTIMIZATION_STRATEGIES --> REPORTING_ANALYSIS
    
    FACILITY_MANAGER --> BUILDING_OVERSIGHT
    BUILDING_OVERSIGHT --> AUTOMATION_MANAGEMENT
    AUTOMATION_MANAGEMENT --> EFFICIENCY_OPTIMIZATION
    
    %% Process Flow Connections
    ENERGY_COLLECTION --> REAL_TIME_PROCESSING
    BUILDING_MONITORING --> REAL_TIME_PROCESSING
    REAL_TIME_PROCESSING --> ENERGY_VISUALIZATION
    
    CARBON_CALCULATION --> SUSTAINABILITY_REPORTING
    SUSTAINABILITY_REPORTING --> FORECASTING
    
    BEHAVIOR_TRACKING --> POINTS_ENGINE
    POINTS_ENGINE --> LEADERBOARD_SYSTEM
    LEADERBOARD_SYSTEM --> ACHIEVEMENT_SYSTEM
    
    PROXIMITY_DETECTION --> SEATING_OPTIMIZATION
    SEATING_OPTIMIZATION --> AUTOMATED_CONTROLS
    AUTOMATED_CONTROLS --> BUILDING_INTELLIGENCE
    
    %% Data Flow Connections
    DATA_INGESTION --> DATA_PROCESSING
    DATA_PROCESSING --> DATA_DISTRIBUTION
    DATA_DISTRIBUTION --> ANALYTICS_ENGINE
    ANALYTICS_ENGINE --> INSIGHT_GENERATION
    INSIGHT_GENERATION --> DECISION_SUPPORT
    
    ALERT_GENERATION --> NOTIFICATION_DELIVERY
    NOTIFICATION_DELIVERY --> ENGAGEMENT_TRIGGERS
    
    %% Integration Connections
    BMS_INTEGRATION --> DATA_INGESTION
    IOT_INTEGRATION --> DATA_INGESTION
    ENTERPRISE_INTEGRATION --> DATA_INGESTION
    EXTERNAL_API_INTEGRATION --> DATA_INGESTION
    
    %% Impact Connections
    DECISION_SUPPORT --> CARBON_REDUCTION
    DECISION_SUPPORT --> ENERGY_SAVINGS
    DECISION_SUPPORT --> COST_SAVINGS
    ENGAGEMENT_TRIGGERS --> EMPLOYEE_ENGAGEMENT
    BUILDING_INTELLIGENCE --> SYSTEM_PERFORMANCE
    FORECASTING --> SUSTAINABILITY_GOALS
```

---

## Summary

These two comprehensive diagrams provide:

### **Technical Architecture Diagram:**
- Complete system structure from client to deployment
- All actual components from the HexSynergy codebase
- Technology stack details (React 18.3.1, TypeScript 5.5.3, Vite 5.4.1)
- Integration points with external systems
- Testing framework and development infrastructure

### **Functional Architecture Diagram:**
- End-to-end business processes and user journeys
- Complete functional flow from user interaction to business outcomes
- Integration of all core features: Energy Monitoring, Gamification, Smart Building Automation
- Real-world impact measurement and sustainability goals

Both diagrams are based on the actual HexSynergy project structure and reflect the real implementation for Hexaware Technologies' sustainability initiative.

---

**© 2025 Hexaware Technologies - HexSynergy Project**  
**Prepared by EcoFuelers Development Team**  
**"Code for a Greener Future"**
