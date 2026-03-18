import { ConversionFunnel } from "./components/ConversionFunnel";
import { SalesChart } from "./components/SalesChart";
import { TopProducts } from "./components/TopProducts";
import { TrafficChart } from "./components/TrafficChart";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Comprehensive analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <TrafficChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionFunnel />
        <TopProducts />
      </div>
    </div>
  );
}
