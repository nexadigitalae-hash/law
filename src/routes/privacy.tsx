import { createFileRoute } from "@tanstack/react-router";
import { buildHead, PageHeader } from "@/components/site/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildHead({
      // 1. عنوان واضح ومباشر مرتبط باسم المكتب
      title: "سياسة الخصوصية | مكتب عبد الله السالمي للمحاماة",

      // 2. وصف دقيق وشامل لنتائج البحث
      description:
        "تعرّف على سياسة الخصوصية وحماية البيانات في مكتب عبد الله السالمي للمحاماة والاستشارات القانونية: آلية جمع واستخدام وحماية بيانات العميل والسرية المهنية.",

      path: "/privacy",

      // 3. مسار التنقل لـ Breadcrumbs
      breadcrumbs: [
        { name: "الرئيسية", path: "/" },
        { name: "سياسة الخصوصية", path: "/privacy" },
      ],
    }) as any,
  component: PrivacyPage,
});

const CONTACT_EMAIL = "info@alsalmi-law.com";

function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="قانوني"
        title="سياسة الخصوصية"
        description="نلتزم بأعلى معايير السرية المهنية وحماية بياناتك. يوضح هذا المستند نوع البيانات التي نجمعها وكيف نضمن حمايتها واستخدامها."
      />
      <article className="container-page prose prose-neutral mx-auto max-w-3xl py-14 leading-8">
        <p className="text-sm text-muted-foreground">آخر تحديث: 14 يوليو 2026</p>

        <h2 className="mt-8 text-xl font-bold">1. المعلومات التي نجمعها</h2>
        <ul className="mt-3 list-disc space-y-1 pr-5 text-muted-foreground">
          <li>بيانات التعريف الشخصية: الاسم، البريد الإلكتروني، رقم الهاتف، والإمارة.</li>
          <li>تفاصيل الاستشارة أو القضية: المستندات والمعلومات التي توفرها في نموذج طلب الاستشارة القانونية.</li>
          <li>بيانات تقنية: عنوان IP، نوع المتصفح، ووقت الزيارة (لأغراض الأمان وتحسين أداء الموقع).</li>
        </ul>

        <h2 className="mt-8 text-xl font-bold">2. الغرض من جمع البيانات والسرية المهنية</h2>
        <p className="mt-2 text-muted-foreground">
          نستخدم بياناتك لتولّي وتقديم الاستشارات القانونية والتواصل معك بشأن قضيتك، ومتابعة الإجراءات القضائية والقانونية، وذلك في إطار الالتزام التام بأعلى درجات السرية المهنية المحمية بموجب قانون المحاماة والأنظمة المعمول بها في الإمارات.
        </p>

        <h2 className="mt-8 text-xl font-bold">3. التخزين والاحتفاظ بالبيانات</h2>
        <p className="mt-2 text-muted-foreground">
          تُخزَّن البيانات في خوادم آمنة ومشفّرة. ونحتفظ بالملفات والبيانات القانونية للمدة التي يحددها قانون المحاماة والإجراءات التشغيلية للمكتب للتأكد من حماية حقوق موكلينا على الأكمل.
        </p>

        <h2 className="mt-8 text-xl font-bold">4. ملفات تعريف الارتباط (Cookies)</h2>
        <p className="mt-2 text-muted-foreground">
          نستخدم ملفات تعريف الارتباط الضرورية لتشغيل الموقع الإلكتروني وتحسين تجربة المستخدم، بالإضافة إلى أدوات تحليليّة تساعدنا في تحسين جودة خدماتنا الإلكترونية.
        </p>

        <h2 className="mt-8 text-xl font-bold">5. مشاركة البيانات والإفصاح</h2>
        <p className="mt-2 text-muted-foreground">
          نحن لا نبيع أو نشارك بياناتك مع أي طرف ثالث لأغراض تسويقية. يتم الإفصاح عن البيانات فقط للجهات القضائية والحكومية المعنية عند اقتضاء الضرورة الإجرائية في القضية أو بموجب أمر قضائي نافذ.
        </p>

        <h2 className="mt-8 text-xl font-bold">6. الأمان والتشفير</h2>
        <p className="mt-2 text-muted-foreground">
          نطبّق إجراءات أمنية وحماية تقنية وتنظيمية مشددة لحماية مستنداتك وبياناتك الشخصية ضد أي وصول غير مصرح به، التعديل، أو الضياع.
        </p>

        <h2 className="mt-8 text-xl font-bold">7. حقوقك</h2>
        <ul className="mt-3 list-disc space-y-1 pr-5 text-muted-foreground">
          <li>حق طلب الاطلاع على ملف البيانات والاستشارات الخاصة بك.</li>
          <li>حق طلب تعديل أو تصحيح المعلومات والبيانات الشخصية.</li>
          <li>حق طلب حذف أو أرشفة البيانات طبقًا للضوابط والالتزامات القانونية.</li>
        </ul>
        <p className="mt-3 text-muted-foreground">
          لممارسة أي من هذه الحقوق أو للاستفسار، يُرجى التواصل معنا عبر البريد الإلكتروني:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline" dir="ltr">
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <h2 className="mt-8 text-xl font-bold">8. تحديث السياسة</h2>
        <p className="mt-2 text-muted-foreground">
          قد نحدث سياسة الخصوصية من وقت لآخر لمواكبة التغيرات التشغيلية أو التحديثات التشريعية. سيتم إعلان أي تعديلات على هذه الصفحة مع تحديث تاريخ المراجعة.
        </p>
      </article>
    </>
  );
}