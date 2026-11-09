import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <section className="container not-found"><span className="eyebrow">404 / A different path</span><h1>This page hasn&apos;t<br />found its place yet.</h1><p>The page may have moved, or the link may be incorrect.<br />There is still plenty to discover.</p><Link className="button" href="/"><ArrowLeft size={18} aria-hidden="true" /> Back to the beginning</Link><Link className="text-link" href="/sankalpas/">Explore our Sankalpas</Link></section>;
}
