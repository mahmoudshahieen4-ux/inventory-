export default function HeroSection({ theme }) {
  const skills = [
    { id: 1, name: "html" },
    { id: 2, name: "css" },
    { id: 3, name: "javascript" },
    { id: 4, name: "react" },
    { id: 5, name: "tailwind" },
    { id: 6, name: "typescript" },
    { id: 7, name: "sass" },
  ];
  const skillitems = skills.map((skill) => (
    <span
      key={skill.id}
      className="rounded-full bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200 hover:bg-violet-500/20 transition cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20 hover:text-violet-300"
    >
      {skill.name}
    </span>
  ));
  return (
    <section
      id="home"
      className={`heroSection relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 ${theme === "dark" ? "text-slate-100" : "text-slate-950"}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300">
            Modern portfolio
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            I build clean, modern web experiences with React and Tailwind.
          </h1>
          <p
            className={`max-w-xl text-lg leading-8 ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}
          >
            Frontend developer crafting responsive portfolio sites, polished UI,
            and fast interactions.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400"
            >
              تصفح مشاريعي
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-violet-400/40 bg-slate-950/10 px-6 py-3 text-sm font-semibold text-violet-100 transition hover:border-violet-300 hover:bg-violet-500/10"
            >
              تواصل معي
            </a>
          </div>
        </div>
        <div className="rounded-4xl border border-violet-400/20 bg-white/10 p-8 shadow-2xl shadow-violet-500/10 backdrop-blur-lg sm:p-10">
          <div className="space-y-4">
            <div className="rounded-3xl bg-violet-500/10 p-6 text-violet-100">
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                Hello, I am
              </p>
              <h2 className="text-3xl font-semibold">Mahmoud Shahieen</h2>
              <p className="mt-2 text-sm leading-6 text-slate-200/90">
                Frontend developer specializing in React, Tailwind CSS and
                modern digital experiences.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-100">
                <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
                  Experience
                </p>
                <p className="mt-2 text-xl font-semibold">bachelor's at artificial intelligence </p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-100">
                <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2 mt-2 text-xl font-semibold">
                  {skillitems}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
