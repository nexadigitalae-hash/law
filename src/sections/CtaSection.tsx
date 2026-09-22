"use client";

import { ArrowLeft, Scale } from "lucide-react";

interface CtaSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function CtaSection({ onPrimaryClick }: CtaSectionProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-slate-dark p-8 text-center text-white shadow-card md:p-14">
          
          {/* خلفية شبكية خفيفة */}
          <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <h2 className="mx-auto max-w-2xl text-2xl font-extrabold md:text-4xl leading-tight">
            لا تتنازل عن حقوقك القانونية.. اطلب استشارتك الآن بأسلوب موثوق ومعتمد
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm md:text-base text-white/80 leading-relaxed font-normal">
            فريقنا القانوني متواجد لتقديم التوجيه والرأي النظامي السليم وحماية كافة مصالحك وأعمالك بدقة وسرية مطلقة.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#consultation-form"
              onClick={onPrimaryClick}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-accent px-8 py-3.5 text-base font-bold text-slate-dark shadow-lg transition-all duration-200 hover:bg-amber-400 active:scale-95"
            >
              <Scale className="h-5 w-5 shrink-0 text-slate-dark transition-transform group-hover:scale-110" />
              <span>ابدأ طلب الاستشارة الآن</span>
              <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}