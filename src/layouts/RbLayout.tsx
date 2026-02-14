import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TopBar from "@/components/layout/TopBar";
import ProofFooter from "@/components/layout/ProofFooter";
import { useRbProgress } from "@/hooks/use-rb-progress";
import { rbSteps } from "@/data/rb-steps";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const RbLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { completedCount, totalSteps } = useRbProgress();

  const currentConfig = rbSteps.find((s) => s.path === location.pathname);
  const currentStep = currentConfig?.step ?? 1;

  const status: "not-started" | "in-progress" | "shipped" =
    completedCount === totalSteps
      ? "shipped"
      : completedCount > 0
        ? "in-progress"
        : "not-started";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="flex items-center gap-2 border-b px-10 py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard")}
          className="gap-1.5 text-muted-foreground -ml-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Hub
        </Button>
      </div>
      <TopBar
        projectName="AI Resume Builder"
        currentStep={currentStep}
        totalSteps={totalSteps}
        status={status}
      />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <ProofFooter />
    </div>
  );
};

export default RbLayout;
