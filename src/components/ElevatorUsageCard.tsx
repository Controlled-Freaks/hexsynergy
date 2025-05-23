import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, Stars, TrendingDown, Zap } from "lucide-react";
import { SustainabilityChart } from "@/components/SustainabilityChart";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface ElevatorUsageCardProps {
  className?: string;
}

export function ElevatorUsageCard({ className }: ElevatorUsageCardProps) {
  // Simulated floor request data
  const elevatorUsageData = [
    {
      hour: "8 AM",
      requests: 45,
      stairs: 12,
      energyKwh: 3.2,
      baseline: 4.5
    },
    {
      hour: "9 AM",
      requests: 78,
      stairs: 15,
      energyKwh: 5.8,
      baseline: 6.0
    },
    {
      hour: "10 AM",
      requests: 92,
      stairs: 18,
      energyKwh: 6.7,
      baseline: 7.0
    },
    {
      hour: "11 AM",
      requests: 68,
      stairs: 22,
      energyKwh: 4.9,
      baseline: 5.5
    },
    {
      hour: "12 PM",
      requests: 82,
      stairs: 25,
      energyKwh: 6.1,
      baseline: 6.5
    },
    {
      hour: "1 PM",
      requests: 76,
      stairs: 20,
      energyKwh: 5.6,
      baseline: 6.0
    },
    {
      hour: "2 PM",
      requests: 64,
      stairs: 18,
      energyKwh: 4.7,
      baseline: 5.0
    },
    {
      hour: "3 PM",
      requests: 58,
      stairs: 16,
      energyKwh: 4.2,
      baseline: 4.5
    },
    {
      hour: "4 PM",
      requests: 72,
      stairs: 19,
      energyKwh: 5.3,
      baseline: 5.8
    },
    {
      hour: "5 PM",
      requests: 85,
      stairs: 14,
      energyKwh: 6.3,
      baseline: 6.8
    },
    {
      hour: "6 PM",
      requests: 48,
      stairs: 8,
      energyKwh: 3.5,
      baseline: 4.0
    },
  ];

  // Elevator daily stats
  const elevatorFloorHeatmap = [
    { floor: "Floor 5", morning: 85, afternoon: 67, evening: 42 },
    { floor: "Floor 4", morning: 92, afternoon: 78, evening: 38 },
    { floor: "Floor 3", morning: 78, afternoon: 82, evening: 45 },
    { floor: "Floor 2", morning: 65, afternoon: 58, evening: 36 },
    { floor: "Floor 1", morning: 48, afternoon: 52, evening: 32 },
  ];

  // Stats for today
  const todayStats = {
    totalTrips: 738,
    stairsUsed: 187,
    energySaved: 12.5,
    pointsAwarded: 935
  };

  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Stars className="h-5 w-5 mr-2 text-eco-green" />
          Elevator Usage Optimization
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Monitor elevator usage and encourage stair usage for short trips
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="usage" className="space-y-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="usage">Usage Stats</TabsTrigger>
            <TabsTrigger value="heatmap">Floor Heatmap</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
                <span className="text-muted-foreground text-sm">Total Trips</span>
                <span className="text-2xl font-bold">{todayStats.totalTrips}</span>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
                <span className="text-muted-foreground text-sm">Stairs Used</span>
                <span className="text-2xl font-bold text-eco-green">{todayStats.stairsUsed}</span>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
                <span className="text-muted-foreground text-sm">Energy Saved</span>
                <span className="text-2xl font-bold text-eco-blue">{todayStats.energySaved} kWh</span>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center">
                <span className="text-muted-foreground text-sm">Awe Points</span>
                <span className="text-2xl font-bold text-eco-yellow">{todayStats.pointsAwarded}</span>
              </div>
            </div>

            <SustainabilityChart
              type="line"
              data={elevatorUsageData}
              title="Elevator Requests Today"
              description="Monitoring usage patterns throughout the day"
              xAxisKey="hour"
              dataKeys={[
                { key: "requests", color: "#4CAF50" },
                { key: "stairs", color: "#2196F3" }
              ]}
            />

            <SustainabilityChart
              type="line"
              data={elevatorUsageData}
              title="Energy Consumption (kWh)"
              description="Current vs baseline energy usage"
              xAxisKey="hour"
              dataKeys={[
                { key: "energyKwh", color: "#4CAF50" },
                { key: "baseline", color: "#9E9E9E" }
              ]}
            />

            <div className="bg-muted/50 p-4 rounded-lg border">
              <h3 className="font-medium mb-2">Optimization Opportunities</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Use stairs for 1-2 floors</span>
                    <p className="text-sm text-muted-foreground">Save up to 0.2 kWh per trip</p>
                  </div>
                  <Badge className="bg-eco-green">High Impact</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Optimize off-peak elevator count</span>
                    <p className="text-sm text-muted-foreground">Reduce active elevators after 6 PM</p>
                  </div>
                  <Badge className="bg-eco-blue">Medium Impact</Badge>
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="heatmap">
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Floor Request Heatmap</h3>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-xs text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2 text-left">Floor</th>
                        <th className="px-4 py-2 text-left">Morning (8-12)</th>
                        <th className="px-4 py-2 text-left">Afternoon (12-4)</th>
                        <th className="px-4 py-2 text-left">Evening (4-8)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {elevatorFloorHeatmap.map((row) => (
                        <tr key={row.floor} className="border-b border-border">
                          <td className="px-4 py-3 font-medium">{row.floor}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div 
                                className="w-full bg-eco-green/20 h-2 rounded-full overflow-hidden"
                                aria-hidden="true"
                              >
                                <div 
                                  className="bg-eco-green h-2 rounded-full" 
                                  style={{width: `${row.morning}%`}}
                                />
                              </div>
                              <span className="ml-2">{row.morning}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div 
                                className="w-full bg-eco-blue/20 h-2 rounded-full overflow-hidden"
                                aria-hidden="true"
                              >
                                <div 
                                  className="bg-eco-blue h-2 rounded-full" 
                                  style={{width: `${row.afternoon}%`}}
                                />
                              </div>
                              <span className="ml-2">{row.afternoon}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div 
                                className="w-full bg-eco-yellow/20 h-2 rounded-full overflow-hidden"
                                aria-hidden="true"
                              >
                                <div 
                                  className="bg-eco-yellow h-2 rounded-full" 
                                  style={{width: `${row.evening}%`}}
                                />
                              </div>
                              <span className="ml-2">{row.evening}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-muted/30">
                <h3 className="font-medium mb-2">Recommendations</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowUp className="h-4 w-4 text-eco-green shrink-0 mt-0.5" />
                    <span>High traffic between Floor 3-5 during morning hours - consider elevator optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingDown className="h-4 w-4 text-eco-blue shrink-0 mt-0.5" />
                    <span>Low evening usage on higher floors - reduce active elevators after 6 PM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-eco-yellow shrink-0 mt-0.5" />
                    <span>Peak utilization at Floor 4 - promote stair usage for Floor 3 to 4 trips</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-3">Energy Savings</h3>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-sm text-muted-foreground">Monthly Target: 350 kWh</span>
                    <span className="text-sm font-medium">247.5 kWh (71%)</span>
                  </div>
                  <Progress value={71} className="h-2" />
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Projected monthly savings from elevator optimization:</p>
                    <ul className="mt-2 space-y-1 ml-5 list-disc">
                      <li>Stair usage: 95.2 kWh</li>
                      <li>Off-peak optimization: 152.3 kWh</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Environmental Impact</h3>
                  <div className="flex flex-col gap-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">CO₂ Reduction</span>
                        <span className="text-sm">123.75 kg</span>
                      </div>
                      <Progress value={70} className="h-1.5 bg-slate-200 [&>div]:bg-eco-green" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Tree Equivalent</span>
                        <span className="text-sm">5.7 trees/month</span>
                      </div>
                      <Progress value={57} className="h-1.5 bg-slate-200 [&>div]:bg-eco-blue" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Gamification Impact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-3xl font-bold text-eco-green">187</span>
                    <span className="text-sm text-center text-muted-foreground mt-1">Stair trips today</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-3xl font-bold text-eco-blue">935</span>
                    <span className="text-sm text-center text-muted-foreground mt-1">Awe Points awarded</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-3xl font-bold text-eco-yellow">48</span>
                    <span className="text-sm text-center text-muted-foreground mt-1">Active participants</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button>View Participant Leaderboard</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
