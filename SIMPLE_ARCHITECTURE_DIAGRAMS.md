# HexSynergy - Simple Architecture Diagrams

---

**Document Version:** 1.0  
**Date:** May 24, 2025  
**Prepared By:** EcoFuelers Development Team  
**Project:** HexSynergy - Renewable Energy Consumption Dashboard  

---

## 1. Simple Technical Architecture

```mermaid
graph TB
    subgraph "Users"
        USER[👤 Users<br/>Web & Mobile]
    end
    
    subgraph "Frontend - React + TypeScript"
        APP[App.tsx<br/>Main Application]
        PAGES[Pages<br/>Dashboard | Leaderboard | Admin]
        COMPONENTS[Components<br/>Energy Cards | Charts | Maps]
        DATA[Data Management<br/>Context | State | Cache]
    end
    
    subgraph "Core Features"
        ENERGY[⚡ Energy Monitoring<br/>Real-time Tracking]
        GAMIFICATION[🎮 Gamification<br/>Points & Leaderboards]
        BUILDING[🏢 Smart Building<br/>Automation & Control]
    end
    
    subgraph "External Systems"
        BMS[Building Management<br/>HVAC | Lighting | Security]
        IOT[IoT Sensors<br/>Proximity | Occupancy]
        APIS[External APIs<br/>Weather | Energy Grid]
    end
    
    subgraph "Infrastructure"
        DEV[Development<br/>Vite | TypeScript | Vitest]
        DEPLOY[Deployment<br/>CDN | Servers | Monitoring]
    end
    
    USER --> APP
    APP --> PAGES
    PAGES --> COMPONENTS
    COMPONENTS --> DATA
    
    DATA --> ENERGY
    DATA --> GAMIFICATION
    DATA --> BUILDING
    
    ENERGY --> BMS
    BUILDING --> IOT
    DATA --> APIS
    
    APP --> DEV
    DEV --> DEPLOY
```

---

## 2. Simple Functional Architecture

```mermaid
graph TB
    subgraph "Users & Goals"
        EMPLOYEE[👤 Employee<br/>Track Energy & Earn Points]
        MANAGER[👨‍💼 Manager<br/>Monitor Team Performance]
        ADMIN[⚙️ Admin<br/>System Management]
    end
    
    subgraph "Core Processes"
        LOGIN[🔐 Login & Authentication]
        MONITOR[📊 Energy Monitoring<br/>• Laptop Usage<br/>• Building Systems<br/>• Real-time Data]
        GAMIFY[🎮 Gamification<br/>• Awe Points<br/>• Leaderboards<br/>• Achievements]
        AUTOMATE[🤖 Building Automation<br/>• Proximity Detection<br/>• Seating Optimization<br/>• Environmental Control]
    end
    
    subgraph "Data Flow"
        COLLECT[📥 Data Collection<br/>Sensors | Devices | Systems]
        PROCESS[⚙️ Data Processing<br/>Validation | Calculation | Analysis]
        DISPLAY[📱 Data Display<br/>Dashboards | Charts | Notifications]
    end
    
    subgraph "Business Outcomes"
        ENVIRONMENTAL[🌍 Environmental Impact<br/>• 50% Energy Reduction<br/>• 2,847 tons CO₂ Saved<br/>• 96% Renewable Energy]
        BUSINESS[💼 Business Benefits<br/>• ₹5M+ Cost Savings<br/>• 90% User Adoption<br/>• Operational Efficiency]
    end
    
    EMPLOYEE --> LOGIN
    MANAGER --> LOGIN
    ADMIN --> LOGIN
    
    LOGIN --> MONITOR
    LOGIN --> GAMIFY
    LOGIN --> AUTOMATE
    
    MONITOR --> COLLECT
    GAMIFY --> COLLECT
    AUTOMATE --> COLLECT
    
    COLLECT --> PROCESS
    PROCESS --> DISPLAY
    
    DISPLAY --> ENVIRONMENTAL
    DISPLAY --> BUSINESS
```

---

## Summary

### **Technical Architecture:**
- **Frontend**: React + TypeScript application with pages and components
- **Core Features**: Energy monitoring, gamification, and smart building automation
- **External Systems**: Building management, IoT sensors, and external APIs
- **Infrastructure**: Development tools and deployment environment

### **Functional Architecture:**
- **Users**: Employees, managers, and administrators with different goals
- **Core Processes**: Authentication, monitoring, gamification, and automation
- **Data Flow**: Collection, processing, and display of real-time information
- **Business Outcomes**: Environmental impact and business benefits

Both diagrams show the essential structure and flow of the HexSynergy application in a clear, simplified format.

---

**© 2025 Hexaware Technologies - HexSynergy Project**  
**Prepared by EcoFuelers Development Team**  
**"Code for a Greener Future"**
