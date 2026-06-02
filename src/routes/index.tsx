import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CalendarCheck2,
  Check,
  Clock,
  CreditCard,
  EyeOff,
  Flame,
  Frown,
  Mail,
  MessageSquare,
  Plug,
  Quote,
  Send,
  Shield,
  Sparkles,
  Star,
  TrendingDown,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "brou — Agendamiento automatizado por WhatsApp con IA" },
      {
        name: "description",
        content:
          "brou es el agente AI que conversa por WhatsApp, agenda citas, cobra anticipos y nunca duerme. Para negocios que valoran su tiempo.",
      },
      { property: "og:title", content: "brou — Tu agenda en piloto automático" },
      {
        property: "og:description",
        content:
          "Agente AI entrenado en tu negocio. Agenda, confirma y cobra por WhatsApp 24/7.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
  }),
  component: Landing,
});

/* ---------------- i18n ---------------- */

type Lang = "es" | "en";


const translations = {
  es: {
    nav: { problema: "Problema", solucion: "Solución", planes: "Planes", faq: "FAQ", contacto: "Contacto", empezar: "Empezar" },
    hero: {
      badge: "Agente AI activo · WhatsApp",
      title1: "Tu agenda,", title2: "en piloto", title3: "automático.",
      desc1: "es el sistema con agente AI que conversa por WhatsApp, agenda citas, cobra anticipos y nunca duerme. Tú atiendes; nosotros llenamos tu calendario.",
      ctaTry: "Probar gratis 14 días", ctaDemo: "Agenda demo",
      tags: ["Sin tarjeta", "Setup 5 min", "AI 24/7"],
    },
    chat: { agent: "Agente brou", online: "en línea",
      m1: "Hola, quiero agendar un corte para mañana 💇",
      m2a: "¡Claro! Tengo disponible ", m2b: " y ", m2c: ". ¿Cuál prefieres?",
      m3: "14:00 está perfecto",
    },
    reservas: { today: "Hoy · 14 nuevas reservas", names: ["Sofía R.", "Diego M.", "Lía P."], services: ["Corte", "Tinte", "Mechas"] },
    marquee: ["Estudios","Talleres","Consultorios","Veterinarias","Peluquerías","Spas","Clínicas","Barberías","Estéticas","Coaches","Fisios","Notarías"],
    problema: {
      eyebrow: "El problema",
      title1: "Cada mensaje sin responder", title2: "es plata que pierdes.",
      items: [
        { t: "Mensajes ignorados", d: "Tu cliente escribe a las 10pm. Cuando respondes, ya reservó en otro lado." },
        { t: "Agenda desordenada", d: "Citas duplicadas, horarios cruzados y notas perdidas en post-its." },
        { t: "Dinero que se fuga", d: "No-shows, cancelaciones de último minuto y huecos en el calendario." },
        { t: "Tiempo perdido gestionando WhatsApp", d: "Horas respondiendo los mismos mensajes en vez de atender o hacer crecer tu negocio." },
      ],
    },
    consecuencias: {
      eyebrow: "Consecuencias", titleA: "Lo que ", titleB: "realmente cuesta", titleC: " no resolverlo.",
      items: [
        { t: "Dinero perdido", d: "Cada no-show y llamada fuera de horario es ingreso evaporado." },
        { t: "Clientes frustrados", d: "Esperas y agendas confusas erosionan tu marca." },
        { t: "Estrés operativo", d: "Tu equipo apaga incendios en vez de hacer crecer el negocio." },
        { t: "Sin control real", d: "Operas a ciegas. No sabes dónde está la fuga." },
      ],
    },
    solucion: {
      eyebrow: "La solución",
      title1: "Un agente AI entrenado", title2: "en ", title3: "tu negocio.",
      desc: "brou conversa con tus clientes en WhatsApp como tu mejor recepcionista: con tu tono, tus horarios, tus servicios. Agenda, reagenda, cobra anticipo y envía recordatorios automáticos. Sin apps nuevas para tus clientes.",
      list: ["Conversa por WhatsApp como humano","Agenda y reagenda en tu calendario","Cobra anticipos con Stripe / pagos locales","Envía recordatorios y recobra no-shows"],
      stat1: "Más reservas confirmadas", stat2: "No-shows con anticipo", stat3: "Disponible en cualquier zona horaria, sin contratar a nadie",
    },
    beneficios: {
      eyebrow: "Beneficios",
      title1: "Menos fricción.", title2: "Más ingresos.",
      desc: "No vendemos features, vendemos resultados. Esto es lo que cambia en tu negocio desde el día 1.",
      list: ["Ahorro de tiempo operativo","Reduce no-shows hasta 60% con recordatorios","Cobra antes de la cita y elimina pérdidas","Atiende 24/7 sin contratar más personal","Reportes claros de ingresos y conversión","Conecta calendario, CRM y pasarela en minutos"],
    },
    como: {
      eyebrow: "Cómo funciona", titleA: "Cuatro pasos. ", titleB: "Cero fricción.",
      steps: [
        { t: "Configura", d: "Configuras horarios" },
        { t: "Selfservice", d: "Clientes agendan solos" },
        { t: "Gestiona", d: "El sistema confirma y recuerda" },
        { t: "Recibe", d: "El agente agenda, confirma y cobra. Tú revisas el dashboard." },
      ],
    },
    prueba: {
      eyebrow: "Prueba social", titleA: "Negocios reales. ", titleB: "Resultados reales.",
      items: [
        { q: "Pasamos de perder 4 citas al día a tener agenda llena. brou confirma y cobra sin que toquemos nada.", a: "María L.", r: "Dueña, Clínica Veterinaria" },
        { q: "Mi recepcionista ahora hace ventas en vez de contestar 'cuánto cuesta'. ROI en 3 semanas.", a: "Andrés G.", r: "Director, Estética Premium" },
        { q: "Los recordatorios bajaron los no-shows del 28% al 9%. Es otro negocio.", a: "Camila P.", r: "Gerente, Spa & Wellness" },
      ],
      stats: [["+60%","Menos no-shows"],["15h","Recuperadas / semana"],["24/7","Agendamiento activo"],["3 sem","ROI promedio"]],
    },
    planes: {
      eyebrow: "Planes", titleA: "Precios simples. ", titleB: "Sin sorpresas.",
      sub: "Empieza gratis 14 días. Cancela cuando quieras.",
      perMonth: "/mes", perYear: "o $%s/año", popular: "Más popular",
      plans: [
        { n: "Básico", p: "20", anual: "150", d: "Para empezar a automatizar tu agenda.", f: ["3 usuarios","Dashboard y calendario","Manejo de usuarios y roles (activo / no activo)","Personal con rol profesional","Servicios y gestión de horarios","Disponibilidad por servicio","Horarios no disponibles y vacaciones","Registro de clientes e historial de citas"], cta: "Empezar" },
        { n: "Startup", p: "50", d: "Incluye todo lo del Básico, más IA.", f: ["5 usuarios","Plataforma especializada","Agente AI de agendamiento vía WhatsApp","Métricas avanzadas","Integración a plataforma de pagos","Conciliación de pagos"], cta: "Probar 14 días" },
        { n: "Enterprise", p: "100", d: "Para operaciones que necesitan control total.", f: ["10 usuarios","Gestión de comisiones","Informe de finanzas","Integraciones a CRM y ERP","Dominio personalizado"], cta: "Hablar con ventas" },
      ],
      adicionales: "Adicionales:",
      add: [["Usuario adicional","$5"],["Agente de agendamiento","$20"],["Agente especializado","$50"],["Plataforma de pago","$20"]],
    },
    faq: {
      eyebrow: "FAQ", title1: "Preguntas", title2: "frecuentes.",
      noAnswer: "¿No encuentras respuesta? ", talk: "Habla con nosotros",
      items: [
        { q: "¿Es difícil de usar?", a: "Setup en 5 minutos. Conectas WhatsApp, defines tus servicios y horarios, y listo. Nuestro equipo te acompaña en la activación sin costo." },
        { q: "¿Funciona con WhatsApp?", a: "Sí. brou opera nativo sobre WhatsApp Business API oficial. Tus clientes te escriben al mismo número de siempre." },
        { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia ni letra chica. Cancelas desde el dashboard en un clic." },
        { q: "¿Sirve para mi tipo de negocio?", a: "Si agendas citas o servicios — peluquerías, spas, clínicas, veterinarias, talleres, consultorios, coaches — brou se entrena con tu vocabulario y servicios." },
        { q: "¿Mis datos están seguros?", a: "Encriptados en tránsito y en reposo. Cumplimos con GDPR. Nunca compartimos información con terceros." },
      ],
    },
    cta: {
      eyebrow: "Empieza hoy",
      title1: "Deja de perseguir clientes.", title2: "Que ellos te encuentren.",
      desc: "Activa tu agente AI hoy. Primeros 14 días gratis, sin tarjeta.",
      start: "Empezar gratis", demo: "Agenda demo",
    },
    contacto: {
      eyebrow: "Contacto",
      title1: "Hablemos de tu ", title2: "negocio.",
      desc: "Cuéntanos qué necesitas. Te respondemos en menos de 24 horas hábiles.",
      whatsapp: "WhatsApp directo con ventas",
      fields: { name: "Nombre", email: "Email", phone: "Teléfono celular", business: "Negocio (opcional)", message: "Mensaje" },
      placeholders: { name: "María González", email: "tu@correo.com", phone: "+52 1 55 1234 5678", business: "Estudio, taller, clínica...", message: "Cuéntanos qué necesitas automatizar..." },
      errors: { name: "Ingresa tu nombre (máx. 100).", email: "Ingresa un email válido.", phone: "Ingresa un teléfono válido.", message: "Escribe un mensaje (máx. 1000)." },
      sending: "Enviando...", send: "Enviar mensaje",
      ok: "¡Gracias! Te contactaremos pronto.",
    },
    footer: { desc: "Agendamiento automatizado por WhatsApp para negocios que valoran su tiempo.", copy: "© 2026 brou · Desarrollado por Code-Design" },
  },
  en: {
    nav: { problema: "Problem", solucion: "Solution", planes: "Pricing", faq: "FAQ", contacto: "Contact", empezar: "Get started" },
    hero: {
      badge: "AI agent active · WhatsApp",
      title1: "Your calendar,", title2: "on autopilot", title3: "mode.",
      desc1: "is the system with an AI agent that chats on WhatsApp, books appointments, charges deposits and never sleeps. You serve clients; we fill your calendar.",
      ctaTry: "Try free for 14 days", ctaDemo: "Book a demo",
      tags: ["No card", "5-min setup", "AI 24/7"],
    },
    chat: { agent: "brou Agent", online: "online",
      m1: "Hi, I'd like to book a haircut for tomorrow 💇",
      m2a: "Sure! I have available ", m2b: " and ", m2c: ". Which do you prefer?",
      m3: "2:00 PM is perfect",
    },
    reservas: { today: "Today · 14 new bookings", names: ["Sofía R.", "Diego M.", "Lía P."], services: ["Haircut", "Color", "Highlights"] },
    marquee: ["Studios","Workshops","Clinics","Vets","Salons","Spas","Practices","Barbers","Beauty","Coaches","Physio","Notaries"],
    problema: {
      eyebrow: "The problem",
      title1: "Every unanswered message", title2: "is money you lose.",
      items: [
        { t: "Ignored messages", d: "Your client writes at 10pm. By the time you reply, they booked somewhere else." },
        { t: "Messy calendar", d: "Double bookings, overlapping slots and notes lost on sticky pads." },
        { t: "Leaking revenue", d: "No-shows, last-minute cancellations and gaps in your calendar." },
        { t: "Time wasted on WhatsApp", d: "Hours answering the same messages instead of serving clients or growing." },
      ],
    },
    consecuencias: {
      eyebrow: "Consequences", titleA: "What ", titleB: "really costs", titleC: " not fixing it.",
      items: [
        { t: "Lost revenue", d: "Every no-show and after-hours call is evaporated income." },
        { t: "Frustrated clients", d: "Waits and confusing schedules erode your brand." },
        { t: "Operational stress", d: "Your team puts out fires instead of growing the business." },
        { t: "No real control", d: "You operate blind. You don't know where the leak is." },
      ],
    },
    solucion: {
      eyebrow: "The solution",
      title1: "An AI agent trained", title2: "on ", title3: "your business.",
      desc: "brou talks to your clients on WhatsApp like your best receptionist: your tone, your hours, your services. Books, reschedules, charges deposits and sends reminders automatically. No new apps for your clients.",
      list: ["Chats on WhatsApp like a human","Books and reschedules in your calendar","Charges deposits with Stripe / local payments","Sends reminders and recovers no-shows"],
      stat1: "More confirmed bookings", stat2: "No-shows with deposit", stat3: "Available in any timezone, no extra hires",
    },
    beneficios: {
      eyebrow: "Benefits",
      title1: "Less friction.", title2: "More revenue.",
      desc: "We don't sell features, we sell results. This is what changes in your business from day 1.",
      list: ["Save operational time","Cut no-shows up to 60% with reminders","Charge before the appointment and stop losses","Serve 24/7 without hiring more staff","Clear reports of revenue and conversion","Connect calendar, CRM and payments in minutes"],
    },
    como: {
      eyebrow: "How it works", titleA: "Four steps. ", titleB: "Zero friction.",
      steps: [
        { t: "Configure", d: "Set your schedule" },
        { t: "Self-service", d: "Clients book themselves" },
        { t: "Manage", d: "The system confirms and reminds" },
        { t: "Get paid", d: "The agent books, confirms and charges. You check the dashboard." },
      ],
    },
    prueba: {
      eyebrow: "Social proof", titleA: "Real businesses. ", titleB: "Real results.",
      items: [
        { q: "We went from losing 4 appointments a day to a full calendar. brou confirms and charges without us lifting a finger.", a: "María L.", r: "Owner, Vet Clinic" },
        { q: "My receptionist now closes sales instead of answering 'how much'. ROI in 3 weeks.", a: "Andrés G.", r: "Director, Premium Beauty" },
        { q: "Reminders dropped no-shows from 28% to 9%. It's a different business.", a: "Camila P.", r: "Manager, Spa & Wellness" },
      ],
      stats: [["+60%","Fewer no-shows"],["15h","Saved / week"],["24/7","Booking active"],["3 wks","Avg ROI"]],
    },
    planes: {
      eyebrow: "Pricing", titleA: "Simple prices. ", titleB: "No surprises.",
      sub: "Start free for 14 days. Cancel anytime.",
      perMonth: "/mo", perYear: "or $%s/yr", popular: "Most popular",
      plans: [
        { n: "Basic", p: "20", anual: "150", d: "To start automating your calendar.", f: ["3 users","Dashboard and calendar","User and role management (active / inactive)","Staff with professional role","Services and schedule management","Availability per service","Unavailable hours and vacations","Client registry and appointment history"], cta: "Get started" },
        { n: "Startup", p: "50", d: "Includes everything in Basic, plus AI.", f: ["5 users","Specialized platform","AI booking agent via WhatsApp","Advanced metrics","Payment platform integration","Payment reconciliation"], cta: "Try 14 days" },
        { n: "Enterprise", p: "100", d: "For operations that need full control.", f: ["10 users","Commission management","Finance reports","CRM and ERP integrations","Custom domain"], cta: "Talk to sales" },
      ],
      adicionales: "Add-ons:",
      add: [["Extra user","$5"],["Booking agent","$20"],["Specialized agent","$50"],["Payment platform","$20"]],
    },
    faq: {
      eyebrow: "FAQ", title1: "Frequently", title2: "asked.",
      noAnswer: "Can't find an answer? ", talk: "Talk to us",
      items: [
        { q: "Is it hard to use?", a: "Setup in 5 minutes. Connect WhatsApp, define services and hours, and you're done. Our team helps you activate at no cost." },
        { q: "Does it work with WhatsApp?", a: "Yes. brou runs natively on the official WhatsApp Business API. Your clients message the same number as always." },
        { q: "Can I cancel anytime?", a: "Yes. No lock-in, no fine print. Cancel from the dashboard with one click." },
        { q: "Does it fit my type of business?", a: "If you book appointments or services — salons, spas, clinics, vets, workshops, practices, coaches — brou trains on your vocabulary and services." },
        { q: "Is my data safe?", a: "Encrypted in transit and at rest. GDPR compliant. We never share information with third parties." },
      ],
    },
    cta: {
      eyebrow: "Start today",
      title1: "Stop chasing clients.", title2: "Let them find you.",
      desc: "Activate your AI agent today. First 14 days free, no card required.",
      start: "Start free", demo: "Book a demo",
    },
    contacto: {
      eyebrow: "Contact",
      title1: "Let's talk about your ", title2: "business.",
      desc: "Tell us what you need. We reply in under 24 business hours.",
      whatsapp: "WhatsApp directly with sales",
      fields: { name: "Name", email: "Email", phone: "Mobile phone", business: "Business (optional)", message: "Message" },
      placeholders: { name: "Maria Gonzalez", email: "you@email.com", phone: "+1 555 123 4567", business: "Studio, workshop, clinic...", message: "Tell us what you'd like to automate..." },
      errors: { name: "Enter your name (max. 100).", email: "Enter a valid email.", phone: "Enter a valid phone.", message: "Write a message (max. 1000)." },
      sending: "Sending...", send: "Send message",
      ok: "Thanks! We'll reach out soon.",
    },
    footer: { desc: "WhatsApp booking automation for businesses that value their time.", copy: "© 2026 brou · Built by Code-Design" },
  },
} as const;

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "es",
  setLang: () => {},
  t: translations.es,
});

