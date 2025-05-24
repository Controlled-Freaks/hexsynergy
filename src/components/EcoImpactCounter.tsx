
import { useEffect, useState } from 'react';

export default function EcoImpactCounter() {
  const [metrics, setMetrics] = useState({
    energy: 0,
    trees: 0,
    carbon: 0,
    water: 0
  });

  const targets = {
    energy: 6350000, // kWh of renewable energy
    trees: 8500,     // Trees planted
    carbon: 2800,    // Tons of CO2 reduction
    water: 42000000  // Liters of water saved
  };

  useEffect(() => {
    // Animate counters on component mount
    const duration = 2000; // 2 seconds for animation
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const easeProgress = easeOutCubic(progress);

      setMetrics({
        energy: Math.floor(targets.energy * easeProgress),
        trees: Math.floor(targets.trees * easeProgress),
        carbon: Math.floor(targets.carbon * easeProgress),
        water: Math.floor(targets.water * easeProgress)
      });

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / framesPerSecond);

    return () => clearInterval(timer);
  }, []);

  // Easing function for smoother animation
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 max-w-3xl">
      <div className="bg-primary/10 rounded-lg p-3 text-center">
        <div className="text-xl font-bold">{formatNumber(metrics.energy)}</div>
        <div className="text-xs text-muted-foreground">kWh Renewable Energy</div>
      </div>
      <div className="bg-primary/10 rounded-lg p-3 text-center">
        <div className="text-xl font-bold">{formatNumber(metrics.trees)}</div>
        <div className="text-xs text-muted-foreground">Trees Planted</div>
      </div>
      <div className="bg-primary/10 rounded-lg p-3 text-center">
        <div className="text-xl font-bold">{formatNumber(metrics.carbon)}</div>
        <div className="text-xs text-muted-foreground">Tons CO₂ Reduced</div>
      </div>
      <div className="bg-primary/10 rounded-lg p-3 text-center">
        <div className="text-xl font-bold">{formatNumber(metrics.water)}</div>
        <div className="text-xs text-muted-foreground">Liters Water Saved</div>
      </div>
    </div>
  );
}
