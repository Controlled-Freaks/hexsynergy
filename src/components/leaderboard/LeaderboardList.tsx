import { DashboardCard } from "@/components/DashboardCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, TrendingUp, Trophy, Medal, Crown, ChevronLeft, ChevronRight, Users, Leaf, Target } from "lucide-react";

interface LeaderboardEmployee {
  id: number;
  name: string;
  avatar: string;
  department: string;
  building: string;
  floor: string;
  points: number;
  rank: string;
  increase: number;
  achievements: string[];
  isCurrentUser: boolean;
  energySaving: boolean;
  darkMode: boolean;
  seatingOptimized: boolean;
  deviceUsage: any;
}

interface LeaderboardListProps {
  leaderboardData: LeaderboardEmployee[];
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  totalResults: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const LeaderboardList = ({
  leaderboardData,
  currentPage,
  totalPages,
  startItem,
  endItem,
  totalResults,
  itemsPerPage,
  onPageChange
}: LeaderboardListProps) => {
  const rankColors = {
    Platinum: "bg-gradient-to-r from-purple-400 to-purple-600 text-white",
    Gold: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black",
    Silver: "bg-gradient-to-r from-gray-300 to-gray-400 text-black",
    Bronze: "bg-gradient-to-r from-amber-600 to-amber-700 text-white",
  };

  const rankIcons = {
    Platinum: <Crown className="h-4 w-4" />,
    Gold: <Trophy className="h-4 w-4" />,
    Silver: <Medal className="h-4 w-4" />,
    Bronze: <Award className="h-4 w-4" />,
  };

  return (
    <DashboardCard 
      title="Complete Rankings" 
      description={`Showing ${startItem}-${endItem} of ${totalResults} participants`}
      className="lg:col-span-2"
    >
      <div className="space-y-3 mt-4">
        {leaderboardData.map((person, index) => {
          const globalRank = (currentPage - 1) * itemsPerPage + index + 1;
          return (
            <div 
              key={person.id}
              className={`group flex items-center p-3 md:p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer ${
                person.isCurrentUser 
                  ? "bg-gradient-to-r from-primary/10 to-eco-green/10 border-primary shadow-md" 
                  : "hover:bg-muted/50 border-transparent hover:border-muted"
              }`}
            >
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted font-bold text-sm md:text-lg mr-3 md:mr-4">
                {globalRank <= 3 ? (
                  <div className={`flex items-center justify-center w-full h-full rounded-full ${
                    globalRank === 1 ? 'bg-yellow-400 text-yellow-900' :
                    globalRank === 2 ? 'bg-slate-300 text-gray-700' :
                    'bg-amber-600 text-amber-100'
                  }`}>
                    {globalRank === 1 ? <Crown className="h-4 w-4 md:h-5 md:w-5" /> :
                     globalRank === 2 ? <Medal className="h-4 w-4 md:h-5 md:w-5" /> :
                     <Award className="h-3 w-3 md:h-4 md:w-4" />}
                  </div>
                ) : (
                  <span>{globalRank}</span>
                )}
              </div>
              
              <div className="flex items-center flex-1 min-w-0">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-muted flex-shrink-0">
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback className="font-semibold text-sm">{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3 md:ml-4 flex-1 min-w-0">
                  <div className="font-semibold flex items-center gap-2 text-sm md:text-lg">
                    <span className="truncate">{person.name}</span>
                    {person.isCurrentUser && <Badge className="bg-primary text-xs flex-shrink-0">You</Badge>}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground flex items-center gap-2 md:gap-4">
                    <span className="truncate">{person.department}</span>
                    <span className="hidden md:inline">•</span>
                    <span className="hidden md:inline">{person.building} - {person.floor}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {person.energySaving && <Leaf className="h-3 w-3 text-eco-green" />}
                    {person.darkMode && <div className="w-3 h-3 bg-gray-800 rounded-full" />}
                    {person.seatingOptimized && <Target className="h-3 w-3 text-eco-blue" />}
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center gap-2 max-w-48">
                <div className="flex flex-wrap gap-1">
                  {person.achievements.slice(0, 2).map((achievement, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {achievement}
                    </Badge>
                  ))}
                  {person.achievements.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{person.achievements.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="ml-auto flex items-center gap-3 md:gap-6 flex-shrink-0">
                <div className="hidden md:flex items-center text-sm text-eco-green font-medium">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  +{person.increase}
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="font-bold text-lg md:text-xl">{person.points.toLocaleString()}</div>
                  <Badge className={`${rankColors[person.rank as keyof typeof rankColors]} flex items-center gap-1 text-xs`}>
                    {rankIcons[person.rank as keyof typeof rankIcons]}
                    {person.rank}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {leaderboardData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No employees found matching your criteria.</p>
          <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
      )}
    </DashboardCard>
  );
};

export default LeaderboardList;
