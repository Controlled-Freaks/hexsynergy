
import { useEffect, useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { departments, getEmployeesByBuildingAndFloor, getEnergyZones } from "@/data/mockData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Info, Maximize2, Minimize2, ZoomIn } from "lucide-react";

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
  employeeCount: number;
}

interface FloorMapProps {
  currentFloor?: string;
  currentBuilding?: string;
  onSelectEmployee?: (employeeId: string) => void;
}

export default function FloorMap({ 
  currentFloor = "All Floors", 
  currentBuilding = "Building A",
  onSelectEmployee
}: FloorMapProps) {
  const { user } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"standard" | "heatmap">("standard");
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Get filtered employees from our central data source
  const employees = getEmployeesByBuildingAndFloor(currentBuilding, currentFloor === "All Floors" ? "Floor 1" : currentFloor);

  // Convert employees to people with positions on the map
  const [people, setPeople] = useState<Person[]>(() => {
    return employees.map((emp) => ({
      id: emp.id,
      name: emp.name,
      x: emp.lastSeen.x,
      y: emp.lastSeen.y,
      energySaving: emp.energySaving,
      department: emp.department
    }));
  });

  // Get energy zones for this floor
  const [zones, setZones] = useState<EnergyZone[]>(() => {
    return getEnergyZones(currentBuilding, currentFloor);
  });

  // Update data when building or floor changes
  useEffect(() => {
    setPeople(employees.map((emp) => ({
      id: emp.id,
      name: emp.name,
      x: emp.lastSeen.x,
      y: emp.lastSeen.y,
      energySaving: emp.energySaving,
      department: emp.department
    })));
    
    setZones(getEnergyZones(currentBuilding, currentFloor));
  }, [currentBuilding, currentFloor, employees]);

  // Simulate movement/changes
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

  // Handle mouse events for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = (e.clientX - dragStart.x) / zoomLevel;
    const deltaY = (e.clientY - dragStart.y) / zoomLevel;
    
    setMapOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setMapOffset({ x: 0, y: 0 });
  };

  const handleEmployeeClick = (employeeId: string) => {
    setSelectedEmployee(prev => prev === employeeId ? null : employeeId);
    if (onSelectEmployee) {
      onSelectEmployee(employeeId);
    }
  };

  return (
    <DashboardCard
      title={`${currentBuilding} ${currentFloor === "All Floors" ? "Floor 1" : currentFloor} & Energy Zones`}
      description="Real-time view of employee seating and energy consumption zones"
    >
      <div className="mb-4 flex flex-wrap gap-2 justify-between items-center">
        <div className="space-y-2">
          <div className="text-sm font-medium">Filter by Department:</div>
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
        
        <div className="flex items-center gap-2">
          <Select
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "standard" | "heatmap")}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="View Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="heatmap">Heat Map</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <div className="flex gap-1">
            <Button size="icon" variant="outline" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={handleZoomOut}>
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={handleReset}>
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div 
        className="floor-map-container bg-muted/30 border relative h-[500px] rounded-md overflow-hidden"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Background grid */}
        <div 
          className="absolute inset-0 transition-transform duration-200"
          style={{
            backgroundImage: "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            transform: `scale(${zoomLevel}) translate(${mapOffset.x}px, ${mapOffset.y}px)`,
            transformOrigin: "center",
          }}
        />

        {/* Building floor plan based on current building */}
        <div 
          className="absolute inset-0 transition-transform duration-200"
          style={{
            transform: `scale(${zoomLevel}) translate(${mapOffset.x}px, ${mapOffset.y}px)`,
            transformOrigin: "center",
          }}
        >
          {/* Building sections - different for each building */}
          {currentBuilding === "Building A" && (
            <>
              <div className="absolute left-[10%] top-[10%] w-[35%] h-[35%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Conference Area</div>
              </div>
              <div className="absolute left-[10%] top-[55%] w-[35%] h-[35%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Office Area</div>
              </div>
              <div className="absolute left-[55%] top-[10%] w-[35%] h-[80%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Open Workspace</div>
              </div>
            </>
          )}

          {currentBuilding === "Building B" && (
            <>
              <div className="absolute left-[10%] top-[10%] w-[80%] h-[30%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Open Office</div>
              </div>
              <div className="absolute left-[10%] top-[50%] w-[30%] h-[40%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Meeting Rooms</div>
              </div>
              <div className="absolute left-[50%] top-[50%] w-[40%] h-[40%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Collaboration Space</div>
              </div>
            </>
          )}

          {currentBuilding === "Building C" && (
            <>
              <div className="absolute left-[50%] top-[10%] w-[40%] h-[80%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Innovation Hub</div>
              </div>
              <div className="absolute left-[10%] top-[10%] w-[30%] h-[40%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Team Area</div>
              </div>
              <div className="absolute left-[10%] top-[60%] w-[30%] h-[30%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Quiet Zone</div>
              </div>
            </>
          )}

          {currentBuilding === "Building D" && (
            <>
              <div className="absolute left-[10%] top-[40%] w-[80%] h-[20%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Central Corridor</div>
              </div>
              <div className="absolute left-[10%] top-[10%] w-[35%] h-[20%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">North Wing</div>
              </div>
              <div className="absolute left-[55%] top-[10%] w-[35%] h-[20%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Executive Wing</div>
              </div>
              <div className="absolute left-[10%] top-[70%] w-[35%] h-[20%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">South Wing</div>
              </div>
              <div className="absolute left-[55%] top-[70%] w-[35%] h-[20%] border-2 border-gray-500 bg-gray-100/20">
                <div className="text-xs text-center mt-2 font-medium">Tech Hub</div>
              </div>
            </>
          )}
        </div>

        {/* Energy zones */}
        <div
          className="absolute inset-0 transition-transform duration-200"
          style={{
            transform: `scale(${zoomLevel}) translate(${mapOffset.x}px, ${mapOffset.y}px)`,
            transformOrigin: "center",
          }}
        >
          {viewMode === "standard" && zones.map((zone) => (
            <TooltipProvider key={zone.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
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
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    <div className="font-bold">{zone.level === "low" ? "Low Energy Zone" : zone.level === "medium" ? "Medium Energy Zone" : "High Energy Zone"}</div>
                    <div>{zone.employeeCount} employees</div>
                    <div>{zone.level === "low" ? "Efficient energy usage" : zone.level === "medium" ? "Average energy usage" : "High energy consumption"}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          
          {viewMode === "heatmap" && (
            <div className="absolute inset-0 bg-gradient-radial from-green-500/10 to-transparent" style={{
              backgroundSize: "30% 30%",
              backgroundPosition: "10% 20%, 80% 40%, 40% 70%, 70% 80%",
              backgroundRepeat: "no-repeat",
              mixBlendMode: "multiply"
            }} />
          )}
        </div>

        {/* People */}
        <div
          className="absolute inset-0 transition-transform duration-200"
          style={{
            transform: `scale(${zoomLevel}) translate(${mapOffset.x}px, ${mapOffset.y}px)`,
            transformOrigin: "center",
          }}
        >
          {filteredPeople.map((person) => (
            <Popover key={person.id}>
              <PopoverTrigger asChild>
                <div
                  className={`absolute flex flex-col items-center cursor-pointer ${
                    selectedEmployee === person.id ? "z-20" : "z-10"
                  }`}
                  style={{
                    left: `${person.x}%`,
                    top: `${person.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => handleEmployeeClick(person.id)}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md transition-all duration-300 ${
                      selectedEmployee === person.id ? "scale-125 ring-2 ring-primary" : ""
                    } ${
                      person.energySaving ? "bg-green-500" : "bg-blue-500"
                    }`}
                    title={`${person.name} (${person.department})`}
                  >
                    {person.name.charAt(0)}
                  </div>
                  <div className={`mt-1 text-xs bg-background/90 p-1 rounded shadow-sm transition-opacity ${
                    selectedEmployee === person.id ? "opacity-100" : "opacity-80"
                  }`}>
                    {person.name.split(' ')[0]}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">{person.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Department:</div>
                    <div>{person.department}</div>
                    
                    <div className="text-muted-foreground">Energy Mode:</div>
                    <div className={person.energySaving ? "text-green-600 font-medium" : "text-amber-600"}>
                      {person.energySaving ? "Energy Saving" : "Standard"}
                    </div>
                    
                    <div className="text-muted-foreground">Location:</div>
                    <div>{currentBuilding}, {currentFloor}</div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => setSelectedEmployee(null)}
                  >
                    Close
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-background/90 p-2 rounded-md shadow-md text-xs z-30">
          <div className="font-bold mb-1 flex items-center gap-1">
            <span>Legend</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">The floor map shows employees and energy zones. <br />Click on an employee to see details.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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
