import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  ShieldCheck,
  FileCheck,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { buildHead } from "@/components/site/seo";

export const Route = createFileRoute("/thank-you")({
  head: () =>
    buildHead({
      title: "تم استلام طلب الاستشارة بنجاح | مكتب عبد الله السالمي للمحاماة",
      description:
        "شكراً لتواصلك مع مكتب عبد الله السالمي للمحاماة والاستشارات القانونية. تم استلام طلبك وبدأت عملية المراجعة الأولية.",
      path: "/thank-you",
    }),
  component: ThankYouPage,
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
  },
};

function ThankYouPage() {
  return (
    <section dir="rtl" className="relative min-h-screen bg-slate-50 py-12 md:py-20 flex items-center justify-center overflow-hidden">
      {/* خلفية ضوئية راقية */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200/50 blur-3xl rounded-full" />
      </div>

      <div className="container-page relative z-10 mx-auto max-w-4xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* 1. قسم العنونة الرئيسي مع أيقونة النجاح */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="relative inline-flex items-center justify-center mb-6">
              {/* توهج الأيقونة */}
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-150" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 ring-8 ring-emerald-50">
                <Check className="h-10 w-10 stroke-[2.5]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700 mb-4 shadow-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              تم تسجيل الطلب بنجاح
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              تم استلام استفسارك القانوني
            </h1>

            <p className="mt-4 mx-auto max-w-xl text-slate-600 text-base md:text-lg leading-relaxed font-normal">
              شكرًا لثقتك بـ{" "}
              <span className="font-bold text-slate-900">مكتب عبد الله السالمي للمحاماة</span>
              . فريق المستشارين يعمل الآن على مراجعة ملفك بعناية لتوجيه الخطوة النظامية القادمة.
            </p>
          </motion.div>

          {/* 2. بطاقات مراحل معالجة الطلب */}
          <motion.div variants={itemVariants} className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 text-accent">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">حالة الاستجابة</span>
                  <span className="text-base font-bold text-slate-900">جاري فحص المستندات والوقائع</span>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                <Clock3 className="h-4 w-4 text-accent" />
                خِلال 24 ساعة عمل
              </div>
            </div>

            {/* خطة الخطوات المتتالية */}
            <div className="grid gap-6 md:grid-cols-3 relative">
              {/* مرحلة 1 */}
              <div className="relative flex flex-col items-start p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-sm">
                    1
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">التسجيل والتوثيق</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  تم إدراج بيانات الاستشارة بأمان في نظام الأرشيف الخاص بالمكتب.
                </p>
              </div>

              {/* مرحلة 2 */}
              <div className="relative flex flex-col items-start p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-slate-950 font-bold text-sm">
                    2
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">الدراسة النظامية</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  مراجعة الأطر واللوائح القانونية المحددة للطلب لتقييم الموقف.
                </p>
              </div>

              {/* مرحلة 3 */}
              <div className="relative flex flex-col items-start p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-600 font-bold text-sm">
                    3
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">التواصل والتوجيه</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  التواصل المباشر عبر الهاتف أو البريد لتحديد موعد الجلسة أو تسليم الرأي.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 3. تنويه المتابعة والتأكيد */}
          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">تابع وسائل التواصل</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  يرجى الانتباه للإشعارات الواردة على هاتفك أو بريدك الإلكتروني المسجل.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">سرية قانونية تامة</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  جميع الوثائق والمعاملات تُعامل بمنتهى السرية والخصوصية المتبعة.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 4. الأزرار والإجراءات */}
          <motion.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition-all duration-300 hover:bg-slate-800 active:scale-95"
            >
              <span>العودة للرئيسية</span>
              <ArrowLeft className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}