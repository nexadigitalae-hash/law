import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Clock, Timer, HelpCircle, Phone, MapPin } from "lucide-react";
import { buildHead, PageHeader } from "@/components/site/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildHead({
      title: "تواصل معنا | مكتب السالمي للمحاماة والاستشارات القانونية",
      description:
        "تواصل مع فريق المحامين والمستشارين القانونيين في مكتب السالمي للمحاماة بالكتداب والإمارات. نرد على كافة الاستفسارات وحجز المواعيد خلال 24 ساعة.",
      path: "/contact",
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "تواصل معنا", path: "/contact" },
      ],
    }),
  component: ContactPage,
});

const CONTACT_EMAIL = "info@alsalmilaw.ae";
const CONTACT_PHONE = "+971 4 123 4567";

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="تواصل معنا"
        title="نحن هنا للحفاظ على حقوقك ومصالحك"
        description="سواء كنت بحاجة إلى استشارة قانونية، أو حجز موعد لمراجعة قضية، أو استفسار عام، يسعدنا التواصل معك عبر قنواتنا الرسمية."
      />

      <section className="container-page grid gap-4 py-14 md:grid-cols-2 lg:grid-cols-3">
        <InfoCard icon={Mail} title="البريد الإلكتروني">
          <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr" className="text-primary underline font-medium">
            {CONTACT_EMAIL}
          </a>
        </InfoCard>

        <InfoCard icon={Phone} title="الهاتف المباشر">
          <a href={`tel:${CONTACT_PHONE}`} dir="ltr" className="text-primary underline font-medium">
            {CONTACT_PHONE}
          </a>
        </InfoCard>

        <InfoCard icon={MapPin} title="العنوان والمقر">
          دبي، الإمارات العربية المتحدة
          <br />
          شارع الشيخ زايد، برج الأعمال - الدور 14
        </InfoCard>

        <InfoCard icon={Clock} title="ساعات العمل الرسمية">
          من الأحد إلى الخميس
          <br />
          8:30 صباحًا – 5:30 مساءً (بتوقيت الإمارات)
        </InfoCard>

        <InfoCard icon={Timer} title="سرعة الرد والمتابعة">
          معالجة الاستفسارات وحجز المواعيد خلال 24 ساعة عمل.
        </InfoCard>

        <InfoCard icon={HelpCircle} title="الاستفسارات الشائعة">
          هل تود الاطلاع على آلية الاستشارات؟ تفقد{" "}
          <Link to="/faq" className="text-primary underline font-medium">
            صفحة الأسئلة الشائعة
          </Link>
          .
        </InfoCard>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Mail;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/15 text-primary">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <div className="mt-3 text-sm leading-7 text-muted-foreground">{children}</div>
    </div>
  );
}