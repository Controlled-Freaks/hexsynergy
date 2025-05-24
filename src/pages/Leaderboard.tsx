import NavBar from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Target } from "lucide-react";
import SustainabilityChart from "@/components/SustainabilityChart";
import { useLeaderboard } from "@/hooks/useLeaderboard";

// Modular components
import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import LeaderboardFilters from "@/components/leaderboard/LeaderboardFilters";
import TopThreePodium from "@/components/leaderboard/TopThreePodium";
import LeaderboardList from "@/components/leaderboard/LeaderboardList";
import UserProgressCard from "@/components/leaderboard/UserProgressCard";
import DepartmentRankings from "@/components/leaderboard/DepartmentRankings";

const Leaderboard = () => {
  const {
    // State
    searchTerm,
    selectedDepartment,
    timeFilter,
    activeTab,
    currentPage,
    itemsPerPage,
    
    // Data
    user,
    employees,
    filteredEmployees,
    leaderboardData,
    topThree,
    departmentRankings,
    achievementData,
    timePeriodInfo,
    
    // Pagination
    totalPages,
    startItem,
    endItem,
    
    // Actions
    setActiveTab,
    setCurrentPage,
    handleFilterChange
  } = useLeaderboard();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container px-4 py-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <LeaderboardHeader 
          timeFilter={timeFilter}
          timePeriodInfo={timePeriodInfo}
          onTimeFilterChange={(value) => handleFilterChange('time', value)}
        />

        {/* Interactive Filters */}
        <LeaderboardFilters
          searchTerm={searchTerm}
          selectedDepartment={selectedDepartment}
          onSearchChange={(value) => handleFilterChange('search', value)}
          onDepartmentChange={(value) => handleFilterChange('department', value)}
        />

        {/* Results Summary */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredEmployees.length} results
          {searchTerm && ` for "${searchTerm}"`}
          {selectedDepartment !== "all" && ` in ${selectedDepartment}`}
        </div>

        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="individual" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Individual Rankings
            </TabsTrigger>
            <TabsTrigger value="departments" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Department Rankings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-6">
            {/* Top 3 Winners Podium */}
            <TopThreePodium topThree={topThree} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enhanced Full Leaderboard with Pagination */}
              <LeaderboardList
                leaderboardData={leaderboardData}
                currentPage={currentPage}
                totalPages={totalPages}
                startItem={startItem}
                endItem={endItem}
                totalResults={filteredEmployees.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />

              {/* Enhanced Sidebar */}
              <div className="space-y-6">
                {/* User Progress Card */}
                <UserProgressCard 
                  user={user}
                  totalEmployees={employees.length}
                />

                {/* Achievements Chart */}
                <SustainabilityChart
                  type="bar"
                  data={achievementData}
                  title="Popular Achievements"
                  xAxisKey="type"
                  dataKeys={[{ key: "count", color: "#4CAF50", name: "Count" }]}
                  height={250}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            {/* Department Rankings - Now responsive to filters */}
            <DepartmentRankings departmentRankings={departmentRankings} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Leaderboard;
