import { useState } from "react";
import Nav from "./nav";
import Sidebar from "./sidebar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="no-scrollbar">
      <Nav isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="home min-h-screen pt-32">
        <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 px-4 pb-10 pt-2 h-screen md:ml-72 md:px-6 md:pt-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