const useT = () => useContext(LangContext);

/* ---------------- helpers ---------------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current || shown) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${shown ? "animate-fade-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

function BrouLogo({ className = "h-8" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex items-center justify-center">
        <span className="absolute -top-1 -right-1 text-neon font-mono text-[10px]">✱</span>
        <span
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-md bg-navy text-neon"
        >
          <span className="text-base font-black leading-none">✊</span>
        </span>
      </span>
      <span className="font-display text-2xl font-extrabold tracking-tight text-navy">
        bro<span className="text-neon">u</span>
      </span>
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-navy/70">
      <span className="text-neon">//</span>
      <span>{children}</span>
    </div>
  );
}

/* ---------------- landing ---------------- */

function Landing() {
  const [lang, setLangState] = useState<Lang>("es");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && window.localStorage.getItem("brou.lang")) as Lang | null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem("brou.lang", l); } catch {}
  };
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <main className="overflow-x-hidden text-foreground">
        <Nav />
        <Hero />
        <Marquee />
        <Problema />
        <Consecuencias />
        <Solucion />
        <Beneficios />
        <ComoFunciona />
        <PruebaSocial />
        <Planes />
        <FAQ />
        <Contacto />
        <CTAFinal />
        <Footer />
      </main>
    </LangContext.Provider>
  );
}

