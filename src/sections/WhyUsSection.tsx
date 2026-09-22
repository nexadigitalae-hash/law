"use client";

import { ShieldCheck, Clock, Scale, Lock, ArrowLeft, type LucideIcon } from "lucide-react";
import { motion, Variants } from "framer-motion";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const whyUs: FeatureItem[] = [
  { icon: ShieldCheck, title: "خبرة قانونية موثوقة", desc: "دراسة كاملة للملفات وفق الأنظمة واللوائح المعتمدة لحماية حقوقك." },
  { icon: Clock, title: "استجابة وسرعة في المتابعة", desc: "بدء فحص الطلبات وتحديد الموقف القانوني الأولي في أسرع وقت." },
  { icon: Scale, title: "حلول واستشارات متكاملة", desc: "تقديم التوجيه والترافع والتصليح النظامي للأفراد والشركات." },
  { icon: Lock, title: "سرية مطلقة للبيانات", desc: "التزام تام بحفظ أرشيف القضية وسرية جميع الوثائق والمعاملات." },
];

interface WhyUsSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

// إعدادات أنيميشن الحاوية الجانبية للبطاقات
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// إعدادات حركة البطاقات الفردية
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function WhyUsSection({ onPrimaryClick }: WhyUsSectionProps) {
  return (
    <section className="py-16 md:py-24 border-b border-slate-800 bg-slate-950 relative overflow-hidden">
      
      {/* لمسة إضاءة خلفية دائرية ناعمة */}
      <div className="absolute top-1/2 right-0 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center relative z-10">
        
        {/* الجانب الأيمن: النص والدعوة لاتخاذ إجراء */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent border border-accent/30 mb-4 shadow-sm">
            <Scale className="h-4 w-4 shrink-0" />
            لماذا نلبي تطلعاتك
          </span>
          <h2 className="text-3xl font-extrabold md:text-4xl leading-tight text-slate-100 tracking-tight">
            لماذا يختار عملاؤنا مكتب عبد الله السالمي للمحاماة؟
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-400 leading-relaxed font-normal">
            نجمع بين الخبرة النظامية والسرعة في الإنجاز، مع الحرص التام على تقديم الرأي القانوني السليم الذي يحمي مصالحك وتطلعاتك التجارية والشخصية.
          </p>
          <div className="mt-8">
            <a
              href="#consultation-form"
              onClick={onPrimaryClick}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-accent/10 transition-all duration-300 hover:bg-accent/90 hover:shadow-accent/20 active:scale-95"
            >
              <span>طلب استشارة قانونية</span>
              <ArrowLeft className="h-4 w-4 shrink-0 text-slate-950 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* الجانب الأيسر: شبكة المميزات المتحركة */}
        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 sm:grid-cols-2 lg:col-span-7"
        >
          {whyUs.map((w, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:border-accent/60 hover:bg-slate-900 hover:shadow-2xl hover:shadow-accent/5"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-800/80 text-accent border border-slate-700/60 shadow-inner group-hover:bg-accent group-hover:text-slate-950 transition-all duration-300">
                <w.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-100 group-hover:text-accent transition-colors">
                {w.title}
              </h3>
              <p className="mt-2 text-xs md:text-sm leading-relaxed text-slate-400 font-normal">
                {w.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}