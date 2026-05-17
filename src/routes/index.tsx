import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  return (
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
  );
}

/* ---------------- nav ---------------- */

function Nav() {
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
            ["Problema", "#problema"],
            ["Solución", "#solucion"],
            ["Planes", "#planes"],
            ["FAQ", "#faq"],
            ["Contacto", "#contacto"],
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
        <a
          href="#cta"
          className="group inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream transition-all hover:bg-navy/90 hover:shadow-pop"
        >
          Empezar
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

/* ---------------- hero ---------------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* glow */}
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
              Agente AI activo · WhatsApp
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-navy md:text-7xl">
              Tu agenda,{" "}
              <span className="text-underline-neon italic">en piloto</span>
              <br />
              automático.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg text-navy/70 md:text-xl">
              <span className="font-semibold text-navy">brou | agenda</span> es el
              sistema con agente AI que conversa por WhatsApp, agenda citas,
              cobra anticipos y nunca duerme. Tú atiendes; nosotros llenamos tu
              calendario.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream transition-all hover:scale-[1.02] hover:shadow-pop"
              >
                Probar gratis 14 días
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#solucion"
                className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-cream/60 px-6 py-3.5 text-sm font-semibold text-navy backdrop-blur transition-all hover:border-navy hover:bg-cream"
              >
                Ver demo
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-navy/70">
              {[
                { icon: Shield, t: "Sin tarjeta" },
                { icon: Zap, t: "Setup 5 min" },
                { icon: Bot, t: "AI 24/7" },
              ].map((i) => (
                <li key={i.t} className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                  <i.icon className="h-4 w-4 text-neon" />
                  {i.t}
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
  return (
    <div className="relative animate-float">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-pop">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-neon">
              <MessageSquare className="h-5 w-5 text-navy" />
            </div>
            <div>
              <div className="font-semibold text-navy">Agente brou</div>
              <div className="flex items-center gap-1.5 text-xs text-navy/60">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" /> en línea
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-navy/50">
            WhatsApp
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          <Bubble side="right">Hola, quiero agendar un corte para mañana 💇</Bubble>
          <Bubble side="left" dark>
            ¡Claro! Tengo disponible <b>10:00</b>, <b>14:00</b> y <b>16:30</b>.
            ¿Cuál prefieres?
          </Bubble>
          <Bubble side="right">14:00 está perfecto</Bubble>
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
  return (
    <div className="mt-5 rounded-2xl bg-navy p-5 text-cream shadow-pop">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <CalendarCheck2 className="h-4 w-4 text-neon" />
          <span className="font-medium">Hoy · 14 nuevas reservas</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-neon/15 px-2 py-0.5 text-xs font-mono text-neon">
          <TrendingUp className="h-3 w-3" /> +38%
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { h: "10:00", n: "Sofía R.", s: "Corte" },
          { h: "11:30", n: "Diego M.", s: "Tinte" },
          { h: "14:00", n: "Lía P.", s: "Mechas" },
        ].map((r) => (
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
  const items = [
    "Estudios", "Talleres", "Consultorios", "Veterinarias",
    "Peluquerías", "Spas", "Clínicas", "Barberías",
    "Estéticas", "Coaches", "Fisios", "Notarías",
  ];
  const row = [...items, ...items];
  return (
    <section className="overflow-hidden border-y border-navy/20 bg-navy">
      <div className="flex animate-marquee whitespace-nowrap py-4">
        {row.map((t, i) => (
          <div key={i} className="flex shrink-0 items-center gap-10 px-6 font-mono text-sm uppercase tracking-[0.3em] text-cream">
            {t}
            <span className="text-neon">✱</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- problema (verde) ---------------- */

function Problema() {
  const items = [
    {
      icon: MessageSquare,
      t: "Mensajes ignorados",
      d: "Tu cliente escribe a las 10pm. Cuando respondes, ya reservó en otro lado.",
    },
    {
      icon: Clock,
      t: "Agenda desordenada",
      d: "Citas duplicadas, horarios cruzados y notas perdidas en post-its.",
    },
    {
      icon: TrendingDown,
      t: "Dinero que se fuga",
      d: "No-shows, cancelaciones de último minuto y huecos en el calendario.",
    },
  ];
  return (
    <section id="problema" className="relative overflow-hidden bg-neon py-24 text-navy">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>El problema</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-4xl font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
            Cada mensaje sin responder
            <br />
            <span className="italic">es plata que pierdes.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-navy/20 bg-navy/20 md:grid-cols-3">
          {items.map((i, idx) => (
            <Reveal key={i.t} delay={idx * 100}>
              <div className="group h-full bg-neon p-8 transition-colors hover:bg-cream">
                <i.icon className="h-8 w-8 text-navy transition-transform group-hover:scale-110" />
                <h3 className="mt-6 text-xl font-bold">{i.t}</h3>
                <p className="mt-2 max-w-sm text-sm text-navy/75">{i.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- consecuencias ---------------- */

function Consecuencias() {
  const items = [
    { icon: TrendingDown, t: "Dinero perdido", d: "Cada no-show y llamada fuera de horario es ingreso evaporado." },
    { icon: Frown, t: "Clientes frustrados", d: "Esperas y agendas confusas erosionan tu marca." },
    { icon: Flame, t: "Estrés operativo", d: "Tu equipo apaga incendios en vez de hacer crecer el negocio." },
    { icon: EyeOff, t: "Sin control real", d: "Operas a ciegas. No sabes dónde está la fuga." },
  ];
  return (
    <section className="border-b border-border bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Consecuencias</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Lo que <span className="italic text-navy/60">realmente cuesta</span> no resolverlo.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((i, idx) => (
            <Reveal key={i.t} delay={idx * 80}>
              <div className="hover-lift group h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-neon transition-transform group-hover:rotate-6">
                  <i.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{i.t}</h3>
                <p className="mt-2 text-sm text-navy/65">{i.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- solución ---------------- */

function Solucion() {
  return (
    <section id="solucion" className="border-b border-border bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>La solución</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              Un agente AI entrenado
              <br />
              en <span className="italic text-neon">tu negocio.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-lg text-lg text-navy/70">
              brou conversa con tus clientes en WhatsApp como tu mejor
              recepcionista: con tu tono, tus horarios, tus servicios. Agenda,
              reagenda, cobra anticipo y envía recordatorios automáticos. Sin
              apps nuevas para tus clientes.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-8 space-y-3">
              {[
                "Conversa por WhatsApp como humano",
                "Agenda y reagenda en tu calendario",
                "Cobra anticipos con Stripe / pagos locales",
                "Envía recordatorios y recobra no-shows",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-navy/85">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon">
                    <Check className="h-3 w-3 text-navy" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={120}>
              <StatCard k="+38%" v="Más reservas confirmadas" icon={TrendingUp} />
            </Reveal>
            <Reveal delay={200}>
              <StatCard k="−72%" v="No-shows con anticipo" icon={Shield} />
            </Reveal>
            <Reveal delay={280} className="sm:col-span-2">
              <StatCard
                k="24/7"
                v="Disponible en cualquier zona horaria, sin contratar a nadie"
                icon={Bot}
                wide
              />
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
  const list = [
    "Recupera 15+ horas a la semana",
    "Reduce no-shows hasta 60% con recordatorios",
    "Cobra antes de la cita y elimina pérdidas",
    "Atiende 24/7 sin contratar más personal",
    "Reportes claros de ingresos y conversión",
    "Conecta calendario, CRM y pasarela en minutos",
  ];
  return (
    <section className="border-b border-border bg-surface py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Beneficios</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl">
              Menos fricción.
              <br />
              <span className="italic text-neon">Más ingresos.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-md text-lg text-navy/70">
              No vendemos features, vendemos resultados. Esto es lo que cambia
              en tu negocio desde el día 1.
            </p>
          </Reveal>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {list.map((b, idx) => (
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
  const steps = [
    { n: "01", t: "Conecta", d: "Sincroniza calendario, WhatsApp y pasarela de pago. 5 minutos.", icon: Plug },
    { n: "02", t: "Configura", d: "Define servicios, horarios y el tono de tu agente AI.", icon: Sparkles },
    { n: "03", t: "Activa", d: "El agente agenda, confirma y cobra. Tú revisas el dashboard.", icon: Bot },
  ];
  return (
    <section id="como" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Cómo funciona</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Tres pasos. <span className="italic text-navy/60">Cero fricción.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-navy/15 to-transparent md:block"
          />
          {steps.map((s, idx) => (
            <Reveal key={s.n} delay={idx * 120}>
              <div className="hover-lift group relative h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-neon ring-4 ring-background">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-5xl font-extrabold text-navy/10 transition-colors group-hover:text-neon">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-navy">{s.t}</h3>
                <p className="mt-2 text-navy/65">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- prueba social ---------------- */

function PruebaSocial() {
  const t = [
    {
      q: "Pasamos de perder 4 citas al día a tener agenda llena. brou confirma y cobra sin que toquemos nada.",
      a: "María L.",
      r: "Dueña, Clínica Veterinaria",
    },
    {
      q: "Mi recepcionista ahora hace ventas en vez de contestar 'cuánto cuesta'. ROI en 3 semanas.",
      a: "Andrés G.",
      r: "Director, Estética Premium",
    },
    {
      q: "Los recordatorios bajaron los no-shows del 28% al 9%. Es otro negocio.",
      a: "Camila P.",
      r: "Gerente, Spa & Wellness",
    },
  ];
  const stats = [
    { k: "+60%", v: "Menos no-shows" },
    { k: "15h", v: "Recuperadas / semana" },
    { k: "24/7", v: "Agendamiento activo" },
    { k: "3 sem", v: "ROI promedio" },
  ];
  return (
    <section className="border-b border-border bg-surface py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Prueba social</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Negocios reales. <span className="italic text-neon">Resultados reales.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.map((x, idx) => (
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
          {stats.map((s, idx) => (
            <Reveal key={s.v} delay={idx * 80}>
              <div className="bg-card p-7 text-center">
                <div className="font-mono text-4xl font-extrabold text-navy md:text-5xl">
                  {s.k}
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-navy/60">
                  {s.v}
                </div>
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
  const plans = [
    {
      n: "Básico",
      p: "20",
      anual: "150",
      d: "Para empezar a automatizar tu agenda.",
      f: [
        "3 usuarios",
        "Dashboard y calendario",
        "Manejo de usuarios y roles (activo / no activo)",
        "Personal con rol profesional",
        "Servicios y gestión de horarios",
        "Disponibilidad por servicio",
        "Horarios no disponibles y vacaciones",
        "Registro de clientes e historial de citas",
      ],
      cta: "Empezar",
      hl: false,
    },
    {
      n: "Startup",
      p: "50",
      d: "Incluye todo lo del Básico, más IA.",
      f: [
        "5 usuarios",
        "Plataforma especializada",
        "Agente AI de agendamiento vía WhatsApp",
        "Métricas avanzadas",
        "Integración a plataforma de pagos",
        "Conciliación de pagos",
      ],
      cta: "Probar 14 días",
      hl: true,
    },
    {
      n: "Enterprise",
      p: "100",
      d: "Para operaciones que necesitan control total.",
      f: [
        "10 usuarios",
        "Gestión de comisiones",
        "Informe de finanzas",
        "Integraciones a CRM y ERP",
        "Dominio personalizado",
      ],
      cta: "Hablar con ventas",
      hl: false,
    },
  ];

  return (
    <section id="planes" className="border-b border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>Planes</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Precios simples. <span className="italic text-navy/60">Sin sorpresas.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-4 max-w-xl text-navy/70">
            Empieza gratis 14 días. Cancela cuando quieras.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p, idx) => (
            <Reveal key={p.n} delay={idx * 100}>
              <div
                className={`hover-lift relative flex h-full flex-col rounded-3xl p-8 ${
                  p.hl
                    ? "bg-navy text-cream shadow-pop ring-1 ring-neon/40"
                    : "border border-border bg-card text-navy shadow-soft"
                }`}
              >
                {p.hl && (
                  <span className="absolute -top-3 left-8 rounded-full bg-neon px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-navy">
                    Más popular
                  </span>
                )}
                <div className="flex items-baseline justify-between">
                  <h3 className={`text-2xl font-extrabold ${p.hl ? "text-cream" : "text-navy"}`}>
                    {p.n}
                  </h3>
                  {p.anual && (
                    <span className={`text-xs ${p.hl ? "text-cream/60" : "text-navy/55"}`}>
                      o ${p.anual}/año
                    </span>
                  )}
                </div>
                <p className={`mt-1 text-sm ${p.hl ? "text-cream/70" : "text-navy/60"}`}>{p.d}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`font-mono text-6xl font-extrabold ${p.hl ? "text-neon" : "text-navy"}`}>
                    ${p.p}
                  </span>
                  <span className={`text-sm ${p.hl ? "text-cream/60" : "text-navy/55"}`}>/mes</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.f.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.hl ? "text-neon" : "text-navy"}`} />
                      <span className={p.hl ? "text-cream/90" : "text-navy/85"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    p.hl
                      ? "bg-neon text-navy hover:scale-[1.02]"
                      : "bg-navy text-cream hover:scale-[1.02]"
                  }`}
                >
                  {p.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-dashed border-navy/20 bg-cream/40 p-6 text-sm text-navy/70">
            <span className="font-semibold text-navy">Adicionales:</span>
            {[
              ["Usuario adicional", "$5"],
              ["Agente de agendamiento", "$20"],
              ["Agente especializado", "$50"],
              ["Plataforma de pago", "incluida"],
            ].map(([t, p]) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span>{t}</span>
                <span className="rounded-full bg-navy/5 px-2 py-0.5 font-mono text-xs text-navy">
                  {p}
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
  const faqs = [
    { q: "¿Es difícil de usar?", a: "Setup en 5 minutos. Conectas WhatsApp, defines tus servicios y horarios, y listo. Nuestro equipo te acompaña en la activación sin costo." },
    { q: "¿Funciona con WhatsApp?", a: "Sí. brou opera nativo sobre WhatsApp Business API oficial. Tus clientes te escriben al mismo número de siempre." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia ni letra chica. Cancelas desde el dashboard en un clic." },
    { q: "¿Sirve para mi tipo de negocio?", a: "Si agendas citas o servicios — peluquerías, spas, clínicas, veterinarias, talleres, consultorios, coaches — brou se entrena con tu vocabulario y servicios." },
    { q: "¿Mis datos están seguros?", a: "Encriptados en tránsito y en reposo. Cumplimos con GDPR. Nunca compartimos información con terceros." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-border bg-surface py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Preguntas
              <br />
              <span className="italic text-neon">frecuentes.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-navy/70">
              ¿No encuentras respuesta?{" "}
              <a href="#cta" className="font-semibold text-navy underline decoration-neon decoration-2 underline-offset-4">
                Habla con nosotros
              </a>
              .
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            {faqs.map((f, i) => {
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
            <span className="text-cream/70">Empieza hoy</span>
          </Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
            Deja de perseguir clientes.
            <br />
            <span className="italic text-neon">Que ellos te encuentren.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-cream/70">
            Activa tu agente AI hoy. Primeros 14 días gratis, sin tarjeta.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-neon px-7 py-4 text-base font-bold text-navy transition-all hover:scale-[1.03] hover:shadow-neon"
            >
              Empezar gratis
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#solucion"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-7 py-4 text-base font-semibold text-cream backdrop-blur transition-colors hover:bg-cream/10"
            >
              Ver demo en vivo
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
  const [form, setForm] = useState({ nombre: "", email: "", negocio: "", mensaje: "" });
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
    if (!nombre || nombre.length > 100) return setError("Ingresa tu nombre (máx. 100).");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
      return setError("Ingresa un email válido.");
    if (!mensaje || mensaje.length > 1000) return setError("Escribe un mensaje (máx. 1000).");
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("ok");
    setForm({ nombre: "", email: "", negocio: "", mensaje: "" });
  };

  return (
    <section id="contacto" className="border-t border-border bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <div>
            <Eyebrow>Contacto</Eyebrow>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Hablemos de tu <span className="italic text-navy/60">negocio.</span>
            </h2>
            <p className="mt-4 max-w-md text-navy/70">
              Cuéntanos qué necesitas. Te respondemos en menos de 24 horas hábiles.
            </p>
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
                WhatsApp directo con ventas
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
                <span className="mb-1.5 block font-medium text-navy">Nombre</span>
                <input
                  required
                  maxLength={100}
                  value={form.nombre}
                  onChange={onChange("nombre")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-navy outline-none transition-colors focus:border-navy"
                  placeholder="María González"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-navy">Email</span>
                <input
                  required
                  type="email"
                  maxLength={255}
                  value={form.email}
                  onChange={onChange("email")}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-navy outline-none transition-colors focus:border-navy"
                  placeholder="tu@correo.com"
                />
              </label>
            </div>
            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block font-medium text-navy">Negocio (opcional)</span>
              <input
                maxLength={150}
                value={form.negocio}
                onChange={onChange("negocio")}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-navy outline-none transition-colors focus:border-navy"
                placeholder="Estudio, taller, clínica..."
              />
            </label>
            <label className="mt-4 block text-sm">
              <span className="mb-1.5 block font-medium text-navy">Mensaje</span>
              <textarea
                required
                rows={5}
                maxLength={1000}
                value={form.mensaje}
                onChange={onChange("mensaje")}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-navy outline-none transition-colors focus:border-navy"
                placeholder="Cuéntanos qué necesitas automatizar..."
              />
            </label>

            {error && (
              <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
            )}
            {status === "ok" && (
              <p className="mt-3 text-sm font-medium text-navy">
                ¡Gracias! Te contactaremos pronto.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-4 text-sm font-semibold text-cream transition-all hover:scale-[1.01] hover:shadow-pop disabled:opacity-60"
            >
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
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
  return (
    <footer className="bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <BrouLogo />
          <p className="mt-3 max-w-xs text-sm text-navy/65">
            Agendamiento automatizado por WhatsApp para negocios que valoran su tiempo.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-navy/75">
          <a href="#" className="hover:text-navy">Contacto</a>
          <a href="#" className="hover:text-navy">Términos</a>
          <a href="#" className="hover:text-navy">Privacidad</a>
          <a href="#" className="hover:text-navy">Instagram</a>
        </nav>
        <div className="font-mono text-xs text-navy/55">© 2026 brou</div>
      </div>
    </footer>
  );
}
