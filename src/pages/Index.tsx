
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import SustainabilityGlobe from "@/components/SustainabilityGlobe";
import { ArrowRight, BarChart2, Leaf, Tree, TreeDeciduous, TreePalm, Globe, Laptop, ChevronDown } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import SustainabilityChart from "@/components/SustainabilityChart";
import { useEffect } from "react";

const Index = () => {
  // Animate elements on scroll
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on initial load
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  // Hexaware Sustainability Stats from 2022-2025
  const sustainabilityTrends = {
    renewableEnergy: [
      { year: '2022', value: 4429705 },
      { year: '2023', value: 5120430 },
      { year: '2024', value: 5780200 },
      { year: '2025', value: 6350000 }, // Projected
    ],
    co2Reduction: [
      { year: '2022', value: 1748 },
      { year: '2023', value: 2100 },
      { year: '2024', value: 2450 },
      { year: '2025', value: 2800 }, // Projected
    ],
    greenCampus: [
      { year: '2022', value: 88 },
      { year: '2023', value: 91 },
      { year: '2024', value: 94 },
      { year: '2025', value: 96 }, // Projected
    ],
    treesPlanted: [
      { year: '2022', value: 4000 },
      { year: '2023', value: 5500 },
      { year: '2024', value: 7200 },
      { year: '2025', value: 8500 }, // Projected
    ]
  };

  // Current year stats for display
  const sustainabilityStats = [
    { id: 1, stat: "2,800", text: "tons of CO₂ reduction through renewable energy", icon: <Leaf className="h-10 w-10 text-eco-green" /> },
    { id: 2, stat: "96%", text: "of Chennai campus energy from green power", icon: <BarChart2 className="h-10 w-10 text-eco-blue" /> },
    { id: 3, stat: "2,250", text: "kg of dry recyclable waste from Chennai campus", icon: <TreeDeciduous className="h-10 w-10 text-eco-green-dark" /> },
    { id: 4, stat: "6,350,000", text: "kWh of wind energy used", icon: <Globe className="h-10 w-10 text-eco-blue" /> },
    { id: 5, stat: "8,500+", text: "trees planted as part of urban re-forestation", icon: <TreePalm className="h-10 w-10 text-eco-green" /> },
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

  // Sustainability initiatives
  const initiatives = [
    {
      title: "Zero-Water Discharge",
      description: "Our Chennai campus operates with zero-water discharge policy, recycling 100% of wastewater.",
      icon: <TreeDeciduous className="h-8 w-8" />
    },
    {
      title: "Renewable Energy",
      description: "96% of our Chennai campus energy needs are met through green power sources.",
      icon: <Globe className="h-8 w-8" />
    },
    {
      title: "Urban Reforestation",
      description: "We've planted over 8,500 trees as part of our commitment to urban reforestation.",
      icon: <Tree className="h-8 w-8" />
    },
    {
      title: "Digital Optimization",
      description: "Our digital solutions have helped reduce paper usage by 87% across all operations.",
      icon: <Laptop className="h-8 w-8" />
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <NavBar />
      
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-36 overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2 animate-on-scroll">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                  <span className="text-eco-green-dark">HexSynergy</span>
                </h1>
                <p className="text-2xl font-medium text-primary">
                  Growth, Greenery, and Sustainability
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Enhancing digital solutions through
                  innovation and strategic leadership for
                  a sustainable future
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 animate-on-scroll">
                <Link to="/dashboard">
                  <Button className="px-8">
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">Login to Your Account</Button>
                </Link>
              </div>
            </div>
            <div className="h-[400px] lg:h-auto flex items-center justify-center animate-on-scroll">
              <SustainabilityGlobe />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <Button variant="ghost" size="icon" onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}>
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </section>
      
      {/* Stats Section */}
      <section id="stats" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-on-scroll">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Hexaware's <span className="text-primary">Sustainability Impact</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our commitment to a greener future through measurable achievements and initiatives
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll">
            {sustainabilityStats.map((stat) => (
              <DashboardCard key={stat.id} variant="glassmorphic" className="text-center hover:shadow-lg transition-all">
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
      
      {/* Trends Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-on-scroll">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Sustainability <span className="text-primary">Trends</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Tracking our progress and growth in environmental initiatives
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-on-scroll">
            <SustainabilityChart 
              type="bar"
              title="Energy Consumption Reduction (2025)"
              description="Comparison with previous year (in kWh)"
              data={energyReductionData}
              xAxisKey="name"
              dataKeys={[
                { key: "previousYear", color: "#999999" },
                { key: "currentYear", color: "#8BC34A" }
              ]}
            />
            
            <SustainabilityChart
              type="pie"
              title="Energy Source Breakdown (2025)"
              description="Percentage of energy sources"
              data={resourceBreakdownData}
              xAxisKey="name"
              dataKeys={[
                { key: "value", color: "#4CAF50" }
              ]}
            />
            
            <SustainabilityChart
              type="line"
              title="CO₂ Reduction Progress"
              description="Tons of CO₂ reduced through renewable energy"
              data={sustainabilityTrends.co2Reduction}
              xAxisKey="year"
              dataKeys={[
                { key: "value", color: "#2E7D32" }
              ]}
            />
            
            <SustainabilityChart
              type="line"
              title="Renewable Energy Usage"
              description="kWh of renewable energy used"
              data={sustainabilityTrends.renewableEnergy}
              xAxisKey="year"
              dataKeys={[
                { key: "value", color: "#1565C0" }
              ]}
            />
          </div>
        </div>
      </section>
      
      {/* Initiatives Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-on-scroll">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our <span className="text-primary">Initiatives</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Key sustainability projects driving our environmental mission
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll">
            {initiatives.map((initiative, i) => (
              <DashboardCard 
                key={i} 
                variant="highlighted" 
                className="hover:shadow-lg transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 shrink-0">
                    {initiative.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                    <p className="text-muted-foreground">{initiative.description}</p>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Digital Solutions Section with Laptops & Trees Imagery */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col space-y-6 animate-on-scroll">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Digital Solutions <span className="text-primary">for a Green Future</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                At Hexaware, we're building technology solutions that reduce environmental impact while enhancing business efficiency.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Laptop className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Energy-Efficient Computing</h3>
                    <p className="text-muted-foreground text-sm">Our application designs optimize for minimal energy consumption.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <TreeDeciduous className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Paperless Solutions</h3>
                    <p className="text-muted-foreground text-sm">Digital workflows that eliminate the need for paper-based processes.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Remote Work Enablement</h3>
                    <p className="text-muted-foreground text-sm">Solutions that reduce commuting emissions while maintaining productivity.</p>
                  </div>
                </div>
              </div>
              <Link to="/dashboard" className="w-fit">
                <Button>Explore Our Solutions</Button>
              </Link>
            </div>
            <div className="relative h-[400px] animate-on-scroll">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b')] bg-cover bg-center rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-overlay"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b')] bg-cover bg-center rounded-lg transform translate-y-[-30%] translate-x-[-30%] shadow-xl border-4 border-background"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center animate-on-scroll">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join HexSynergy Today
              </h2>
              <p className="max-w-[900px] md:text-xl">
                Be part of our mission to create a sustainable digital future. Track your energy usage, reduce emissions, and earn rewards.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/dashboard">
                <Button variant="secondary" className="px-8">
                  Explore Dashboard
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="bg-transparent hover:bg-white/10">
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
              Code for a Greener Future Hackathon Project
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
