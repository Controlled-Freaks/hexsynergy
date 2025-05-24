
import { Leaf, Globe, TreeDeciduous, Wind } from 'lucide-react';
import React from 'react';

// Create an interface for building statistics
export interface BuildingStatistics {
  name: string;
  score: number;
  improvement: number;
  co2Reduction: number;
  status: 'Needs Improvement' | 'Good' | 'Excellent';
}

// Create an interface for initiative data
export interface Initiative {
  title: string;
  description: string;
  icon: 'Leaf' | 'Globe' | 'TreeDeciduous' | 'Wind';
  progress: number;
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
}

// Generate building statistics
const generateBuildingStats = (): BuildingStatistics[] => {
  const buildings = ['Chennai Main', 'Mumbai Office', 'Bengaluru Tech', 'Hyderabad Dev'];
  
  return buildings.map(name => {
    const score = Math.floor(Math.random() * 30) + 70; // 70-99
    const improvement = Math.floor(Math.random() * 15) + 1; // 1-15
    const co2Reduction = Math.floor(Math.random() * 200) + 100; // 100-299
    
    let status: 'Needs Improvement' | 'Good' | 'Excellent';
    if (score > 90) {
      status = 'Excellent';
    } else if (score > 80) {
      status = 'Good';
    } else {
      status = 'Needs Improvement';
    }
    
    return {
      name,
      score,
      improvement,
      co2Reduction,
      status
    };
  });
};

// Generate green initiatives
const generateInitiatives = (): Initiative[] => {
  const initiatives: Initiative[] = [
    {
      title: "Zero-Water Discharge",
      description: "Our Chennai campus operates with zero-water discharge policy, recycling 100% of wastewater.",
      icon: "Globe",
      progress: 87
    },
    {
      title: "Renewable Energy",
      description: "Transitioning 96% of our Chennai campus energy needs to green power sources.",
      icon: "Wind",
      progress: 96
    },
    {
      title: "Urban Reforestation",
      description: "Planting 10,000 trees as part of our commitment to urban reforestation.",
      icon: "TreeDeciduous",
      progress: 85
    },
    {
      title: "Digital Optimization",
      description: "Digital solutions to reduce paper usage by 90% across all operations.",
      icon: "Leaf",
      progress: 78
    }
  ];
  
  return initiatives;
};

// Generate department energy data
const generateDepartmentData = () => {
  const departments = [
    "HR", "Admin", "STG", "IG", "QMG", "STEP", 
    "Gen AI", "RapidX", "Software Development"
  ];
  
  return departments.map(name => {
    const energyScore = Math.floor(Math.random() * 30) + 70; // 70-99
    const energyConsumption = Math.floor(Math.random() * 5000) + 10000; // 10000-14999
    const savings = Math.floor(Math.random() * 2000) + 500; // 500-2499
    
    const trends = ['up', 'down', 'stable'] as ('up' | 'down' | 'stable')[];
    const trend = trends[Math.floor(Math.random() * trends.length)];
    
    return {
      name,
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
  
  const result = [];
  
  for (const building of buildings) {
    for (const floor of floors) {
      // Generate a downward trend for each floor (energy consumption reducing over time)
      const startUsage = Math.floor(Math.random() * 5000) + 10000; // 10000-14999
      const reductionRate = (Math.random() * 0.03) + 0.01; // 1-4% reduction per month
      
      const energyUsage = months.map((month, index) => {
        // Calculate reducing usage with some random fluctuation
        const reduction = Math.pow(1 - reductionRate, index);
        const baseUsage = startUsage * reduction;
        const fluctuation = baseUsage * (Math.random() * 0.1 - 0.05); // ±5% fluctuation
        
        return {
          month,
          usage: Math.round(baseUsage + fluctuation)
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

// Compile all statistics
export const sustainabilityStatistics: SustainabilityStatistics = {
  buildings: generateBuildingStats(),
  initiatives: generateInitiatives(),
  departments: generateDepartmentData(),
  floors: generateFloorData()
};
