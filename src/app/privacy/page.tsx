import Link from "next/link";
import { PageIntro } from "@/components/sections";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy Policy", "How the Indic Thought Forum public website handles your information, enquiries, and privacy choices.", "/privacy/");

export default function Privacy() {
  return <><PageIntro eyebrow="Privacy policy" title="Your trust matters." description="A clear explanation of how this public website handles information." /><article className="section container legal-copy">
    <p className="legal-date">Last updated: 31 October 2026</p>
    <h2>What this website collects</h2><p>Browsing this website does not require an account. When online enquiries are enabled and you choose to submit a form, the information requested includes your name, email address, optional or required phone number as shown, area of interest, message, and your consent to be contacted.</p>
    <h2>Current form availability</h2><p>{site.formsEndpoint ? "Online enquiries are enabled. Your form is sent over HTTPS to our configured enquiry service only when you submit it." : "Online enquiries are not connected in this deployment. The forms do not send or save the information you enter."} The site does not store form drafts in your browser.</p>
    <h2>How information is used</h2><p>Enquiry information is intended only for responding to your request and discussing your expressed interest. Submitting an enquiry does not subscribe you to a marketing mailing list. Do not send sensitive identity, medical, financial, or payment information through these forms.</p>
    <h2>Hosting and service providers</h2><p>The hosting provider may process standard technical request information such as IP addresses and browser details in server logs. If forms are enabled, the configured enquiry service also processes submitted information. Before launch, the operator must confirm its providers, access controls, retention periods, and applicable privacy obligations.</p>
    <h2>Cookies and analytics</h2><p>The website does not load its own analytics or advertising scripts. Fonts, podcast previews, and other website images are served locally. External platforms may use their own cookies, storage, and tracking when you choose to connect to them.</p>
    <h2>YouTube podcasts and social content</h2><p>Podcast previews do not contact YouTube or Google until you choose Load YouTube player. That action enables an embedded player on youtube-nocookie.com, and YouTube/Google may then process technical information such as your IP address, referrer, and playback activity, and use cookies or browser storage. Privacy-enhanced embedding does not make playback anonymous or guarantee that no data is processed.</p><p>Closing the player removes it from this page but does not erase information already processed by the provider. The choice is not remembered across page reloads. You can instead follow Watch on YouTube. Social posts and profile links open on their original platform, where that platform&apos;s privacy policy and login requirements apply. The displayed posts are curated, not an automatically loaded social feed.</p>
    <h2>Donations and external links</h2><p>When available, donations are completed on an external hosted payment page, under that provider&apos;s privacy policy and terms. This website does not collect card or bank details.</p>
    <h2>Your choices</h2><p>You may ask the team about access, correction, or deletion of information you have submitted, subject to applicable legal requirements. {site.contactEmail ? <>Contact <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.</> : <>Use the <Link href="/contact-us/">contact page</Link> when online messaging becomes available.</>}</p>
    <h2>Policy updates</h2><p>This notice must be reviewed by the website operator when services are connected or data practices change. Material changes will be reflected on this page.</p>
  </article></>;
}
