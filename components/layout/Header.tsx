"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu as MenuIcon, X as XIcon, Phone } from "lucide-react";
import Container from "../ui/Container";
import { siteConfig } from "../../config/site";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle header background style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          scrolled
            ? "bg-[#182536]/95 backdrop-blur-md shadow-md border-b border-[#22364C] py-3"
            : "bg-[#182536]/80 backdrop-blur-sm border-b border-transparent py-5"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
              <span className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#C7A35A] text-[#182536] font-black text-xl transition-all duration-300 group-hover:bg-[#DFC889] group-hover:scale-105">
                أ
              </span>
              <div className="flex flex-col text-right">
                <span className="text-lg font-black text-white tracking-tight leading-tight transition-colors duration-300 group-hover:text-[#DFC889]">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] text-[#DFC889] font-medium tracking-wide">
                  تطوير عقاري راقٍ
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold transition-all duration-300 relative py-2 px-1 flex flex-col items-center gap-1 ${
                    isActive(link.href)
                      ? "text-[#C7A35A]"
                      : "text-white/80 hover:text-[#C7A35A] hover:-translate-y-[1px]"
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Indicator */}
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-[#C7A35A] transition-all duration-300 ${
                      isActive(link.href) ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C7A35A] text-[#182536] hover:bg-[#DFC889] hover:text-[#182536] transition-all duration-300 text-sm font-bold shadow-sm hover:shadow-md hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4" />
                <span>تواصل معنا</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C7A35A]/50"
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay & Panel */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay backdrop */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-24 left-4 right-4 bg-[#182536] border border-[#22364C] p-6 rounded-2xl shadow-2xl flex flex-col gap-6 transition-all duration-300 origin-top ${
            isOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-4 scale-95 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-bold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-between ${
                  isActive(link.href)
                    ? "bg-[#C7A35A]/10 text-[#C7A35A] border border-[#C7A35A]/20"
                    : "text-white/90 hover:bg-white/5 hover:text-white"
                }`}
                style={{ minHeight: "48px" }}
              >
                <span>{link.label}</span>
                {isActive(link.href) && (
                  <span className="w-2 h-2 rounded-full bg-[#C7A35A]" />
                )}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#22364C] pt-6">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#C7A35A] text-[#182536] hover:bg-[#DFC889] transition-all duration-200 text-base font-bold shadow-md"
              style={{ minHeight: "48px" }}
            >
              <Phone className="w-5 h-5" />
              <span>تواصل معنا</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

