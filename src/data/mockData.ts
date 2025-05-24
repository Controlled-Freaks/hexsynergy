// South Indian names data
export const southIndianNames = [
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
];

export const departments = [
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
];

export const buildings = [
  "Building A",
  "Building B",
  "Building C",
  "Building D"
];

export const floors = [
  "All Floors",
  "Floor 1",
  "Floor 2",
  "Floor 3",
  "Floor 4"
];

export interface Employee {
  id: string;
  name: string;
  department: string;
  building: string;
  floor: string;
  energySaving: boolean;
  darkMode: boolean;
  elevatorUse: number;
  stairUse: number;
  seatingOptimized: boolean;
  awePoints: number;
  deviceUsage: {
    laptop: number;
    ac: number;
    lighting: number;
  };
  monthlyData: {
    [key: string]: {
      energyConsumption: number;
      elevatorUses: number;
      stairUses: number;
      awePointsEarned: number;
    };
  };
  lastSeen: {
    x: number;
    y: number;
    timestamp: string;
  };
}

// Generate months for 2025
export const months2025 = [
  "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025",
  "Jun 2025", "Jul 2025", "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025"
];

// Generate unique cluster patterns for each building
const buildingClusterPatterns = {
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
};

// Floor-specific energy efficiency factors (higher means less efficient)
const floorEfficiencyFactors = {
  "Floor 1": 1.2,
  "Floor 2": 0.9,
  "Floor 3": 1.0,
  "Floor 4": 1.1
};

// Department-specific energy usage patterns
const departmentEnergyPatterns = {
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
};

// Generate monthly data trends (e.g., energy consumption decreases over time due to improvements)
const generateMonthlyData = (energySaving: boolean, department: string, floor: string) => {
  const result: {
    [key: string]: {
      energyConsumption: number;
      elevatorUses: number;
      stairUses: number;
      awePointsEarned: number;
    };
  } = {};
  
  // Base values
  let baseEnergy = energySaving ? 4.5 : 6.5;
  let baseElevator = energySaving ? 8 : 14;
  let baseStair = energySaving ? 10 : 6;
  let basePoints = energySaving ? 80 : 40;
  
  // Apply department and floor factors
  const deptPattern = departmentEnergyPatterns[department as keyof typeof departmentEnergyPatterns] || 
                      departmentEnergyPatterns["Admin"];
  const floorFactor = floorEfficiencyFactors[floor as keyof typeof floorEfficiencyFactors] || 1.0;
  
  baseEnergy *= (deptPattern.laptop + deptPattern.ac + deptPattern.lighting) / 3 * floorFactor;
  
  // Generate data for each month with a gradual improvement trend
  months2025.forEach((month, index) => {
    // Improvement factor increases with time (more improvement in later months)
    const improvementFactor = 1 - (index * 0.01) - (energySaving ? 0.05 : 0);
    
    // Add seasonal variations (higher AC usage in summer months)
    const seasonalFactor = index >= 4 && index <= 7 ? 1.15 : 1.0;
    
    // Random variation
    const randomFactor = 0.9 + (Math.random() * 0.2);
    
    const energyConsumption = Math.round((baseEnergy * improvementFactor * seasonalFactor * randomFactor) * 10) / 10;
    const elevatorUses = Math.floor(baseElevator * improvementFactor * randomFactor);
    const stairUses = Math.floor(baseStair * (1/improvementFactor) * randomFactor); // Inverse relationship
    const awePointsEarned = Math.floor(basePoints * (1/improvementFactor) * randomFactor);
    
    result[month] = {
      energyConsumption,
      elevatorUses,
      stairUses,
      awePointsEarned
    };
  });
  
  return result;
};

