import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  MessageCircle,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  Users,
  Bot,
  Plus,
} from "lucide-react";
import logoBrou from "@/assets/logo-brou.svg";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ---------- helpers ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setShown(true));
      },
      { threshold: 0.15 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
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
      className={`${className} ${shown ? "animate-rise" : "opacity-0"}`}
    >
      {children}
    </div>
  );
}

/* ---------- sections ---------- */
function Nav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={logoBrou} alt="brou agenda" className="h-8 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#problema" className="hover:text-brand-green transition-colors">Problema</a>
          <a href="#solucion" className="hover:text-brand-green transition-colors">Solución</a>
          <a href="#planes" className="hover:text-brand-green transition-colors">Planes</a>
          <a href="#faq" className="hover:text-brand-green transition-colors">FAQ</a>
        </div>
        <a
          href="#planes"
          className="group inline-flex items-center gap-2 bg-brand-navy text-brand-cream px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-green hover:text-brand-navy transition-all"
        >
          Empezar
          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      {/* grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--brand-navy) 1px, transparent 1px), linear-gradient(90deg, var(--brand-navy) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* floating green blob */}
      <div
        className="absolute -top-20 -right-20 size-[420px] rounded-full bg-brand-green/30 blur-3xl animate-float pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 animate-rise">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-navy/20 bg-background text-xs font-mono uppercase tracking-wider mb-8">
            <span className="size-2 rounded-full bg-brand-green animate-pulse-ring" />
            Agente AI activo · WhatsApp
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-balance">
            Tu agenda,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">en piloto</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-brand-green -z-0 -skew-x-6" />
            </span>{" "}
            automático.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
            <span className="font-semibold text-foreground">brou | agenda</span> es el sistema
            con agente AI que conversa por WhatsApp, agenda citas, cobra anticipos y nunca duerme.
            Tú atiendes; nosotros llenamos tu calendario.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#planes"
              className="group relative overflow-hidden inline-flex items-center gap-2 bg-brand-navy text-brand-cream px-6 py-4 rounded-full font-semibold"
            >
              <span className="relative z-10 flex items-center gap-2">
                Probar gratis 14 días
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-brand-green translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 mix-blend-difference text-brand-navy" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-brand-navy/20 font-semibold hover:border-brand-navy transition-colors"
            >
              Ver demo
            </a>
          </div>

          {/* trust strip */}
          <div className="mt-12 flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <div className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-brand-green" /> Sin tarjeta</div>
            <div className="flex items-center gap-1.5"><Zap className="size-4 text-brand-green" /> Setup 5 min</div>
            <div className="flex items-center gap-1.5"><Bot className="size-4 text-brand-green" /> AI 24/7</div>
          </div>
        </div>

        {/* mock chat + calendar */}
        <div className="lg:col-span-5 animate-rise [animation-delay:200ms] relative">
          <div className="absolute -inset-4 bg-brand-green/20 rounded-3xl blur-2xl" />
          <div className="relative grid gap-4">
            <ChatMock />
            <CalendarMock />
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="relative border-t border-border bg-brand-navy text-brand-cream overflow-hidden">
        <div className="flex gap-12 py-4 whitespace-nowrap animate-marquee font-mono text-sm uppercase tracking-widest">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              {["Veterinarias", "Peluquerías", "Spas", "Clínicas", "Barberías", "Estudios", "Talleres", "Consultorios"].map((t) => (
                <span key={t} className="flex items-center gap-12">
                  {t}
                  <span className="text-brand-green">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatMock() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 2200);
    return () => clearInterval(id);
  }, []);
  const msgs = [
    { from: "user", text: "Hola, quiero agendar un corte para mañana 🙏" },
    { from: "bot", text: "¡Claro! Tengo disponible 10:00, 14:00 y 16:30. ¿Cuál prefieres?" },
    { from: "user", text: "14:00 está perfecto" },
    { from: "bot", text: "Listo ✓ Cita confirmada. Te envié el recordatorio." },
  ];
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-full bg-brand-green grid place-items-center">
            <MessageCircle className="size-4 text-brand-navy" />
          </div>
          <div>
            <div className="text-sm font-semibold">Agente brou</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-brand-green" /> en línea
            </div>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">WhatsApp</span>
      </div>
      <div className="space-y-2 pt-4 min-h-[180px]">
        {msgs.slice(0, step + 1).map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm animate-slide-up ${
              m.from === "user"
                ? "bg-muted ml-auto rounded-br-sm"
                : "bg-brand-navy text-brand-cream rounded-bl-sm"
            }`}
          >
            {m.text}
          </div>
        ))}
        {step < msgs.length - 1 && (
          <div className="bg-brand-navy/80 text-brand-cream w-12 rounded-2xl px-3 py-2 text-sm">
            <span className="inline-flex gap-1">
              <span className="size-1.5 rounded-full bg-brand-green animate-blink" />
              <span className="size-1.5 rounded-full bg-brand-green animate-blink [animation-delay:200ms]" />
              <span className="size-1.5 rounded-full bg-brand-green animate-blink [animation-delay:400ms]" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarMock() {
  return (
    <div className="bg-brand-navy text-brand-cream rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-brand-green" />
          <span className="text-sm font-semibold">Hoy · 14 nuevas reservas</span>
        </div>
        <span className="text-xs font-mono text-brand-green">+38%</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { h: "10:00", n: "Sofía R.", s: "Corte" },
          { h: "11:30", n: "Diego M.", s: "Tinte" },
          { h: "14:00", n: "Lía P.", s: "Mechas" },
        ].map((c, i) => (
          <div
            key={c.h}
            style={{ animationDelay: `${i * 150}ms` }}
            className="animate-slide-up bg-brand-cream/5 border border-brand-cream/10 rounded-lg p-2 hover:border-brand-green transition-colors"
          >
            <div className="text-xs font-mono text-brand-green">{c.h}</div>
            <div className="text-xs font-semibold mt-1 truncate">{c.n}</div>
            <div className="text-[10px] text-brand-cream/60">{c.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Problema() {
  const items = [
    { icon: MessageCircle, t: "Mensajes ignorados", d: "Tu cliente escribe a las 10pm. Cuando respondes, ya reservó en otro lado." },
    { icon: Clock, t: "Agenda desordenada", d: "Citas duplicadas, horarios cruzados y notas perdidas en post-its." },
    { icon: TrendingUp, t: "Dinero que se fuga", d: "No-shows, cancelaciones de último minuto y huecos en el calendario." },
  ];
  return (
    <section id="problema" className="py-24 bg-brand-green text-brand-navy border-y-4 border-brand-navy">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-none tracking-tight max-w-4xl text-balance">
            Cada mensaje sin responder<br />
            <span className="italic">es plata que pierdes.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-px bg-brand-navy border border-brand-navy">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 100} className="bg-brand-green p-8 group hover:bg-brand-navy hover:text-brand-cream transition-colors">
              <it.icon className="size-8 mb-6 group-hover:text-brand-green transition-colors" />
              <h3 className="text-xl font-bold mb-2">{it.t}</h3>
              <p className="text-sm opacity-80">{it.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solucion() {
  return (
    <section id="solucion" className="py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest text-brand-green mb-4">// La solución</div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-balance">
            Un agente AI entrenado en <span className="text-brand-green">tu negocio.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            brou conversa con tus clientes en WhatsApp como tu mejor recepcionista: con tu tono,
            tus horarios, tus servicios. Agenda, reagenda, cobra anticipo y envía recordatorios
            automáticos. Sin apps nuevas para tus clientes.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Agendamiento 24/7 sin intervención humana",
              "Confirmaciones y recordatorios automáticos",
              "Integración con cobros y conciliación de pagos",
              "Panel con métricas y gestión de personal",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-1 size-5 rounded-full bg-brand-green grid place-items-center shrink-0">
                  <Check className="size-3 text-brand-navy" strokeWidth={3} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <BeneficiosGrid />
        </Reveal>
      </div>
    </section>
  );
}

function BeneficiosGrid() {
  const stats = [
    { v: "+38%", l: "Más reservas confirmadas", icon: TrendingUp },
    { v: "−72%", l: "No-shows con anticipo", icon: ShieldCheck },
    { v: "24/7", l: "Disponibilidad real", icon: Zap },
    { v: "5 min", l: "Setup inicial", icon: Sparkles },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((s, i) => (
        <div
          key={s.l}
          style={{ animationDelay: `${i * 80}ms` }}
          className="animate-rise bg-brand-navy text-brand-cream rounded-2xl p-6 hover:-translate-y-1 hover:bg-brand-green hover:text-brand-navy transition-all duration-300 group"
        >
          <s.icon className="size-6 text-brand-green group-hover:text-brand-navy mb-4 transition-colors" />
          <div className="font-display text-4xl font-bold">{s.v}</div>
          <div className="text-xs mt-1 opacity-70">{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function ComoFunciona() {
  const steps = [
    { n: "01", t: "Configuras", d: "Subes tus servicios, horarios y conectas tu WhatsApp Business en minutos.", icon: Calendar },
    { n: "02", t: "Tus clientes agendan", d: "El agente AI conversa, propone horarios y confirma la cita por chat.", icon: MessageCircle },
    { n: "03", t: "El sistema recuerda", d: "Recordatorios automáticos, cobro de anticipo y métricas en tu panel.", icon: Bot },
  ];
  return (
    <section id="como-funciona" className="py-24 bg-brand-navy text-brand-cream relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--brand-green) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-widest text-brand-green mb-4">// Cómo funciona</div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl text-balance">
            Tres pasos. Cero fricción.
          </h2>
        </Reveal>
        <div className="mt-20 grid md:grid-cols-3 gap-8 relative">
          {/* connecting line */}
          <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-px bg-brand-green/30" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 150} className="relative">
              <div className="relative">
                <div className="size-24 rounded-full bg-brand-cream/5 border border-brand-cream/10 grid place-items-center mb-6 group-hover:border-brand-green transition-colors relative">
                  <s.icon className="size-10 text-brand-green" />
                  <span className="absolute -top-2 -right-2 size-9 rounded-full bg-brand-green text-brand-navy font-mono font-bold text-sm grid place-items-center">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{s.t}</h3>
                <p className="text-brand-cream/70 max-w-xs">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonios() {
  const data = [
    { n: "María González", r: "Veterinaria Patitas", t: "Pasamos de 60% a 92% de citas confirmadas. El agente atiende incluso de madrugada." },
    { n: "Carlos Pérez", r: "Barbería Norte", t: "Ya no contesto WhatsApp. brou agenda solo y los clientes llegan puntuales." },
    { n: "Ana Ríos", r: "Spa Lumen", t: "El cobro de anticipo eliminó casi todos los no-shows. Brutal." },
  ];
  return (
    <section className="py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-8 flex-wrap mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl text-balance">
              Negocios que ya recuperaron su tiempo.
            </h2>
            <div className="flex items-center gap-3 font-mono text-sm">
              <Users className="size-5 text-brand-green" />
              <span>+450 negocios activos</span>
            </div>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((d, i) => (
            <Reveal key={d.n} delay={i * 100}>
              <div className="h-full p-8 border border-border rounded-2xl hover:border-brand-green hover:-translate-y-1 transition-all bg-card">
                <div className="text-brand-green text-3xl font-display leading-none mb-4">"</div>
                <p className="text-foreground/90 mb-6">{d.t}</p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold">{d.n}</div>
                  <div className="text-sm text-muted-foreground">{d.r}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Planes() {
  const plans = [
    {
      name: "Básico",
      price: "20",
      yearly: "$150 / año",
      desc: "Para profesionales independientes que arrancan.",
      features: ["Dashboard y calendario", "3 usuarios", "Gestión de personal y roles", "Servicios y horarios", "Registro de clientes"],
      cta: "Empezar",
      featured: false,
    },
    {
      name: "Startup",
      price: "50",
      yearly: "Más popular",
      desc: "Incluye todo el plan Básico + automatización AI.",
      features: ["5 usuarios", "Agente AI por WhatsApp", "Métricas avanzadas", "Plataforma de pagos", "Conciliación automática"],
      cta: "Probar 14 días",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "100",
      yearly: "Multi-sucursal",
      desc: "Para negocios con operación compleja.",
      features: ["10 usuarios", "Gestión de comisiones", "Informe financiero", "Integración CRM / ERP", "Dominio personalizado"],
      cta: "Contactar",
      featured: false,
    },
  ];
  return (
    <section id="planes" className="py-24 bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-green mb-4">// Planes</div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-balance">
              Precios honestos. Sin letra chica.
            </h2>
            <p className="mt-4 text-muted-foreground">Cancela cuando quieras. Sin contratos.</p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div
                className={`relative h-full rounded-3xl p-8 flex flex-col transition-all hover:-translate-y-2 ${
                  p.featured
                    ? "bg-brand-navy text-brand-cream border-2 border-brand-green shadow-2xl shadow-brand-green/20"
                    : "bg-card border border-border"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-green text-brand-navy font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                    ★ Recomendado
                  </span>
                )}
                <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">{p.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-6xl font-bold">${p.price}</span>
                  <span className="text-sm opacity-60">/mes</span>
                </div>
                <div className={`text-xs mb-6 ${p.featured ? "text-brand-green" : "text-muted-foreground"}`}>{p.yearly}</div>
                <p className="text-sm opacity-80 mb-6">{p.desc}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`size-4 mt-0.5 shrink-0 ${p.featured ? "text-brand-green" : "text-brand-navy"}`} strokeWidth={3} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-all ${
                    p.featured
                      ? "bg-brand-green text-brand-navy hover:bg-brand-cream"
                      : "bg-brand-navy text-brand-cream hover:bg-brand-green hover:text-brand-navy"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Adicionales */}
        <Reveal>
          <div className="mt-12 p-6 rounded-2xl border border-dashed border-border bg-card">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              <Plus className="size-4" /> Complementos
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              {[
                ["Usuario adicional", "$5"],
                ["Agente de agendamiento", "$20"],
                ["Agente especializado", "$50"],
                ["Plataforma de pago", "Consultar"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-border pb-2">
                  <span>{k}</span>
                  <span className="font-mono font-semibold text-brand-navy">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "¿Es difícil de usar?", a: "Para nada. Configuras horarios y servicios desde un panel simple. En 5 minutos estás listo." },
    { q: "¿Funciona con mi WhatsApp actual?", a: "Sí, se integra con WhatsApp Business. No necesitas un número nuevo." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí, sin permanencia. Pausas o cancelas desde tu panel." },
    { q: "¿Sirve para mi tipo de negocio?", a: "Veterinarias, peluquerías, spas, clínicas, talleres, consultorios… cualquier negocio que agende citas." },
    { q: "¿Cobra anticipos automáticamente?", a: "Sí, en planes Startup y Enterprise. Reduce los no-shows hasta un 72%." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 border-b border-border">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-green mb-4">// Dudas</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Preguntas frecuentes</h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {items.map((it, i) => (
            <Reveal key={it.q} delay={i * 60}>
              <div className="border border-border rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold pr-4">{it.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 transition-transform duration-300 text-brand-green ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-muted-foreground">{it.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="py-32 bg-brand-navy text-brand-cream relative overflow-hidden">
      <div className="absolute inset-0 animate-tilt">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-brand-green/10 blur-3xl" />
      </div>
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-balance">
            Deja de perseguir clientes.<br />
            <span className="text-brand-green italic">Que ellos te encuentren.</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 text-lg text-brand-cream/70 max-w-xl mx-auto">
            Activa tu agente AI hoy. Primeros 14 días gratis, sin tarjeta.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#planes"
              className="group inline-flex items-center gap-2 bg-brand-green text-brand-navy px-8 py-5 rounded-full font-bold text-lg hover:bg-brand-cream transition-all hover:scale-105"
            >
              Empezar gratis
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-2 border border-brand-cream/20 px-8 py-5 rounded-full font-semibold text-lg hover:border-brand-green hover:text-brand-green transition-colors"
            >
              Ver demo en vivo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <img src={logoBrou} alt="brou" className="h-8 w-auto mb-3" />
          <p className="text-sm text-muted-foreground max-w-xs">
            Agendamiento automatizado por WhatsApp para negocios que valoran su tiempo.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <a href="#" className="hover:text-brand-green transition-colors">Contacto</a>
          <a href="#" className="hover:text-brand-green transition-colors">Términos</a>
          <a href="#" className="hover:text-brand-green transition-colors">Privacidad</a>
          <a href="#" className="hover:text-brand-green transition-colors">Instagram</a>
        </div>
        <div className="text-xs text-muted-foreground font-mono">© 2026 brou</div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <>
      {/* fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <main className="bg-background text-foreground selection:bg-brand-green selection:text-brand-navy">
        <Nav />
        <Hero />
        <Problema />
        <Solucion />
        <ComoFunciona />
        <Testimonios />
        <Planes />
        <FAQ />
        <CTAFinal />
        <Footer />
      </main>
    </>
  );
}
