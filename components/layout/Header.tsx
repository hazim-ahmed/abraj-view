"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  UserRound, 
  LayoutGrid, 
  MessagesSquare,
  Phone
} from "lucide-react";
import Container from "../ui/Container";
import { siteConfig } from "../../config/site";

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const ticking = useRef(false);

  // Trigger entrance animations after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth scroll detection with requestAnimationFrame (60fps)
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentProgress = Math.min(window.scrollY / 60, 1);
          setScrollProgress(currentProgress);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "الرئيسية", href: "/", icon: Home },
    { label: "من نحن", href: "/about", icon: UserRound },
    { label: "مشاريعنا", href: "/projects", icon: LayoutGrid },
    { label: "تواصل معنا", href: "/contact", icon: MessagesSquare },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Interpolated Styles based on Scroll Progress (Desktop)
  const isScrolled = scrollProgress > 0.5;
  const headerTop = 28 - scrollProgress * 14;
  const containerMaxWidth = isScrolled ? "max-w-6xl" : "max-w-7xl";

  // Mobile Top Logo scroll animation (scrollY > 100px)
  const isMobileScrolled = scrollProgress === 1; // 60px thresholds

  return (
    <>
      {/* ──────────────────────────────────────────────────────── */}
      {/* DESKTOP HEADER (MORPHING & FLOATING)                     */}
      {/* ──────────────────────────────────────────────────────── */}
      <header
        className="hidden md:block fixed inset-x-0 z-[100] pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] @media(prefers-reduced-motion:reduce){transition:none}"
        style={{
          top: `${headerTop}px`,
        }}
      >
        <div
          className={`mx-auto w-full px-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${containerMaxWidth}`}
        >
          <div className="relative flex items-center justify-between pointer-events-auto">
            
            {/* Background Line */}
            <div
              className="absolute top-1/2 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#182536]/15 to-transparent -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
              style={{
                opacity: 1 - scrollProgress,
                transform: `translateY(-50%) scaleX(${1 - scrollProgress * 0.25})`,
              }}
            />

            {/* LOGO WRAPPER */}
            <div
              className="transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateY(${-scrollProgress * 2}px) scale(${1 - scrollProgress * 0.02})`,
              }}
            >
              <div
                className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full px-4 py-2"
                style={{
                  backgroundColor: `rgba(255, 255, 255, ${scrollProgress * 0.6})`,
                  backdropFilter: isScrolled ? "blur(20px)" : "none",
                  border: isScrolled ? "1px solid rgba(24, 37, 84, 0.05)" : "1px solid transparent",
                  boxShadow: isScrolled ? "0 14px 40px -20px rgba(24,37,54,0.35)" : "none",
                }}
              >
                <Link href="/" className="flex items-center gap-3 group">
                  <span 
                    className="flex items-center justify-center rounded-xl bg-[#C7A35A] text-[#182536] font-black text-xl transition-all duration-300 group-hover:bg-[#DFC889] group-hover:scale-105"
                    style={{
                      height: `${46 - scrollProgress * 4}px`,
                      width: `${46 - scrollProgress * 4}px`,
                    }}
                  >
                    أ
                  </span>
                  <div className="flex flex-col text-right">
                    <span className="text-base font-black text-[#182536] tracking-tight leading-tight transition-colors duration-300 group-hover:text-[#C7A35A]">
                      {siteConfig.name}
                    </span>
                    <span className="text-[9px] text-[#C7A35A] font-medium tracking-wide">
                      تطوير عقاري راقٍ
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* NAVIGATION PILL */}
            <nav
              className="transform-gpu will-change-transform flex items-center gap-6 px-7 py-2.5 rounded-full border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateY(${-scrollProgress * 4}px) scale(${1 - scrollProgress * 0.03})`,
                backgroundColor: isScrolled ? "rgba(247, 247, 244, 0.8)" : "rgba(24, 37, 54, 0.015)",
                borderColor: isScrolled ? "rgba(24, 37, 54, 0.08)" : "rgba(24, 37, 54, 0.04)",
                backdropFilter: isScrolled ? "blur(24px)" : "blur(4px)",
                boxShadow: isScrolled ? "0 16px 45px -18px rgba(24, 37, 54, 0.28)" : "none",
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-bold transition-all duration-300 relative py-1 px-1 flex flex-col items-center gap-1.5 ${
                    isActive(link.href)
                      ? "text-[#C7A35A]"
                      : "text-[#182536]/80 hover:text-[#C7A35A] hover:-translate-y-[1px]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#C7A35A] transition-all duration-300"
                    style={{
                      opacity: isActive(link.href) ? 1 : 0,
                      transform: isActive(link.href) ? "scale(1)" : "scale(0.5)",
                      boxShadow: isActive(link.href) ? "0 2px 12px rgba(199,163,90,0.9)" : "none",
                    }}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA BUTTON */}
            <div
              className="transform-gpu will-change-transform transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateY(${-scrollProgress * 2}px) scale(${1 - scrollProgress * 0.02})`,
              }}
            >
              <div className="hover:scale-[1.03] active:scale-95 transition-transform duration-200">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#182536] text-white hover:bg-[#C7A35A] hover:text-[#182536] transition-all duration-300 text-xs font-bold"
                  style={{
                    boxShadow: isScrolled ? "0 14px 35px -15px rgba(24, 37, 54, 0.35)" : "none",
                  }}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>تواصل معنا</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────── */}
      {/* MOBILE TOP FLOATING LOGO                                 */}
      {/* ──────────────────────────────────────────────────────── */}
      <div 
        className="fixed top-0 left-0 right-0 z-[100] md:hidden pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: isMobileScrolled ? "translateY(-6px) scale(0.94)" : "translateY(0) scale(1)",
          opacity: isMobileScrolled ? 0.85 : 1,
        }}
      >
        <div className="pt-5 sm:pt-6 flex justify-center pointer-events-auto">
          <div 
            className="relative flex items-center justify-center px-6 py-2 rounded-xl bg-[#182536]/90 backdrop-blur-md shadow-lg border border-[#C7A35A]/30 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scaleX(1) translateY(0)" : "scaleX(0.75) translateY(-8px)"
            }}
          >
            {/* Top Right Golden Corner */}
            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[2.5px] border-r-[2.5px] border-[#C7A35A] rounded-tr-xl pointer-events-none" />

            {/* Bottom Left Golden Corner */}
            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[2.5px] border-l-[2.5px] border-[#C7A35A] rounded-bl-xl pointer-events-none" />

            {/* Logo Text Content */}
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C7A35A] text-[#182536] font-black text-base shadow-sm">
                أ
              </span>
              <span className="text-sm font-black text-white tracking-tight">
                {siteConfig.name}
              </span>
            </Link>

            {/* Little golden expanding line at bottom */}
            <div 
              className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 h-[2px] bg-[#C7A35A] rounded-full transition-all duration-1000 ease-out"
              style={{
                width: mounted ? "40px" : "0px",
              }}
            />
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────── */}
      {/* MOBILE BOTTOM NAVIGATION                                 */}
      {/* ──────────────────────────────────────────────────────── */}
      <nav
        className="md:hidden fixed inset-x-0 mx-auto z-[100] w-[94%] max-w-md pointer-events-auto"
        style={{
          bottom: "calc(0.75rem + env(safe-area-inset-bottom))",
          opacity: mounted ? 1 : 0,
          transform: mounted
            ? "translateY(0) scale(1)"
            : "translateY(30px) scale(0.96)",
          transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Luxury Gold & Navy Glass Bar */}
        <div
          className="flex items-center gap-1.5 px-2 py-2 rounded-2xl border border-[#C7A35A]/30 backdrop-blur-2xl"
          style={{
            background: "linear-gradient(135deg, #182536 0%, #0E1724 100%)",
            boxShadow: "0 16px 40px -14px rgba(14, 23, 36, 0.75), 0 0 20px -5px rgba(199, 163, 90, 0.2)",
            minHeight: "62px",
          }}
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const IconComponent = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl select-none ${
                  active ? "text-[#C7A35A]" : "text-zinc-300 hover:text-white active:scale-95"
                }`}
                style={
                  active
                    ? {
                        flex: "1.5",
                        minHeight: "44px",
                        background: "rgba(199, 163, 90, 0.15)",
                        boxShadow: "0 4px 20px -4px rgba(199, 163, 90, 0.35), inset 0 1px 1px rgba(255,255,255,0.2)",
                        border: "1px solid rgba(199, 163, 90, 0.4)",
                        borderRadius: "0.75rem",
                        transition: "flex 500ms cubic-bezier(0.22,1,0.36,1)",
                      }
                    : {
                        flex: "1",
                        minHeight: "44px",
                        transition: "flex 500ms cubic-bezier(0.22,1,0.36,1), color 200ms",
                      }
                }
              >
                <IconComponent
                  className="shrink-0"
                  style={{
                    width: "20px",
                    height: "20px",
                    strokeWidth: active ? 2.5 : 2,
                    color: active ? "#C7A35A" : "currentColor",
                    transition: "stroke-width 300ms, color 300ms",
                  }}
                />
                {/* Label — animates in/out via max-width */}
                <span
                  style={{
                    fontSize: "12px",
                    maxWidth: active ? "90px" : "0px",
                    opacity: active ? 1 : 0,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    fontWeight: "800",
                    color: "#C7A35A",
                    transition: "max-width 500ms cubic-bezier(0.22,1,0.36,1), opacity 350ms ease",
                  }}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

