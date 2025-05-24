import { useDataContext } from '@/contexts/DataContext';
import { DashboardCard } from './DashboardCard';
import { 
  Zap, 
  TrendingUp, 
  Thermometer, 
  Users, 
  Target, 
  IndianRupee, 
  Leaf, 
  Sun, 
  Wind, 
  Battery, 
  CloudRain, 
  Droplets,
  RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function LiveMetricsPanel() {
  const { realTimeMetrics, refreshData, isLoading } = useDataContext();

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const formatDecimal = (num: number, decimals: number = 1): string => {
    return num.toFixed(decimals);
  };

  const getAirQualityStatus = (aqi: number) => {
    if (aqi <= 50) return { status: 'Good', color: 'bg-green-100 text-green-800' };
    if (aqi <= 100) return { status: 'Moderate', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'Unhealthy', color: 'bg-red-100 text-red-800' };
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-600';
    if (level > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const airQuality = getAirQualityStatus(realTimeMetrics.airQualityIndex);

  return (
    <div className="space-y-4">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live Metrics Dashboard</h2>
          <p className="text-muted-foreground text-sm">
            Last updated: {realTimeMetrics.lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          onClick={refreshData} 
          disabled={isLoading}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Real-time metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        
        {/* Current Power Usage */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Power</p>
              <p className="text-2xl font-bold">{formatNumber(realTimeMetrics.currentPowerUsage)} kW</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center text-xs text-muted-foreground">
              Peak today: {formatNumber(realTimeMetrics.peakPowerToday)} kW
            </div>
          </div>
        </DashboardCard>

        {/* Energy Efficiency Score */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Efficiency Score</p>
              <p className="text-2xl font-bold">{realTimeMetrics.energyEfficiencyScore}%</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 w-full bg-muted rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${realTimeMetrics.energyEfficiencyScore}%` }}
            ></div>
          </div>
        </DashboardCard>

        {/* Active Employees */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Employees</p>
              <p className="text-2xl font-bold">{formatNumber(realTimeMetrics.activeEmployees)}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              Currently in office
            </Badge>
          </div>
        </DashboardCard>

        {/* Cost Savings Today */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cost Savings Today</p>
              <p className="text-2xl font-bold">₹{formatNumber(realTimeMetrics.costSavingsToday)}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <IndianRupee className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{formatDecimal(realTimeMetrics.carbonFootprintReduction)}% reduction
            </div>
          </div>
        </DashboardCard>

        {/* Average Temperature */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Temperature</p>
              <p className="text-2xl font-bold">{formatDecimal(realTimeMetrics.averageTemperature)}°C</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-full">
              <Thermometer className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-2">
            <Badge 
              variant={realTimeMetrics.averageTemperature > 25 ? "destructive" : "secondary"} 
              className="text-xs"
            >
              {realTimeMetrics.averageTemperature > 25 ? 'Warm' : 'Optimal'}
            </Badge>
          </div>
        </DashboardCard>

        {/* Solar Panel Output */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Solar Output</p>
              <p className="text-2xl font-bold">{formatNumber(realTimeMetrics.solarPanelOutput)} kW</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Sun className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xs text-muted-foreground">
              Renewable energy generation
            </div>
          </div>
        </DashboardCard>

        {/* Wind Energy Output */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Wind Output</p>
              <p className="text-2xl font-bold">{formatNumber(realTimeMetrics.windEnergyOutput)} kW</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Wind className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xs text-muted-foreground">
              Clean energy generation
            </div>
          </div>
        </DashboardCard>

        {/* Battery Level */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Battery Level</p>
              <p className={`text-2xl font-bold ${getBatteryColor(realTimeMetrics.batteryLevel)}`}>
                {realTimeMetrics.batteryLevel}%
              </p>
            </div>
            <div className="p-2 bg-gray-100 rounded-full">
              <Battery className={`h-6 w-6 ${getBatteryColor(realTimeMetrics.batteryLevel)}`} />
            </div>
          </div>
          <div className="mt-2 w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                realTimeMetrics.batteryLevel > 60 ? 'bg-green-600' : 
                realTimeMetrics.batteryLevel > 30 ? 'bg-yellow-600' : 'bg-red-600'
              }`}
              style={{ width: `${realTimeMetrics.batteryLevel}%` }}
            ></div>
          </div>
        </DashboardCard>

        {/* Air Quality Index */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Air Quality</p>
              <p className="text-2xl font-bold">{realTimeMetrics.airQualityIndex} AQI</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <CloudRain className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <Badge className={`text-xs ${airQuality.color}`}>
              {airQuality.status}
            </Badge>
          </div>
        </DashboardCard>

        {/* Water Usage Today */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Water Usage</p>
              <p className="text-2xl font-bold">{formatNumber(realTimeMetrics.waterUsageToday)} L</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xs text-muted-foreground">
              Today's consumption
            </div>
          </div>
        </DashboardCard>

        {/* Carbon Footprint Reduction */}
        <DashboardCard className="relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Carbon Reduction</p>
              <p className="text-2xl font-bold text-green-600">
                {formatDecimal(realTimeMetrics.carbonFootprintReduction)}%
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xs text-muted-foreground">
              vs. last year
            </div>
          </div>
        </DashboardCard>

      </div>
    </div>
  );
}
