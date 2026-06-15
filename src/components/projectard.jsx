import { ArrowUpRight, Github } from "lucide-react";

export default function ProjectCard({ project, theme }) {
  return (
    <article
      className={`flex h-full flex-col justify-between rounded-4xl border p-6 shadow-2xl transition duration-300 ${theme === "dark" ? "border-violet-500/10 bg-slate-900 text-slate-100 shadow-violet-500/10" : "border-slate-200 bg-white text-slate-900 shadow-slate-200"}`}
    >
      <div className="space-y-5">
        <img
          className="h-52 w-full rounded-3xl object-cover shadow-xl"
          src={project.image}
          alt={project.title}
        />
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-violet-200">
            {project.title}
          </h3>
          <p
            className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={project.demoLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400"
        >
          Live Demo
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </a>
        <a
          href={project.githubLink}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center rounded-full border px-4 py-3 text-sm font-semibold transition ${theme === "dark" ? "border-violet-500/40 text-violet-200 hover:bg-violet-500/10" : "border-slate-200 text-slate-700 hover:bg-slate-100"}`}
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </a>
      </div>
    </article>
  );
}
