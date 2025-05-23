
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar: string;
  department: string;
  floor: number;
  deskId: string;
  energySavings?: number;
  pointsEarned?: number;
  darkModeUsage?: number;
  rank?: number;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate mock user data for 150 employees
const generateMockUsers = () => {
  const departments = [
    "Software Development",
    "Product Design",
    "Marketing",
    "Sales",
    "Administration",
    "HR",
    "Finance",
    "Customer Support",
    "Operations",
    "Quality Assurance"
  ];
  
  const floors = [1, 2, 3, 4, 5];
  const mockUsers: User[] = [];
  
  // Create admin user
  mockUsers.push({
    id: "admin-1",
    name: "Admin User",
    email: "admin@hexaware.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    department: "Facility Management",
    floor: 3,
    deskId: "FM-301",
    energySavings: 28,
    pointsEarned: 2450,
    darkModeUsage: 95,
    rank: 5
  });
  
  // Create regular user
  mockUsers.push({
    id: "user-1",
    name: "John Developer",
    email: "john@hexaware.com",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    department: "Software Development",
    floor: 2,
    deskId: "SD-205",
    energySavings: 21,
    pointsEarned: 1850,
    darkModeUsage: 80,
    rank: 15
  });
  
  // Generate additional users
  const indianFirstNames = [
    "Aarav", "Aditi", "Ananya", "Arjun", "Diya", "Ishaan", "Kavya", "Kabir",
    "Neha", "Nikhil", "Priya", "Rahul", "Riya", "Rohan", "Sanya", "Vihaan",
    "Zara", "Aanya", "Advait", "Anika", "Aryan", "Divya", "Gaurav", "Isha",
    "Karan", "Maya", "Neil", "Pooja", "Rajiv", "Saanvi", "Sahil", "Tara",
    "Vikram", "Meera", "Deepak", "Amrita", "Varun", "Shreya", "Abhay", "Tanvi"
  ];
  
  const indianLastNames = [
    "Sharma", "Patel", "Singh", "Kumar", "Verma", "Agarwal", "Gupta", "Joshi",
    "Rao", "Mehta", "Chopra", "Reddy", "Nair", "Das", "Shah", "Khanna",
    "Iyer", "Pillai", "Desai", "Banerjee", "Kapoor", "Jain", "Malhotra", "Bose",
    "Chatterjee", "Gandhi", "Saxena", "Mukherjee", "Chauhan", "Srinivasan"
  ];
  
  for (let i = 2; i <= 150; i++) {
    const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
    const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const floor = floors[Math.floor(Math.random() * floors.length)];
    const deptPrefix = department.split(" ")[0].substring(0, 2).toUpperCase();
    const deskNumber = Math.floor(Math.random() * 50) + 100;
    const deskId = `${deptPrefix}-${floor}${deskNumber}`;
    
    mockUsers.push({
      id: `user-${i}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}@hexaware.com`,
      role: "user",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName.toLowerCase()}`,
      department,
      floor,
      deskId,
      energySavings: Math.floor(Math.random() * 30) + 5,
      pointsEarned: Math.floor(Math.random() * 2000) + 500,
      darkModeUsage: Math.floor(Math.random() * 80) + 20,
      rank: i + 5
    });
  }
  
  return mockUsers;
};

const mockUsers = generateMockUsers();
const mockAdminUser = mockUsers[0];
const mockRegularUser = mockUsers[1];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in by looking in local storage
    const storedUser = localStorage.getItem("ecoFuelersUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Protected routes logic
  useEffect(() => {
    const publicRoutes = ['/', '/login'];
    const isPublicRoute = publicRoutes.includes(location.pathname);
    
    if (!isLoading) {
      // Redirect unauthenticated users attempting to access protected routes to login
      if (!user && !isPublicRoute) {
        navigate('/login', { replace: true });
      }
      
      // Redirect authenticated users to dashboard if they access login
      if (user && location.pathname === '/login') {
        navigate('/dashboard', { replace: true });
      }
      
      // Prevent non-admin users from accessing admin page
      if (user && !isAdmin && location.pathname === '/admin') {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, isLoading, location.pathname, navigate]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock authentication logic
      if (email === "admin@hexaware.com" && password === "admin123") {
        setUser(mockAdminUser);
        localStorage.setItem("ecoFuelersUser", JSON.stringify(mockAdminUser));
      } else if (email === "john@hexaware.com" && password === "user123") {
        setUser(mockRegularUser);
        localStorage.setItem("ecoFuelersUser", JSON.stringify(mockRegularUser));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("ecoFuelersUser");
    setUser(null);
    navigate('/login', { replace: true });
  };

  const isAdmin = user?.role === "admin";
  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      isAdmin, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
