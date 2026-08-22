import React from "react";
import { Eye, Target } from "lucide-react";
import Container from "../ui/Container";
import { siteConfig } from "../../config/site";

export default function VisionMission() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-[#00D2C8]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-[#0A2540]/10 rounded-full blur-3xl -z-10" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision Card */}
          <div className="p-8 rounded-3xl bg-gray-bg border border-slate-100 flex gap-6 items-start text-right hover:border-[#00D2C8]/30 transition-all">
            <div className="p-4 rounded-2xl bg-[#00D2C8]/15 text-[#00D2C8] shrink-0">
              <Eye className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-navy mb-4">رؤيتنا</h3>
              <p className="text-base text-gray-text leading-relaxed">
                {siteConfig.vision}
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-8 rounded-3xl bg-gray-bg border border-slate-100 flex gap-6 items-start text-right hover:border-[#0A2540]/30 transition-all">
            <div className="p-4 rounded-2xl bg-[#0A2540]/15 text-[#0A2540] shrink-0">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-navy mb-4">رسالتنا</h3>
              <p className="text-base text-gray-text leading-relaxed">
                {siteConfig.mission}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
