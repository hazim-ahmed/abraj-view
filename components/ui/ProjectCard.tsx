import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize2, BedDouble, ArrowLeft } from "lucide-react";
import { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "متاح":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "تحت الإنشاء":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "قريبًا":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <div className="group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#00D2C8]/40">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Status Tag */}
        <span
          className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>
      </div>

      {/* Info Content */}
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-text mb-2">
          <MapPin className="w-3.5 h-3.5 text-[#00D2C8] shrink-0" />
          <span>{project.location}</span>
        </div>

        <h3 className="text-xl font-bold text-[#0A2540] mb-3 group-hover:text-[#00D2C8] transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-gray-text line-clamp-2 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Features Row */}
        {(project.area || project.rooms) && (
          <div className="flex items-center gap-4 py-3 border-y border-[#E2E8F0] mb-6 text-xs text-[#0A2540] font-medium">
            {project.area && (
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#00D2C8]" />
                <span>{project.area}</span>
              </div>
            )}
            {project.rooms && (
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-[#00D2C8]" />
                <span>{project.rooms}</span>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/contact?project=${encodeURIComponent(project.title)}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold rounded-xl bg-[#F8FAFC] text-[#0A2540] hover:bg-gradient-to-r hover:from-[#0A2540] hover:to-[#00D2C8] hover:text-white border border-transparent hover:border-[#0A2540] transition-all duration-300 group/btn"
          style={{ minHeight: "44px" }}
        >
          <span>استفسر عن المشروع</span>
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover/btn:-translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

