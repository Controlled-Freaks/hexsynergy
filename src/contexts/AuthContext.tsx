
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar: string;
  department: string;
  floor: number;
  deskId: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockAdminUser: User = {
  id: "admin-1",
  name: "Admin User",
  email: "admin@hexaware.com",
  role: "admin",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  department: "Facility Management",
  floor: 3,
  deskId: "FM-301",
};

const mockRegularUser: User = {
  id: "user-1",
  name: "John Developer",
  email: "john@hexaware.com",
  role: "user",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  department: "Software Development",
  floor: 2,
  deskId: "SD-205",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by looking in local storage
    const storedUser = localStorage.getItem("ecoFuelersUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

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
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>
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
