import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRbProgress } from "@/hooks/use-rb-progress";
import { rbSteps } from "@/data/rb-steps";
import ContextHeader from "@/components/layout/ContextHeader";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import SecondaryPanel from "@/components/layout/SecondaryPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

const RbStepPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isStepAccessible, getStep, saveArtifact, getArtifact } = useRbProgress();

  const config = rbSteps.find((s) => s.path === location.pathname);
  const step = config?.step ?? 1;
  const stepData = getStep(step);
  const accessible = isStepAccessible(step);

  const prevStep = rbSteps.find((s) => s.step === step - 1);
  const nextStep = rbSteps.find((s) => s.step === step + 1);

  const [artifactUrl, setArtifactUrl] = useState(() => getArtifact(step) || "");
  const isCompleted = stepData.status === "completed";

  // Redirect if locked
  useEffect(() => {
    if (!accessible) {
      const firstAccessible = rbSteps.find((s) => isStepAccessible(s.step));
      navigate(firstAccessible?.path || "/rb/01-problem", { replace: true });
      toast.error("Complete previous steps first.");
    }
  }, [accessible, navigate, isStepAccessible]);

  // Reset artifact input when step changes
  useEffect(() => {
    setArtifactUrl(getArtifact(step) || "");
  }, [step, getArtifact]);

  if (!config || !accessible) return null;

  const handleSaveArtifact = () => {
    if (!artifactUrl.trim()) {
      toast.error("Paste a screenshot URL or description to mark as complete.");
      return;
    }
    saveArtifact(step, artifactUrl.trim());
    toast.success(`Step ${step} completed!`);
  };

  return (
    <>
      <ContextHeader headline={config.headline} subtext={config.subtext} />
      <WorkspaceLayout
        primary={
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant={isCompleted ? "success" : "warning"}>
                {isCompleted ? "Completed" : "In Progress"}
              </Badge>
              <span className="text-caption text-muted-foreground">
                Step {step} of {rbSteps.length}
              </span>
            </div>

            <Card>
              <CardContent className="p-6">
                <p className="text-body text-foreground text-prose">
                  Follow the prompt in the build panel to complete this step. Once done, paste a screenshot URL or artifact link below to mark it as complete.
                </p>
              </CardContent>
            </Card>

            {/* Artifact upload */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`artifact-${step}`} className="flex items-center gap-2">
                    <Upload className="h-3.5 w-3.5" />
                    Artifact / Screenshot URL
                  </Label>
                  <Input
                    id={`artifact-${step}`}
                    placeholder="Paste screenshot URL or describe what you built..."
                    value={artifactUrl}
                    onChange={(e) => setArtifactUrl(e.target.value)}
                    disabled={isCompleted}
                  />
                </div>
                {!isCompleted && (
                  <Button onClick={handleSaveArtifact} className="gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Mark Complete
                  </Button>
                )}
                {isCompleted && (
                  <p className="text-caption text-success flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Step completed
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              {prevStep ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(prevStep.path)}
                  className="gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" /> {prevStep.title}
                </Button>
              ) : (
                <div />
              )}
              {nextStep ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(nextStep.path)}
                  disabled={!isCompleted}
                  className="gap-1.5"
                >
                  {nextStep.title} <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/rb/proof")}
                  disabled={!isCompleted}
                  className="gap-1.5"
                >
                  Go to Proof <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        }
        secondary={
          <SecondaryPanel
            stepTitle={config.title}
            stepDescription={config.subtext}
            promptText={config.prompt}
          />
        }
      />
    </>
  );
};

export default RbStepPage;
