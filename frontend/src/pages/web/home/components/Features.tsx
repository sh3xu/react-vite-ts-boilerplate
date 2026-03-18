import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      title: "Fast Development",
      description: "Built with Vite and SWC for blazing fast builds",
      content: "Start coding in minutes, not days. All the tools you need are already configured.",
    },
    {
      title: "Modern Stack",
      description: "TanStack Query, Zustand, shadcn/ui, and more",
      content: "Built with the latest technologies and best practices for production applications.",
    },
    {
      title: "Complete Examples",
      description: "Authentication, CRUD, charts, and more",
      content: "Full showcase of common patterns and features you will need in real applications.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {features.map((feature) => (
        <Card key={feature.title}>
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{feature.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
