"use client";

import { FileCheck2 } from "lucide-react";
import { ComplaintForm } from "@/components/site/ComplaintForm";

export function ComplaintFormSection() {
  return (
    <section 
      aria-label="قسم تقديم الشكوى التجارية"
      className="border-b border-border bg-slate-50/80 py-12 md:py-16"
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-dark">
            <FileCheck2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            النموذج المعتمد
          </span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl text-slate-dark">
            اطلب استشارتك القانونية الآن
          </h2>
          <p className="mt-3 text-base text-muted leading-relaxed font-medium">
            يرجى تعبئة البيانات وتوضيح تفاصيل استفسارك بدقة، وسيتم مراجعة طلبك والتواصل معك من قبل الفريق القانوني لتقديم التوجيه المناسب.
          </p>
        </div>

        {/* غلاف النموذج المزود بحد أدنى للارتفاع لمنع الـ CLS */}
        <div 
          id="consultation-form" 
          aria-label="نموذج طلب الاستشارة القانونية"
          data-webmcp-tool="consultation_submission"
          className="mx-auto mt-8 max-w-4xl scroll-mt-20 min-h-[500px]"
        >
          <ComplaintForm />
        </div>
      </div>
    </section>
  );
}