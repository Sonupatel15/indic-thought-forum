"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { events } from "@/lib/site";
import { getEventSchedule } from "@/lib/schedule";
import { useEventDate } from "@/lib/use-event-date";
import { MediaDialog } from "./media-dialog";

export function EventList({ compact = false, asOfDate }: { compact?: boolean; asOfDate: string }) {
  const today = useEventDate(asOfDate);
  const [filter, setFilter] = useState("All events");
  const [selected, setSelected] = useState<number | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);
  const { upcoming, past } = getEventSchedule(events, today);
  const available = compact ? [...upcoming].reverse().concat(past).slice(0, 3) : past;
  const visible = filter === "All events" ? available : available.filter(event => event.category === filter);
  const media = visible.map(event => ({ src: event.image, title: event.title, alt: `Original event poster: ${event.title}, ${event.speaker}, ${event.displayDate}` }));

  return <>
    {!compact && <div className="filter-bar" aria-label="Filter event archive">{["All events", "History", "Ideas & dialogue"].map(category => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}<span>{visible.length} conversations</span></div>}
    <div className="event-grid">{visible.map((event, index) => <article className="event-card" key={event.id}>
      <button className="event-image" type="button" onClick={click => { returnFocusRef.current = click.currentTarget; setSelected(index); }} aria-label={`View poster for ${event.title}`}>
        <Image src={event.previewImage} alt="" width={event.imageWidth} height={event.imageHeight} sizes="(max-width: 480px) 90vw, (max-width: 760px) 45vw, 30vw" />
        {!compact && <span className="event-tag">{event.category}</span>}<span className="image-open"><ArrowUpRight size={22} aria-hidden="true" /></span>
      </button>
      <div className="event-body"><div className="event-date"><CalendarDays size={14} aria-hidden="true" /><time dateTime={event.date}>{event.displayDate}</time><span>{event.date < today ? "Archive" : event.date === today ? "Today" : "Upcoming"}</span></div><h3><button type="button" onClick={click => { returnFocusRef.current = click.currentTarget; setSelected(index); }}>{event.title}</button></h3><p className="event-speaker">{event.speaker}</p><div className="event-location"><MapPin size={14} aria-hidden="true" />{event.venue}</div></div>
    </article>)}</div>
    {visible.length === 0 && <p className="schedule-note">No past conversations match this selection. Confirmed upcoming dates are listed in the event calendar.</p>}
    <MediaDialog items={media} selected={selected} onSelect={setSelected} returnFocusRef={returnFocusRef} />
  </>;
}
