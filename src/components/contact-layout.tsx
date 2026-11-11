import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { PageIntro } from "./sections";
import { SubmissionForm } from "./submission-form";
import { site } from "@/lib/site";

export function ContactLayout() {
  return <>
    <PageIntro eyebrow="Get in touch" title="A conversation can be a beginning." description="Have a question, a perspective, or an idea? We would love to hear what is on your mind." />
    <section className="section container contact-layout"><aside className="contact-aside"><span className="eyebrow">We are listening</span><h2>Let&apos;s find a way to build together.</h2><p>For membership, events, volunteering, or collaboration, start by sharing a little about yourself.</p><div className="contact-benefit"><HeartHandshake size={22} aria-hidden="true" /><div><h3>A community of purpose</h3><p>Connect with people who care about learning and meaningful contribution.</p></div></div><div className="contact-benefit"><MessageSquare size={22} aria-hidden="true" /><div><h3>Room for your perspective</h3><p>Engage with ideas through open and respectful conversations.</p></div></div><div className="contact-benefit"><ShieldCheck size={22} aria-hidden="true" /><div><h3>Thoughtful about your privacy</h3><p>No mailing list enrollment or payment is part of this enquiry.</p></div></div>{site.contactEmail && <a className="email-link" href={`mailto:${site.contactEmail}`}><Mail size={18} aria-hidden="true" />{site.contactEmail}</a>}<Link className="text-link" href="/contact-us/#contact-form">Looking to become a member? <ArrowUpRight size={17} aria-hidden="true" /></Link></aside><div className="contact-forms"><SubmissionForm kind="join" /><SubmissionForm kind="contribute" /></div></section>
  </>;
}
