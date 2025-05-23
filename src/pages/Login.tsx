
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // If already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Invalid email or password. Try admin@hexaware.com / admin123 or john@hexaware.com / user123");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl gap-8 rounded-lg overflow-hidden">
        <div className="flex-1 flex flex-col justify-center p-6 bg-primary text-primary-foreground">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">EcoFuelers</h2>
            <p className="text-lg opacity-90">Powering a sustainable future</p>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Track your office energy usage, reduce carbon emissions, and earn rewards for sustainable actions.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground mr-2"></div>
                <p>Real-time energy usage monitoring</p>
              </div>
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground mr-2"></div>
                <p>Personalized sustainability recommendations</p>
              </div>
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground mr-2"></div>
                <p>Earn Awe Points for eco-friendly actions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Card className="border-0 shadow-none h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@hexaware.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                {error && <p className="text-sm text-red-500">{error}</p>}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>Try these demo accounts:</p>
                <p className="font-mono mt-1">admin@hexaware.com / admin123</p>
                <p className="font-mono">john@hexaware.com / user123</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
