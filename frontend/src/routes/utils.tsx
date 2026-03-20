import { lazy, Suspense } from "react";
import { PageLoader } from "@/components/shared/PageLoader";

// NOTE: Creates a lazy-loaded component wrapped in Suspense for code splitting.
export function lazyPage(importFn: () => Promise<{ default: React.ComponentType }>) {
  const LazyComponent = lazy(importFn);
  return (
    <Suspense fallback={<PageLoader />}>
      <LazyComponent />
    </Suspense>
  );
}
