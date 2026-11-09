"use client";

import { useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { events } from "@/lib/site";
import { useEventDate } from "@/lib/use-event-date";
import { EventSchedule } from "./event-schedule";

type CalendarView = "day" | "month" | "year";
const months = Array.from({ length: 12 }, (_, month) => new Intl.DateTimeFormat("en-IN", { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2026, month, 1))));
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function calendarDate(year: number, month: number, day: number): Date {
  const date = new Date(0);
  date.setUTCFullYear(year, month, day);
  return date;
}

function dateKey(date: Date): string {
  return `${String(date.getUTCFullYear()).padStart(4, "0")}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

function daysInMonth(year: number, month: number): number {
  return calendarDate(year, month + 1, 0).getUTCDate();
}

export function EventCalendar({ asOfDate }: { asOfDate: string }) {
  const today = useEventDate(asOfDate);
  // A null selection follows today's IST date, including after hydration and midnight.
  const [selection, setSelection] = useState<string | null>(null);
  const [view, setView] = useState<CalendarView>("month");
  const selectedDate = selection ?? today;
  const [year, monthNumber, day] = selectedDate.split("-").map(Number);
  const month = monthNumber - 1;
  const dayLabel = new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(calendarDate(year, month, day));
  const label = view === "day" ? dayLabel : view === "month" ? `${months[month]} ${year}` : String(year);
  const start = view === "day" ? selectedDate : dateKey(calendarDate(year, view === "year" ? 0 : month, 1));
  const end = view === "day" ? selectedDate : dateKey(calendarDate(year, view === "year" ? 11 : month, view === "year" ? 31 : daysInMonth(year, month)));
  const firstWeekday = calendarDate(year, month, 1).getUTCDay();
  const dayCount = daysInMonth(year, month);
  const cellCount = Math.ceil((firstWeekday + dayCount) / 7) * 7;

  function selectMonth(nextYear: number, nextMonth: number) {
    setSelection(dateKey(calendarDate(nextYear, nextMonth, Math.min(day, daysInMonth(nextYear, nextMonth)))));
  }

  function navigate(direction: number) {
    if (view === "day") setSelection(dateKey(calendarDate(year, month, day + direction)));
    else if (view === "year") selectMonth(year + direction, month);
    else {
      const next = calendarDate(year, month + direction, 1);
      selectMonth(next.getUTCFullYear(), next.getUTCMonth());
    }
  }

  function applyYear(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    selectMonth(Number(new FormData(event.currentTarget).get("year")), month);
  }

  const previousDisabled = view === "year" ? year === 1 : view === "month" ? year === 1 && month === 0 : selectedDate === "0001-01-01";
  const nextDisabled = view === "year" ? year === 9999 : view === "month" ? year === 9999 && month === 11 : selectedDate === "9999-12-31";

  return <section className="event-calendar" aria-label="Browse event calendar">
    <div className="calendar-toolbar">
      <div className="filter-bar calendar-views" role="group" aria-label="Calendar view">{(["day", "month", "year"] as const).map(item => <button key={item} type="button" aria-pressed={view === item} onClick={() => setView(item)}>{item[0].toUpperCase() + item.slice(1)}</button>)}</div>
      <button className="calendar-today" type="button" onClick={() => setSelection(null)}>Today</button>
    </div>
    <div className="calendar-period-navigation">
      <button className="calendar-arrow" type="button" aria-label={`Previous ${view}`} disabled={previousDisabled} onClick={() => navigate(-1)}><ChevronLeft size={20} aria-hidden="true" /></button>
      <h3 className="calendar-period" aria-live="polite" aria-atomic="true">{label}</h3>
      <button className="calendar-arrow" type="button" aria-label={`Next ${view}`} disabled={nextDisabled} onClick={() => navigate(1)}><ChevronRight size={20} aria-hidden="true" /></button>
    </div>
    <form className="calendar-selectors" onSubmit={applyYear}>
      <div className="field"><label htmlFor="calendar-month">Month</label><select id="calendar-month" value={month} onChange={event => { selectMonth(year, Number(event.target.value)); if (view === "year") setView("month"); }}>{months.map((name, index) => <option value={index} key={name}>{name}</option>)}</select></div>
      <div className="field"><label htmlFor="calendar-year">Year</label><input key={year} id="calendar-year" name="year" type="number" min={1} max={9999} step={1} defaultValue={year} required /></div>
      <button className="button button--small" type="submit">Apply year</button>
    </form>
    <p className="calendar-legend">Dates follow India Standard Time (IST). A dot marks a confirmed event; select a date for details.</p>
    {view === "month" && <div className="calendar-month-grid" role="group" aria-label={label}>
      {weekdays.map(name => <span className="calendar-weekday" key={name}><abbr title={name}>{name.slice(0, 3)}</abbr></span>)}
      {Array.from({ length: cellCount }, (_, index) => {
        const date = index - firstWeekday + 1;
        if (date < 1 || date > dayCount) return <span key={index} className="calendar-blank" aria-hidden="true" />;
        const key = dateKey(calendarDate(year, month, date));
        const count = events.filter(event => event.date === key).length;
        const fullLabel = `${weekdays[index % 7]}, ${date} ${months[month]} ${year}`;
        return <button type="button" className="calendar-day" key={index} aria-current={key === today ? "date" : undefined} aria-label={`${fullLabel}. ${count ? `${count} confirmed ${count === 1 ? "event" : "events"}` : "No confirmed events"}`} onClick={() => { setSelection(key); setView("day"); }}>
          <time dateTime={key}>{date}</time>{count > 0 && <span className="calendar-event-dot" aria-hidden="true" />}
        </button>;
      })}
    </div>}
    {view === "year" && <div className="calendar-year-grid" role="group" aria-label={`Months in ${year}`}>{months.map((name, index) => {
      const prefix = `${String(year).padStart(4, "0")}-${String(index + 1).padStart(2, "0")}`;
      const count = events.filter(event => event.date.startsWith(prefix)).length;
      return <button className="calendar-year-month" type="button" key={name} aria-label={`View ${name} ${year}, ${count} confirmed ${count === 1 ? "event" : "events"}`} onClick={() => { selectMonth(year, index); setView("month"); }}><strong>{name}</strong><span>{count} confirmed {count === 1 ? "event" : "events"}</span></button>;
    })}</div>}
    <div className="calendar-details"><h3>Confirmed events: {label}</h3><EventSchedule asOfDate={asOfDate} period={{ start, end, label }} /></div>
  </section>;
}
