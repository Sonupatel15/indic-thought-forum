import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { PageIntro, CommunityCTA, SectionHeading } from "@/components/sections";
import { EventList } from "@/components/event-list";
import { GalleryGrid } from "@/components/gallery-grid";
import { FeaturedPodcast, MorePodcasts, SocialChannels, SocialPosts } from "@/components/media-content";
import { pageMetadata } from "@/lib/metadata";
import { getIndiaDateKey } from "@/lib/schedule";
import { podcasts } from "@/lib/media";

export const metadata = pageMetadata("Updates", "Explore Indic Thought Forum events, community photographs, podcasts, posts, and official social channels in one place.", "/events/");

export default function Events() {
  return <>
    <PageIntro eyebrow="Updates" title="Different perspectives. Shared curiosity." description="Come for the ideas. Stay for the conversations. Explore our gatherings, community moments, podcasts, and shared perspectives." showOrnament={false} />
    <nav className="container section-navigation" aria-label="Explore updates"><Link href="#podcasts">Podcasts</Link><Link href="#events">Events</Link><Link href="#plan-conversation">Plan your next conversation</Link><Link href="#posts">Posts</Link><Link href="#gallery">Gallery</Link><Link href="#social-channels">Social channels</Link></nav>
    <section id="podcasts" className="section container" aria-label="Podcasts"><SectionHeading eyebrow="Stay with the conversation" title="Good conversations travel further." description="Long-form episodes from the official Indic Thought Forum YouTube channel, newest first. Load a player here, or watch directly on YouTube." /><FeaturedPodcast episode={podcasts[0]} showPreviewDetails={false} /><MorePodcasts episodes={podcasts.slice(1)} showPreviewDetails={false} /></section>
    <section id="events" className="section container" aria-label="Event archive"><SectionHeading eyebrow="From the ITF archive" title="Ideas worth revisiting." description="All confirmed events, newest first. Each date is labeled as upcoming or part of our archive." /><EventList asOfDate={getIndiaDateKey()} /></section>
    <section id="plan-conversation" className="container upcoming-note" aria-label="Plan your next conversation"><span className="icon-box"><CalendarDays size={26} aria-hidden="true" /></span><div><h2>Plan Your Next Conversation.</h2><p>Find confirmed dates, IST timings, and venues in our event schedule. New gatherings are added once confirmed.</p></div><Link href="/calendar/" className="text-link">View event calendar <ArrowRight size={17} aria-hidden="true" /></Link></section>
    <section id="posts" className="section soft-section" aria-label="Posts"><div className="container"><SectionHeading eyebrow="From the community" title="Posts" description="Five posts from the official ITF Instagram account. Open each original post on Instagram; dates and captions are not reproduced here." /><SocialPosts /></div></section>
    <section id="gallery" className="section soft-section" aria-label="Gallery"><div className="container"><SectionHeading eyebrow="Our gallery" title="The moments behind the movement." description="The people we meet. The perspectives we share. The connections we carry forward. A glimpse into life at ITF." /><GalleryGrid showFilters={false} /></div></section>
    <section id="social-channels" className="section container" aria-label="Official social channels"><SectionHeading eyebrow="Find us in your everyday" title="Your feed. A little more thought." description="Continue the conversation through channels linked from the official ITF YouTube profile." /><SocialChannels /></section>
    <CommunityCTA showOrnament={false} />
  </>;
}