// Generate 50 employees per building floor (total of 800 employees)
export const generateEmployees = (): Employee[] => {
  const employees: Employee[] = [];
  let id = 1;

  buildings.forEach(building => {
    // Get cluster pattern for this building
    const clusters = buildingClusterPatterns[building as keyof typeof buildingClusterPatterns];
    
    for (let floorNum = 1; floorNum <= 4; floorNum++) {
      const floor = `Floor ${floorNum}`;
      // Generate 50 employees per floor
      for (let i = 0; i < 50; i++) {
        const nameIndex = Math.floor(Math.random() * southIndianNames.length);
        const deptIndex = Math.floor(Math.random() * departments.length);
        
        const energySaving = Math.random() > 0.4;
        const darkMode = Math.random() > 0.5;
        const seatingOptimized = Math.random() > 0.35;
        
        // Calculate awe points based on behaviors
        let awePoints = 0;
        if (energySaving) awePoints += Math.floor(Math.random() * 200) + 100;
        if (darkMode) awePoints += Math.floor(Math.random() * 100) + 50;
        if (seatingOptimized) awePoints += Math.floor(Math.random() * 150) + 75;

        // Calculate position based on building-specific clusters
        let x: number, y: number;
        const selectedCluster = clusters[Math.floor(Math.random() * clusters.length)];
        x = selectedCluster.x + (Math.random() - 0.5) * selectedCluster.size * 2;
        y = selectedCluster.y + (Math.random() - 0.5) * selectedCluster.size * 2;
        
        // Keep position within bounds
        x = Math.max(10, Math.min(90, x));
        y = Math.max(10, Math.min(90, y));
        
        // Generate monthly historical data
        const monthlyData = generateMonthlyData(energySaving, departments[deptIndex], floor);
        
        employees.push({
          id: `emp${id}`,
          name: southIndianNames[nameIndex],
          department: departments[deptIndex],
          building,
          floor,
          energySaving,
          darkMode,
          elevatorUse: Math.floor(Math.random() * 12) + 1, // 1-12 elevator uses per day
          stairUse: Math.floor(Math.random() * 8) + 1, // 1-8 stair uses per day
          seatingOptimized,
          awePoints,
          deviceUsage: {
            laptop: Math.round((Math.random() * 4 + 4) * 10) / 10, // 4-8 hours with 1 decimal
            ac: Math.round((Math.random() * 3 + 3) * 10) / 10, // 3-6 hours with 1 decimal
            lighting: Math.round((Math.random() * 4 + 4) * 10) / 10 // 4-8 hours with 1 decimal
          },
          monthlyData,
          lastSeen: {
            x,
            y,
            timestamp: new Date().toISOString()
          }
        });
        
        id++;
      }
    }
  });

  return employees;
};

// Generate all the mock data once and export it
export const allEmployees = generateEmployees();

// Function to get employees by building and floor
export const getEmployeesByBuildingAndFloor = (building: string, floor: string) => {
  if (floor === "All Floors") {
    return allEmployees.filter(emp => emp.building === building);
  }
  return allEmployees.filter(emp => emp.building === building && emp.floor === floor);
};

// Function to get employees by department
export const getEmployeesByDepartment = (department: string) => {
  return allEmployees.filter(emp => emp.department === department);
};

// Get a random employee (for the user view)
export const getRandomEmployee = (): Employee => {
  const randomIndex = Math.floor(Math.random() * allEmployees.length);
  return allEmployees[randomIndex];
};

// Function to get energy consumption trends for a specific building and floor
export const getEnergyConsumptionTrend = (building: string, floor: string) => {
  const employees = getEmployeesByBuildingAndFloor(building, floor);
  const monthlyTotals: Record<string, {total: number, count: number}> = {};
  
  // Initialize with all months
  months2025.forEach(month => {
    monthlyTotals[month] = {total: 0, count: 0};
  });
  
  // Sum up energy consumption for all employees
  employees.forEach(employee => {
    Object.entries(employee.monthlyData).forEach(([month, data]) => {
      if (monthlyTotals[month]) {
        monthlyTotals[month].total += data.energyConsumption;
        monthlyTotals[month].count++;
      }
    });
  });
  
  // Calculate averages
  return Object.entries(monthlyTotals).map(([month, data]) => ({
    month,
    consumption: data.count > 0 ? Math.round((data.total / data.count) * 10) / 10 : 0
  }));
};

