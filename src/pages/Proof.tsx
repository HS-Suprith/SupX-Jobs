import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTestChecklist, testItems } from "@/hooks/use-test-checklist";
import { useArtifacts, isValidUrl } from "@/hooks/use-artifacts";
import {
  RotateCcw,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Rocket,
  Copy,
  Link as LinkIcon,
  Github,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

const steps = [
  "Design System Foundation",
  "Route Skeleton & Navigation",
  "Realistic Job Dataset",
  "Preference Logic",
  "Match Score Engine",
  "Daily Digest Engine",
  "Job Status Tracking",
  "Test Checklist & Proof",
];

const Proof = () => {
  const { isChecked, toggle, reset, passedCount, total, allPassed } =
    useTestChecklist();
  const { artifacts, update, allLinksValid, markShipped, unship } =
    useArtifacts();

  const canShip = allPassed && allLinksValid;
  const isShipped = artifacts.shipped;

  const projectStatus: "not-started" | "in-progress" | "shipped" = isShipped
    ? "shipped"
    : passedCount > 0 || allLinksValid
      ? "in-progress"
      : "not-started";

  const statusLabel = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    shipped: "Shipped",
  };

  const statusBadgeVariant = {
    "not-started": "muted" as const,
    "in-progress": "warning" as const,
    shipped: "success" as const,
  };

  const handleCopySubmission = async () => {
    const text = `Job Notification Tracker — Final Submission

Lovable Project:
${artifacts.lovableLink.trim()}

GitHub Repository:
${artifacts.githubLink.trim()}

Live Deployment:
${artifacts.deployedUrl.trim()}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`;

    await navigator.clipboard.writeText(text);
    toast.success("Submission copied to clipboard");
  };

  const handleShip = () => {
    if (canShip) {
      markShipped();
      toast.success("Project 1 Shipped Successfully.");
    }
  };

  const [urlErrors, setUrlErrors] = useState<Record<string, boolean>>({});

  const validateField = (key: string, value: string) => {
    if (value.trim() && !isValidUrl(value)) {
      setUrlErrors((prev) => ({ ...prev, [key]: true }));
    } else {
      setUrlErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <main className="flex-1 px-6 md:px-10 py-8 md:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-headline text-foreground">
              Proof of Work
            </h1>
            <p className="mt-1 text-caption text-muted-foreground">
              Project 1 — Job Notification Tracker
            </p>
          </div>
          <Badge variant={statusBadgeVariant[projectStatus]}>
            {statusLabel[projectStatus]}
          </Badge>
        </div>

        {/* Shipped confirmation */}
        {isShipped && (
          <Card className="mt-6 border-success/30">
            <CardContent className="flex items-center gap-3 p-5">
              <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
              <div className="flex-1">
                <p className="text-caption font-medium text-foreground">
                  Project 1 Shipped Successfully.
                </p>
                <p className="text-caption text-muted-foreground mt-0.5">
                  All tests passed and artifacts submitted.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => unship()}
                className="text-muted-foreground"
              >
                Undo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* A) Step Completion Summary */}
        <Card className="mt-8">
          <div className="px-6 py-4 border-b">
            <h2 className="font-heading text-body font-medium text-foreground">
              Step Completion Summary
            </h2>
          </div>
          <CardContent className="p-0">
            <ul className="divide-y">
              {steps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 px-6 py-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  <span className="text-caption text-foreground flex-1">
                    Step {i + 1}: {step}
                  </span>
                  <span className="text-caption text-success font-medium">
                    Completed
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* B) Artifact Collection */}
        <Card className="mt-6">
          <div className="px-6 py-4 border-b">
            <h2 className="font-heading text-body font-medium text-foreground">
              Artifact Collection
            </h2>
            <p className="text-caption text-muted-foreground mt-0.5">
              Provide links to your project artifacts. All three are required to ship.
            </p>
          </div>
          <CardContent className="p-6 space-y-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lovable" className="flex items-center gap-2">
                <LinkIcon className="h-3.5 w-3.5" />
                Lovable Project Link
              </Label>
              <Input
                id="lovable"
                placeholder="https://lovable.dev/projects/..."
                value={artifacts.lovableLink}
                onChange={(e) => update("lovableLink", e.target.value)}
                onBlur={(e) => validateField("lovableLink", e.target.value)}
                className={urlErrors.lovableLink ? "border-destructive" : ""}
              />
              {urlErrors.lovableLink && (
                <p className="text-caption text-destructive">Enter a valid URL starting with http:// or https://</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="h-3.5 w-3.5" />
                GitHub Repository Link
              </Label>
              <Input
                id="github"
                placeholder="https://github.com/username/repo"
                value={artifacts.githubLink}
                onChange={(e) => update("githubLink", e.target.value)}
                onBlur={(e) => validateField("githubLink", e.target.value)}
                className={urlErrors.githubLink ? "border-destructive" : ""}
              />
              {urlErrors.githubLink && (
                <p className="text-caption text-destructive">Enter a valid URL starting with http:// or https://</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="deployed" className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5" />
                Deployed URL
              </Label>
              <Input
                id="deployed"
                placeholder="https://your-app.vercel.app"
                value={artifacts.deployedUrl}
                onChange={(e) => update("deployedUrl", e.target.value)}
                onBlur={(e) => validateField("deployedUrl", e.target.value)}
                className={urlErrors.deployedUrl ? "border-destructive" : ""}
              />
              {urlErrors.deployedUrl && (
                <p className="text-caption text-destructive">Enter a valid URL starting with http:// or https://</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Checklist */}
        <Card className="mt-6">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <h2 className="font-heading text-body font-medium text-foreground">
                Test Checklist
              </h2>
              <p className="text-caption text-muted-foreground mt-0.5">
                Tests Passed: {passedCount} / {total}
              </p>
            </div>
            {!allPassed && (
              <AlertTriangle className="h-5 w-5 text-warning" />
            )}
            {allPassed && (
              <CheckCircle2 className="h-5 w-5 text-success" />
            )}
          </div>
          <CardContent className="p-0">
            <ul className="divide-y">
              {testItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4 px-6 py-3.5">
                  <Checkbox
                    checked={isChecked(item.id)}
                    onCheckedChange={() => toggle(item.id)}
                    id={item.id}
                  />
                  <label
                    htmlFor={item.id}
                    className={`flex-1 text-caption font-medium cursor-pointer transition-colors duration-normal ${
                      isChecked(item.id)
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-foreground transition-colors duration-normal"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="left"
                      className="max-w-[280px] text-caption"
                    >
                      {item.hint}
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Reset */}
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset Test Status
          </Button>
        </div>

        {/* Ship & Export */}
        <Card className="mt-6">
          <CardContent className="p-6 space-y-4">
            {!canShip && !isShipped && (
              <div className="flex items-start gap-3 rounded-md border border-warning/40 bg-warning/5 px-4 py-3">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <div className="text-caption text-foreground">
                  <p className="font-medium">Ship requirements not met:</p>
                  <ul className="mt-1 space-y-0.5 text-muted-foreground">
                    {!allPassed && <li>• Pass all {total} test checklist items</li>}
                    {!allLinksValid && <li>• Provide all 3 valid artifact links</li>}
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
                <Rocket className="h-4 w-4" />
                {isShipped ? "Shipped" : "Ship Project"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCopySubmission}
                disabled={!allLinksValid}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Final Submission
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Proof;
