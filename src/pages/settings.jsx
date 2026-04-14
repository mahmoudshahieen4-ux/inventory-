import DashboardLayout from "../components/DashboardLayout";

export default function Settings() {
  return (
    <DashboardLayout>
      <section className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
        <h1 className="text-3xl font-semibold text-slate-900">الإعدادات</h1>
        <p className="mt-2 text-slate-600">
          تحكم في إعدادات الحساب وتخصيص تجربة لوحة التحكم.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
          <h2 className="text-xl font-semibold text-slate-900">الإشعارات</h2>
          <p className="mt-2 text-sm text-slate-600">
            اختَر ما تريد استلامه من تنبيهات التطبيق.
          </p>
          <div className="mt-6 space-y-4">
            <label className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
                checked
                readOnly
              />
              <span className="text-sm text-slate-700">
                تنبيهات المخزون المنخفض
              </span>
            </label>
            <label className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
                checked
                readOnly
              />
              <span className="text-sm text-slate-700">
                رسائل تأكيد الفواتير
              </span>
            </label>
          </div>
        </div>

        <div className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
          <h2 className="text-xl font-semibold text-slate-900">الحساب</h2>
          <p className="mt-2 text-sm text-slate-600">
            معلومات حسابك الأساسية وعناصر التحكم في الخصوصية.
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-50 px-4 py-4">
              <p className="text-sm text-slate-500">البريد الإلكتروني</p>
              <p className="mt-1 font-semibold text-slate-900">
                admin@example.com
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-4">
              <p className="text-sm text-slate-500">اللغة</p>
              <p className="mt-1 font-semibold text-slate-900">العربية</p>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
