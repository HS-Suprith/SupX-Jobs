import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { Clock, ArrowRight } from "lucide-react";

/* ── 1. Readiness Ring ── */
const ReadinessRing = ({ score }: { score: number }) => {
  const size = 160;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <Card className="row-span-2">
      <CardHeader>
        <CardTitle className="text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
          Overall Readiness
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pb-8">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-[800ms] ease-in-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-heading text-display text-foreground">{score}</span>
          <span className="text-caption text-muted-foreground -mt-1">Readiness Score</span>
        </div>
      </CardContent>
    </Card>
  );
};

/* ── 2. Skill Breakdown ── */
const skillData = [
  { skill: "DSA", value: 75 },
  { skill: "Sys Design", value: 60 },
  { skill: "Comm", value: 80 },
  { skill: "Resume", value: 85 },
  { skill: "Aptitude", value: 70 },
];

const SkillBreakdown = () => (
  <Card className="row-span-2">
    <CardHeader>
      <CardTitle className="text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
        Skill Breakdown
      </CardTitle>
    </CardHeader>
    <CardContent className="pb-6">
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={skillData} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

/* ── 3. Continue Practice ── */
const ContinuePractice = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
        Continue Practice
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <p className="font-heading text-title text-foreground">Dynamic Programming</p>
        <p className="text-caption text-muted-foreground mt-1">3 of 10 problems completed</p>
      </div>
      <Progress value={30} className="h-2" />
      <Button size="sm" className="gap-2">
        Continue <ArrowRight className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

/* ── 4. Weekly Goals ── */
const days = ["M", "T", "W", "T", "F", "S", "S"];
const activeDays = [true, true, false, true, true, false, false];

const WeeklyGoals = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
        Weekly Goals
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <p className="text-body font-medium text-foreground">Problems Solved: 12 / 20 this week</p>
        <Progress value={60} className="h-2 mt-2" />
      </div>
      <div className="flex items-center gap-3">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-caption font-medium ${
                activeDays[i]
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {d}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

/* ── 5. Upcoming Assessments ── */
const assessments = [
  { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM" },
  { title: "System Design Review", time: "Wed, 2:00 PM" },
  { title: "HR Interview Prep", time: "Friday, 11:00 AM" },
];

const UpcomingAssessments = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
        Upcoming Assessments
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <ul className="divide-y">
        {assessments.map((a) => (
          <li key={a.title} className="flex items-center gap-4 px-6 py-4">
            <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-body font-medium text-foreground">{a.title}</p>
              <p className="text-caption text-muted-foreground">{a.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

/* ── Page ── */
const PlacementDashboard = () => (
  <div>
    <h1 className="font-heading text-headline text-foreground">Dashboard</h1>
    <p className="mt-2 text-body text-muted-foreground text-prose">
      Track your placement readiness at a glance.
    </p>

    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <ReadinessRing score={72} />
      <SkillBreakdown />
      <ContinuePractice />
      <WeeklyGoals />
      <UpcomingAssessments />
    </div>
  </div>
);

export default PlacementDashboard;
