import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const ResumeProof = () => {
  return (
    <main className="flex-1 px-6 md:px-10 py-8 md:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-headline text-foreground">Proof of Work</h1>
        <p className="mt-2 text-body text-muted-foreground text-prose">
          AI Resume Builder — Artifact collection and submission will be available after all features are built.
        </p>

        <Card className="mt-8">
          <CardContent className="p-10 text-center">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
            <p className="text-body font-medium text-foreground">Coming Soon</p>
            <p className="text-caption text-muted-foreground mt-1">
              Complete the build steps to unlock proof submission.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ResumeProof;
