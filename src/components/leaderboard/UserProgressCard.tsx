import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowUpRight, Award } from "lucide-react";

interface User {
  name?: string;
  pointsEarned?: number;
  rank?: number;
  department?: string;
}

interface UserProgressCardProps {
  user: User | null;
  totalEmployees: number;
}

const UserProgressCard = ({ user, totalEmployees }: UserProgressCardProps) => {
  return (
    <DashboardCard title="Your Progress" className="bg-gradient-to-br from-primary/5 to-eco-green/5">
      <div className="space-y-4 mt-4">
        {user ? (
          <>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-eco-green bg-clip-text text-transparent">
                {user.pointsEarned?.toLocaleString() || '0'}
              </div>
              <div className="text-muted-foreground">Your current points</div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg border flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span>Next rank:</span>
                <span className="font-medium">
                  {(user.pointsEarned || 0) > 1500 ? "Legend" :
                   (user.pointsEarned || 0) > 1000 ? "Platinum" : 
                   (user.pointsEarned || 0) > 600 ? "Gold" : "Silver"}
                </span>
              </div>
              <div className="font-bold">
                {(user.pointsEarned || 0) > 1500 ? "3000" :
                 (user.pointsEarned || 0) > 1000 ? "1500" : 
                 (user.pointsEarned || 0) > 600 ? "1000" : "600"} pts
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg border space-y-2">
              <div className="flex justify-between">
                <span>Current position</span>
                <span className="font-medium">#{user.rank || 'N/A'} of {totalEmployees}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Department</span>
                <span className="text-eco-green font-medium">{user.department}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-muted-foreground py-4">
            <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Please log in to view your progress</p>
          </div>
        )}
        
        <Button className="w-full gap-2 bg-gradient-to-r from-primary to-eco-green hover:from-primary/90 hover:to-eco-green/90">
          View Detailed Stats
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </DashboardCard>
  );
};

export default UserProgressCard;
