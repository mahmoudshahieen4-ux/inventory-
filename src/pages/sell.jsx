import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const availableProducts = [
  { id: 1, name: "مصل تجميلي", price: 120 },
  { id: 2, name: "كمامة طبية", price: 15 },
  { id: 3, name: "أدوات مختبرية", price: 320 },
];

export default function Sell() {
  const [selectedProduct, setSelectedProduct] = useState(
    availableProducts[0].id,
  );
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const product = availableProducts.find(
    (item) => item.id === Number(selectedProduct),
  );
  const totalPrice = product ? product.price * Number(quantity) : 0;

  const addToCart = () => {
    if (!product || quantity < 1) return;
    setCart((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: product.name,
        quantity: Number(quantity),
        price: product.price,
        total: product.price * Number(quantity),
      },
    ]);
  };

  return (
    <DashboardLayout>
      <section className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              صفحة البيع
            </h1>
            <p className="mt-2 text-slate-600">
              أضف منتجات إلى الفاتورة وأطلع على المجموع النهائي بسرعة.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-slate-50 p-5">
            <label className="block text-sm font-medium text-slate-700">
              اختر المنتج
            </label>
            <select
              value={selectedProduct}
              onChange={(event) => setSelectedProduct(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {availableProducts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  الكمية
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(event) => setQuantity(Number(event.target.value))}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  السعر الإجمالي
                </label>
                <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-900">
                  {totalPrice} جنيه
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={addToCart}
              className="mt-5 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              أضف إلى الفاتورة
            </button>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
            <h2 className="text-lg font-semibold text-slate-900">
              عناصر الفاتورة
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              قم بمراجعة المشتريات قبل إنهاء الفاتورة.
            </p>
            <div className="mt-6 space-y-4">
              {cart.length === 0 ? (
                <div className="rounded-3xl bg-slate-50 p-5 text-slate-600">
                  لا توجد عناصر حتى الآن.
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          كمية: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-slate-900">
                        {item.total} جنيه
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
