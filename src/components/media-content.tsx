import Image from "next/image";
import { ArrowUpRight, Camera, MessagesSquare, Play, Radio } from "lucide-react";
import { podcasts, socialPosts, socialProfiles } from "@/lib/media";
import { YouTubePlayer } from "./youtube-player";

export function FeaturedPodcast() {
  const episode = podcasts[0];
  return <article className="featured-podcast">
    <YouTubePlayer episode={episode} />
    <div className="podcast-editorial"><span className="eyebrow">Featured conversation</span><h3>{episode.title}</h3><p className="podcast-guest">With {episode.guest}</p><p>{episode.description}</p><div className="podcast-topics"><span>{episode.topic}</span><span>Long-form podcast</span></div><p className="media-editor-note">A little more time. A little more context.<br />Conversations worth staying with.</p></div>
  </article>;
}

export function MorePodcasts() {
  return <div className="podcast-grid">{podcasts.slice(1).map(episode => <article className="podcast-card" key={episode.id}><YouTubePlayer episode={episode} /><div className="podcast-card-copy"><span className="eyebrow">{episode.topic}</span><h3>{episode.title}</h3><p className="podcast-guest">{episode.guest}</p><p>{episode.description}</p></div></article>)}</div>;
}

export function SocialPosts() {
  return <div className="social-post-grid">{socialPosts.map(post => <article className="social-post" key={post.id}>
    <div className={`social-post-visual${post.image ? "" : " social-post-visual--text"}`}>
      {post.image ? <Image src={post.image} alt="Original Queen Tara event poster" fill sizes="(max-width: 760px) 90vw, 45vw" /> : <><MessagesSquare size={45} strokeWidth={1} aria-hidden="true" /><span>Ideas shared.<br />Conversations continued.</span><small>Indic Thought Forum</small></>}
    </div>
    <div className="social-post-copy"><span className="eyebrow">{post.type}</span><h3>{post.title}</h3><p>{post.description}</p><a className="text-link" href={post.url} target="_blank" rel="noopener noreferrer">Read original YouTube post <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div>
  </article>)}</div>;
}

export function SocialChannels({ compact = false }: { compact?: boolean }) {
  const icons = { YouTube: Play, Instagram: Camera, Facebook: MessagesSquare };
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
