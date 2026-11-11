"use client";

import { useEffect, useRef, useState } from "react";

export function useIncrementalList<T, TContainer extends HTMLElement = HTMLDivElement>(items: readonly T[], initialCount: number, increment = 3, completeRows = false) {
  const gridRef = useRef<TContainer>(null);
  const pendingFocusIndex = useRef<number | null>(null);
  const [{ visibleCount }, setPagination] = useState({ visibleCount: initialCount, columns: 1 });

  useEffect(() => {
    const index = pendingFocusIndex.current;
    if (index === null) return;
    const item = gridRef.current?.children.item(index);
    if (!(item instanceof HTMLElement)) {
      throw new Error("The newly revealed list item is not available for keyboard focus.");
    }
    item.tabIndex = -1;
    item.focus();
    pendingFocusIndex.current = null;
  }, [visibleCount]);

  useEffect(() => {
    if (!completeRows) return;
    const grid = gridRef.current;
    if (!grid) throw new Error("Complete-row loading requires a grid element.");
    const observer = new ResizeObserver(() => {
      const columns = getComputedStyle(grid).gridTemplateColumns.split(/\s+/).length;
      setPagination(previous => {
        const visibleCount = Math.min(Math.ceil(previous.visibleCount / columns) * columns, items.length);
        return previous.columns === columns && previous.visibleCount === visibleCount ? previous : { visibleCount, columns };
      });
    });
    observer.observe(grid);
    return () => observer.disconnect();
  }, [completeRows, items.length]);

  const visibleItems = items.slice(0, visibleCount);

  return {
    gridRef,
    visibleItems,
    hasMore: visibleItems.length < items.length,
    showMore: (button: HTMLButtonElement) => {
      if (button.ownerDocument.activeElement === button) pendingFocusIndex.current = visibleItems.length;
      setPagination(previous => ({
        columns: previous.columns,
        visibleCount: Math.min(Math.ceil((previous.visibleCount + increment) / previous.columns) * previous.columns, items.length),
      }));
    },
  };
}
