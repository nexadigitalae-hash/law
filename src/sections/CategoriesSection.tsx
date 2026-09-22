"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Scale,
  Gavel,
  FileText,
  Building2,
  Briefcase,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";

export interface ServiceDetail {
  id: string;
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
}

export const legalServices: ServiceDetail[] = [
  {
    id: "litigation",
    icon: Gavel,
    title: "الترافع والتمثيل القضائي",
    shortDesc: "تمثيل قانوني أمام مختلف درجات المحاكم والهيئات القضائية.",
    fullDesc: "نتولى تمثيل الأفراد والشركات في كافة النزاعات القضائية، بدءاً من إعداد صياغة اللوائح والاعتراضات وصولاً إلى الدفاع والترافع أمام المحاكم الابتدائية والاستئناف والعليا.",
    highlights: [
      "إعداد صحف الدعوى والمذكرات الجوابية",
      "التمثيل الفعلي أمام القضاة واللجان",
      "متابعة تنفيذ الأحكام القضائية"
    ]
  },
  {
    id: "commercial",
    icon: Scale,
    title: "القضايا المدنية والتجارية",
    shortDesc: "معالجة المنازعات المالية والعقود بين الشركات والأفراد.",
    fullDesc: "تقديم الدعم القانوني في كافة الخلافات المتعلقة بالمعاملات المالية، تحصيل الديون، والنزاعات التجارية الناتجة عن تعثر الشراكات أو الخلل في تنفيذ العقود.",
    highlights: [
      "تسوية المنازعات المالية والتجارية",
      "إدارة مطالبات التعويض والدفوع",
      "تحصيل المستحقات والديون المتعثرة"
    ]
  },
  {
    id: "contracts",
    icon: FileText,
    title: "صياغة ومراجعة العقود",
    shortDesc: "صياغة محكمة تحمي كافة أطراف العلاقة القانونية.",
    fullDesc: "إعداد الاتفاقيات وعقود البيع والشركات والخدمات بصياغة نظامية دقيقة تُقلل من المخاطر المستقبلية وتضمن حماية مصالح عملائنا بأعلى المعايير القانونية.",
    highlights: [
      "صياغة التفاهمات ومذكرات الشروط",
      "تدقيق العقود القائمة وتحديد المخاطر",
      "ملائمة العقود مع الأنظمة واللوائح الحالية"
    ]
  },
  {
    id: "realestate",
    icon: Building2,
    title: "القضايا العقارية والاستثمارية",
    shortDesc: "حماية الاستثمارات العقارية وحل منازعات الملكية والإيجار.",
    fullDesc: "تقديم الاستشارات والحلول النزاعية المتعلقة بالملكية العقارية، العقود الإيجارية، والتطوير العقاري وضمان توثيق الملكية والإجراءات وفق الأنظمة المعمول بها.",
    highlights: [
      "معالجة نزاعات الإيجارات والملكية",
      "تدقيق عقود الاستثمار والتطوير العقاري",
      "متابعة إجراءات التوثيق والتراخيص"
    ]
  },
  {
    id: "labor",
    icon: Briefcase,
    title: "قضايا العمل والعمال",
    shortDesc: "تنظيم العلاقات العمالية وتأمين حقوق أطراف العمل.",
    fullDesc: "تقديم التوجيه والدفاع في الخلافات العمالية سواء للمؤسسات والشركات أو للأفراد، إلى جانب صياغة لوائح العمل الداخلية وفق قانون العمل.",
    highlights: [
      "صياغة لوائح عقود العمل للشركات",
      "حل الخلافات ومطالبات المستحقات العمالية",
      "الترافع أمام الهيئات العمالية المختصة"
    ]
  },
  {
    id: "consultation",
    icon: Landmark,
    title: "الاستشارات القانونية العامة",
    shortDesc: "توجيه قانوني دقيق لاتخاذ القرارات السليمة.",
    fullDesc: "تقديم آرائنا وتوصياتنا القانونية المكتوبة والشفهية لمختلف المسائل والشؤون اليومية للأفراد والشركات لتفادي وقوع أي مخالفات أو ثغرات نظامية.",
    highlights: [
      "دراسة المستندات وتقديم الرأي النظامي",
      "استشارات وقائية قبل اتخاذ القرارات",
      "مرافقة قانونية ومتابعة دورية"
    ]
  }
];

