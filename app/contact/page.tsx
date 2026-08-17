"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import { siteConfig } from "../../config/site";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("project") || "";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: projectParam ? `استفسار عن ${projectParam}` : "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API response
    setIsSubmitted(true);
    // Reset form after submission if needed
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Contact Information Panel */}
      <div className="lg:col-span-5 bg-navy text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between">
        {/* Decorative circle */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl" />

        <div className="relative">
          <h3 className="text-2xl font-bold text-gold mb-4">معلومات التواصل</h3>
          <p className="text-zinc-300 text-sm mb-10 leading-relaxed">
            يسعدنا تواصلكم معنا والإجابة على كافة استفساراتكم حول مشاريعنا السكنية.
          </p>

          <ul className="space-y-8">
            <li className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 text-gold shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block mb-1">رقم الهاتف / الجوال</span>
                <a href={`tel:${siteConfig.phone}`} className="text-base font-bold hover:text-gold transition-colors" dir="ltr">
                  {siteConfig.phone}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 text-gold shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block mb-1">البريد الإلكتروني</span>
                <a href={`mailto:${siteConfig.email}`} className="text-base font-bold hover:text-gold transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 text-gold shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-zinc-400 block mb-1">العنوان</span>
                <span className="text-base font-bold">
                  {siteConfig.location}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 relative">
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20ba5a] transition-colors"
          >
            <span>راسلنا مباشرة عبر واتساب</span>
          </a>
        </div>
      </div>

      {/* Contact Form Panel */}
      <div className="lg:col-span-7 bg-gray-bg p-8 sm:p-10 rounded-3xl">
        {isSubmitted ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6 animate-pulse" />
            <h4 className="text-2xl font-bold text-navy mb-3">تم استلام طلبك بنجاح!</h4>
            <p className="text-base text-gray-text max-w-sm">
              شكرًا لتواصلك معنا. سنتواصل معك قريبًا عبر الهاتف أو البريد الإلكتروني لتزويدك بالتفاصيل.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-8 px-6 py-2.5 rounded-lg bg-navy text-white hover:bg-gold transition-luxury text-sm font-semibold"
            >
              إرسال رسالة أخرى
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-bold text-navy mb-2">أرسل لنا استفسارك</h3>
            <p className="text-sm text-gray-text mb-6">
              يرجى تعبئة الحقول أدناه، وسيتواصل معك مستشارنا العقاري في أسرع وقت.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-[#182536] mb-2">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E7E2] bg-white text-[#182536] placeholder-[#667085]/60 transition-all duration-200 focus:outline-none focus:border-[#C7A35A] focus:ring-4 focus:ring-[#C7A35A]/10 text-sm"
                  placeholder="أدخل اسمك هنا"
                  style={{ minHeight: "44px" }}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-[#182536] mb-2">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E7E2] bg-white text-[#182536] placeholder-[#667085]/60 transition-all duration-200 focus:outline-none focus:border-[#C7A35A] focus:ring-4 focus:ring-[#C7A35A]/10 text-sm"
                  placeholder="05xxxxxxx"
                  style={{ minHeight: "44px" }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-[#182536] mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E7E2] bg-white text-[#182536] placeholder-[#667085]/60 transition-all duration-200 focus:outline-none focus:border-[#C7A35A] focus:ring-4 focus:ring-[#C7A35A]/10 text-sm"
                placeholder="example@mail.com"
                style={{ minHeight: "44px" }}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-bold text-[#182536] mb-2">
                الموضوع
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E7E2] bg-white text-[#182536] placeholder-[#667085]/60 transition-all duration-200 focus:outline-none focus:border-[#C7A35A] focus:ring-4 focus:ring-[#C7A35A]/10 text-sm"
                placeholder="مثال: استفسار حول مشروع الرفاهية"
                style={{ minHeight: "44px" }}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold text-[#182536] mb-2">
                الرسالة
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E7E2] bg-white text-[#182536] placeholder-[#667085]/60 transition-all duration-200 focus:outline-none focus:border-[#C7A35A] focus:ring-4 focus:ring-[#C7A35A]/10 text-sm resize-none"
                placeholder="اكتب استفسارك بالتفصيل هنا..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#182536] text-white hover:bg-[#C7A35A] hover:text-[#182536] font-bold transition-all duration-300 text-sm shadow-md hover:shadow-lg disabled:opacity-50"
              style={{ minHeight: "48px" }}
            >
              <Send className="w-4 h-4 shrink-0" />
              <span>إرسال الطلب</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="pb-20">
      {/* Sub Hero */}
      <section className="relative mt-24 pt-16 pb-20 md:pt-20 md:pb-24 bg-navy text-white text-center">
        <Container className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">تواصل معنا</h1>
          <p className="text-lg text-zinc-300 max-w-xl mx-auto">
            يسعدنا الإجابة على استفساراتكم وتوفير كافة التفاصيل التي تبحثون عنها.
          </p>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            title="يسعدنا خدمتك دائمًا"
            subtitle="قنوات تواصل مرنة"
          />

          <Suspense fallback={<div className="text-center py-20">جاري تحميل النموذج...</div>}>
            <ContactFormContent />
          </Suspense>
        </Container>
      </section>
    </div>
  );
}
