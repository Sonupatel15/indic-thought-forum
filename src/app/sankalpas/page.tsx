import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CommunityCTA, Journey, PageIntro, SectionHeading } from "@/components/sections";
import { Icon } from "@/components/icon";
import { sankalpas } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { sankalpaRecords } from "@/lib/sankalpas";
import { SankalpaTable } from "@/components/sankalpa-table";

export const metadata = pageMetadata("Sankalpas", "Explore ITF's talk-led Sankalpas, speakers, status, owners, and latest notes, alongside pathways for personal contribution.", "/sankalpas/");

export default function Sankalpas() {
  return <>
    <PageIntro eyebrow="Our Sankalpas" title="Choose a purpose. Make it a practice." description="A Sankalpa is more than an intention. It is a conscious commitment to turn what you care about into something you do." />
    <section className="section container" aria-label="Sankalpa tracker"><SectionHeading eyebrow="From conversation to commitment" title="Sankalpas from our conversations." description="Talk details, commitments, status, and owners from the supplied tracker. Notes are empty for now. Future notes will show the latest update first, with previous notes in an expandable history." /><SankalpaTable entries={sankalpaRecords} /></section>
    <section className="section container sankalpa-pathways"><SectionHeading eyebrow="Where will you begin?" title="Find the contribution that feels like you." description="These are pathways for personal contribution, not a list of scheduled programs. Let them inspire a commitment you can sustain." /><div className="sankalpa-grid">{sankalpas.map(s => <article className="sankalpa-card" id={s.id} key={s.id}><span className="icon-box"><Icon name={s.icon} size={29} /></span><span className="eyebrow">{s.category}</span><h2>{s.title}</h2><p>{s.description}</p><div className="sankalpa-action"><strong>A small way to begin</strong><p>{s.action}</p></div><Link className="text-link" href={`/contact-us/?area=${s.id}`}>I&apos;d like to contribute <ArrowUpRight size={17} aria-hidden="true" /></Link></article>)}</div></section>
    <section className="section soft-section" id="how-it-works"><div className="container"><SectionHeading eyebrow="Make intention a habit" title="Your Sankalpa, one step at a time." /><Journey /></div></section>
    <CommunityCTA showOrnament={false} />
  </>;
}
