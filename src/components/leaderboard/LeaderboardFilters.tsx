import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { DEPARTMENTS } from "@/data/constants";

interface LeaderboardFiltersProps {
  searchTerm: string;
  selectedDepartment: string;
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
}

const LeaderboardFilters = ({ 
  searchTerm, 
  selectedDepartment, 
  onSearchChange, 
  onDepartmentChange 
}: LeaderboardFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-muted/30 rounded-lg border">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees or departments..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
        <SelectTrigger className="w-48">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filter by department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {DEPARTMENTS.map(dept => (
            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LeaderboardFilters;
