
import { DashboardCard } from "@/components/DashboardCard";
import SustainabilityChart from "@/components/SustainabilityChart";
import { Badge } from "@/components/ui/badge";
import { Building, Home } from "lucide-react";

interface BuildingOverviewCardProps {
  currentBuilding?: string;
  currentFloor?: string;
  className?: string;
}

export function BuildingOverviewCard({
  currentBuilding = "Building A",
  currentFloor = "All Floors",
  className
}: BuildingOverviewCardProps) {
  // Mock building data
  const buildingData = {
    "Building A": {
      floors: 4,
      totalEmployees: 421,
      energyConsumption: {
        lighting: 2480,
        hvac: 3890,
        elevator: 1250,
        devices: 1980,
        other: 650
      },
      occupancyRate: 88,
      energyEfficiencyScore: 82,
      floorData: [
        { floor: "Floor 1", employees: 105, energyPerSqFt: 1.8, utilization: 92 },
        { floor: "Floor 2", employees: 112, energyPerSqFt: 1.7, utilization: 89 },
        { floor: "Floor 3", employees: 98, energyPerSqFt: 1.9, utilization: 85 },
        { floor: "Floor 4", employees: 106, energyPerSqFt: 1.8, utilization: 88 }
      ]
    },
    "Building B": {
      floors: 4,
      totalEmployees: 398,
      energyConsumption: {
        lighting: 2380,
        hvac: 3650,
        elevator: 1150,
        devices: 1850,
        other: 620
      },
      occupancyRate: 85,
      energyEfficiencyScore: 79,
      floorData: [
        { floor: "Floor 1", employees: 95, energyPerSqFt: 1.9, utilization: 90 },
        { floor: "Floor 2", employees: 105, energyPerSqFt: 1.8, utilization: 87 },
        { floor: "Floor 3", employees: 102, energyPerSqFt: 1.7, utilization: 83 },
        { floor: "Floor 4", employees: 96, energyPerSqFt: 2.0, utilization: 82 }
      ]
    },
    "Building C": {
      floors: 4,
      totalEmployees: 432,
      energyConsumption: {
        lighting: 2520,
        hvac: 3950,
        elevator: 1280,
        devices: 2050,
        other: 680
      },
      occupancyRate: 91,
      energyEfficiencyScore: 76,
      floorData: [
        { floor: "Floor 1", employees: 108, energyPerSqFt: 2.0, utilization: 93 },
        { floor: "Floor 2", employees: 115, energyPerSqFt: 1.9, utilization: 91 },
        { floor: "Floor 3", employees: 105, energyPerSqFt: 2.1, utilization: 90 },
        { floor: "Floor 4", employees: 104, energyPerSqFt: 2.0, utilization: 89 }
      ]
    },
    "Building D": {
      floors: 4,
      totalEmployees: 385,
      energyConsumption: {
        lighting: 2350,
        hvac: 3580,
        elevator: 1120,
        devices: 1820,
        other: 600
      },
      occupancyRate: 82,
      energyEfficiencyScore: 88,
      floorData: [
        { floor: "Floor 1", employees: 92, energyPerSqFt: 1.6, utilization: 86 },
        { floor: "Floor 2", employees: 99, energyPerSqFt: 1.5, utilization: 83 },
        { floor: "Floor 3", employees: 97, energyPerSqFt: 1.7, utilization: 82 },
        { floor: "Floor 4", employees: 97, energyPerSqFt: 1.6, utilization: 79 }
      ]
    }
  };
  
  // Get data for the current building
  const currentBuildingData = buildingData[currentBuilding as keyof typeof buildingData];
  
  // Extract energy consumption data for the pie chart
  const energyDistributionData = Object.entries(currentBuildingData.energyConsumption).map(([category, value]) => ({
    category,
    value
  }));
  
  // Energy consumption comparison between buildings
  const buildingComparisonData = Object.entries(buildingData).map(([building, data]) => {
    const totalEnergy = Object.values(data.energyConsumption).reduce((sum, value) => sum + value, 0);
    return {
      building,
      energyConsumption: totalEnergy,
      perEmployee: totalEnergy / data.totalEmployees
    };
  });
  
  // Filter floor data if a specific floor is selected
  let floorData = currentBuildingData.floorData;
  if (currentFloor !== "All Floors") {
    floorData = floorData.filter(floor => floor.floor === currentFloor);
  }

  return (
    <DashboardCard
      title={`${currentBuilding} Overview`}
      description={currentFloor !== "All Floors" ? `${currentFloor} energy metrics and occupancy data` : "Building energy metrics and occupancy data"}
      icon={<Building className="h-5 w-5" />}
      className={className}
    >
      <div className="space-y-6">
        {/* Building Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border text-center">
            <div className="text-3xl font-bold text-eco-green">
              {currentBuildingData.totalEmployees}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Total Employees</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border text-center">
            <div className="text-3xl font-bold text-eco-blue">
              {currentBuildingData.floors}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Floors</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border text-center">
            <div className="text-3xl font-bold text-eco-yellow">
              {currentBuildingData.occupancyRate}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">Occupancy Rate</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border text-center">
            <div className="text-3xl font-bold text-primary">
              {currentBuildingData.energyEfficiencyScore}/100
            </div>
            <p className="text-sm text-muted-foreground mt-1">Energy Efficiency Score</p>
          </div>
        </div>

        {/* Energy Distribution Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Energy Consumption Distribution</h3>
            <SustainabilityChart
              type="pie"
              data={energyDistributionData}
              title=""
              description=""
              xAxisKey="category"
              dataKeys={[
                { key: "value", color: "#4CAF50" },
                { key: "value", color: "#2196F3" },
                { key: "value", color: "#FFC107" },
                { key: "value", color: "#9C27B0" },
                { key: "value", color: "#FF5722" }
              ]}
              height={250}
            />
          </div>

          <div>
            <h3 className="font-medium mb-3">Building Comparison</h3>
            <SustainabilityChart
              type="bar"
              data={buildingComparisonData}
              title=""
              description=""
              xAxisKey="building"
              dataKeys={[
                { key: "perEmployee", color: "#4CAF50", name: "kWh per Employee" }
              ]}
              height={250}
            />
          </div>
        </div>

        {/* Floor Information */}
        <div>
          <h3 className="font-medium mb-3">
            {currentFloor !== "All Floors" ? `${currentFloor} Details` : "Floor Overview"}
          </h3>
          
          <div className="space-y-3">
            {floorData.map((floor) => (
              <div key={floor.floor} className="p-3 bg-muted/30 rounded-lg border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-eco-blue flex items-center justify-center text-white">
                    <Home className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">{floor.floor}</h4>
                    <p className="text-xs text-muted-foreground">
                      {floor.employees} employees
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">{floor.energyPerSqFt} kWh/m²</div>
                    <div className="text-xs text-muted-foreground">Energy per sq.ft.</div>
                  </div>
                  <Badge className={floor.utilization > 85 ? "bg-eco-green" : "bg-eco-yellow"}>
                    {floor.utilization}% Utilized
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Optimization Opportunities */}
        {currentFloor !== "All Floors" && (
          <div className="p-4 bg-muted/30 rounded-lg border">
            <h3 className="font-medium mb-3">Optimization Opportunities</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-eco-green"></div>
                <p className="text-sm">
                  Adjust HVAC temperature by 2°C during off-peak hours to save 45 kWh daily.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-eco-green"></div>
                <p className="text-sm">
                  Consolidate meeting room usage to reduce lighting and AC consumption.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-eco-green"></div>
                <p className="text-sm">
                  Optimize seating arrangement to leverage natural light zones.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
