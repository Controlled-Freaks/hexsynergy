
import { DashboardCard } from "@/components/DashboardCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Laptop, MonitorUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EmployeeProps {
  className?: string;
}

export function EmployeeCard({ className }: EmployeeProps) {
  // Mock employee data
  const employee = {
    id: "e123",
    name: "Rajesh Kumar",
    department: "Software Development",
    building: "Building A",
    floor: 2,
    avatar: "",
    awePoints: 780,
    level: "Silver",
    nextLevelPoints: 1000,
    rank: 42,
    totalEmployees: 350,
    powerUsage: {
      today: 3.8,
      yesterday: 4.2,
      weekly: 21.5,
      weeklyAvg: 3.07,
      savings: 12
    },
    seatingZone: "Zone B-East",
    darkMode: false,
    carbonSaved: 17.8,
    stairsVsElevator: {
      stairs: 65,
      elevator: 35
    }
  };

  // Energy actions for the week
  const energyActions = [
    { action: "Used stairs instead of elevator", date: "Today", points: 15, type: "movement" },
    { action: "Optimized laptop brightness", date: "Yesterday", points: 10, type: "device" },
    { action: "Seated in energy-efficient zone", date: "2 days ago", points: 20, type: "seating" },
    { action: "Switched to dark mode", date: "3 days ago", points: 30, type: "device" }
  ];

  // Handler for switching to dark mode
  const handleSwitchToDarkMode = () => {
    document.documentElement.classList.add("dark");
    toast.success("Switched to Dark Mode! You've earned 10 Awe Points!");
  };

  return (
    <DashboardCard 
      title="Your Energy Profile"
      description="Personal energy metrics and sustainability contributions"
      className={className}
    >
      <div className="space-y-6">
        {/* Employee Profile Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-primary">
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback className="text-lg">{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{employee.name}</h3>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>{employee.department}</span>
              <span>•</span>
              <span>{employee.building}, Floor {employee.floor}</span>
              <span>•</span>
              <span>{employee.seatingZone}</span>
            </div>
          </div>
        </div>

        {/* Energy Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-eco-green" />
                <span className="font-medium">Today's Energy Usage</span>
              </div>
              <Badge variant="outline" className="text-eco-green border-eco-green">
                {employee.powerUsage.savings}% Below Avg
              </Badge>
            </div>
            <div className="mt-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Current</span>
                <span className="text-sm font-medium">{employee.powerUsage.today} kWh</span>
              </div>
              <Progress value={employee.powerUsage.today / 5 * 100} className="h-2 [&>div]:bg-eco-green" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 kWh</span>
                <span>5 kWh</span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Yesterday</span>
                  <span>{employee.powerUsage.yesterday} kWh</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Weekly Average</span>
                  <span>{employee.powerUsage.weeklyAvg} kWh</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>CO₂ Saved This Month</span>
                  <span className="text-eco-green">{employee.carbonSaved} kg</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg border">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-eco-yellow" />
                <span className="font-medium">Awe Points & Achievements</span>
              </div>
              <Badge className="bg-eco-blue">Rank #{employee.rank}</Badge>
            </div>
            <div className="mt-3">
              <div className="flex justify-between items-end mb-1">
                <span className="text-sm">{employee.level} Level</span>
                <div className="text-right">
                  <span className="text-lg font-bold">{employee.awePoints}</span>
                  <span className="text-sm text-muted-foreground"> / {employee.nextLevelPoints}</span>
                </div>
              </div>
              <Progress 
                value={(employee.awePoints / employee.nextLevelPoints) * 100} 
                className="h-2 [&>div]:bg-eco-blue" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                {employee.nextLevelPoints - employee.awePoints} points to reach Gold level
              </p>
              
              <h4 className="font-medium text-sm mt-3">Recent Actions</h4>
              <div className="mt-1 space-y-1.5">
                {energyActions.slice(0, 2).map((action, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{action.action}</span>
                    <Badge variant="outline" className="text-eco-green">+{action.points} pts</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Optimization Recommendations */}
        <div className="p-4 bg-muted/30 rounded-lg border">
          <h3 className="font-medium mb-3">Recommended Optimizations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-muted/50 rounded-lg border flex items-start justify-between">
              <div className="flex gap-2">
                <Laptop className="h-5 w-5 text-eco-blue mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Switch to Dark Mode</h4>
                  <p className="text-xs text-muted-foreground">Reduces screen energy by ~20%</p>
                </div>
              </div>
              <Button size="sm" onClick={handleSwitchToDarkMode}>Enable</Button>
            </div>
            
            <div className="p-3 bg-muted/50 rounded-lg border flex items-start justify-between">
              <div className="flex gap-2">
                <MonitorUp className="h-5 w-5 text-eco-green mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Move to Zone A-West</h4>
                  <p className="text-xs text-muted-foreground">Optimized for natural light</p>
                </div>
              </div>
              <Button size="sm" variant="outline">View Map</Button>
            </div>
          </div>
        </div>
        
        {/* Elevator vs Stairs Usage */}
        <div className="p-4 bg-muted/30 rounded-lg border">
          <h3 className="font-medium mb-3">Movement Patterns</h3>
          <div className="flex items-center gap-4">
            <div className="w-1/3">
              <div className="aspect-square rounded-full border-8 border-eco-green relative flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full bg-eco-green"
                  style={{ clipPath: `inset(0 0 0 ${100 - employee.stairsVsElevator.stairs}%)` }}
                ></div>
                <span className="text-xl font-bold relative z-10">{employee.stairsVsElevator.stairs}%</span>
              </div>
              <p className="text-center mt-2 text-sm font-medium">Stairs</p>
            </div>
            <div className="flex-1">
              <p className="text-sm">
                You've chosen stairs over elevators {employee.stairsVsElevator.stairs}% of the time this month, 
                saving approximately 5.2 kWh of energy.
              </p>
              <p className="text-sm mt-2">
                <strong>Challenge:</strong> Reach 75% stairs usage this month to earn 50 bonus Awe Points.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
