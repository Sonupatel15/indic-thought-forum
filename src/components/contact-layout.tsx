import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { PageIntro } from "./sections";
import { SubmissionForm } from "./submission-form";
import { site } from "@/lib/site";

export function ContactLayout({ membership = false }: { membership?: boolean }) {
  return <>
    <PageIntro eyebrow={membership ? "Become a member" : "Get in touch"} title={membership ? "Your thought. Our shared journey." : "A conversation can be a beginning."} description={membership ? "Bring your curiosity, your experience, and your willingness to make a difference. There is a place for you in the conversation." : "Have a question, a perspective, or an idea? We would love to hear what is on your mind."} showOrnament={membership} />
    <section className="section container contact-layout"><aside className="contact-aside"><span className="eyebrow">{membership ? "Belong. Learn. Contribute." : "We are listening"}</span><h2>{membership ? "You don't need to be an expert. Just willing to begin." : "Let's find a way to build together."}</h2><p>{membership ? "Membership begins with an expression of interest. Tell us what matters to you and how you would like to take part." : "For membership, events, volunteering, or collaboration, start by sharing a little about yourself."}</p><div className="contact-benefit"><HeartHandshake size={22} aria-hidden="true" /><div><h3>A community of purpose</h3><p>Connect with people who care about learning and meaningful contribution.</p></div></div><div className="contact-benefit"><MessageSquare size={22} aria-hidden="true" /><div><h3>Room for your perspective</h3><p>Engage with ideas through open and respectful conversations.</p></div></div><div className="contact-benefit"><ShieldCheck size={22} aria-hidden="true" /><div><h3>Thoughtful about your privacy</h3><p>No mailing list enrollment or payment is part of this enquiry.</p></div></div>{site.contactEmail && <a className="email-link" href={`mailto:${site.contactEmail}`}><Mail size={18} aria-hidden="true" />{site.contactEmail}</a>}<Link className="text-link" href={membership ? "/sankalpas/" : "/join/"}>{membership ? "Explore ways to contribute" : "Looking to become a member?"}<ArrowUpRight size={17} aria-hidden="true" /></Link></aside><Suspense fallback={<div className="submission-form" role="status">Loading form...</div>}><SubmissionForm membership={membership} /></Suspense></section>
  </>;
}
