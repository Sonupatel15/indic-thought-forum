import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, MoveUpRight } from "lucide-react";
import { SectionHeading, Principles, Journey, CommunityCTA } from "@/components/sections";
import { EventList } from "@/components/event-list";
import { GalleryGrid } from "@/components/gallery-grid";
import { Icon } from "@/components/icon";
import { sankalpas } from "@/lib/site";
import { getIndiaDateKey } from "@/lib/schedule";
import { FeaturedPodcast, SocialChannels } from "@/components/media-content";

export default function Home() {
  return <>
    <section className="hero">
      <picture><source media="(max-width: 760px)" srcSet="/images/heritage-hero-mobile.webp" /><Image className="hero-image" src="/images/heritage-hero.webp" alt="An artistic panorama of India's temples, mountains, and cultural heritage at sunset" fill sizes="100vw" loading="eager" fetchPriority="high" /></picture>
      <div className="hero-shade" />
      <div className="container hero-content">
        <span className="hero-eyebrow"><span /> Rooted in heritage. Driven by purpose.</span>
        <h1>Awakening Bharat.<br /><span>Inspiring the future.</span></h1>
        <p>A timeless civilization. A new generation of thinkers.<br className="desktop-break" /> One shared commitment to turn thought into action.</p>
        <div className="hero-actions"><Link href="/sankalpas/" className="button">Explore our Sankalpas <ArrowUpRight size={19} aria-hidden="true" /></Link><Link href="/join/" className="button button--outline">Join the Movement <ArrowRight size={18} aria-hidden="true" /></Link></div>
        <div className="hero-signature"><span className="signature-line" />Bharateeya Sabhyata Sankalpa</div>
      </div>
      <div className="hero-bottom container"><span>For those who want to build, not just debate.</span><a href="#our-purpose" aria-label="Discover our purpose">Discover ITF <ArrowDown size={16} aria-hidden="true" /></a></div>
    </section>

    <section className="section container about-home" id="our-purpose">
      <div className="about-visual"><Image src="/images/gathering-1.webp" alt="Members of the Indic Thought Forum coming together for a community gathering" width={1000} height={750} sizes="(max-width: 800px) 90vw, 45vw" /><div className="about-image-note"><Icon name="flame" size={30} /><span>Our roots.<br /><strong>Our responsibility.</strong></span></div><div className="image-corner" aria-hidden="true" /></div>
      <div className="about-copy"><span className="eyebrow">01 / Our purpose</span><h2>A deeper connection.<br />A greater purpose.</h2><p className="lead">Our heritage is not just something we inherit. It is something we live.</p><p>Indic Thought Forum is a platform dedicated to promoting Bharateeya Sabhyata and its timeless values. We reconnect individuals with India&apos;s rich cultural and intellectual heritage through awareness, education, and community initiatives.</p><p>By bridging tradition and modern life, we make cultural knowledge accessible, relevant, and meaningful for today.</p><Link className="text-link" href="/about/">Discover the thought behind ITF <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
    </section>

    <section className="philosophy-section section"><div className="container"><SectionHeading eyebrow="02 / The way we think" title="Good thoughts. Meaningful action." description="Guided by values. Driven by purpose. Committed to impact." href="/about/#philosophy" linkLabel="Our philosophy" /><Principles /><div className="philosophy-footnote"><span className="tiny-dot" /> Because an idea finds its purpose only when it becomes action.</div></div></section>

    <section className="section container" aria-label="Sankalpas and calendar"><SectionHeading eyebrow="03 / Find your way" title="A purpose to choose. A date to connect." description="Two ways to take the next step: make a personal commitment or join the conversation." /><div className="pathway-grid">
      <article className="pathway-card"><span className="icon-box"><Icon name="flame" size={29} /></span><span className="eyebrow">From intention to action</span><h3>Sankalpas</h3><p>Choose a meaningful commitment that reflects your interests, your skills, and the change you want to contribute to.</p><ul>{sankalpas.slice(0, 3).map(item => <li key={item.id}>{item.category}</li>)}</ul><Link className="text-link" href="/sankalpas/">Explore all Sankalpas <ArrowUpRight size={18} aria-hidden="true" /></Link></article>
      <article className="pathway-card pathway-card--calendar"><span className="icon-box"><CalendarDays size={29} aria-hidden="true" /></span><span className="eyebrow">From curiosity to conversation</span><h3>Event calendar</h3><p>Explore our date-ordered schedule with confirmed dates, India Standard Time timings, venues, and original event posters.</p><ul><li>Upcoming gatherings</li><li>Past conversations</li><li>Details to plan your visit</li></ul><Link className="text-link" href="/calendar/">View event calendar <ArrowUpRight size={18} aria-hidden="true" /></Link></article>
    </div></section>

    <section className="section soft-section"><div className="container"><SectionHeading eyebrow="04 / Gather. Listen. Grow." title="Conversations that stay with you." description="A meeting of minds. A sharing of perspectives. A step towards clarity." href="/events/" linkLabel="Explore all events" /><EventList compact asOfDate={getIndiaDateKey()} /></div></section>

    <section className="section container"><SectionHeading eyebrow="05 / Your journey with ITF" title="Small commitments. Lasting change." description="You do not need to have all the answers. Just the willingness to begin." /><Journey /><div className="center-action"><Link className="text-link" href="/sankalpas/">Find your Sankalpa <ArrowRight size={18} aria-hidden="true" /></Link></div></section>

    <section className="container lakshya"><div><span className="eyebrow">Our shared Lakshya</span><h2>A vision we build.<br /><span>Together.</span></h2><p>Not milestones claimed. A purpose to work towards.</p></div><div className="goal"><strong>500<span>+</span></strong><span>Members to bring together</span></div><div className="goal"><strong>200<span>+</span></strong><span>Events to inspire dialogue</span></div><div className="goal"><strong>100<span>+</span></strong><span>Sankalpas to turn into action</span></div></section>

    <section className="section container" aria-label="Podcasts and social media"><SectionHeading eyebrow="06 / Watch. Listen. Connect." title="The conversation continues." description="Explore our podcasts, discover community posts, and find ITF on your favourite platform." href="/events/#podcasts" linkLabel="Explore our media" /><FeaturedPodcast /><SocialChannels compact /></section>
    <section className="section soft-section"><div className="container"><SectionHeading eyebrow="07 / Moments of connection" title="A forum. A community. A family." description="Glimpses of the people and moments that bring our purpose to life." href="/events/#gallery" linkLabel="View our gallery" /><GalleryGrid preview /></div></section>
    <CommunityCTA />
    <section className="container support-strip"><span className="icon-box"><Icon name="hands" size={27} /></span><div><h2>Help a meaningful idea go further.</h2><p>Your time, your skills, or your support can make a difference.</p></div><Link href="/support/" className="text-link">Support the cause <MoveUpRight size={18} aria-hidden="true" /></Link></section>
  </>;
}
