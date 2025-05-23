
import { useEffect, useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { Badge } from "./ui/badge";

interface Person {
  id: string;
  name: string;
  x: number;
  y: number;
  energySaving: boolean;
}

interface EnergyZone {
  id: string;
  x: number;
  y: number;
  radius: number;
  level: "low" | "medium" | "high";
}

export default function FloorMap() {
  const [people, setPeople] = useState<Person[]>([
    { id: "p1", name: "John D.", x: 20, y: 30, energySaving: true },
    { id: "p2", name: "Emma S.", x: 25, y: 33, energySaving: true },
    { id: "p3", name: "Michael B.", x: 70, y: 40, energySaving: false },
    { id: "p4", name: "Sophia T.", x: 75, y: 45, energySaving: false },
    { id: "p5", name: "David M.", x: 40, y: 70, energySaving: true },
    { id: "p6", name: "Sarah L.", x: 45, y: 75, energySaving: true },
  ]);

  const [zones, setZones] = useState<EnergyZone[]>([
    { id: "z1", x: 22, y: 30, radius: 15, level: "low" },
    { id: "z2", x: 72, y: 42, radius: 20, level: "high" },
    { id: "z3", x: 42, y: 72, radius: 18, level: "low" },
  ]);

  useEffect(() => {
    // Simulate movement/changes
    const interval = setInterval(() => {
      setPeople((prev) =>
        prev.map((person) => ({
          ...person,
          x: person.x + (Math.random() - 0.5) * 2,
          y: person.y + (Math.random() - 0.5) * 2,
        }))
      );

      // Randomly update zone sizes
      setZones((prev) =>
        prev.map((zone) => ({
          ...zone,
          radius: Math.max(10, zone.radius + (Math.random() - 0.5) * 2),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardCard
      title="Floor Map & Energy Zones"
      description="Real-time view of employee seating and energy consumption zones"
    >
      <div className="floor-map-container bg-muted/30 border">
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
                ? "low-energy"
                : zone.level === "medium"
                ? "medium-energy"
                : "high-energy"
            } animate-pulse-slow`}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.radius * 2}px`,
              height: `${zone.radius * 2}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* People */}
        {people.map((person) => (
          <div
            key={person.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${person.x}%`,
              top: `${person.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                person.energySaving ? "bg-eco-green" : "bg-eco-blue"
              }`}
            >
              {person.name.charAt(0)}
            </div>
            <div className="mt-1 text-xs bg-background/90 p-1 rounded shadow-sm">
              {person.name}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-background/90 p-2 rounded-md shadow-md text-xs">
          <div className="font-bold mb-1">Legend</div>
          <div className="flex items-center mb-1">
            <span className="w-3 h-3 rounded-full bg-eco-green mr-2"></span>
            <span>Energy-Saving Mode</span>
          </div>
          <div className="flex items-center mb-1">
            <span className="w-3 h-3 rounded-full bg-eco-blue mr-2"></span>
            <span>Standard Mode</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-eco-green text-eco-green">
              Low Energy Zone
            </Badge>
            <Badge variant="outline" className="border-eco-red text-eco-red">
              High Energy Zone
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm text-muted-foreground">
        <p>
          Employees in high energy zones should consider moving to low energy zones
          to reduce overall energy consumption. The system automatically adjusts
          lighting and temperature in areas with lower occupancy.
        </p>
      </div>
    </DashboardCard>
  );
}
