import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ClipboardList,
  Copy,
  Download,
  ArrowRight,
  AlertTriangle,
  Building2,
  Users,
  Target,
  Info,
} from "lucide-react";
import { analyzeJD, type AnalysisResult } from "@/lib/placement-analyzer";
import { usePlacementHistory } from "@/hooks/use-placement-history";
import { toast } from "sonner";

/* ── Input Form ── */
const AnalysisForm = ({ onAnalyze }: { onAnalyze: (r: AnalysisResult) => void }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jdText, setJdText] = useState("");

  const [jdWarning, setJdWarning] = useState("");

  const handleJdChange = (val: string) => {
    setJdText(val);
    if (val.trim().length > 0 && val.trim().length < 200) {
      setJdWarning("This JD is too short to analyze deeply. Paste the full JD for better output.");
    } else {
      setJdWarning("");
    }
  };

  const handleSubmit = () => {
    if (!jdText.trim()) {
      toast.error("Please paste a job description to analyze.");
      return;
    }
    const result = analyzeJD(company, role, jdText);
    onAnalyze(result);
    toast.success("Analysis complete!");
  };

  return (
    <div>
      <h1 className="font-heading text-headline text-foreground">JD Analyzer</h1>
      <p className="mt-2 text-body text-muted-foreground text-prose">
        Paste a job description to extract skills, generate a prep plan, and get likely interview questions.
      </p>

      <Card className="mt-8">
        <CardContent className="p-6 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" placeholder="e.g. Google" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role">Role / Position</Label>
              <Input id="role" placeholder="e.g. SDE-1" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="jd">Job Description</Label>
            <Textarea
              id="jd"
              rows={10}
              placeholder="Paste the full job description here..."
              value={jdText}
              onChange={(e) => handleJdChange(e.target.value)}
              className="resize-y"
              required
            />
            <div className="flex items-center justify-between gap-4">
              <p className="text-caption text-muted-foreground">{jdText.length} characters</p>
              {jdWarning && (
                <p className="text-caption text-warning-foreground flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3" /> {jdWarning}
                </p>
              )}
            </div>
          </div>
          <Button onClick={handleSubmit} className="gap-2">
            <Search className="h-4 w-4" /> Analyze JD
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

/* ── Readiness Ring ── */
const MiniRing = ({ score }: { score: number }) => {
  const size = 120;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (Math.max(0, Math.min(score, 100)) / 100) * circ;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--primary))" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} className="transition-all duration-[600ms] ease-in-out" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-heading text-headline text-foreground">{Math.max(0, Math.min(score, 100))}</span>
        <span className="text-caption text-muted-foreground -mt-1">Score</span>
      </div>
    </div>
  );
};

/* ── Export helpers ── */
function planToText(result: AnalysisResult): string {
  return result.plan
    .map((d) => `${d.day}: ${d.focus}\n${d.tasks.map((t) => `  • ${t}`).join("\n")}`)
    .join("\n\n");
}

function checklistToText(result: AnalysisResult): string {
  return result.checklist
    .map((r) => `Round ${r.round}: ${r.title}\n${r.items.map((i) => `  □ ${i}`).join("\n")}`)
    .join("\n\n");
}

function questionsToText(result: AnalysisResult): string {
  return result.questions.map((q, i) => `${i + 1}. ${q}`).join("\n");
}

function fullExportText(result: AnalysisResult, confidenceMap: Record<string, "know" | "practice">, liveScore: number): string {
  const header = `${result.company || "Company"} — ${result.role || "Role"}\nAnalyzed: ${new Date(result.createdAt).toLocaleDateString()}\nReadiness Score: ${liveScore}/100\n`;

  const skills = result.extractedSkills
    .map((cat) => `${cat.name}:\n${cat.skills.map((s) => `  ${confidenceMap[s] === "know" ? "✓" : "○"} ${s}`).join("\n")}`)
    .join("\n\n");

  return [
    header,
    "── KEY SKILLS ──\n" + skills,
    "── 7-DAY PLAN ──\n" + planToText(result),
    "── ROUND-WISE CHECKLIST ──\n" + checklistToText(result),
    "── LIKELY INTERVIEW QUESTIONS ──\n" + questionsToText(result),
  ].join("\n\n");
}

