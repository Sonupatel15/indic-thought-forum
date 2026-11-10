"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/lib/site";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" prefetch={false} className={`brand${footer ? " brand--footer" : ""}`} aria-label={`${site.name} home`}>
      <Image src="/images/itf-assets/itf-logo-footer.webp" width={56} height={56} alt="" priority={!footer} />
      <span><strong>{site.name}</strong><small>{site.tagline}</small></span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/?$/, "/");
  const activePath = currentPath === "/philosophy/" ? "/about/" : ["/gallery/", "/media/"].includes(currentPath) ? "/events/" : currentPath;
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      toggle.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button ref={toggle} type="button" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={25} aria-hidden="true" /> : <Menu size={25} aria-hidden="true" />}
        </button>
        <nav id="primary-navigation" aria-label="Main navigation" className={`main-nav${open ? " is-open" : ""}`}>
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href} prefetch={false} aria-current={activePath === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link className="button button--small" href="/support/" prefetch={false} onClick={() => setOpen(false)}>Support Us <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </nav>
      </div>
    </header>
  );
}
