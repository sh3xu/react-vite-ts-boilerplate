import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type AppTabItem = {
  value: string;
  label: ReactNode;
  content: ReactNode;
};

type AppTabsProps = {
  defaultValue: string;
  items: AppTabItem[];
  listVariant?: "default" | "line";
  orientation?: "horizontal" | "vertical";
  className?: string;
  contentClassName?: string;
  listClassName?: string;
};

export function AppTabs({
  defaultValue,
  items,
  listVariant = "default",
  orientation = "horizontal",
  className,
  contentClassName,
  listClassName,
}: AppTabsProps) {
  const isVertical = orientation === "vertical";

  return (
    <Tabs defaultValue={defaultValue} orientation={orientation} className={className}>
      <TabsList variant={listVariant} className={listClassName}>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {isVertical ? (
        <div className="flex-1">
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value} className={contentClassName}>
              {item.content}
            </TabsContent>
          ))}
        </div>
      ) : (
        items.map((item) => (
          <TabsContent key={item.value} value={item.value} className={contentClassName}>
            {item.content}
          </TabsContent>
        ))
      )}
    </Tabs>
  );
}
