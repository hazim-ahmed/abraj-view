export interface Project {
  id: string;
  title: string;
  location: string;
  status: "تحت الإنشاء" | "متاح" | "قريبًا" | string;
  description: string;
  image: string;
  features?: string[];
  area?: string;
  rooms?: string;
}
