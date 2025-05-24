import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDataContext } from "@/contexts/DataContext";
import { DEPARTMENTS } from "@/data/constants";
import { generateTimeBasedEmployeeData, getTimePeriodInfo, timeBasedAchievements } from "@/data/leaderboardTimeData";

export const useLeaderboard = () => {
  const { user } = useAuth();
  const { employees } = useDataContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [activeTab, setActiveTab] = useState("individual");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Apply time-based filtering to employees
  const timeFilteredEmployees = useMemo(() => {
    return generateTimeBasedEmployeeData(employees, timeFilter);
  }, [employees, timeFilter]);

  // Generate filtered employee data
  const filteredEmployees = useMemo(() => {
    let filtered = timeFilteredEmployees;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filter
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }

    return filtered.sort((a, b) => b.awePoints - a.awePoints);
  }, [timeFilteredEmployees, searchTerm, selectedDepartment]);

  // Generate leaderboard data with pagination
  const leaderboardData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return filteredEmployees
      .slice(startIndex, endIndex)
      .map((employee, index) => {
        const globalIndex = startIndex + index;
        const rank = employee.awePoints > 1500 ? "Platinum" :
                    employee.awePoints > 1000 ? "Gold" : 
                    employee.awePoints > 600 ? "Silver" : "Bronze";
        
        // Use time-based achievements if available, otherwise fall back to regular logic
        const achievements = employee.timeBasedAchievements || [];
        if (achievements.length === 0) {
          // Fallback to original achievement logic
          if (employee.energySaving) achievements.push("Energy Saver");
          if (employee.darkMode) achievements.push("Dark Mode Master");
          if (employee.seatingOptimized) achievements.push("Proximity Pro");
          if (employee.stairUse > employee.elevatorUse) achievements.push("Fitness Champion");
          if (employee.deviceUsage.laptop < 6) achievements.push("Efficient Worker");
          if (employee.awePoints > 2000) achievements.push("Sustainability Hero");
        }
        
        const nameSlug = employee.name.toLowerCase().replace(/\s+/g, '');
        
        return {
          id: globalIndex + 1,
          name: employee.name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nameSlug}`,
          department: employee.department,
          building: employee.building,
          floor: employee.floor,
          points: employee.awePoints,
          rank,
          increase: Math.floor(Math.random() * 100) + 20,
          achievements,
          isCurrentUser: user?.name === employee.name,
          energySaving: employee.energySaving,
          darkMode: employee.darkMode,
          seatingOptimized: employee.seatingOptimized,
          deviceUsage: employee.deviceUsage,
          timePeriod: employee.timePeriod,
          dateRange: employee.dateRange
        };
      });
  }, [filteredEmployees, currentPage, itemsPerPage, user]);

  // Get top 3 for podium (always from filtered data)
  const topThree = useMemo(() => {
    return filteredEmployees.slice(0, 3).map((employee, index) => {
      const rank = employee.awePoints > 1500 ? "Platinum" :
                  employee.awePoints > 1000 ? "Gold" : 
                  employee.awePoints > 600 ? "Silver" : "Bronze";
      
      // Use time-based achievements if available
      const achievements = employee.timeBasedAchievements || [];
      if (achievements.length === 0) {
        // Fallback to original achievement logic
        if (employee.energySaving) achievements.push("Energy Saver");
        if (employee.darkMode) achievements.push("Dark Mode Master");
        if (employee.seatingOptimized) achievements.push("Proximity Pro");
        if (employee.stairUse > employee.elevatorUse) achievements.push("Fitness Champion");
        if (employee.deviceUsage.laptop < 6) achievements.push("Efficient Worker");
        if (employee.awePoints > 2000) achievements.push("Sustainability Hero");
      }
      
      const nameSlug = employee.name.toLowerCase().replace(/\s+/g, '');
      
      return {
        id: index + 1,
        name: employee.name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nameSlug}`,
        department: employee.department,
        building: employee.building,
        floor: employee.floor,
        points: employee.awePoints,
        rank,
        achievements,
        isCurrentUser: user?.name === employee.name,
        energySaving: employee.energySaving,
        darkMode: employee.darkMode,
        seatingOptimized: employee.seatingOptimized
      };
    });
  }, [filteredEmployees, user]);

  // Generate department rankings based on filtered data
  const departmentRankings = useMemo(() => {
    const deptStats = DEPARTMENTS.map(dept => {
      const deptEmployees = filteredEmployees.filter(emp => emp.department === dept);
      const totalPoints = deptEmployees.reduce((sum, emp) => sum + emp.awePoints, 0);
      const avgPoints = deptEmployees.length > 0 ? Math.round(totalPoints / deptEmployees.length) : 0;
      const energySavers = deptEmployees.filter(emp => emp.energySaving).length;
      const darkModeUsers = deptEmployees.filter(emp => emp.darkMode).length;
      
      return {
        name: dept,
        points: totalPoints,
        avgPoints,
        members: deptEmployees.length,
        energySavers,
        darkModeUsers,
        efficiency: deptEmployees.length > 0 ? Math.round((energySavers + darkModeUsers) / (deptEmployees.length * 2) * 100) : 0
      };
    })
    .filter(dept => dept.members > 0) // Only show departments with members in filtered data
    .sort((a, b) => b.points - a.points);
    
    return deptStats;
  }, [filteredEmployees]);

  // Achievement data for chart based on current filtered data and time period
  const achievementData = useMemo(() => {
    const availableAchievements = timeBasedAchievements[timeFilter as keyof typeof timeBasedAchievements] || [];
    const achievements: Record<string, number> = {};
    
    // Initialize all available achievements for this time period
    availableAchievements.forEach(achievement => {
      achievements[achievement] = 0;
    });

    // Count achievements from filtered employees
    filteredEmployees.forEach(emp => {
      const empAchievements = emp.timeBasedAchievements || [];
      empAchievements.forEach(achievement => {
        if (achievements[achievement] !== undefined) {
          achievements[achievement]++;
        }
      });
      
      // Fallback counting if no time-based achievements
      if (empAchievements.length === 0) {
        if (emp.energySaving && achievements["Energy Saver"] !== undefined) achievements["Energy Saver"]++;
        if (emp.darkMode && achievements["Dark Mode Master"] !== undefined) achievements["Dark Mode Master"]++;
        if (emp.seatingOptimized && achievements["Proximity Pro"] !== undefined) achievements["Proximity Pro"]++;
        if (emp.stairUse > emp.elevatorUse && achievements["Fitness Champion"] !== undefined) achievements["Fitness Champion"]++;
        if (emp.deviceUsage.laptop < 6 && achievements["Efficient Worker"] !== undefined) achievements["Efficient Worker"]++;
        if (emp.awePoints > 2000 && achievements["Sustainability Hero"] !== undefined) achievements["Sustainability Hero"]++;
        if (emp.awePoints > 3000 && achievements["Eco Champion"] !== undefined) achievements["Eco Champion"]++;
        if (emp.awePoints > 4000 && achievements["Green Leader"] !== undefined) achievements["Green Leader"]++;
      }
    });

    return Object.entries(achievements).map(([type, count]) => ({ type, count }));
  }, [filteredEmployees, timeFilter]);

  // Get time period information
  const timePeriodInfo = useMemo(() => {
    return getTimePeriodInfo(timeFilter);
  }, [timeFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredEmployees.length);

  // Reset to first page when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === 'department') {
      setSelectedDepartment(value);
    } else if (filterType === 'search') {
      setSearchTerm(value);
    } else if (filterType === 'time') {
      setTimeFilter(value);
    }
  };

  return {
    // State
    searchTerm,
    selectedDepartment,
    timeFilter,
    activeTab,
    currentPage,
    itemsPerPage,
    
    // Data
    user,
    employees,
    filteredEmployees,
    leaderboardData,
    topThree,
    departmentRankings,
    achievementData,
    timePeriodInfo,
    
    // Pagination
    totalPages,
    startItem,
    endItem,
    
    // Actions
    setActiveTab,
    setCurrentPage,
    handleFilterChange
  };
};
