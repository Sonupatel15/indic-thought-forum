"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { events } from "@/lib/site";
import { getEventSchedule } from "@/lib/schedule";
import { useEventDate } from "@/lib/use-event-date";
import { useIncrementalList } from "@/lib/use-incremental-list";
import { MediaDialog } from "./media-dialog";

export function EventList({ compact = false, asOfDate }: { compact?: boolean; asOfDate: string }) {
  const today = useEventDate(asOfDate);
  const [selected, setSelected] = useState<number | null>(null);
  const [responsiveCount, setResponsiveCount] = useState(3);
  const selectedRef = useRef<number | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);
  const { upcoming, past } = getEventSchedule(events, today);
  const available = compact ? [...upcoming].reverse().concat(past).slice(0, 3) : [...events].sort((a, b) => b.date.localeCompare(a.date));
  const { gridRef, visibleItems, hasMore, showMore } = useIncrementalList(available, 3, 3, !compact);
  const visible = compact ? available.slice(0, responsiveCount) : visibleItems;
  const media = visible.map(event => ({ src: event.previewImage, title: event.title, alt: `Event poster: ${event.title}, ${event.speaker}, ${event.displayDate}` }));
  const selectMedia = (index: number | null) => {
    selectedRef.current = index;
    setSelected(index);
  };

  useEffect(() => {
    if (!compact) return;
    const grid = gridRef.current;
    if (!grid) throw new Error("Responsive poster count requires an event grid.");
    const updateCount = () => {
      const columns = getComputedStyle(grid).gridTemplateColumns.split(/\s+/).length;
      const nextCount = Math.min(columns, available.length);
      setResponsiveCount(nextCount);
      if (selectedRef.current !== null && selectedRef.current >= nextCount) {
        selectedRef.current = null;
        setSelected(null);
      }
    };
    const observer = new ResizeObserver(updateCount);
    observer.observe(grid);
    updateCount();
    return () => observer.disconnect();
  }, [available.length, compact, gridRef]);

  return <>
    <div ref={gridRef} className={`event-grid${compact ? " event-grid--preview" : ""}`} id={compact ? undefined : "event-list"}>{visible.map((event, index) => <article className="event-card" key={event.id}>
      <button className="event-image" type="button" onClick={click => { returnFocusRef.current = click.currentTarget; selectMedia(index); }} aria-label={`View poster for ${event.title}`}>
        <Image src={event.previewImage} alt="" width={event.imageWidth} height={event.imageHeight} sizes="(max-width: 480px) 90vw, (max-width: 760px) 45vw, 30vw" />
        <span className="image-open"><ArrowUpRight size={22} aria-hidden="true" /></span>
      </button>
      <div className="event-body"><div className="event-date"><CalendarDays size={14} aria-hidden="true" /><time dateTime={event.date}>{event.displayDate}</time><span>{event.date < today ? "Archive" : event.date === today ? "Today" : "Upcoming"}</span></div><h3><button type="button" onClick={click => { returnFocusRef.current = click.currentTarget; selectMedia(index); }}>{event.title}</button></h3><p className="event-speaker">{event.speaker}</p><div className="event-location"><MapPin size={14} aria-hidden="true" />{event.venue}</div></div>
    </article>)}</div>
    {!compact && hasMore && <div className="load-more-control"><button className="button button--small" type="button" aria-controls="event-list" onClick={event => showMore(event.currentTarget)}>Load more events</button></div>}
    <MediaDialog items={media} selected={selected} onSelect={selectMedia} returnFocusRef={returnFocusRef} />
  </>;
}
