import React from "react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { siteConfig } from "../../config/site";

export default function Values() {
  return (
    <section className="py-20 bg-gray-bg">
      <Container>
        <SectionTitle
          title="قيمنا الراسخة"
          subtitle="مبادئنا"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.values.map((value, idx) => (
            <div
              key={value.title}
              className="p-8 rounded-2xl bg-white border border-slate-100 hover:border-[#00D2C8]/50 transition-luxury text-right flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl font-extrabold text-[#00D2C8]/30 mb-6 block">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-text leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
