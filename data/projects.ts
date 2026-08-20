import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "alrafah-111",
    title: "مشروع أبراج الرفاهية 111",
    location: "جدة - حي التيسير",
    status: "تحت الإنشاء",
    description: "شقق سكنية فاخرة تتميز بإطلالات ساحرة وتصاميم داخلية مبتكرة توفر أقصى درجات الراحة والخصوصية للعائلة.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    features: ["تكييف مركزي", "موقف خاص", "مراقبة 24/7", "شرفة واسعة"],
    area: "180م² - 240م²",
    rooms: "4 - 5 غرف"
  },
  {
    id: "alrafah-112",
    title: "مشروع أبراج الرفاهية 112",
    location: "جدة - حي الياقوت",
    status: "متاح",
    description: "مجمع سكني متكامل يضم فلل بتصاميم هندسية حديثة، ومسطحات خضراء واسعة تناسب الباحثين عن التميز والهدوء.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    features: ["مسبح خاص", "حديقة خلفية", "نظام ذكي كامل", "مجلس ضيافة مستقل"],
    area: "350م² - 450م²",
    rooms: "5 - 6 غرف"
  },
  {
    id: "alrafah-113",
    title: "مشروع أبراج الرفاهية 113",
    location: "جدة - حي الياقوت",
    status: "قريبًا",
    description: "برج سكني استثنائي على مقربة من الخدمات والمرافق، يمثل المعنى الحقيقي للمعيشة الفاخرة والخدمات المتكاملة.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    features: ["نادي صحي", "صالة ألعاب رياضية", "موقع استراتيجي", "مواقف ذكية"],
    area: "200م² - 320م²",
    rooms: "3 - 5 غرف"
  }
];
