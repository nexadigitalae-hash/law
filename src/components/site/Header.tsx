"use client";

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "الرئيسية" },
  { to: "/about", label: "من نحن" },
  { to: "/how-it-works", label: "آلية العمل" },
  { to: "/faq", label: "الأسئلة الشائعة" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/90 backdrop-blur-md transition-all duration-300">
      <div className="container-page flex h-24 items-center justify-between px-4">
        
        {/* أقصى اليمين: اللوغو الدائري المكبر + الهوية القانونية */}
        <div className="flex items-center justify-start">
          <Link 
            to="/" 
            className="group flex items-center gap-3 transition-transform duration-200 active:scale-95 shrink-0"
          >
            {/* الديف الحاوي للشعار الدائري */}
            <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-full overflow-hidden border-2 border-accent/40 shadow-soft bg-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:border-accent">
              <img
                src="/logo.png"
                alt="شعار عبد الله السالمي للمحاماة"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col border-r border-border pr-3">
              <span className="text-lg md:text-xl font-bold text-slate-dark tracking-tight leading-none">
                عبد الله السالمي
              </span>
              <span className="text-xs md:text-sm text-accent font-semibold mt-1">
                للمحاماة والاستشارات القانونية
              </span>
            </div>
          </Link>
        </div>

        {/* المنتصف: القائمة الرئيسية */}
        <nav 
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative py-2 text-sm lg:text-base font-medium text-muted transition-colors duration-200 hover:text-accent whitespace-nowrap after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ 
                className: "text-slate-dark font-bold after:w-full after:bg-accent" 
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* أقصى اليسار: زر القائمة للموبايل */}
        <div className="md:hidden flex items-center justify-end">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface text-slate-dark transition-colors hover:bg-background focus:outline-none"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5 shrink-0" /> : <Menu className="h-5 w-5 shrink-0" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      <div 
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border bg-surface/95 backdrop-blur-2xl", 
          open ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        )}
      >
        <div className="container-page flex flex-col gap-1">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-muted transition-all hover:bg-background hover:text-slate-dark"
              activeProps={{ className: "bg-background text-accent font-bold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              <span>{n.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}