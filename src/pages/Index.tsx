import TopBar from "@/components/layout/TopBar";
import ContextHeader from "@/components/layout/ContextHeader";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import SecondaryPanel from "@/components/layout/SecondaryPanel";
import ProofFooter from "@/components/layout/ProofFooter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar projectName="SupX Jobs" currentStep={1} totalSteps={6} status="in-progress" />

      <ContextHeader
        headline="Design System Foundation"
        subtext="Establish the visual language, spacing scale, and component primitives that every screen will inherit."
      />

      <WorkspaceLayout
        primary={<PrimaryWorkspace />}
        secondary={
          <SecondaryPanel
            stepTitle="What you're building"
            stepDescription="A cohesive design system with tokens for color, typography, and spacing. All components will reference these tokens — no ad hoc styling."
            promptText={`Create a design system with:\n- Background: #F7F6F3\n- Primary text: #111111\n- Accent: #8B0000 (deep red)\n- Serif headings, sans-serif body\n- 8px spacing scale`}
          />
        }
      />

      <ProofFooter />
    </div>
  );
};

const PrimaryWorkspace = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Typography Showcase */}
      <section>
        <h2 className="font-heading text-headline text-foreground mb-6">Typography</h2>
        <div className="flex flex-col gap-4 text-prose">
          <h1 className="font-heading text-display text-foreground">Display Heading</h1>
          <h2 className="font-heading text-headline text-foreground">Headline</h2>
          <h3 className="font-heading text-title text-foreground">Title</h3>
          <p className="text-body-lg text-foreground">
            Body large — designed for introductory paragraphs that need slightly more presence.
          </p>
          <p className="text-body text-muted-foreground">
            Body — the default reading size, optimized for sustained reading at 1.7 line-height.
          </p>
          <p className="text-caption text-muted-foreground">Caption — metadata, labels, and secondary information.</p>
          <p className="text-overline uppercase text-muted-foreground">Overline — section identifiers</p>
        </div>
      </section>

      {/* Color Tokens */}
      <section>
        <h2 className="font-heading text-headline text-foreground mb-6">Color Tokens</h2>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-md bg-background border" />
            <span className="text-caption text-muted-foreground">Background</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-md bg-foreground" />
            <span className="text-caption text-muted-foreground">Foreground</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-md bg-primary" />
            <span className="text-caption text-muted-foreground">Primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-md bg-secondary" />
            <span className="text-caption text-muted-foreground">Secondary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-md bg-success" />
            <span className="text-caption text-muted-foreground">Success</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-md bg-warning" />
            <span className="text-caption text-muted-foreground">Warning</span>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="font-heading text-headline text-foreground mb-6">Buttons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="default">Primary Action</Button>
          <Button variant="outline">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success">Success</Button>
          <Button variant="link">Link Style</Button>
          <Button variant="default" disabled>
            Disabled
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Button variant="default" size="sm">
            Small
          </Button>
          <Button variant="default" size="default">
            Default
          </Button>
          <Button variant="default" size="lg">
            Large
          </Button>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="font-heading text-headline text-foreground mb-6">Badges</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="muted">Muted</Badge>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="font-heading text-headline text-foreground mb-6">Inputs</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <Input placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="font-heading text-headline text-foreground mb-6">Cards</h2>
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Set up user login and registration flows.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-caption text-muted-foreground">
                Includes email/password, social login, and session management.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Database Schema</CardTitle>
              <CardDescription>Define your data models and relationships.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-caption text-muted-foreground">
                Tables, columns, types, and foreign keys — all version-controlled.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Error & Empty States */}
      <section>
        <h2 className="font-heading text-headline text-foreground mb-6">States</h2>
        <div className="grid grid-cols-2 gap-6">
          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="text-body">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-caption text-muted-foreground">
                The build failed because a required environment variable is missing. Add{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-foreground">DATABASE_URL</code> to your project
                settings and try again.
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Open Settings
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-body">No deployments yet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-caption text-muted-foreground">
                Once you complete your first build, deployment history will appear here.
              </p>
              <Button variant="default" size="sm" className="mt-4">
                Start Building
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
