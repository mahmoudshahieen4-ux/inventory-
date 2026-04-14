import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-md rounded-4xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">تسجيل الدخول</h1>
        <p className="mt-2 text-slate-600">
          أدخل بيانات حسابك للوصول إلى لوحة التحكم.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              كلمة المرور
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            تسجيل الدخول
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ليس لديك حساب؟
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            {" "}
            أنشئ حساباً الآن
          </Link>
        </p>
      </div>
    </div>
  );
}
