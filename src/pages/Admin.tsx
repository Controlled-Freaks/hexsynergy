
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SustainabilityChart from "@/components/SustainabilityChart";
import { EnergyConsumptionCard } from "@/components/EnergyConsumptionCard";
import { DashboardCard } from "@/components/DashboardCard";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import FloorMap from "@/components/FloorMap";
import { ArrowDown, ArrowUp, Calendar, Download, Settings, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Admin = () => {
  const { user, isAdmin } = useAuth();

  // Redirect if not admin
  if (!user || !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  // Office-wide energy consumption data
  const officeEnergyData = [
    { month: "Jan", actual: 12500, target: 15000, baseline: 18000 },
    { month: "Feb", actual: 13200, target: 14800, baseline: 18000 },
    { month: "Mar", actual: 12800, target: 14600, baseline: 18000 },
    { month: "Apr", actual: 12100, target: 14400, baseline: 18000 },
    { month: "May", actual: 11500, target: 14200, baseline: 18000 },
    { month: "Jun", actual: 10800, target: 14000, baseline: 18000 },
    { month: "Jul", actual: 10200, target: 13800, baseline: 18000 },
    { month: "Aug", actual: 9800, target: 13600, baseline: 18000 },
  ];

  // Department breakdown
  const departmentData = [
    { name: "Software Development", energy: 42, emissions: 38, saving: 16 },
    { name: "Product Design", energy: 28, emissions: 25, saving: 22 },
    { name: "Marketing", energy: 18, emissions: 16, saving: 12 },
    { name: "Sales", energy: 12, emissions: 10, saving: 8 },
    { name: "Administration", energy: 10, emissions: 11, saving: 6 },
  ];

  // Top performers 
  const topPerformers = [
    { id: 1, name: "Emma Thompson", department: "Product Design", saving: 32, points: 1250 },
    { id: 2, name: "David Chen", department: "Software Development", saving: 28, points: 1180 },
    { id: 3, name: "Sarah Williams", department: "Marketing", saving: 26, points: 1050 },
    { id: 4, name: "Michael Rodriguez", department: "Software Development", saving: 25, points: 980 },
    { id: 5, name: "Jessica Lee", department: "Administration", saving: 23, points: 920 },
  ];

  // Energy alerts
  const energyAlerts = [
    { id: 1, area: "Meeting Room A", issue: "Lights left on after hours", status: "Active", impact: "Medium" },
    { id: 2, area: "East Wing", issue: "Excessive AC usage", status: "Resolved", impact: "High" },
    { id: 3, area: "Developer Zone", issue: "High device idle time", status: "Active", impact: "Low" },
    { id: 4, area: "Cafeteria", issue: "Equipment running on weekends", status: "Under review", impact: "High" },
    { id: 5, area: "Server Room", issue: "Temperature inefficiency", status: "Active", impact: "Critical" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage and monitor office-wide energy usage and sustainability metrics
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export Reports
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              May 2025
            </Button>
            <Button variant="default" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Office Overview</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="analytics">In-Depth Analytics</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <EnergyConsumptionCard
                title="Monthly Energy Usage"
                currentValue={9800}
                maxValue={13600}
                unit="kWh"
                change={15}
                trend="down"
                color="green"
                description="Total office energy consumption this month"
              />
              <EnergyConsumptionCard
                title="Monthly CO₂ Emissions"
                currentValue={4250}
                maxValue={6000}
                unit="kg"
                change={12}
                trend="down"
                color="green"
                description="Estimated carbon emissions from all office activities"
              />
              <EnergyConsumptionCard
                title="Dark Mode Adoption"
                currentValue={68}
                maxValue={100}
                unit="%"
                change={8}
                trend="up"
                color="blue"
                description="Percentage of employees using dark mode"
              />
              <EnergyConsumptionCard
                title="Cost Savings"
                currentValue={4800}
                maxValue={6500}
                unit="$"
                change={10}
                trend="up"
                color="green"
                description="Projected monthly savings from energy initiatives"
              />
            </div>

            {/* Energy Usage Chart */}
            <SustainabilityChart
              type="line"
              data={officeEnergyData}
              title="Office-Wide Energy Consumption Trend"
              description="Monthly energy usage compared to targets and baseline"
              xAxisKey="month"
              dataKeys={[
                { key: "actual", color: "#4CAF50" },
                { key: "target", color: "#2196F3" },
                { key: "baseline", color: "#9E9E9E" },
              ]}
            />
            
            {/* Department Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SustainabilityChart
                type="bar"
                data={departmentData}
                title="Energy Usage by Department"
                description="Monthly energy consumption breakdown"
                xAxisKey="name"
                dataKeys={[
                  { key: "energy", color: "#2196F3" },
                ]}
              />
              
              <SustainabilityChart
                type="bar"
                data={departmentData}
                title="Energy Savings by Department"
                description="Percentage reduction from baseline"
                xAxisKey="name"
                dataKeys={[
                  { key: "saving", color: "#4CAF50" },
                ]}
              />
            </div>

            {/* Floor Map */}
            <FloorMap />
          </TabsContent>

          <TabsContent value="employees" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <DashboardCard
                title="Total Employees"
                variant="highlighted"
                className="text-center"
              >
                <div className="flex flex-col items-center">
                  <div className="mt-2 flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary text-3xl font-bold">
                    156
                  </div>
                  <p className="mt-2 text-muted-foreground">Active participants</p>
                </div>
              </DashboardCard>
              
              <DashboardCard
                title="Energy Conscious"
                variant="highlighted"
                className="text-center"
              >
                <div className="flex flex-col items-center">
                  <div className="mt-2 flex items-center justify-center h-20 w-20 rounded-full bg-eco-green/10 text-eco-green text-3xl font-bold">
                    78%
                  </div>
                  <p className="mt-2 text-muted-foreground">Using energy-saving features</p>
                </div>
              </DashboardCard>
              
              <DashboardCard
                title="Awe Points"
                variant="highlighted"
                className="text-center"
              >
                <div className="flex flex-col items-center">
                  <div className="mt-2 flex items-center justify-center h-20 w-20 rounded-full bg-eco-blue/10 text-eco-blue text-3xl font-bold">
                    52k
                  </div>
                  <p className="mt-2 text-muted-foreground">Points awarded this month</p>
                </div>
              </DashboardCard>
            </div>
            
            <DashboardCard title="Top Performers" description="Employees with highest energy savings">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Energy Saving</TableHead>
                    <TableHead className="text-right">Awe Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell className="flex items-center">
                        {employee.saving}%
                        <ArrowUp className="ml-2 h-4 w-4 text-eco-green" />
                      </TableCell>
                      <TableCell className="text-right font-medium">{employee.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-center mt-4">
                <Button className="gap-2">
                  <Users className="h-4 w-4" />
                  View All Employees
                </Button>
              </div>
            </DashboardCard>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SustainabilityChart
                type="pie"
                data={[
                  { level: "Bronze", value: 65 },
                  { level: "Silver", value: 25 },
                  { level: "Gold", value: 8 },
                  { level: "Platinum", value: 2 },
                ]}
                title="Awe Points Distribution"
                description="Employee achievement levels"
                xAxisKey="level"
                dataKeys={[
                  { key: "value", color: "#CD7F32" },
                  { key: "value", color: "#C0C0C0" },
                  { key: "value", color: "#FFD700" },
                  { key: "value", color: "#E5E4E2" },
                ]}
              />
              
              <SustainabilityChart
                type="bar"
                data={[
                  { activity: "Dark Mode", points: 12500 },
                  { activity: "Seating", points: 9800 },
                  { activity: "Power Saving", points: 8200 },
                  { activity: "Reporting", points: 5400 },
                  { activity: "Idle Time", points: 3600 },
                ]}
                title="Points by Activity"
                description="How employees are earning Awe Points"
                xAxisKey="activity"
                dataKeys={[
                  { key: "points", color: "#2196F3" },
                ]}
              />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SustainabilityChart
                type="bar"
                data={[
                  { hour: "8AM", workstations: 32, lighting: 45, ac: 60 },
                  { hour: "10AM", workstations: 85, lighting: 75, ac: 85 },
                  { hour: "12PM", workstations: 70, lighting: 65, ac: 90 },
                  { hour: "2PM", workstations: 80, lighting: 70, ac: 85 },
                  { hour: "4PM", workstations: 75, lighting: 70, ac: 80 },
                  { hour: "6PM", workstations: 45, lighting: 50, ac: 60 },
                ]}
                title="Daily Energy Usage Pattern"
                description="Hourly breakdown of energy consumption"
                xAxisKey="hour"
                dataKeys={[
                  { key: "workstations", color: "#2196F3" },
                  { key: "lighting", color: "#FFC107" },
                  { key: "ac", color: "#4CAF50" },
                ]}
              />
              
              <SustainabilityChart
                type="line"
                data={[
                  { day: "Mon", actual: 450, capacity: 500 },
                  { day: "Tue", actual: 475, capacity: 500 },
                  { day: "Wed", actual: 480, capacity: 500 },
                  { day: "Thu", actual: 460, capacity: 500 },
                  { day: "Fri", actual: 430, capacity: 500 },
                ]}
                title="Office Occupancy"
                description="Daily office attendance vs. capacity"
                xAxisKey="day"
                dataKeys={[
                  { key: "actual", color: "#2196F3" },
                  { key: "capacity", color: "#9E9E9E" },
                ]}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SustainabilityChart
                type="pie"
                data={[
                  { source: "Laptops", value: 35 },
                  { source: "Lighting", value: 22 },
                  { source: "HVAC", value: 28 },
                  { source: "Servers", value: 10 },
                  { source: "Other", value: 5 },
                ]}
                title="Energy Consumption by Source"
                description="Breakdown of office energy usage"
                xAxisKey="source"
                dataKeys={[
                  { key: "value", color: "#2196F3" },
                  { key: "value", color: "#FFC107" },
                  { key: "value", color: "#4CAF50" },
                  { key: "value", color: "#9C27B0" },
                  { key: "value", color: "#9E9E9E" },
                ]}
              />
              
              <DashboardCard title="CO₂ Emissions Analysis">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Current Month</span>
                      <span className="text-eco-green flex items-center">
                        <ArrowDown className="mr-1 h-4 w-4" />
                        12% reduction
                      </span>
                    </div>
                    <div className="text-3xl font-bold">4,250 kg CO₂</div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Year to Date</span>
                      <span className="text-eco-green flex items-center">
                        <ArrowDown className="mr-1 h-4 w-4" />
                        18% reduction
                      </span>
                    </div>
                    <div className="text-3xl font-bold">38,450 kg CO₂</div>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Annual Target</span>
                      <span className="text-eco-green flex items-center">
                        74% complete
                      </span>
                    </div>
                    <div className="text-3xl font-bold">80,000 kg CO₂</div>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6">
            <DashboardCard title="Energy Alerts" description="Active and recent energy issues">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Area</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {energyAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>{alert.area}</TableCell>
                      <TableCell>{alert.issue}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            alert.status === "Active"
                              ? "bg-eco-red"
                              : alert.status === "Resolved"
                              ? "bg-eco-green"
                              : "bg-eco-yellow"
                          }
                        >
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            alert.impact === "Critical"
                              ? "border-eco-red text-eco-red"
                              : alert.impact === "High"
                              ? "border-eco-yellow text-eco-yellow"
                              : alert.impact === "Medium"
                              ? "border-eco-blue text-eco-blue"
                              : "border-muted-foreground"
                          }
                        >
                          {alert.impact}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DashboardCard>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardCard title="System Health" description="Energy monitoring system status">
                <div className="space-y-4 mt-2">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-eco-green mr-3"></div>
                      <span>Laptop Usage Tracker</span>
                    </div>
                    <span className="text-eco-green font-medium">Online</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-eco-green mr-3"></div>
                      <span>Proximity Sensor System</span>
                    </div>
                    <span className="text-eco-green font-medium">Online</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-eco-yellow mr-3"></div>
                      <span>Building Management System</span>
                    </div>
                    <span className="text-eco-yellow font-medium">Partial</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-eco-red mr-3"></div>
                      <span>Smart Lighting System</span>
                    </div>
                    <span className="text-eco-red font-medium">Issue Detected</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-eco-green mr-3"></div>
                      <span>HVAC Controller</span>
                    </div>
                    <span className="text-eco-green font-medium">Online</span>
                  </div>
                </div>
              </DashboardCard>
              
              <DashboardCard title="Maintenance Schedule" description="Upcoming maintenance for systems">
                <div className="space-y-4 mt-2">
                  <div className="p-3 bg-muted/50 rounded-lg border">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Smart Lighting Calibration</span>
                      <Badge variant="outline">Tomorrow</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Scheduled maintenance for East Wing lighting sensors</p>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg border">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Proximity Sensor Update</span>
                      <Badge variant="outline">May 26</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Firmware update for all office proximity sensors</p>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg border">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">HVAC System Inspection</span>
                      <Badge variant="outline">May 30</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Quarterly inspection of heating and cooling systems</p>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg border">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Server Room Optimization</span>
                      <Badge variant="outline">June 2</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Energy efficiency improvements for server cooling</p>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
