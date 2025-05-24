
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { DashboardCard } from "@/components/DashboardCard";
import { ArrowRight, Leaf, Globe, TreeDeciduous, Trees, Laptop, ChevronDown, LineChart, BarChart2, Wind, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import SustainabilityChart from "@/components/SustainabilityChart";
import EnergySavingGlobe from "@/components/EnergySavingGlobe";
import EcoImpactCounter from "@/components/EcoImpactCounter";
import LiveMetricsPanel from "@/components/LiveMetricsPanel";
import LiveNotifications from "@/components/LiveNotifications";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { sustainabilityStatistics } from "@/data/sustainabilityData";
import { useDataContext, safeGetMetricValue, safeGetPercentage } from "@/contexts/DataContext";

const Index = () => {
  const { realTimeMetrics, sustainabilityStats: contextSustainabilityStats } = useDataContext();
  const [scrollY, setScrollY] = useState(0);
  const [animatedItems, setAnimatedItems] = useState<string[]>([]);
  
  // Update scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate elements on scroll
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const elementId = element.id;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          if (!animatedItems.includes(elementId) && elementId) {
            setAnimatedItems(prev => [...prev, elementId]);
          }
          element.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on initial load
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, [animatedItems]);

  // Current year stats for display using real-time data with safe access
  const sustainabilityStatsDisplay = [
    { id: 1, stat: safeGetMetricValue(realTimeMetrics?.co2Reduction), text: "tons of CO₂ reduction through renewable energy", icon: <Leaf className="h-10 w-10 text-eco-green" /> },
    { id: 2, stat: safeGetPercentage(realTimeMetrics?.renewableEnergyPercentage), text: "of Chennai campus energy from green power", icon: <BarChart2 className="h-10 w-10 text-eco-blue" /> },
    { id: 3, stat: "2,250", text: "kg of dry recyclable waste from Chennai campus", icon: <TreeDeciduous className="h-10 w-10 text-eco-green-dark" /> },
    { id: 4, stat: safeGetMetricValue(realTimeMetrics?.totalEnergyConsumption), text: "kWh of renewable energy used", icon: <Globe className="h-10 w-10 text-eco-blue" /> },
    { id: 5, stat: `${safeGetMetricValue(realTimeMetrics?.treesPlanted)}+`, text: "trees planted as part of urban re-forestation", icon: <Trees className="h-10 w-10 text-eco-green" /> },
    { id: 6, stat: "2,450", text: "kW solar capacity at Hexaware offices", icon: <Laptop className="h-10 w-10 text-eco-blue-dark" /> },
  ];

  // Energy consumption reduction data
  const energyReductionData = [
    { name: 'Laptops', previousYear: 80, currentYear: 65 },
    { name: 'Lighting', previousYear: 60, currentYear: 42 },
    { name: 'HVAC', previousYear: 100, currentYear: 78 },
    { name: 'Servers', previousYear: 85, currentYear: 72 },
    { name: 'Other', previousYear: 50, currentYear: 38 },
  ];

  // Resource breakdown
  const resourceBreakdownData = [
    { name: 'Solar Energy', value: 35 },
    { name: 'Wind Energy', value: 40 },
    { name: 'Conventional', value: 25 },
  ];

  // Success stories
  const successStories = [
    {
      title: "Chennai Office Energy Reduction",
      description: "Our Chennai office reduced energy consumption by 42% through smart lighting and HVAC controls.",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      stats: {
        reduction: "42%",
        savings: "187,000 kWh",
        cost: "₹1.5M saved"
      }
    },
    {
      title: "Water Conservation Initiative",
      description: "Implemented rainwater harvesting systems that recycle 80% of water used in our facilities.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      stats: {
        reduction: "80%",
        savings: "6,240,000 L",
        cost: "₹2.8M saved"
      }
    },
    {
      title: "Renewable Energy Transition",
      description: "Shifted 96% of our energy needs to renewable sources including solar and wind power.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      stats: {
        reduction: "96%",
        savings: "2,800 tons CO₂",
        cost: "₹3.2M saved"
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <NavBar />
      <LiveNotifications />
      
      {/* Enhanced Hero Section with Multiple Backgrounds */}
      <section className="w-full py-8 md:py-16 lg:py-20 xl:py-24 overflow-hidden relative min-h-screen flex items-center">
        {/* Multiple layered backgrounds for depth */}
        <div
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071')] bg-cover bg-center"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 0.15,
          }}
        />
        <div
          className="absolute inset-0 z-1 bg-[url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070')] bg-cover bg-center"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            opacity: 0.1,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-eco-green/20 via-transparent to-eco-blue/20 z-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/90 z-10"></div>
        
        {/* Floating animated elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-20 left-10 animate-pulse">
            <div className="w-3 h-3 bg-eco-green rounded-full opacity-60"></div>
          </div>
          <div className="absolute top-40 right-20 animate-pulse delay-1000">
            <div className="w-2 h-2 bg-eco-blue rounded-full opacity-40"></div>
          </div>
          <div className="absolute bottom-40 left-20 animate-pulse delay-2000">
            <div className="w-4 h-4 bg-eco-yellow rounded-full opacity-50"></div>
          </div>
          <div className="absolute top-60 left-1/3 animate-pulse delay-500">
            <Leaf className="h-6 w-6 text-eco-green/30" />
          </div>
          <div className="absolute bottom-60 right-1/3 animate-pulse delay-1500">
            <Wind className="h-8 w-8 text-eco-blue/20" />
          </div>
        </div>
        
        <div className="container px-4 md:px-6 relative z-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-6">
                {/* Enhanced Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-eco-green/10 border border-eco-green/20 rounded-full text-sm font-medium text-eco-green-dark animate-fade-in">
                  <div className="w-2 h-2 bg-eco-green rounded-full animate-pulse"></div>
                  Live Energy Monitoring • Real-time Impact Tracking
                </div>
                
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl/none animate-fade-in">
                  <span className="bg-gradient-to-r from-eco-green-dark to-eco-blue bg-clip-text text-transparent">HexSynergy</span>
                  <span className="block text-4xl md:text-5xl mt-3 bg-gradient-to-r from-primary via-eco-green to-eco-blue bg-clip-text text-transparent">
                    Powering Tomorrow's Green Digital Workspace
                  </span>
                </h1>
                
                <p className="max-w-[650px] text-muted-foreground md:text-xl leading-relaxed animate-fade-in">
                  Transform your workplace into a sustainability powerhouse. Track energy consumption, 
                  reduce carbon footprint, and earn rewards while building a greener future for Hexaware.
                </p>
                
                {/* Key Features */}
                <div className="flex flex-wrap gap-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-eco-green rounded-full"></div>
                    Real-time Energy Tracking
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-eco-blue rounded-full"></div>
                    Smart Building Analytics
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-eco-yellow rounded-full"></div>
                    Gamified Sustainability
                  </div>
                </div>
                
                <EcoImpactCounter />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
                <Link to="/dashboard">
                  <Button className="px-8 group transition-all duration-300">
                    View Dashboard 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="group">
                    Login to Your Account
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="h-[400px] lg:h-auto flex items-center justify-center animate-fade-in">
              <EnergySavingGlobe />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </section>
      
      {/* Stats Section */}
      <section id="stats" className="w-full py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8 animate-on-scroll" id="stats-title">
            <div className="space-y-2">
              <div className="inline-block p-2 bg-primary/10 rounded-full mb-2">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Hexaware's <span className="text-primary">Sustainability Impact</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our commitment to a greener future through measurable achievements and initiatives
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sustainabilityStatsDisplay.map((stat, index) => (
              <DashboardCard 
                key={stat.id} 
                variant="glassmorphic" 
                className="text-center hover:shadow-lg transition-all animate-on-scroll" 
                id={`stat-card-${index}`}
              >
                <div className="space-y-4 flex flex-col items-center">
                  <div className="mx-auto rounded-full bg-primary/10 p-3">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary">{stat.stat}</h3>
                  <p className="text-muted-foreground">{stat.text}</p>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Interactive Success Stories */}
      <section className="w-full py-8 md:py-12 lg:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8 animate-on-scroll" id="stories-title">
            <div className="space-y-2">
              <div className="inline-block p-2 bg-primary/10 rounded-full mb-2">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Success <span className="text-primary">Stories</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Real-world impacts of our sustainability initiatives
              </p>
            </div>
          </div>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {successStories.map((story, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                  <div className="p-1">
                    <DashboardCard className="border-0 overflow-hidden">
                      <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                        <img 
                          src={story.image} 
                          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110" 
                          alt={story.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">{story.title}</h3>
                          <p className="text-white/80">{story.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{story.stats.reduction}</div>
                          <div className="text-xs text-muted-foreground">Reduction</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{story.stats.savings}</div>
                          <div className="text-xs text-muted-foreground">Savings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{story.stats.cost}</div>
                          <div className="text-xs text-muted-foreground">Cost Benefit</div>
                        </div>
                      </div>
                    </DashboardCard>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* Live Metrics Dashboard */}
      <section className="w-full py-8 md:py-12 lg:py-16 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container px-4 md:px-6">
          <LiveMetricsPanel />
        </div>
      </section>

      {/* Live Building Stats */}
      <section className="w-full py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8 animate-on-scroll" id="building-title">
            <div className="space-y-2">
              <div className="inline-block p-2 bg-primary/10 rounded-full mb-2">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Live <span className="text-primary">Building Statistics</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Real-time energy and resource usage across our facilities
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-on-scroll" id="building-charts">
            <SustainabilityChart 
              type="bar"
              title="Energy Consumption Reduction (2025)"
              description="Comparison with previous year (in kWh)"
              data={energyReductionData}
              xAxisKey="name"
              dataKeys={[
                { key: "previousYear", color: "#999999", name: "2024" },
                { key: "currentYear", color: "#8BC34A", name: "2025" }
              ]}
              height={300}
            />
            
            <SustainabilityChart
              type="pie"
              title="Energy Source Breakdown (2025)"
              description="Percentage of energy sources"
              data={resourceBreakdownData}
              xAxisKey="name"
              dataKeys={[
                { key: "value", color: "#4CAF50", name: "Energy Source" }
              ]}
              height={300}
            />
            
            <div className="lg:col-span-2 mt-6">
              <DashboardCard className="border-0 overflow-hidden animate-on-scroll" id="building-comparison">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Building Energy Efficiency</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3">Building</th>
                          <th className="text-left py-3">Energy Score</th>
                          <th className="text-left py-3">Improvement</th>
                          <th className="text-left py-3">CO₂ Reduction</th>
                          <th className="text-left py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sustainabilityStatistics.buildings.map((building, i) => (
                          <tr key={i} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3">{building.name}</td>
                            <td className="py-3">
                              <div className="flex items-center">
                                <div className="w-full bg-muted rounded-full h-2.5">
                                  <div 
                                    className="bg-primary h-2.5 rounded-full" 
                                    style={{ width: `${building.score}%` }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-sm">{building.score}%</span>
                              </div>
                            </td>
                            <td className={`py-3 ${building.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {building.improvement > 0 ? '+' : ''}{building.improvement}%
                            </td>
                            <td className="py-3">{building.co2Reduction} tons</td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                building.status === 'Excellent' 
                                  ? 'bg-green-100 text-green-800' 
                                  : building.status === 'Good' 
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {building.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </div>
        </div>
      </section>
      
      {/* Animated Initiatives Section */}
      <section className="w-full py-8 md:py-12 lg:py-16 bg-primary/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent z-10"></div>
        
        {/* Animated background elements */}
        <div className="leaf-animation absolute z-0">
          <Leaf className="h-12 w-12 text-primary/10" />
        </div>
        <div className="wind-animation absolute z-0">
          <Wind className="h-16 w-16 text-eco-blue/10" />
        </div>
        <div className="tree-animation absolute z-0">
          <TreeDeciduous className="h-20 w-20 text-eco-green/10" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8 animate-on-scroll" id="initiatives-title">
            <div className="space-y-2">
              <div className="inline-block p-2 bg-primary/10 rounded-full mb-2">
                <Trees className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our <span className="text-primary">Green Initiatives</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Comprehensive sustainability programs that make a real difference
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainabilityStatistics.initiatives.map((initiative, index) => (
              <div 
                key={index} 
                className={`animate-on-scroll ${index % 2 === 0 ? 'transform-gpu translate-y-0 hover:-translate-y-2' : 'transform-gpu translate-y-4 hover:-translate-y-2'} transition-all duration-300`}
                id={`initiative-${index}`}
              >
                <DashboardCard className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                      {initiative.icon === 'Leaf' && <Leaf className="h-6 w-6 text-primary" />}
                      {initiative.icon === 'Globe' && <Globe className="h-6 w-6 text-primary" />}
                      {initiative.icon === 'TreeDeciduous' && <TreeDeciduous className="h-6 w-6 text-primary" />}
                      {initiative.icon === 'Wind' && <Wind className="h-6 w-6 text-primary" />}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{initiative.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{initiative.description}</p>
                    <div className="mt-auto">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{initiative.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-1000" 
                          style={{ width: animatedItems.includes(`initiative-${index}`) ? `${initiative.progress}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-10"></div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-8 md:py-12 lg:py-16 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Animated particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-primary-foreground/10"
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`
              }}
            />
          ))}
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 text-center animate-on-scroll">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join HexSynergy Today
              </h2>
              <p className="md:text-xl">
                Be part of our mission to create a sustainable digital future. Track your energy usage, reduce emissions, and earn rewards.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/dashboard">
                <Button variant="secondary" className="px-8 hover:bg-white hover:text-primary transition-colors">
                  Explore Dashboard
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="bg-transparent hover:bg-white/10 border-white">
                  Login to Your Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold">Hs</div>
              <span className="font-bold text-xl">HexSynergy</span>
            </div>
            <p className="text-muted-foreground">
              EcoFuelers : Code for a Greener Future
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; 2025 HexSynergy by Hexaware. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
