
import { useEffect, useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { Badge } from "./ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { departments, getEmployeesByBuildingAndFloor } from "@/data/mockData";

interface Person {
  id: string;
  name: string;
  x: number;
  y: number;
  energySaving: boolean;
  department: string;
}

interface EnergyZone {
  id: string;
  x: number;
  y: number;
  radius: number;
  level: "low" | "medium" | "high";
}

interface FloorMapProps {
  currentFloor?: string;
  currentBuilding?: string;
}

export default function FloorMap({ currentFloor = "All Floors", currentBuilding = "Building A" }: FloorMapProps) {
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  
  // Get filtered employees from our central data source
  const employees = getEmployeesByBuildingAndFloor(currentBuilding, currentFloor === "All Floors" ? "Floor 1" : currentFloor);

  // Convert employees to people with positions on the map
  const [people, setPeople] = useState<Person[]>(() => {
    return employees.map((emp, index) => {
      // Create clusters based on departments
      const deptIndex = departments.indexOf(emp.department) % 3;
      const baseX = deptIndex === 0 ? 30 : deptIndex === 1 ? 50 : 70;
      const baseY = deptIndex === 0 ? 30 : deptIndex === 1 ? 60 : 40;
      
      return {
        id: emp.id,
        name: emp.name,
        x: baseX + (Math.random() - 0.5) * 30,
        y: baseY + (Math.random() - 0.5) * 30,
        energySaving: emp.energySaving,
        department: emp.department
      };
    });
  });

  // Create energy zones based on the people clusters
  const [zones, setZones] = useState<EnergyZone[]>(() => {
    // Analyze clusters of people and create zones
    const departmentClusters: Record<string, { count: number, avgX: number, avgY: number, energySavingCount: number }> = {};
    
    people.forEach(person => {
      if (!departmentClusters[person.department]) {
        departmentClusters[person.department] = { count: 0, avgX: 0, avgY: 0, energySavingCount: 0 };
      }
      
      departmentClusters[person.department].count++;
      departmentClusters[person.department].avgX += person.x;
      departmentClusters[person.department].avgY += person.y;
      if (person.energySaving) {
        departmentClusters[person.department].energySavingCount++;
      }
    });
    
    // Calculate averages and create zones
    return Object.entries(departmentClusters).map(([dept, data], index) => {
      const avgX = data.count ? data.avgX / data.count : 50;
      const avgY = data.count ? data.avgY / data.count : 50;
      const energySavingRatio = data.count ? data.energySavingCount / data.count : 0;
      
      // Determine energy level based on energy-saving ratio
      let level: "low" | "medium" | "high";
      if (energySavingRatio > 0.7) level = "low";
      else if (energySavingRatio > 0.4) level = "medium";
      else level = "high";
      
      return {
        id: `z_${index}`,
        x: avgX,
        y: avgY,
        radius: Math.min(20 + (data.count / 2), 35), // Size based on number of people
        level
      };
    });
  });

  useEffect(() => {
    // Simulate movement/changes
    const interval = setInterval(() => {
      setPeople((prev) =>
        prev.map((person) => ({
          ...person,
          x: person.x + (Math.random() - 0.5) * 1,
          y: person.y + (Math.random() - 0.5) * 1,
        }))
      );

      // Randomly update zone sizes
      setZones((prev) =>
        prev.map((zone) => ({
          ...zone,
          radius: Math.max(10, zone.radius + (Math.random() - 0.5) * 1),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filter people by department if selected
  const filteredPeople = selectedDepartment === null 
    ? people 
    : people.filter(person => person.department === selectedDepartment);

  // Get unique departments from the people data
  const availableDepartments = [...new Set(people.map(person => person.department))];

  return (
    <DashboardCard
      title={`${currentBuilding} ${currentFloor === "All Floors" ? "Floor 1" : currentFloor} & Energy Zones`}
      description="Real-time view of employee seating and energy consumption zones"
    >
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Filter by Department:</div>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant={selectedDepartment === null ? "default" : "outline"} 
            className="cursor-pointer"
            onClick={() => setSelectedDepartment(null)}
          >
            All Departments
          </Badge>
          {availableDepartments.map(dept => (
            <Badge 
              key={dept}
              variant={selectedDepartment === dept ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => setSelectedDepartment(dept)}
            >
              {dept}
            </Badge>
          ))}
        </div>
      </div>

      <div className="floor-map-container bg-muted/30 border relative h-[400px] rounded-md overflow-hidden">
        {/* Background grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Energy zones */}
        {zones.map((zone) => (
          <div
            key={zone.id}
            className={`energy-bubble absolute ${
              zone.level === "low"
                ? "bg-green-200/40 border-green-400"
                : zone.level === "medium"
                ? "bg-yellow-200/40 border-yellow-400"
                : "bg-red-200/40 border-red-400"
            } animate-pulse-slow border rounded-full`}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.radius * 2}px`,
              height: `${zone.radius * 2}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
              {zone.level === "low" ? "Low Energy" : zone.level === "medium" ? "Medium" : "High Energy"}
            </div>
          </div>
        ))}

        {/* People */}
        {filteredPeople.map((person) => (
          <div
            key={person.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${person.x}%`,
              top: `${person.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                person.energySaving ? "bg-green-500" : "bg-blue-500"
              }`}
              title={`${person.name} (${person.department})`}
            >
              {person.name.charAt(0)}
            </div>
            <div className="mt-1 text-xs bg-background/90 p-1 rounded shadow-sm">
              {person.name.split(' ')[0]}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-background/90 p-2 rounded-md shadow-md text-xs">
          <div className="font-bold mb-1">Legend</div>
          <div className="flex items-center mb-1">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span>Energy-Saving Mode</span>
          </div>
          <div className="flex items-center mb-1">
            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span>Standard Mode</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-200/40 border border-green-400 mr-1"></span>
            <span className="mr-2">Low</span>
            <span className="w-3 h-3 rounded-full bg-yellow-200/40 border border-yellow-400 mr-1"></span>
            <span className="mr-2">Medium</span>
            <span className="w-3 h-3 rounded-full bg-red-200/40 border border-red-400 mr-1"></span>
            <span>High Energy</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-muted/30 rounded-lg p-3 border">
          <div className="font-medium mb-1">Energy Efficiency</div>
          <p className="text-muted-foreground">
            {filteredPeople.length > 0 
              ? `${Math.round((filteredPeople.filter(p => p.energySaving).length / filteredPeople.length) * 100)}% of employees are in energy-saving mode.`
              : "No employees are currently displayed in this view."}
          </p>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-3 border">
          <div className="font-medium mb-1">Optimization Tips</div>
          <p className="text-muted-foreground">
            {selectedDepartment 
              ? `${selectedDepartment} team can save 12% more energy by optimizing seating arrangements.`
              : "Moving from high to low energy zones can reduce personal carbon footprint by up to 18%."}
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
