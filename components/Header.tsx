"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/buy", label: "BUY CAFÉ JIMÉNEZ" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/contact", label: "CONTACT US" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeBtnRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function closeMenu() {
    setIsOpen(false);
    toggleBtnRef.current?.focus();
  }

  const navbar = (
    <header className="navbar">
      <div className="nav-capsule">
        <Link href="/" className="logo">
          CAFE JIMÉNEZ
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          ref={toggleBtnRef}
          className="mobile-nav-toggle"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(true)}
        >
          <i className="fa-solid fa-bars" />
        </button>
      </div>
    </header>
  );

  return (
    <>
      {pathname === "/" ? (
        <div className="navbar-home-overlay">{navbar}</div>
      ) : (
        <div className="subpage-nav-container">{navbar}</div>
      )}

      <div
        className={`mobile-nav-overlay ${isOpen ? "open" : ""}`}
        aria-hidden="true"
        onClick={closeMenu}
      />
      <div
        id="mobile-nav"
        className={`mobile-nav-drawer ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
      >
        <button
          ref={closeBtnRef}
          className="mobile-nav-drawer-close"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <nav className="nav-links-mobile" aria-label="Mobile navigation links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
