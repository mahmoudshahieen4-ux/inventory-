import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const initialProducts = [
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

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "متوفر",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=60",
  });

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const query = searchTerm.trim().toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }),
    [products, searchTerm],
  );

  const totalProducts = products.length;
  const lowStockCount = products.filter(
    (product) => Number(product.stock) <= 20,
  ).length;
  const availableCount = products.filter(
    (product) => product.status === "متوفر",
  ).length;

  const openAddForm = () => {
    setEditingId(null);
    setFormState({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "متوفر",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=200&q=60",
    });
    setFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingId(product.id);
    setFormState({
      name: product.name,
      category: product.category,
      price: product.price.replace(/ جنيه$/, ""),
      stock: product.stock,
      status: product.status,
      image: product.image,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const handleFormChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.category.trim()) return;

    const newProduct = {
      id: editingId || Date.now(),
      name: formState.name.trim(),
      category: formState.category.trim(),
      price: `${formState.price.trim() || "0"} جنيه`,
      stock: formState.stock.trim() || "0",
      status: formState.status,
      image: formState.image,
    };

    setProducts((prev) => {
      if (editingId) {
        return prev.map((product) =>
          product.id === editingId ? newProduct : product,
        );
      }
      return [newProduct, ...prev];
    });

    closeForm();
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <DashboardLayout>
      <section className="rounded-4xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              إدارة المخزن
            </h1>
            <p className="mt-2 text-slate-600">
              أضف، حرر، احذف وابحث بين المنتجات الموجودة في المخزن بشكل
              ديناميكي.
            </p>
          </div>
          <div className="grid gap-3 sm:flex sm:items-center">
            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
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
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
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
                  {totalProducts}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
                <p className="text-sm text-slate-500">المنتجات النادرة</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {lowStockCount}
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
                <p className="text-sm text-slate-500">المنتجات المتوفرة</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {availableCount}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
            <h2 className="text-lg font-semibold text-slate-900">
              تفاصيل لوحة المنتجات
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              تصفح المنتجات، عدّل البيانات وأضف سجل منتجات جديد بسهولة.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">أكثر المنتجات طلباً</p>
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
              إدارة المنتجات المتاحة وتعديل بياناتها أو حذفها بنقرة واحدة.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">
              متوفر
            </span>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-amber-700">
              مخزون منخفض
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-slate-700">
              غير متوفر
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
                <th className="px-4 py-3 text-right font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredProducts.map((product) => (
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
                        onClick={() => openEditForm(product)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        <Pencil className="h-4 w-4" />
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                      >
                        <Trash2 className="h-4 w-4" />
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

      {isFormOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-12">
          <div className="w-full max-w-2xl rounded-4xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {editingId ? "تعديل المنتج" : "إضافة منتج جديد"}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  أدخل بيانات المنتج ثم احفظ التعديلات أو أضف منتجاً جديداً.
                </p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                إغلاق
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-4 lg:grid-cols-2"
            >
              <div>
                <label className="text-sm font-medium text-slate-700">
                  اسم المنتج
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) =>
                    handleFormChange("name", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  الفئة
                </label>
                <input
                  type="text"
                  value={formState.category}
                  onChange={(event) =>
                    handleFormChange("category", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  السعر
                </label>
                <input
                  type="text"
                  value={formState.price}
                  onChange={(event) =>
                    handleFormChange("price", event.target.value)
                  }
                  placeholder="120"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  الكمية
                </label>
                <input
                  type="text"
                  value={formState.stock}
                  onChange={(event) =>
                    handleFormChange("stock", event.target.value)
                  }
                  placeholder="25"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  الحالة
                </label>
                <select
                  value={formState.status}
                  onChange={(event) =>
                    handleFormChange("status", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option>متوفر</option>
                  <option>نادر</option>
                  <option>غير متوفر</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  رابط صورة المنتج
                </label>
                <input
                  type="url"
                  value={formState.image}
                  onChange={(event) =>
                    handleFormChange("image", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="lg:col-span-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {editingId ? "حفظ التعديلات" : "إضافة المنتج"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </DashboardLayout>
  );
}
