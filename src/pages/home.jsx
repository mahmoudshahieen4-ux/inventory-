import { useEffect, useState } from "react";
import Nav from "../components/nav";
import Projects from "../components/projects";
import HeroSection from "../components/hero";
import ContactSection from "../components/contact";

export default function Home() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-950"}`}
    >
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-24">
        <HeroSection theme={theme} />
        <Projects theme={theme} />
        <ContactSection />
      </main>
    </div>
  );
}
