import { useState } from "react";
import { Link } from "react-router-dom";
import { DollarSign, ShoppingBag, Clock, Settings } from "lucide-react";
import Nav from "../components/nav";
import Sidebar from "../components/sidebar";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Nav isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="home min-h-screen pt-44 md:pt-40">
        <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 px-4 pb-10 pt-6 h-screen md:ml-72 md:px-6 md:pt-44">
          <div className="mx-auto max-w-7xl">
            <section className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
              <h1 className="text-2xl font-semibold text-slate-900">
                أهلاً بك في لوحة التحكم
              </h1>
              <p className="mt-2 text-slate-600">
                اختر بطاقة للانتقال إلى الصفحة المناسبة.
              </p>
            </section>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Link
                to="/sell"
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  عمل فاتورة
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  اذهب إلى صفحة البيع لإنشاء فاتورة جديدة.
                </p>
              </Link>

              <Link
                to="/products"
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  المخزن
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  افتح صفحة المنتجات لإدارة المخزون.
                </p>
              </Link>

              <Link
                to="/history"
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white">
                  <Clock className="w-6 h-6" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  سجل المبيعات
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  اعرض سجل المبيعات من صفحة التاريخ.
                </p>
              </Link>

              <Link
                to="/settings"
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white">
                  <Settings className="w-6 h-6" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                  الإعدادات
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  انتقل إلى إعدادات الحساب والتطبيق.
                </p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
