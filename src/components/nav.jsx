import { useState } from "react";
import { Menu, X, Home, Briefcase, Mail } from "lucide-react"; // إضافة أيقونات للروابط
import ThemeToggle from "./themeToggle";

const Nav = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ربط كل عنصر بأيقونة مناسبة لزيادة الجاذبية البصرية
  const links = [
    { id: 1, name: "Home", href: "#home", icon: Home },
    { id: 2, name: "Projects", href: "#projects", icon: Briefcase },
    { id: 3, name: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    // تغيير inset-x-0 إلى top-4 مع إضافة padding لجعله عائماً
    <header className="fixed inset-x-0 top-4 z-50 mx-auto max-w-5xl px-4 sm:px-6">
      <div
        className={`rounded-full border transition-all duration-500 ease-in-out backdrop-blur-md shadow-lg
          ${
            theme === "dark"
              ? "border-violet-500/10 bg-slate-950/70 text-slate-100 shadow-violet-950/20"
              : "border-slate-200/60 bg-white/70 text-slate-900 shadow-slate-200/50"
          } 
          ${isOpen && !window.matchMedia("(min-width: 768px)").matches ? "rounded-[2rem]" : "rounded-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-3.5">
          {/* الشعار مع تأثير توهج خفيف عند التحويم */}
          <h1 className="group text-lg font-bold tracking-tight cursor-pointer">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent group-hover:from-fuchsia-400 group-hover:to-violet-400 transition-all duration-500">
              Mahmoud
            </span>{" "}
            Shahieen
          </h1>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* القائمة العادية للشاشات الكبيرة بتصميم كبسولة عائمة */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-1 text-sm font-medium">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`relative rounded-full px-4 py-2 transition-all duration-300 ease-out group
                        ${
                          theme === "dark"
                            ? "text-slate-300 hover:text-violet-300"
                            : "text-slate-600 hover:text-violet-600"
                        }`}
                    >
                      {link.name}
                      {/* خط خلفي متحرك يظهر أسفل الرابط عند التحويم */}
                      <span className="absolute inset-x-2 bottom-0 h-0.5 scale-x-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* فاصل أنيق بين المنيو والأزرار الجانبية */}
            <span className="hidden md:block h-5 w-px bg-slate-500/20" />

            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* زر الهامبرغر الحديث مع تأثير دوران خفيف */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-full p-2 transition-all duration-350 md:hidden active:scale-90
                ${theme === "dark" ? "hover:bg-slate-900 text-slate-200" : "hover:bg-slate-100 text-slate-700"}`}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
              )}
            </button>
          </div>
        </div>

        {/* قائمة الشاشات الصغيرة المنسدلة مدمجة داخل الكبسولة الزجاجية */}
        {isOpen && (
          <nav className="border-t border-slate-500/10 md:hidden animate-fadeIn">
            <ul className="flex flex-col space-y-1 p-4 text-sm font-medium">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 active:scale-[0.98]
                      ${
                        theme === "dark"
                          ? "text-slate-300 bg-slate-900/40 hover:bg-violet-500/10 hover:text-violet-300"
                          : "text-slate-600 bg-slate-50/50 hover:bg-violet-50 hover:text-violet-600"
                      }`}
                  >
                    <link.icon className="h-4 w-4 opacity-70" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Nav;
