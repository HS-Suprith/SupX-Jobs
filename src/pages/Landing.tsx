import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Moon } from "lucide-react";

const Landing = () => {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Nav */}
      <nav className="border-b bg-background">
        <div className="flex items-center justify-between px-10 py-4">
          <span className="font-heading text-body font-medium text-foreground">
            SupX Jobs
          </span>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="h-9 w-9"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="font-heading text-display text-foreground leading-tight">
            Stop Missing<br />The Right Jobs.
          </h1>
          <p className="mt-6 text-body-lg text-muted-foreground text-prose mx-auto">
            Precision-matched job discovery delivered daily at 9AM.
            Set your preferences once, and we handle the rest.
          </p>
          <Link to="/settings" className="inline-block mt-10">
            <Button size="lg" className="gap-2">
              Start Tracking
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t px-10 py-6 text-center">
        <p className="text-caption text-muted-foreground">
          Built with SupX Jobs
        </p>
      </footer>
    </div>
  );
};

export default Landing;