async function copyText(text: string, label: string) {
  await navigator.clipboard.writeText(text);
  toast.success(`${label} copied to clipboard`);
}

function downloadTxt(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  toast.success("File downloaded");
}

/* ── Results View ── */
const ResultsView = ({
  result,
  onBack,
  onUpdate,
}: {
  result: AnalysisResult;
  onBack: () => void;
  onUpdate: (updated: AnalysisResult) => void;
}) => {
  const allSkills = useMemo(
    () => result.extractedSkills.flatMap((c) => c.skills),
    [result.extractedSkills],
  );

  // Initialize confidence map from persisted data
  const [confidenceMap, setConfidenceMap] = useState<Record<string, "know" | "practice">>(() => {
    const existing = result.skillConfidenceMap ?? {};
    const map: Record<string, "know" | "practice"> = {};
    for (const s of allSkills) {
      map[s] = existing[s] ?? "practice";
    }
    return map;
  });

  // Live score: base + adjustments
  const liveScore = useMemo(() => {
    const base = result.readinessScore;
    let adj = 0;
    for (const s of allSkills) {
      adj += confidenceMap[s] === "know" ? 2 : -2;
    }
    return Math.max(0, Math.min(100, base + adj));
  }, [confidenceMap, result.readinessScore, allSkills]);

  const toggleSkill = useCallback(
    (skill: string) => {
      setConfidenceMap((prev) => {
        const next = {
          ...prev,
          [skill]: prev[skill] === "know" ? ("practice" as const) : ("know" as const),
        };
        // Persist back to history
        const updated: AnalysisResult = { ...result, skillConfidenceMap: next };
        onUpdate(updated);
        return next;
      });
    },
    [result, onUpdate],
  );

  const weakSkills = useMemo(
    () => allSkills.filter((s) => confidenceMap[s] === "practice").slice(0, 3),
    [allSkills, confidenceMap],
  );

  const exportFilename = `${(result.company || "analysis").toLowerCase().replace(/\s+/g, "-")}-prep.txt`;

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 -ml-2 gap-1.5 text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Analyzer
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="font-heading text-headline text-foreground">
            {result.company || "Company"} — {result.role || "Role"}
          </h1>
          <p className="mt-1 text-caption text-muted-foreground">
            Analyzed {new Date(result.createdAt).toLocaleDateString()}
          </p>
        </div>
        <MiniRing score={liveScore} />
      </div>

      {/* A) Interactive Skills */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
            Key Skills Extracted
          </CardTitle>
          <p className="text-caption text-muted-foreground mt-1">Click a skill to toggle your confidence level.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {result.extractedSkills.map((cat) => (
            <div key={cat.name}>
              <p className="text-caption font-medium text-foreground mb-2">{cat.name}</p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => {
                  const isKnown = confidenceMap[s] === "know";
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSkill(s)}
                      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-overline font-medium uppercase tracking-wider transition-colors duration-normal cursor-pointer ${
                        isKnown
                          ? "border-success/40 bg-success/10 text-success"
                          : "border-warning/40 bg-warning/10 text-warning-foreground"
                      }`}
                    >
                      {isKnown ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <AlertTriangle className="h-3 w-3" />
                      )}
                      {s}
                      <span className="text-[10px] opacity-70 normal-case tracking-normal ml-0.5">
                        {isKnown ? "I know" : "Practice"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Company Intel */}
      {result.companyIntel && (
        <>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
                <Building2 className="h-4 w-4" /> Company Intel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-caption text-muted-foreground">Company</p>
                  <p className="text-body font-medium text-foreground">{result.companyIntel.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-caption text-muted-foreground">Industry</p>
                  <p className="text-body font-medium text-foreground">{result.companyIntel.industry}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-caption text-muted-foreground">Estimated Size</p>
                  <p className="text-body font-medium text-foreground">{result.companyIntel.sizeLabel}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <p className="text-caption font-medium text-foreground">Typical Hiring Focus</p>
                </div>
                <p className="text-caption text-muted-foreground text-prose">{result.companyIntel.hiringFocus}</p>
              </div>

              <p className="text-[11px] text-muted-foreground/60 flex items-center gap-1.5 pt-2 border-t">
                <Info className="h-3 w-3" /> Demo Mode: Company intel generated heuristically.
              </p>
            </CardContent>
          </Card>

          {/* Round Flow Timeline */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
                <Users className="h-4 w-4" /> Expected Round Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-[11px] top-1 bottom-1 w-px bg-border" />

                <div className="space-y-6">
                  {result.companyIntel.roundFlow.map((step, i) => (
                    <div key={step.round} className="relative">
                      {/* Dot */}
                      <div className="absolute -left-8 top-0.5 h-6 w-6 rounded-full border-2 border-primary bg-background flex items-center justify-center">
                        <span className="text-[10px] font-medium text-primary">{step.round}</span>
                      </div>
                      <div>
                        <p className="font-heading text-body font-medium text-foreground">{step.title}</p>
                        <p className="text-caption text-muted-foreground mt-1">{step.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* B) Round-wise Checklist */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
            <ClipboardList className="h-4 w-4" /> Round-wise Preparation
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => copyText(checklistToText(result), "Checklist")} className="gap-1.5 text-muted-foreground">
            <Copy className="h-3.5 w-3.5" /> Copy
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {result.checklist.map((round) => (
            <div key={round.round}>
              <p className="font-heading text-body font-medium text-foreground mb-3">
                Round {round.round}: {round.title}
              </p>
              <ul className="space-y-2">
                {round.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span className="text-caption text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* C) 7-Day Plan */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
            <Calendar className="h-4 w-4" /> 7-Day Preparation Plan
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => copyText(planToText(result), "7-day plan")} className="gap-1.5 text-muted-foreground">
            <Copy className="h-3.5 w-3.5" /> Copy
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {result.plan.map((day) => (
            <div key={day.day}>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline">{day.day}</Badge>
                <span className="font-heading text-body font-medium text-foreground">{day.focus}</span>
              </div>
              <ul className="space-y-1.5 pl-6">
                {day.tasks.map((task, i) => (
                  <li key={i} className="text-caption text-muted-foreground list-disc">{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* D) Interview Questions */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
            <MessageSquare className="h-4 w-4" /> Likely Interview Questions
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => copyText(questionsToText(result), "Questions")} className="gap-1.5 text-muted-foreground">
            <Copy className="h-3.5 w-3.5" /> Copy
          </Button>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {result.questions.map((q, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-caption font-medium text-primary shrink-0 w-6">{i + 1}.</span>
                <span className="text-caption text-foreground">{q}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Export bar */}
      <Card className="mt-6">
        <CardContent className="p-5 flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              downloadTxt(fullExportText(result, confidenceMap, liveScore), exportFilename)
            }
            className="gap-1.5"
          >
            <Download className="h-3.5 w-3.5" /> Download as TXT
          </Button>
        </CardContent>
      </Card>

      {/* Action Next */}
      {weakSkills.length > 0 && (
        <Card className="mt-6 border-primary/20">
          <CardContent className="p-6">
            <p className="font-heading text-body font-medium text-foreground mb-3">What to do next</p>
            <p className="text-caption text-muted-foreground mb-4">
              You have {allSkills.filter((s) => confidenceMap[s] === "practice").length} skills marked as "Need practice". Focus on these first:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {weakSkills.map((s) => (
                <Badge key={s} variant="warning">{s}</Badge>
              ))}
            </div>
            <p className="text-body font-medium text-foreground flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" /> Start Day 1 plan now.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

/* ── Page ── */
const Assessments = () => {
  const { save, update, history } = usePlacementHistory();
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);

  // Check if we have a selected history item in sessionStorage
  useState(() => {
    try {
      const selected = sessionStorage.getItem("placementSelectedResult");
      if (selected) {
        setCurrentResult(JSON.parse(selected));
        sessionStorage.removeItem("placementSelectedResult");
      }
    } catch { /* ignore */ }
  });

  const handleAnalyze = (result: AnalysisResult) => {
    save(result);
    setCurrentResult(result);
  };

  const handleUpdate = useCallback(
    (updated: AnalysisResult) => {
      update(updated);
      setCurrentResult(updated);
    },
    [update],
  );

  if (currentResult) {
    return (
      <ResultsView
        result={currentResult}
        onBack={() => setCurrentResult(null)}
        onUpdate={handleUpdate}
      />
    );
  }

  return <AnalysisForm onAnalyze={handleAnalyze} />;
};

export default Assessments;
