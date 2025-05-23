
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface SmartLightingCardProps {
  className?: string;
}

export function SmartLightingCard({ className }: SmartLightingCardProps) {
  // Mock data for zone lighting
  const zoneLightingData = [
    {
      zone: "Marketing Zone A",
      brightness: 80,
      naturalLight: "medium",
      power: 450,
      dimmed: 20,
      isActive: true
    },
    {
      zone: "Sales Zone B",
      brightness: 75,
      naturalLight: "high",
      power: 420,
      dimmed: 25,
      isActive: true
    },
    {
      zone: "HR Zone A",
      brightness: 85,
      naturalLight: "low",
      power: 480,
      dimmed: 15,
      isActive: true
    },
    {
      zone: "Development Zone A",
      brightness: 80,
      naturalLight: "medium",
      power: 450,
      dimmed: 20,
      isActive: true
    },
    {
      zone: "Meeting Room 301",
      brightness: 70,
      naturalLight: "low",
      power: 380,
      dimmed: 30,
      isActive: false
    },
    {
      zone: "Common Area Floor 2",
      brightness: 65,
      naturalLight: "high",
      power: 320,
      dimmed: 35,
      isActive: true
    }
  ];

  // Overall efficiency stats
  const efficiencyStats = {
    overallEfficiency: 91,
    totalEnergyUsed: 2480,
    totalEnergySaved: 852,
    co2Reduction: 328
  };

  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-eco-yellow" />
          Smart Lighting Systems
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Optimize lighting based on occupancy and natural light availability
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Zone Lighting Status</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {zoneLightingData.map((zone) => (
              <div 
                key={zone.zone}
                className="p-3 bg-muted/50 rounded-lg border flex flex-wrap md:flex-nowrap items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center",
                    zone.isActive ? "bg-eco-green text-white" : "bg-muted text-muted-foreground"
                  )}>
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">{zone.zone}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>Brightness: {zone.brightness}%</span>
                      <span>•</span>
                      <span className="capitalize">Natural light: {zone.naturalLight}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">{zone.power} W</div>
                    <div className="text-xs text-eco-green">dimmed by {zone.dimmed}%</div>
                  </div>
                  <Badge className={zone.isActive ? "bg-eco-green" : "bg-muted"}>
                    {zone.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg border space-y-4">
          <h3 className="font-medium">Overall Lighting Efficiency</h3>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Efficiency Rating</span>
              <span className="text-sm font-medium">{efficiencyStats.overallEfficiency}%</span>
            </div>
            <Progress 
              value={efficiencyStats.overallEfficiency} 
              className="h-2 [&>div]:bg-eco-green"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-3xl font-bold text-eco-green">
                {efficiencyStats.totalEnergyUsed}
                <span className="text-sm font-normal ml-1">kWh</span>
              </span>
              <span className="text-sm text-center text-muted-foreground mt-1">Total energy used</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-3xl font-bold text-eco-blue">
                {efficiencyStats.totalEnergySaved}
                <span className="text-sm font-normal ml-1">kWh</span>
              </span>
              <span className="text-sm text-center text-muted-foreground mt-1">Energy saved</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-eco-yellow">{efficiencyStats.co2Reduction}</span>
                <span className="text-sm font-normal ml-1">kg CO₂</span>
              </div>
              <span className="text-sm text-center text-muted-foreground mt-1">CO₂ reduction</span>
            </div>
          </div>
          
          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-eco-green" />
              <span className="text-sm">Active occupancy detection saving 152 kWh monthly</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-eco-green" />
              <span className="text-sm">Natural light optimization saving 320 kWh monthly</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-eco-green" />
              <span className="text-sm">Auto-dimming in low traffic areas saving 380 kWh monthly</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
