import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./header";
import { site } from "@/lib/site";
import { SocialChannels } from "./media-content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-about">
          <Brand footer />
          <p>Rooted in our heritage.<br />United by purpose.<br />Moving from thought to action.</p>
          <span className="footer-location">A community for a conscious Bharat.</span>
          <SocialChannels compact />
        </div>
        <div className="footer-note"><h2>Begin with a thought.<br />Make it a movement.</h2><p>Bring your curiosity, your perspective, and your willingness to contribute.</p><Link className="text-link" href="/contact-us/" prefetch={false}>Find your place here <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <div><Link href="/privacy/" prefetch={false}>Privacy policy</Link><Link href="/accessibility/" prefetch={false}>Accessibility</Link><a href="#top">Back to top &uarr;</a></div>
      </div>
    </footer>
  );
}
