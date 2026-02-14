import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePlacementHistory } from "@/hooks/use-placement-history";
import { useNavigate } from "react-router-dom";
import { Trash2, ExternalLink, Clock } from "lucide-react";
import type { AnalysisResult } from "@/lib/placement-analyzer";

const Resources = () => {
  const { history, remove, clearAll } = usePlacementHistory();
  const navigate = useNavigate();

  const openResult = (entry: AnalysisResult) => {
    sessionStorage.setItem("placementSelectedResult", JSON.stringify(entry));
    navigate("/placement/assessments");
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-headline text-foreground">Analysis History</h1>
          <p className="mt-2 text-body text-muted-foreground text-prose">
            Previously analyzed job descriptions and their preparation plans.
          </p>
        </div>
        {history.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground">
            Clear All
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <Card className="mt-8">
          <CardContent className="p-10 text-center">
            <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
            <p className="text-body font-medium text-foreground">No analyses yet</p>
            <p className="text-caption text-muted-foreground mt-1">
              Go to Assessments and paste a job description to get started.
            </p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate("/placement/assessments")}>
              Start Analyzing
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8 space-y-4">
          {history.map((entry) => (
            <Card key={entry.id} className="hover:border-primary/30 transition-colors duration-normal">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-heading text-body font-medium text-foreground truncate">
                      {entry.company || "Unknown"} — {entry.role || "Role"}
                    </p>
                    <Badge variant="outline">Score: {entry.readinessScore}/100</Badge>
                  </div>
                  <p className="text-caption text-muted-foreground mt-1">
                    {new Date(entry.createdAt).toLocaleDateString()} · {entry.extractedSkills.flatMap((s) => s.skills).length} skills detected
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => openResult(entry)} className="gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" /> View
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(entry.id)} className="text-muted-foreground h-9 w-9">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
