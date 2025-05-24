
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
}

// Generate 50 employees per building floor (total of 800 employees)
export const generateEmployees = (): Employee[] => {
  const employees: Employee[] = [];
  let id = 1;

  buildings.forEach(building => {
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
