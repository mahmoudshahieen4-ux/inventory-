import projectsData from "../data/projectsData";
import ProjectCard from "../components/projectard";

export default function Projects({ theme }) {
  return (
    <section
      id="projects"
      className={`mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}
    >
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-violet-300">
          My Work
        </p>
        <h2
          className={`mt-4 text-3xl font-semibold sm:text-4xl ${theme === "dark" ? "text-slate-100" : "text-slate-950"}`}
        >
          مشاريع جاهزة للتطوير بسهولة.
        </h2>

      </div>
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} theme={theme} />
        ))}
      </div>
    </section>
  );
}
