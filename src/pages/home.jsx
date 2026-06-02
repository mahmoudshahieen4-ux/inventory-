import { Link } from "react-router-dom";
import { DollarSign, ShoppingBag, Clock, Settings } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <section className="rounded-4xl bg-white p-6 pt-15 shadow-sm ring-1 ring-slate-200/80 ">
        <h1 className="text-2xl font-semibold text-slate-900">
          أهلاً بك في لوحة التحكم
        </h1>
        <p className="mt-2 text-slate-600">
          اختر بطاقة للانتقال إلى الصفحة المناسبة وإدارة المخزون والفواتير.
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
            انتقل إلى صفحة البيع لإنشاء فاتورة جديدة بسرعة.
          </p>
        </Link>

        <Link
          to="/products"
          className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-900">المخزن</h2>
          <p className="mt-2 text-sm text-slate-500">
            قم بإدارة المنتجات وإضافة العناصر وحذفها وتعديلها.
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
            اعرض سجل المبيعات والعناصر المباعة سابقاً.
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
            قم بتغيير إعدادات الحساب والتطبيق بسهولة.
          </p>
        </Link>
      </div>
    </DashboardLayout>
  );
}
