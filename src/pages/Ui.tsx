import { useState } from "react";
import { Section, SectionHead } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar } from "../components/ui/avatar";
import { Checkbox } from "../components/ui/checkbox";
import { Switch } from "../components/ui/switch";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "../components/ui/dialog";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Field } from "../components/ui/field";
import { Skeleton } from "../components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Separator } from "../components/ui/separator";
import { toast } from "../components/ui/sonner";
import { applyScheme, resetScheme } from "../lib/colours";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="w-28 shrink-0 text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}

export default function Ui() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="mb-3 text-sm font-medium text-accent">Design system</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Component primitives</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Token-driven primitives for the myOfficeHRM app — every color resolves through
            the semantic token layer (spec 17).
          </p>
        </div>
      </section>

      <Section>
        <SectionHead eyebrow="Actions" title="Buttons & badges" />
        <div className="space-y-5">
          <Row label="Variants">
            <Button>Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
          </Row>
          <Row label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </Row>
          <Row label="Badges">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Approved</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="destructive">Declined</Badge>
          </Row>
        </div>
      </Section>

      <Section className="border-t border-border bg-muted">
        <SectionHead eyebrow="Forms" title="Inputs & controls" />
        <div className="grid max-w-2xl gap-6">
          <div className="grid gap-1.5">
            <Label htmlFor="ui-name">Name</Label>
            <Input id="ui-name" placeholder="Aanya Rao" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="ui-notes">Notes</Label>
            <Textarea id="ui-notes" placeholder="Optional notes…" />
          </div>
          <div className="grid gap-1.5">
            <Label>Department</Label>
            <Select defaultValue="eng">
              <SelectTrigger><SelectValue placeholder="Pick a department" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="eng">Engineering</SelectItem>
                <SelectItem value="fin">Finance</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="ops">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Row label="Checkbox">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox defaultChecked /> Enrolled
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox /> Contractor
            </label>
          </Row>
          <Row label="Switch">
            <Switch defaultChecked aria-label="Notifications" />
            <Switch aria-label="Payroll lock" />
          </Row>
          <Row label="Radio">
            <RadioGroup defaultValue="a" className="flex gap-4">
              <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="a" /> Monthly</label>
              <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="b" /> Fortnightly</label>
            </RadioGroup>
          </Row>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Data" title="Table, avatar & card" />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Leave requests</CardTitle>
              <CardDescription>Pending approvals this week</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Aanya Rao", "Annual", "3", "warning"],
                    ["Diego Silva", "Sick", "1", "success"],
                    ["Mei Tanaka", "Annual", "5", "warning"],
                  ].map(([n, t, d, s]) => (
                    <TableRow key={n}>
                      <TableCell>
                        <span className="flex items-center gap-2.5">
                          <Avatar initials={n.split(" ").map((w) => w[0]).join("")} size="sm" />
                          <span className="font-medium">{n}</span>
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{t}</TableCell>
                      <TableCell className="text-muted-foreground">{d}</TableCell>
                      <TableCell>
                        <Badge variant={s === "success" ? "success" : "warning"}>
                          {s === "success" ? "Approved" : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card</CardTitle>
              <CardDescription>Elevated surface for grouped content</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Cards use <code className="font-mono text-foreground">bg-card</code> +{" "}
              <code className="font-mono text-foreground">shadow-sm</code>; overlays use{" "}
              <code className="font-mono text-foreground">bg-popover</code> +{" "}
              <code className="font-mono text-foreground">shadow-lg</code>.
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="secondary" size="sm">Dismiss</Button>
              <Button size="sm">Save</Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Section className="border-t border-border bg-muted">
        <SectionHead eyebrow="Overlays" title="Dialog & dropdown" />
        <div className="flex flex-wrap items-center gap-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Approve leave request?</DialogTitle>
                <DialogDescription>
                  Aanya Rao · Annual leave · 3 days · starts Monday
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button variant="accent" onClick={() => setDialogOpen(false)}>Approve</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Row actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Employee</DropdownMenuLabel>
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuItem>Edit details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Show in directory</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Terminate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>Tooltip uses the primary dark anchor</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-sm font-medium">Quick filters</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Popovers hold lightweight content anchored to a trigger — filters, date pickers, overflow actions.
              </p>
            </PopoverContent>
          </Popover>

          <Button variant="secondary" onClick={() => toast.success("Leave request approved", { description: "Aanya Rao · 3 days · annual leave" })}>
            Toast it
          </Button>
          <Button variant="ghost" onClick={() => toast.error("Payroll run failed", { description: "Bank file rejected — see run log" })}>
            Toast error
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Patterns" title="Field, tabs & loading" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid gap-5">
            <Field label="Work email" htmlFor="ui-email" description="Used for sign-in and notifications" required>
              <Input id="ui-email" type="email" placeholder="you@company.com" />
            </Field>
            <Field label="Employee ID" htmlFor="ui-eid" error="EMP-014 is already assigned" required>
              <Input id="ui-eid" defaultValue="EMP-014" aria-invalid="true" />
            </Field>
            <Separator />
            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="leave">Leave</TabsTrigger>
                <TabsTrigger value="payroll">Payroll</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="text-sm text-muted-foreground">
                Personal details, documents and employment information.
              </TabsContent>
              <TabsContent value="leave" className="text-sm text-muted-foreground">
                Balances, requests and approval history.
              </TabsContent>
              <TabsContent value="payroll" className="text-sm text-muted-foreground">
                Pay structure, payslips and statutory details.
              </TabsContent>
            </Tabs>
          </div>
          <div className="grid content-start gap-3">
            <Skeleton className="h-9 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-28 w-full" />
            <p className="text-xs text-muted-foreground">Skeleton placeholders for loading states.</p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-muted">
        <SectionHead eyebrow="Theming" title="Scheme switcher" />
        <p className="mb-5 max-w-xl text-sm text-muted-foreground">
          Schemes swap the accent scale AND the neutral ramp — background, surfaces and borders
          re-tint to the scheme's hue family (spec 17 §3). Statuses stay global. Selection persists via localStorage.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="accent" onClick={() => applyScheme("teal")}>Teal</Button>
          <Button variant="accent" onClick={() => applyScheme("violet")}>Violet</Button>
          <Button variant="accent" onClick={() => applyScheme("blue")}>Blue</Button>
          <Button variant="secondary" onClick={() => resetScheme()}>Reset to default</Button>
          <span className="text-xs text-muted-foreground">Then toggle dark mode — dk scale inverts correctly.</span>
        </div>
      </Section>
    </>
  );
}
