// Mock data for different time periods
export const timeBasedMultipliers = {
  weekly: {
    multiplier: 0.25, // 25% of total points for weekly
    description: "This Week",
    dateRange: "Dec 16-22, 2024"
  },
  monthly: {
    multiplier: 1.0, // 100% of total points for monthly (base)
    description: "This Month", 
    dateRange: "December 2024"
  },
  quarterly: {
    multiplier: 2.8, // 280% of total points for quarterly
    description: "Q4 2024",
    dateRange: "Oct-Dec 2024"
  },
  yearly: {
    multiplier: 4.2, // 420% of total points for yearly
    description: "2024",
    dateRange: "Jan-Dec 2024"
  }
};

// Additional achievements that unlock over time
export const timeBasedAchievements = {
  weekly: ["Energy Saver", "Dark Mode Master"],
  monthly: ["Energy Saver", "Dark Mode Master", "Proximity Pro", "Efficient Worker"],
  quarterly: ["Energy Saver", "Dark Mode Master", "Proximity Pro", "Efficient Worker", "Fitness Champion"],
  yearly: ["Energy Saver", "Dark Mode Master", "Proximity Pro", "Efficient Worker", "Fitness Champion", "Sustainability Hero", "Eco Champion", "Green Leader"]
};

// Seasonal variations for different time periods
export const seasonalVariations = {
  weekly: {
    // Recent week - some employees might be on leave or working from home
    absenceRate: 0.15, // 15% might have lower activity
    variationFactor: 0.8 // More variation in weekly data
  },
  monthly: {
    // Current month - normal activity
    absenceRate: 0.05, // 5% might have lower activity
    variationFactor: 1.0 // Base variation
  },
  quarterly: {
    // Quarter includes holidays, projects, etc.
    absenceRate: 0.08, // 8% might have lower activity
    variationFactor: 1.2 // More consistent over quarter
  },
  yearly: {
    // Full year - most consistent data
    absenceRate: 0.03, // 3% might have lower activity
    variationFactor: 1.5 // Most consistent over year
  }
};

// Time-based ranking adjustments
export const timeBasedRankingAdjustments = {
  weekly: {
    // Weekly rankings might be more volatile
    rankingVolatility: 0.3,
    newEntrants: 0.1 // 10% chance of new people in top rankings
  },
  monthly: {
    // Monthly rankings are more stable
    rankingVolatility: 0.15,
    newEntrants: 0.05 // 5% chance of new people in top rankings
  },
  quarterly: {
    // Quarterly rankings show trends
    rankingVolatility: 0.1,
    newEntrants: 0.03 // 3% chance of new people in top rankings
  },
  yearly: {
    // Yearly rankings are most stable
    rankingVolatility: 0.05,
    newEntrants: 0.01 // 1% chance of new people in top rankings
  }
};

// Generate time-specific employee data
export const generateTimeBasedEmployeeData = (baseEmployees: any[], timeFilter: string) => {
  const config = timeBasedMultipliers[timeFilter as keyof typeof timeBasedMultipliers];
  const seasonal = seasonalVariations[timeFilter as keyof typeof seasonalVariations];
  const achievements = timeBasedAchievements[timeFilter as keyof typeof timeBasedAchievements];
  
  if (!config) return baseEmployees;

  return baseEmployees.map(employee => {
    // Apply time-based multiplier with some randomization
    const basePoints = employee.awePoints;
    const timeMultiplier = config.multiplier;
    const randomVariation = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2 variation
    const seasonalImpact = Math.random() > seasonal.absenceRate ? 1 : 0.3; // Some employees less active
    
    const adjustedPoints = Math.round(basePoints * timeMultiplier * randomVariation * seasonalImpact);
    
    // Adjust achievements based on time period
    const availableAchievements = achievements;
    const employeeAchievements = [];
    
    if (employee.energySaving && availableAchievements.includes("Energy Saver")) {
      employeeAchievements.push("Energy Saver");
    }
    if (employee.darkMode && availableAchievements.includes("Dark Mode Master")) {
      employeeAchievements.push("Dark Mode Master");
    }
    if (employee.seatingOptimized && availableAchievements.includes("Proximity Pro")) {
      employeeAchievements.push("Proximity Pro");
    }
    if (employee.stairUse > employee.elevatorUse && availableAchievements.includes("Fitness Champion")) {
      employeeAchievements.push("Fitness Champion");
    }
    if (employee.deviceUsage.laptop < 6 && availableAchievements.includes("Efficient Worker")) {
      employeeAchievements.push("Efficient Worker");
    }
    if (adjustedPoints > 2000 && availableAchievements.includes("Sustainability Hero")) {
      employeeAchievements.push("Sustainability Hero");
    }
    if (adjustedPoints > 3000 && availableAchievements.includes("Eco Champion")) {
      employeeAchievements.push("Eco Champion");
    }
    if (adjustedPoints > 4000 && availableAchievements.includes("Green Leader")) {
      employeeAchievements.push("Green Leader");
    }

    return {
      ...employee,
      awePoints: Math.max(50, adjustedPoints), // Minimum 50 points
      timeBasedAchievements: employeeAchievements,
      timeFilter,
      timePeriod: config.description,
      dateRange: config.dateRange
    };
  });
};

// Get time period display info
export const getTimePeriodInfo = (timeFilter: string) => {
  const config = timeBasedMultipliers[timeFilter as keyof typeof timeBasedMultipliers];
  return config || timeBasedMultipliers.monthly;
};
