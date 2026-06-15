import ThemeToggle from "./themeToggle";

const Nav = ({ theme, toggleTheme }) => {
  const links = [
    { id: 1, name: "Home", href: "#home" },
    { id: 2, name: "Projects", href: "#projects" },
    { id: 3, name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b ${theme === "dark" ? "border-violet-500/10 bg-slate-950/90 text-slate-100" : "border-slate-200/80 bg-white/90 text-slate-900"} backdrop-blur-xl`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-xl font-semibold">Mahmoud Shahieen</h1>
        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex items-center gap-3 text-sm font-medium">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={`rounded-full px-3 py-2 transition ${theme === "dark" ? "text-slate-200 hover:bg-violet-500/20" : "text-slate-700 hover:bg-violet-100"}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
};

export default Nav;
