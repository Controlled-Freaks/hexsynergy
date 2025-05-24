import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface TimePeriodInfo {
  description: string;
  dateRange: string;
}

interface LeaderboardHeaderProps {
  timeFilter: string;
  timePeriodInfo: TimePeriodInfo;
  onTimeFilterChange: (value: string) => void;
}

const LeaderboardHeader = ({ timeFilter, timePeriodInfo, onTimeFilterChange }: LeaderboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-eco-green bg-clip-text text-transparent">
          Sustainability Leaderboard
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-muted-foreground">
            Discover who's leading the way in sustainable practices across Hexaware
          </p>
          <Badge variant="outline" className="text-xs">
            {timePeriodInfo.description} • {timePeriodInfo.dateRange}
          </Badge>
        </div>
      </div>
      <div className="flex mt-4 md:mt-0 gap-2">
        <Select value={timeFilter} onValueChange={onTimeFilterChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LeaderboardHeader;
