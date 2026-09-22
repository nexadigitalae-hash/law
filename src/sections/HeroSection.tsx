"use client";

import { motion, useReducedMotion } from "framer-motion";
import { 
  Scale, 
  ArrowLeft, 
  ShieldCheck,
  FileSearch,
  Lock
} from "lucide-react";

interface HeroSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function HeroSection({ onPrimaryClick }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // إعدادات أنيميشن الظهور التدريجي للعناصر
  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 25 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.215, 0.61, 0.355, 1] as const },
        };

  return (
    <section
      dir="rtl"
      aria-label="الرئيسية - عبد الله السالمي للمحاماة"
      className="relative py-8 md:py-12 border-b border-border bg-surface overflow-hidden mesh-bg"
    >
      <div className="container-page relative z-10">
        
        {/* شبكة تقسم القسم إلى يمين (محتوى) ويسار (صورة) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* الجانب الأيمن: النصوص والأزرار */}
          <div className="lg:col-span-7 max-w-3xl">
            {/* الشارة العليا */}
            <motion.div 
              {...fadeUp(0.05)} 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-dark/5 border border-accent/30 text-accent text-xs font-semibold mb-3"
            >
              <Scale className="h-3.5 w-3.5" />
              <span>محاماة واستشارات قانونية متكاملة</span>
            </motion.div>

            {/* العنوان الرئيسي */}
            <motion.h1
              {...fadeUp(0.12)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-dark leading-[1.25]"
            >
              عبد الله السالمي <br />
              <span className="text-accent font-medium inline-block mt-2">
                للمحاماة والاستشارات القانونية
              </span>
            </motion.h1>

            {/* الوصف */}
            <motion.p
              {...fadeUp(0.2)}
              className="mt-4 sm:mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-2xl font-normal"
            >
              نقدم منظومة متكاملة من الخدمات والاستشارات القانونية للأفراد والشركات محلياً، عبر دراسة كل حالة بعناية لاتخاذ الإجراءات النظامية المناسبة لحماية حقوق عملائنا والدفاع عن مصالحهم.
            </motion.p>

            {/* زر اتخاذ الإجراء */}
            <motion.div
              {...fadeUp(0.28)}
              className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#consultation-form"
                onClick={onPrimaryClick}
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-slate-dark px-8 py-4 text-base font-semibold text-white shadow-card transition-all duration-300 hover:bg-slate-medium active:scale-[0.98]"
              >
                <Scale className="h-5 w-5 text-accent transition-colors group-hover:text-white" />
                <span>طلب استشارة قانونية</span>
                <ArrowLeft className="h-4 w-4 text-accent transition-all duration-300 group-hover:text-white group-hover:-translate-x-1.5" />
              </a>
            </motion.div>
          </div>

          {/* الجانب الأيسر: صورة المحامي */}
          <motion.div 
            {...fadeUp(0.22)} 
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border-2 border-accent/30 shadow-card bg-slate-dark/5 group">
              <img
                src="/ff.jpg"
                alt="المحامي عبد الله السالمي"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/60 via-transparent to-transparent opacity-80" />
              
              {/* البطاقة التعريفية فوق الصورة */}
              <motion.div 
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                className="absolute bottom-4 right-4 left-4 text-white text-xs font-medium backdrop-blur-md bg-slate-dark/40 p-3 rounded-xl border border-white/10"
              >
                <span className="block font-bold text-accent text-sm">أ. عبد الله السالمي</span>
                <span>محامي ومستشار قانوني</span>
              </motion.div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}