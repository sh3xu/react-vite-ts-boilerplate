import { useState } from "react";
import { BluetoothIcon, CheckIcon, MoonIcon, PlusIcon, SunIcon, TrashIcon, UserIcon, WifiIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AppAlertDialog, AppAvatar, AppAvatarGroup, AppButton, AppTabs, SelectField } from "@/components/elements";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "cards", label: "Cards" },
  { id: "forms", label: "Forms" },
  { id: "avatars", label: "Avatars" },
  { id: "tabs", label: "Tabs" },
  { id: "dialogs", label: "Dialogs" },
  { id: "feedback", label: "Feedback" },
];

function SectionBlock({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <Card>
        <CardContent className="pt-6 pb-6">{children}</CardContent>
      </Card>
    </div>
  );
}

function ButtonsSection() {
  return (
    <div className="space-y-8">
      <SectionBlock title="Variants" description="All available button styles.">
        <div className="flex flex-wrap gap-3">
          <AppButton intent="default" label="Default" />
          <AppButton intent="secondary" label="Secondary" />
          <AppButton intent="outline" label="Outline" />
          <AppButton intent="ghost" label="Ghost" />
          <AppButton intent="destructive" label="Destructive" />
          <AppButton intent="link" label="Link" />
        </div>
      </SectionBlock>

      <SectionBlock title="Sizes" description="From extra-small to large, plus icon-only variants.">
        <div className="flex flex-wrap items-center gap-3">
          <AppButton size="xs" label="Extra Small" />
          <AppButton size="sm" label="Small" />
          <AppButton size="default" label="Default" />
          <AppButton size="lg" label="Large" />
          <AppButton size="icon" startIcon={<PlusIcon />} />
          <AppButton size="icon-sm" startIcon={<PlusIcon />} />
          <AppButton size="icon-lg" startIcon={<PlusIcon />} />
        </div>
      </SectionBlock>

      <SectionBlock title="With Icons" description="Buttons with leading or trailing icons.">
        <div className="flex flex-wrap gap-3">
          <AppButton label="Create New" startIcon={<PlusIcon data-icon="inline-start" />} />
          <AppButton intent="outline" label="Delete" startIcon={<TrashIcon data-icon="inline-start" />} />
          <AppButton intent="secondary" label="Download" endIcon={<PlusIcon data-icon="inline-end" />} />
        </div>
      </SectionBlock>

      <SectionBlock title="States">
        <div className="flex flex-wrap gap-3">
          <AppButton label="Disabled" disabled />
          <AppButton intent="outline" label="Disabled Outline" disabled />
          <AppButton label="Loading..." loading />
        </div>
      </SectionBlock>
    </div>
  );
}

function BadgesSection() {
  return (
    <div className="space-y-8">
      <SectionBlock title="Variants" description="All available badge styles.">
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
      </SectionBlock>

      <SectionBlock title="With Icons">
        <div className="flex flex-wrap gap-3">
          <Badge>
            <CheckIcon data-icon="inline-start" />
            Verified
          </Badge>
          <Badge variant="destructive">
            <TrashIcon data-icon="inline-start" />
            Deleted
          </Badge>
          <Badge variant="secondary">
            <WifiIcon data-icon="inline-start" />
            Online
          </Badge>
        </div>
      </SectionBlock>
    </div>
  );
}

