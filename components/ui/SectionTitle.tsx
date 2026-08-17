import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "center" | "right";
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionTitleProps) {
  return (
    <div
      className={`mb-12 max-w-2xl ${
        align === "center" ? "mx-auto text-center" : "text-right"
      }`}
    >
      {subtitle && (
        <span className="text-sm font-semibold tracking-wider uppercase text-gold mb-2 block">
          {subtitle}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      <div
        className={`h-[3px] w-16 bg-gold rounded-full ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
