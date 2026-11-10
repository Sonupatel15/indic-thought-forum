import Image from "next/image";
import { Clock3, MapPin, UserRound } from "lucide-react";
import type { ForumEvent } from "@/lib/site";
import { formatEventTime } from "@/lib/schedule";

export function CalendarFeaturedEvent({ event }: { event: ForumEvent }) {
  return <article className="calendar-featured-event" aria-labelledby="calendar-featured-title">
    <div className="calendar-featured-poster">
      <Image src={event.previewImage} alt={`Original event poster: ${event.title}`} width={event.imageWidth} height={event.imageHeight} sizes="(max-width: 760px) 90vw, 280px" />
    </div>
    <div className="calendar-featured-copy">
      <span className="eyebrow">Featured gathering</span>
      <h2 id="calendar-featured-title">{event.title}</h2>
      <p className="calendar-featured-speaker"><UserRound size={16} aria-hidden="true" />{event.speaker}</p>
      <div className="calendar-featured-meta">
        <span><Clock3 size={16} aria-hidden="true" /><time dateTime={`${event.date}T${event.startTime}:00+05:30`}>{event.displayDate} · {formatEventTime(event)} IST</time></span>
        <span><MapPin size={16} aria-hidden="true" />{event.venue}</span>
      </div>
    </div>
  </article>;
}
