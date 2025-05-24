
import { Leaf, Globe, TreeDeciduous, Wind, Recycle, Lightbulb } from 'lucide-react';
import React from 'react';

// Create an interface for building statistics
export interface BuildingStatistics {
  id: string;
  name: string;
  score: number;
  improvement: number;
  co2Reduction: number;
  status: 'Needs Improvement' | 'Good' | 'Excellent';
  energySources: {
    solar: number;
    wind: number;
    conventional: number;
  };
  waterSaved: number;
}

// Create an interface for initiative data
export interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: 'Leaf' | 'Globe' | 'TreeDeciduous' | 'Wind' | 'Recycle' | 'Lightbulb';
  progress: number;
  impact: {
    co2Reduced: number;
    energySaved: number;
    waterConserved: number;
  };
  timeline: {
    start: string;
    estimatedCompletion: string;
  };
}

// Create the main sustainability statistics object
interface SustainabilityStatistics {
  buildings: BuildingStatistics[];
  initiatives: Initiative[];
  departments: {
    name: string;
    energyScore: number;
    energyConsumption: number;
    savings: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  floors: {
    buildingId: string;
    floorName: string;
    energyUsage: {
      month: string;
      usage: number;
    }[];
  }[];
  recentAchievements: {
    title: string;
    date: string;
    description: string;
    impact: number;
    unit: string;
  }[];
}

// Generate building statistics
const generateBuildingStats = (): BuildingStatistics[] => {
  const buildingData = [
    { 
      id: 'building-a',
      name: 'Chennai Main', 
      baseScore: 95,
      baseImprovement: 12,
      baseCo2Reduction: 280,
      baseWaterSaved: 1250000,
      energySources: { solar: 45, wind: 40, conventional: 15 }
    },
    { 
      id: 'building-b',
      name: 'Mumbai Office', 
      baseScore: 84,
      baseImprovement: 8,
      baseCo2Reduction: 210,
      baseWaterSaved: 980000,
      energySources: { solar: 30, wind: 35, conventional: 35 }
    },
    { 
      id: 'building-c',
      name: 'Bengaluru Tech', 
      baseScore: 78,
      baseImprovement: 15,
      baseCo2Reduction: 180,
      baseWaterSaved: 845000,
      energySources: { solar: 50, wind: 25, conventional: 25 }
    },
    { 
      id: 'building-d',
      name: 'Hyderabad Dev', 
      baseScore: 88,
      baseImprovement: 9,
      baseCo2Reduction: 240,
      baseWaterSaved: 1100000,
      energySources: { solar: 40, wind: 35, conventional: 25 }
    }
  ];
  
  return buildingData.map(building => {
    // Add slight random variations to make data feel more realistic
    const randomFactor = 0.95 + (Math.random() * 0.1); // 0.95-1.05 random multiplier
    const score = Math.min(99, Math.floor(building.baseScore * randomFactor));
    const improvement = Math.floor(building.baseImprovement * randomFactor);
    const co2Reduction = Math.floor(building.baseCo2Reduction * randomFactor);
    const waterSaved = Math.floor(building.baseWaterSaved * randomFactor);
    
    let status: 'Needs Improvement' | 'Good' | 'Excellent';
    if (score > 90) {
      status = 'Excellent';
    } else if (score > 80) {
      status = 'Good';
    } else {
      status = 'Needs Improvement';
    }
    
    return {
      id: building.id,
      name: building.name,
      score,
      improvement,
      co2Reduction,
      status,
      energySources: building.energySources,
      waterSaved
    };
  });
};

// Generate green initiatives
const generateInitiatives = (): Initiative[] => {
  const initiatives: Initiative[] = [
    {
      id: 'initiative-1',
      title: "Zero-Water Discharge",
      description: "Our Chennai campus operates with zero-water discharge policy, recycling 100% of wastewater.",
      icon: "Globe",
      progress: 87,
      impact: {
        co2Reduced: 125,
        energySaved: 45000,
        waterConserved: 8500000
      },
      timeline: {
        start: "Jan 2025",
        estimatedCompletion: "Sep 2025"
      }
    },
    {
      id: 'initiative-2',
      title: "Renewable Energy",
      description: "Transitioning 96% of our Chennai campus energy needs to green power sources.",
      icon: "Wind",
      progress: 96,
      impact: {
        co2Reduced: 1450,
        energySaved: 3200000,
        waterConserved: 0
      },
      timeline: {
        start: "Nov 2024",
        estimatedCompletion: "Jul 2025"
      }
    },
    {
      id: 'initiative-3',
      title: "Urban Reforestation",
      description: "Planting 10,000 trees as part of our commitment to urban reforestation.",
      icon: "TreeDeciduous",
      progress: 85,
      impact: {
        co2Reduced: 850,
        energySaved: 0,
        waterConserved: 1250000
      },
      timeline: {
        start: "Feb 2025",
        estimatedCompletion: "Dec 2025"
      }
    },
    {
      id: 'initiative-4',
      title: "Digital Optimization",
      description: "Digital solutions to reduce paper usage by 90% across all operations.",
      icon: "Leaf",
      progress: 78,
      impact: {
        co2Reduced: 320,
        energySaved: 180000,
        waterConserved: 3500000
      },
      timeline: {
        start: "Mar 2025",
        estimatedCompletion: "Oct 2025"
      }
    },
    {
      id: 'initiative-5',
      title: "Waste Management",
      description: "Implementing comprehensive waste segregation and recycling across all facilities.",
      icon: "Recycle",
      progress: 65,
      impact: {
        co2Reduced: 580,
        energySaved: 250000,
        waterConserved: 0
      },
      timeline: {
        start: "Apr 2025",
        estimatedCompletion: "Nov 2025"
      }
    },
    {
      id: 'initiative-6',
      title: "Smart Lighting",
      description: "AI-powered lighting systems that adjust based on occupancy and natural light.",
      icon: "Lightbulb",
      progress: 72,
      impact: {
        co2Reduced: 410,
        energySaved: 720000,
        waterConserved: 0
      },
      timeline: {
        start: "Jan 2025",
        estimatedCompletion: "Aug 2025"
      }
    }
  ];
  
  return initiatives;
};

// Generate department energy data
const generateDepartmentData = () => {
  const departments = [
    { name: "HR", baseScore: 76, baseConsumption: 12400, baseSavings: 950 },
    { name: "Admin", baseScore: 83, baseConsumption: 11800, baseSavings: 1250 },
    { name: "STG", baseScore: 91, baseConsumption: 13500, baseSavings: 1850 },
    { name: "IG", baseScore: 85, baseConsumption: 12200, baseSavings: 1350 },
    { name: "QMG", baseScore: 79, baseConsumption: 11000, baseSavings: 980 },
    { name: "STEP", baseScore: 94, baseConsumption: 10500, baseSavings: 2100 },
    { name: "Gen AI", baseScore: 88, baseConsumption: 14500, baseSavings: 1620 },
    { name: "RapidX", baseScore: 81, baseConsumption: 12800, baseSavings: 1180 },
    { name: "Software Development", baseScore: 87, baseConsumption: 13200, baseSavings: 1540 }
  ];
  
  return departments.map(dept => {
    // Add slight random variations
    const randomFactor = 0.95 + (Math.random() * 0.1); // 0.95-1.05 random multiplier
    const energyScore = Math.min(99, Math.floor(dept.baseScore * randomFactor));
    const energyConsumption = Math.floor(dept.baseConsumption * randomFactor);
    const savings = Math.floor(dept.baseSavings * randomFactor);
    
    // Determine trend based on score improvement
    const trendValue = Math.random();
    let trend: 'up' | 'down' | 'stable';
    if (trendValue > 0.65) trend = 'up';
    else if (trendValue > 0.3) trend = 'stable';
    else trend = 'down';
    
    return {
      name: dept.name,
      energyScore,
      energyConsumption,
      savings,
      trend
    };
  });
};

// Generate floor energy usage data
const generateFloorData = () => {
  const buildings = ['building-a', 'building-b', 'building-c', 'building-d'];
  const floors = ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'];
  const months = [
    'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025',
    'Jun 2025', 'Jul 2025', 'Aug 2025'
  ];
  
  // Building-specific baseline usage patterns (kWh per month)
  const buildingBaseUsages = {
    'building-a': 12500,
    'building-b': 11000,
    'building-c': 13500,
    'building-d': 10000
  };
  
  // Floor-specific efficiency factors (relative to building baseline)
  const floorEfficiencyFactors = {
    'Floor 1': 1.2,  // 20% higher usage (less efficient)
    'Floor 2': 0.85, // 15% lower usage (more efficient)
    'Floor 3': 1.05, // 5% higher usage
    'Floor 4': 0.95  // 5% lower usage
  };
  
  const result = [];
  
  for (const building of buildings) {
    const buildingBaseUsage = buildingBaseUsages[building as keyof typeof buildingBaseUsages];
    
    for (const floor of floors) {
      const floorFactor = floorEfficiencyFactors[floor as keyof typeof floorEfficiencyFactors];
      const floorBaseUsage = buildingBaseUsage * floorFactor;
      
      // Generate a downward trend for each floor (energy consumption reducing over time)
      // Different reduction rates for different buildings and floors
      const reductionRate = (Math.random() * 0.03) + 0.01; // 1-4% reduction per month
      
      const energyUsage = months.map((month, index) => {
        // Calculate reducing usage with some random fluctuation
        const reduction = Math.pow(1 - reductionRate, index);
        const baseUsage = floorBaseUsage * reduction;
        
        // Seasonal adjustments (higher in summer months)
        const seasonalFactor = index >= 4 && index <= 5 ? 1.15 : 1.0;
        
        // Random daily fluctuation
        const fluctuation = baseUsage * (Math.random() * 0.1 - 0.05); // ±5% fluctuation
        
        return {
          month,
          usage: Math.round(baseUsage * seasonalFactor + fluctuation)
        };
      });
      
      result.push({
        buildingId: building,
        floorName: floor,
        energyUsage
      });
    }
  }
  
  return result;
};

// Generate recent achievements
const generateRecentAchievements = () => {
  return [
    {
      title: "Solar Panel Installation",
      date: "Apr 2025",
      description: "Completed installation of additional solar panels on Chennai campus",
      impact: 125,
      unit: "kW capacity"
    },
    {
      title: "Water Recycling",
      date: "Mar 2025",
      description: "New water recycling system operational in Mumbai office",
      impact: 4250000,
      unit: "liters per year"
    },
    {
      title: "Tree Planting Initiative",
      date: "Feb 2025",
      description: "Planted 2,500 trees in Bengaluru tech park area",
      impact: 2500,
      unit: "trees planted"
    },
    {
      title: "Carbon Neutrality",
      date: "May 2025",
      description: "Hyderabad office achieved carbon neutrality",
      impact: 100,
      unit: "% carbon neutral"
    }
  ];
};

// Compile all statistics
export const sustainabilityStatistics: SustainabilityStatistics = {
  buildings: generateBuildingStats(),
  initiatives: generateInitiatives(),
  departments: generateDepartmentData(),
  floors: generateFloorData(),
  recentAchievements: generateRecentAchievements()
};
