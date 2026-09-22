import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, CheckCircle2, XCircle, Scale, Gavel, ShieldCheck } from "lucide-react";
import { buildHead, PageHeader } from "@/components/site/seo";
import { IndependenceNotice } from "@/components/site/IndependenceNotice";

export const Route = createFileRoute("/about")({
  head: () =>
    buildHead({
      // 1. عنوان محسن يدمج اسم المكتب والخدمات القانونية
      title: "من نحن | مكتب السالمي للمحاماة والاستشارات القانونية - الإمارات",
      
      // 2. وصف محدد لنتائج البحث حول الخبرة والخدمات
      description:
        "تعرّف على مكتب السالمي للمحاماة والاستشارات القانونية في دولة الإمارات العربية المتحدة: رؤيتنا ومهمتنا في تقديم التمثيل القانوني، الاستشارات، وتغطية النزاعات التجارية والمدنية.",
      
      path: "/about",
      
      // 3. مسار التنقل لـ Google Rich Results
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "من نحن", path: "/about" },
      ],
    }),
  component: AboutPage,
});

const values = [
  { 
    icon: Target, 
    title: "مهمتنا", 
    desc: "تقديم حلول واستشارات قانونية متكاملة تحمي مصالح موكلينا وحقوقهم وفق التشريعات النافذة في دولة الإمارات." 
  },
  { 
    icon: Eye, 
    title: "رؤيتنا", 
    desc: "أن نكون الشريك القانوني الأول الموثوق للأفراد والشركات والمستثمرين عبر تقديم تمثيل قانوني رفيع المستوى." 
  },
  { 
    icon: Heart, 
    title: "قيمنا", 
    desc: "النزاهة المطلقة، السرية التامة للمعلومات، الشفافية، والالتزام بأعلى معايير أخلاقيات مهنة المحاماة." 
  },
];

const provide = [
  "تقديم الاستشارات القانونية الشاملة في مختلف القطاعات.",
  "التمثيل القضائي وصياغة اللوائح أمام مختلف محاكم دولة الإمارات.",
  "صياغة ومراجعة العقود التجارية والاتفاقيات الاستثمارية.",
  "متابعة وتسوية النزاعات المالية والعقارية والعمالية ودياً وقضائياً.",
];

const dontProvide = [
  "لا نضمن نتائج أحكام القضاء، حيث يخضع ذلك لسلطة المحاكم التقديرية.",
  "لا نقدّم استشارات قانونية مجانية للحالات المعقدة دون مراجعة المستندات.",
  "لا نضمن السير في الإجراءات دون استيفاء المستندات والرسوم القضائية الرسمية.",
  "لا نتعامل مع القضايا خارج إطار القوانين المنظمة للأنشطة والتشريعات في الإمارات.",
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="من نحن"
        title="مكتب محاماة واستشارات قانونية موثوق في الإمارات"
        description="نرافقك في حماية حقوقك ومصالحك التجارية والشخصية عبر فريق متمرس من المحامين والمستشارين القانونيين."
      />

      <section className="container-page py-14">
        <IndependenceNotice />
      </section>

      <section className="container-page grid gap-6 pb-16 md:grid-cols-3">
        {values.map((v) => (
          <article key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-primary">
              <v.icon className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-xl font-bold">{v.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{v.desc}</p>
          </article>
        ))}
      </section>

      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="container-page prose prose-neutral max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">مسيرتنا القانونية</h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            تأسس المكتب بهدف تقديم ممارسات قانونية استثنائية تجمع بين الفهم العميق للتشريعات المحلية في دولة الإمارات العربية المتحدة والخبرة العملية في التعامل مع مختلف القضايا والنزاعات. نؤمن بأن الوقاية القانونية والتخطيط السليم يجنبان الأفراد والشركات الكثير من المخاطر المستقبليّة.
          </p>
          <p className="mt-4 leading-8 text-muted-foreground">
            نعمل كفريق قانوني متكامل يضع سرية الموكل ومصلحته في مقدمة الأولويات، متبعين أعلى معايير الحوكمة والشفافية في متابعة القضايا والاستشارات.
          </p>
          <h3 className="mt-10 text-xl font-bold">آلية معالجة ملفات الاستشارات والترافع</h3>
          <ol className="mt-4 list-decimal space-y-2 pr-5 text-muted-foreground">
            <li>استلام الطلب أو دراسة ملف القضية والمستندات ذات الصلة.</li>
            <li>تقييم الموقف القانوني وتحديد الخيارات والإجراءات المتاحة بكل شفافية.</li>
            <li>إعداد اللوائح وصياغة العقود أو الترافع أمام الجهات القضائية والرسمية.</li>
            <li>إبقاؤك على اطلاع دوري عبر التحديثات التقنية والتقارير القانونية.</li>
          </ol>
        </div>
      </section>

      <section className="container-page grid gap-6 py-16 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h3 className="text-xl font-bold">نطاق خدماتنا</h3>
          <ul className="mt-4 space-y-3">
            {provide.map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm leading-7 text-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h3 className="text-xl font-bold">محددات العمل والالتزام</h3>
          <ul className="mt-4 space-y-3">
            {dontProvide.map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm leading-7 text-foreground">
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}