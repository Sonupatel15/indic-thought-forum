"use client";

import { useSyncExternalStore } from "react";
import { getIndiaDateKey } from "./schedule";

function subscribe(onChange: () => void) {
  const interval = window.setInterval(onChange, 60000);
  window.addEventListener("focus", onChange);
  return () => {
    window.clearInterval(interval);
    window.removeEventListener("focus", onChange);
  };
}

export function useEventDate(initialDate: string): string {
  return useSyncExternalStore(subscribe, getIndiaDateKey, () => initialDate);
}
