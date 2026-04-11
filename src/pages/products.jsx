import { useState } from "react";
export default function Products() {
  const products = [
    {
      id: 1,
      name: "مصل تجميلي",
      category: "العناية بالبشرة",
      price: "120 جنيه",
      stock: "25",
      status: "متوفر",
      image:
        "https://images.unsplash.com/photo-1542838687-aeeca1f68b48?auto=format&fit=crop&w=200&q=60",
    },
    {
      id: 2,
      name: "كمامة طبية",
      category: "معدات الحماية",
      price: "15 جنيه",
      stock: "80",
      status: "متوفر",
      image:
        "https://images.unsplash.com/photo-1588776814546-1e4be2de4745?auto=format&fit=crop&w=200&q=60",
    },
    {
      id: 3,
      name: "أدوات مختبرية",
      category: "أدوات المعمل",
      price: "320 جنيه",
      stock: "12",
      status: "نادر",
      image:
        "https://images.unsplash.com/photo-1556228724-4b5cbfa313f5?auto=format&fit=crop&w=200&q=60",
    },
  ];


  return (
    <div className="home min-h-screen bg-slate-50 pt-24 md:pt-20">
      <main className="flex-1 px-4 pb-10 md:px-6">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">
                  منتجات
                </h1>
                <p className="mt-2 text-slate-600">
                  واجهة عرض المنتجات مع خيارات البحث والإضافة والتعديل، الجزء
                  الثابت فقط.
                </p>
              </div>
              <div className="grid gap-3 sm:flex sm:items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  إضافة منتج جديد
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    ابحث عن منتج
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="اكتب اسم المنتج أو الفئة..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                      🔍
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
                    <p className="text-sm text-slate-500">إجمالي المنتجات</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">
                      3
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
                    <p className="text-sm text-slate-500">المنتجات النادرة</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">
                      1
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
                    <p className="text-sm text-slate-500">المنتجات المتوفرة</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">
                      2
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
                <h2 className="text-lg font-semibold text-slate-900">
                  تفاصيل لوحة المنتجات
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  يمكنك البحث ثم اختيار المنتج لإظهار تفاصيله أو تعديل بياناته
                  لاحقاً.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                      أكثر المنتجات طلباً
                    </p>
                    <p className="mt-3 text-lg font-semibold text-slate-900">
                      كمامة طبية
                    </p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">آخر إضافة</p>
                    <p className="mt-3 text-lg font-semibold text-slate-900">
                      أدوات مختبرية
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  قائمة المنتجات
                </h2>
                <p className="mt-2 text-slate-600">
                  عرض المنتجات الموجودة في LABORATORY بشكل ثابت فقط.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">
                  نشط
                </span>
                <span className="rounded-full bg-amber-100 px-4 py-2 text-amber-700">
                  مخزون منخفض
                </span>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-slate-700">
                  متوفر
                </span>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-right text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-right font-medium">المنتج</th>
                    <th className="px-4 py-3 text-right font-medium">الفئة</th>
                    <th className="px-4 py-3 text-right font-medium">السعر</th>
                    <th className="px-4 py-3 text-right font-medium">الكمية</th>
                    <th className="px-4 py-3 text-right font-medium">الحالة</th>
                    <th className="px-4 py-3 text-right font-medium">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 align-middle">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-14 w-14 rounded-3xl object-cover"
                          />
                          <div>
                            <p className="font-medium text-slate-900">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle text-slate-600">
                        {product.category}
                      </td>
                      <td className="px-4 py-4 align-middle text-slate-900">
                        {product.price}
                      </td>
                      <td className="px-4 py-4 align-middle text-slate-900">
                        {product.stock}
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${product.status === "متوفر" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="flex flex-wrap items-center gap-2 justify-end">
                          <button
                            type="button"
                            className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                          >
                            تعديل
                          </button>
                          <button
                            type="button"
                            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
