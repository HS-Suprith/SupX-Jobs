import type { ResumeTemplate, ResumeAccentColor } from "@/hooks/use-resume-template";
import { ACCENT_COLORS } from "@/hooks/use-resume-template";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/* ── Template thumbnail sketches ── */
const ClassicSketch = () => (
  <div className="w-full h-full p-2 flex flex-col gap-1.5">
    <div className="h-1.5 w-10 bg-[hsl(0,0%,30%)] rounded-sm mx-auto" />
    <div className="h-0.5 w-14 bg-[hsl(0,0%,60%)] rounded-sm mx-auto" />
    <div className="h-px w-full bg-[hsl(0,0%,80%)] my-0.5" />
    <div className="space-y-1 flex-1">
      <div className="h-0.5 w-6 bg-[hsl(0,0%,40%)] rounded-sm" />
      <div className="h-0.5 w-full bg-[hsl(0,0%,85%)] rounded-sm" />
      <div className="h-0.5 w-11 bg-[hsl(0,0%,85%)] rounded-sm" />
      <div className="h-px w-full bg-[hsl(0,0%,80%)] my-0.5" />
      <div className="h-0.5 w-6 bg-[hsl(0,0%,40%)] rounded-sm" />
      <div className="h-0.5 w-full bg-[hsl(0,0%,85%)] rounded-sm" />
      <div className="h-0.5 w-9 bg-[hsl(0,0%,85%)] rounded-sm" />
    </div>
  </div>
);

const ModernSketch = ({ color }: { color: string }) => (
  <div className="w-full h-full flex">
    <div className="w-[35%] h-full rounded-l-sm" style={{ backgroundColor: color }}>
      <div className="p-1.5 space-y-1">
        <div className="h-1 w-5 bg-white/70 rounded-sm" />
        <div className="h-0.5 w-7 bg-white/40 rounded-sm" />
        <div className="h-0.5 w-6 bg-white/40 rounded-sm" />
        <div className="mt-1.5 h-0.5 w-4 bg-white/50 rounded-sm" />
        <div className="h-0.5 w-7 bg-white/30 rounded-sm" />
      </div>
    </div>
    <div className="flex-1 p-2 space-y-1">
      <div className="h-0.5 w-5 rounded-sm" style={{ backgroundColor: color }} />
      <div className="h-0.5 w-full bg-[hsl(0,0%,85%)] rounded-sm" />
      <div className="h-0.5 w-9 bg-[hsl(0,0%,85%)] rounded-sm" />
      <div className="mt-1 h-0.5 w-5 rounded-sm" style={{ backgroundColor: color }} />
      <div className="h-0.5 w-full bg-[hsl(0,0%,85%)] rounded-sm" />
      <div className="h-0.5 w-7 bg-[hsl(0,0%,85%)] rounded-sm" />
    </div>
  </div>
);

const MinimalSketch = () => (
  <div className="w-full h-full p-2.5 flex flex-col gap-2">
    <div className="h-1 w-9 bg-[hsl(0,0%,30%)] rounded-sm" />
    <div className="h-0.5 w-12 bg-[hsl(0,0%,70%)] rounded-sm" />
    <div className="mt-1 space-y-1.5 flex-1">
      <div className="h-0.5 w-4 bg-[hsl(0,0%,50%)] rounded-sm" />
      <div className="h-0.5 w-full bg-[hsl(0,0%,88%)] rounded-sm" />
      <div className="h-0.5 w-10 bg-[hsl(0,0%,88%)] rounded-sm" />
      <div className="mt-1.5 h-0.5 w-4 bg-[hsl(0,0%,50%)] rounded-sm" />
      <div className="h-0.5 w-full bg-[hsl(0,0%,88%)] rounded-sm" />
    </div>
  </div>
);

const templates: { value: ResumeTemplate; label: string; description: string }[] = [
  { value: "classic", label: "Classic", description: "Traditional single-column" },
  { value: "modern", label: "Modern", description: "Two-column sidebar" },
  { value: "minimal", label: "Minimal", description: "Clean & spacious" },
];

const colorOptions: { value: ResumeAccentColor; label: string }[] = [
  { value: "teal", label: "Teal" },
  { value: "navy", label: "Navy" },
  { value: "burgundy", label: "Burgundy" },
  { value: "forest", label: "Forest" },
  { value: "charcoal", label: "Charcoal" },
];

const TemplatePicker = ({
  activeTemplate,
  onTemplateChange,
  activeColor,
  onColorChange,
}: {
  activeTemplate: ResumeTemplate;
  onTemplateChange: (t: ResumeTemplate) => void;
  activeColor: ResumeAccentColor;
  onColorChange: (c: ResumeAccentColor) => void;
}) => {
  const accentHsl = ACCENT_COLORS[activeColor];

  return (
    <div className="space-y-4">
      {/* Template thumbnails */}
      <div>
        <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Template
        </p>
        <div className="flex gap-3">
          {templates.map((t) => {
            const isActive = activeTemplate === t.value;
            return (
              <button
                key={t.value}
                onClick={() => onTemplateChange(t.value)}
                className={cn(
                  "relative w-[120px] rounded-md border-2 bg-white overflow-hidden transition-all duration-150",
                  isActive
                    ? "border-primary shadow-sm"
                    : "border-border hover:border-muted-foreground/40"
                )}
              >
                <div className="h-[80px]">
                  {t.value === "classic" && <ClassicSketch />}
                  {t.value === "modern" && <ModernSketch color={accentHsl} />}
                  {t.value === "minimal" && <MinimalSketch />}
                </div>
                <div className="border-t px-2 py-1.5">
                  <p className="text-[10px] font-medium text-foreground">{t.label}</p>
                  <p className="text-[9px] text-muted-foreground">{t.description}</p>
                </div>
                {isActive && (
                  <div className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color picker */}
      <div>
        <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Accent Color
        </p>
        <div className="flex items-center gap-3">
          {colorOptions.map((c) => {
            const isActive = activeColor === c.value;
            return (
              <button
                key={c.value}
                onClick={() => onColorChange(c.value)}
                title={c.label}
                className={cn(
                  "h-7 w-7 rounded-full border-2 transition-all duration-150 flex items-center justify-center",
                  isActive ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                )}
                style={{ backgroundColor: ACCENT_COLORS[c.value] }}
              >
                {isActive && <Check className="h-3 w-3 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplatePicker;
