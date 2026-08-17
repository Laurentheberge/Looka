"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  BookOpen,
  Calendar,
  Crown,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/contexts/auth-context";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "AI Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    label: "Past Questions",
    href: "/past-questions",
    icon: BookOpen,
  },
  {
    label: "Notes",
    href: "/notes",
    icon: FileText,
  },
  {
    label: "Practice",
    href: "/practice",
    icon: BookOpen,
  },
  {
    label: "Study Plan",
    href: "/study-plan",
    icon: Calendar,
  },
];

const bottomItems = [
  {
    label: "Subscription",
    href: "/subscription",
    icon: Crown,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { userData, isPro } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-[var(--color-navy)] text-white">
      <div className="p-6 flex items-center gap-2">
        <Link
          href="/dashboard"
          className="text-2xl font-bold text-[var(--color-gold)]"
        >
          Looka
        </Link>
        {isPro && (
          <span className="px-2 py-0.5 bg-[var(--color-gold)] text-[var(--color-navy)] text-[10px] font-bold rounded-full">
            PRO
          </span>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-white/10 text-[var(--color-gold)]"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}

        <button
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors w-full"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
