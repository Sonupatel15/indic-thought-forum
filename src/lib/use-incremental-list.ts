"use client";

import { useState } from "react";

export function useIncrementalList<T>(items: readonly T[], initialCount: number, increment = 3) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const visibleItems = items.slice(0, visibleCount);

  return {
    visibleItems,
    hasMore: visibleItems.length < items.length,
    showMore: () => setVisibleCount(count => Math.min(count + increment, items.length)),
  };
}
