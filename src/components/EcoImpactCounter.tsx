
import { useEffect, useState } from 'react';
import { Leaf, Globe, Wind, TreeDeciduous } from 'lucide-react';

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
    const duration = 2500; // 2.5 seconds for animation
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="bg-primary/10 backdrop-blur-sm rounded-lg p-4 text-center transform transition-all duration-500 hover:scale-105 hover:bg-primary/20">
        <div className="flex justify-center mb-2">
          <div className="p-2 bg-primary/20 rounded-full">
            <Wind className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="text-2xl font-bold animate-[countUp_0.5s_ease-out]">{formatNumber(metrics.energy)}</div>
        <div className="text-sm text-muted-foreground">kWh Renewable Energy</div>
      </div>
      
      <div className="bg-primary/10 backdrop-blur-sm rounded-lg p-4 text-center transform transition-all duration-500 hover:scale-105 hover:bg-primary/20">
        <div className="flex justify-center mb-2">
          <div className="p-2 bg-primary/20 rounded-full">
            <TreeDeciduous className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="text-2xl font-bold animate-[countUp_0.7s_ease-out]">{formatNumber(metrics.trees)}</div>
        <div className="text-sm text-muted-foreground">Trees Planted</div>
      </div>
      
      <div className="bg-primary/10 backdrop-blur-sm rounded-lg p-4 text-center transform transition-all duration-500 hover:scale-105 hover:bg-primary/20">
        <div className="flex justify-center mb-2">
          <div className="p-2 bg-primary/20 rounded-full">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="text-2xl font-bold animate-[countUp_0.9s_ease-out]">{formatNumber(metrics.carbon)}</div>
        <div className="text-sm text-muted-foreground">Tons CO₂ Reduced</div>
      </div>
      
      <div className="bg-primary/10 backdrop-blur-sm rounded-lg p-4 text-center transform transition-all duration-500 hover:scale-105 hover:bg-primary/20">
        <div className="flex justify-center mb-2">
          <div className="p-2 bg-primary/20 rounded-full">
            <Globe className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="text-2xl font-bold animate-[countUp_1.1s_ease-out]">{formatNumber(metrics.water)}</div>
        <div className="text-sm text-muted-foreground">Liters Water Saved</div>
      </div>
    </div>
  );
}
