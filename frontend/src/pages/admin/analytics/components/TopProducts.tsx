import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TopProducts() {
  const products = [
    { name: "Product A", sales: 1250, revenue: 12500 },
    { name: "Product B", sales: 980, revenue: 9800 },
    { name: "Product C", sales: 750, revenue: 7500 },
    { name: "Product D", sales: 620, revenue: 6200 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.name} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.sales} sales</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${product.revenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
