import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useRbProgress } from "@/hooks/use-rb-progress";
import { useRbArtifacts, isValidRbUrl } from "@/hooks/use-rb-artifacts";
import { useRbTestChecklist, rbTestItems } from "@/hooks/use-rb-test-checklist";
import { rbSteps } from "@/data/rb-steps";
import ContextHeader from "@/components/layout/ContextHeader";
import {
  CheckCircle2,
  AlertTriangle,
  Rocket,
  ShieldCheck,
  Copy,
  Link as LinkIcon,
  Github,
  Globe,
  Clock,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

const RbProof = () => {
  const { getStep, allCompleted, completedCount, totalSteps, resetAll } = useRbProgress();
  const { artifacts, update, allLinksValid, markShipped, unship } = useRbArtifacts();
  const {
    isChecked,
    toggle,
    reset: resetChecklist,
    passedCount: checklistPassed,
    total: checklistTotal,
    allPassed: allChecklistPassed,
  } = useRbTestChecklist();

  const canShip = allCompleted && allChecklistPassed && allLinksValid;
  const isShipped = artifacts.shipped;

  const projectStatus: "not-started" | "in-progress" | "shipped" = isShipped
    ? "shipped"
    : completedCount > 0 || allLinksValid || checklistPassed > 0
      ? "in-progress"
      : "not-started";

  const statusBadgeVariant = {
    "not-started": "muted" as const,
    "in-progress": "warning" as const,
    shipped: "success" as const,
  };

  const [urlErrors, setUrlErrors] = useState<Record<string, boolean>>({});

  const validateField = (key: string, value: string) => {
    if (value.trim() && !isValidRbUrl(value)) {
      setUrlErrors((prev) => ({ ...prev, [key]: true }));
    } else {
      setUrlErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleCopySubmission = async () => {
    const text = `AI Resume Builder — Final Submission

Lovable Project:
${artifacts.lovableLink.trim()}

GitHub Repository:
${artifacts.githubLink.trim()}

Live Deployment:
${artifacts.deployedUrl.trim()}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist`;

    await navigator.clipboard.writeText(text);
    toast.success("Submission copied to clipboard");
  };

  const handleShip = () => {
    if (canShip) {
      markShipped();
      toast.success("AI Resume Builder — Shipped!");
    }
  };

  return (
    <>
      <ContextHeader
        headline="Proof of Work"
        subtext="Verify all steps are complete, pass the test checklist, provide artifact links, and ship your project."
      />
      <main className="flex-1 p-10 max-w-3xl">
        {/* Status */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-title text-foreground">
            AI Resume Builder — Project 3
          </h2>
          <Badge variant={statusBadgeVariant[projectStatus]}>
            {projectStatus === "shipped"
              ? "Shipped"
              : projectStatus === "in-progress"
                ? "In Progress"
                : "Not Started"}
          </Badge>
        </div>

        {/* Shipped message */}
        {isShipped && (
          <Card className="mb-6 border-success/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                <p className="text-body font-medium text-foreground">
                  Project 3 Shipped Successfully.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => unship()}
                  className="ml-auto text-muted-foreground"
                >
                  Undo
                </Button>
              </div>
              <div className="border-t pt-4 space-y-1.5">
                <p className="text-body font-heading font-medium text-foreground">
                  You built a real product.
                </p>
                <p className="text-caption text-muted-foreground">
                  Not a tutorial. Not a clone.
                </p>
                <p className="text-caption text-muted-foreground">
                  A structured tool that solves a real problem.
                </p>
                <p className="text-caption font-medium text-primary mt-2">
                  This is your proof of work.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* A) Step Completion */}
        <Card>
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h3 className="font-heading text-body font-medium text-foreground">
              Step Completion ({completedCount}/{totalSteps})
            </h3>
            <Button variant="ghost" size="sm" onClick={resetAll} className="gap-1.5 text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
          </div>
          <CardContent className="p-0">
            <ul className="divide-y">
              {rbSteps.map((s) => {
                const stepData = getStep(s.step);
                const completed = stepData.status === "completed";
                return (
                  <li key={s.step} className="flex items-center gap-3 px-6 py-3">
                    {completed ? (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                    <span className="text-caption text-foreground flex-1">
                      Step {s.step}: {s.title}
                    </span>
                    <span
                      className={`text-caption font-medium ${
                        completed ? "text-success" : "text-muted-foreground"
                      }`}
                    >
                      {completed ? "Completed" : "Pending"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        {/* B) Test Checklist */}
        <Card className="mt-6">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h3 className="font-heading text-body font-medium text-foreground">
              Test Checklist ({checklistPassed}/{checklistTotal})
            </h3>
            <Button variant="ghost" size="sm" onClick={resetChecklist} className="gap-1.5 text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
          </div>
          <CardContent className="p-0">
            <ul className="divide-y">
              {rbTestItems.map((item) => (
                <li key={item.id} className="flex items-start gap-3 px-6 py-3">
                  <Checkbox
                    checked={isChecked(item.id)}
                    onCheckedChange={() => toggle(item.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="text-caption text-foreground">{item.label}</span>
                    <p className="text-caption text-muted-foreground mt-0.5">{item.hint}</p>
                  </div>
                  <span
                    className={`text-caption font-medium shrink-0 ${
                      isChecked(item.id) ? "text-success" : "text-muted-foreground"
                    }`}
                  >
                    {isChecked(item.id) ? "Passed" : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* C) Artifact Inputs */}
        <Card className="mt-6">
          <div className="px-6 py-4 border-b">
            <h3 className="font-heading text-body font-medium text-foreground">
              Artifact Collection
            </h3>
            <p className="text-caption text-muted-foreground mt-0.5">
              All three links are required to ship.
            </p>
          </div>
          <CardContent className="p-6 space-y-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="rb-lovable" className="flex items-center gap-2">
                <LinkIcon className="h-3.5 w-3.5" /> Lovable Project Link
              </Label>
              <Input
                id="rb-lovable"
                placeholder="https://lovable.dev/projects/..."
                value={artifacts.lovableLink}
                onChange={(e) => update("lovableLink", e.target.value)}
                onBlur={(e) => validateField("lovableLink", e.target.value)}
                className={urlErrors.lovableLink ? "border-destructive" : ""}
              />
              {urlErrors.lovableLink && (
                <p className="text-caption text-destructive">
                  Enter a valid URL starting with http:// or https://
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="rb-github" className="flex items-center gap-2">
                <Github className="h-3.5 w-3.5" /> GitHub Repository Link
              </Label>
              <Input
                id="rb-github"
                placeholder="https://github.com/username/repo"
                value={artifacts.githubLink}
                onChange={(e) => update("githubLink", e.target.value)}
                onBlur={(e) => validateField("githubLink", e.target.value)}
                className={urlErrors.githubLink ? "border-destructive" : ""}
              />
              {urlErrors.githubLink && (
                <p className="text-caption text-destructive">
                  Enter a valid URL starting with http:// or https://
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="rb-deployed" className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5" /> Deployed URL
              </Label>
              <Input
                id="rb-deployed"
                placeholder="https://your-app.lovable.app"
                value={artifacts.deployedUrl}
                onChange={(e) => update("deployedUrl", e.target.value)}
                onBlur={(e) => validateField("deployedUrl", e.target.value)}
                className={urlErrors.deployedUrl ? "border-destructive" : ""}
              />
              {urlErrors.deployedUrl && (
                <p className="text-caption text-destructive">
                  Enter a valid URL starting with http:// or https://
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* D) Ship */}
        <Card className="mt-6">
          <CardContent className="p-6 space-y-4">
            {!canShip && !isShipped && (
              <div className="flex items-start gap-3 rounded-md border border-warning/40 bg-warning/5 px-4 py-3">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <div className="text-caption text-foreground">
                  <p className="font-medium">Ship requirements not met:</p>
                  <ul className="mt-1 space-y-0.5 text-muted-foreground">
                    {!allCompleted && (
                      <li>• Complete all {totalSteps} build steps</li>
                    )}
                    {!allChecklistPassed && (
                      <li>• Pass all {checklistTotal} test checklist items ({checklistPassed}/{checklistTotal} done)</li>
                    )}
                    {!allLinksValid && (
                      <li>• Provide all 3 valid artifact links</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleShip}
                disabled={!canShip || isShipped}
                className="gap-2"
              >
                {canShip || isShipped ? (
                  <Rocket className="h-4 w-4" />
                ) : (
                  <ShieldCheck className="h-4 w-4" />
                )}
                {isShipped
                  ? "Shipped"
                  : canShip
                    ? "Ship Project"
                    : "Shipping Locked"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCopySubmission}
                disabled={!allLinksValid}
                className="gap-2"
              >
                <Copy className="h-4 w-4" /> Copy Final Submission
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default RbProof;
