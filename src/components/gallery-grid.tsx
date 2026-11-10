"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gallery } from "@/lib/site";
import { MediaDialog } from "./media-dialog";

export function GalleryGrid({ preview = false, showFilters = true }: { preview?: boolean; showFilters?: boolean }) {
  const [filter, setFilter] = useState("All moments");
  const [selected, setSelected] = useState<number | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement>(null);
  const photos = preview ? gallery.slice(0, 4) : !showFilters || filter === "All moments" ? gallery : gallery.filter(photo => photo.category === filter);
  return <>
    {!preview && showFilters && <div className="filter-bar" aria-label="Filter gallery">{["All moments", "Community", "Conversations"].map(category => <button type="button" key={category} aria-pressed={category === filter} onClick={() => setFilter(category)}>{category}</button>)}<span>{photos.length} moments</span></div>}
    <div className={`gallery-grid${preview ? " gallery-grid--preview" : ""}`}>{photos.map((photo, index) => <button className="gallery-photo" type="button" key={photo.src} onClick={event => { returnFocusRef.current = event.currentTarget; setSelected(index); }} aria-label={`Enlarge: ${photo.title}`}><Image src={photo.src} alt={photo.alt} width={1000} height={700} sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 32vw" /><span><span>{photo.title}</span><ArrowUpRight size={22} aria-hidden="true" /></span></button>)}</div>
    <MediaDialog items={photos} selected={selected} onSelect={setSelected} returnFocusRef={returnFocusRef} />
  </>;
}
