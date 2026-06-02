import { Link } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  User,
  DollarSign,
  Settings,
  Clock,
  LogIn,
  UserPlus,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, setSidebarOpen }) {
  return (
    <aside
      className={`fixed left-0 z-50 flex w-72 flex-col justify-between bg-blue-500 p-4 text-white transition-transform duration-300 ease-in-out no-scrollbar ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } top-0 h-screen md:top-36 md:h-[calc(100vh-9rem)] md:translate-x-0 md:shadow-xl overflow-y-auto`}
    >
      <div>
        <div className="flex items-center justify-between gap-3 md:hidden mb-4">
          <span className="text-lg font-semibold">القائمة</span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-600 transition"
          >
            <Home className="w-5 h-5" />
            <span>الرئيسية</span>
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-600 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>المنتجات</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-600 transition"
          >
            <User className="w-5 h-5" />
            <span>الملف الشخصي</span>
          </Link>
          <Link
            to="/sell"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-600 transition"
          >
            <DollarSign className="w-5 h-5" />
            <span>بيع</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-600 transition"
          >
            <Settings className="w-5 h-5" />
            <span>الإعدادات</span>
          </Link>
          <Link
            to="/history"
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-600 transition"
          >
            <Clock className="w-5 h-5" />
            <span>السجل</span>
          </Link>
        </nav>
      </div>

      <div className="mt-6 border-t border-white/30 pt-4">
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-3xl bg-white/10 px-4 py-3 text-sm text-white hover:bg-white/20 transition"
        >
          <LogIn className="w-4 h-4" />
          تسجيل الدخول
        </Link>
        <Link
          to="/signup"
          className="mt-3 flex items-center gap-2 rounded-3xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-white hover:bg-white/20 transition"
        >
          <UserPlus className="w-4 h-4" />
          إنشاء حساب
        </Link>
      </div>
    </aside>
  );
}
