import { Lightbulb } from "lucide-react";

const ACTION_VERBS = [
  "built", "developed", "designed", "implemented", "led", "improved",
  "created", "optimized", "automated", "managed", "launched", "delivered",
  "integrated", "deployed", "architected", "refactored", "migrated",
  "analyzed", "reduced", "increased", "established", "streamlined",
  "collaborated", "engineered", "configured", "maintained", "resolved",
];

function startsWithActionVerb(text: string): boolean {
  const firstWord = text.trim().split(/\s/)[0]?.toLowerCase();
  return ACTION_VERBS.includes(firstWord || "");
}

function hasNumericIndicator(text: string): boolean {
  return /\d+%|\d+x|\d+k|\d+\+|\d+/.test(text);
}

const BulletGuidance = ({ text }: { text: string }) => {
  if (!text.trim()) return null;

  const needsVerb = !startsWithActionVerb(text);
  const needsNumbers = !hasNumericIndicator(text);

  if (!needsVerb && !needsNumbers) return null;

  return (
    <div className="flex flex-col gap-1 mt-1">
      {needsVerb && (
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Lightbulb className="h-3 w-3 shrink-0 text-warning" />
          Start with a strong action verb.
        </p>
      )}
      {needsNumbers && (
        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Lightbulb className="h-3 w-3 shrink-0 text-warning" />
          Add measurable impact (numbers).
        </p>
      )}
    </div>
  );
};

export default BulletGuidance;
