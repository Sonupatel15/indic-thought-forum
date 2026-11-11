import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EventSchedule } from "@/components/event-schedule";
import { EventCalendar } from "@/components/event-calendar";
import { CalendarFeaturedEvent } from "@/components/calendar-featured-event";
import { EventMap } from "@/components/event-map";
import { CommunityCTA, PageIntro, SectionHeading } from "@/components/sections";
import { pageMetadata } from "@/lib/metadata";
import { getIndiaDateKey } from "@/lib/schedule";
import { events } from "@/lib/site";

export const metadata = pageMetadata("Event Calendar", "Browse Indic Thought Forum events by day, month, or year, with confirmed dates, IST timings, venues, speakers, and original posters.", "/calendar/");

function getFeaturedEvent() {
  const event = events.find(item => item.id === "ganeshaiah");
  if (!event) throw new Error("The confirmed Ganeshaiah gathering is required for the calendar feature.");
  return event;
}

const featuredEvent = getFeaturedEvent();

export default function Calendar() {
  return <>
    <PageIntro eyebrow="Event calendar" title="Make time for meaningful conversations." description="A simple schedule of our gatherings: what is coming next, what we have explored, and the details you need to plan." />
    <section className="section container calendar-primary-section">
      <CalendarFeaturedEvent event={featuredEvent} />
      <SectionHeading eyebrow="Dates for your diary" title="The ITF event calendar." description="Explore a day, a complete month, or the year ahead. Only confirmed event details are published." />
      <EventCalendar asOfDate={getIndiaDateKey()} />
    </section>
    <EventMap asOfDate={getIndiaDateKey()} />
    <section className="section soft-section calendar-schedule-section" aria-label="Complete event schedule"><div className="container"><SectionHeading eyebrow="All conversations" title="The complete event schedule." description="Upcoming gatherings appear earliest first; past conversations appear most recent first." /><EventSchedule asOfDate={getIndiaDateKey()} showCalendarNotes={false} /></div></section>
    <section className="container support-strip calendar-support-strip"><span className="icon-box"><ArrowUpRight size={26} aria-hidden="true" /></span><div><h2>Let the conversation become a commitment.</h2><p>Explore a Sankalpa that brings what you learn into everyday life.</p></div><Link className="text-link" href="/sankalpas/">Discover our Sankalpas <ArrowUpRight size={18} aria-hidden="true" /></Link></section>
    <CommunityCTA showOrnament={false} />
  </>;
}
