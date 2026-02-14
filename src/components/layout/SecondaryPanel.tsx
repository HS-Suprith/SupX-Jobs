import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, Check, AlertCircle, Camera } from "lucide-react";

interface SecondaryPanelProps {
  stepTitle: string;
  stepDescription: string;
  promptText: string;
}

const SecondaryPanel = ({ stepTitle, stepDescription, promptText }: SecondaryPanelProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-title text-foreground">{stepTitle}</h2>
        <p className="mt-2 text-caption text-muted-foreground text-prose">{stepDescription}</p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-caption uppercase tracking-wider text-muted-foreground font-body font-medium">
            Prompt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-caption text-foreground font-body leading-relaxed">
            {promptText}
          </pre>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy} className="justify-start">
          <Copy className="mr-2" /> Copy Prompt
        </Button>
        <Button variant="default" size="sm" className="justify-start">
          <ExternalLink className="mr-2" /> Build in Lovable
        </Button>
        <Button variant="success" size="sm" className="justify-start">
          <Check className="mr-2" /> It Worked
        </Button>
        <Button variant="outline" size="sm" className="justify-start">
          <AlertCircle className="mr-2" /> Error
        </Button>
        <Button variant="ghost" size="sm" className="justify-start">
          <Camera className="mr-2" /> Add Screenshot
        </Button>
      </div>
    </div>
  );
};

export default SecondaryPanel;
