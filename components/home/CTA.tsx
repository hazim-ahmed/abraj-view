import React from "react";
import Link from "next/link";
import { MessageSquare, PhoneCall } from "lucide-react";
import Container from "../ui/Container";
import { siteConfig } from "../../config/site";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0A2540] via-[#0F2942] to-[#0A192F] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#00D2C8]/15 rounded-full blur-3xl -z-10" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl -z-10" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">
            هل تبحث عن مسكنك القادم؟
          </h2>
          <p className="text-lg text-zinc-300 mb-10 max-w-xl mx-auto leading-relaxed">
            تواصل معنا اليوم للتعرف على أحدث مشاريعنا السكنية المتاحة وتفاصيل الحجز والأسعار. فريقنا يسعد بخدمتكم.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-[#00D2C8] text-[#0A2540] hover:bg-[#5EEAD4] transition-luxury shadow-lg hover:shadow-xl"
            >
              <PhoneCall className="w-5 h-5" />
              <span>طلب اتصال</span>
            </Link>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] transition-luxury shadow-lg"
            >
              <MessageSquare className="w-5 h-5" />
              <span>تواصل عبر واتساب</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
