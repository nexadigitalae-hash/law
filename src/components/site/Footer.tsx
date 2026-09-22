import { Link } from "@tanstack/react-router";
import { Scale, MapPin, Clock, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-slate-dark text-slate-100">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        
        {/* العمود الأول: الهوية والوصف المختصر */}
        <div className="md:col-span-1">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-slate-dark">
              <Scale className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white leading-tight">عبد الله السالمي</span>
              <span className="text-xs text-accent font-medium">للمحاماة والاستشارات القانونية</span>
            </div>
          </Link>
          <p className="mt-4 text-xs leading-6 text-slate-300 font-normal">
            مكتب متكامل يقدم الاستشارات القانونية والخدمات القضائية بكفاءة عالية. نجمع بين الخبرة العميقة والسرية المطلقة لحماية حقوق موكلينا والترافع عنهم أمام كافة المحاكم.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-accent">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>التزام تام بالسرية والموثوقية القانونية</span>
          </div>
        </div>

        {/* العمود الثاني: عناوين الفروع */}
        <div>
          <h3 className="text-sm font-bold text-accent">فروعنا</h3>
          <ul className="mt-4 space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
              <span><strong>الفرع الأول:</strong> دبي - الديرة - شارع بورسعيد - قرب سيتي سنتر الديرة</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
              <span><strong>الفرع الثاني:</strong> أبوظبي - شارع الكورنيش - جانب برج الشيخ محمد بن راشد</span>
            </li>
          </ul>
        </div>

        {/* العمود الثالث: أوقات العمل */}
        <div>
          <h3 className="text-sm font-bold text-accent">أوقات العمل</h3>
          <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-accent" />
              <span><strong>الأحد - الخميس:</strong> 9:00 AM - 5:00 PM</span>
            </li>
            <li className="text-slate-400 pr-6">
              <span><strong>الجمعة - السبت:</strong> مغلق</span>
            </li>
          </ul>
        </div>

        {/* العمود الرابع: روابط سريعة */}
        <nav aria-label="روابط سريعة">
          <h3 className="text-sm font-bold text-accent">روابط سريعة</h3>
          <ul className="mt-4 space-y-2.5 text-xs text-slate-300">
            <li><Link to="/" className="transition-colors hover:text-accent">الرئيسية</Link></li>
            <li><Link to="/about" className="transition-colors hover:text-accent">من نحن</Link></li>
            <li><Link to="/how-it-works" className="transition-colors hover:text-accent">آلية العمل</Link></li>
            <li><Link to="/faq" className="transition-colors hover:text-accent">الأسئلة الشائعة</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-accent">تواصل معنا</Link></li>
          </ul>
        </nav>

      </div>

      {/* شريط حقوق الملكية */}
      <div className="border-t border-slate-800 bg-[#07111e]">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-4 text-xs font-medium text-slate-400 md:flex-row">
          <p>© {currentYear} مكتب عبد الله السالمي للمحاماة والاستشارات القانونية. جميع الحقوق محفوظة.</p>
          <p className="text-center md:text-right">تقديم أفضل الخدمات والاستشارات القانونية بمهنية وحيادية</p>
        </div>
      </div>
    </footer>
  );
}