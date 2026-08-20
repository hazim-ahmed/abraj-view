"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [lastMethod, setLastMethod] = useState<"email" | "whatsapp">("email");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const constructWhatsAppText = () => {
    return `*استفسار من موقع أبراج الرفاهية المتقدمة*\n\n👤 *الاسم:* ${formData.name}\n📱 *رقم الجوال:* ${formData.phone}\n✉️ *البريد:* ${formData.email || "غير محدد"}\n🏷️ *الموضوع:* ${formData.subject || "استفسار عام"}\n\n📝 *الرسالة:*\n${formData.message}`;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setErrorMessage("يرجى تعبئة جميع الحقول المطلوبة (الاسم، الجوال، والرسالة)");
      return;
    }
    setErrorMessage(null);

    setLastMethod("whatsapp");
    const text = constructWhatsAppText();
    const cleanPhone = siteConfig.phone.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    
    window.open(whatsappUrl, "_blank");
    setIsSubmitted(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      setErrorMessage("يرجى تعبئة جميع الحقول المطلوبة (الاسم، الجوال، البريد، والرسالة)");
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    setLastMethod("email");

    try {
      const web3FormData = new FormData();
      web3FormData.append("access_key", siteConfig.web3formsKey);
      web3FormData.append("to_email", siteConfig.email);
      web3FormData.append("name", formData.name);
      web3FormData.append("phone", formData.phone);
      web3FormData.append("email", formData.email);
      web3FormData.append("replyto", formData.email);
      web3FormData.append("subject", formData.subject || `استفسار جديد من ${formData.name}`);
      web3FormData.append("message", `الاسم: ${formData.name}\nرقم الجوال: ${formData.phone}\nالبريد الإلكتروني: ${formData.email}\nالموضوع: ${formData.subject}\n\nنص الرسالة:\n${formData.message}`);
      web3FormData.append("from_name", "أبراج الرفاهية المتقدمة");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData,
      });

      // Save to Excel CSV & Google Sheets API
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch((err) => console.error("Error saving to Excel API:", err));

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || "حدث خطأ أثناء إرسال الرسالة، يرجى التأكد من المفتاح والمعلومات");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setErrorMessage("تعذر الاتصال بالخادم، يرجى التأكد من الاتصال بالإنترنت والمحاولة مجددًا");
    } finally {
      setIsLoading(false);
    }
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
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="text-base font-bold hover:text-gold transition-colors" dir="ltr">
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
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20ba5a] transition-colors shadow-md"
          >
            <MessageSquare className="w-5 h-5 shrink-0" />
            <span>راسلنا مباشرة عبر واتساب</span>
          </a>
        </div>
      </div>

      {/* Contact Form Panel */}
      <div className="lg:col-span-7 bg-gray-bg p-8 sm:p-10 rounded-3xl">
        {isSubmitted ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6 animate-pulse" />
            <h4 className="text-2xl font-bold text-navy mb-3">تم الإرسال بنجاح!</h4>
            <p className="text-base text-gray-text max-w-sm mb-6">
              {lastMethod === "whatsapp"
                ? "تم فتح تطبيق الواتساب لتأكيد إرسال رسالتك مباشرة."
                : `تم إرسال استفسارك مباشرة إلى بريدنا الإلكتروني (${siteConfig.email}). وسيقوم فريقنا بالتواصل معك في أقرب وقت.`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
                }}
                className="px-6 py-3 rounded-xl bg-navy text-white hover:bg-gold transition-luxury text-sm font-semibold"
              >
                إرسال استفسار آخر
              </button>

              <a
                href={`https://wa.me/${siteConfig.phone.replace(/\D/g, "")}?text=${encodeURIComponent(constructWhatsAppText())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20ba5a] transition-colors text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>متابعة عبر الواتساب</span>
              </a>
            </div>
          </div>
        ) : (
          <form className="space-y-6">
            <h3 className="text-2xl font-bold text-navy mb-2">أرسل لنا استفسارك</h3>
            <p className="text-sm text-gray-text mb-6">
              سيتم إرسال الرسالة مباشرة وبشكل تلقائي دون الحاجة لفتح برامج خارجية.
            </p>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-[#182536] mb-2">
                  الاسم الكامل <span className="text-red-500">*</span>
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
                  رقم الجوال <span className="text-red-500">*</span>
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
                البريد الإلكتروني <span className="text-red-500">*</span>
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
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E7E2] bg-white text-[#182536] placeholder-[#667085]/60 transition-all duration-200 focus:outline-none focus:border-[#C7A35A] focus:ring-4 focus:ring-[#C7A35A]/10 text-sm"
                placeholder="مثال: استفسار حول مشروع أبراج الرفاهية 111"
                style={{ minHeight: "44px" }}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold text-[#182536] mb-2">
                الرسالة <span className="text-red-500">*</span>
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

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={handleEmailSubmit}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#182536] text-white hover:bg-[#C7A35A] hover:text-[#182536] font-bold transition-all duration-300 text-sm shadow-md hover:shadow-lg disabled:opacity-50"
                style={{ minHeight: "48px" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري الإرسال المباشر...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 shrink-0" />
                    <span>إرسال مباشر إلى الإيميل</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] font-bold transition-all duration-300 text-sm shadow-md hover:shadow-lg"
                style={{ minHeight: "48px" }}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>إرسال عبر الواتساب</span>
              </button>
            </div>
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
