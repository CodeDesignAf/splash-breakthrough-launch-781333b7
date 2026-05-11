import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Check,
  MessageCircle,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  Users,
  Bot,
  Plus,
  Clock,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoBrou from "@/assets/logo-brou.svg";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ---------- scroll hooks ---------- */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0); // 0..1 across the pinned scroll range
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const v = Math.max(0, Math.min(1, scrolled / total));
        setP(v);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, p };
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.2 },
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
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- main ---------- */
function Landing() {
  const y = useScrollY();
  const docHeight =
    typeof window !== "undefined"
      ? document.documentElement.scrollHeight - window.innerHeight
      : 1;
  const progress = Math.min(1, Math.max(0, y / Math.max(docHeight, 1)));

  return (
    <div className="bg-brand-cream text-brand-navy overflow-x-hidden font-[Inter]">
      {/* progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-brand-green z-[60] origin-left"
        style={{ transform: `scaleX(${progress})`, width: "100%" }}
      />

      <Nav />
      <Hero />
      <Marquee />
      <PinnedScene />
      <HorizontalSteps />
      <Benefits />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------- nav ---------- */
function Nav() {
  const y = useScrollY();
  const solid = y > 40;
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? "backdrop-blur-xl bg-brand-cream/70 border-b border-brand-navy/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={logoBrou} alt="brou" className="h-7" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#scene" className="hover:text-brand-green transition">Cómo funciona</a>
          <a href="#beneficios" className="hover:text-brand-green transition">Beneficios</a>
          <a href="#planes" className="hover:text-brand-green transition">Planes</a>
          <a href="#faq" className="hover:text-brand-green transition">FAQ</a>
        </nav>
        <a
          href="#cta"
          className="group inline-flex items-center gap-2 bg-brand-navy text-brand-cream px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-green hover:text-brand-navy transition"
        >
          Probar gratis
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
        </a>
      </div>
    </header>
  );
}

/* ---------- hero with 3D phone ---------- */
function Hero() {
  const y = useScrollY();
  // 3D rotate based on scroll (first 700px)
  const t = Math.min(1, y / 700);
  const rotX = 18 - t * 18;
  const rotY = -22 + t * 22;
  const scale = 0.95 + t * 0.05;
  const translateY = t * -40;

  return (
    <section
      id="top"
      className="relative min-h-screen pt-28 pb-24 px-5 sm:px-8 overflow-hidden"
    >
      {/* aurora bg */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-40 animate-aurora"
          style={{ background: "radial-gradient(circle, var(--brand-green) 0%, transparent 60%)" }}
        />
        <div
          className="absolute top-40 -right-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-30 animate-aurora"
          style={{
            background: "radial-gradient(circle, var(--brand-navy) 0%, transparent 60%)",
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06] animate-grid-pan"
          style={{
            backgroundImage:
              "linear-gradient(var(--brand-navy) 1px, transparent 1px), linear-gradient(90deg, var(--brand-navy) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy/5 border border-brand-navy/10 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-brand-green" />
              AGENDAMIENTO CON IA POR WHATSAPP
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-5 font-[Bricolage_Grotesque] text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              Tus citas se{" "}
              <span className="relative inline-block">
                <span className="relative z-10">agendan solas.</span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-brand-green/60 -z-0" />
              </span>
              <br />
              Tú haces el resto.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-lg text-brand-navy/70 max-w-lg">
              brou conversa, agenda y confirma por WhatsApp con tus clientes 24/7.
              Tu negocio nunca duerme — tú sí.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 bg-brand-navy text-brand-cream px-6 py-3.5 rounded-full font-semibold hover:bg-brand-green hover:text-brand-navy transition shadow-lg shadow-brand-navy/20"
              >
                Probar 14 días gratis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </a>
              <a
                href="#scene"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold border border-brand-navy/20 hover:border-brand-navy transition"
              >
                Ver cómo funciona
              </a>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <div className="mt-10 flex items-center gap-6 text-xs text-brand-navy/60">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-green" /> Sin tarjeta
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-green" /> Setup en 5 min
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-green" /> Cancela cuando quieras
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3D phone */}
        <div
          className="relative mx-auto"
          style={{ perspective: "1400px" }}
        >
          <div
            className="relative w-[300px] sm:w-[340px] aspect-[9/19] rounded-[3rem] bg-brand-navy p-3 shadow-2xl shadow-brand-navy/40"
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale}) translateY(${translateY}px)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.1s linear",
            }}
          >
            <div className="absolute inset-3 rounded-[2.5rem] bg-gradient-to-b from-[#075E54] to-[#128C7E] overflow-hidden flex flex-col">
              <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand-navy" />
                </div>
                <div>
                  <div className="text-sm font-semibold">brou · agenda</div>
                  <div className="text-[10px] opacity-80">en línea</div>
                </div>
              </div>
              <div
                className="flex-1 p-3 space-y-2 text-xs"
                style={{ background: "#ECE5DD" }}
              >
                <Bubble side="left" delay={0}>Hola, quisiera reservar un corte 💈</Bubble>
                <Bubble side="right" delay={500}>¡Hola! Tengo disponible mañana 10:00 o 15:00 ⏰</Bubble>
                <Bubble side="left" delay={1100}>Mañana 15:00 perfecto</Bubble>
                <Bubble side="right" delay={1700}>
                  ✅ Reservado. Te llega recordatorio 1h antes.
                </Bubble>
              </div>
              <div className="bg-white px-3 py-2 flex items-center gap-2">
                <div className="flex-1 h-7 rounded-full bg-gray-100" />
                <div className="w-7 h-7 rounded-full bg-[#128C7E]" />
              </div>
            </div>
            {/* floating calendar card */}
            <div
              className="absolute -right-10 top-20 w-44 rounded-2xl bg-brand-cream p-3 shadow-xl border border-brand-navy/10 animate-float"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="flex items-center gap-2 text-xs font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5 text-brand-green" />
                Cita confirmada
              </div>
              <div className="text-[11px] text-brand-navy/70">Mañana · 15:00</div>
              <div className="mt-2 h-1.5 rounded-full bg-brand-green/30 overflow-hidden">
                <div className="h-full w-3/4 bg-brand-green" />
              </div>
            </div>
            {/* floating stat */}
            <div
              className="absolute -left-8 bottom-24 rounded-2xl bg-brand-navy text-brand-cream p-3 shadow-xl animate-float"
              style={{ transform: "translateZ(40px)", animationDelay: "1.5s" }}
            >
              <div className="text-[10px] opacity-70">Esta semana</div>
              <div className="text-2xl font-bold text-brand-green">+47</div>
              <div className="text-[10px]">citas auto-agendadas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({
  children,
  side,
  delay,
}: {
  children: React.ReactNode;
  side: "left" | "right";
  delay: number;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`flex ${side === "right" ? "justify-end" : "justify-start"} transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div
        className={`max-w-[85%] px-3 py-1.5 rounded-lg leading-snug ${
          side === "right"
            ? "bg-[#DCF8C6] text-brand-navy rounded-tr-none"
            : "bg-white text-brand-navy rounded-tl-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- marquee ---------- */
function Marquee() {
  const items = [
    "Barberías", "Spas", "Clínicas", "Estéticas", "Consultorios",
    "Talleres", "Veterinarias", "Coaches", "Estudios", "Restaurantes",
  ];
  return (
    <section className="py-10 bg-brand-navy text-brand-cream overflow-hidden border-y border-brand-navy">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="text-2xl font-[Bricolage_Grotesque] font-semibold flex items-center gap-12">
            {it}
            <span className="text-brand-green">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- pinned scene: chat → calendar morph ---------- */
function PinnedScene() {
  const { ref, p } = useSectionProgress<HTMLDivElement>();
  // p: 0..1
  const chatOpacity = Math.max(0, 1 - p * 2);
  const calOpacity = Math.max(0, Math.min(1, (p - 0.4) * 2.5));
  const titleY = -p * 60;
  const phoneRot = -10 + p * 10;
  const phoneScale = 1 + p * 0.1;

  return (
    <section
      id="scene"
      ref={ref}
      className="relative"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-gradient-to-b from-brand-cream to-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--brand-navy) 1px, transparent 1px), linear-gradient(90deg, var(--brand-navy) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div style={{ transform: `translateY(${titleY}px)` }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-xs font-bold tracking-wide">
              EN VIVO
            </span>
            <h2 className="mt-4 font-[Bricolage_Grotesque] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95]">
              Una conversación.
              <br />
              <span className="text-brand-green">Una cita confirmada.</span>
            </h2>
            <p className="mt-5 text-lg text-brand-navy/70 max-w-md">
              brou entiende lenguaje natural, propone horarios reales de tu agenda
              y confirma la cita. Sin formularios, sin enlaces, sin fricción.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: MessageCircle, t: "Cliente escribe" },
                { icon: Bot, t: "IA agenda" },
                { icon: Calendar, t: "Cita en tu calendario" },
              ].map((s, i) => {
                const active = p > i / 3 - 0.1;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-4 transition-all duration-500 ${
                      active ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-2"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                        active ? "bg-brand-green text-brand-navy" : "bg-brand-navy/10"
                      }`}
                    >
                      <s.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">{s.t}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* morphing visual */}
          <div className="relative h-[480px] flex items-center justify-center" style={{ perspective: "1200px" }}>
            <div
              className="absolute w-[280px] aspect-[9/19] rounded-[2.5rem] bg-brand-navy p-2.5 shadow-2xl"
              style={{
                opacity: chatOpacity,
                transform: `rotateY(${phoneRot}deg) scale(${phoneScale})`,
              }}
            >
              <div className="w-full h-full rounded-[2rem] bg-[#ECE5DD] p-3 space-y-2 text-xs overflow-hidden">
                <div className="bg-white rounded-lg rounded-tl-none p-2 max-w-[80%]">¿Tienes hora hoy?</div>
                <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none p-2 max-w-[80%] ml-auto">
                  Sí, 17:30 o 18:30 ¿cuál prefieres?
                </div>
                <div className="bg-white rounded-lg rounded-tl-none p-2 max-w-[80%]">17:30 ✨</div>
                <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none p-2 max-w-[80%] ml-auto">
                  ✅ Listo, te espero.
                </div>
              </div>
            </div>

            <div
              className="absolute w-[340px] rounded-2xl bg-white shadow-2xl border border-brand-navy/10 p-5"
              style={{
                opacity: calOpacity,
                transform: `scale(${0.85 + calOpacity * 0.15})`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="font-[Bricolage_Grotesque] font-bold text-lg">Mayo 2026</div>
                <Calendar className="w-5 h-5 text-brand-green" />
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {["L","M","X","J","V","S","D"].map((d) => (
                  <div key={d} className="text-brand-navy/40 font-bold py-1">{d}</div>
                ))}
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const booked = [3, 7, 11, 12, 18, 22, 25].includes(day);
                  const today = day === 11;
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition ${
                        today
                          ? "bg-brand-navy text-brand-cream"
                          : booked
                          ? "bg-brand-green/30 text-brand-navy"
                          : "text-brand-navy/60 hover:bg-brand-navy/5"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-brand-green/15 flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-navy" />
                <div className="text-xs">
                  <div className="font-semibold">Hoy 17:30 · Corte clásico</div>
                  <div className="text-brand-navy/60">Carlos M. · Confirmado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- horizontal scroll steps ---------- */
function HorizontalSteps() {
  const { ref, p } = useSectionProgress<HTMLDivElement>();
  const steps = [
    {
      n: "01",
      t: "Conecta tu WhatsApp",
      d: "En menos de 5 minutos integramos tu número y entrenamos a brou con tu negocio.",
      icon: MessageCircle,
    },
    {
      n: "02",
      t: "Define tu agenda",
      d: "Servicios, duraciones, equipo y horarios. brou aprende y propone los huecos disponibles.",
      icon: Calendar,
    },
    {
      n: "03",
      t: "Vende mientras duermes",
      d: "Tu IA conversa, agenda, confirma y reagenda 24/7. Tú solo recibes citas.",
      icon: Sparkles,
    },
  ];
  return (
    <section ref={ref} id="como-funciona" className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center bg-brand-navy text-brand-cream overflow-hidden">
        <div className="px-5 sm:px-8 max-w-7xl mx-auto w-full mb-10">
          <span className="text-brand-green text-xs font-bold tracking-widest">PROCESO</span>
          <h2 className="mt-2 font-[Bricolage_Grotesque] text-4xl sm:text-5xl lg:text-6xl font-bold">
            3 pasos. Cero fricción.
          </h2>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex gap-8 px-[10vw] will-change-transform"
            style={{
              transform: `translateX(-${p * 66}%)`,
              transition: "transform 0.05s linear",
            }}
          >
            {steps.map((s, i) => (
              <div
                key={i}
                className="shrink-0 w-[80vw] sm:w-[60vw] lg:w-[42vw] aspect-[4/3] rounded-3xl p-8 sm:p-12 flex flex-col justify-between border border-brand-cream/10"
                style={{
                  background:
                    i === 1
                      ? "linear-gradient(135deg, var(--brand-green) 0%, var(--brand-green-dark) 100%)"
                      : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  color: i === 1 ? "var(--brand-navy)" : undefined,
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm opacity-60">{s.n}</span>
                  <s.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-[Bricolage_Grotesque] text-3xl sm:text-4xl font-bold mb-3">
                    {s.t}
                  </h3>
                  <p className={i === 1 ? "text-brand-navy/80" : "text-brand-cream/70"}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-5 sm:px-8 max-w-7xl mx-auto w-full mt-10 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full bg-brand-cream/20 overflow-hidden"
            >
              <div
                className="h-full bg-brand-green transition-all"
                style={{
                  width: `${Math.max(0, Math.min(1, p * 3 - i)) * 100}%`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- benefits bento with parallax ---------- */
function Benefits() {
  const y = useScrollY();
  const items = [
    { icon: Zap, t: "Respuesta instantánea", d: "0 segundos de espera. La IA responde mientras tú trabajas." },
    { icon: TrendingUp, t: "+40% más reservas", d: "Captura citas de noche, fines de semana y feriados." },
    { icon: ShieldCheck, t: "Cero no-shows", d: "Recordatorios automáticos y reconfirmación inteligente." },
    { icon: Users, t: "Multi-equipo", d: "Cada profesional con su agenda, comisiones y métricas." },
  ];
  return (
    <section id="beneficios" className="relative py-32 px-5 sm:px-8 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="text-brand-green text-xs font-bold tracking-widest">POR QUÉ BROU</span>
          <h2 className="mt-2 font-[Bricolage_Grotesque] text-4xl sm:text-5xl lg:text-6xl font-bold max-w-3xl">
            Más citas. Menos chats. Cero estrés.
          </h2>
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => {
            const offset = Math.sin((y + i * 100) / 400) * 8;
            return (
              <Reveal key={i} delay={i * 100}>
                <div
                  className="group h-full p-6 rounded-2xl bg-white border border-brand-navy/10 hover:border-brand-green hover:shadow-2xl hover:shadow-brand-green/20 transition-all duration-500 hover:-translate-y-2"
                  style={{ transform: `translateY(${offset}px)` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-green/15 flex items-center justify-center mb-5 group-hover:bg-brand-green transition">
                    <it.icon className="w-6 h-6 text-brand-navy" />
                  </div>
                  <h3 className="font-[Bricolage_Grotesque] text-xl font-bold mb-2">{it.t}</h3>
                  <p className="text-sm text-brand-navy/70">{it.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */
function Testimonials() {
  const items = [
    { n: "María López", r: "Spa Aurora", q: "Pasamos de 60 a 110 citas semanales sin contratar a nadie. brou responde mejor que yo." },
    { n: "Carlos Ruiz", r: "Barbería Eleven", q: "Mis clientes agendan a las 11pm. Antes perdía ese negocio, ahora es mi mejor turno." },
    { n: "Andrea Méndez", r: "Clínica Dental Sonríe", q: "Los recordatorios automáticos bajaron las ausencias del 22% al 4%. Cambió mi clínica." },
  ];
  return (
    <section className="py-32 px-5 sm:px-8 bg-brand-navy text-brand-cream relative overflow-hidden">
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, var(--brand-green) 0%, transparent 60%)" }}
      />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <h2 className="font-[Bricolage_Grotesque] text-4xl sm:text-5xl lg:text-6xl font-bold max-w-3xl">
            Negocios que ya{" "}
            <span className="text-brand-green">duermen tranquilos.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 150}>
              <figure className="h-full p-7 rounded-2xl bg-brand-cream/5 border border-brand-cream/10 backdrop-blur hover:bg-brand-cream/10 transition">
                <div className="text-brand-green text-4xl font-[Bricolage_Grotesque] leading-none">"</div>
                <blockquote className="mt-2 text-lg leading-relaxed">{it.q}</blockquote>
                <figcaption className="mt-6 pt-6 border-t border-brand-cream/10">
                  <div className="font-semibold">{it.n}</div>
                  <div className="text-sm text-brand-cream/60">{it.r}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- pricing with 3D tilt ---------- */
function Pricing() {
  const plans = [
    {
      n: "Básico",
      p: "20",
      tag: "Para empezar",
      f: ["1 usuario", "Agente de agendamiento IA", "Recordatorios automáticos", "Calendario integrado"],
    },
    {
      n: "Startup",
      p: "50",
      tag: "El más popular",
      featured: true,
      f: ["3 usuarios", "Agente especializado IA", "Reportes y métricas", "Plataforma de pagos", "Soporte prioritario"],
    },
    {
      n: "Enterprise",
      p: "100",
      tag: "Negocios en escala",
      f: ["10 usuarios", "Gestión de comisiones", "Informes financieros", "Integraciones CRM/ERP", "Dominio personalizado"],
    },
  ];
  return (
    <section id="planes" className="py-32 px-5 sm:px-8 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-brand-green text-xs font-bold tracking-widest">PLANES</span>
            <h2 className="mt-2 font-[Bricolage_Grotesque] text-4xl sm:text-5xl lg:text-6xl font-bold">
              Precios honestos.
            </h2>
            <p className="mt-4 text-brand-navy/70">
              Empieza gratis. Crece a tu ritmo. Sin contratos eternos.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {plans.map((pl, i) => (
            <Reveal key={i} delay={i * 120}>
              <TiltCard featured={!!pl.featured}>
                <div className="flex items-center justify-between">
                  <h3 className="font-[Bricolage_Grotesque] text-2xl font-bold">{pl.n}</h3>
                  {pl.featured && (
                    <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded-full bg-brand-navy text-brand-green">
                      POPULAR
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-1 ${pl.featured ? "text-brand-navy/70" : "text-brand-navy/60"}`}>{pl.tag}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-[Bricolage_Grotesque] font-bold">${pl.p}</span>
                  <span className="text-sm opacity-60">/mes</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {pl.f.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${pl.featured ? "text-brand-navy" : "text-brand-green"}`} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href="#cta"
                  className={`mt-8 inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold transition ${
                    pl.featured
                      ? "bg-brand-navy text-brand-cream hover:bg-brand-navy/90"
                      : "border border-brand-navy/20 hover:border-brand-navy hover:bg-brand-navy hover:text-brand-cream"
                  }`}
                >
                  Empezar <ArrowRight className="w-4 h-4" />
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div className="mt-10 text-center text-sm text-brand-navy/60">
            Adicionales: usuario extra <b>$5</b> · agente de agendamiento <b>$20</b> · agente especializado <b>$50</b>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TiltCard({
  children,
  featured,
}: {
  children: React.ReactNode;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`h-full p-7 rounded-3xl transition-all duration-200 will-change-transform ${
        featured
          ? "bg-brand-green text-brand-navy shadow-2xl shadow-brand-green/40 scale-[1.02]"
          : "bg-white border border-brand-navy/10 shadow-lg hover:shadow-2xl"
      }`}
    >
      {children}
    </div>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    { q: "¿Necesito tarjeta para probar?", a: "No. Tienes 14 días gratis sin tarjeta. Configuras todo y solo pagas si te convence." },
    { q: "¿Funciona con mi WhatsApp actual?", a: "Sí. Usamos la API oficial de WhatsApp Business — conservas tu número y conversaciones." },
    { q: "¿Puedo entrenar a la IA con mis servicios?", a: "Por completo. Defines servicios, duraciones, precios, equipo y reglas. brou aprende en minutos." },
    { q: "¿Qué pasa si la IA se equivoca?", a: "Siempre puedes intervenir manualmente. Recibes alerta y tomas el control de cualquier conversación." },
    { q: "¿Se integra con mi calendario?", a: "Sí, con Google Calendar, Outlook y Apple Calendar. Los huecos se sincronizan en tiempo real." },
  ];
  return (
    <section id="faq" className="py-32 px-5 sm:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <span className="text-brand-green text-xs font-bold tracking-widest">FAQ</span>
          <h2 className="mt-2 font-[Bricolage_Grotesque] text-4xl sm:text-5xl font-bold">
            Preguntas frecuentes.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <Accordion type="single" collapsible className="mt-10">
            {items.map((it, i) => (
              <AccordionItem key={i} value={`it-${i}`} className="border-b border-brand-navy/10">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-5">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="text-brand-navy/70 text-base pb-5">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section id="cta" className="py-32 px-5 sm:px-8 bg-brand-navy text-brand-cream relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--brand-green) 1px, transparent 1px), linear-gradient(90deg, var(--brand-green) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="max-w-4xl mx-auto text-center relative">
        <Reveal>
          <h2 className="font-[Bricolage_Grotesque] text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]">
            ¿Listo para que tu negocio
            <br />
            <span className="text-brand-green">se agende solo?</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 text-lg text-brand-cream/70 max-w-xl mx-auto">
            Activa brou en 5 minutos. 14 días gratis. Sin tarjeta. Sin compromisos.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <a
            href="#"
            className="group mt-10 inline-flex items-center gap-3 bg-brand-green text-brand-navy px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition shadow-2xl shadow-brand-green/30"
          >
            Probar gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="bg-brand-cream border-t border-brand-navy/10 py-12 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logoBrou} alt="brou" className="h-6" />
          <span className="text-sm text-brand-navy/60">© 2026 brou — agenda inteligente</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-brand-navy/60">
          <a href="#" className="hover:text-brand-navy transition">Privacidad</a>
          <a href="#" className="hover:text-brand-navy transition">Términos</a>
          <a href="#" className="hover:text-brand-navy transition">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
