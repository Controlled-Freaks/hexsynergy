import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sustainabilityStatistics } from '@/data/sustainabilityData';
import { allEmployees, getEnergyConsumptionTrend, getDepartmentEnergyStats } from '@/data/mockData';

interface RealTimeMetrics {
  totalEnergyConsumption: number;
  co2Reduction: number;
  renewableEnergyPercentage: number;
  treesPlanted: number;
  waterSaved: number;
  lastUpdated: Date;
  // New real-time metrics
  currentPowerUsage: number; // kW
  peakPowerToday: number; // kW
  averageTemperature: number; // °C
  activeEmployees: number;
  energyEfficiencyScore: number; // 0-100
  costSavingsToday: number; // ₹
  carbonFootprintReduction: number; // %
  solarPanelOutput: number; // kW
  windEnergyOutput: number; // kW
  batteryLevel: number; // %
  airQualityIndex: number; // 0-500
  waterUsageToday: number; // L
}

interface DataContextType {
  realTimeMetrics: RealTimeMetrics;
  sustainabilityStats: typeof sustainabilityStatistics;
  employees: typeof allEmployees;
  energyTrends: ReturnType<typeof getEnergyConsumptionTrend>;
  departmentStats: ReturnType<typeof getDepartmentEnergyStats>;
  refreshData: () => void;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    totalEnergyConsumption: 6350000,
    co2Reduction: 2800,
    renewableEnergyPercentage: 96,
    treesPlanted: 8500,
    waterSaved: 42000000,
    lastUpdated: new Date(),
    // Initialize new real-time metrics
    currentPowerUsage: 1250,
    peakPowerToday: 1850,
    averageTemperature: 24.5,
    activeEmployees: 342,
    energyEfficiencyScore: 87,
    costSavingsToday: 15420,
    carbonFootprintReduction: 23.8,
    solarPanelOutput: 450,
    windEnergyOutput: 320,
    batteryLevel: 78,
    airQualityIndex: 42,
    waterUsageToday: 8750
  });

  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        totalEnergyConsumption: prev.totalEnergyConsumption + Math.floor(Math.random() * 1000) - 500,
        co2Reduction: Math.max(0, prev.co2Reduction + Math.floor(Math.random() * 10) - 5),
        renewableEnergyPercentage: Math.min(100, Math.max(90, prev.renewableEnergyPercentage + (Math.random() - 0.5))),
        treesPlanted: prev.treesPlanted + Math.floor(Math.random() * 5),
        waterSaved: prev.waterSaved + Math.floor(Math.random() * 10000) - 5000,
        // Update new real-time metrics
        currentPowerUsage: Math.max(800, Math.min(2000, prev.currentPowerUsage + Math.floor(Math.random() * 100) - 50)),
        peakPowerToday: Math.max(prev.peakPowerToday, prev.currentPowerUsage),
        averageTemperature: Math.max(20, Math.min(28, prev.averageTemperature + (Math.random() - 0.5) * 0.5)),
        activeEmployees: Math.max(200, Math.min(500, prev.activeEmployees + Math.floor(Math.random() * 20) - 10)),
        energyEfficiencyScore: Math.max(70, Math.min(100, prev.energyEfficiencyScore + Math.floor(Math.random() * 6) - 3)),
        costSavingsToday: prev.costSavingsToday + Math.floor(Math.random() * 500),
        carbonFootprintReduction: Math.max(15, Math.min(35, prev.carbonFootprintReduction + (Math.random() - 0.5) * 2)),
        solarPanelOutput: Math.max(200, Math.min(600, prev.solarPanelOutput + Math.floor(Math.random() * 50) - 25)),
        windEnergyOutput: Math.max(100, Math.min(500, prev.windEnergyOutput + Math.floor(Math.random() * 40) - 20)),
        batteryLevel: Math.max(20, Math.min(100, prev.batteryLevel + Math.floor(Math.random() * 10) - 5)),
        airQualityIndex: Math.max(25, Math.min(80, prev.airQualityIndex + Math.floor(Math.random() * 10) - 5)),
        waterUsageToday: prev.waterUsageToday + Math.floor(Math.random() * 200),
        lastUpdated: new Date()
      }));
    }, 10000); // Update every 10 seconds for more dynamic feel

    return () => clearInterval(interval);
  }, []);

  // Get synchronized data
  const energyTrends = getEnergyConsumptionTrend('Building A', 'Floor 1');
  const departmentStats = getDepartmentEnergyStats();

  const refreshData = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update metrics with fresh data
    setRealTimeMetrics(prev => ({
      ...prev,
      totalEnergyConsumption: 6350000 + Math.floor(Math.random() * 100000) - 50000,
      co2Reduction: 2800 + Math.floor(Math.random() * 200) - 100,
      renewableEnergyPercentage: 96 + Math.floor(Math.random() * 8) - 4,
      treesPlanted: 8500 + Math.floor(Math.random() * 100),
      waterSaved: 42000000 + Math.floor(Math.random() * 1000000) - 500000,
      lastUpdated: new Date()
    }));
    
    setIsLoading(false);
  };

  const contextValue: DataContextType = {
    realTimeMetrics,
    sustainabilityStats: sustainabilityStatistics,
    employees: allEmployees,
    energyTrends,
    departmentStats,
    refreshData,
    isLoading
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