function CardsSection() {
  return (
    <div className="space-y-8">
      <SectionBlock title="Default Card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
              <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Your account is active and in good standing.</p>
            </CardContent>
            <CardFooter className="gap-2">
              <AppButton size="sm" label="Edit Profile" />
              <AppButton size="sm" intent="outline" label="View Details" />
            </CardFooter>
          </Card>

          <Card size="sm">
            <CardHeader>
              <CardTitle>Compact Card</CardTitle>
              <CardDescription>Uses the sm size variant.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Compact cards use reduced padding for denser layouts.</p>
            </CardContent>
            <CardFooter>
              <AppButton size="sm" intent="outline" label="Learn More" />
            </CardFooter>
          </Card>
        </div>
      </SectionBlock>

      <SectionBlock title="Stats Cards" description="Common use case for metric displays.">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: "12,430", delta: "+8%" },
            { label: "Revenue", value: "$48,295", delta: "+12%" },
            { label: "Active Sessions", value: "3,821", delta: "-2%" },
            { label: "Conversion", value: "4.6%", delta: "+0.3%" },
          ].map((stat) => (
            <Card size="sm" key={stat.label}>
              <CardHeader>
                <CardDescription>{stat.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.delta} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}

function FormsSection() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const roleOptions = [
    { label: "Developer", value: "developer" },
    { label: "Designer", value: "designer" },
    { label: "Manager", value: "manager" },
    { label: "Analyst", value: "analyst" },
  ];
  const skillOptions = [
    { label: "React", value: "react" },
    { label: "TypeScript", value: "typescript" },
    { label: "Node.js", value: "nodejs" },
    { label: "UI/UX", value: "uiux" },
    { label: "Testing", value: "testing" },
    { label: "Tailwind CSS", value: "tailwind" },
    { label: "Zod", value: "zod" },
  ];

  return (
    <div className="space-y-8">
      <SectionBlock title="Input" description="Text input with label and field wrapper.">
        <div className="max-w-sm space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="showcase-name">Full Name</FieldLabel>
              <Input id="showcase-name" placeholder="John Doe" />
            </Field>
            <Field>
              <FieldLabel htmlFor="showcase-email">Email Address</FieldLabel>
              <Input id="showcase-email" type="email" placeholder="john@example.com" />
            </Field>
            <Field>
              <FieldLabel htmlFor="showcase-pass">Password</FieldLabel>
              <Input id="showcase-pass" type="password" placeholder="••••••••" />
            </Field>
          </FieldGroup>
        </div>
      </SectionBlock>

      <SectionBlock title="Select" description="Dropdown select with options.">
        <div className="max-w-xs">
          <Field>
            <FieldLabel>Role</FieldLabel>
            <SelectField value={role} onValueChange={setRole} options={roleOptions} placeholder="Select a role" />
          </Field>
        </div>
      </SectionBlock>

      <SectionBlock title="Multi Select" description="Enable multiselect by setting the multiple prop.">
        <div className="max-w-md">
          <Field>
            <FieldLabel>Skills</FieldLabel>
            <SelectField
              multiple
              value={skills}
              onValueChange={setSkills}
              options={skillOptions}
              placeholder="Select one or more skills"
              searchPlaceholder="Search skills..."
            />
          </Field>
        </div>
      </SectionBlock>

      <SectionBlock title="Textarea" description="Multi-line text input.">
        <div className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="showcase-bio">Bio</FieldLabel>
            <Textarea id="showcase-bio" placeholder="Tell us a bit about yourself..." />
          </Field>
        </div>
      </SectionBlock>

      <SectionBlock title="Switch" description="Toggle switch with and without icon in thumb.">
        <div className="space-y-4">
          {[
            { label: "Email notifications", defaultChecked: true },
            { label: "Push notifications", defaultChecked: false },
            { label: "Dark mode", icon: <MoonIcon />, defaultChecked: false },
            { label: "Light mode", icon: <SunIcon />, defaultChecked: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between max-w-xs">
              <span className="text-sm font-medium">{item.label}</span>
              <Switch defaultChecked={item.defaultChecked} icon={item.icon} />
            </div>
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}

function AvatarsSection() {
  const people = [
    { id: "alice-chen", name: "Alice Chen", src: "https://i.pravatar.cc/150?img=1" },
    { id: "bob-smith", name: "Bob Smith", src: "https://i.pravatar.cc/150?img=2" },
    { id: "carol-jones", name: "Carol Jones", src: "https://i.pravatar.cc/150?img=3" },
    { id: "david-park", name: "David Park", src: undefined },
  ];

  return (
    <div className="space-y-8">
      <SectionBlock title="Sizes" description="Small, default, and large avatar sizes.">
        <div className="flex items-center gap-4">
          <Avatar size="sm">
            <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="User" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="User" />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="User" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </div>
      </SectionBlock>

      <SectionBlock title="Fallback" description="When no image is available, initials are shown.">
        <div className="flex items-center gap-4">
          {people.map((person) => (
            <AppAvatar key={person.id} name={person.name} src={person.src} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="With Badge" description="Status indicator on the avatar.">
        <div className="flex items-center gap-4">
          <AppAvatar
            size="lg"
            name="Online User"
            src="https://i.pravatar.cc/150?img=10"
            badgeClassName="bg-green-500"
          />
          <AppAvatar size="lg" name="Busy User" src="https://i.pravatar.cc/150?img=11" badgeClassName="bg-yellow-500" />
          <AppAvatar size="lg" name="Offline User" badgeClassName="bg-muted-foreground" />
        </div>
      </SectionBlock>

      <SectionBlock title="Avatar Group" description="Stacked avatars for teams or collaborators.">
        <AppAvatarGroup people={people} overflowCount={9} />
      </SectionBlock>
    </div>
  );
}

function TabsSection() {
  return (
    <div className="space-y-8">
      <SectionBlock title="Default Tabs" description="Standard pill-style tab list.">
        <AppTabs
          defaultValue="account"
          contentClassName="pt-4"
          items={[
            {
              value: "account",
              label: (
                <>
                  <UserIcon />
                  Account
                </>
              ),
              content: (
                <p className="text-sm text-muted-foreground">Manage your account details and preferences here.</p>
              ),
            },
            {
              value: "security",
              label: "Security",
              content: (
                <p className="text-sm text-muted-foreground">
                  Update your password and enable two-factor authentication.
                </p>
              ),
            },
            {
              value: "notifications",
              label: "Notifications",
              content: (
                <p className="text-sm text-muted-foreground">Configure how and when you receive notifications.</p>
              ),
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Line Variant" description="Underline-style tabs for a cleaner look.">
        <AppTabs
          defaultValue="overview"
          listVariant="line"
          contentClassName="pt-4"
          items={[
            {
              value: "overview",
              label: "Overview",
              content: <p className="text-sm text-muted-foreground">High-level metrics and summary data.</p>,
            },
            {
              value: "analytics",
              label: "Analytics",
              content: <p className="text-sm text-muted-foreground">Detailed analytics and trend information.</p>,
            },
            {
              value: "reports",
              label: "Reports",
              content: <p className="text-sm text-muted-foreground">Exportable reports and scheduled summaries.</p>,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Vertical Tabs" description="Tabs oriented along a vertical axis.">
        <AppTabs
          defaultValue="tab1"
          orientation="vertical"
          className="flex gap-4"
          listClassName="h-auto"
          items={[
            {
              value: "tab1",
              label: "General",
              content: (
                <p className="text-sm text-muted-foreground">General settings for your workspace and display.</p>
              ),
            },
            {
              value: "tab2",
              label: "Privacy",
              content: (
                <p className="text-sm text-muted-foreground">Control who can see your data and profile information.</p>
              ),
            },
            {
              value: "tab3",
              label: "Billing",
              content: (
                <p className="text-sm text-muted-foreground">Manage subscriptions, payment methods, and invoices.</p>
              ),
            },
          ]}
        />
      </SectionBlock>
    </div>
  );
}

function DialogsSection() {
  return (
    <div className="space-y-8">
      <SectionBlock title="Alert Dialog" description="Confirmation dialogs for destructive or important actions.">
        <div className="flex flex-wrap gap-3">
          <AppAlertDialog
            trigger={
              <AppButton intent="destructive" label="Delete Item" startIcon={<TrashIcon data-icon="inline-start" />} />
            }
            title="Delete this item?"
            description="This action cannot be undone. This will permanently delete the item and remove it from our servers."
            icon={<TrashIcon />}
            confirmText="Delete"
            confirmVariant="destructive"
          />

          <AppAlertDialog
            trigger={
              <AppButton
                intent="outline"
                label="Connect Device"
                startIcon={<BluetoothIcon data-icon="inline-start" />}
              />
            }
            title="Allow accessory to connect?"
            description="Do you want to allow this Bluetooth accessory to connect to your device?"
            icon={<BluetoothIcon />}
            cancelText="Don't allow"
            confirmText="Allow"
          />
        </div>
      </SectionBlock>
    </div>
  );
}

function FeedbackSection() {
  return (
    <div className="space-y-8">
      <SectionBlock title="Spinner" description="Loading spinners at various sizes and colors.">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Spinner className="size-4" />
            <span className="text-xs text-muted-foreground">size-4</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner className="size-5" />
            <span className="text-xs text-muted-foreground">size-5</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner className="size-6" />
            <span className="text-xs text-muted-foreground">size-6</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner className="size-8" />
            <span className="text-xs text-muted-foreground">size-8</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner className="size-10 text-primary" />
            <span className="text-xs text-muted-foreground">primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner className="size-8 text-destructive" />
            <span className="text-xs text-muted-foreground">destructive</span>
          </div>
        </div>
      </SectionBlock>
    </div>
  );
}

const sectionComponents: Record<string, React.FC> = {
  buttons: ButtonsSection,
  badges: BadgesSection,
  cards: CardsSection,
  forms: FormsSection,
  avatars: AvatarsSection,
  tabs: TabsSection,
  dialogs: DialogsSection,
  feedback: FeedbackSection,
};

export default function Showcase() {
  const [active, setActive] = useState("buttons");
  const ActiveSection = sectionComponents[active];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Component Showcase</h1>
        <p className="text-muted-foreground mt-1">Live previews of every UI component available in this template.</p>
      </div>

      <div className="flex gap-2 flex-wrap border-b pb-4">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(s.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === s.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <ActiveSection />
    </div>
  );
}
