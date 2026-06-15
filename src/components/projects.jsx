import { motion } from "framer-motion"; 
import projectsData from "../data/projectsData";
import ProjectCard from "../components/projectard";

export default function Projects({ theme }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} 
      variants={containerVariants}
      className={`mx-auto max-w-7xl px-4 py-24 transition-colors duration-500 sm:px-6 lg:px-8 
        ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}
    >
      <motion.div variants={itemVariants} className="mb-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] font-bold text-violet-400">
          My Work
        </p>
        <h2
          className={`mt-4 text-3xl font-extrabold sm:text-4xl tracking-tight ${
            theme === "dark" ? "text-slate-100" : "text-slate-950"
          }`}
        >
          مشاريع جاهزة للتطوير بسهولة
        </h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mt-4 h-1 w-12 rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500 origin-center"
        />
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {projectsData.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <ProjectCard project={project} theme={theme} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}