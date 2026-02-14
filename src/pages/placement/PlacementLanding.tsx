import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Video, BarChart3, ArrowLeft } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Practice Problems",
    description: "Solve curated coding challenges across data structures, algorithms, and more.",
  },
  {
    icon: Video,
    title: "Mock Interviews",
    description: "Simulate real interview scenarios with timed sessions and feedback.",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Monitor your improvement with detailed analytics and performance insights.",
  },
];

const PlacementLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="placement-theme min-h-screen flex flex-col bg-background text-foreground">
      <div className="px-6 pt-5">
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-1.5 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </Button>
      </div>
      {/* Hero */}
      <header className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-2xl text-center">
          <h1 className="font-heading text-display text-foreground">
            Ace Your Placement
          </h1>
          <p className="mt-4 text-body-lg text-muted-foreground text-prose mx-auto">
            Practice, assess, and prepare for your dream job
          </p>
          <Button
            size="lg"
            className="mt-8"
            onClick={() => navigate("/placement/dashboard")}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Features */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-title text-foreground">{f.title}</h3>
                <p className="text-caption text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center">
        <p className="text-caption text-muted-foreground">
          © {new Date().getFullYear()} KodNest. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PlacementLanding;
