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
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-xl bg-[#182536] text-[#C7A35A] border border-[#22364C] shadow-lg transition-all duration-300 hover:bg-[#C7A35A] hover:text-[#182536] focus:outline-none focus:ring-4 focus:ring-[#C7A35A]/30 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-75 pointer-events-none"
      }`}
      aria-label="العودة لأعلى الصفحة"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
