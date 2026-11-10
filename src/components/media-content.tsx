"use client";

import { ArrowUpRight, Camera, MessageCircle, MessagesSquare, Play, Radio, X } from "lucide-react";
import { useState } from "react";
import { homeFeaturedPodcast, podcasts, socialPosts, socialProfiles, type PodcastEpisode } from "@/lib/media";
import { YouTubePlayer } from "./youtube-player";

export function FeaturedPodcast({ episode = homeFeaturedPodcast, showPreviewDetails = true }: { episode?: PodcastEpisode; showPreviewDetails?: boolean }) {
  return <article className="featured-podcast">
    <YouTubePlayer episode={episode} showPreviewDetails={showPreviewDetails} />
    <div className="podcast-editorial"><span className="eyebrow">Featured conversation</span><h3>{episode.title}</h3>{episode.guest && <p className="podcast-guest">With {episode.guest}</p>}{episode.description && <p>{episode.description}</p>}<div className="podcast-topics"><span>{episode.topic}</span><span>Long-form podcast</span></div><p className="media-editor-note">A little more time. A little more context.<br />Conversations worth staying with.</p></div>
  </article>;
}

export function MorePodcasts({ episodes = podcasts.slice(1), showPreviewDetails = true }: { episodes?: readonly PodcastEpisode[]; showPreviewDetails?: boolean }) {
  const [visibleCount, setVisibleCount] = useState(2);
  const visible = episodes.slice(0, visibleCount);
  return <>
    <div className="podcast-grid" id="podcast-archive">{visible.map(episode => <article className="podcast-card" key={episode.id}><YouTubePlayer episode={episode} showPreviewDetails={showPreviewDetails} /><div className="podcast-card-copy"><span className="eyebrow">{episode.topic}</span><h3>{episode.title}</h3>{episode.guest && <p className="podcast-guest">{episode.guest}</p>}{episode.description && <p>{episode.description}</p>}</div></article>)}</div>
    {visible.length < episodes.length && <div className="load-more-control"><button className="button button--small" type="button" aria-controls="podcast-archive" onClick={() => setVisibleCount(count => Math.min(count + 3, episodes.length))}>Load more podcasts</button></div>}
  </>;
}

export function SocialPosts() {
  const [visibleCount, setVisibleCount] = useState(3);
  const visible = socialPosts.slice(0, visibleCount);
  return <>
    <div className="social-post-grid" id="instagram-posts">{visible.map(post => <article className="social-post" key={post.id}>
      <div className="social-post-visual social-post-visual--text"><Camera size={45} strokeWidth={1} aria-hidden="true" /><span>Instagram</span><small>Indic Thought Forum</small></div>
      <div className="social-post-copy"><span className="eyebrow">Instagram</span><h3>{post.title}</h3><p>View the original post from Indic Thought Forum on Instagram.</p><a className="text-link" href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${post.title} on Instagram (opens in a new tab)`}>View on Instagram <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div>
    </article>)}</div>
    {visible.length < socialPosts.length && <div className="load-more-control"><button className="button button--small" type="button" aria-controls="instagram-posts" onClick={() => setVisibleCount(count => Math.min(count + 3, socialPosts.length))}>Load more posts</button></div>}
  </>;
}

export function SocialChannels({ compact = false }: { compact?: boolean }) {
  const icons = { YouTube: Play, Instagram: Camera, Facebook: MessagesSquare, "X (Twitter)": X, WhatsApp: MessageCircle };
  return <div className={compact ? "social-channel-links" : "social-channel-grid"}>{socialProfiles.map(profile => {
    const Icon = icons[profile.platform];
    return <a className={compact ? "social-channel-link" : "social-channel-card"} key={profile.platform} href={profile.url} target="_blank" rel="noopener noreferrer">
      <span className="icon-box"><Icon size={compact ? 17 : 25} aria-hidden="true" /></span>
      {compact ? <span>{profile.platform}</span> : <div><span className="eyebrow">{profile.label}</span><h3>{profile.platform}</h3><span className="social-handle">{profile.handle}</span><p>{profile.description}</p></div>}
      <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
    </a>;
  })}</div>;
}

export function MediaPrivacyNote() {
  return <p className="media-privacy-note"><Radio size={17} aria-hidden="true" /><span>A curated selection, not an automatic live feed. Videos connect only after you load a player; social posts open on their original platform. Availability and login requirements are controlled by those platforms.</span></p>;
}
