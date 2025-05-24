# HexSynergy - Technical Architecture & Functional Architecture Diagrams

---

**Document Version:** 1.0  
**Date:** May 24, 2025  
**Prepared By:** EcoFuelers Development Team  
**Project:** HexSynergy - Renewable Energy Consumption Dashboard  

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Technical Architecture Diagrams](#2-technical-architecture-diagrams)
3. [Functional Architecture Diagrams](#3-functional-architecture-diagrams)
4. [Component Interaction Diagrams](#4-component-interaction-diagrams)
5. [Data Flow Diagrams](#5-data-flow-diagrams)
6. [Deployment Architecture](#6-deployment-architecture)

---

## 1. System Overview

HexSynergy is built using a modern React-based frontend architecture with TypeScript, integrated with real-time data processing and gamification systems. The architecture follows component-based design patterns with clear separation of concerns.

### 1.1 Technology Stack (Based on Actual Codebase)

```
Frontend Framework: React 18.3.1 + TypeScript 5.5.3
Build Tool: Vite 5.4.1
UI Framework: Tailwind CSS + shadcn/ui
State Management: React Context API + TanStack Query
Visualization: Recharts + Three.js
Testing: Vitest + React Testing Library
```

---

## 2. Technical Architecture Diagrams

### 2.1 High-Level System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        WB[Web Browser]
        MB[Mobile Browser]
    end
    
    subgraph "Frontend Application (React + TypeScript)"
        subgraph "Core Application"
            APP[App.tsx<br/>Main Application Entry]
            RT[React Router<br/>Navigation & Routing]
            EB[ErrorBoundary<br/>Error Handling]
        end
        
        subgraph "Context Providers"
            AC[AuthContext<br/>Authentication State]
            DC[DataContext<br/>Real-time Data Management]
            QC[QueryClient<br/>Server State Caching]
        end
        
        subgraph "Page Components"
            IDX[Index.tsx<br/>Landing Page]
            DASH[Dashboard.tsx<br/>Energy Dashboard]
            LB[Leaderboard.tsx<br/>Gamification]
            ADM[Admin.tsx<br/>Administration]
            LOG[Login.tsx<br/>Authentication]
        end
        
        subgraph "Feature Components"
            EC[EnergyConsumptionCard<br/>Energy Tracking]
            SC[SustainabilityChart<br/>Data Visualization]
            FM[FloorMap<br/>Building Layout]
            APC[AwePointsCard<br/>Gamification]
            LN[LiveNotifications<br/>Real-time Alerts]
        end
        
        subgraph "UI Components (shadcn/ui)"
            BTN[Button, Card, Dialog]
            CHT[Charts, Progress, Tabs]
            FRM[Form, Input, Select]
        end
    end
    
    subgraph "Data Layer"
        subgraph "Static Data"
            MD[mockData.ts<br/>Employee & Building Data]
            SD[sustainabilityData.ts<br/>HexAware Metrics]
            CONST[constants.ts<br/>Unified Constants]
        end
        
        subgraph "Real-time Data Sources"
            BMS[Building Management<br/>Systems]
            IOT[IoT Sensors<br/>Proximity & Environment]
            DEV[Device APIs<br/>Laptop Monitoring]
        end
    end
    
    subgraph "External Services"
        AD[Active Directory<br/>Authentication]
        WS[Weather Services<br/>Environmental Data]
        ES[Energy Systems<br/>Grid Information]
    end
    
    WB --> APP
    MB --> APP
    APP --> RT
    APP --> EB
    RT --> IDX
    RT --> DASH
    RT --> LB
    RT --> ADM
    RT --> LOG
    
    AC --> DASH
    DC --> DASH
    QC --> DASH
    
    DASH --> EC
    DASH --> SC
    DASH --> FM
    DASH --> APC
    DASH --> LN
    
    EC --> BTN
    SC --> CHT
    FM --> BTN
    APC --> FRM
    
    DC --> MD
    DC --> SD
    DC --> CONST
    DC --> BMS
    DC --> IOT
    DC --> DEV
    
    AC --> AD
    DC --> WS
    DC --> ES
```

### 2.2 Frontend Component Architecture

```mermaid
graph TD
    subgraph "Application Root"
        APP[App.tsx]
        APP --> EB[ErrorBoundary]
        APP --> QCP[QueryClientProvider]
        APP --> BR[BrowserRouter]
        APP --> AP[AuthProvider]
        APP --> DP[DataProvider]
        APP --> TTP[TooltipProvider]
    end
    
    subgraph "Routing Layer"
        BR --> RT[Routes]
        RT --> R1[/ → Index]
        RT --> R2[/login → Login]
        RT --> R3[/dashboard → Dashboard]
        RT --> R4[/leaderboard → Leaderboard]
        RT --> R5[/admin → Admin]
        RT --> R6[/* → NotFound]
    end
    
    subgraph "Protected Routes"
        PR[ProtectedRoute]
        R3 --> PR
        R4 --> PR
        R5 --> PR
        PR --> DASH[Dashboard.tsx]
        PR --> LB[Leaderboard.tsx]
        PR --> ADM[Admin.tsx]
    end
    
    subgraph "Dashboard Components"
        DASH --> NB[NavBar]
        DASH --> DF[DashboardFilters]
        DASH --> TABS[Tabs Component]
        
        TABS --> T1[Overview Tab]
        TABS --> T2[Buildings Tab]
        TABS --> T3[Departments Tab]
        TABS --> T4[Energy Tab]
        TABS --> T5[Carbon Tab]
        TABS --> T6[Elevator Tab]
        TABS --> T7[Lighting Tab]
        
        T1 --> ECC[EnergyConsumptionCard]
        T1 --> SC[SustainabilityChart]
        T1 --> APC[AwePointsCard]
        T1 --> FM[FloorMap]
        T1 --> DC[DashboardCard]
        
        T2 --> BOC[BuildingOverviewCard]
        T3 --> DCC[DepartmentComparisonCard]
        T4 --> EUC[ElevatorUsageCard]
        T5 --> SLC[SmartLightingCard]
    end
    
    subgraph "Leaderboard Components"
        LB --> LH[LeaderboardHeader]
        LB --> LF[LeaderboardFilters]
        LB --> LL[LeaderboardList]
        LB --> TTP[TopThreePodium]
        LB --> DR[DepartmentRankings]
        LB --> UPC[UserProgressCard]
    end
    
    subgraph "Shared Components"
        EIC[EcoImpactCounter]
        ESG[EnergySavingGlobe]
        LMP[LiveMetricsPanel]
        LN[LiveNotifications]
        EC[EmployeeCard]
    end
```

### 2.3 Data Management Architecture

```mermaid
graph TB
    subgraph "Context Layer"
        subgraph "AuthContext"
            AS[Authentication State]
            US[User Session]
            RM[Role Management]
        end
        
        subgraph "DataContext"
            RTM[Real-time Metrics]
            SS[Sustainability Stats]
            BD[Building Data]
            ED[Employee Data]
        end
    end
    
    subgraph "Data Sources"
        subgraph "Static Data Files"
            MD[mockData.ts]
            SD[sustainabilityData.ts]
            CONST[constants.ts]
            LTD[leaderboardTimeData.ts]
        end
        
        subgraph "Generated Data"
            EMP[Employee Profiles]
            BLD[Building Statistics]
            DEPT[Department Data]
            INIT[Green Initiatives]
        end
    end
    
    subgraph "Data Processing"
        subgraph "Utility Functions"
            SGM[safeGetMetricValue]
            SGP[safeGetPercentage]
            DV[Data Validation]
            DC[Data Calculation]
        end
        
        subgraph "Hooks"
            UL[useLeaderboard]
            UT[use-toast]
            UM[use-mobile]
        end
    end
    
    subgraph "State Management"
        subgraph "TanStack Query"
            QC[Query Client]
            QK[Query Keys]
            QF[Query Functions]
            QS[Query State]
        end
        
        subgraph "Local State"
            RS[React State]
            RE[React Effects]
            RC[React Callbacks]
        end
    end
    
    AS --> US
    US --> RM
    RTM --> SS
    SS --> BD
    BD --> ED
    
    MD --> EMP
    SD --> BLD
    CONST --> DEPT
    LTD --> INIT
    
    SGM --> DV
    SGP --> DC
    UL --> QF
    UT --> RS
    
    QC --> QK
    QK --> QF
    QF --> QS
    RS --> RE
    RE --> RC
    
    DataContext --> QC
    AuthContext --> QC
```

---

## 3. Functional Architecture Diagrams

### 3.1 Energy Monitoring System

```mermaid
graph TD
    subgraph "Energy Data Collection"
        subgraph "Device Monitoring"
            LM[Laptop Monitoring]
            DM[Dark Mode Detection]
            ST[Screen Time Tracking]
            PS[Power Settings]
        end
        
        subgraph "Building Systems"
            HVAC[HVAC Monitoring]
            LIGHT[Lighting Systems]
            PROJ[Projector Usage]
            ELEV[Elevator Systems]
        end
        
        subgraph "Environmental Sensors"
            TEMP[Temperature Sensors]
            OCC[Occupancy Detectors]
            PROX[Proximity Sensors]
            LIGHT_S[Light Sensors]
        end
    end
    
    subgraph "Data Processing Engine"
        subgraph "Real-time Processing"
            DP[Data Parser]
            DV[Data Validator]
            DA[Data Aggregator]
            DC[Data Calculator]
        end
        
        subgraph "Analytics Engine"
            TE[Trend Engine]
            PE[Prediction Engine]
            CE[Comparison Engine]
            AE[Anomaly Engine]
        end
    end
    
    subgraph "Visualization Layer"
        subgraph "Dashboard Components"
            ECC[EnergyConsumptionCard]
            SC[SustainabilityChart]
            LMP[LiveMetricsPanel]
            FM[FloorMap]
        end
        
        subgraph "Chart Types"
            LC[Line Charts]
            BC[Bar Charts]
            PC[Pie Charts]
            GC[Gauge Charts]
        end
    end
    
    subgraph "User Interface"
        subgraph "Energy Dashboard"
            RT[Real-time Metrics]
            HT[Historical Trends]
            CP[Comparison Panels]
            AL[Alert Panels]
        end
        
        subgraph "Interactive Features"
            FIL[Filters]
            DRILL[Drill-down]
            EXP[Export]
            SHARE[Share]
        end
    end
    
    LM --> DP
    DM --> DP
    ST --> DP
    PS --> DP
    
    HVAC --> DV
    LIGHT --> DV
    PROJ --> DV
    ELEV --> DV
    
    TEMP --> DA
    OCC --> DA
    PROX --> DA
    LIGHT_S --> DA
    
    DP --> TE
    DV --> PE
    DA --> CE
    DC --> AE
    
    TE --> ECC
    PE --> SC
    CE --> LMP
    AE --> FM
    
    ECC --> LC
    SC --> BC
    LMP --> PC
    FM --> GC
    
    LC --> RT
    BC --> HT
    PC --> CP
    GC --> AL
    
    RT --> FIL
    HT --> DRILL
    CP --> EXP
    AL --> SHARE
```

### 3.2 Gamification System Architecture

```mermaid
graph TD
    subgraph "Behavioral Tracking"
        subgraph "User Actions"
            DMU[Dark Mode Usage]
            SO[Seating Optimization]
            ER[Energy Reduction]
            SU[Stair Usage]
        end
        
        subgraph "System Detection"
            AD[Action Detection]
            AV[Action Validation]
            AS[Action Scoring]
            AL[Action Logging]
        end
    end
    
    subgraph "Points Engine"
        subgraph "Point Calculation"
            PC[Point Calculator]
            PM[Point Multipliers]
            PV[Point Validation]
            PT[Point Tracking]
        end
        
        subgraph "Awe Points System"
            AP[Awe Points]
            CC[Credit Conversion]
            PH[Point History]
            PR[Point Redemption]
        end
    end
    
    subgraph "Achievement System"
        subgraph "Badge Management"
            BD[Badge Definitions]
            BC[Badge Criteria]
            BA[Badge Awards]
            BP[Badge Progress]
        end
        
        subgraph "Milestone Tracking"
            MT[Milestone Tracker]
            MC[Milestone Criteria]
            MA[Milestone Awards]
            MN[Milestone Notifications]
        end
    end
    
    subgraph "Leaderboard System"
        subgraph "Ranking Engine"
            RE[Ranking Engine]
            RA[Ranking Algorithm]
            RT[Ranking Tiers]
            RU[Ranking Updates]
        end
        
        subgraph "Competition Features"
            IL[Individual Leaderboard]
            DL[Department Leaderboard]
            BL[Building Leaderboard]
            TL[Time-based Leaderboard]
        end
    end
    
    subgraph "User Interface"
        subgraph "Gamification Components"
            APC[AwePointsCard]
            LBC[LeaderboardComponents]
            UPC[UserProgressCard]
            AC[AchievementCards]
        end
        
        subgraph "Interactive Elements"
            PD[Progress Displays]
            BD_UI[Badge Displays]
            LT[Leaderboard Tables]
            NF[Notifications]
        end
    end
    
    DMU --> AD
    SO --> AD
    ER --> AD
    SU --> AD
    
    AD --> AV
    AV --> AS
    AS --> AL
    
    AL --> PC
    PC --> PM
    PM --> PV
    PV --> PT
    
    PT --> AP
    AP --> CC
    CC --> PH
    PH --> PR
    
    AS --> BD
    BD --> BC
    BC --> BA
    BA --> BP
    
    BP --> MT
    MT --> MC
    MC --> MA
    MA --> MN
    
    PT --> RE
    RE --> RA
    RA --> RT
    RT --> RU
    
    RU --> IL
    RU --> DL
    RU --> BL
    RU --> TL
    
    AP --> APC
    IL --> LBC
    BP --> UPC
    BA --> AC
    
    APC --> PD
    LBC --> BD_UI
    UPC --> LT
    AC --> NF
```

### 3.3 Smart Building Integration

```mermaid
graph TD
    subgraph "Proximity Detection System"
        subgraph "Sensor Network"
            PS[Proximity Sensors]
            OS[Occupancy Sensors]
            BS[Bluetooth Beacons]
            WS[WiFi Positioning]
        end
        
        subgraph "Location Processing"
            LP[Location Processor]
            LD[Location Database]
            LT[Location Tracker]
            LA[Location Analytics]
        end
    end
    
    subgraph "Optimization Engine"
        subgraph "Seating Analysis"
            SA[Seating Analyzer]
            OA[Occupancy Analyzer]
            EA[Efficiency Analyzer]
            RA[Recommendation Algorithm]
        end
        
        subgraph "Energy Optimization"
            EO[Energy Optimizer]
            ZM[Zone Manager]
            LM[Load Manager]
            SM[Schedule Manager]
        end
    end
    
    subgraph "Building Control Systems"
        subgraph "HVAC Control"
            AC[AC Controller]
            HC[Heating Controller]
            VC[Ventilation Controller]
            TC[Temperature Controller]
        end
        
        subgraph "Lighting Control"
            LC[Light Controller]
            DC[Dimming Controller]
            SC[Scene Controller]
            MC[Motion Controller]
        end
        
        subgraph "Equipment Control"
            PC[Projector Controller]
            FC[Fan Controller]
            EC[Equipment Controller]
            SC_EQ[Security Controller]
        end
    end
    
    subgraph "User Interface"
        subgraph "Floor Map Components"
            FM[FloorMap Component]
            IM[Interactive Map]
            OM[Occupancy Map]
            EM[Energy Map]
        end
        
        subgraph "Control Interfaces"
            CP[Control Panels]
            SP[Settings Panels]
            MP[Monitoring Panels]
            AP[Alert Panels]
        end
    end
    
    subgraph "Notification System"
        subgraph "Alert Generation"
            AG[Alert Generator]
            AN[Alert Notifier]
            AF[Alert Filters]
            AH[Alert History]
        end
        
        subgraph "Recommendation System"
            RS[Recommendation System]
            RG[Recommendation Generator]
            RF[Recommendation Filters]
        end
    end
    
    PS --> LP
    OS --> LP
    BS --> LP
    WS --> LP
    
    LP --> LD
    LD --> LT
    LT --> LA
    
    LA --> SA
    SA --> OA
    OA --> EA
    EA --> RA
    
    RA --> EO
    EO --> ZM
    ZM --> LM
    LM --> SM
    
    SM --> AC
    SM --> HC
    SM --> VC
    SM --> TC
    
    SM --> LC
    SM --> DC
    SM --> SC
    SM --> MC
    
    SM --> PC
    SM --> FC
    SM --> EC
    SM --> SC_EQ
    
    LA --> FM
    FM --> IM
    IM --> OM
    OM --> EM
    
    EO --> CP
    CP --> SP
    SP --> MP
    MP --> AP
    
    RA --> AG
    AG --> AN
    AN --> AF
    AF --> AH
    
    RA --> RS
    RS --> RG
    RG --> RF
```

---

## 4. Component Interaction Diagrams

### 4.1 Dashboard Component Interactions

```mermaid
sequenceDiagram
    participant User
    participant Dashboard
    participant DataContext
    participant EnergyCard
    participant SustainabilityChart
    participant FloorMap
    participant AwePointsCard
    
    User->>Dashboard: Access Dashboard
    Dashboard->>DataContext: Request Real-time Data
    DataContext-->>Dashboard: Return Energy Metrics
    
    Dashboard->>EnergyCard: Pass Energy Data
    EnergyCard-->>Dashboard: Render Energy Consumption
    
    Dashboard->>SustainabilityChart: Pass Chart Data
    SustainabilityChart-->>Dashboard: Render Charts
    
    Dashboard->>FloorMap: Pass Building Data
    FloorMap-->>Dashboard: Render Interactive Map
    
    Dashboard->>AwePointsCard: Pass User Points
    AwePointsCard-->>Dashboard: Render Gamification
    
    User->>FloorMap: Select Employee
    FloorMap->>Dashboard: Employee Selected Event
    Dashboard->>Dashboard: Show Employee Details
    
    User->>EnergyCard: Toggle Dark Mode
    EnergyCard->>DataContext: Update Energy Settings
    DataContext->>AwePointsCard: Award Points
    AwePointsCard-->>User: Show Point Notification
```

### 4.2 Gamification Flow

```mermaid
sequenceDiagram
    participant Employee
    participant Dashboard
    participant DataContext
    participant PointsEngine
    participant LeaderBoard
    participant NotificationSystem
    
    Employee->>Dashboard: Perform Sustainable Action
    Dashboard->>DataContext: Detect Action
    DataContext->>PointsEngine: Calculate Points
    PointsEngine->>PointsEngine: Validate Action
    PointsEngine->>PointsEngine: Apply Multipliers
    PointsEngine-->>DataContext: Return Points
    
    DataContext->>LeaderBoard: Update Rankings
    LeaderBoard->>LeaderBoard: Recalculate Positions
    LeaderBoard-->>DataContext: Confirm Update
    
    DataContext->>NotificationSystem: Trigger Notification
    NotificationSystem-->>Employee: Show Achievement
    
    Employee->>LeaderBoard: View Rankings
    LeaderBoard-->>Employee: Display Current Position
    
    Employee->>Dashboard: Check Progress
    Dashboard->>DataContext: Get User Stats
    DataContext-->>Dashboard: Return Progress Data
    Dashboard-->>Employee: Show Progress
```

### 4.3 Building Automation Flow

```mermaid
sequenceDiagram
    participant Employee
    participant ProximitySensor
    participant OptimizationEngine
    participant BuildingControl
    participant NotificationSystem
    participant Dashboard
    
    Employee->>ProximitySensor: Enter Office Area
    ProximitySensor->>OptimizationEngine: Location Update
    OptimizationEngine->>OptimizationEngine: Analyze Occupancy
    OptimizationEngine->>OptimizationEngine: Calculate Optimization
    
    OptimizationEngine->>NotificationSystem: Generate Suggestion
    NotificationSystem-->>Employee: Seating Recommendation
    
    Employee->>Employee: Move to Suggested Location
    ProximitySensor->>OptimizationEngine: New Location Update
    OptimizationEngine->>BuildingControl: Adjust Environmental Controls
    
    BuildingControl->>BuildingControl: Turn Off AC in Vacated Zone
    BuildingControl->>BuildingControl: Adjust Lighting
    BuildingControl-->>OptimizationEngine: Confirm Changes
    
    OptimizationEngine->>Dashboard: Update Energy Savings
    Dashboard-->>Employee: Show Impact
    
    OptimizationEngine->>NotificationSystem: Award Points
    NotificationSystem-->>Employee: Points Notification
```

---

## 5. Data Flow Diagrams

### 5.1 Real-time Data Flow

```mermaid
graph LR
    subgraph "Data Sources"
        DS1[Laptop Sensors]
        DS2[Building Systems]
        DS3[IoT Sensors]
        DS4[User Actions]
    end
    
    subgraph "Data Collection Layer"
        DC1[Data Collectors]
        DC2[Data Validators]
        DC3[Data Normalizers]
    end
    
    subgraph "Processing Layer"
        PL1[Real-time Processor]
        PL2[Aggregation Engine]
        PL3[Calculation Engine]
        PL4[Analytics Engine]
    end
    
    subgraph "State Management"
        SM1[DataContext]
        SM2[Query Cache]
        SM3[Local State]
    end
    
    subgraph "UI Components"
        UI1[Dashboard]
        UI2[Charts]
        UI3[Maps]
        UI4[Cards]
    end
    
    DS1 --> DC1
    DS2 --> DC1
    DS3 --> DC2
    DS4 --> DC3
    
    DC1 --> PL1
    DC2 --> PL2
    DC3 --> PL3
    
    PL1 --> SM1
    PL2 --> SM2
    PL3 --> SM3
    PL4 --> SM1
    
    SM1 --> UI1
    SM2 --> UI2
    SM3 --> UI3
    SM1 --> UI4
```

### 5.2 User Interaction Data Flow

```mermaid
graph TD
    subgraph "User Actions"
        UA1[Login]
        UA2[Navigate]
        UA3[Filter Data]
        UA4[Perform Action]
        UA5[View Details]
    end
    
    subgraph "Event Handlers"
        EH1[Auth Handler]
        EH2[Route Handler]
        EH3[Filter Handler]
        EH4[Action Handler]
        EH5[Detail Handler]
    end
    
    subgraph "State Updates"
        SU1[Auth State]
        SU2[Route State]
        SU3[Filter State]
        SU4[Action State]
        SU5[Detail State]
    end
    
    subgraph "Data Processing"
        DP1[Authentication]
        DP2[Data Filtering]
        DP3[Action Processing]
        DP4[Detail Fetching]
    end
    
    subgraph "UI Updates"
        UU1[Login Status]
        UU2[Page Content]
        UU3[Filtered Data]
        UU4[Action Feedback]
        UU5[Detail Modal]
    end
    
    UA1 --> EH1 --> SU1 --> DP1 --> UU1
    UA2 --> EH2 --> SU2 --> UU2
    UA3 --> EH3 --> SU3 --> DP2 --> UU3
    UA4 --> EH4 --> SU4 --> DP3 --> UU4
    UA5 --> EH5 --> SU5 --> DP4 --> UU5
```

---

## 6. Deployment Architecture

### 6.1 Development Environment

```mermaid
graph TB
    subgraph "Development Environment"
        subgraph "Local Development"
            LD1[Developer Workstation]
            LD2[Vite Dev Server]
            LD3[Hot Module Replacement]
            LD4[Local Testing]
        end
        
        subgraph "Development Tools"
            DT1[VS Code]
            DT2[TypeScript Compiler]
            DT3[ESLint]
            DT4[Vitest]
        end
        
        subgraph "Version Control"
            VC1[Git Repository]
            VC2[Branch Management]
            VC3[Pull Requests]
            VC4[Code Review]
        end
    end
    
    subgraph "Build Pipeline"
        subgraph "CI/CD"
            CI1[GitHub Actions]
            CI2[Automated Testing]
            CI3[Build Process]
            CI4[Deployment]
        end
        
        subgraph "Quality Gates"
            QG1[Linting]
            QG2[Type Checking]
            QG3[Unit Tests]
            QG4[Integration Tests]
        end
    end
    
    subgraph "Deployment Targets"
        subgraph "Staging"
            ST1[Staging Server]
            ST2[Preview Environment]
            ST3[User Testing]
        end
        
        subgraph "Production"
            PR1[Production Server]
            PR2[CDN Distribution]
            PR3[Monitoring]
        end
    end
    
    LD1 --> LD2
    LD2 --> LD3
    LD3 --> LD4
    
    LD1 --> DT1
    DT1 --> DT2
    DT2 --> DT3
    DT3 --> DT4
    
    LD4 --> VC1
    VC1 --> VC2
    VC2 --> VC3
    VC3 --> VC4
    
    VC4 --> CI1
    CI1 --> CI2
    CI2 --> CI3
    CI3 --> CI4
    
    CI2 --> QG1
    QG1 --> QG2
    QG2 --> QG3
    QG3 --> QG4
    
    CI4 --> ST1
    ST1 --> ST2
    ST2 --> ST3
    
    ST3 --> PR1
    PR1 --> PR2
    PR2 --> PR3
```

### 6.2 Production Architecture

```mermaid
graph TB
    subgraph "Client Tier"
        CT1[Web Browsers]
        CT2[Mobile Browsers]
        CT3[Progressive Web App]
    end
    
    subgraph "CDN Layer"
        CDN1[Static Assets]
        CDN2[JavaScript Bundles]
        CDN3[CSS Stylesheets]
        CDN4[Images & Icons]
    end
    
    subgraph "Application Layer"
        AL1[React Application]
        AL2[Service Workers]
        AL3[Local Storage]
        AL4[Session Management]
    end
    
    subgraph "API Layer"
        API1[REST APIs]
        API2[WebSocket Connections]
        API3[Authentication APIs]
        API4[Data APIs]
    end
    
    subgraph "Data Layer"
        DL1[Real-time Data Sources]
        DL2[Building Management Systems]
        DL3[IoT Sensor Networks]
        DL4[External Services]
    end
    
    subgraph "Monitoring & Analytics"
        MA1[Application Monitoring]
        MA2[Performance Metrics]
        MA3[Error Tracking]
        MA4[User Analytics]
    end
    
    CT1 --> CDN1
    CT2 --> CDN2
    CT3 --> CDN3
    
    CDN1 --> AL1
    CDN2 --> AL2
    CDN3 --> AL3
    CDN4 --> AL4
    
    AL1 --> API1
    AL2 --> API2
    AL3 --> API3
    AL4 --> API4
    
    API1 --> DL1
    API2 --> DL2
    API3 --> DL3
    API4 --> DL4
    
    AL1 --> MA1
    AL2 --> MA2
    AL3 --> MA3
    AL4 --> MA4
```

---

## 7. Component Dependency Graph

### 7.1 Core Dependencies

```mermaid
graph TD
    subgraph "Application Core"
        APP[App.tsx]
        EB[ErrorBoundary]
        PR[ProtectedRoute]
    end
    
    subgraph "Context Providers"
        AC[AuthContext]
        DC[DataContext]
        QC[QueryClient]
    end
    
    subgraph "Pages"
        IDX[Index.tsx]
        DASH[Dashboard.tsx]
        LB[Leaderboard.tsx]
        ADM[Admin.tsx]
        LOG[Login.tsx]
    end
    
    subgraph "Feature Components"
        EC[EnergyConsumptionCard]
        SC[SustainabilityChart]
        FM[FloorMap]
        APC[AwePointsCard]
        LN[LiveNotifications]
        EIC[EcoImpactCounter]
        ESG[EnergySavingGlobe]
    end
    
    subgraph "UI Components"
        BTN[Button]
        CARD[Card]
        CHART[Chart]
        DIALOG[Dialog]
        TABS[Tabs]
    end
    
    subgraph "Data Sources"
        MD[mockData.ts]
        SD[sustainabilityData.ts]
        CONST[constants.ts]
        LTD[leaderboardTimeData.ts]
    end
    
    subgraph "Hooks & Utils"
        UL[useLeaderboard]
        UT[use-toast]
        UM[use-mobile]
        UTILS[lib/utils.ts]
    end
    
    APP --> EB
    APP --> AC
    APP --> DC
    APP --> QC
    
    AC --> PR
    PR --> DASH
    PR --> LB
    PR --> ADM
    
    DASH --> EC
    DASH --> SC
    DASH --> FM
    DASH --> APC
    DASH --> LN
    
    IDX --> EIC
    IDX --> ESG
    
    EC --> BTN
    SC --> CHART
    FM --> CARD
    APC --> DIALOG
    DASH --> TABS
    
    DC --> MD
    DC --> SD
    DC --> CONST
    LB --> LTD
    
    LB --> UL
    DASH --> UT
    FM --> UM
    EC --> UTILS
```

### 7.2 Testing Dependencies

```mermaid
graph TD
    subgraph "Test Framework"
        VITEST[Vitest]
        RTL[React Testing Library]
        JSDOM[JSDOM]
        SETUP[test/setup.ts]
    end
    
    subgraph "Test Suites"
        S1[Stage1-EnergyTracking-Simple.test.tsx]
        S2[Stage2-CarbonEmissions-Simple.test.tsx]
        S3[Stage3-Gamification-Simple.test.tsx]
        S4[Stage4-ProximityAndAlerts-Simple.test.tsx]
    end
    
    subgraph "Test Categories"
        POSITIVE[Positive Test Cases]
        NEGATIVE[Negative Test Cases]
        EDGE[Edge Test Cases]
    end
    
    subgraph "Mock Data"
        MOCK_USERS[Mock User Data]
        MOCK_ENERGY[Mock Energy Data]
        MOCK_BUILDING[Mock Building Data]
        MOCK_POINTS[Mock Points Data]
    end
    
    VITEST --> RTL
    RTL --> JSDOM
    JSDOM --> SETUP
    
    SETUP --> S1
    SETUP --> S2
    SETUP --> S3
    SETUP --> S4
    
    S1 --> POSITIVE
    S2 --> NEGATIVE
    S3 --> EDGE
    S4 --> POSITIVE
    
    POSITIVE --> MOCK_USERS
    NEGATIVE --> MOCK_ENERGY
    EDGE --> MOCK_BUILDING
    POSITIVE --> MOCK_POINTS
```

---

## 8. Security Architecture

### 8.1 Authentication & Authorization Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant AuthContext
    participant ProtectedRoute
    participant Dashboard
    participant DataContext
    
    User->>Frontend: Access Application
    Frontend->>AuthContext: Check Authentication
    AuthContext-->>Frontend: Not Authenticated
    Frontend->>User: Redirect to Login
    
    User->>Frontend: Submit Credentials
    Frontend->>AuthContext: Authenticate User
    AuthContext->>AuthContext: Validate Credentials
    AuthContext-->>Frontend: Authentication Success
    
    User->>Frontend: Navigate to Dashboard
    Frontend->>ProtectedRoute: Check Access
    ProtectedRoute->>AuthContext: Verify User Role
    AuthContext-->>ProtectedRoute: User Authorized
    ProtectedRoute->>Dashboard: Allow Access
    
    Dashboard->>DataContext: Request User Data
    DataContext->>AuthContext: Verify User Context
    AuthContext-->>DataContext: User Context Valid
    DataContext-->>Dashboard: Return Filtered Data
```

### 8.2 Data Privacy & Security

```mermaid
graph TD
    subgraph "Data Classification"
        PII[Personal Identifiable Information]
        ENERGY[Energy Consumption Data]
        LOCATION[Location Data]
        BEHAVIOR[Behavioral Data]
    end
    
    subgraph "Privacy Controls"
        CONSENT[User Consent]
        ANONYMIZE[Data Anonymization]
        ENCRYPT[Data Encryption]
        ACCESS[Access Controls]
    end
    
    subgraph "Security Measures"
        AUTH[Authentication]
        AUTHZ[Authorization]
        AUDIT[Audit Logging]
        MONITOR[Security Monitoring]
    end
    
    subgraph "Compliance"
        GDPR[GDPR Compliance]
        LOCAL[Local Data Laws]
        CORP[Corporate Policies]
        RETENTION[Data Retention]
    end
    
    PII --> CONSENT
    ENERGY --> ANONYMIZE
    LOCATION --> ENCRYPT
    BEHAVIOR --> ACCESS
    
    CONSENT --> AUTH
    ANONYMIZE --> AUTHZ
    ENCRYPT --> AUDIT
    ACCESS --> MONITOR
    
    AUTH --> GDPR
    AUTHZ --> LOCAL
    AUDIT --> CORP
    MONITOR --> RETENTION
```

---

## 9. Performance Architecture

### 9.1 Frontend Performance Optimization

```mermaid
graph TD
    subgraph "Code Splitting"
        LAZY[Lazy Loading]
        DYNAMIC[Dynamic Imports]
        CHUNKS[Code Chunks]
        PRELOAD[Preloading]
    end
    
    subgraph "State Management"
        CONTEXT[React Context]
        QUERY[TanStack Query]
        CACHE[Query Caching]
        STALE[Stale While Revalidate]
    end
    
    subgraph "Rendering Optimization"
        MEMO[React.memo]
        CALLBACK[useCallback]
        EFFECT[useEffect]
        VIRTUAL[Virtual Scrolling]
    end
    
    subgraph "Asset Optimization"
        BUNDLE[Bundle Splitting]
        COMPRESS[Compression]
        CDN[CDN Distribution]
        CACHE_STATIC[Static Caching]
    end
    
    LAZY --> DYNAMIC
    DYNAMIC --> CHUNKS
    CHUNKS --> PRELOAD
    
    CONTEXT --> QUERY
    QUERY --> CACHE
    CACHE --> STALE
    
    MEMO --> CALLBACK
    CALLBACK --> EFFECT
    EFFECT --> VIRTUAL
    
    BUNDLE --> COMPRESS
    COMPRESS --> CDN
    CDN --> CACHE_STATIC
```

### 9.2 Real-time Data Performance

```mermaid
graph TD
    subgraph "Data Collection"
        SENSORS[IoT Sensors]
        DEVICES[Device APIs]
        BUILDING[Building Systems]
        BATCH[Batch Processing]
    end
    
    subgraph "Data Processing"
        STREAM[Stream Processing]
        AGGREGATE[Data Aggregation]
        FILTER[Data Filtering]
        VALIDATE[Data Validation]
    end
    
    subgraph "Data Delivery"
        WEBSOCKET[WebSocket Connections]
        POLLING[Smart Polling]
        PUSH[Server Push]
        CACHE_LAYER[Caching Layer]
    end
    
    subgraph "UI Updates"
        DEBOUNCE[Debounced Updates]
        THROTTLE[Throttled Rendering]
        BATCH_UI[Batched UI Updates]
        PRIORITY[Priority Updates]
    end
    
    SENSORS --> STREAM
    DEVICES --> AGGREGATE
    BUILDING --> FILTER
    BATCH --> VALIDATE
    
    STREAM --> WEBSOCKET
    AGGREGATE --> POLLING
    FILTER --> PUSH
    VALIDATE --> CACHE_LAYER
    
    WEBSOCKET --> DEBOUNCE
    POLLING --> THROTTLE
    PUSH --> BATCH_UI
    CACHE_LAYER --> PRIORITY
```

---

## 10. Integration Architecture

### 10.1 External System Integration

```mermaid
graph TB
    subgraph "HexSynergy Frontend"
        REACT[React Application]
        CONTEXT[Data Context]
        API[API Layer]
    end
    
    subgraph "Building Management Systems"
        HVAC_SYS[HVAC Systems]
        LIGHTING_SYS[Lighting Control]
        SECURITY_SYS[Security Systems]
        ENERGY_SYS[Energy Meters]
    end
    
    subgraph "IoT Infrastructure"
        PROXIMITY[Proximity Sensors]
        OCCUPANCY[Occupancy Sensors]
        ENVIRONMENT[Environmental Sensors]
        BEACONS[Bluetooth Beacons]
    end
    
    subgraph "Enterprise Systems"
        AD[Active Directory]
        HR_SYS[HR Systems]
        FACILITY[Facility Management]
        REPORTING[Reporting Systems]
    end
    
    subgraph "External Services"
        WEATHER[Weather APIs]
        ENERGY_GRID[Energy Grid Data]
        CARBON[Carbon Footprint APIs]
        MAPS[Mapping Services]
    end
    
    REACT --> CONTEXT
    CONTEXT --> API
    
    API --> HVAC_SYS
    API --> LIGHTING_SYS
    API --> SECURITY_SYS
    API --> ENERGY_SYS
    
    API --> PROXIMITY
    API --> OCCUPANCY
    API --> ENVIRONMENT
    API --> BEACONS
    
    API --> AD
    API --> HR_SYS
    API --> FACILITY
    API --> REPORTING
    
    API --> WEATHER
    API --> ENERGY_GRID
    API --> CARBON
    API --> MAPS
```

### 10.2 Data Integration Flow

```mermaid
sequenceDiagram
    participant Frontend
    participant DataContext
    participant APIGateway
    participant BuildingSystem
    participant IoTSensors
    participant ExternalAPI
    
    Frontend->>DataContext: Request Real-time Data
    DataContext->>APIGateway: Fetch Building Data
    
    APIGateway->>BuildingSystem: Get HVAC Status
    BuildingSystem-->>APIGateway: Return HVAC Data
    
    APIGateway->>IoTSensors: Get Sensor Readings
    IoTSensors-->>APIGateway: Return Sensor Data
    
    APIGateway->>ExternalAPI: Get Weather Data
    ExternalAPI-->>APIGateway: Return Weather Info
    
    APIGateway-->>DataContext: Aggregated Data
    DataContext->>DataContext: Process & Validate
    DataContext-->>Frontend: Real-time Metrics
    
    Frontend->>Frontend: Update UI Components
```

---

## 11. Monitoring & Observability

### 11.1 Application Monitoring

```mermaid
graph TD
    subgraph "Frontend Monitoring"
        PERF[Performance Metrics]
        ERROR[Error Tracking]
        USER[User Analytics]
        VITALS[Core Web Vitals]
    end
    
    subgraph "Real-time Monitoring"
        METRICS[Live Metrics]
        ALERTS[Alert System]
        HEALTH[Health Checks]
        UPTIME[Uptime Monitoring]
    end
    
    subgraph "Data Quality Monitoring"
        ACCURACY[Data Accuracy]
        COMPLETENESS[Data Completeness]
        LATENCY[Data Latency]
        ANOMALY[Anomaly Detection]
    end
    
    subgraph "Business Monitoring"
        ENGAGEMENT[User Engagement]
        ADOPTION[Feature Adoption]
        SUSTAINABILITY[Sustainability KPIs]
        ROI[ROI Metrics]
    end
    
    PERF --> METRICS
    ERROR --> ALERTS
    USER --> HEALTH
    VITALS --> UPTIME
    
    METRICS --> ACCURACY
    ALERTS --> COMPLETENESS
    HEALTH --> LATENCY
    UPTIME --> ANOMALY
    
    ACCURACY --> ENGAGEMENT
    COMPLETENESS --> ADOPTION
    LATENCY --> SUSTAINABILITY
    ANOMALY --> ROI
```

### 11.2 Logging Architecture

```mermaid
graph LR
    subgraph "Log Sources"
        FRONTEND[Frontend Logs]
        API[API Logs]
        SYSTEM[System Logs]
        SECURITY[Security Logs]
    end
    
    subgraph "Log Processing"
        COLLECT[Log Collection]
        PARSE[Log Parsing]
        ENRICH[Log Enrichment]
        FILTER[Log Filtering]
    end
    
    subgraph "Log Storage"
        STRUCTURED[Structured Logs]
        SEARCH[Searchable Index]
        ARCHIVE[Log Archive]
        RETENTION[Retention Policy]
    end
    
    subgraph "Log Analysis"
        DASHBOARD[Log Dashboard]
        ALERTS_LOG[Log Alerts]
        ANALYTICS[Log Analytics]
        REPORTS[Log Reports]
    end
    
    FRONTEND --> COLLECT
    API --> PARSE
    SYSTEM --> ENRICH
    SECURITY --> FILTER
    
    COLLECT --> STRUCTURED
    PARSE --> SEARCH
    ENRICH --> ARCHIVE
    FILTER --> RETENTION
    
    STRUCTURED --> DASHBOARD
    SEARCH --> ALERTS_LOG
    ARCHIVE --> ANALYTICS
    RETENTION --> REPORTS
```

---

## 12. Scalability Architecture

### 12.1 Horizontal Scaling Strategy

```mermaid
graph TB
    subgraph "Load Distribution"
        LB[Load Balancer]
        CDN[Content Delivery Network]
        CACHE[Distributed Cache]
        SESSION[Session Store]
    end
    
    subgraph "Application Scaling"
        APP1[App Instance 1]
        APP2[App Instance 2]
        APP3[App Instance N]
        AUTO[Auto Scaling]
    end
    
    subgraph "Data Scaling"
        READ[Read Replicas]
        SHARD[Data Sharding]
        PARTITION[Data Partitioning]
        ARCHIVE[Data Archiving]
    end
    
    subgraph "Service Scaling"
        MICRO[Microservices]
        QUEUE[Message Queues]
        WORKER[Background Workers]
        ASYNC[Async Processing]
    end
    
    LB --> APP1
    LB --> APP2
    LB --> APP3
    CDN --> CACHE
    CACHE --> SESSION
    
    AUTO --> APP1
    AUTO --> APP2
    AUTO --> APP3
    
    APP1 --> READ
    APP2 --> SHARD
    APP3 --> PARTITION
    READ --> ARCHIVE
    
    MICRO --> QUEUE
    QUEUE --> WORKER
    WORKER --> ASYNC
```

---

**Document Summary**

This Technical Architecture and Functional Architecture document provides comprehensive diagrams covering:

1. **System Overview** - Technology stack and architectural principles
2. **Technical Architecture** - High-level system, component, and data management architectures
3. **Functional Architecture** - Energy monitoring, gamification, and smart building systems
4. **Component Interactions** - Sequence diagrams showing system flows
5. **Data Flow** - Real-time data processing and user interaction flows
6. **Deployment** - Development and production deployment architectures
7. **Security** - Authentication, authorization, and data privacy
8. **Performance** - Optimization strategies and real-time data handling
9. **Integration** - External system connections and data flows
10. **Monitoring** - Observability and logging strategies
11. **Scalability** - Horizontal scaling and growth strategies

All diagrams are based on the actual HexSynergy codebase structure and reflect the real implementation using React 18.3.1, TypeScript, Vite, shadcn/ui, and the specific components found in the project.

---

**© 2025 Hexaware Technologies - HexSynergy Project**  
**Prepared by EcoFuelers Development Team**  
**"Code for a Greener Future"**
