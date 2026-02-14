import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Search,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Calendar,
  MessageSquare,
  ClipboardList,
} from "lucide-react";
import { analyzeJD, type AnalysisResult } from "@/lib/placement-analyzer";
import { usePlacementHistory } from "@/hooks/use-placement-history";
import { toast } from "sonner";

/* ── Input Form ── */
const AnalysisForm = ({ onAnalyze }: { onAnalyze: (r: AnalysisResult) => void }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jdText, setJdText] = useState("");

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
              onChange={(e) => setJdText(e.target.value)}
              className="resize-y"
            />
            <p className="text-caption text-muted-foreground">{jdText.length} characters</p>
          </div>
          <Button onClick={handleSubmit} className="gap-2">
            <Search className="h-4 w-4" /> Analyze JD
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

/* ── Readiness Ring (small) ── */
const MiniRing = ({ score }: { score: number }) => {
  const size = 120;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--primary))" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} className="transition-all duration-[600ms] ease-in-out" />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-heading text-headline text-foreground">{score}</span>
        <span className="text-caption text-muted-foreground -mt-1">Score</span>
      </div>
    </div>
  );
};

/* ── Results View ── */
const ResultsView = ({ result, onBack }: { result: AnalysisResult; onBack: () => void }) => {
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
        <MiniRing score={result.readinessScore} />
      </div>

      {/* A) Extracted Skills */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
            Key Skills Extracted
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {result.extractedSkills.map((cat) => (
            <div key={cat.name}>
              <p className="text-caption font-medium text-foreground mb-2">{cat.name}</p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* B) Round-wise Checklist */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
            <ClipboardList className="h-4 w-4" /> Round-wise Preparation
          </CardTitle>
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
            <Calendar className="h-4 w-4" /> 7-Day Preparation Plan
          </CardTitle>
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
            <MessageSquare className="h-4 w-4" /> Likely Interview Questions
          </CardTitle>
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
    </div>
  );
};

/* ── Page ── */
const Assessments = () => {
  const { save, history } = usePlacementHistory();
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

  if (currentResult) {
    return <ResultsView result={currentResult} onBack={() => setCurrentResult(null)} />;
  }

  return <AnalysisForm onAnalyze={handleAnalyze} />;
};

export default Assessments;
