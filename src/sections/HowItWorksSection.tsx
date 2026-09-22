"use client";

import { Scale, CheckCircle2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

export interface StepItem {
  n: string;
  title: string;
  desc: string;
}

export const steps: StepItem[] = [
  { 
    n: "01", 
    title: "تعبئة طلب الاستشارة", 
    desc: "إدخال التفاصيل الأساسية ومعلومات الاستفسار والمستندات المتاحة عبر النموذج الإلكتروني." 
  },
  { 
    n: "02", 
    title: "دراسة وتدقيق الملف", 
    desc: "يقوم المستشار القانوني بمراجعة المستندات وفحص الجوانب النظامية بدقة عالية." 
  },
  { 
    n: "03", 
    title: "تقديم الرأي والتوجيه", 
    desc: "إعداد التوصية القانونية الشاملة أو الخطة القضائية المناسبة لحماية حقوقك." 
  },
  { 
    n: "04", 
    title: "المتابعة والتمثيل", 
    desc: "البدء في إجراءات الترافع أو التوثيق أو الصياغة بحسب نوع الخدمة المطلوبة." 
  },
];

// إعدادات الحركة للحاوية الكلية (تتابع الظهور)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

// إعدادات الحركة لكل بطاقة على حدة
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-b border-slate-200/80 bg-white py-16 md:py-24 relative overflow-hidden">
      
      {/* لمسة إضاءة خلفية ناعمة */}
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="container-page relative z-10">
        
        {/* العنونة مع الحركة */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent border border-accent/20 mb-4 shadow-sm">
            <Scale className="h-4 w-4 shrink-0" />
            آلية العمل
          </span>
          <h2 className="text-3xl font-extrabold md:text-4xl text-slate-900 tracking-tight">
            خطوات تقديم الاستشارة والمتابعة
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600 font-normal leading-relaxed">
            منظومة عمل موثوقة ومحددة تضمن معالجة طلبك القانوني بدقة وسرية كاملة.
          </p>
        </motion.div>

        {/* شبكة الخطوات المتحركة */}
        <div className="mt-16 relative">
          
          {/* خط ربط خلفي يظهر في الشاشات الكبيرة */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-12 z-0" />

          <motion.ol 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-10"
          >
            {steps.map((s) => (
              <motion.li
                key={s.n}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6 md:p-7 shadow-sm transition-colors duration-300 hover:border-accent hover:bg-white hover:shadow-xl hover:shadow-accent/5 flex flex-col justify-between"
              >
                <div>
                  {/* الرأس: الرقم والأيقونة */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-accent font-mono text-base font-bold shadow-md ring-4 ring-slate-100 group-hover:bg-accent group-hover:text-slate-950 transition-all duration-300">
                      {s.n}
                    </span>
                    <span className="text-slate-300 group-hover:text-accent transition-colors duration-300">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                  </div>

                  {/* المحتوى النصي */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 font-normal">
                    {s.desc}
                  </p>
                </div>

                {/* الشريط السفلي التفاعلي */}
                <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="h-1 w-10 rounded-full bg-slate-200 group-hover:w-full group-hover:bg-accent transition-all duration-500" />
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>

      </div>
    </section>
  );
}