"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, Clock3, MapPin, UserRound } from "lucide-react";
import { events, type ForumEvent } from "@/lib/site";
import { eventTimeZone, formatEventTime, getEventSchedule, getEventStart } from "@/lib/schedule";
import { useEventDate } from "@/lib/use-event-date";
import { MediaDialog } from "./media-dialog";

type ScheduleFilter = "all" | "upcoming" | "past";
const filters: { value: ScheduleFilter; label: string }[] = [
  { value: "all", label: "All events" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past events" },
];

export function EventSchedule({ asOfDate, period }: { asOfDate: string; period?: { start: string; end: string; label: string } }) {
  const today = useEventDate(asOfDate);
  const [filter, setFilter] = useState<ScheduleFilter>("all");
  const [selected, setSelected] = useState<number | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);
  const groups = getEventSchedule(events, today);
  const inPeriod = (event: ForumEvent) => !period || (event.date >= period.start && event.date <= period.end);
  const upcoming = !period && filter === "past" ? [] : groups.upcoming.filter(inPeriod);
  const past = !period && filter === "upcoming" ? [] : groups.past.filter(inPeriod);
  const visible = [...upcoming, ...past];
  const media = visible.map(event => ({
    src: event.image, title: event.title,
    alt: `Original event poster: ${event.title}, ${event.speaker}, ${event.displayDate}`,
  }));

  function renderGroup(title: string, items: ForumEvent[], isPast: boolean) {
    if (items.length === 0) return null;
    return <section className="schedule-group" aria-label={title}>
      <div className="schedule-group-heading"><h3>{title}</h3><span>{isPast ? "Most recent first" : "Earliest first"}</span></div>
      <ol className="schedule-list">{items.map(event => {
        const start = getEventStart(event);
        const month = new Intl.DateTimeFormat("en-IN", { timeZone: eventTimeZone, month: "short", year: "numeric" }).format(start);
        return <li key={event.id} className="schedule-item">
          <time className="schedule-date" dateTime={event.date}><strong>{event.date.slice(8)}</strong><span>{month}</span></time>
          <div className="schedule-details">
            <div className="schedule-labels"><span className={`schedule-status${isPast ? " schedule-status--past" : ""}`}>{isPast ? "Past event" : event.date === today ? "Today" : "Upcoming"}</span><span>{event.category}</span></div>
            <h4>{event.title}</h4>
            <p className="schedule-speaker"><UserRound size={15} aria-hidden="true" />{event.speaker}</p>
            <div className="schedule-meta"><span><Clock3 size={15} aria-hidden="true" /><time dateTime={start.toISOString()}>{formatEventTime(event)} IST</time></span><span><MapPin size={15} aria-hidden="true" />{event.venue}</span></div>
          </div>
          <button type="button" className="text-link schedule-poster" onClick={click => { returnFocusRef.current = click.currentTarget; setSelected(visible.findIndex(item => item.id === event.id)); }} aria-label={`View poster for ${event.title}`}>View poster <ArrowUpRight size={17} aria-hidden="true" /></button>
        </li>;
      })}</ol>
    </section>;
  }

  return <div className="event-schedule">
    {!period && <div className="filter-bar" role="group" aria-label="Filter event schedule">{filters.map(item => <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}<span role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "event" : "events"}</span></div>}
    <p className="schedule-timezone"><Clock3 size={15} aria-hidden="true" /> All dates and times are in India Standard Time (IST, UTC+05:30). An event stays in Today until the day ends.</p>
    {period && visible.length === 0 && <p className="calendar-empty" role="status">No confirmed events for {period.label}.</p>}
    {!period && filter !== "past" && upcoming.length === 0 && <div className="schedule-empty"><span className="icon-box"><CalendarDays size={26} aria-hidden="true" /></span><div><h3>No upcoming dates announced yet.</h3><p>We will list the next event once its details are confirmed. {filter === "all" ? "Past conversations are listed below." : "Choose Past events to explore previous conversations."}</p><Link className="text-link" href="/contact-us/">Enquire about future events <ArrowUpRight size={16} aria-hidden="true" /></Link></div></div>}
    {renderGroup("Upcoming & today", upcoming, false)}
    {renderGroup("Past conversations", past, true)}
    {!period && filter === "past" && past.length === 0 && <div className="schedule-empty"><p>No past events to show yet. Choose Upcoming to explore confirmed dates.</p></div>}
    <p className="schedule-note">Listing an event does not open registration. Check the original poster and contact the team for participation details.</p>
    <MediaDialog items={media} selected={selected} onSelect={setSelected} returnFocusRef={returnFocusRef} />
  </div>;
}
