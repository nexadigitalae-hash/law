"use client";

import { useNavigate } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { z } from "zod";
import { 
  Loader2, 
  Send, 
  AlertCircle, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Briefcase, 
  Scale 
} from "lucide-react";
import { submitComplaint } from "@/lib/submit-complaint.functions";

const statuses = ["فرد (مواطن/مقيم)", "شركة / مؤسسة", "مستثمر أجنبي"];

const emirates = [
  "أبوظبي",
  "دبي",
  "الشارقة",
  "عجمان",
  "أم القيوين",
  "رأس الخيمة",
  "الفجيرة",
];

const categories = [
  "استشارة قانونية عامة",
  "قضايا تجارية وشركات",
  "قضايا عقارية ومقاولات",
  "نزاعات مالية وتحصيل ديون",
  "قضايا عمالية",
  "الملكية الفكرية والعقود",
  "قضايا أحوال شخصية وتركات",
  "تمثيل قضائي وترافع",
];

const NAME_REGEX = /^[A-Za-z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s'\-]+$/;

function normalizePhone(v: string) {
  return v.replace(/[\s()\-]/g, "");
}

const UAE_PHONE_REGEX = /^(?:\+9715\d{8}|05\d{8})$/;

const DEVICE_ID_KEY = "alsalmi_device_id";
function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return `nostorage-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "الرجاء إدخال الاسم الكامل (3 أحرف على الأقل)")
    .max(100, "الحد الأقصى 100 حرف")
    .regex(NAME_REGEX, "يُسمح فقط بالحروف العربية والإنجليزية والمسافات والشرطة (-) والفاصلة العليا (')"),
  phone: z
    .string()
    .trim()
    .transform(normalizePhone)
    .pipe(
      z
        .string()
        .regex(
          UAE_PHONE_REGEX,
          "رقم هاتف غير صحيح. استخدم الصيغة +9715XXXXXXXX أو 05XXXXXXXX",
        ),
    ),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("البريد الإلكتروني غير صحيح")
    .max(255, "الحد الأقصى 255 حرف"),
  status: z.string().min(1, "الرجاء اختيار وصف الصفة"),
  emirate: z.string().min(1, "الرجاء اختيار الإمارة"),
  category: z.string().min(1, "الرجاء اختيار نوع الاستشارة"),
  details: z
    .string()
    .trim()
    .min(30, "الرجاء توضيح الاستفسار بما لا يقل عن 30 حرفاً")
    .max(2000, "الحد الأقصى 2000 حرف"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "يجب الموافقة على شروط السرية وسياسة الخصوصية" }),
  }),
  website: z.string().max(0).optional().or(z.literal("")),
});

type RawValues = {
  fullName?: string;
  phone?: string;
  email?: string;
  status?: string;
  emirate?: string;
  category?: string;
  details?: string;
  consent?: boolean;
  website?: string;
};
type FieldKey = keyof RawValues;
type Errors = Partial<Record<FieldKey, string>>;
type Touched = Partial<Record<FieldKey, boolean>>;

function validateField(key: FieldKey, values: RawValues): string | undefined {
  const payload = { ...values, website: values.website ?? "" };
  const res = schema.safeParse(payload);
  if (res.success) return undefined;
  const issue = res.error.issues.find((i) => i.path[0] === key);
  return issue?.message;
}

export function ComplaintForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState<RawValues>({});
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submittingRef = useRef(false);

  const update = useCallback(<K extends FieldKey>(key: K, v: RawValues[K]) => {
    setValues((s) => {
      const next = { ...s, [key]: v };
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const err = validateField(key, next);
        if (!err) {
          const { [key]: _omit, ...rest } = prev;
          return rest;
        }
        return prev;
      });
      return next;
    });
  }, []);

  const handleBlur = useCallback(
    (key: FieldKey) => {
      setTouched((t) => ({ ...t, [key]: true }));
      const err = validateField(key, values);
      setErrors((prev) => {
        if (err) return { ...prev, [key]: err };
        if (!prev[key]) return prev;
        const { [key]: _omit, ...rest } = prev;
        return rest;
      });
    },
    [values],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "submit_consultation_click",
        form_name: "legal_consultation_form",
      });
    }

    const parsed = schema.safeParse({ ...values, website: values.website ?? "" });
    if (!parsed.success) {
      const errs: Errors = {};
      const allTouched: Touched = {};
      for (const iss of parsed.error.issues) {
        const k = iss.path[0] as FieldKey;
        if (!errs[k]) errs[k] = iss.message;
        allTouched[k] = true;
      }
      setErrors(errs);
      setTouched((t) => ({ ...t, ...allTouched }));
      const firstKey = parsed.error.issues[0]?.path[0] as FieldKey | undefined;
      if (firstKey) {
        const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
        el?.focus();
      }
      return;
    }

    if ((values.website ?? "").length > 0) {
      navigate({ to: "/thank-you" });
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const url = new URL(window.location.href);
      await submitComplaint({
        data: {
          fullName: parsed.data.fullName,
          phone: parsed.data.phone,
          email: parsed.data.email,
          status: parsed.data.status,
          emirate: parsed.data.emirate,
          category: parsed.data.category,
          details: parsed.data.details,
          deviceId: getDeviceId(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
          userAgent: navigator.userAgent ?? "",
          language: navigator.language ?? "",
          screenSize: `${window.screen?.width ?? 0}x${window.screen?.height ?? 0}`,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          pageUrl: window.location.href,
          source: url.searchParams.get("utm_source") ?? "",
          medium: url.searchParams.get("utm_medium") ?? "",
          campaign: url.searchParams.get("utm_campaign") ?? "",
          referrer: document.referrer ?? "",
        },
      });

      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "consultation_submitted",
          form_name: "legal_consultation",
        });
      }

      navigate({ to: "/thank-you" });
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("تجاوزت الحد") || msg.includes("RATE_LIMITED_24H")) {
        setSubmitError("لقد تجاوزت الحد الأقصى للطلبات اليومية، يُرجى المحاولة بعد 24 ساعة.");
      } else {
        setSubmitError("تعذّر إرسال الطلب حالياً. يُرجى التثبت من الاتصال والمحاولة مجدداً.");
      }
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  const fieldState = (key: FieldKey): "error" | "valid" | "idle" => {
    if (errors[key]) return "error";
    if (touched[key]) {
      const val = values[key];
      if (val === undefined || val === "" || val === false) return "idle";
      return validateField(key, values) ? "error" : "valid";
    }
    return "idle";
  };

  return (
    <div id="consultation-form" className="relative overflow-hidden rounded-3xl border border-border/80 bg-white shadow-card p-6 md:p-10">
      {/* لمسة رأس النماذج القانونية */}
      <div className="mb-8 border-b border-border/60 pb-6">
        <div className="flex items-center gap-2.5 text-accent font-bold text-xs uppercase tracking-widest mb-1">
          <Scale className="h-4 w-4 shrink-0" />
          <span>سرية وتشفير تام للمعلومات</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-dark md:text-3xl">طلب استشارة قانونية جديدة</h3>
        <p className="mt-1.5 text-sm text-muted">أدخل بيانات الطلب وسيقوم فريق المستشارين بمراجعة ملفك في أقرب وقت.</p>
      </div>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        aria-busy={submitting}
      >
        <fieldset className="grid gap-5 md:grid-cols-2" disabled={submitting}>

          {/* الاسم الكامل */}
          <Field label="الاسم الكامل" name="fullName" error={errors.fullName} required icon={User}>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="مثال: عبد الله محمد الشامسي"
              value={values.fullName ?? ""}
              onChange={(e) => update("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              aria-invalid={fieldState("fullName") === "error" || undefined}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className={inputClsFor(fieldState("fullName"))}
              required
            />
          </Field>

          {/* رقم الهاتف */}
          <Field label="رقم الهاتف" name="phone" error={errors.phone} required icon={Phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              dir="ltr"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+971 50 000 0000"
              value={values.phone ?? ""}
              onChange={(e) => update("phone", e.target.value)}
              onBlur={() => handleBlur("phone")}
              aria-invalid={fieldState("phone") === "error" || undefined}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClsFor(fieldState("phone"))}
              required
            />
          </Field>

          {/* البريد الإلكتروني */}
          <Field label="البريد الإلكتروني" name="email" error={errors.email} required icon={Mail}>
            <input
              id="email"
              name="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              inputMode="email"
              placeholder="name@domain.com"
              value={values.email ?? ""}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              aria-invalid={fieldState("email") === "error" || undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClsFor(fieldState("email"))}
              required
            />
          </Field>

          {/* صفة مقدم الطلب */}
          <Field label="الصفة" name="status" error={errors.status} required icon={Briefcase}>
            <select
              id="status"
              name="status"
              value={values.status ?? ""}
              onChange={(e) => update("status", e.target.value)}
              onBlur={() => handleBlur("status")}
              aria-invalid={fieldState("status") === "error" || undefined}
              aria-describedby={errors.status ? "status-error" : undefined}
              className={inputClsFor(fieldState("status"))}
              required
            >
              <option value="">اختر صفة مقدم الطلب</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          {/* الإمارة */}
          <Field label="الإمارة" name="emirate" error={errors.emirate} required icon={MapPin}>
            <select
              id="emirate"
              name="emirate"
              value={values.emirate ?? ""}
              onChange={(e) => update("emirate", e.target.value)}
              onBlur={() => handleBlur("emirate")}
              aria-invalid={fieldState("emirate") === "error" || undefined}
              aria-describedby={errors.emirate ? "emirate-error" : undefined}
              className={inputClsFor(fieldState("emirate"))}
              required
            >
              <option value="">اختر الإمارة</option>
              {emirates.map((em) => (
                <option key={em} value={em}>
                  {em}
                </option>
              ))}
            </select>
          </Field>

          {/* نوع الاستشارة */}
          <Field label="تصنيف الخدمة / موضوع القضية" name="category" error={errors.category} required icon={Scale}>
            <select
              id="category"
              name="category"
              value={values.category ?? ""}
              onChange={(e) => update("category", e.target.value)}
              onBlur={() => handleBlur("category")}
              aria-invalid={fieldState("category") === "error" || undefined}
              aria-describedby={errors.category ? "category-error" : undefined}
              className={inputClsFor(fieldState("category"))}
              required
            >
              <option value="">اختر التصنيف القانوني</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          {/* تفاصيل موضوع الاستشارة */}
          <div className="md:col-span-2">
            <Field label="ملخص موضوع الاستشارة أو الموضوع القانوني" name="details" error={errors.details} required icon={FileText}>
              <textarea
                id="details"
                name="details"
                rows={5}
                maxLength={2000}
                value={values.details ?? ""}
                onChange={(e) => update("details", e.target.value)}
                onBlur={() => handleBlur("details")}
                aria-invalid={fieldState("details") === "error" || undefined}
                aria-describedby={
                  errors.details ? "details-error details-count" : "details-count"
                }
                className={inputClsFor(fieldState("details")) + " resize-y min-h-[120px]"}
                placeholder="اشرح وقائع الموضوع بشكل موجز مع إيضاح التواريخ والمستندات المتوفرة..."
                required
              />
            </Field>

            {/* تم نقل التنبيه والعداد ليصبحا خارج div الخاص بالمكون Field وتحت آخر div للـ textarea مباشرة */}
            <div className="mt-1.5 flex items-center justify-between text-xs text-muted">
              <span>يرجى عدم مشاركة أرقام الحسابات البنكية أو كلمات المرور.</span>
              <span id="details-count" className="font-mono">{(values.details?.length ?? 0)}/2000</span>
            </div>
          </div>

          {/* حقل المصيدة (Honeypot) */}
          <div aria-hidden className="hidden">
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website ?? ""}
                onChange={(e) => update("website", e.target.value)}
              />
            </label>
          </div>

          {/* التعهد والموافقات */}
          <div className="md:col-span-2 mt-2">
            <label className="flex items-start gap-3 text-sm group cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                className={`mt-1 h-4 w-4 rounded border-border text-slate-dark focus:ring-accent ${
                  errors.consent ? "border-red-600 ring-2 ring-red-500/20" : ""
                }`}
                checked={values.consent === true}
                onChange={(e) => update("consent", e.target.checked as true)}
                onBlur={() => handleBlur("consent")}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                required
              />
              <span className="leading-relaxed text-muted font-normal select-none">
                أوافق على{" "}
                <a href="/privacy" className="text-slate-dark font-bold underline hover:text-accent transition-colors">
                  سياسة السرية والخصوصية
                </a>{" "}
                و{" "}
                <a href="/terms" className="text-slate-dark font-bold underline hover:text-accent transition-colors">
                  الشروط والأحكام
                </a>
                ، وأقرّ بصحة المعلومات المذكورة أعلاه.
              </span>
            </label>
            {errors.consent && (
              <p
                id="consent-error"
                role="alert"
                className="mt-2 text-xs font-bold text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1.5"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errors.consent}
              </p>
            )}
          </div>

          {/* زر التقديم وأخطاء النظام */}
          <div className="md:col-span-2 mt-4">
            {submitError && (
              <p
                role="alert"
                aria-live="polite"
                className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-2"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                {submitError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              aria-disabled={submitting}
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-slate-dark px-8 py-4 text-base font-bold text-white shadow-card transition-all duration-300 hover:bg-slate-medium active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 md:text-lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-accent" aria-hidden />
                  <span>جاري إرسال الطلب وحفظ البيانات...</span>
                </>
              ) : (
                <>
                  <span>إرسال طلب الاستشارة</span>
                  <Send className="h-5 w-5 text-accent transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
                </>
              )}
            </button>
          </div>

        </fieldset>
      </form>
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border bg-slate-50/40 px-3.5 py-3 pr-10 text-sm text-slate-dark placeholder:text-muted/60 shadow-xs outline-none transition-all duration-200 focus:bg-white focus:ring-2";

function inputClsFor(state: "error" | "valid" | "idle") {
  if (state === "error") {
    return `${inputBase} border-red-500 bg-red-50/10 text-red-950 focus:border-red-600 focus:ring-red-500/20`;
  }
  if (state === "valid") {
    return `${inputBase} border-emerald-500/80 focus:border-emerald-600 focus:ring-emerald-500/20`;
  }
  return `${inputBase} border-border hover:border-border/80 focus:border-accent focus:ring-accent/20`;
}

function Field({
  label,
  name,
  error,
  required,
  icon: Icon,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label htmlFor={name} className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-dark">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      
      <div className="relative flex items-center">
        {Icon && (
          <div className="pointer-events-none absolute right-3.5 top-3.5 text-muted">
            <Icon className="h-4 w-4 shrink-0" />
          </div>
        )}
        {children}
      </div>

      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          aria-live="polite"
          className="mt-1.5 text-xs font-bold text-red-600 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1.5"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}