import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./header";
import { site } from "@/lib/site";
import { SocialChannels } from "./media-content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-about">
            <Brand footer />
            <p>A community for a conscious Bharat.</p>
            <nav className="footer-social" aria-label="Follow ITF">
              <SocialChannels compact />
            </nav>
          </div>
          <ul className="footer-values">
            <li>Rooted in our heritage.</li>
            <li>United by purpose.</li>
            <li>Moving from thought to action.</li>
          </ul>
          <div className="footer-note">
            <h2>Begin with a thought.<br />Make it a movement.</h2>
            <p>Bring your curiosity, your perspective, and your willingness to contribute.</p>
            <Link className="footer-cta" href="/contact-us/" prefetch={false}>Find your place here <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <nav aria-label="Footer">
            <ul>
              <li><Link href="/privacy/" prefetch={false}>Privacy policy</Link></li>
              <li><Link href="/accessibility/" prefetch={false}>Accessibility</Link></li>
              <li><a href="#top">Back to top &uarr;</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
