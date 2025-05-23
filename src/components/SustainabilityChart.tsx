
import { Bar, Line, Pie } from "recharts";
import {
  BarChart,
  LineChart,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SustainabilityChartProps {
  type: "bar" | "line" | "pie";
  data: any[];
  title: string;
  description?: string;
  xAxisKey?: string;
  dataKeys: { key: string; color: string }[];
  className?: string;
}

export default function SustainabilityChart({
  type,
  data,
  title,
  description,
  xAxisKey,
  dataKeys,
  className,
}: SustainabilityChartProps) {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.8)", 
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }} 
              />
              <Legend />
              {dataKeys.map((item, index) => (
                <Bar 
                  key={index} 
                  dataKey={item.key} 
                  fill={item.color} 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.8)", 
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }} 
              />
              <Legend />
              {dataKeys.map((item, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={item.key}
                  stroke={item.color}
                  activeDot={{ r: 8 }}
                  animationDuration={1500}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey={dataKeys[0].key}
                nameKey={xAxisKey}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={dataKeys[index % dataKeys.length].color} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.8)", 
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <div>Invalid chart type</div>;
    }
  };

  return (
    <Card className={`shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  );
}
