import { DashboardCard } from "@/components/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Crown, Medal, Award, Leaf } from "lucide-react";

interface DepartmentRanking {
  name: string;
  points: number;
  avgPoints: number;
  members: number;
  energySavers: number;
  darkModeUsers: number;
  efficiency: number;
}

interface DepartmentRankingsProps {
  departmentRankings: DepartmentRanking[];
}

const DepartmentRankings = ({ departmentRankings }: DepartmentRankingsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {departmentRankings.map((dept, index) => (
        <DashboardCard 
          key={dept.name} 
          className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
            index < 3 ? 'ring-2 ring-primary/20' : ''
          }`}
        >
          {index < 3 && (
            <div className="absolute top-2 right-2">
              {index === 0 ? <Crown className="h-5 w-5 text-yellow-500" /> :
               index === 1 ? <Medal className="h-5 w-5 text-gray-400" /> :
               <Award className="h-5 w-5 text-amber-600" />}
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{dept.name}</h3>
              <Badge variant="outline" className="text-xs">
                #{index + 1}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Points</span>
                <span className="font-bold text-xl">{dept.points.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Points</span>
                <span className="font-semibold">{dept.avgPoints.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Members</span>
                <span className="font-semibold">{dept.members}</span>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Efficiency Score</span>
                  <span className="font-semibold">{dept.efficiency}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-eco-green h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${dept.efficiency}%` }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Leaf className="h-3 w-3 text-eco-green" />
                  <span>{dept.energySavers} savers</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-800 rounded-full" />
                  <span>{dept.darkModeUsers} dark mode</span>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
};

export default DepartmentRankings;
