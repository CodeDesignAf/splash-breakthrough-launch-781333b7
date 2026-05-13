import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarX2,
  PhoneOff,
  Bot,
  Workflow,
  CreditCard,
  BarChart3,
  ArrowRight,
  Check,
  Terminal,
  Zap,
  Clock,
  Plug,
  TrendingDown,
  Frown,
  Flame,
  EyeOff,
  Quote,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agendia — Agendamiento automatizado con IA 24/7" },
      {
        name: "description",
        content:
          "Agentes de IA que agendan citas, confirman, cobran y reportan por ti. Recupera tiempo y deja de perder clientes.",
      },
      { property: "og:title", content: "Agendia — Agendamiento automatizado con IA" },
      {
        property: "og:description",
        content: "Agentes de IA que agendan, confirman y cobran por ti, 24/7.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
  }),
  component: Landing,
});

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-neon px-3 py-1 font-mono text-xs uppercase tracking-widest text-neon">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />
      {children}
    </span>
  );
}

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
      <span className="text-neon">[{n}]</span>
      <span>{children}</span>
      <span className="ml-2 h-px flex-1 bg-border" />
    </div>
  );
}

function Landing() {
  return (
    <main className="min-h-screen text-foreground">
      <Nav />
      <Hero />
      <Problema />
      <Consecuencias />
      <Solucion />
      <Beneficios />
      <ComoFunciona />
      <PruebaSocial />
      <Planes />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-mono text-lg font-bold">
          <span className="text-neon">▮</span>AGENDIA<span className="text-neon">_</span>
        </a>
        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest md:flex">
          <a href="#problema" className="hover:text-neon">Problema</a>
          <a href="#como" className="hover:text-neon">Cómo funciona</a>
          <a href="#planes" className="hover:text-neon">Planes</a>
          <a href="#faq" className="hover:text-neon">FAQ</a>
        </nav>
        <a
          href="#cta"
          className="border border-neon bg-neon px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-neon-foreground shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          Probar gratis
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Tag>Sistema operativo de agendamiento</Tag>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
            Tu negocio agenda solo.
            <br />
            <span className="text-neon text-glow">Tú cobras.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Agentes de IA que conversan con tus clientes, agendan citas,
            confirman, recuerdan y cobran por ti.{" "}
            <span className="text-foreground">24/7. Sin perder una sola llamada.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 border-2 border-neon bg-neon px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-neon-foreground shadow-brutal transition-transform hover:-translate-x-1 hover:-translate-y-1"
            >
              Probar gratis <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#como"
              className="inline-flex items-center gap-2 border-2 border-border bg-surface px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-foreground hover:border-neon hover:text-neon"
            >
              Agendar demo
            </a>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 font-mono">
            {[
              { k: "+38%", v: "show-rate" },
              { k: "24/7", v: "uptime" },
              { k: "<2s", v: "respuesta" },
            ].map((s) => (
              <div key={s.v} className="border border-border p-3">
                <div className="text-2xl font-bold text-neon">{s.k}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <TerminalMock />
        </div>
      </div>
    </section>
  );
}

function TerminalMock() {
  return (
    <div className="border-2 border-neon bg-surface shadow-brutal">
      <div className="flex items-center justify-between border-b border-border bg-background px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-2">
          <Terminal className="h-3 w-3 text-neon" /> agendia.live
        </div>
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-muted" />
          <span className="h-2 w-2 rounded-full bg-muted" />
          <span className="h-2 w-2 rounded-full bg-neon" />
        </div>
      </div>
      <div className="space-y-3 p-5 font-mono text-sm">
        <div className="text-muted-foreground">[09:42] Cliente → WhatsApp</div>
        <div className="border-l-2 border-neon pl-3">
          "Hola, quiero una cita para mañana en la tarde"
        </div>
        <div className="text-muted-foreground">[09:42] Agente IA</div>
        <div className="border-l-2 border-border pl-3 text-foreground">
          ✓ Agenda revisada<br />
          ✓ Slot 16:30 disponible<br />
          ✓ Confirmación enviada<br />
          ✓ Pago $25 capturado
        </div>
        <div className="mt-4 flex items-center gap-2 border border-neon bg-neon/10 px-3 py-2 text-xs uppercase tracking-widest text-neon">
          <Zap className="h-3 w-3" /> cita_creada · 7s · sin humano
        </div>
      </div>
    </div>
  );
}

function Problema() {
  const items = [
    { icon: CalendarX2, t: "Pierdes citas", d: "Llamadas perdidas fuera de horario = ingresos que nunca llegan." },
    { icon: PhoneOff, t: "Tu equipo se quema", d: "Recepcionistas saturadas respondiendo lo mismo todo el día." },
    { icon: Clock, t: "Olvidos y no-shows", d: "Sin recordatorios, hasta 30% de citas no se presentan." },
    { icon: BarChart3, t: "No sabes qué pasa", d: "Cero visibilidad de conversión, cancelaciones, ingresos reales." },
  ];
  return (
    <section id="problema" className="border-b border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionLabel n="01">El problema</SectionLabel>
        <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Cada llamada perdida es <span className="text-neon">dinero quemado</span>.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.t} className="border border-border bg-background p-6 transition-colors hover:border-neon">
              <i.icon className="h-8 w-8 text-neon" />
              <h3 className="mt-4 text-lg font-bold">{i.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Consecuencias() {
  const items = [
    { icon: TrendingDown, t: "Dinero perdido", d: "Cada no-show y cada llamada fuera de horario es ingreso que se evapora." },
    { icon: Frown, t: "Clientes frustrados", d: "Esperas, mensajes sin responder y agendas confusas erosionan tu marca." },
    { icon: Flame, t: "Estrés operativo", d: "Tu equipo apaga incendios todo el día en vez de hacer crecer el negocio." },
    { icon: EyeOff, t: "Sin control real", d: "Operas a ciegas: no sabes cuánto pierdes ni dónde está la fuga." },
  ];
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionLabel n="02">Consecuencias</SectionLabel>
        <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Lo que <span className="text-neon">realmente cuesta</span> no resolverlo.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.t} className="border-2 border-border bg-surface p-6 transition-colors hover:border-neon">
              <i.icon className="h-8 w-8 text-neon" />
              <h3 className="mt-4 text-lg font-bold">{i.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solucion() {
  const items = [
    { icon: Bot, t: "Agente conversacional", d: "Atiende WhatsApp, web y voz como un humano. Mejor que un humano cansado." },
    { icon: Workflow, t: "Automatización end-to-end", d: "Agenda, confirma, recuerda, recobra y reporta sin intervención." },
    { icon: CreditCard, t: "Cobra al confirmar", d: "Integra Stripe / pagos locales. Adiós a no-shows que no cuestan nada." },
  ];
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionLabel n="02">La solución</SectionLabel>
        <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Agentes de IA que <span className="text-neon">trabajan mientras duermes</span>.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((i) => (
            <div key={i.t} className="border-2 border-border bg-surface p-6 hover:border-neon">
              <div className="inline-flex border border-neon p-2"><i.icon className="h-6 w-6 text-neon" /></div>
              <h3 className="mt-4 text-xl font-bold">{i.t}</h3>
              <p className="mt-2 text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Beneficios() {
  const list = [
    "Recupera 15+ horas a la semana",
    "Reduce no-shows hasta 60% con recordatorios",
    "Cobra antes de la cita y elimina pérdidas",
    "Atiende 24/7 sin contratar más personal",
    "Reportes claros de ingresos, conversión y agentes",
    "Conecta tu calendario, CRM y pasarela en minutos",
  ];
  return (
    <section className="border-b border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionLabel n="03">Beneficios</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-2">
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Menos fricción.<br />
            <span className="text-neon">Más ingresos.</span>
          </h2>
          <ul className="space-y-4">
            {list.map((b) => (
              <li key={b} className="flex items-start gap-3 border-b border-border pb-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-neon" />
                <span className="text-lg">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const steps = [
    { n: "01", t: "Conecta", d: "Sincroniza tu calendario, WhatsApp y pasarela de pago. 5 minutos." },
    { n: "02", t: "Configura", d: "Define servicios, horarios, precios y el tono de tu agente IA." },
    { n: "03", t: "Activa", d: "Tu agente empieza a agendar, confirmar y cobrar. Tú revisas el dashboard." },
  ];
  return (
    <section id="como" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionLabel n="04">Cómo funciona</SectionLabel>
        <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Tres pasos. <span className="text-neon">Cero fricción.</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative border-2 border-border bg-surface p-8 hover:border-neon">
              <div className="font-mono text-6xl font-bold text-neon/20">{s.n}</div>
              <h3 className="mt-4 text-2xl font-bold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
              <Plug className="absolute right-6 top-6 h-5 w-5 text-neon/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Planes() {
  const plans = [
    {
      n: "Básico",
      p: "20",
      d: "Para empezar a automatizar.",
      f: ["1 usuario", "Agenda inteligente", "Recordatorios automáticos", "Hasta 200 citas/mes"],
    },
    {
      n: "Startup",
      p: "50",
      d: "Para equipos que crecen.",
      f: ["3 usuarios", "Agente IA de agendamiento", "Cobros integrados", "Reportes y métricas", "Soporte prioritario"],
      highlight: true,
    },
    {
      n: "Enterprise",
      p: "100",
      d: "Operación completa.",
      f: ["10 usuarios", "Gestión de comisiones", "Informe de finanzas", "Integraciones CRM/ERP", "Dominio personalizado"],
    },
  ];
  return (
    <section id="planes" className="border-b border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionLabel n="05">Planes</SectionLabel>
        <h2 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Precios <span className="text-neon">honestos</span>. Sin letra chica.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((pl) => (
            <div
              key={pl.n}
              className={`relative border-2 p-8 ${
                pl.highlight
                  ? "border-neon bg-background shadow-brutal"
                  : "border-border bg-background hover:border-neon"
              }`}
            >
              {pl.highlight && (
                <span className="absolute -top-3 left-6 border border-neon bg-neon px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-neon-foreground">
                  Recomendado
                </span>
              )}
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{pl.n}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-mono text-5xl font-bold text-neon">${pl.p}</span>
                <span className="text-sm text-muted-foreground">/mes</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{pl.d}</p>
              <ul className="mt-6 space-y-3">
                {pl.f.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-neon" /> {feat}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-8 block border-2 border-neon px-4 py-3 text-center font-mono text-xs font-bold uppercase tracking-widest ${
                  pl.highlight
                    ? "bg-neon text-neon-foreground"
                    : "text-neon hover:bg-neon hover:text-neon-foreground"
                }`}
              >
                Empezar
              </a>
            </div>
          ))}
        </div>
        <div className="mt-10 border border-dashed border-border bg-background p-6 font-mono text-sm">
          <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Adicionales</div>
          <div className="grid gap-3 md:grid-cols-4">
            {[
              ["Usuario adicional", "$5"],
              ["Agente de agendamiento", "$20"],
              ["Agente especializado", "$50"],
              ["Plataforma de pago", "incluida"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-border pb-2">
                <span>{k}</span>
                <span className="text-neon">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    { q: "¿Necesito saber de tecnología?", a: "No. Te ayudamos con la configuración inicial y todo se opera desde un dashboard simple." },
    { q: "¿Funciona con mi calendario actual?", a: "Sí. Integramos Google Calendar, Outlook y los principales sistemas de citas." },
    { q: "¿Puedo cobrar al agendar?", a: "Sí. Conectamos Stripe y pasarelas locales. Cobras al confirmar la cita." },
    { q: "¿Hay permanencia?", a: "Ninguna. Cancelas cuando quieras desde tu cuenta." },
    { q: "¿Qué pasa si supero el límite del plan?", a: "Te avisamos con tiempo y puedes ampliar a un plan superior o agregar adicionales." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <SectionLabel n="06">FAQ</SectionLabel>
        <h2 className="text-4xl font-bold leading-tight md:text-5xl">
          Preguntas <span className="text-neon">frecuentes</span>.
        </h2>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {qs.map((item, idx) => (
            <button
              key={item.q}
              onClick={() => setOpen(open === idx ? null : idx)}
              className="block w-full py-5 text-left"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-semibold">{item.q}</span>
                <span className="font-mono text-2xl text-neon">{open === idx ? "−" : "+"}</span>
              </div>
              {open === idx && (
                <p className="mt-3 text-muted-foreground">{item.a}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section id="cta" className="border-b border-border bg-surface/30">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <Tag>Listos para activar</Tag>
        <h2 className="mt-6 font-display text-5xl font-bold leading-[1] md:text-7xl">
          Deja de perder citas.
          <br />
          <span className="text-neon text-glow">Empieza hoy.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          14 días gratis. Sin tarjeta. Sin permanencia. Si no recuperas tiempo en la primera semana, no pagas.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="tu@email.com"
            className="flex-1 border-2 border-border bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-neon focus:outline-none"
          />
          <button
            type="submit"
            className="border-2 border-neon bg-neon px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-neon-foreground shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Probar gratis
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 font-mono text-xs uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
        <div>
          <span className="text-neon">▮</span> AGENDIA<span className="text-neon">_</span> · © 2026
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-neon">Términos</a>
          <a href="#" className="hover:text-neon">Privacidad</a>
          <a href="#" className="hover:text-neon">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
