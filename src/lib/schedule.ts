import type { ForumEvent } from "./site";

export const eventTimeZone = "Asia/Kolkata";

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: eventTimeZone, year: "numeric", month: "2-digit", day: "2-digit",
});

export function getIndiaDateKey(now: Date = new Date()): string {
  const parts = dateFormatter.formatToParts(now);
  return ["year", "month", "day"].map(type => parts.find(part => part.type === type)?.value).join("-");
}

export function getEventStart(event: ForumEvent): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date) || !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(event.startTime)) {
    throw new Error(`Invalid date or start time for event "${event.id}". Use YYYY-MM-DD and HH:mm in IST.`);
  }
  const start = new Date(`${event.date}T${event.startTime}:00+05:30`);
  if (Number.isNaN(start.getTime()) || getIndiaDateKey(start) !== event.date) {
    throw new Error(`Invalid calendar date for event "${event.id}".`);
  }
  return start;
}

export function getEventSchedule(items: readonly ForumEvent[], today: string) {
  const ordered = items.map(event => ({ event, timestamp: getEventStart(event).getTime() }))
    .sort((a, b) => a.timestamp - b.timestamp || a.event.id.localeCompare(b.event.id))
    .map(item => item.event);
  return {
    upcoming: ordered.filter(event => event.date >= today),
    past: ordered.filter(event => event.date < today).reverse(),
  };
}

export function formatEventTime(event: ForumEvent): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: eventTimeZone, hour: "numeric", minute: "2-digit", hour12: true,
  }).format(getEventStart(event));
}
