import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../data/projects";

export default function ProjectsPreview() {
  // Show only 3 projects for the home page preview
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-20 bg-gray-bg">
      <Container>
        <SectionTitle
          title="مشاريعنا العقارية"
          subtitle="أحدث المشاريع"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold rounded-xl bg-gradient-to-r from-[#0A2540] to-[#00D2C8] text-white hover:opacity-95 transition-all shadow-md hover:shadow-lg group"
          >
            <span>استعرض كافة المشاريع</span>
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
