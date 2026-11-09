import { ContactLayout } from "@/components/contact-layout";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Become a Member", "Express your interest in joining Indic Thought Forum. Connect with a community rooted in heritage and committed to meaningful action.", "/join/");

export default function Join() {
  return <ContactLayout membership />;
}
