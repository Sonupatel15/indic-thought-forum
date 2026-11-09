import { ContactLayout } from "@/components/contact-layout";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact Us", "Get in touch with Indic Thought Forum about events, membership, volunteering, or collaboration.", "/contact-us/");

export default function Contact() {
  return <ContactLayout />;
}
