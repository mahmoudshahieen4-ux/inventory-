import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function ContactSection({ theme }) {
  // سطر برمجى بسيط للتأكد من القيمة في الـ Console أثناء التطوير
  console.log("Current theme in Contact:", theme);

  const fadeInUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // التحقق مما إذا كان الثيم مظلماً سواء كان نصاً أو قيمة منطقية (Boolean)
  const isDark = theme === "dark" || theme === true;

  return (
    <section
      id="contact"
      className={`relative overflow-hidden py-24 transition-colors duration-500
        ${
          isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-950"
        } 
        /* حل احتياطي ذهبي: إذا كان موقعك يعتمد على كلاس dark في الـ HTML أو Body */
        dark:bg-slate-950 dark:text-slate-100`}
    >
      {/* هالة التوهج البنفسجية */}
      <div
        className={`absolute inset-x-0 bottom-0 z-0 h-96 pointer-events-none transition-opacity duration-500 
          ${isDark ? "opacity-100" : "opacity-0"} 
          dark:opacity-100`}
      >
        <div className="absolute top-1/2 left-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="relative z-10 mx-auto max-w-4xl space-y-8 px-4 text-center"
      >
        <div className="space-y-4">
          <motion.p
            variants={fadeInUp}
            className="text-xs uppercase tracking-[0.4em] font-bold text-violet-400"
          >
            Let's build together
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className={`text-3xl font-extrabold sm:text-4xl tracking-tight leading-tight max-w-2xl mx-auto
              ${isDark ? "text-white" : "text-slate-900"} 
              dark:text-white`}
          >
            Get in touch for collaborations or freelance opportunities.
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className={`mx-auto max-w-2xl text-base leading-relaxed sm:text-lg
              ${isDark ? "text-slate-400" : "text-slate-600"} 
              dark:text-slate-400`}
          >
            I am available for modern frontend projects, UI design systems, and
            portfolio websites. Send a message and I will reply within 24 hours.
          </motion.p>
        </div>

        <motion.div variants={fadeInUp} className="pt-2">
          <a
            href="https://wa.me/201007852868"
            target="_blank"
            rel="noreferrer"
            className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-4 text-sm font-bold text-slate-950 transition-all duration-300 
              hover:from-violet-400 hover:to-fuchsia-400 
              hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]
              hover:scale-105 active:scale-98"
          >
            <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" />
            Send a message
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
