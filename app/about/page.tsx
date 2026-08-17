import React from "react";
import Image from "next/image";
import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import { siteConfig } from "../../config/site";
import WhyUs from "../../components/home/WhyUs";
import Values from "../../components/home/Values";

export const metadata = {
  title: `من نحن | ${siteConfig.name}`,
  description: siteConfig.aboutShort,
};

export default function AboutPage() {
  return (
    <div className="pb-10">
      {/* Sub Hero */}
      <section className="relative mt-24 pt-16 pb-20 md:pt-20 md:pb-24 bg-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
          alt="Company Background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <Container className="relative z-20">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">من نحن</h1>
          <p className="text-lg text-zinc-300 max-w-xl mx-auto">
            ريادة في التطوير العقاري، وشغف في تقديم أرقى الحلول السكنية.
          </p>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text details */}
            <div className="lg:col-span-7 text-right">
              <SectionTitle
                title={siteConfig.name}
                subtitle="قصتنا ورؤيتنا"
                align="right"
              />
              <p className="text-base text-gray-text leading-relaxed mb-6">
                {siteConfig.aboutFull}
              </p>
              <p className="text-base text-gray-text leading-relaxed">
                في كل مشروع نقوم بتطويره، نركز على تحقيق التوازن المثالي بين جمال البناء وحداثة التصميم وتوفير بيئة متكاملة تضمن سبل الراحة والخصوصية لعملائنا. نسعى جاهدين لنكون الخيار الأول والاسم الموثوق في عالم التطوير العقاري بالمملكة.
              </p>
            </div>

            {/* Illustration/Image side */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Luxury Villa Exterior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission Row */}
      <section className="py-12 bg-gray-bg border-y border-zinc-100">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white shadow-sm text-right">
              <h3 className="text-2xl font-bold text-navy mb-4 border-r-4 border-gold pr-3">رؤيتنا</h3>
              <p className="text-base text-gray-text leading-relaxed">
                {siteConfig.vision}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-sm text-right">
              <h3 className="text-2xl font-bold text-navy mb-4 border-r-4 border-gold pr-3">رسالتنا</h3>
              <p className="text-base text-gray-text leading-relaxed">
                {siteConfig.mission}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <Values />

      {/* Why Us */}
      <WhyUs />
    </div>
  );
}