// Function to calculate energy efficiency score for a floor
export const getFloorEfficiencyScore = (building: string, floor: string) => {
  const employees = getEmployeesByBuildingAndFloor(building, floor);
  if (employees.length === 0) return 0;
  
  const energySavingCount = employees.filter(e => e.energySaving).length;
  const darkModeCount = employees.filter(e => e.darkMode).length;
  const seatingOptimizedCount = employees.filter(e => e.seatingOptimized).length;
  
  // Calculate weighted score (0-100)
  return Math.round(
    (energySavingCount / employees.length * 50) + 
    (darkModeCount / employees.length * 20) + 
    (seatingOptimizedCount / employees.length * 30)
  );
};

// Calculate department energy stats
export const getDepartmentEnergyStats = () => {
  const stats = departments.map(dept => {
    const deptEmployees = getEmployeesByDepartment(dept);
    if (deptEmployees.length === 0) return { department: dept, avgConsumption: 0, efficiency: 0 };
    
    // Calculate average consumption from the most recent month
    const latestMonth = months2025[months2025.length - 1];
    let totalConsumption = 0;
    let count = 0;
    
    deptEmployees.forEach(emp => {
      if (emp.monthlyData[latestMonth]) {
        totalConsumption += emp.monthlyData[latestMonth].energyConsumption;
        count++;
      }
    });
    
    const avgConsumption = count > 0 ? Math.round((totalConsumption / count) * 10) / 10 : 0;
    
    // Calculate efficiency score
    const energySavingRatio = deptEmployees.filter(e => e.energySaving).length / deptEmployees.length;
    const darkModeRatio = deptEmployees.filter(e => e.darkMode).length / deptEmployees.length;
    const seatingOptimizedRatio = deptEmployees.filter(e => e.seatingOptimized).length / deptEmployees.length;
    
    const efficiency = Math.round(
      (energySavingRatio * 50) + 
      (darkModeRatio * 20) + 
      (seatingOptimizedRatio * 30)
    );
    
    return {
      department: dept,
      avgConsumption,
      efficiency
    };
  });
  
  return stats.sort((a, b) => a.avgConsumption - b.avgConsumption);
};

// Get energy zones for a specific building and floor
export const getEnergyZones = (building: string, floor: string) => {
  const employees = getEmployeesByBuildingAndFloor(building, floor === "All Floors" ? "Floor 1" : floor);
  
  // Group employees by approximate location
  const zoneRadius = 15;
  const zones: Record<string, {
    x: number, 
    y: number, 
    employees: Employee[], 
    energySavingCount: number
  }> = {};
  
  employees.forEach(employee => {
    const { x, y } = employee.lastSeen;
    let foundZone = false;
    
    // Check if employee fits in an existing zone
    Object.values(zones).forEach(zone => {
      const distance = Math.sqrt(Math.pow(zone.x - x, 2) + Math.pow(zone.y - y, 2));
      if (distance < zoneRadius) {
        zone.employees.push(employee);
        if (employee.energySaving) zone.energySavingCount++;
        foundZone = true;
      }
    });
    
    // Create a new zone if needed
    if (!foundZone) {
      const zoneId = `zone_${Object.keys(zones).length}`;
      zones[zoneId] = {
        x,
        y,
        employees: [employee],
        energySavingCount: employee.energySaving ? 1 : 0
      };
    }
  });
  
  // Convert to array and calculate energy levels
  return Object.entries(zones).map(([id, zone]) => {
    const energySavingRatio = zone.employees.length > 0 
      ? zone.energySavingCount / zone.employees.length 
      : 0;
    
    // Determine energy level based on ratio
    let level: "low" | "medium" | "high";
    if (energySavingRatio > 0.7) level = "low";
    else if (energySavingRatio > 0.4) level = "medium";
    else level = "high";
    
    return {
      id,
      x: zone.x,
      y: zone.y,
      radius: Math.min(10 + (zone.employees.length), 25), // Size based on employee count
      level,
      employeeCount: zone.employees.length
    };
  });
};

// Find employee by ID
export const getEmployeeById = (id: string): Employee | undefined => {
  return allEmployees.find(emp => emp.id === id);
};
