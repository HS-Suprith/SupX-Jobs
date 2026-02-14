import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTestChecklist, testItems } from "@/hooks/use-test-checklist";
import {
  ClipboardCheck,
  RotateCcw,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Rocket,
} from "lucide-react";

const Proof = () => {
  const { isChecked, toggle, reset, passedCount, total, allPassed } =
    useTestChecklist();

  return (
    <main className="flex-1 px-6 md:px-10 py-8 md:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-headline text-foreground">
          Proof of Work
        </h1>
        <p className="mt-2 text-body text-muted-foreground">
          Verify every feature before shipping. Check each item after manual
          testing.
        </p>

        {/* Summary */}
        <Card className="mt-8">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              {allPassed ? (
                <CheckCircle2 className="h-6 w-6 text-success" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-warning" />
              )}
              <div>
                <p className="font-heading text-body font-medium text-foreground">
                  Tests Passed: {passedCount} / {total}
                </p>
                {!allPassed && (
                  <p className="text-caption text-muted-foreground mt-0.5">
                    Resolve all issues before shipping.
                  </p>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset
            </Button>
          </CardContent>
        </Card>

        {/* Checklist */}
        <Card className="mt-6">
          <CardContent className="p-0">
            <ul className="divide-y">
              {testItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4 px-6 py-4">
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

        {/* Ship Lock */}
        <Card className="mt-6">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <Rocket
                className={`h-5 w-5 ${allPassed ? "text-success" : "text-muted-foreground"}`}
              />
              <div>
                <p className="font-heading text-body font-medium text-foreground">
                  Ready to Ship
                </p>
                <p className="text-caption text-muted-foreground mt-0.5">
                  {allPassed
                    ? "All tests passed. You may proceed to ship."
                    : "Complete all test checks above to unlock shipping."}
                </p>
              </div>
            </div>
            <Button disabled={!allPassed} size="sm">
              <Rocket className="h-3.5 w-3.5 mr-1" />
              Ship
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Proof;
