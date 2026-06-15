export default function ContactSection() {
  return (
    <section id="contact" className="bg-slate-900/80 py-20 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6 px-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-violet-300">
          Let's build together
        </p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Get in touch for collaborations or freelance opportunities.
        </h2>
        <p className="mx-auto max-w-2xl text-slate-300 sm:text-lg">
          I am available for modern frontend projects, UI design systems, and
          portfolio websites. Send a message and I will reply within 24 hours.
        </p>
        <a
          href="https://wa.me/201007852868"
          className="mx-auto inline-flex rounded-full bg-violet-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400"
        >
          Send a message
        </a>
      </div>
    </section>
  );
}
