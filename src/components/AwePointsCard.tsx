
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { ArrowUpRight, Award, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

interface AwePointsCardProps {
  points: number;
  level: string;
  nextLevelPoints: number;
  rank: number;
  totalUsers: number;
  recentAchievements: {
    id: string;
    title: string;
    points: number;
    date: string;
  }[];
  className?: string;
}

export default function AwePointsCard({
  points,
  level,
  nextLevelPoints,
  rank,
  totalUsers,
  recentAchievements,
  className,
}: AwePointsCardProps) {
  const progressToNextLevel = Math.min(Math.round((points / nextLevelPoints) * 100), 100);

  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Awe Points</CardTitle>
          <Badge className="bg-eco-green hover:bg-eco-green-dark">{level}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end mb-3">
          <div>
            <span className="text-3xl font-bold">{points.toLocaleString()}</span>
            <span className="text-muted-foreground text-sm ml-1">points</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-eco-green mr-1" />
            <span>+145 this week</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Progress to {level === "Silver" ? "Gold" : level === "Bronze" ? "Silver" : "Platinum"}</span>
            <span className="font-medium">{points}/{nextLevelPoints}</span>
          </div>
          <Progress value={progressToNextLevel} className="h-2" />
        </div>

        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-eco-yellow" />
            <span>
              Rank <span className="font-bold">#{rank}</span> of {totalUsers}
            </span>
          </div>
          <Link to="/leaderboard">
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              View Leaderboard
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Recent Achievements</div>
          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-muted/40 p-2 rounded-md flex justify-between items-center text-sm border"
              >
                <div className="truncate pr-2">{achievement.title}</div>
                <div className="flex items-center text-green-600 whitespace-nowrap">
                  +{achievement.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
