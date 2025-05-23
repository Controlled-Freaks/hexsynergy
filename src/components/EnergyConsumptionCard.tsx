
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface EnergyConsumptionCardProps {
  title: string;
  currentValue: number;
  maxValue: number;
  unit: string;
  change?: number;
  trend?: "up" | "down";
  className?: string;
  description?: string;
  color?: "green" | "blue" | "yellow" | "red";
}

export function EnergyConsumptionCard({
  title,
  currentValue,
  maxValue,
  unit,
  change,
  trend,
  className,
  description,
  color = "green",
}: EnergyConsumptionCardProps) {
  const percentage = Math.min(Math.round((currentValue / maxValue) * 100), 100);
  
  const colorClasses = {
    green: "text-eco-green",
    blue: "text-eco-blue",
    yellow: "text-eco-yellow",
    red: "text-eco-red",
  };
  
  const progressColors = {
    green: "bg-eco-green",
    blue: "bg-eco-blue",
    yellow: "bg-eco-yellow",
    red: "bg-eco-red",
  };

  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">
          {title}
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 ml-1 inline cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardTitle>
        
        {change !== undefined && trend && (
          <div className={cn(
            "flex items-center text-xs font-medium",
            trend === "down" ? "text-eco-green" : "text-eco-red"
          )}>
            {trend === "down" ? (
              <ArrowDown className="mr-1 h-4 w-4" />
            ) : (
              <ArrowUp className="mr-1 h-4 w-4" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex items-end justify-between">
            <span className={cn("text-2xl font-bold", colorClasses[color])}>
              {currentValue.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">{unit}</span>
            </span>
            <span className="text-sm text-muted-foreground">
              max {maxValue.toLocaleString()} {unit}
            </span>
          </div>
          
          <Progress
            value={percentage}
            className={cn("h-2", {
              "bg-slate-200": true,
              "[&>div]:transition-all [&>div]:duration-500": true,
              [`[&>div]:${progressColors[color]}`]: true
            })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
