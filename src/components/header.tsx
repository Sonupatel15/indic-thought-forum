"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, site } from "@/lib/site";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" prefetch={false} className={`brand${footer ? " brand--footer" : ""}`}>
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
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        toggle.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !window.matchMedia("(max-width: 980px)").matches) return;

      const menu = navigationRef.current;
      const menuItems = menu ? Array.from(menu.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)')) : [];
      const focusableItems = [toggle.current, ...menuItems].filter((item): item is HTMLElement => item !== null);
      const activeIndex = focusableItems.indexOf(document.activeElement as HTMLElement);
      if (activeIndex === -1) {
        event.preventDefault();
        (event.shiftKey ? focusableItems.at(-1) : focusableItems[0])?.focus();
      } else if (event.shiftKey && activeIndex === 0) {
        event.preventDefault();
        focusableItems.at(-1)?.focus();
      } else if (!event.shiftKey && activeIndex === focusableItems.length - 1) {
        event.preventDefault();
        focusableItems[0]?.focus();
      }
    }

    const mobileQuery = window.matchMedia("(max-width: 980px)");
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (!event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    mobileQuery.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mobileQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button ref={toggle} type="button" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={25} aria-hidden="true" /> : <Menu size={25} aria-hidden="true" />}
        </button>
        <nav ref={navigationRef} id="primary-navigation" aria-label="Main navigation" className={`main-nav${open ? " is-open" : ""}`}>
          {navigation.map(({ href, label }) => (
            <Link key={href} href={href} prefetch={false} aria-current={activePath === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link className="button button--small" href="/support/" prefetch={false} onClick={() => setOpen(false)}>Support Us <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </nav>
      </div>
      <noscript><nav className="container no-script-nav" aria-label="Site navigation without JavaScript">
        {navigation.map(({ href, label }) => <a key={href} href={href} aria-current={activePath === href ? "page" : undefined}>{label}</a>)}
        <a href="/support/">Support Us</a>
      </nav></noscript>
    </header>
  );
}
