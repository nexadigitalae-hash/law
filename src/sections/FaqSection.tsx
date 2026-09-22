"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { HelpCircle, ChevronLeft, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export interface FaqItem {
  q: string;
  a: string;
}

export const faqPreview: FaqItem[] = [
  {
    q: "كيف يمكنني طلب استشارة قانونية من مكتب المحامي عبد الله السالمي؟",
    a: "يمكنك تقديم طلب عبر النموذج المخصص بالموقع أو التواصل معنا مباشرة. يقوم فريقنا القانوني بدراسة تفاصيل استفسارك والتواصل معك لتقديم التوجيه والرأي القانوني المناسب.",
  },
  {
    q: "ما هي القضايا والخدمات القانونية التي يغطيها المكتب؟",
    a: "نقدم منظومة متكاملة من الخدمات القانونية العامة تشمل الاستشارات، التمثيل والترافع القضائي في القضايا المدنية والتجارية، صياغة ومراجعة العقود، والتوثيق الرسمي للوثائق والمعاملات.",
  },
  {
    q: "ما هي المستندات المطلوبة للبدء في دراسة قضيتي؟",
    a: "تختلف المستندات حسب نوع الخدمة، ولكن عموماً يُفضل إرفاق إثبات الهوية الشخصية، العقود المتعلقة بالموضوع، والمراسلات أو الوثائق التي تدعم موقفك القانوني لتمكيننا من تقييم الملف بدقة.",
  },
];

// إعدادات أنيميشن الظهور المتتابع
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function FaqSection() {
  // فتح العنصر الأول افتراضياً
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="border-t border-slate-200/80 bg-white py-16 md:py-24 relative overflow-hidden">
      
      {/* لمسة إضاءة خلفية ناعمة */}
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-start relative z-10">
        
        {/* الجانب الأيمن: العنونة والزر */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-5"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold text-accent border border-accent/20 mb-4 shadow-sm">
            <HelpCircle className="h-4 w-4 shrink-0" />
            الأسئلة الشائعة
          </span>
          <h2 className="text-3xl font-extrabold md:text-4xl text-slate-900 tracking-tight leading-tight">
            استفسارات قانونية متكررة
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            إليك إجابات لأبرز الأسئلة المتعلقة بطلب الاستشارات والخدمات القانونية العامة التي يقدمها المكتب.
          </p>
          
          <div className="mt-8">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-accent transition-colors group"
            >
              <span>عرض جميع الأسئلة</span>
              <ChevronLeft className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:-translate-x-1.5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        {/* الجانب الأيسر: قائمة الأسئلة التفاعلية */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 space-y-4"
        >
          {faqPreview.map((f, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-accent/40 bg-slate-50/80 shadow-md"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/40"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-right p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                    {f.q}
                  </span>
                  
                  <span className={`p-2 rounded-xl border transition-all duration-300 shrink-0 ${
                    isOpen 
                      ? "bg-accent text-slate-950 border-accent" 
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                {/* أنيميشن فتح وإغلاق الإجابة */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm md:text-base text-slate-600 leading-relaxed font-normal border-t border-slate-200/60 mt-2">
                        <p className="pt-4">{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}