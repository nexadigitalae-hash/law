    import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Scale, Gavel, ShieldCheck, ArrowLeft } from "lucide-react";
import { buildHead, PageHeader } from "@/components/site/seo";

const steps = [
  {
    icon: FileText,
    title: "1. تقديم طلب الاستشارة",
    desc: "أدخل بياناتك الشخصية وتفاصيل الموضوع القانوني أو القضية بأسلوب موجز عبر النموذج المخصص.",
  },
  {
    icon: Scale,
    title: "2. المراجعة والدراسة الأولية",
    desc: "يقوم فريق المستشارين بدراسة الوقائع وتحديد الإطار القانوني المناسب والمستندات المطلوبة.",
  },
  {
    icon: Gavel,
    title: "3. التواصل والتوجيه القانوني",
    desc: "نتواصل معك لتحديد موعد الاستشارة (حضوريًا أو افتراضيًا) وتقديم الخطة والحلول القانونية الموصى بها.",
  },
  {
    icon: ShieldCheck,
    title: "4. الترافع والمتابعة المستمرة",
    desc: "في حال الحاجة للتمثيل القضائي، نتولى صياغة اللوائح وإجراءات الترافع مع إبقائك على اطلاع بكافة المستجدات.",
  },
];

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    buildHead({
      title: "آلية العمل والخدمات القانونية | مكتب السالمي للمحاماة",
      description:
        "تعرف على كيفية تقديم طلب الاستشارة القانونية ومراحل دراسة القضايا والترافع عبر مكتب السالمي للمحاماة والاستشارات القانونية خطوة بخطوة.",
      path: "/how-it-works",
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "آلية العمل", path: "/how-it-works" },
      ],
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "طريقة طلب استشارة قانونية ومتابعة القضايا لدى مكتب السالمي للمحاماة",
        description: "خطوات بسيطة ومنظمة للحصول على تمثيل واستشارات قانونية احترافية في الإمارات.",
        step: steps.map((s, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: s.title,
          itemListElement: [
            {
              "@type": "HowToDirection",
              text: s.desc,
            },
          ],
        })),
      },
    }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="آلية العمل"
        title="خطوات الحصول على خدماتنا القانونية"
        description="صمّمنا منهجية عملنا لتضمن السرية التامة والسرعة والدقة في تقديم الاستشارات القانونية ومتابعة القضايا."
      />

      <section className="container-page py-16">
        <ol className="grid gap-6 md:grid-cols-2">
          {steps.map((s) => (
            <li key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <s.icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-5 text-xl font-bold">{s.title}</h2>
              <p className="mt-2 leading-7 text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-3xl border border-border bg-secondary/50 p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">هل تحتاج إلى استشارة قانونية؟</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            أرسل تفاصيل استفسارك الآن وسيقوم فريق المستشارين بمراجعة ملفك والتواصل معك فوراً.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-elegant"
          >
            طلب استشارة قانونية
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}




