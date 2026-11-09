"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Play, ShieldCheck, X } from "lucide-react";
import { getYouTubeEmbedUrl, type PodcastEpisode } from "@/lib/media";

export function YouTubePlayer({ episode }: { episode: PodcastEpisode }) {
  const [enabled, setEnabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const loadButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const embedUrl = getYouTubeEmbedUrl(episode.videoId);

  useEffect(() => {
    if (enabled) frame.current?.focus();
    else if (restoreFocus.current) {
      loadButton.current?.focus({ preventScroll: true });
      restoreFocus.current = false;
    }
  }, [enabled]);

  return <div className="youtube-player">
    <div className="youtube-frame">
      {enabled ? <iframe ref={frame} src={embedUrl} title={`YouTube video: ${episode.title}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onError={() => setFailed(true)} /> : <button ref={loadButton} type="button" className="youtube-load" aria-label={`Load YouTube player: ${episode.title}`} onClick={() => setEnabled(true)}>
        <Image src={episode.thumbnail} alt="" fill sizes="(max-width: 760px) 90vw, 55vw" />
        <span className="youtube-shade" />
        <span className="youtube-label">ITF / Conversations</span>
        <span className="youtube-play"><Play size={29} fill="currentColor" aria-hidden="true" /></span>
        <span className="youtube-load-label">Load YouTube player</span>
      </button>}
    </div>
    <div className="youtube-controls">
      {enabled ? <button className="text-link" type="button" onClick={() => { restoreFocus.current = true; setEnabled(false); setFailed(false); }}><X size={15} aria-hidden="true" /> Close player</button> : <span><ShieldCheck size={15} aria-hidden="true" /> Privacy-first preview</span>}
      <a href={`https://www.youtube.com/watch?v=${episode.videoId}`} target="_blank" rel="noopener noreferrer">Watch on YouTube <ExternalLink size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
    </div>
    <p className="youtube-disclosure">{failed ? "The external player could not load. Use Watch on YouTube instead." : enabled ? "YouTube is now connected. If playback is unavailable here, use Watch on YouTube." : "Choosing Load connects to YouTube/Google, which may process your IP address and use cookies or storage. No player connects before you choose."}</p>
  </div>;
}
