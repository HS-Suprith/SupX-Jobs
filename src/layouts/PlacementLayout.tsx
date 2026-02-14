import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Code2,
  ClipboardCheck,
  BookOpen,
  User,
  ArrowLeft,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", to: "/placement/dashboard", icon: LayoutDashboard },
  { label: "Practice", to: "/placement/practice", icon: Code2 },
  { label: "Assessments", to: "/placement/assessments", icon: ClipboardCheck },
  { label: "Resources", to: "/placement/resources", icon: BookOpen },
  { label: "Profile", to: "/placement/profile", icon: User },
];

const PlacementLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="placement-theme flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]">
        <div className="px-6 py-5 border-b border-[hsl(var(--sidebar-border))]">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="-ml-2 mb-3 gap-1.5 text-[hsl(var(--sidebar-foreground))]/70 hover:text-[hsl(var(--sidebar-foreground))]">
            <ArrowLeft className="h-3.5 w-3.5" /> Job Tracker
          </Button>
          <span className="font-heading text-body font-medium block">Placement Prep</span>
        </div>
        <nav className="flex-1 py-4 px-4 space-y-1">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-caption font-medium transition-colors duration-normal hover:bg-[hsl(var(--sidebar-accent))]"
              activeClassName="bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-primary))]"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b px-6 md:px-10 py-4">
          <h2 className="font-heading text-body font-medium text-foreground">
            Placement Prep
          </h2>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-caption font-medium">
              U
            </AvatarFallback>
          </Avatar>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PlacementLayout;
