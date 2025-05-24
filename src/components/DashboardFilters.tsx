
import React from 'react';
import { Building, Home, User } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export interface DashboardFiltersProps {
  currentBuilding: string;
  setCurrentBuilding: (value: string) => void;
  currentFloor: string;
  setCurrentFloor: (value: string) => void;
  currentDepartment: string;
  setCurrentDepartment: (value: string) => void;
  isAdminView: boolean;
  setIsAdminView: (value: boolean) => void;
  className?: string;
}

export function DashboardFilters({
  currentBuilding,
  setCurrentBuilding,
  currentFloor,
  setCurrentFloor,
  currentDepartment,
  setCurrentDepartment,
  isAdminView,
  setIsAdminView,
  className
}: DashboardFiltersProps) {
  const { isAdmin } = useAuth();
  
  // Mock data
  const buildings = ["Building A", "Building B", "Building C", "Building D"];
  const floors = ["Floor 1", "Floor 2", "Floor 3", "Floor 4"];
  const departments = [
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

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <div className="flex items-center gap-2">
        <Building className="h-4 w-4 text-muted-foreground" />
        <Select value={currentBuilding} onValueChange={setCurrentBuilding}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select Building" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Buildings</SelectLabel>
              {buildings.map((building) => (
                <SelectItem key={building} value={building}>
                  {building}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Home className="h-4 w-4 text-muted-foreground" />
        <Select value={currentFloor} onValueChange={setCurrentFloor}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select Floor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Floors</SelectLabel>
              {floors.map((floor) => (
                <SelectItem key={floor} value={floor}>
                  {floor}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <Select value={currentDepartment} onValueChange={setCurrentDepartment}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Departments</SelectLabel>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {isAdmin && (
        <div className="ml-auto">
          <div className="flex items-center bg-muted/60 rounded-lg p-1">
            <Button
              size="sm"
              variant={isAdminView ? "default" : "ghost"}
              className={cn("rounded-md", !isAdminView && "text-muted-foreground")}
              onClick={() => setIsAdminView(true)}
            >
              Admin View
            </Button>
            <Button
              size="sm"
              variant={!isAdminView ? "default" : "ghost"}
              className={cn("rounded-md", isAdminView && "text-muted-foreground")}
              onClick={() => setIsAdminView(false)}
            >
              User View
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
