
import { DashboardCard } from "@/components/DashboardCard";
import SustainabilityChart from "@/components/SustainabilityChart";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DepartmentComparisonCardProps {
  currentDepartment?: string;
  className?: string;
}

export function DepartmentComparisonCard({ 
  currentDepartment = "Software Development", 
  className 
}: DepartmentComparisonCardProps) {
  // Mock department data
  const departmentData = [
    { department: "HR", energyPerEmployee: 3.8, totalEmployees: 45, totalEnergy: 171, carbonFootprint: 68.4 },
    { department: "Admin", energyPerEmployee: 4.2, totalEmployees: 38, totalEnergy: 159.6, carbonFootprint: 63.8 },
    { department: "STG", energyPerEmployee: 4.5, totalEmployees: 52, totalEnergy: 234, carbonFootprint: 93.6 },
    { department: "IG", energyPerEmployee: 3.9, totalEmployees: 36, totalEnergy: 140.4, carbonFootprint: 56.2 },
    { department: "QMG", energyPerEmployee: 4.1, totalEmployees: 41, totalEnergy: 168.1, carbonFootprint: 67.2 },
    { department: "STEP", energyPerEmployee: 3.6, totalEmployees: 35, totalEnergy: 126, carbonFootprint: 50.4 },
    { department: "Gen AI", energyPerEmployee: 5.1, totalEmployees: 43, totalEnergy: 219.3, carbonFootprint: 87.7 },
    { department: "RapidX", energyPerEmployee: 4.8, totalEmployees: 38, totalEnergy: 182.4, carbonFootprint: 73 },
    { department: "Software Development", energyPerEmployee: 4.6, totalEmployees: 65, totalEnergy: 299, carbonFootprint: 119.6 },
    { department: "Quality Assurance", energyPerEmployee: 3.5, totalEmployees: 48, totalEnergy: 168, carbonFootprint: 67.2 },
    { department: "Cloud", energyPerEmployee: 4.4, totalEmployees: 39, totalEnergy: 171.6, carbonFootprint: 68.6 }
  ];

  // Monthly comparison data for chart
  const monthlyData = [
    { month: "Jan", current: 4.9, average: 4.7 },
    { month: "Feb", current: 4.8, average: 4.7 },
    { month: "Mar", current: 4.7, average: 4.7 },
    { month: "Apr", current: 4.5, average: 4.6 },
    { month: "May", current: 4.3, average: 4.6 },
    { month: "Jun", current: 4.6, average: 4.6 },
    { month: "Jul", current: 4.5, average: 4.5 },
    { month: "Aug", current: 4.2, average: 4.5 }
  ];

  // Sort departments by energy per employee
  const sortedDepartments = [...departmentData].sort((a, b) => a.energyPerEmployee - b.energyPerEmployee);
  
  // Find current department data
  const currentDeptData = departmentData.find(d => d.department === currentDepartment) || departmentData[0];
  
  // Calculate department rank
  const departmentRank = sortedDepartments.findIndex(d => d.department === currentDepartment) + 1;

  return (
    <DashboardCard
      title={`${currentDepartment} Department Metrics`}
      description="Energy consumption and efficiency comparison with other departments"
      className={className}
    >
      <div className="space-y-6">
        {/* Current Department Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border text-center">
            <span className="text-3xl font-bold text-eco-blue">
              {currentDeptData.energyPerEmployee}
              <span className="text-sm font-normal ml-1">kWh</span>
            </span>
            <p className="text-sm text-muted-foreground mt-1">Energy per employee (daily)</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border text-center">
            <span className="text-3xl font-bold text-eco-green">
              {currentDeptData.totalEnergy}
              <span className="text-sm font-normal ml-1">kWh</span>
            </span>
            <p className="text-sm text-muted-foreground mt-1">Total daily energy consumption</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border text-center">
            <span className="text-3xl font-bold text-eco-yellow">
              {currentDeptData.carbonFootprint}
              <span className="text-sm font-normal ml-1">kg</span>
            </span>
            <p className="text-sm text-muted-foreground mt-1">Carbon footprint (monthly)</p>
          </div>
        </div>

        {/* Department Comparison Chart */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Energy Usage Trend</h3>
            <Badge className={departmentRank <= 5 ? "bg-eco-green" : "bg-eco-yellow"}>
              Rank #{departmentRank} of {departmentData.length}
            </Badge>
          </div>
          <SustainabilityChart
            type="line"
            data={monthlyData}
            title=""
            description=""
            xAxisKey="month"
            dataKeys={[
              { key: "current", color: "#4CAF50", name: currentDepartment },
              { key: "average", color: "#9E9E9E", name: "All Departments Avg" }
            ]}
            height={250}
          />
        </div>

        {/* Department Ranking */}
        <div>
          <h3 className="font-medium mb-3">Department Energy Efficiency Rankings</h3>
          <div className="space-y-3">
            {sortedDepartments.slice(0, 5).map((dept, index) => (
              <div 
                key={dept.department}
                className={cn(
                  "p-3 rounded-lg border flex items-center justify-between",
                  dept.department === currentDepartment ? "bg-muted border-primary" : "bg-muted/30"
                )}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-white",
                      index === 0 ? "bg-eco-green" : 
                      index === 1 ? "bg-eco-blue" : 
                      "bg-eco-yellow"
                    )}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{dept.department}</h4>
                    <p className="text-xs text-muted-foreground">
                      {dept.totalEmployees} employees
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{dept.energyPerEmployee} kWh/person</div>
                  <div className="text-xs text-muted-foreground">{dept.totalEnergy} kWh total</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Opportunities */}
        <div>
          <h3 className="font-medium mb-3">Department Improvement Opportunities</h3>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">LED Lighting Transition</span>
                <span className="text-sm font-medium">65% Complete</span>
              </div>
              <Progress value={65} className="h-2 [&>div]:bg-eco-green" />
              <p className="text-xs text-muted-foreground mt-1">
                Potential savings: 12.5 kWh daily
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">HVAC Optimization</span>
                <span className="text-sm font-medium">40% Complete</span>
              </div>
              <Progress value={40} className="h-2 [&>div]:bg-eco-blue" />
              <p className="text-xs text-muted-foreground mt-1">
                Potential savings: 18.3 kWh daily
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Device Power Management</span>
                <span className="text-sm font-medium">80% Complete</span>
              </div>
              <Progress value={80} className="h-2 [&>div]:bg-eco-yellow" />
              <p className="text-xs text-muted-foreground mt-1">
                Potential savings: 9.7 kWh daily
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );

  // Helper function for conditional classNames
  function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
  }
}
