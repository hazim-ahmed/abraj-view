import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { siteConfig } from "../../config/site";

export default function AboutPreview() {
  return (
    <section className="py-20 bg-gray-bg">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Image side */}
          <div className="lg:col-span-5 relative order-last lg:order-first">
            <div className="relative aspect-[4/5] max-w-[400px] mx-auto rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                alt="Luxury real estate interior design"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            {/* Design detail */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#00D2C8] rounded-br-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#0A2540] rounded-tl-3xl -z-10" />
          </div>

          {/* Text side */}
          <div className="lg:col-span-7 text-right">
            <SectionTitle
              title={siteConfig.name}
              subtitle="عن الشركة"
              align="right"
            />
            <p className="text-base text-gray-text leading-relaxed mb-6">
              {siteConfig.aboutShort}
            </p>
            <p className="text-base text-gray-text leading-relaxed mb-8">
              نعمل بشغف لتقديم مستويات معيشية تفوق التوقعات، من خلال دراسة احتياجات السوق بدقة وتوفير مساحات سكنية ذكية تعزز من جودة الحياة اليومية للعائلة السعودية.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-xl bg-gradient-to-r from-[#0A2540] to-[#00D2C8] text-white hover:opacity-95 transition-all shadow-md group"
            >
              <span>تعرف علينا أكثر</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