/* ---------------- nav ---------------- */

function LangToggle() {
  const { lang, setLang } = useT();
  return (
    <div className="inline-flex items-center rounded-full border border-navy/15 bg-cream/70 p-0.5 text-xs font-mono font-semibold backdrop-blur">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1 uppercase tracking-widest transition-colors ${
            lang === l ? "bg-navy text-cream" : "text-navy/60 hover:text-navy"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Nav() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-background/0"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <BrouLogo />
        <nav className="hidden items-center gap-10 text-sm font-medium text-navy/80 md:flex">
          {[
            [t.nav.problema, "#problema"],
            [t.nav.solucion, "#solucion"],
            [t.nav.planes, "#planes"],
            [t.nav.faq, "#faq"],
            [t.nav.contacto, "#contacto"],
          ].map(([l, h]) => (
            <a
              key={h}
              href={h}
              className="group relative inline-flex items-center transition-colors hover:text-navy"
            >
              {l}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-neon transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href="#cta"
            className="group hidden items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition-all hover:bg-navy/90 hover:shadow-pop sm:inline-flex"
          >
            {t.nav.empezar}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- hero ---------------- */

function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-20 h-[420px] w-[420px] rounded-full bg-neon/40 blur-3xl animate-blob"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-cream/70 px-3 py-1.5 text-xs font-medium text-navy backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              {t.hero.badge}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-navy md:text-7xl">
              {t.hero.title1}{" "}
              <span className="text-underline-neon italic">{t.hero.title2}</span>
              <br />
              {t.hero.title3}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg text-navy/70 md:text-xl">
              <span className="font-semibold text-navy">brou | booking</span> {t.hero.desc1}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:scale-[1.02] hover:shadow-pop"
              >
                {t.hero.ctaTry}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-cream/60 px-6 py-3.5 text-sm font-semibold text-navy backdrop-blur transition-all hover:border-navy hover:bg-cream"
              >
                {t.hero.ctaDemo}
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-navy/70">
              {[Shield, Zap, Bot].map((Icon, i) => (
                <li key={i} className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                  <Icon className="h-4 w-4 text-neon" />
                  {t.hero.tags[i]}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={200}>
            <ChatMock />
          </Reveal>
          <Reveal delay={360}>
            <ReservasCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChatMock() {
  const { t } = useT();
  return (
    <div className="relative animate-float">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-pop">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-neon">
              <MessageSquare className="h-5 w-5 text-navy" />
            </div>
            <div>
              <div className="font-semibold text-navy">{t.chat.agent}</div>
              <div className="flex items-center gap-1.5 text-xs text-navy/60">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" /> {t.chat.online}
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-navy/50">
            WhatsApp
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          <Bubble side="right">{t.chat.m1}</Bubble>
          <Bubble side="left" dark>
            {t.chat.m2a}<b>10:00</b>, <b>14:00</b>{t.chat.m2b}<b>16:30</b>{t.chat.m2c}
          </Bubble>
          <Bubble side="right">{t.chat.m3}</Bubble>
          <Bubble side="left" dark>
            <span className="inline-flex gap-1">
              <Dot delay={0} />
              <Dot delay={200} />
              <Dot delay={400} />
            </span>
          </Bubble>
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      style={{ animationDelay: `${delay}ms` }}
      className="inline-block h-1.5 w-1.5 animate-typing rounded-full bg-neon"
    />
  );
}

function Bubble({
  children,
  side,
  dark,
}: {
  children: React.ReactNode;
  side: "left" | "right";
  dark?: boolean;
}) {
  return (
    <div className={`flex ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
          dark
            ? "rounded-bl-sm bg-navy text-cream"
            : side === "right"
              ? "rounded-br-sm bg-secondary text-navy"
              : "rounded-bl-sm bg-secondary text-navy"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ReservasCard() {
  const { t } = useT();
  const rows = [
    { h: "10:00", n: t.reservas.names[0], s: t.reservas.services[0] },
    { h: "11:30", n: t.reservas.names[1], s: t.reservas.services[1] },
    { h: "14:00", n: t.reservas.names[2], s: t.reservas.services[2] },
  ];
  return (
    <div className="mt-5 rounded-2xl bg-navy p-5 text-cream shadow-pop">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <CalendarCheck2 className="h-4 w-4 text-neon" />
          <span className="font-medium">{t.reservas.today}</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-neon/15 px-2 py-0.5 text-xs font-mono text-neon">
          <TrendingUp className="h-3 w-3" /> +38%
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {rows.map((r) => (
          <div key={r.h} className="rounded-xl bg-cream/5 p-3 ring-1 ring-cream/10">
            <div className="font-mono text-xs text-neon">{r.h}</div>
            <div className="mt-1 text-sm font-semibold">{r.n}</div>
            <div className="text-[11px] text-cream/60">{r.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- marquee ---------------- */

function Marquee() {
  const { t } = useT();
  const row = [...t.marquee, ...t.marquee];
  return (
    <section className="overflow-hidden border-y border-navy/20 bg-navy">
      <div className="flex animate-marquee whitespace-nowrap py-4">
        {row.map((x, i) => (
          <div key={i} className="flex shrink-0 items-center gap-10 px-6 font-mono text-sm uppercase tracking-[0.3em] text-cream">
            {x}
            <span className="text-neon">✱</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- problema ---------------- */

function Problema() {
  const { t } = useT();
  const icons = [MessageSquare, Clock, TrendingDown, Clock];
  return (
    <section id="problema" className="relative overflow-hidden bg-neon py-24 text-navy">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>{t.problema.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
            {t.problema.title1}
            <br />
            <span className="italic">{t.problema.title2}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-navy/20 bg-navy/20 md:grid-cols-3">
          {t.problema.items.map((i, idx) => {
            const Icon = icons[idx];
            return (
              <Reveal key={i.t} delay={idx * 100}>
                <div className="group h-full bg-neon p-8 transition-colors hover:bg-cream">
                  <Icon className="h-8 w-8 text-navy transition-transform group-hover:scale-110" />
                  <h3 className="mt-6 text-xl font-bold">{i.t}</h3>
                  <p className="mt-2 max-w-sm text-sm text-navy/75">{i.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- consecuencias ---------------- */

function Consecuencias() {
  const { t } = useT();
  const icons = [TrendingDown, Frown, Flame, EyeOff];
  return (
    <section className="border-b border-border bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>{t.consecuencias.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {t.consecuencias.titleA}<span className="italic text-navy/60">{t.consecuencias.titleB}</span>{t.consecuencias.titleC}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.consecuencias.items.map((i, idx) => {
            const Icon = icons[idx];
            return (
              <Reveal key={i.t} delay={idx * 80}>
                <div className="hover-lift group h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-neon transition-transform group-hover:rotate-6">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{i.t}</h3>
                  <p className="mt-2 text-sm text-navy/65">{i.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- solución ---------------- */

function Solucion() {
  const { t } = useT();
  return (
    <section id="solucion" className="border-b border-border bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>{t.solucion.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              {t.solucion.title1}
              <br />
              {t.solucion.title2}<span className="italic text-neon">{t.solucion.title3}</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-lg text-navy/70">{t.solucion.desc}</p>
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-8 space-y-3">
              {t.solucion.list.map((x) => (
                <li key={x} className="flex items-start gap-3 text-navy/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon">
                    <Check className="h-3 w-3 text-navy" />
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={120}>
              <StatCard k="+38%" v={t.solucion.stat1} icon={TrendingUp} />
            </Reveal>
            <Reveal delay={200}>
              <StatCard k="−72%" v={t.solucion.stat2} icon={Shield} />
            </Reveal>
            <Reveal delay={280} className="sm:col-span-2">
              <StatCard k="24/7" v={t.solucion.stat3} icon={Bot} wide />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  k,
  v,
  icon: Icon,
  wide,
}: {
  k: string;
  v: string;
  icon: React.ComponentType<{ className?: string }>;
  wide?: boolean;
}) {
  return (
    <div className="hover-lift relative overflow-hidden rounded-3xl bg-navy p-6 text-cream shadow-pop">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-neon/20 blur-3xl"
      />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="font-mono text-5xl font-extrabold text-neon md:text-6xl">{k}</div>
          <div className={`mt-2 ${wide ? "max-w-md" : ""} text-sm text-cream/75`}>{v}</div>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-cream/10 ring-1 ring-cream/15">
          <Icon className="h-5 w-5 text-neon" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- beneficios ---------------- */

function Beneficios() {
  const { t } = useT();
  return (
    <section className="border-b border-border bg-surface py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{t.beneficios.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              {t.beneficios.title1}
              <br />
              <span className="italic text-neon">{t.beneficios.title2}</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-md text-lg text-navy/70">{t.beneficios.desc}</p>
          </Reveal>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {t.beneficios.list.map((b, idx) => (
            <Reveal key={b} delay={idx * 60}>
              <li className="hover-lift group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-neon transition-transform group-hover:rotate-6">
                  <Check className="h-4 w-4 text-navy" />
                </span>
                <span className="text-base font-medium text-navy">{b}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- cómo funciona ---------------- */

function ComoFunciona() {
  const { t } = useT();
  const icons = [Sparkles, Plug, Bot, CalendarCheck2];
  const ns = ["01", "02", "03", "04"];
  return (
    <section id="como" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>{t.como.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {t.como.titleA}<span className="italic text-navy/60">{t.como.titleB}</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent md:block"
          />
          {t.como.steps.map((s, idx) => {
            const Icon = icons[idx];
            return (
              <Reveal key={ns[idx]} delay={idx * 120}>
                <div className="hover-lift group relative h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-neon ring-4 ring-background">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-5xl font-extrabold text-navy/10 transition-colors group-hover:text-neon">
                      {ns[idx]}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-navy">{s.t}</h3>
                  <p className="mt-2 text-navy/65">{s.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- prueba social ---------------- */

function PruebaSocial() {
  const { t } = useT();
  return (
    <section className="border-b border-border bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>{t.prueba.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {t.prueba.titleA}<span className="italic text-neon">{t.prueba.titleB}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.prueba.items.map((x, idx) => (
            <Reveal key={x.a} delay={idx * 100}>
              <figure className="hover-lift relative h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                <Quote className="h-7 w-7 text-neon" />
                <blockquote className="mt-4 text-base leading-relaxed text-navy">
                  "{x.q}"
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <div className="text-sm font-bold text-navy">{x.a}</div>
                    <div className="text-xs text-navy/60">{x.r}</div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-neon text-neon" />
                    ))}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {t.prueba.stats.map(([k, v], idx) => (
            <Reveal key={v} delay={idx * 80}>
              <div className="bg-card p-7 text-center">
                <div className="font-mono text-4xl font-extrabold text-navy md:text-5xl">{k}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-navy/60">{v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- planes ---------------- */

function Planes() {
  const { t } = useT();
  return (
    <section id="planes" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>{t.planes.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {t.planes.titleA}<span className="italic text-navy/60">{t.planes.titleB}</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-4 max-w-xl text-navy/70">{t.planes.sub}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {t.planes.plans.map((p, idx) => {
            const hl = idx === 1;
            return (
              <Reveal key={p.n} delay={idx * 100}>
                <div
                  className={`hover-lift relative flex h-full flex-col rounded-3xl p-8 ${
                    hl
                      ? "bg-navy text-cream shadow-pop ring-1 ring-neon/40"
                      : "border border-border bg-card text-navy shadow-soft"
                  }`}
                >
                  {hl && (
                    <span className="absolute -top-3 left-8 rounded-full bg-neon px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-navy">
                      {t.planes.popular}
                    </span>
                  )}
                  <div className="flex items-baseline justify-between">
                    <h3 className={`text-2xl font-extrabold ${hl ? "text-cream" : "text-navy"}`}>
                      {p.n}
                    </h3>
                    {"anual" in p && p.anual && (
                      <span className={`text-xs ${hl ? "text-cream/60" : "text-navy/55"}`}>
                        {t.planes.perYear.replace("%s", p.anual)}
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 text-sm ${hl ? "text-cream/70" : "text-navy/60"}`}>{p.d}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className={`font-mono text-6xl font-extrabold ${hl ? "text-neon" : "text-navy"}`}>
                      ${p.p}
                    </span>
                    <span className={`text-sm ${hl ? "text-cream/60" : "text-navy/55"}`}>{t.planes.perMonth}</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm">
                    {p.f.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className={`mt-0.5 h-4 w-4 shrink-0 ${hl ? "text-neon" : "text-navy"}`} />
                        <span className={hl ? "text-cream/90" : "text-navy/85"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#cta"
                    className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                      hl ? "bg-neon text-navy hover:scale-[1.02]" : "bg-navy text-cream hover:scale-[1.02]"
                    }`}
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-dashed border-navy/20 bg-cream/40 p-6 text-sm text-navy/70">
            <span className="font-semibold text-navy">{t.planes.adicionales}</span>
            {t.planes.add.map(([label, price]) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span>{label}</span>
                <span className="rounded-full bg-navy/5 px-2 py-0.5 font-mono text-xs text-navy">
                  {price}
                </span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- faq ---------------- */

function FAQ() {
  const { t } = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-border bg-surface py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>{t.faq.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              {t.faq.title1}
              <br />
              <span className="italic text-neon">{t.faq.title2}</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-navy/70">
              {t.faq.noAnswer}
              <a href="#cta" className="font-semibold text-navy underline decoration-neon decoration-2 underline-offset-4">
                {t.faq.talk}
              </a>
              .
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            {t.faq.items.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="ring-focus flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-secondary/50"
                  >
                    <span className="text-base font-semibold text-navy md:text-lg">{f.q}</span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all ${
                        isOpen ? "rotate-45 bg-neon text-navy" : "bg-navy text-neon"
                      }`}
                    >
                      <span className="text-lg leading-none">+</span>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-navy/75">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- cta final ---------------- */

function CTAFinal() {
  const { t } = useT();
  return (
    <section id="cta" className="relative overflow-hidden bg-navy py-28 text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-neon/20 blur-3xl animate-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]"
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <Eyebrow>
            <span className="text-cream/70">{t.cta.eyebrow}</span>
          </Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
            {t.cta.title1}
            <br />
            <span className="italic text-neon">{t.cta.title2}</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-cream/70">{t.cta.desc}</p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-neon px-7 py-4 text-base font-bold text-navy transition-all hover:scale-[1.03] hover:shadow-neon"
            >
              {t.cta.start}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-7 py-4 text-base font-semibold text-cream backdrop-blur transition-colors hover:bg-cream/10"
            >
              {t.cta.demo}
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- contacto ---------------- */

function Contacto() {
  const { t } = useT();
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", negocio: "", mensaje: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const nombre = form.nombre.trim();
    const email = form.email.trim();
    const mensaje = form.mensaje.trim();
    if (!nombre || nombre.length > 100) return setError(t.contacto.errors.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      return setError(t.contacto.errors.email);
    const telefono = form.telefono.trim();
    if (telefono && !/^\+?[\d\s\-()]{7,20}$/.test(telefono))
      return setError(t.contacto.errors.phone);
    if (!mensaje || mensaje.length > 1000) return setError(t.contacto.errors.message);
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("ok");
    setForm({ nombre: "", email: "", telefono: "", negocio: "", mensaje: "" });
  };

  return (
    <section id="contacto" className="border-t border-border bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <div>
            <Eyebrow>{t.contacto.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              {t.contacto.title1}<span className="italic text-navy/60">{t.contacto.title2}</span>
            </h2>
            <p className="mt-4 max-w-md text-navy/70">{t.contacto.desc}</p>
            <div className="mt-8 space-y-4 text-sm">
              <a href="mailto:hola@brou.app" className="flex items-center gap-3 text-navy hover:text-navy/70">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-neon/30">
                  <Mail className="h-4 w-4" />
                </span>
                hola@brou.app
              </a>
              <a href="#" className="flex items-center gap-3 text-navy hover:text-navy/70">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-neon/30">
                  <MessageSquare className="h-4 w-4" />
                </span>
                {t.contacto.whatsapp}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-navy">{t.contacto.fields.name}</span>
                <input
                  required
                  maxLength={100}
                  value={form.nombre}
                  onChange={onChange("nombre")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-navy outline-none transition-colors focus:border-navy"
                  placeholder={t.contacto.placeholders.name}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-navy">{t.contacto.fields.email}</span>
                <input
                  required
                  type="email"
                  maxLength={255}
                  value={form.email}
                  onChange={onChange("email")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-navy outline-none transition-colors focus:border-navy"
                  placeholder={t.contacto.placeholders.email}
                />
              </label>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-navy">{t.contacto.fields.phone}</span>
                <input
                  type="tel"
                  maxLength={20}
                  value={form.telefono}
                  onChange={onChange("telefono")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-navy outline-none transition-colors focus:border-navy"
                  placeholder={t.contacto.placeholders.phone}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-navy">{t.contacto.fields.business}</span>
                <input
                  maxLength={150}
                  value={form.negocio}
                  onChange={onChange("negocio")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-navy outline-none transition-colors focus:border-navy"
                  placeholder={t.contacto.placeholders.business}
                />
              </label>
            </div>
            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block font-medium text-navy">{t.contacto.fields.message}</span>
              <textarea
                required
                rows={5}
                maxLength={1000}
                value={form.mensaje}
                onChange={onChange("mensaje")}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-navy outline-none transition-colors focus:border-navy"
                placeholder={t.contacto.placeholders.message}
              />
            </label>

            {error && (
              <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
            )}
            {status === "ok" && (
              <p className="mt-3 text-sm font-medium text-navy">{t.contacto.ok}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 text-sm font-semibold text-cream transition-all hover:scale-[1.01] hover:shadow-pop disabled:opacity-60"
            >
              {status === "sending" ? t.contacto.sending : t.contacto.send}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */

function Footer() {
  const { t } = useT();
  return (
    <footer className="bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <BrouLogo />
          <p className="mt-3 max-w-xs text-sm text-navy/65">{t.footer.desc}</p>
        </div>
        <div className="font-mono text-xs text-navy/55">{t.footer.copy}</div>
      </div>
    </footer>
  );
}
