import NavBar from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SustainabilityChart from "@/components/SustainabilityChart";
import { EnergyConsumptionCard } from "@/components/EnergyConsumptionCard";
import AwePointsCard from "@/components/AwePointsCard";
import FloorMap from "@/components/FloorMap";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ChartLine, Monitor, Settings, TrendingDown, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardCard } from "@/components/DashboardCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "n1",
      title: "Light Mode Detected",
      description: "Switch to Dark Mode to save 20% energy consumption",
      action: "Switch Now",
      type: "energy",
      read: false,
    },
    {
      id: "n2",
      title: "Seating Optimization",
      description: "Move closer to colleagues in Zone B to optimize AC usage",
      action: "View Map",
      type: "proximity",
      read: false,
    },
  ]);

  // Energy consumption mock data
  const energyData = [
    { month: "Jan", actual: 45, target: 50, baseline: 65 },
    { month: "Feb", actual: 52, target: 50, baseline: 65 },
    { month: "Mar", actual: 49, target: 48, baseline: 65 },
    { month: "Apr", actual: 47, target: 46, baseline: 65 },
    { month: "May", actual: 42, target: 45, baseline: 65 },
    { month: "Jun", actual: 38, target: 43, baseline: 65 },
    { month: "Jul", actual: 35, target: 41, baseline: 65 },
    { month: "Aug", actual: 30, target: 40, baseline: 65 },
  ];

  // Carbon emissions mock data
  const emissionsData = [
    { device: "Laptop", emissions: 35 },
    { device: "Lighting", emissions: 25 },
    { device: "AC", emissions: 40 },
  ];

  // Recent achievements for Awe Points card
  const recentAchievements = [
    {
      id: "a1",
      title: "Used Dark Mode for 3 days",
      points: 30,
      date: "2025-05-21",
    },
    {
      id: "a2",
      title: "Optimized seating arrangement",
      points: 50,
      date: "2025-05-20",
    },
    {
      id: "a3",
      title: "Reduced laptop idle time",
      points: 25,
      date: "2025-05-19",
    },
  ];

  // Switch to dark mode handler
  const handleSwitchToDarkMode = () => {
    document.documentElement.classList.add("dark");
    setDarkMode(true);
    toast.success("Switched to Dark Mode! You've earned 10 Awe Points!");

    // Update notifications
    setNotifications(notifications.filter(n => n.id !== "n1"));
  };

  // Show toast when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!darkMode && notifications.some(n => n.id === "n1")) {
        toast("Energy Saving Tip: Switch to Dark Mode to reduce energy consumption", {
          action: {
            label: "Switch",
            onClick: handleSwitchToDarkMode
          },
          duration: 10000,
        });
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [darkMode, notifications]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Energy Dashboard</h1>
            <p className="text-muted-foreground">
              Track your energy usage, carbon footprint, and sustainability efforts.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Dashboard Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="energy">Energy Usage</TabsTrigger>
            <TabsTrigger value="carbon">Carbon Footprint</TabsTrigger>
            <TabsTrigger value="optimization">Optimizations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <EnergyConsumptionCard
                title="Daily Energy Usage"
                currentValue={4.2}
                maxValue={6}
                unit="kWh"
                change={12}
                trend="down"
                color="green"
                description="Your energy consumption compared to your daily target"
              />
              <EnergyConsumptionCard
                title="CO₂ Emissions"
                currentValue={1.8}
                maxValue={3}
                unit="kg"
                change={8}
                trend="down"
                color="blue"
                description="Estimated carbon emissions from your workstation"
              />
              <EnergyConsumptionCard
                title="Active Screen Time"
                currentValue={6.5}
                maxValue={8}
                unit="hrs"
                color="yellow"
                description="Total time your screen has been active today"
              />
              <EnergyConsumptionCard
                title="Energy Savings"
                currentValue={18}
                maxValue={25}
                unit="%"
                change={5}
                trend="up"
                color="green"
                description="Energy saved relative to office average"
              />
            </div>

            {/* Energy Usage Chart & Awe Points */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SustainabilityChart
                type="line"
                data={energyData}
                title="Energy Consumption Trend"
                description="Your daily energy usage compared to targets and baseline"
                xAxisKey="month"
                dataKeys={[
                  { key: "actual", color: "#4CAF50" },
                  { key: "target", color: "#2196F3" },
                  { key: "baseline", color: "#9E9E9E" },
                ]}
                className="lg:col-span-2"
              />
              
              <AwePointsCard 
                points={780}
                level="Silver"
                nextLevelPoints={1000}
                rank={42}
                totalUsers={156}
                recentAchievements={recentAchievements}
              />
            </div>

            {/* Floor Map */}
            <FloorMap />

            {/* Notifications */}
            <DashboardCard 
              title="Action Items" 
              description="Recommendations to improve your sustainability score"
              variant="highlighted"
            >
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border"
                    >
                      <div className="flex items-start gap-3">
                        {notification.type === "energy" ? (
                          <Monitor className="h-5 w-5 text-eco-blue mt-1" />
                        ) : (
                          <ChartLine className="h-5 w-5 text-eco-green mt-1" />
                        )}
                        <div>
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (notification.id === "n1") {
                            handleSwitchToDarkMode();
                          } else {
                            setNotifications(notifications.filter(n => n.id !== notification.id));
                          }
                        }}
                      >
                        {notification.action}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>Great job! You've addressed all your action items.</p>
                  </div>
                )}
              </div>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="energy" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SustainabilityChart
                type="bar"
                data={[
                  { day: "Mon", laptop: 2.1, lighting: 1.2, ac: 1.5 },
                  { day: "Tue", laptop: 2.3, lighting: 1.1, ac: 1.3 },
                  { day: "Wed", laptop: 1.9, lighting: 1.0, ac: 1.4 },
                  { day: "Thu", laptop: 2.2, lighting: 1.2, ac: 1.2 },
                  { day: "Fri", laptop: 1.8, lighting: 0.9, ac: 1.0 },
                ]}
                title="Daily Energy Breakdown"
                description="Energy consumption by device type"
                xAxisKey="day"
                dataKeys={[
                  { key: "laptop", color: "#2196F3" },
                  { key: "lighting", color: "#FFC107" },
                  { key: "ac", color: "#4CAF50" },
                ]}
              />

              <SustainabilityChart
                type="pie"
                data={[
                  { source: "Renewable", value: 68 },
                  { source: "Non-renewable", value: 32 },
                ]}
                title="Energy Source Distribution"
                description="Renewable vs non-renewable energy sources"
                xAxisKey="source"
                dataKeys={[
                  { key: "value", color: "#4CAF50" },
                  { key: "value", color: "#F44336" },
                ]}
              />
            </div>

            <DashboardCard title="Energy Saving Opportunities">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-eco-green flex items-center justify-center text-white">
                      <TrendingDown className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Switch to Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Save up to 20% of screen energy consumption
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-eco-green">20% savings</div>
                    <div className="text-sm text-muted-foreground">~0.8 kWh daily</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-eco-blue flex items-center justify-center text-white">
                      <TrendingDown className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Optimize Seating Location</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduce AC energy by sitting in energy-efficient zones
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-eco-blue">15% savings</div>
                    <div className="text-sm text-muted-foreground">~1.2 kWh daily</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-eco-yellow flex items-center justify-center text-white">
                      <TrendingDown className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Reduce Idle Time</h4>
                      <p className="text-sm text-muted-foreground">
                        Configure automatic sleep mode after 5 minutes of inactivity
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-eco-yellow">8% savings</div>
                    <div className="text-sm text-muted-foreground">~0.4 kWh daily</div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button>
                    View All Opportunities
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="carbon" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SustainabilityChart
                type="pie"
                data={emissionsData}
                title="Carbon Emission Sources"
                description="Carbon footprint breakdown by device"
                xAxisKey="device"
                dataKeys={[
                  { key: "emissions", color: "#4CAF50" },
                  { key: "emissions", color: "#2196F3" },
                  { key: "emissions", color: "#FFC107" },
                ]}
              />

              <SustainabilityChart
                type="line"
                data={[
                  { week: "W1", emissions: 12.5, average: 15.2, target: 13.0 },
                  { week: "W2", emissions: 11.8, average: 15.2, target: 13.0 },
                  { week: "W3", emissions: 10.9, average: 14.8, target: 12.5 },
                  { week: "W4", emissions: 11.2, average: 14.5, target: 12.5 },
                  { week: "W5", emissions: 10.5, average: 14.2, target: 12.0 },
                  { week: "W6", emissions: 10.1, average: 14.0, target: 12.0 },
                  { week: "W7", emissions: 9.8, average: 13.8, target: 11.5 },
                  { week: "W8", emissions: 9.3, average: 13.5, target: 11.5 },
                ]}
                title="Emissions Trend"
                description="Your weekly emissions compared to office average and targets"
                xAxisKey="week"
                dataKeys={[
                  { key: "emissions", color: "#4CAF50" },
                  { key: "average", color: "#9E9E9E" },
                  { key: "target", color: "#2196F3" },
                ]}
              />
            </div>
            
            <DashboardCard title="Carbon Reduction Impact">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg border">
                  <div className="text-4xl font-bold text-eco-green mb-2">42</div>
                  <div className="text-center">
                    <div className="font-medium">kg CO₂ saved</div>
                    <div className="text-sm text-muted-foreground">This month</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg border">
                  <div className="text-4xl font-bold text-eco-blue mb-2">12</div>
                  <div className="text-center">
                    <div className="font-medium">Trees equivalent</div>
                    <div className="text-sm text-muted-foreground">Of CO₂ absorbed</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg border">
                  <div className="text-4xl font-bold text-eco-yellow mb-2">186</div>
                  <div className="text-center">
                    <div className="font-medium">km car travel</div>
                    <div className="text-sm text-muted-foreground">Emissions avoided</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="mb-4">
                  Your carbon reduction efforts have made a significant impact. Keep up the good work!
                </p>
                <Button variant="outline">
                  Share Your Impact
                </Button>
              </div>
            </DashboardCard>
          </TabsContent>
          
          <TabsContent value="optimization" className="space-y-6">
            <FloorMap />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardCard
                title="Seating Recommendations"
                description="Optimize your seating location to reduce energy consumption"
              >
                <div className="space-y-3 mt-2">
                  <div className="p-3 bg-muted/50 rounded-lg border flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Move to Zone A</h4>
                      <p className="text-sm text-muted-foreground">Near windows, natural light reduces lighting needs</p>
                    </div>
                    <Badge className="bg-eco-green">High Impact</Badge>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg border flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Cluster with Team</h4>
                      <p className="text-sm text-muted-foreground">Sit closer to teammates to optimize AC and lighting</p>
                    </div>
                    <Badge className="bg-eco-yellow">Medium Impact</Badge>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg border flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Use Meeting Room B</h4>
                      <p className="text-sm text-muted-foreground">Energy efficient room for your scheduled meetings</p>
                    </div>
                    <Badge className="bg-eco-blue">Notable Impact</Badge>
                  </div>
                </div>
              </DashboardCard>
              
              <DashboardCard
                title="Device Optimization"
                description="Settings to reduce energy consumption of your devices"
              >
                <div className="space-y-3 mt-2">
                  <div className="p-3 bg-muted/50 rounded-lg border flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Screen Brightness</h4>
                      <p className="text-sm text-muted-foreground">Reduce to 70% in well-lit areas</p>
                    </div>
                    <Button size="sm" onClick={handleSwitchToDarkMode}>Optimize</Button>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg border flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">Reduces energy usage by up to 20%</p>
                    </div>
                    <Button size="sm" onClick={handleSwitchToDarkMode}>Enable</Button>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg border flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Sleep Settings</h4>
                      <p className="text-sm text-muted-foreground">Set sleep after 5 minutes of inactivity</p>
                    </div>
                    <Button size="sm">Configure</Button>
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

export default Dashboard;
