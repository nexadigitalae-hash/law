import { createFileRoute } from "@tanstack/react-router";
import { useCallback, lazy, Suspense } from "react";
import { buildHead } from "@/components/site/seo";

// تحسين LCP: تحميل القسم الأول ونموذج طلب الاستشارة فوراً
import { HeroSection } from "@/sections/HeroSection";
import { faqPreview } from "@/sections/FaqSection";

// تحسين TBT و Unused JS: تحميل باقي الأقسام كسولياً (Lazy Loading)
const HowItWorksSection = lazy(() =>
  import("@/sections/HowItWorksSection").then((m) => ({ default: m.HowItWorksSection }))
);
const WhyUsSection = lazy(() =>
  import("@/sections/WhyUsSection").then((m) => ({ default: m.WhyUsSection }))
);
const FaqSection = lazy(() =>
  import("@/sections/FaqSection").then((m) => ({ default: m.FaqSection }))
);
const CtaSection = lazy(() =>
  import("@/sections/CtaSection").then((m) => ({ default: m.CtaSection }))
);

/* ==========================================================================
   TanStack Router Route Definition (Home Page - /)
   ========================================================================== */
export const Route = createFileRoute("/")({
  head: () => {
    const baseHead = buildHead({
      title: "مكتب عبد الله السالمي للمحاماة والاستشارات القانونية | الإمارات",
      description:
        "مكتب عبد الله السالمي للمحاماة يقدم أفضل الاستشارات القانونية والترافع أمام المحاكم بكفاءة وسرية مطلقة في كافة أنواع القضايا بالدولة.",
      path: "/",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "مكتب عبد الله السالمي للمحاماة والاستشارات القانونية",
          alternateName: "Al Salmi Law Firm",
          inLanguage: "ar",
          url: "https://alsalmi-law.com/",
        },
        {
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "مكتب عبد الله السالمي للمحاماة والاستشارات القانونية",
          url: "https://alsalmi-law.com/",
          logo: "https://alsalmi-law.com/logo.png",
          image: "https://alsalmi-law.com/og-image.jpg",
          address: {
            "@type": "PostalAddress",
            addressCountry: "AE",
            addressRegion: "Dubai / Abu Dhabi",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "1420",
            bestRating: "5",
            worstRating: "1",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "تقديم الاستشارات القانونية والترافع القضائي",
          serviceType: "خدمات قانونية واستشارات قانونية متخصصة",
          provider: {
            "@type": "LegalService",
            name: "مكتب عبد الله السالمي للمحاماة والاستشارات القانونية",
            url: "https://alsalmi-law.com",
          },
          areaServed: {
            "@type": "Country",
            name: "United Arab Emirates",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqPreview.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        },
      ],
    });

    return {
      ...baseHead,
      links: [
        ...(baseHead.links || []),
        {
          rel: "preload",
          href: "/fonts/tajawal-v12-latin-regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/tajawal-v12-latin-700.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      ],
    };
  },
  component: HomePage,
});

/* ==========================================================================
   Main HomePage Component
   ========================================================================== */
function HomePage() {
  // دالة للتمرير الانسيابي والتركيز على نموذج طلب الاستشارة
  const scrollToForm = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    requestAnimationFrame(() => {
      const el = document.getElementById("consultation-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        const firstInput = el.querySelector<HTMLElement>(
          "input:not([type='hidden']), select, textarea"
        );
        if (firstInput) {
          setTimeout(() => firstInput.focus({ preventScroll: true }), 350);
        }
      }
    });
  }, []);

  return (
    <>
      {/* الأقسام الهامة فوراً لتحقيق أقصى سرعة LCP */}
      <HeroSection onPrimaryClick={scrollToForm} />
      <ConsultationFormSection />

      {/* الأقسام الثانوية عبر Suspense */}
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <HowItWorksSection />
        <WhyUsSection onPrimaryClick={scrollToForm} />
        <FaqSection />
        <CtaSection onPrimaryClick={scrollToForm} />
      </Suspense>
    </>
  );
}

// Keep the form section local so the route does not depend on a missing module.
function ConsultationFormSection() {
  return (
    <section id="consultation-form" aria-labelledby="consultation-form-title">
      <h2 id="consultation-form-title">طلب استشارة قانونية</h2>
      <form>
        <label>
          الاسم
          <input name="name" type="text" required />
        </label>
        <label>
          البريد الإلكتروني
          <input name="email" type="email" required />
        </label>
        <label>
          تفاصيل الاستشارة
          <textarea name="message" required />
        </label>
        <button type="submit">إرسال الطلب</button>
      </form>
    </section>
  );
}