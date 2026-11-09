"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface MediaItem { src: string; title: string; alt: string }

export function MediaDialog({ items, selected, onSelect, returnFocusRef }: {
  items: MediaItem[]; selected: number | null; onSelect: (index: number | null) => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const item = selected === null ? undefined : items[selected];

  useEffect(() => {
    const element = dialog.current;
    if (item && element && !element.open) element.showModal();
    if (!item && element?.open) element.close();
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [item]);

  function move(direction: number) {
    if (selected !== null) onSelect((selected + direction + items.length) % items.length);
  }

  return <dialog ref={dialog} className="media-dialog" aria-label={item?.title ?? "Image viewer"} onClose={() => {
    onSelect(null);
    returnFocusRef.current?.focus({ preventScroll: true });
  }} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }} onKeyDown={e => {
    if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
  }}>
    {item && <div className="dialog-content">
      <button type="button" className="dialog-close icon-button" aria-label="Close image viewer" onClick={() => dialog.current?.close()} autoFocus><X aria-hidden="true" /></button>
      <div className="dialog-image"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 95vw, 80vw" /></div>
      <div className="dialog-caption"><div><p>{item.title}</p><small>{(selected ?? 0) + 1} of {items.length}</small></div><div className="dialog-controls"><button type="button" className="icon-button" aria-label="Previous image" onClick={() => move(-1)}><ChevronLeft aria-hidden="true" /></button><button type="button" className="icon-button" aria-label="Next image" onClick={() => move(1)}><ChevronRight aria-hidden="true" /></button></div></div>
    </div>}
  </dialog>;
}
