"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import { events, eventMapLocations } from "@/lib/site";
import { formatEventTime, getEventSchedule } from "@/lib/schedule";
import { useEventDate } from "@/lib/use-event-date";
import { useIncrementalList } from "@/lib/use-incremental-list";

const locationsByVenue = new Map<string, typeof eventMapLocations[number]>();
for (const location of eventMapLocations) locationsByVenue.set(location.venue, location);
const unmappedEvents = events.filter(event => !locationsByVenue.has(event.venue));
if (unmappedEvents.length > 0) {
  throw new Error(`Missing verified map coordinates for events: ${unmappedEvents.map(event => event.id).join(", ")}.`);
}

function directionsUrl(latitude: number, longitude: number): string {
  const query = new URLSearchParams({ to: `${latitude},${longitude}` });
  return `https://www.openstreetmap.org/directions?${query}`;
}

function locationMapUrl(location: typeof eventMapLocations[number]): string {
  return `https://www.openstreetmap.org/way/${location.osmWayId}#map=17/${location.latitude}/${location.longitude}`;
}

export function EventMap({ asOfDate }: { asOfDate: string }) {
  const today = useEventDate(asOfDate);
  const upcoming = useMemo(() => getEventSchedule(events, today).upcoming, [today]);
  const locations = useMemo(() => eventMapLocations
    .map(location => ({ ...location, events: upcoming.filter(event => event.venue === location.venue) }))
    .filter(location => location.events.length > 0), [upcoming]);
  const { visibleItems, hasMore, showMore } = useIncrementalList(upcoming, 3);
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRefs = useRef<Map<string, LeafletMarker>>(new Map());
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  function selectEvent(eventId: string, venue: string) {
    const location = locationsByVenue.get(venue);
    const marker = markerRefs.current.get(venue);
    const map = mapRef.current;
    if (!location || !marker || !map) {
      throw new Error(`The map marker for upcoming event "${eventId}" is not available.`);
    }
    setSelectedEventId(eventId);
    map.setView([location.latitude, location.longitude], Math.max(map.getZoom(), 14), { animate: false });
    marker.openPopup();
  }

  useEffect(() => {
    const element = mapElement.current;
    if (!element) return;
    let disposed = false;
    let map: LeafletMap | undefined;
    const markers = new Map<string, LeafletMarker>();
    setMapReady(false);
    setMapError(false);
    setSelectedEventId(null);
    delete element.dataset.mapReady;

    void import("leaflet").then(({ default: L }) => {
      if (disposed) return;
      const boundsLocations = locations.length > 0 ? locations : eventMapLocations;
      const bounds = L.latLngBounds(boundsLocations.map(location => [location.latitude, location.longitude]));
      map = L.map(element, { scrollWheelZoom: false, keyboard: true, zoomControl: true });
      if (locations.length === 1) {
        map.setView([locations[0].latitude, locations[0].longitude], 13);
      } else {
        map.fitBounds(bounds, { padding: [28, 28], maxZoom: 12 });
      }
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }).addTo(map);

      const icon = L.divIcon({
        className: "event-map-marker",
        html: '<span aria-hidden="true"></span>',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -13],
      });

      for (const location of locations) {
        const content = document.createElement("div");
        content.className = "event-map-popup";
        const heading = document.createElement("strong");
        heading.textContent = location.venue;
        content.append(heading);
        for (const event of location.events) {
          const details = document.createElement("p");
          details.textContent = `${event.title} · ${event.displayDate}, ${formatEventTime(event)} IST · ${event.speaker}`;
          content.append(details);
        }
        const directions = document.createElement("a");
        directions.href = directionsUrl(location.latitude, location.longitude);
        directions.target = "_blank";
        directions.rel = "noopener noreferrer";
        directions.setAttribute("aria-label", "Get directions in OpenStreetMap (opens in a new tab)");
        directions.textContent = "Get directions";
        content.append(directions);
        const marker = L.marker([location.latitude, location.longitude], {
          title: location.venue,
          alt: `Upcoming event venue: ${location.venue}`,
          icon,
        }).addTo(map).bindPopup(content);
        markers.set(location.venue, marker);
      }

      mapRef.current = map;
      markerRefs.current = markers;
      element.dataset.mapReady = "true";
      const updateView = () => {
        const center = map?.getCenter();
        if (!center) return;
        element.dataset.center = `${center.lat.toFixed(5)},${center.lng.toFixed(5)}`;
        element.dataset.zoom = String(map?.getZoom());
      };
      map.on("moveend zoomend", updateView);
      updateView();
      setMapReady(true);
    }).catch(error => {
      if (disposed) return;
      console.error("The Bengaluru event map could not be initialized.", error);
      setMapError(true);
    });

    return () => {
      disposed = true;
      map?.remove();
      if (mapRef.current === map) mapRef.current = null;
      markerRefs.current = new Map();
    };
  }, [locations]);

  return <section className="section container event-map-section" aria-labelledby="event-map-title">
    <div className="section-heading"><div><span className="eyebrow">Find the venues</span><h2 id="event-map-title">Gather with us in Bengaluru.</h2><p>Explore upcoming confirmed event venues on an interactive map, then open a map or directions for your destination.</p></div></div>
    <div className="event-map-layout">
      <div className="event-map-frame">
        <div ref={mapElement} className="event-map-canvas" role="group" aria-label="Interactive OpenStreetMap of upcoming ITF event venues in Bengaluru" />
        {mapError && <p className="event-map-error" role="status">The interactive map could not be loaded. Use the event links below to open a location map or directions.</p>}
      </div>
      <div className="event-map-events" id="event-map-events">
        {visibleItems.map(event => {
          const location = locationsByVenue.get(event.venue);
          if (!location) throw new Error(`Missing verified map coordinates for event "${event.id}".`);
          return <article className={`event-map-event${selectedEventId === event.id ? " is-selected" : ""}`} key={event.id}>
            <button type="button" className="event-map-select" aria-label={`Show ${event.title} on map`} aria-pressed={selectedEventId === event.id} disabled={!mapReady} onClick={() => selectEvent(event.id, event.venue)}>
              <strong>{event.title}</strong>
              <time dateTime={event.date}>{event.displayDate} · {formatEventTime(event)} IST</time>
              <span>{event.speaker}</span>
              <span>{event.venue}</span>
            </button>
            <div className="event-map-links">
              <a href={locationMapUrl(location)} target="_blank" rel="noopener noreferrer">Open location map<span className="sr-only"> (opens in a new tab)</span></a>
              <a href={directionsUrl(location.latitude, location.longitude)} target="_blank" rel="noopener noreferrer">Get directions<span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </article>;
        })}
      </div>
      {upcoming.length === 0 && <p className="calendar-empty event-map-empty" role="status">No upcoming events have confirmed venues yet.</p>}
      {hasMore && <div className="load-more-control"><button className="button button--small" type="button" aria-controls="event-map-events" onClick={showMore}>Load more map events</button></div>}
    </div>
    <p className="event-map-attribution">Map data and tiles © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors<span className="sr-only"> (opens in a new tab)</span></a>, available under the Open Database License (ODbL).</p>
  </section>;
}
