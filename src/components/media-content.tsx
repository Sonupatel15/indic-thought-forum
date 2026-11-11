"use client";

import { ArrowUpRight, AtSign, Camera, MessageCircle, Play, Radio, UsersRound } from "lucide-react";
import { homeFeaturedPodcast, podcasts, socialProfiles, type PodcastEpisode } from "@/lib/media";
import { useIncrementalList } from "@/lib/use-incremental-list";
import { YouTubePlayer } from "./youtube-player";

export function FeaturedPodcast({ episode = homeFeaturedPodcast, showPreviewDetails = true }: { episode?: PodcastEpisode; showPreviewDetails?: boolean }) {
  return <article className="featured-podcast">
    <YouTubePlayer episode={episode} showPreviewDetails={showPreviewDetails} />
    <div className="podcast-editorial"><span className="eyebrow">Featured conversation</span><h3>{episode.title}</h3>{episode.guest && <p className="podcast-guest">With {episode.guest}</p>}{episode.description && <p>{episode.description}</p>}<div className="podcast-topics"><span>{episode.topic}</span><span>Long-form podcast</span></div><p className="media-editor-note">A little more time. A little more context.<br />Conversations worth staying with.</p></div>
  </article>;
}

export function MorePodcasts({ episodes = podcasts.slice(1), showPreviewDetails = true }: { episodes?: readonly PodcastEpisode[]; showPreviewDetails?: boolean }) {
  const { gridRef, visibleItems, hasMore, showMore } = useIncrementalList(episodes, 2, 3, true);
  return <>
    <div ref={gridRef} className="podcast-grid" id="podcast-archive">{visibleItems.map(episode => <article className="podcast-card" key={episode.id}><YouTubePlayer episode={episode} showPreviewDetails={showPreviewDetails} /><div className="podcast-card-copy"><span className="eyebrow">{episode.topic}</span><h3>{episode.title}</h3>{episode.guest && <p className="podcast-guest">{episode.guest}</p>}{episode.description && <p>{episode.description}</p>}</div></article>)}</div>
    {hasMore && <div className="load-more-control"><button className="button button--small" type="button" aria-controls="podcast-archive" onClick={event => showMore(event.currentTarget)}>Load more podcasts</button></div>}
  </>;
}

export function SocialPosts() {
  const profile = socialProfiles.find(item => item.platform === "Instagram");
  if (!profile) throw new Error("An Instagram profile is required for the social post link.");
  return <div className="instagram-profile-link">
    <div><Camera size={28} aria-hidden="true" /><div><h3>Follow ITF on Instagram</h3><p>{profile.description}</p></div></div>
    <a className="button button--small" href={profile.url} target="_blank" rel="noopener noreferrer">Visit Instagram <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
  </div>;
}

export function SocialChannels({ compact = false }: { compact?: boolean }) {
  const icons = { YouTube: Play, Instagram: Camera, Facebook: UsersRound, "X (Twitter)": AtSign, WhatsApp: MessageCircle };
  if (compact) {
    return <ul className="social-channel-links">{socialProfiles.map(profile => {
      const Icon = icons[profile.platform];
      return <li key={profile.platform}>
        <a className="social-channel-link" href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={profile.platform} title={profile.platform}>
          <Icon size={18} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>;
    })}</ul>;
  }
  return <div className="social-channel-grid">{socialProfiles.map(profile => {
    const Icon = icons[profile.platform];
    return <a className="social-channel-card" key={profile.platform} href={profile.url} target="_blank" rel="noopener noreferrer">
      <span className="icon-box"><Icon size={17} aria-hidden="true" /></span>
      <div><span className="eyebrow">{profile.label}</span><h3>{profile.platform}</h3><span className="social-handle">{profile.handle}</span><p>{profile.description}</p></div>
      <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
    </a>;
  })}</div>;
}

export function MediaPrivacyNote() {
  return <p className="media-privacy-note"><Radio size={17} aria-hidden="true" /><span>A curated selection, not an automatic live feed. Videos connect only after you load a player; social posts open on their original platform. Availability and login requirements are controlled by those platforms.</span></p>;
}
