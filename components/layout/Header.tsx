"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import Container from "../ui/Container";
import { siteConfig } from "../../config/site";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about" },
    { label: "مشاريعنا", href: "/projects" },
    { label: "تواصل معنا", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-luxury ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="h-10 w-10 flex items-center justify-center rounded-lg bg-navy text-gold font-bold text-xl group-hover:bg-gold group-hover:text-navy transition-luxury">
              أ
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-navy tracking-tight leading-tight">
                {siteConfig.name}
              </span>
              <span className="text-[10px] text-gold font-medium">
                تطوير عقاري راقٍ
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative py-2 ${
                  isActive(link.href)
                    ? "text-gold"
                    : "text-navy hover:text-gold"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy text-white hover:bg-gold transition-luxury text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>احجز استشارتك</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-navy hover:bg-zinc-50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-zinc-100 bg-white ${
          isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <Container className="py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-bold py-2 border-b border-zinc-50 transition-colors ${
                isActive(link.href) ? "text-gold" : "text-navy hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-navy text-white hover:bg-gold transition-colors text-base font-bold mt-2"
          >
            <Phone className="w-5 h-5" />
            <span>تواصل معنا</span>
          </Link>
        </Container>
      </div>
    </header>
  );
}
