import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ConversionFunnel() {
  const funnelData = [
    { stage: "Visitors", count: 10000, percentage: 100 },
    { stage: "Leads", count: 2500, percentage: 25 },
    { stage: "Qualified", count: 1000, percentage: 10 },
    { stage: "Customers", count: 500, percentage: 5 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={funnelData} layout="vertical">
            <CartesianGrid horizontal={false} />
            <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis dataKey="stage" type="category" tickLine={false} axisLine={false} tickMargin={8} width={80} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
