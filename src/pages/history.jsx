import DashboardLayout from "../components/DashboardLayout";

const salesHistory = [
  {
    id: 1,
    product: "كمامة طبية",
    customer: "شركة السلام",
    date: "14 أبريل 2026",
    total: "720 جنيه",
  },
  {
    id: 2,
    product: "مصل تجميلي",
    customer: "سارة محمد",
    date: "13 أبريل 2026",
    total: "240 جنيه",
  },
  {
    id: 3,
    product: "أدوات مختبرية",
    customer: "مختبر المدينة",
    date: "11 أبريل 2026",
    total: "960 جنيه",
  },
];

export default function History() {
  return (
    <DashboardLayout>
      <section className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
        <h1 className="text-3xl font-semibold text-slate-900">سجل المبيعات</h1>
        <p className="mt-2 text-slate-600">
          اطّلع على آخر الفواتير والمبيعات المنفذة في التطبيق.
        </p>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {salesHistory.map((item) => (
          <div
            key={item.id}
            className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">المنتج</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {item.product}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              العميل: {item.customer}
            </p>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>{item.date}</span>
              <span className="font-semibold text-slate-900">{item.total}</span>
            </div>
          </div>
        ))}
      </section>
    </DashboardLayout>
  );
}
