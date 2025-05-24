// Unified data constants for the entire application
// This file serves as the single source of truth for all static data

export const DEPARTMENTS = [
  "HR",
  "Admin", 
  "STG",
  "IG",
  "QMG",
  "STEP",
  "Gen AI",
  "RapidX",
  "Software Development",
  "Quality Assurance",
  "Cloud"
] as const;

export type Department = typeof DEPARTMENTS[number];

export const BUILDINGS = [
  "Building A",
  "Building B", 
  "Building C",
  "Building D"
] as const;

export type Building = typeof BUILDINGS[number];

export const FLOORS = [
  "Floor 1",
  "Floor 2",
  "Floor 3", 
  "Floor 4"
] as const;

export type Floor = typeof FLOORS[number];

export const BUILDING_DISPLAY_NAMES = {
  "Building A": "Chennai Main",
  "Building B": "Mumbai Office",
  "Building C": "Bengaluru Tech", 
  "Building D": "Hyderabad Dev"
} as const;

export const USER_ROLES = ["admin", "user"] as const;
export type UserRole = typeof USER_ROLES[number];

// South Indian names for consistent employee generation
export const SOUTH_INDIAN_NAMES = [
  "Aravind Swaminathan", "Priya Lakshmi", "Karthik Narayanan", "Deepa Sundaram", 
  "Vignesh Ramachandran", "Anjali Menon", "Sundar Ramanathan", "Kavitha Krishnan", 
  "Ganesh Iyer", "Divya Subramaniam", "Rajesh Venkatesh", "Meenakshi Gopal",
  "Vijay Shankar", "Lalitha Chandran", "Prakash Nair", "Shanti Balasubramaniam", 
  "Murali Krishnan", "Lakshmi Raman", "Srinivas Iyengar", "Radha Venkat",
  "Anand Padmanabhan", "Saranya Krishnamoorthy", "Bala Murugan", "Gayatri Sundaresan",
  "Harish Chandran", "Indira Nataraj", "Mohan Venkataraman", "Nithya Balakrishnan",
  "Prem Kumar", "Revathi Suresh", "Sathish Kumar", "Uma Shankar", 
  "Ramesh Subramanian", "Jaya Rajagopal", "Gopal Venkatraman", "Chitra Narayan",
  "Ravi Chandrasekhar", "Sudha Parthasarathy", "Balaji Krishnan", "Padma Rangan",
  "Venkat Raghavan", "Sujatha Anand", "Arjun Sundaresan", "Saraswati Ranganathan",
  "Vasanth Kumar", "Bhavani Ramesh", "Suresh Natarajan", "Janaki Balasubramanian",
  "Raghu Nair", "Latha Iyer", "Ashok Menon", "Usha Ramachandran"
] as const;

// Months for 2025
export const MONTHS_2025 = [
  "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025",
  "Jun 2025", "Jul 2025", "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025"
] as const;

// Department-specific energy usage patterns
export const DEPARTMENT_ENERGY_PATTERNS = {
  "HR": { laptop: 0.9, ac: 1.1, lighting: 1.0 },
  "Admin": { laptop: 1.0, ac: 1.2, lighting: 1.1 },
  "STG": { laptop: 1.3, ac: 1.0, lighting: 0.9 },
  "IG": { laptop: 1.2, ac: 0.9, lighting: 0.8 },
  "QMG": { laptop: 1.0, ac: 1.0, lighting: 1.0 },
  "STEP": { laptop: 1.1, ac: 0.8, lighting: 0.9 },
  "Gen AI": { laptop: 1.5, ac: 1.1, lighting: 0.9 },
  "RapidX": { laptop: 1.4, ac: 1.0, lighting: 0.9 },
  "Software Development": { laptop: 1.4, ac: 1.0, lighting: 1.0 },
  "Quality Assurance": { laptop: 1.2, ac: 1.0, lighting: 1.0 },
  "Cloud": { laptop: 1.3, ac: 1.1, lighting: 0.9 }
} as const;

// Floor efficiency factors
export const FLOOR_EFFICIENCY_FACTORS = {
  "Floor 1": 1.2,
  "Floor 2": 0.9,
  "Floor 3": 1.0,
  "Floor 4": 1.1
} as const;

// Building cluster patterns for employee positioning
export const BUILDING_CLUSTER_PATTERNS = {
  "Building A": [
    { x: 25, y: 25, size: 10 },
    { x: 75, y: 25, size: 15 },
    { x: 50, y: 75, size: 20 }
  ],
  "Building B": [
    { x: 20, y: 30, size: 15 },
    { x: 60, y: 40, size: 12 },
    { x: 80, y: 80, size: 18 }
  ],
  "Building C": [
    { x: 30, y: 20, size: 12 },
    { x: 50, y: 50, size: 20 },
    { x: 70, y: 20, size: 15 }
  ],
  "Building D": [
    { x: 25, y: 75, size: 18 },
    { x: 75, y: 75, size: 12 },
    { x: 50, y: 25, size: 15 }
  ]
} as const;

// Application configuration
export const APP_CONFIG = {
  EMPLOYEES_PER_FLOOR: 50,
  TOTAL_FLOORS: 4,
  TOTAL_BUILDINGS: 4,
  REAL_TIME_UPDATE_INTERVAL: 10000, // 10 seconds
  ANIMATION_DURATION: 300,
  MAX_ENERGY_CONSUMPTION: 10,
  MIN_ENERGY_CONSUMPTION: 2,
  MAX_AWE_POINTS: 3000,
  MIN_AWE_POINTS: 100
} as const;

// Status types
export const BUILDING_STATUS = ["Needs Improvement", "Good", "Excellent"] as const;
export type BuildingStatus = typeof BUILDING_STATUS[number];

export const TREND_TYPES = ["up", "down", "stable"] as const;
export type TrendType = typeof TREND_TYPES[number];

// Initiative icons
export const INITIATIVE_ICONS = ["Leaf", "Globe", "TreeDeciduous", "Wind"] as const;
export type InitiativeIcon = typeof INITIATIVE_ICONS[number];

// Validation helpers
export const isValidDepartment = (dept: string): dept is Department => {
  return DEPARTMENTS.includes(dept as Department);
};

export const isValidBuilding = (building: string): building is Building => {
  return BUILDINGS.includes(building as Building);
};

export const isValidFloor = (floor: string): floor is Floor => {
  return FLOORS.includes(floor as Floor);
};

export const isValidUserRole = (role: string): role is UserRole => {
  return USER_ROLES.includes(role as UserRole);
};

// Safe array access helpers
export const getRandomFromArray = <T>(array: readonly T[]): T => {
  if (array.length === 0) {
    throw new Error("Cannot get random element from empty array");
  }
  return array[Math.floor(Math.random() * array.length)];
};

export const safeArrayAccess = <T>(array: readonly T[], index: number): T | undefined => {
  return array[index];
};
