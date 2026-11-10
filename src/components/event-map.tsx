"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import { events, eventMapLocations } from "@/lib/site";
import { formatEventTime } from "@/lib/schedule";

const locations = eventMapLocations.map(location => ({
  ...location,
  events: events.filter(event => event.venue === location.venue),
}));
const mappedEventIds = new Set(locations.flatMap(location => location.events.map(event => event.id)));
const unmappedEvents = events.filter(event => !mappedEventIds.has(event.id));
if (unmappedEvents.length > 0) {
  throw new Error(`Missing verified map coordinates for events: ${unmappedEvents.map(event => event.id).join(", ")}.`);
}

function directionsUrl(latitude: number, longitude: number): string {
  const query = new URLSearchParams({ to: `${latitude},${longitude}` });
  return `https://www.openstreetmap.org/directions?${query}`;
}

export function EventMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const element = mapElement.current;
    if (!element) return;
    let disposed = false;
    let map: LeafletMap | undefined;

    void import("leaflet").then(({ default: L }) => {
      if (disposed) return;
      const bounds = L.latLngBounds(locations.map(location => [location.latitude, location.longitude]));
      map = L.map(element, { scrollWheelZoom: false, keyboard: true, zoomControl: true });
      map.fitBounds(bounds, { padding: [28, 28], maxZoom: 12 });
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
          details.textContent = `${event.title} · ${event.displayDate}, ${formatEventTime(event)} IST`;
          content.append(details);
        }
        const directions = document.createElement("a");
        directions.href = directionsUrl(location.latitude, location.longitude);
        directions.target = "_blank";
        directions.rel = "noopener noreferrer";
        directions.setAttribute("aria-label", "Get directions in OpenStreetMap (opens in a new tab)");
        directions.textContent = "Get directions";
        content.append(directions);
        L.marker([location.latitude, location.longitude], {
          title: location.venue,
          alt: `Event venue: ${location.venue}`,
          icon,
        }).addTo(map).bindPopup(content);
      }

      element.dataset.mapReady = "true";
      map.on("zoomend", () => { element.dataset.zoom = String(map?.getZoom()); });
      element.dataset.zoom = String(map.getZoom());
    }).catch(error => {
      if (disposed) return;
      console.error("The Bengaluru event map could not be initialized.", error);
      setMapError(true);
    });

    return () => {
      disposed = true;
      map?.remove();
    };
  }, []);

  return <section className="section container event-map-section" aria-labelledby="event-map-title">
    <div className="section-heading"><div><span className="eyebrow">Find the venues</span><h2 id="event-map-title">Gather with us in Bengaluru.</h2><p>Explore our confirmed event venues on an interactive map, then open directions for your destination.</p></div></div>
    <div className="event-map-layout">
      <div className="event-map-frame">
        <div ref={mapElement} className="event-map-canvas" role="group" aria-label="Interactive OpenStreetMap of ITF event venues in Bengaluru" />
        {mapError && <p className="event-map-error" role="status">The interactive map could not be loaded. Use the venue links below to open a location map or directions.</p>}
      </div>
      <div className="event-map-locations">
        {locations.map(location => <article className="event-map-location" key={location.id}>
          <h3>{location.venue}</h3>
          <ul>{location.events.map(event => <li key={event.id}><strong>{event.title}</strong><span>{event.displayDate} · {formatEventTime(event)} IST</span><span>{event.speaker}</span></li>)}</ul>
          <div className="event-map-links">
            <a href={`https://www.openstreetmap.org/way/${location.osmWayId}#map=17/${location.latitude}/${location.longitude}`} target="_blank" rel="noopener noreferrer">Open location map<span className="sr-only"> (opens in a new tab)</span></a>
            <a href={directionsUrl(location.latitude, location.longitude)} target="_blank" rel="noopener noreferrer">Get directions<span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </article>)}
      </div>
    </div>
    <p className="event-map-attribution">Map data and tiles © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors<span className="sr-only"> (opens in a new tab)</span></a>, available under the Open Database License (ODbL).</p>
  </section>;
}
