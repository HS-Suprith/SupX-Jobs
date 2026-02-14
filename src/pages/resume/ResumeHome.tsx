import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ResumeHome = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <h1 className="font-heading text-display text-foreground leading-tight">
          Build a Resume
          <br />
          That Gets Read.
        </h1>
        <p className="mt-6 text-body-lg text-muted-foreground text-prose mx-auto">
          A structured, minimal resume builder designed for freshers entering the job market. No fluff. Just clarity.
        </p>
        <Button asChild size="lg" className="mt-10 gap-2">
          <Link to="/resume/builder">
            Start Building <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default ResumeHome;
