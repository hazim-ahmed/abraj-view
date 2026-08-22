"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 md:bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#0A2540] to-[#0F2942] text-[#00D2C8] border border-[#00D2C8]/30 shadow-lg transition-all duration-300 hover:bg-[#00D2C8] hover:text-[#0A2540] focus:outline-none focus:ring-4 focus:ring-[#00D2C8]/30 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-75 pointer-events-none"
      }`}
      aria-label="العودة لأعلى الصفحة"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
