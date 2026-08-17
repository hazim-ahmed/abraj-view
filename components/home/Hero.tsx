import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Container from "../ui/Container";
import { siteConfig } from "../../config/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 md:pt-28 pb-20 md:pb-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold/10 text-gold mb-6">
              مشاريع عقارية استثنائية
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl leading-[1.15] mb-6">
              نبني اليوم... <br />
              <span className="text-gold">مسكن الغد</span>
            </h1>
            <p className="text-lg text-gray-text leading-relaxed mb-8 max-w-xl">
              في أبراج الرفاهية المتقدمة نطور مشاريع سكنية تجمع بين جودة التنفيذ والتصميم العصري واختيار المواقع بعناية.
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-bold rounded-lg bg-navy text-white hover:bg-gold transition-luxury shadow-lg hover:shadow-xl group"
              >
                <span>استعرض مشاريعنا</span>
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-bold rounded-lg border border-zinc-200 bg-white text-navy hover:bg-gray-bg transition-luxury"
              >
                <MessageSquare className="w-5 h-5 text-gold" />
                <span>تواصل معنا</span>
              </Link>
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[500px] lg:max-w-none">
              {/* Decorative background shapes */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gold/5 rounded-3xl -z-10 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-navy/5 rounded-3xl -z-10 blur-xl" />

              {/* Main Image Container */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Villa Architecture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>

              {/* Float Experience badge */}
              <div className="absolute -bottom-6 right-6 bg-white p-4 rounded-2xl shadow-xl border border-zinc-50 flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold font-bold text-lg">
                  10+
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-text">خبرة ممتدة في</span>
                  <span className="text-sm font-extrabold text-navy">التطوير العقاري</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
