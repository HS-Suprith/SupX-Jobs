import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, X } from "lucide-react";

const navItems = [
  { label: "Builder", to: "/resume/builder" },
  { label: "Preview", to: "/resume/preview" },
];

const ResumeLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <nav className="border-b bg-background">
        <div className="flex items-center justify-between px-10 py-4">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="gap-1.5 text-muted-foreground -ml-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Button>
            <span className="font-heading text-body font-medium text-foreground">
              AI Resume Builder
            </span>
          </div>

          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="text-caption font-medium text-muted-foreground pb-1 border-b-2 border-transparent transition-colors duration-normal"
                  activeClassName="text-primary border-primary"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileOpen && (
          <ul className="flex flex-col gap-2 px-10 pb-4 md:hidden">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="block py-2 text-caption font-medium text-muted-foreground border-l-2 border-transparent pl-4 transition-colors duration-normal"
                  activeClassName="text-primary border-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <Outlet />
    </div>
  );
};

export default ResumeLayout;
