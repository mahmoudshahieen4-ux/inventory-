import { useEffect, useRef, useState } from "react";
import { Search, UserRound, Bell, Menu } from "lucide-react";

export default function Nav({ isSidebarOpen, setSidebarOpen }) {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [bellOpen, setBellOpen] = useState(false);
  const bellRef = useRef(null);

  const hasLowStock = lowStockItems.length > 0;

  useEffect(() => {
    const controller = new AbortController();

    const fetchLowStock = async () => {
      try {
        const response = await fetch("http://localhost:8000/low-stock", {
          signal: controller.signal,
        });
        if (!response.ok) return;

        const data = await response.json();
        setLowStockItems(data);
      } catch (error) {
        setLowStockItems([]);
      }
    };

    fetchLowStock();

    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setBellOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      controller.abort();
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
            <div className="relative" ref={bellRef}>
              <button
                type="button"
                onClick={() => setBellOpen((prev) => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-slate-200"
              >
                <Bell className="w-5 h-5" />
                {hasLowStock && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>

              {bellOpen && (
                <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                  <div className="px-4 py-3 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-900">
                      تنبيهات المخزون المنخفض
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {hasLowStock
                        ? `${lowStockItems.length} منتجًا منخفضًا في المخزون`
                        : "لا توجد تنبيهات جديدة."}
                    </p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {hasLowStock ? (
                      lowStockItems.map((item) => (
                        <div
                          key={item.id}
                          className="border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-slate-50"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-semibold text-slate-900">
                              {item.name}
                            </span>
                            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-rose-700">
                              {item.stock} left
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            مستوى تنبيه: {item.threshold ?? 5}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-sm text-slate-500">
                        جميع المنتجات لديها كميات كافية.
                      </div>
                    )}
                  </div>
                </div>
              )}
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
