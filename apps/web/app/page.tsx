import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Switch } from "@repo/ui/components/ui/switch";
import { ModeToggle } from "@repo/ui/mode-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-6">
          <div className="font-bold tracking-tight">
            Axonix UI Test
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Component Showcase
          </h1>
          <p className="text-xl text-muted-foreground">
            A pure display of Shadcn components to test theming and CSS stability without heavy customizations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Buttons Card */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Different standard button variants.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </CardContent>
          </Card>

          {/* Badges Card */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status and labeling badges.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </CardContent>
          </Card>

          {/* Form Setup */}
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>Interactable form components.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>

              <div className="flex items-center justify-between border rounded-lg p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on updates.
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

           {/* Generic Info Card */}
           <Card className="col-span-1 md:col-span-2 lg:col-span-3">
             <CardHeader>
               <CardTitle>Theme Variables</CardTitle>
               <CardDescription>Default functional themes driven by globals.css</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                 <div className="space-y-1.5">
                   <div className="h-20 w-full rounded-md bg-primary border bg-clip-padding flex items-center justify-center text-primary-foreground font-bold">Primary</div>
                 </div>
                 <div className="space-y-1.5">
                   <div className="h-20 w-full rounded-md bg-secondary border flex items-center justify-center text-secondary-foreground font-bold">Secondary</div>
                 </div>
                 <div className="space-y-1.5">
                   <div className="h-20 w-full rounded-md bg-muted border flex items-center justify-center text-muted-foreground font-bold text-sm">Muted</div>
                 </div>
                 <div className="space-y-1.5">
                   <div className="h-20 w-full rounded-md bg-accent border flex items-center justify-center text-accent-foreground font-bold">Accent</div>
                 </div>
                 <div className="space-y-1.5">
                   <div className="h-20 w-full rounded-md bg-destructive border flex items-center justify-center text-destructive-foreground font-bold text-sm">Destructive</div>
                 </div>
                 <div className="space-y-1.5">
                   <div className="h-20 w-full rounded-md bg-card border flex items-center justify-center text-card-foreground shadow-sm font-bold">Card</div>
                 </div>
               </div>
             </CardContent>
           </Card>
        </div>
      </main>
    </div>
  );
}
