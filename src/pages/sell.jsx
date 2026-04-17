import { useMemo, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const availableProducts = [
  { id: 1, name: "مصل تجميلي", price: 120, stock: 3 },
  { id: 2, name: "كمامة طبية", price: 15, stock: 15 },
  { id: 3, name: "أدوات مختبرية", price: 320, stock: 2 },
];

const getInventoryAlerts = (items, minThreshold = 5) => {
  return items.reduce((alerts, product) => {
    const stock = Number(product.stock);
    if (stock <= 0) {
      alerts.push({
        id: product.id,
        message: `تنبيه: المنتج "${product.name}" نفد من المخزون.`,
        type: "danger",
      });
    } else if (stock <= minThreshold) {
      alerts.push({
        id: product.id,
        message: `تنبيه: المنتج "${product.name}" كمية منخفضة (${stock}) فقط.`,
        type: "warning",
      });
    }
    return alerts;
  }, []);
};

export default function Sell() {
  const [selectedProduct, setSelectedProduct] = useState(
    availableProducts[0].id,
  );
  const [quantity, setQuantity] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");
  const [cart, setCart] = useState([]);

  const inventoryAlerts = useMemo(
    () => getInventoryAlerts(availableProducts, 5),
    [],
  );

  const product = availableProducts.find(
    (item) => item.id === Number(selectedProduct),
  );

  const currentProductCartQty = cart.reduce(
    (sum, item) => (item.name === product?.name ? sum + item.quantity : sum),
    0,
  );

  const availableStock =
    product && Number(product.stock) - currentProductCartQty >= 0
      ? Number(product.stock) - currentProductCartQty
      : 0;

  const totalPrice = product ? product.price * Number(quantity) : 0;
  const grandTotal = cart.reduce((sum, item) => sum + item.total, 0);
  const invoiceDate = new Date().toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleProductChange = (event) => {
    const nextProductId = Number(event.target.value);
    const nextProduct = availableProducts.find(
      (item) => item.id === nextProductId,
    );

    setSelectedProduct(nextProductId);

    if (nextProduct && Number(quantity) > Number(nextProduct.stock)) {
      setQuantity(String(Number(nextProduct.stock)));
      setErrorMessage(`Only ${nextProduct.stock} items left in stock`);
    } else {
      setErrorMessage("");
    }
  };

  const handleQuantityChange = (event) => {
    const rawValue = event.target.value;
    if (rawValue === "") {
      setQuantity("");
      setErrorMessage("");
      return;
    }

    const cleanValue = rawValue.replace(/^0+(?=\d)/, "");
    if (!/^\d*$/.test(cleanValue)) return;

    const numericValue = Number(cleanValue || "0");

    if (product && numericValue > availableStock) {
      setQuantity(String(Math.max(availableStock, 0)));
      setErrorMessage(
        availableStock > 0
          ? `Only ${availableStock} items left in stock`
          : "This product is out of stock",
      );
      return;
    }

    setErrorMessage("");
    setQuantity(cleanValue || "0");
  };

  const handleQuantityFocus = () => {
    if (quantity === "0") {
      setQuantity("");
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const quantityValue = Number(quantity);

    if (quantityValue < 1) {
      setErrorMessage("Enter a quantity of at least 1");
      return;
    }

    if (quantityValue > availableStock) {
      setErrorMessage(
        availableStock > 0
          ? `Only ${availableStock} items left in stock`
          : "This product is out of stock",
      );
      return;
    }

    setCart((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: product.name,
        quantity: quantityValue,
        price: product.price,
        total: product.price * quantityValue,
      },
    ]);

    setErrorMessage("");
    setQuantity("1");
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
              onChange={handleProductChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {availableProducts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <p className="mt-3 text-sm text-slate-500">
              {product
                ? `المخزون المتاح: ${availableStock} من ${product.stock}`
                : "لا يوجد منتج محدد."}
            </p>

            {inventoryAlerts.length > 0 && (
              <div className="mt-4 space-y-3">
                {inventoryAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-3xl border px-4 py-3 text-sm ${
                      alert.type === "danger"
                        ? "border-rose-200 bg-rose-50 text-rose-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    {alert.message}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  الكمية
                </label>
                <input
                  type="number"
                  min="1"
                  max={Math.max(availableStock, 1)}
                  value={quantity}
                  onChange={handleQuantityChange}
                  onFocus={handleQuantityFocus}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {errorMessage && (
                  <p className="mt-2 text-sm text-rose-600">
                    {errorMessage}
                  </p>
                )}
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
              onClick={handleAddToCart}
              disabled={!product || availableStock < 1}
              className="mt-5 inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
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

            <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-right">
              <p className="text-sm text-slate-600">المجموع النهائي</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {grandTotal} جنيه
              </p>
            </div>

            <button
              type="button"
              onClick={printInvoice}
              className="mt-5 w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              طباعة الفاتورة
            </button>
          </div>
        </div>
      </section>

      <div className="hidden print:block">
        <style>{`
          @media print {
            body * {
              visibility: hidden !important;
            }
            .print-only,
            .print-only * {
              visibility: visible !important;
            }
            .print-only {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 0;
            }
          }
        `}</style>
        <div className="print-only mx-auto max-w-3xl rounded-4xl bg-white p-8 text-right shadow-lg">
          <div className="mb-8 border-b border-slate-200 pb-6">
            <h1 className="text-3xl font-bold text-slate-900">فاتورة POS</h1>
            <p className="mt-2 text-sm text-slate-600">
              تاريخ الإصدار: {invoiceDate}
            </p>
          </div>

          <div className="space-y-4">
            {cart.length === 0 ? (
              <div className="rounded-3xl bg-slate-50 p-6 text-slate-600">
                لا توجد عناصر في الفاتورة للطباعة.
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-slate-200">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                  <span>المنتج</span>
                  <span>الكمية</span>
                  <span>سعر الوحدة</span>
                  <span>الإجمالي</span>
                </div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-3 text-sm text-slate-800"
                  >
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                    <span>{item.price} جنيه</span>
                    <span>{item.total} جنيه</span>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-3xl bg-slate-50 p-6 text-right">
              <p className="text-sm text-slate-600">المجموع النهائي</p>
              <p className="mt-3 text-4xl font-bold text-slate-900">
                {grandTotal} جنيه
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
