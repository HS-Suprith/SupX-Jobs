import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Saved", to: "/saved" },
  { label: "Digest", to: "/digest" },
  { label: "Settings", to: "/settings" },
  { label: "Proof", to: "/proof" },
  { label: "Placement", to: "/placement" },
  { label: "Resume Builder", to: "/resume" },
];

const AppNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b bg-background">
      <div className="flex items-center justify-between px-10 py-4">
        <span className="font-heading text-body font-medium text-foreground">
          KodNest
        </span>

        {/* Desktop nav */}
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

        {/* Mobile toggle */}
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

      {/* Mobile nav */}
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
  );
};

export default AppNavbar;
