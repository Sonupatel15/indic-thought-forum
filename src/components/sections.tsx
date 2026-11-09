import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { principles, steps } from "@/lib/site";
import { Icon } from "./icon";

export function SectionHeading({ eyebrow, title, description, href, linkLabel }: {
  eyebrow: string; title: string; description?: string; href?: string; linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>
      {href && <Link className="text-link" href={href}>{linkLabel ?? "Discover more"} <ArrowUpRight size={18} aria-hidden="true" /></Link>}
    </div>
  );
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-intro"><div className="container"><div className="breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>{eyebrow}</span></div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p><div className="intro-ornament" aria-hidden="true">✦</div></div></section>;
}

export function Principles() {
  return <div className="principle-grid">{principles.map(p => <article className="principle-card" key={p.title}><div className="card-top"><span className="icon-box"><Icon name={p.icon} size={29} /></span><span className="card-number">{p.number}</span></div><h3>{p.title}<span><Icon name="down" size={18} /> {p.outcome}</span></h3><p>{p.description}</p></article>)}</div>;
}

export function Journey() {
  return <ol className="journey">{steps.map((step, index) => <li key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>;
}

export function CommunityCTA() {
  return <section className="container cta-wrap"><div className="community-cta"><div className="cta-decoration" aria-hidden="true">✦</div><div><span className="eyebrow">Every contribution begins with you</span><h2>From a shared thought.<br />To a meaningful tomorrow.</h2><p>Join a community committed to Bharateeya values and purposeful action.</p></div><Link className="button button--light" href="/join/">Become a Member <ArrowRight size={19} aria-hidden="true" /></Link></div></section>;
}
