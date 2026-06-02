import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getSalesHistory } from "@/utils/localStorage";

export default function History() {
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    // Load sales history from localStorage
    const history = getSalesHistory();
    setSalesHistory(history);
  }, []);

  return (
    <DashboardLayout>
      <section className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
        <h1 className="text-3xl font-semibold text-slate-900">سجل المبيعات</h1>
        <p className="mt-2 text-slate-600">
          اطّلع على آخر الفواتير والمبيعات المنفذة في التطبيق.
        </p>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {salesHistory.length === 0 ? (
          <div className="col-span-full rounded-4xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
            لا توجد مبيعات حالياً. ابدأ بإضافة منتجات والقيام بعملية بيع.
          </div>
        ) : (
          salesHistory.map((item) => (
            <div
              key={item.id}
              className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">الإجمالي</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                {item.total} جنيه
              </p>
              <p className="mt-2 text-sm text-slate-500">
                عدد المنتجات: {item.items?.length || 0}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <span>{item.date}</span>
              </div>
            </div>
          ))
        )}
      </section>
    </DashboardLayout>
  );
}
