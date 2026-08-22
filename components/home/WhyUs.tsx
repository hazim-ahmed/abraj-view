import React from "react";
import { Shield, Palette, MapPin, UserCheck } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import { siteConfig } from "../../config/site";

export default function WhyUs() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="w-8 h-8 text-gold" />;
      case "Palette":
        return <Palette className="w-8 h-8 text-gold" />;
      case "MapPin":
        return <MapPin className="w-8 h-8 text-gold" />;
      case "UserCheck":
        return <UserCheck className="w-8 h-8 text-gold" />;
      default:
        return <Shield className="w-8 h-8 text-gold" />;
    }
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle
          title="لماذا أبراج الرفاهية المتقدمة؟"
          subtitle="مميزاتنا"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.whyUs.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl border border-slate-100 bg-white hover:border-[#00D2C8] hover:shadow-xl transition-luxury flex flex-col items-center text-center group"
            >
              <div className="mb-6 p-4 rounded-xl bg-gray-bg group-hover:bg-[#00D2C8]/10 transition-colors">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-[#00D2C8] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-text leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
