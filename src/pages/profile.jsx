import DashboardLayout from "../components/DashboardLayout";

export default function Profile() {
  return (
    <DashboardLayout>
      <section className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
        <h1 className="text-3xl font-semibold text-slate-900">الملف الشخصي</h1>
        <p className="mt-2 text-slate-600">
          عرض معلومات الحساب ومتابعة أداء المستخدم.
        </p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-500 text-2xl font-semibold text-white">
              A
            </div>
            <div>
              <p className="text-sm text-slate-500">اسم المستخدم</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                أحمد المصري
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-50 px-4 py-4">
              <p className="text-sm text-slate-500">البريد الإلكتروني</p>
              <p className="mt-1 font-semibold text-slate-900">
                admin@example.com
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-4">
              <p className="text-sm text-slate-500">رقم الهاتف</p>
              <p className="mt-1 font-semibold text-slate-900">
                +20 100 123 4567
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
          <h2 className="text-xl font-semibold text-slate-900">
            معلومات إضافية
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 px-4 py-4">
              <p className="text-sm text-slate-500">دور المستخدم</p>
              <p className="mt-1 font-semibold text-slate-900">مدير المتجر</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-4">
              <p className="text-sm text-slate-500">آخر تسجيل دخول</p>
              <p className="mt-1 font-semibold text-slate-900">14 أبريل 2026</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
