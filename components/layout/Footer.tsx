import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Container from "../ui/Container";
import { siteConfig } from "../../config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t border-zinc-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <span className="h-10 w-10 flex items-center justify-center rounded-lg bg-gold text-navy font-bold text-xl transition-luxury">
                أ
              </span>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white tracking-tight leading-tight">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] text-gold-light font-medium">
                  تطوير عقاري راقٍ
                </span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:justify-self-center">
            <h3 className="text-lg font-bold text-gold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-[2px] after:bg-gold">
              روابط سريعة
            </h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-[#C7A35A] transition-colors duration-200">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C7A35A] transition-colors duration-200">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#C7A35A] transition-colors duration-200">
                  مشاريعنا
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C7A35A] transition-colors duration-200">
                  تواصل معنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-8 after:h-[2px] after:bg-gold">
              معلومات الاتصال
            </h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>{siteConfig.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span dir="ltr">{siteConfig.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span>{siteConfig.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} {siteConfig.name}. جميع الحقوق محفوظة.</p>
          <p className="text-[10px]">نصنع مساحات تليق بتطلعاتك</p>
        </div>
      </Container>
    </footer>
  );
}
