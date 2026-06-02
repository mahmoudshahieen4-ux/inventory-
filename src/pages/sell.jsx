import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getProducts, addSaleRecord } from "@/utils/localStorage";

const defaultProducts = [
  { id: 1, name: "مصل تجميلي", price: 120, stock: 25 },
  { id: 2, name: "كمامة طبية", price: 15, stock: 80 },
  { id: 3, name: "أدوات مختبرية", price: 320, stock: 12 },
];

const convertProductsForSale = (productsData) => {
  if (!productsData) return defaultProducts;
  return productsData.map((p) => ({
    id: p.id,
    name: p.name,
    price: parseInt(p.price.replace(/ جنيه$/, "")) || 0,
    stock: parseInt(p.stock) || 0,
  }));
};

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
  const [availableProducts, setAvailableProducts] = useState(defaultProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const [errorMessage, setErrorMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertsOpen, setAlertsOpen] = useState(false);

  // Load products from localStorage on mount
  useEffect(() => {
    const productsData = getProducts();
    const convertedProducts = convertProductsForSale(productsData);
    setAvailableProducts(convertedProducts);
    if (convertedProducts.length > 0) {
      setSelectedProduct(convertedProducts[0].id);
    }
  }, []);

  const lowStockThreshold = 5;
  const inventoryAlerts = getInventoryAlerts(
    availableProducts,
    lowStockThreshold,
  );
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(
    inventoryAlerts.length > 0,
  );
  const filteredProducts = availableProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
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
          ? `تبقى فقط ${availableStock} من هذا المنتج في المخزون.`
          : "هذا المنتج نفد من المخزون.",
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAlertsToggle = () => {
    setAlertsOpen((prev) => !prev);
    if (hasUnreadAlerts) {
      setHasUnreadAlerts(false);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProduct(productId);
    setSearchTerm("");
    setErrorMessage("");
  };

  const handleRemoveCartItem = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleAddToCart = () => {
    if (!product) return;

    const quantityValue = Number(quantity);

    if (quantityValue < 1) {
      setErrorMessage("الرجاء إدخال كمية لا تقل عن 1.");
      return;
    }

    if (quantityValue > availableStock) {
      setErrorMessage(
        availableStock > 0
          ? `تبقى فقط ${availableStock} من هذا المنتج في المخزون.`
          : "هذا المنتج نفد من المخزون.",
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

  const printInvoice = () => {
    if (cart.length > 0) {
      // Save sale to history before printing
      addSaleRecord({
        items: cart,
        total: grandTotal,
      });
    }
    window.print();
  };

  return (
    <DashboardLayout>
      <section className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              صفحة البيع
            </h1>
            <p className="mt-2 text-slate-600">
              أضف منتجات إلى الفاتورة وأطلع على المجموع النهائي بسرعة.
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={handleAlertsToggle}
              className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              aria-label="تنبيهات المخزون"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M6 3a1 1 0 0 0 0 2h1l1.6 9.6a2 2 0 0 0 2 1.8h6.8a2 2 0 0 0 2-1.8L20 5h1a1 1 0 1 0 0-2H6Zm3 16a3 3 0 1 0 6 0H9Z" />
              </svg>
              {hasUnreadAlerts && inventoryAlerts.length > 0 && (
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {alertsOpen && (
              <div className="absolute right-0 top-full z-20 mt-3 w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">
                    تنبيهات المخزون
                  </p>
                  <span className="text-sm text-slate-500">
                    {inventoryAlerts.length} عنصر
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {inventoryAlerts.length === 0 ? (
                    <div className="rounded-3xl bg-slate-50 p-4 text-slate-600">
                      لا توجد تنبيهات حالياً.
                    </div>
                  ) : (
                    inventoryAlerts.map((alert) => (
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
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-slate-50 p-5">
            <label className="block text-sm font-medium text-slate-700">
              بحث عن منتج
            </label>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="اكتب اسم المنتج..."
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <div className="mt-4 grid gap-3">
              {filteredProducts.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-600">
                  لم يتم العثور على منتجات.
                </div>
              ) : (
                filteredProducts.map((item) => {
                  const isSelected = item.id === Number(selectedProduct);
                  const isOutOfStock = item.stock <= 0;
                  const isRare =
                    item.stock > 0 && item.stock <= lowStockThreshold;
                  const isLowStock = false;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectProduct(item.id)}
                      disabled={item.stock <= 0}
                      className={`w-full rounded-3xl border p-4 text-right transition ${
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : isOutOfStock
                            ? "border-rose-200 bg-rose-50 opacity-90"
                            : isRare
                              ? "border-violet-200 bg-violet-50"
                              : isLowStock
                                ? "border-amber-200 bg-amber-50"
                                : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-slate-900">
                            {item.name}
                          </p>
                          {isOutOfStock ? (
                            <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
                              نفد
                            </span>
                          ) : isRare ? (
                            <span className="rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold text-white">
                              نادر
                            </span>
                          ) : isLowStock ? (
                            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                              منخفض
                            </span>
                          ) : null}
                        </div>
                        <p className="text-sm text-slate-500">
                          {item.price} جنيه · المخزون: {item.stock}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <p className="mt-4 text-sm text-slate-500">
              {product
                ? `المخزون المتاح: ${availableStock} من ${product.stock}`
                : "اختر منتجاً لعرض تفاصيل المخزون."}
            </p>

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
                  disabled={availableStock < 1}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
                {errorMessage && (
                  <p className="mt-2 text-sm text-rose-600">{errorMessage}</p>
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
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          كمية: {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveCartItem(item.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-rose-300 hover:text-rose-700"
                          aria-label="إزالة العنصر"
                        >
                          ×
                        </button>
                        <p className="font-semibold text-slate-900">
                          {item.total} جنيه
                        </p>
                      </div>
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
            <div className="mt-2 flex flex-col gap-1 text-sm text-slate-600">
              <p>تاريخ الإصدار: {invoiceDate}</p>
              <p>عدد العناصر: {cart.length}</p>
            </div>
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