// إعدادات أنيميشن الحاوية والقائمة
const listContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listItemVariants: Variants = {
  hidden: { opacity: 0, x: 25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function CategoriesSection() {
  const [activeTab, setActiveTab] = useState<string>(legalServices[0].id);
  const activeService = legalServices.find((s) => s.id === activeTab) || legalServices[0];

  return (
    <section className="py-16 md:py-24 border-b border-slate-800 bg-slate-950 relative overflow-hidden">
      
      {/* لمسة إضاءة خلفية ناعمة */}
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="container-page relative z-10">
        
        {/* العنونة الرئيسية مع انيميشن السكرول */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-800/80 gap-4"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent border border-accent/30 mb-4 shadow-sm">
              <Scale className="h-4 w-4 shrink-0" />
              الخدمات القانونية
            </span>
            <h2 className="text-3xl font-extrabold md:text-4xl text-slate-100 tracking-tight">
              مجالات الاختصاص والخبرة
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-400 max-w-md font-normal leading-relaxed">
            نعتمد منهجية قانونية دقيقة تتوزع على تخصصات محددة لضمان تقديم أعلى درجات الحماية والرأي النظامي السليم.
          </p>
        </motion.div>

        {/* الهيكل الرئيسي: تقسيم شاشة الجانبين (List / Detail Viewer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* الجانب الأيمن: القائمة الرأسية بالتتابع */}
          <motion.div 
            variants={listContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-2.5"
          >
            {legalServices.map((service, index) => {
              const isActive = service.id === activeTab;
              const Icon = service.icon;

              return (
                <motion.button
                  key={service.id}
                  variants={listItemVariants}
                  onClick={() => setActiveTab(service.id)}
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-right p-4 rounded-xl transition-all duration-300 border flex items-center justify-between group relative overflow-hidden ${
                    isActive
                      ? "bg-slate-900 text-slate-100 border-accent/50 shadow-lg shadow-accent/5"
                      : "bg-slate-900/40 text-slate-400 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80 hover:text-slate-200"
                  }`}
                >
                  {/* شريط تمييز التحديد الجانبي */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute right-0 top-0 bottom-0 w-1 bg-accent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center gap-3.5 relative z-10">
                    <div className={`p-2.5 rounded-lg border transition-colors duration-300 ${
                      isActive 
                        ? "bg-accent text-slate-950 border-accent" 
                        : "bg-slate-800/60 text-slate-400 border-slate-700/50 group-hover:bg-slate-800 group-hover:text-accent"
                    }`}>
                      <Icon className="h-5 w-5 shrink-0" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold text-slate-500 block mb-0.5">
                        0{index + 1}
                      </span>
                      <h3 className="text-base font-bold leading-none">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <ArrowLeft className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                    isActive ? "text-accent translate-x-0" : "text-slate-600 opacity-40 group-hover:opacity-100 group-hover:-translate-x-1"
                  }`} />
                </motion.button>
              );
            })}
          </motion.div>

          {/* الجانب الأيسر: عرض تفاصيل الخدمة المحددة مع انيميشن التبديل */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl backdrop-blur-sm relative overflow-hidden"
              >
                {/* خلفية جمالية خفيفة */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-br-full -z-0 pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-bold mb-5">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    <span>تفاصيل الخدمة القانونية</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-100 mb-3">
                    {activeService.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                    {activeService.fullDesc}
                  </p>

                  <div className="border-t border-slate-800 pt-6">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-accent mb-4">
                      أبرز المحاور والإجراءات:
                    </h4>
                    <ul className="space-y-3.5">
                      {activeService.highlights.map((item, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.08 }}
                          className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 font-medium"
                        >
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
                    <a
                      href="#consultation-form"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-200 hover:text-accent transition-colors group"
                    >
                      <span>طلب استشارة في هذا التخصص</span>
                      <ArrowLeft className="h-4 w-4 text-accent transition-transform group-hover:-translate-x-1.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

// Alias لمنع أي خطأ استيراد قديم
export const ServicesSection = CategoriesSection;