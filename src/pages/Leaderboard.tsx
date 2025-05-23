
import NavBar from "@/components/NavBar";
import { DashboardCard } from "@/components/DashboardCard";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, TrendingUp, ArrowUpRight } from "lucide-react";
import SustainabilityChart from "@/components/SustainabilityChart";

const Leaderboard = () => {
  const { user } = useAuth();
  
  // Mock leaderboard data
  const leaderboardData = [
    {
      id: 1,
      name: "Emma Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      department: "Product Design",
      points: 1250,
      rank: "Gold",
      increase: 120,
      achievements: ["Dark Mode Master", "Energy Saver", "Proximity Pro"],
    },
    {
      id: 2,
      name: "David Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      department: "Software Development",
      points: 1180,
      rank: "Gold",
      increase: 95,
      achievements: ["Dark Mode Master", "Team Player"],
    },
    {
      id: 3,
      name: "Sarah Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      department: "Marketing",
      points: 1050,
      rank: "Silver",
      increase: 85,
      achievements: ["Energy Saver"],
    },
    {
      id: 4,
      name: "Michael Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      department: "Software Development",
      points: 980,
      rank: "Silver",
      increase: 60,
      achievements: ["Team Player", "Proximity Pro"],
    },
    {
      id: 5,
      name: "Jessica Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      department: "Administration",
      points: 920,
      rank: "Silver",
      increase: 75,
      achievements: ["Dark Mode Master"],
    },
    {
      id: 6,
      name: "John Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      department: "Software Development",
      points: 780,
      rank: "Silver",
      increase: 145,
      achievements: ["Team Player"],
      isCurrentUser: true,
    },
    {
      id: 7,
      name: "Amanda Parker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amanda",
      department: "HR",
      points: 680,
      rank: "Bronze",
      increase: 50,
      achievements: ["Energy Saver"],
    },
    {
      id: 8,
      name: "Robert Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      department: "Finance",
      points: 640,
      rank: "Bronze",
      increase: 45,
      achievements: ["Team Player"],
    },
    {
      id: 9,
      name: "Lisa Wang",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      department: "Operations",
      points: 610,
      rank: "Bronze",
      increase: 40,
      achievements: ["Dark Mode Master"],
    },
    {
      id: 10,
      name: "Daniel Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel",
      department: "Customer Support",
      points: 580,
      rank: "Bronze",
      increase: 35,
      achievements: ["Energy Saver"],
    },
  ];

  // Department rankings data
  const departmentRankings = [
    { name: "Product Design", points: 5820, members: 12 },
    { name: "Software Development", points: 5560, members: 24 },
    { name: "Marketing", points: 3920, members: 8 },
    { name: "Administration", points: 2450, members: 6 },
    { name: "HR", points: 2240, members: 5 },
  ];

  // Badge colors for ranks
  const rankColors = {
    Gold: "bg-eco-yellow text-black",
    Silver: "bg-slate-300 text-black",
    Bronze: "bg-amber-700 text-white",
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sustainability Leaderboard</h1>
            <p className="text-muted-foreground">
              See who's leading the way in sustainable practices
            </p>
          </div>
          <div className="flex mt-4 md:mt-0 gap-2">
            <Button variant="outline" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Monthly View
            </Button>
            <Button variant="outline" className="gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </Button>
          </div>
        </div>

        {/* Top 3 Winners Podium */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-6">Top Sustainability Champions</h2>
          <div className="relative flex justify-center items-end h-64 md:h-80">
            {/* Second Place */}
            <div className="absolute left-1/2 transform -translate-x-[130px] md:-translate-x-[180px] bottom-0 flex flex-col items-center">
              <Avatar className="h-16 w-16 md:h-20 md:w-20 border-4 border-slate-300">
                <AvatarImage src={leaderboardData[1].avatar} alt={leaderboardData[1].name} />
                <AvatarFallback>{leaderboardData[1].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="h-28 md:h-36 w-24 md:w-32 bg-slate-300 rounded-t-md flex flex-col items-center justify-end p-2 mt-2">
                <span className="text-3xl font-bold">2</span>
                <span className="text-xs md:text-sm font-medium mt-1 line-clamp-1">{leaderboardData[1].name}</span>
                <span className="text-xs text-gray-700 font-bold mt-1">{leaderboardData[1].points} pts</span>
              </div>
            </div>

            {/* First Place */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 flex flex-col items-center z-10">
              <div className="absolute -top-10 transform -translate-y-full">
                <Award className="h-10 w-10 text-eco-yellow animate-bounce" />
              </div>
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-eco-yellow">
                <AvatarImage src={leaderboardData[0].avatar} alt={leaderboardData[0].name} />
                <AvatarFallback>{leaderboardData[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="h-40 md:h-48 w-28 md:w-36 bg-eco-yellow rounded-t-md flex flex-col items-center justify-end p-2 mt-2">
                <span className="text-4xl font-bold">1</span>
                <span className="text-sm md:text-base font-medium mt-1 line-clamp-1">{leaderboardData[0].name}</span>
                <span className="text-xs md:text-sm text-gray-700 font-bold mt-1">{leaderboardData[0].points} pts</span>
                <div className="flex gap-1 mt-2">
                  {leaderboardData[0].achievements.map((achievement, index) => (
                    <span key={index} className="inline-block w-2 h-2 bg-white rounded-full"></span>
                  ))}
                </div>
              </div>
            </div>

            {/* Third Place */}
            <div className="absolute left-1/2 transform translate-x-[130px] md:translate-x-[180px] bottom-0 flex flex-col items-center">
              <Avatar className="h-16 w-16 md:h-20 md:w-20 border-4 border-amber-700">
                <AvatarImage src={leaderboardData[2].avatar} alt={leaderboardData[2].name} />
                <AvatarFallback>{leaderboardData[2].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="h-20 md:h-24 w-24 md:w-32 bg-amber-700 rounded-t-md flex flex-col items-center justify-end p-2 mt-2">
                <span className="text-3xl font-bold text-white">3</span>
                <span className="text-xs md:text-sm font-medium mt-1 text-white line-clamp-1">{leaderboardData[2].name}</span>
                <span className="text-xs text-amber-200 font-bold mt-1">{leaderboardData[2].points} pts</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Full Leaderboard */}
          <DashboardCard 
            title="Full Leaderboard" 
            description="Rankings of all participants" 
            className="lg:col-span-2"
          >
            <div className="space-y-2 mt-2">
              {leaderboardData.map((person) => (
                <div 
                  key={person.id}
                  className={`flex items-center p-3 rounded-lg border leaderboard-item ${
                    person.isCurrentUser ? "bg-muted border-primary" : ""
                  }`}
                >
                  <div className="w-10 text-center font-bold">{person.id}</div>
                  
                  <div className="flex items-center flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="font-medium flex items-center gap-2">
                        {person.name} 
                        {person.isCurrentUser && <Badge className="bg-primary">You</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">{person.department}</div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center">
                    <div className="flex gap-1">
                      {person.achievements.map((achievement, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ml-auto flex items-center gap-4">
                    <div className="flex items-center text-sm text-eco-green">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +{person.increase}
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="font-bold">{person.points.toLocaleString()}</div>
                      <Badge className={rankColors[person.rank as keyof typeof rankColors]}>
                        {person.rank}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm">View All Participants</Button>
            </div>
          </DashboardCard>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <DashboardCard title="Department Rankings">
              <div className="space-y-3 mt-2">
                {departmentRankings.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                    <div>
                      <div className="font-medium">{dept.name}</div>
                      <div className="text-xs text-muted-foreground">{dept.members} members</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{dept.points.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
            
            <SustainabilityChart
              type="bar"
              data={[
                { type: "Dark Mode", count: 128 },
                { type: "Energy Saver", count: 95 },
                { type: "Team Player", count: 82 },
                { type: "Proximity Pro", count: 64 },
                { type: "Green Commuter", count: 42 },
              ]}
              title="Popular Achievements"
              xAxisKey="type"
              dataKeys={[{ key: "count", color: "#4CAF50" }]}
            />
            
            <DashboardCard title="Your Progress">
              <div className="space-y-4 mt-2">
                <div className="text-center">
                  <div className="text-4xl font-bold">780</div>
                  <div className="text-muted-foreground">Your current points</div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg border flex justify-between items-center">
                  <div>Next rank: <span className="font-medium">Gold</span></div>
                  <div>1000 pts</div>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg border">
                  <div className="flex justify-between mb-1">
                    <div>Current position</div>
                    <div className="font-medium">#6 of 156</div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div>This week</div>
                    <div className="text-eco-green">Moved up 2 positions</div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button className="gap-2">
                    View Detailed Stats
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
