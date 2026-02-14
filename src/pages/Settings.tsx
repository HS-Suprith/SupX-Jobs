import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Settings = () => {
  return (
    <main className="flex-1 px-10 py-10 md:py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="font-heading text-headline text-foreground">Preferences</h1>
        <p className="mt-2 text-body text-muted-foreground">
          Configure your job tracking criteria. Matching logic will be added in a future step.
        </p>

        <Card className="mt-10">
          <CardHeader>
            <CardTitle className="text-body">Tracking Criteria</CardTitle>
            <CardDescription>Define what roles you're looking for.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="keywords">Role Keywords</Label>
                <Input
                  id="keywords"
                  placeholder="e.g. Frontend Engineer, React Developer"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="locations">Preferred Locations</Label>
                <Input
                  id="locations"
                  placeholder="e.g. Bangalore, Remote, New York"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="mode">Work Mode</Label>
                <Input
                  id="mode"
                  placeholder="Remote / Hybrid / Onsite"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Input
                  id="experience"
                  placeholder="e.g. 0–2 years, Mid-level, Senior"
                />
              </div>

              <Button type="submit" className="self-start mt-2" disabled>
                Save Preferences
              </Button>
              <p className="text-caption text-muted-foreground -mt-4">
                Save functionality will be enabled in a future step.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Settings;
