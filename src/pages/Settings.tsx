import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { loadPreferences, savePreferences, Preferences } from "@/lib/preferences";
import { X } from "lucide-react";

const allLocations = [
  "Bangalore", "Chennai", "Hyderabad", "Mumbai", "Pune",
  "Noida", "Gurgaon", "Kolkata", "Mysore",
];
const allModes = ["Remote", "Hybrid", "Onsite"];
const allExperience = ["All", "Fresher", "0-1", "1-3", "3-5"];

const Settings = () => {
  const navigate = useNavigate();
  const [roleKeywordsRaw, setRoleKeywordsRaw] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState("All");
  const [skillsRaw, setSkillsRaw] = useState("");
  const [minMatchScore, setMinMatchScore] = useState(40);

  // Prefill from localStorage
  useEffect(() => {
    const prefs = loadPreferences();
    if (prefs) {
      setRoleKeywordsRaw(prefs.roleKeywords.join(", "));
      setSelectedLocations(prefs.preferredLocations);
      setSelectedModes(prefs.preferredModes);
      setExperienceLevel(prefs.experienceLevel);
      setSkillsRaw(prefs.skills.join(", "));
      setMinMatchScore(prefs.minMatchScore);
    }
  }, []);

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const toggleMode = (mode: string) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const parseCommaList = (raw: string): string[] =>
    raw.split(",").map((s) => s.trim()).filter(Boolean);

  const handleSave = () => {
    const prefs: Preferences = {
      roleKeywords: parseCommaList(roleKeywordsRaw),
      preferredLocations: selectedLocations,
      preferredModes: selectedModes,
      experienceLevel,
      skills: parseCommaList(skillsRaw),
      minMatchScore,
    };
    savePreferences(prefs);
    toast.success("Preferences saved successfully");
    navigate("/dashboard");
  };

  return (
    <main className="flex-1 px-6 md:px-10 py-8 md:py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="font-heading text-headline text-foreground">Preferences</h1>
        <p className="mt-2 text-body text-muted-foreground">
          Configure your job tracking criteria to activate intelligent matching.
        </p>

        <Card className="mt-10">
          <CardHeader>
            <CardTitle className="text-body">Tracking Criteria</CardTitle>
            <CardDescription>Define what roles you're looking for.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              {/* Role Keywords */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="keywords">Role Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="e.g. Frontend, React, SDE Intern"
                  value={roleKeywordsRaw}
                  onChange={(e) => setRoleKeywordsRaw(e.target.value)}
                />
                <p className="text-caption text-muted-foreground">Comma-separated</p>
              </div>

              {/* Preferred Locations */}
              <div className="flex flex-col gap-2">
                <Label>Preferred Locations</Label>
                <div className="flex flex-wrap gap-2">
                  {allLocations.map((loc) => (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => toggleLocation(loc)}
                      className="inline-block"
                    >
                      <Badge
                        variant={selectedLocations.includes(loc) ? "default" : "outline"}
                        className="cursor-pointer"
                      >
                        {loc}
                        {selectedLocations.includes(loc) && (
                          <X className="h-3 w-3 ml-1" />
                        )}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Work Mode */}
              <div className="flex flex-col gap-2">
                <Label>Work Mode</Label>
                <div className="flex gap-4">
                  {allModes.map((mode) => (
                    <label
                      key={mode}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedModes.includes(mode)}
                        onCheckedChange={() => toggleMode(mode)}
                      />
                      <span className="text-caption text-foreground">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="flex flex-col gap-2">
                <Label>Experience Level</Label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {allExperience.map((exp) => (
                      <SelectItem key={exp} value={exp}>{exp === "All" ? "Any experience" : exp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g. React, TypeScript, Python, SQL"
                  value={skillsRaw}
                  onChange={(e) => setSkillsRaw(e.target.value)}
                />
                <p className="text-caption text-muted-foreground">Comma-separated</p>
              </div>

              {/* Min Match Score */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Label>Minimum Match Score</Label>
                  <span className="text-caption font-medium text-foreground">
                    {minMatchScore}%
                  </span>
                </div>
                <Slider
                  value={[minMatchScore]}
                  onValueChange={(v) => setMinMatchScore(v[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-caption text-muted-foreground">
                  Jobs below this score can be hidden on the Dashboard.
                </p>
              </div>

              <Button type="submit" className="self-start mt-2">
                Save Preferences
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Settings;
