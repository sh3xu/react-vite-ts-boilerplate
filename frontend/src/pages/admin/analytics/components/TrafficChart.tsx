import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  direct: {
    label: "Direct",
    color: "var(--chart-1)",
  },
  social: {
    label: "Social",
    color: "var(--chart-2)",
  },
  search: {
    label: "Search",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function TrafficChart() {
  const trafficData = [
    { source: "direct", visitors: 1234, percentage: 45 },
    { source: "social", visitors: 856, percentage: 31 },
    { source: "search", visitors: 654, percentage: 24 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={trafficData} cx="50%" cy="50%" labelLine={false} outerRadius={80} dataKey="visitors">
              {trafficData.map((entry) => (
                <Cell key={`cell-${entry.source}`} fill={`var(--color-${entry.source})`} />
              ))}
            </Pie>
            <ChartLegend content={({ payload }) => <ChartLegendContent payload={payload} nameKey="source" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
