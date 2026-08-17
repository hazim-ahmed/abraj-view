import React from "react";
import Image from "next/image";
import Container from "../../components/ui/Container";
import SectionTitle from "../../components/ui/SectionTitle";
import ProjectCard from "../../components/ui/ProjectCard";
import { projects } from "../../data/projects";
import { siteConfig } from "../../config/site";

export const metadata = {
  title: `مشاريعنا | ${siteConfig.name}`,
  description: "استعرض مجموعتنا المميزة من المشاريع السكنية الراقية والفلل الفاخرة بجدة.",
};

export default function ProjectsPage() {
  return (
    <div className="pb-20">
      {/* Sub Hero */}
      <section className="relative py-24 bg-navy text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/45 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury Architecture Projects"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <Container className="relative z-20">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">مشاريعنا</h1>
          <p className="text-lg text-zinc-300 max-w-xl mx-auto">
            مجموعة من المشاريع السكنية التي نعمل على تطويرها وفق معايير الجودة والتصميم الحديث.
          </p>
        </Container>
      </section>

      {/* Grid of Projects */}
      <section className="py-20 bg-white">
        <Container>
          <SectionTitle
            title="كل المشاريع"
            subtitle="مشاريعنا الحالية والمستقبلية"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
