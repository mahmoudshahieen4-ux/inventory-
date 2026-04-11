import { Search, UserRound, Bell, Menu } from "lucide-react";

export default function Nav({ isSidebarOpen, setSidebarOpen }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 bg-white/95 shadow-sm shadow-slate-200 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-blue-500 text-white text-lg font-bold">
                سوق
              </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <UserRound className="w-5 h-5" />
            </div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <Bell className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl bg-slate-50 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 rounded-3xl bg-white px-3 py-2 shadow-sm sm:flex-1">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="search"
              placeholder="ابحث عن منتج"
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
            />
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm text-slate-600">
            <span className="rounded-2xl bg-white px-3 py-2 shadow-sm">
              عرض سريع
            </span>
            <span className="rounded-2xl bg-white px-3 py-2 shadow-sm">
              الوصول السريع
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
