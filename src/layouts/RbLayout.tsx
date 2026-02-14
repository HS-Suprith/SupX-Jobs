import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRbProgress } from "@/hooks/use-rb-progress";
import { rbSteps } from "@/data/rb-steps";
import {
  ArrowLeft,
  FileText,
  Search,
  Blocks,
  LayoutDashboard,
  Component,
  Hammer,
  FlaskConical,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";

const stepIcons = [
  FileText,
  Search,
  Blocks,
  LayoutDashboard,
  Component,
  Hammer,
  FlaskConical,
  Rocket,
];

const RbLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getStep, completedCount, totalSteps } = useRbProgress();

  const status: "not-started" | "in-progress" | "shipped" =
    completedCount === totalSteps
      ? "shipped"
      : completedCount > 0
        ? "in-progress"
        : "not-started";

  const statusConfig = {
    "not-started": { label: "Not Started", variant: "muted" as const },
    "in-progress": { label: "In Progress", variant: "warning" as const },
    shipped: { label: "Shipped", variant: "success" as const },
  };

  const currentConfig = rbSteps.find((s) => s.path === location.pathname);
  const pageTitle = location.pathname === "/rb/proof"
    ? "Proof of Work"
    : currentConfig
      ? `Step ${currentConfig.step}: ${currentConfig.title}`
      : "AI Resume Builder";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]">
        <div className="px-6 py-5 border-b border-[hsl(var(--sidebar-border))]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="-ml-2 mb-3 gap-1.5 text-[hsl(var(--sidebar-foreground))]/70 hover:text-[hsl(var(--sidebar-foreground))]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Hub
          </Button>
          <span className="font-heading text-body font-medium block">
            AI Resume Builder
          </span>
          <span className="text-caption text-[hsl(var(--sidebar-foreground))]/60 mt-0.5 block">
            {completedCount}/{totalSteps} steps completed
          </span>
        </div>

        <nav className="flex-1 py-4 px-4 space-y-1 overflow-y-auto">
          {rbSteps.map((step, i) => {
            const Icon = stepIcons[i];
            const stepData = getStep(step.step);
            const completed = stepData.status === "completed";
            const locked = stepData.status === "locked";

            return (
              <NavLink
                key={step.path}
                to={step.path}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-caption font-medium transition-colors duration-normal hover:bg-[hsl(var(--sidebar-accent))] ${locked ? "opacity-50 pointer-events-none" : ""}`}
                activeClassName="bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-primary))]"
              >
                {completed ? (
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                ) : locked ? (
                  <Lock className="h-4 w-4 shrink-0" />
                ) : (
                  <Icon className="h-4 w-4 shrink-0" />
                )}
                <span className="flex-1 truncate">{step.title}</span>
              </NavLink>
            );
          })}

          <div className="border-t border-[hsl(var(--sidebar-border))] my-3" />

          <NavLink
            to="/rb/proof"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-caption font-medium transition-colors duration-normal hover:bg-[hsl(var(--sidebar-accent))]"
            activeClassName="bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-primary))]"
          >
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Proof of Work
          </NavLink>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b px-6 md:px-10 py-4">
          <h2 className="font-heading text-body font-medium text-foreground">
            {pageTitle}
          </h2>
          <div className="flex items-center gap-3">
            <Badge variant={statusConfig[status].variant}>
              {statusConfig[status].label}
            </Badge>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-caption font-medium">
                U
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RbLayout;
