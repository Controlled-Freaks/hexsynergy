import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Trophy, Medal, Crown } from "lucide-react";

interface TopThreeEmployee {
  id: number;
  name: string;
  avatar: string;
  department: string;
  building: string;
  floor: string;
  points: number;
  rank: string;
  achievements: string[];
  isCurrentUser: boolean;
  energySaving: boolean;
  darkMode: boolean;
  seatingOptimized: boolean;
}

interface TopThreePodiumProps {
  topThree: TopThreeEmployee[];
}

const TopThreePodium = ({ topThree }: TopThreePodiumProps) => {
  if (topThree.length < 3) return null;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center">🏆 Top Sustainability Champions</h2>
      <div className="relative flex justify-center items-end h-80 md:h-96 bg-gradient-to-b from-muted/20 to-transparent rounded-xl p-4 md:p-8 overflow-hidden">
        {/* Second Place */}
        <div className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform duration-300 mx-2 md:mx-4">
          <div className="relative mb-4">
            <Avatar className="h-16 w-16 md:h-20 md:w-20 border-4 border-slate-300 shadow-lg">
              <AvatarImage src={topThree[1].avatar} alt={topThree[1].name} />
              <AvatarFallback className="text-lg font-bold">{topThree[1].name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2 bg-slate-300 rounded-full p-1">
              <Medal className="h-3 w-3 md:h-4 md:w-4 text-gray-700" />
            </div>
          </div>
          <div className="h-24 md:h-32 w-20 md:w-28 bg-gradient-to-t from-slate-400 to-slate-300 rounded-t-lg flex flex-col items-center justify-end p-2 md:p-3 shadow-lg">
            <span className="text-2xl md:text-4xl font-bold text-gray-700">2</span>
            <span className="text-xs md:text-sm font-medium text-center line-clamp-2 text-gray-700">{topThree[1].name}</span>
            <span className="text-xs font-bold text-gray-600">{topThree[1].points.toLocaleString()}</span>
          </div>
        </div>

        {/* First Place */}
        <div className="flex flex-col items-center z-10 group cursor-pointer hover:scale-105 transition-transform duration-300 mx-2 md:mx-4">
          <div className="absolute -top-8 md:-top-12 animate-bounce">
            <Crown className="h-8 w-8 md:h-12 md:w-12 text-yellow-500" />
          </div>
          <div className="relative mb-4">
            <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-yellow-400 shadow-xl">
              <AvatarImage src={topThree[0].avatar} alt={topThree[0].name} />
              <AvatarFallback className="text-xl font-bold">{topThree[0].name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
              <Trophy className="h-4 w-4 md:h-5 md:w-5 text-yellow-800" />
            </div>
          </div>
          <div className="h-32 md:h-44 w-24 md:w-32 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg flex flex-col items-center justify-end p-3 md:p-4 shadow-xl">
            <span className="text-3xl md:text-5xl font-bold text-yellow-900">1</span>
            <span className="text-sm md:text-base font-bold text-center line-clamp-2 text-yellow-900">{topThree[0].name}</span>
            <span className="text-xs md:text-sm font-bold text-yellow-800">{topThree[0].points.toLocaleString()}</span>
          </div>
        </div>

        {/* Third Place */}
        <div className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform duration-300 mx-2 md:mx-4">
          <div className="relative mb-4">
            <Avatar className="h-16 w-16 md:h-20 md:w-20 border-4 border-amber-600 shadow-lg">
              <AvatarImage src={topThree[2].avatar} alt={topThree[2].name} />
              <AvatarFallback className="text-lg font-bold">{topThree[2].name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2 bg-amber-600 rounded-full p-1">
              <Award className="h-3 w-3 md:h-4 md:w-4 text-amber-100" />
            </div>
          </div>
          <div className="h-20 md:h-24 w-20 md:w-28 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-lg flex flex-col items-center justify-end p-2 md:p-3 shadow-lg">
            <span className="text-2xl md:text-4xl font-bold text-amber-100">3</span>
            <span className="text-xs md:text-sm font-medium text-center line-clamp-2 text-amber-100">{topThree[2].name}</span>
            <span className="text-xs font-bold text-amber-200">{topThree[2].points.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopThreePodium;
