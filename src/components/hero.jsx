import { motion } from "framer-motion"; // استيراد مكتبة الأنيميشن
import { Zap, BrainCircuit } from "lucide-react";

export default function HeroSection({ theme }) {
  const skills = [
    { id: 1, name: "html", icon: Zap },
    { id: 2, name: "css", icon: Zap },
    { id: 3, name: "javascript", icon: Zap },
    { id: 4, name: "react", icon: Zap },
    { id: 5, name: "tailwind", icon: Zap },
    { id: 6, name: "typescript", icon: Zap },
    { id: 7, name: "sass", icon: Zap },
  ];

  // إعدادات حركة ظهور المهارات الفردية بتأثير مرن (Spring)
  const skillContainerVariants = {
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const skillItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const skillitems = skills.map((skill) => (
    <motion.span
      variants={skillItemVariants}
      key={skill.id}
      className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 md:px-4 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200 hover:bg-violet-500/20 transition cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20 hover:text-violet-300"
    >
      <skill.icon className="h-3.5 w-3.5 text-violet-300" />
      {skill.name}
    </motion.span>
  ));

  // إعدادات الحركة العامة للنصوص والبطاقة (تأثير الصعود والتلاشي الناعم)
  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section
      id="home"
      className={`heroSection relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "text-slate-100" : "text-slate-950"
      }`}
    >
      {/* 1. الخلفية الديناميكية المتدرجة (تتحرك ببطء في الخلفية لتعطي طابعاً حيوياً) */}
      <div
        className={`absolute inset-0 z-0 ${theme === "dark" ? "block" : "hidden"}`}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 15, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-fuchsia-500/15 blur-[120px]"
        />
      </div>

      {/* الحاوية الرئيسية تبدأ الأنيميشن فور التحميل */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center relative z-10"
      >
        {/* الجزء الأيسر: النصوص والأزرار */}
        <div className="max-w-2xl space-y-6">
          <motion.p
            variants={fadeInUp}
            className="text-sm uppercase tracking-[0.35em] text-violet-300"
          >
            <span className="inline-block border-r-2 border-violet-400 pr-1 animate-pulse">
              Modern portfolio
            </span>
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-semibold leading-tight sm:text-5xl"
          >
            I build clean, modern web experiences with React and Tailwind.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className={`max-w-xl text-lg leading-8 ${
              theme === "dark" ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Frontend developer crafting responsive portfolio sites, polished UI,
            and fast interactions.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400 hover:scale-105 active:scale-95"
            >
              تصفح مشاريعي
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition hover:scale-105 active:scale-95 ${
                theme === "dark"
                  ? "border-violet-400/40 bg-slate-950/10 text-violet-100 hover:border-violet-300 hover:bg-violet-500/10"
                  : "border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-100"
              }`}
            >
              تواصل معي
            </a>
          </motion.div>
        </div>

        {/* الجزء الأيمن: بطاقة محمود التعريفية والمهارات */}
        <motion.div
          variants={{
            hidden: { y: 50, opacity: 0, scale: 0.95 },
            visible: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
          className="rounded-4xl border border-violet-400/20 bg-white/10 p-4 md:p-8 shadow-2xl shadow-violet-500/10 backdrop-blur-lg sm:p-10 transform hover:scale-[1.01] transition-transform duration-300"
        >
          <div className="space-y-4">
            <div className="rounded-3xl bg-violet-500/10 p-6 text-violet-100 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 h-32 w-32 bg-violet-600/10 rounded-full blur-3xl z-0" />
              <div className="relative z-10">
                <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
                  Hello, I am
                </p>
                <h2 className="text-3xl font-semibold">Mahmoud Shahieen</h2>
                <p className="mt-2 text-sm leading-6 text-slate-200/90">
                  Frontend developer specializing in React, Tailwind CSS and
                  modern digital experiences.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-100 flex items-start gap-4">
                <BrainCircuit className="h-10 w-10 text-violet-300 mt-1 animate-bounce [animation-duration:3s]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-violet-300">
                    Experience
                  </p>
                  <p className="mt-1 text-xl font-semibold">
                    bachelor's at artificial intelligence
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-100">
                <p className="text-sm uppercase tracking-[0.25em] text-violet-300 mb-2">
                  Skills
                </p>
                {/* الحاوية المتحركة للتاغات تأخذ تأثير التتابع الفردي */}
                <motion.div
                  variants={skillContainerVariants}
                  className="flex flex-wrap gap-2 mt-2 text-xl font-semibold"
                >
                  {skillitems}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
