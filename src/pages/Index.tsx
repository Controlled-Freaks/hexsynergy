
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import SustainabilityGlobe from "@/components/SustainabilityGlobe";
import { ArrowRight, CheckCircle } from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";

const Index = () => {
  const sustainabilityStats = [
    { id: 1, stat: "1,748", text: "tons of CO₂ reduction through renewable energy" },
    { id: 2, stat: "88%", text: "of Chennai campus energy from green power" },
    { id: 3, stat: "1,563", text: "kg of dry recyclable waste from Chennai campus" },
    { id: 4, stat: "4,429,705", text: "kWh of wind energy used" },
    { id: 5, stat: "4,000+", text: "trees planted as part of urban re-forestation" },
    { id: 6, stat: "1,563", text: "kW solar capacity at Hexaware offices" },
  ];

  const features = [
    "Track office energy usage and CO₂ emissions",
    "Monitor laptop usage patterns and energy modes",
    "Track proximity seating for optimal AC and lighting",
    "Earn Awe Points for sustainable actions",
    "Automated energy optimization suggestions",
    "Real-time dashboard for individual and team impact",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <NavBar />
      
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-36">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  EcoFuelers: Powering a{" "}
                  <span className="text-primary">Sustainable</span> Future
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Track your office energy usage, reduce carbon emissions, and earn
                  rewards for sustainable actions. Join the movement for a greener
                  workplace.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
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
            <div className="h-[400px] lg:h-auto">
              <SustainabilityGlobe />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features That Make a Difference
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our comprehensive dashboard helps you monitor, track, and reduce energy consumption while rewarding sustainable actions.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start space-x-3">
                <CheckCircle className="mt-0.5 h-6 w-6 text-primary" />
                <p className="text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Hexaware's Sustainability Impact
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Hexaware is committed to sustainability. Here are some of our achievements.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {sustainabilityStats.map((stat) => (
              <DashboardCard key={stat.id} variant="glassmorphic" className="text-center">
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-primary">{stat.stat}</h3>
                  <p className="text-muted-foreground">{stat.text}</p>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Make a Difference?
              </h2>
              <p className="max-w-[900px] md:text-xl">
                Join us in our mission to reduce carbon emissions and create a more sustainable workplace.
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
              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold">Ec</div>
              <span className="font-bold text-xl">EcoFuelers</span>
            </div>
            <p className="text-muted-foreground">
              Code for a Greener Future Hackathon Project
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; 2025 EcoFuelers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
