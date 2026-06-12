"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/dashboard/stats-card";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "🏠" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "📊" },
  { href: "/dashboard/detections", label: "Detections", icon: "🔍" },
  { href: "/dashboard/revenue", label: "Revenue", icon: "💰" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email || null);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-white text-black dark:bg-zinc-950 dark:text-white transition-colors">

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 border-b border-white/10 bg-white dark:bg-zinc-950 z-50">

        <button onClick={() => setMobileOpen(true)}>
          ☰
        </button>

        <div className="text-lime-400 font-bold">
          ContentRadar
        </div>

        <div />
      </div>

      {/* OVERLAY (mobile) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 md:hidden z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          h-full
          bg-zinc-900 dark:bg-zinc-950
          border-r border-white/10
          flex flex-col
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:translate-x-0
        `}
      >

        {/* TOP BRAND */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">

          {!collapsed && (
            <div className="text-lime-400 font-bold text-lg">
              ContentRadar
            </div>
          )}

          <button
            onClick={() => setCollapsed((p) => !p)}
            className="text-white/60 hover:text-white text-sm"
          >
            ⇆
          </button>

        </div>

        {/* PROFILE */}
        <div className="p-3 border-b border-white/10">

          {!collapsed ? (
            <>
              <p className="text-xs text-white/50">Signed in</p>
              <p className="text-sm truncate">{userEmail}</p>

              <div className="flex gap-3 mt-3">
                <button onClick={handleLogout} className="text-xs text-red-400">
                  Sign out
                </button>

                <button
                  onClick={() => setDark((p) => !p)}
                  className="text-xs text-white/60"
                >
                  Theme
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-white/60 text-xs">
              👤
            </div>
          )}
        </div>

        {/* NAV */}
        <nav className="flex-1 p-2 space-y-1 text-sm">

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition"
            >
              <span>{item.icon}</span>

              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}

        </nav>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 md:p-10 pt-20 md:pt-10 transition-colors">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <StatsCard title="Verified Reach" value="187K" description="+34%" />
<StatsCard title="Detections" value="23" description="8 new" />
<StatsCard title="Uncredited Uses" value="9" description="Action" />
<StatsCard title="Revenue" value="KES 18K" description="Opportunities" />
        </div>

        {children}

      </main>

    </div>
  );
}