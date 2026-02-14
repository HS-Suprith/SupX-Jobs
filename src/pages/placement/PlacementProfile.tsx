import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  usePlacementTestChecklist,
  placementTestItems,
} from "@/hooks/use-placement-test-checklist";
import {
  RotateCcw,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

const PlacementProfile = () => {
  const { isChecked, toggle, reset, passedCount, total, allPassed } =
    usePlacementTestChecklist();

  const canShip = allPassed;

  const handleShip = () => {
    if (canShip) {
      toast.success("Placement Readiness Platform — All tests passed. Ready to ship!");
    }
  };

  return (
    <div>
      <h1 className="font-heading text-headline text-foreground">
        Profile & Ship
      </h1>
      <p className="mt-2 text-body text-muted-foreground text-prose">
        Verify all placement platform features work correctly before marking as shipped.
      </p>

      {/* Summary */}
      <Card className="mt-8">
        <CardContent className="p-5 flex items-center gap-4">
          {allPassed ? (
            <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
          ) : (
            <AlertTriangle className="h-6 w-6 text-warning shrink-0" />
          )}
          <div className="flex-1">
            <p className="text-body font-medium text-foreground">
              Tests Passed: {passedCount} / {total}
            </p>
            {!allPassed && (
              <p className="text-caption text-warning-foreground mt-0.5">
                Fix issues before shipping.
              </p>
            )}
            {allPassed && (
              <p className="text-caption text-success mt-0.5">
                All tests passed. You may ship.
              </p>
            )}
          </div>
          <Badge variant={allPassed ? "success" : "warning"}>
            {allPassed ? "Ready" : "Incomplete"}
          </Badge>
        </CardContent>
      </Card>

      {/* Checklist */}
      <Card className="mt-6">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="font-heading text-body font-medium text-foreground">
              Test Checklist
            </h2>
            <p className="text-caption text-muted-foreground mt-0.5">
              Verify each feature manually before shipping.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 text-muted-foreground">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>
        <CardContent className="p-0">
          <ul className="divide-y">
            {placementTestItems.map((item) => (
              <li key={item.id} className="flex items-center gap-4 px-6 py-3.5">
                <Checkbox
                  checked={isChecked(item.id)}
                  onCheckedChange={() => toggle(item.id)}
                  id={`pt-${item.id}`}
                />
                <label
                  htmlFor={`pt-${item.id}`}
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

      {/* Ship Section */}
      <Card className="mt-6">
        <CardContent className="p-6 space-y-4">
          {!canShip && (
            <div className="flex items-start gap-3 rounded-md border border-warning/40 bg-warning/5 px-4 py-3">
              <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              <div className="text-caption text-foreground">
                <p className="font-medium">Ship locked</p>
                <p className="text-muted-foreground mt-0.5">
                  Pass all {total} test checklist items to unlock shipping.
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleShip}
            disabled={!canShip}
            className="gap-2"
          >
            {canShip ? (
              <Rocket className="h-4 w-4" />
            ) : (
              <ShieldCheck className="h-4 w-4" />
            )}
            {canShip ? "Ship Platform" : "Shipping Locked"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlacementProfile;
