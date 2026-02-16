import { useState, useEffect, useRef } from "react";
useEffect(() => {
  const sendHeight = () => {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage(
      { type: "setHeight", height },
      "*"
    );
  };

  sendHeight();
  window.addEventListener("resize", sendHeight);
}, []);
// ─── FONTS ─────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Instrument+Serif:ital@0;1&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const BLUE = "#1a3fff";
const DARK = "#06091a";
const MUTED = "#64748b";
const SANS = "'Poppins', system-ui, sans-serif";
const SERIF = "'Instrument Serif', Georgia, serif";
const CALENDLY = "https://calendly.com/onlineerhverv/uforpligtende-samtale";
const MAPS_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.231394862944!2d12.573269213320954!3d55.73710839308657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652444b60193baf%3A0x6508ed3ee46e7354!2sOnline%20Erhverv%20ApS!5e0!3m2!1sen!2sdk!4v1771241611733!5m2!1sen!2sdk";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

const wrap = (path) => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
);

const icons = {
  clock: wrap("M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"),
  noContract: wrap("M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"),
  price: wrap("M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"),
  speed: wrap("M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"),
  heart: wrap("M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"),
  denmark: wrap("M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"),
  arrow: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>,
};

const Tag = ({ children, dark }) => (
  <span style={{
    display: "inline-block", fontFamily: SANS, fontSize: 12, fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase",
    padding: "6px 16px", borderRadius: 100,
    background: dark ? "rgba(255,255,255,0.1)" : `${BLUE}0d`,
    color: dark ? "#93b4ff" : BLUE,
  }}>{children}</span>
);

const Btn = ({ children, variant = "primary", large, href = CALENDLY, style = {} }) => {
  const [hov, setHov] = useState(false);
  const isPrimary = variant === "primary";
  const isExt = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a href={href} target={isExt ? "_blank" : undefined} rel={isExt ? "noopener noreferrer" : undefined} style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: large ? "18px 36px" : "14px 28px",
      borderRadius: 12, fontFamily: SANS, fontWeight: 600,
      fontSize: large ? 17 : 15, textDecoration: "none", cursor: "pointer",
      border: isPrimary ? "none" : "1.5px solid #d0d5e8",
      background: isPrimary ? (hov ? "#0026e0" : BLUE) : (hov ? "#f8fafc" : "#fff"),
      color: isPrimary ? "#fff" : DARK,
      transform: hov ? "translateY(-2px)" : "translateY(0)",
      boxShadow: hov && isPrimary ? "0 8px 30px rgba(26,63,255,0.3)" : "none",
      transition: "all 0.3s cubic-bezier(.16,1,.3,1)", ...style,
    }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>
  );
};

function Hero() {
  return (
    <section style={{
      padding: "80px 32px 88px",
      background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${BLUE}10 0%, transparent 70%), #fff`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.02, backgroundImage: `linear-gradient(${DARK} 1px, transparent 1px), linear-gradient(90deg, ${DARK} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal><Tag>Om Online Erhverv</Tag></Reveal>
        <Reveal delay={0.1}>
          <h1 style={{ fontFamily: SANS, fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 800, color: DARK, lineHeight: 1.1, letterSpacing: "-0.035em", margin: "28px 0 24px" }}>
            Vi gør det nemt at{" "}<span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE, fontWeight: 400 }}>lykkes online</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p style={{ fontFamily: SANS, fontSize: 20, color: MUTED, lineHeight: 1.65, maxWidth: 580, margin: "0 auto" }}>
            Siden 2019 har vi hjulpet danske selvstændige og små virksomheder med at bygge en stærk online tilstedeværelse — uden bureauer, uden lange kontrakter og uden uigennemskuelige priser.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section style={{ padding: "80px 32px 100px", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { num: "10+", label: "Års erfaring med\ne-commerce & digital markedsføring" },
                { num: "2+", label: "Års erfaring med\nAI-løsninger & automatisering" },
                { num: "50+", label: "Kursister der har\nbygget deres forretning" },
                { num: "2019", label: "Året Online Erhverv\nblev grundlagt" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "32px 24px", border: "1px solid #e8ecf4" }}>
                  <div style={{ fontFamily: SANS, fontSize: 36, fontWeight: 800, color: BLUE, letterSpacing: "-0.03em", marginBottom: 8, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: SANS, fontSize: 14, color: MUTED, lineHeight: 1.5, whiteSpace: "pre-line" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <div>
            <Reveal><Tag>Hvem står bag?</Tag></Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: SANS, fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: DARK, margin: "20px 0 20px", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                Bygget af én der har{" "}<span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE, fontWeight: 400 }}>været i dine sko</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ fontFamily: SANS, fontSize: 16, color: "#475569", lineHeight: 1.7, margin: 0 }}>Online Erhverv er skabt af Frederik, der har arbejdet med e-commerce og digital markedsføring i over 10 år — og de sidste to år intensivt med AI-løsninger og automatisering.</p>
                <p style={{ fontFamily: SANS, fontSize: 16, color: "#475569", lineHeight: 1.7, margin: 0 }}>Idéen opstod af frustration: for mange selvstændige betaler dyrt for bureauer og konsulenter — og ender alligevel uden kontrol over deres egen digitale tilstedeværelse. Det ville jeg lave om på.</p>
                <p style={{ fontFamily: SANS, fontSize: 16, color: "#475569", lineHeight: 1.7, margin: 0 }}>I dag tilbyder Online Erhverv branchekurser, AI-kurser, done-for-you ydelser og AI-implementering — alt sammen med ét mål: at give danske virksomheder værktøjerne til at stå stærkt online, uanset budget og teknisk erfaring.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  const items = [
    { icon: icons.price, title: "Fast pris — altid", desc: "Du ved hvad det koster fra start. Ingen timepriser, ingen ekstraregninger, ingen \"det blev lidt dyrere end forventet\". Prisen er prisen." },
    { icon: icons.noContract, title: "Ingen bindinger", desc: "Ingen lange kontrakter og ingen månedlige betalinger. Du betaler én gang for det du får — og ejer det selv bagefter." },
    { icon: icons.speed, title: "Dage, ikke måneder", desc: "Vi leverer hurtigt fordi vi bruger de nyeste AI-værktøjer i vores egen produktion. Det der tog et bureau 3 måneder, klarer vi på dage." },
    { icon: icons.heart, title: "Vi taler dit sprog", desc: "Ingen teknisk jargon, ingen buzzwords. Vi forklarer tingene så du forstår dem — og så du selv kan tage beslutninger om din forretning." },
    { icon: icons.denmark, title: "100% dansk", desc: "Alt er på dansk. Support er på dansk. Kurserne er på dansk. Vi forstår det danske marked, og vi er her når du har brug for os." },
    { icon: icons.clock, title: "Du ejer det hele", desc: "Hjemmesider, designs, dokumenter — alt vi bygger for dig er dit. Ingen vendor lock-in, ingen afhængighed af os bagefter." },
  ];
  const [hovIdx, setHovIdx] = useState(-1);

  return (
    <section style={{ padding: "100px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Tag>Derfor vælger folk os</Tag>
            <h2 style={{ fontFamily: SANS, fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 800, color: DARK, margin: "20px 0 16px", letterSpacing: "-0.03em" }}>
              Hvad gør os{" "}<span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE, fontWeight: 400 }}>anderledes?</span>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 18, color: MUTED, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>Vi har bygget Online Erhverv som det modsatte af et traditionelt bureau.</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div onMouseEnter={() => setHovIdx(i)} onMouseLeave={() => setHovIdx(-1)} style={{
                padding: "36px 30px", borderRadius: 20, background: hovIdx === i ? `${BLUE}04` : "#f8fafc",
                border: `1px solid ${hovIdx === i ? BLUE + "20" : "#eef1f6"}`, transition: "all 0.3s ease", cursor: "default",
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: hovIdx === i ? BLUE : `${BLUE}08`, color: hovIdx === i ? "#fff" : BLUE, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease", marginBottom: 20 }}>{item.icon}</div>
                <h3 style={{ fontFamily: SANS, fontSize: 18, fontWeight: 700, color: DARK, margin: "0 0 10px" }}>{item.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 15, color: MUTED, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const [active, setActive] = useState("mission");
  const content = {
    mission: "Vores mission er at gøre det muligt for danske virksomheder at stå stærkt online — med klare kurser, praktiske ydelser og AI-løsninger der kan implementeres med det samme. Uanset om du gør det selv eller lader os gøre det for dig.",
    vision: "Vores vision er at være den mest praktiske platform for selvstændige og små virksomheder i Danmark — hvor hjemmeside, marketing, AI og implementering samles ét sted.",
  };

  return (
    <section style={{ padding: "110px 32px", background: DARK, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", left: "10%", width: "50%", height: "70%", background: `radial-gradient(ellipse at center, ${BLUE}15 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal><Tag dark>Mission & Vision</Tag></Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: SANS, fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 800, color: "#fff", margin: "24px 0 32px", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Byg din egen fremtid{" "}<span style={{ fontFamily: SERIF, fontStyle: "italic", color: "#93b4ff", fontWeight: 400 }}>online</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 36 }}>
            {["mission", "vision"].map(tab => (
              <button key={tab} onClick={() => setActive(tab)} style={{
                fontFamily: SANS, fontSize: 15, fontWeight: 600, cursor: "pointer",
                padding: "10px 24px", borderRadius: 10, border: "none",
                background: active === tab ? BLUE : "rgba(255,255,255,0.08)",
                color: active === tab ? "#fff" : "#94a3b8", transition: "all 0.25s ease",
              }}>{tab === "mission" ? "Vores Mission" : "Vores Vision"}</button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p style={{ fontFamily: SANS, fontSize: 19, color: "#c0ccdc", lineHeight: 1.7, minHeight: 100 }}>{content[active]}</p>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Hvad er Online Erhverv?", a: "Online Erhverv er en dansk platform der hjælper selvstændige og små virksomheder med at lykkes online. Vi tilbyder branchekurser, AI-kurser, done-for-you ydelser og AI-implementering — alt samlet ét sted." },
    { q: "Hvad er forskellen på kurserne?", a: "Branchekurserne (servicevirksomheder, restauranter, håndværkere, freelancere, webshops, skønhed) er bygget til din specifikke branche og dækker hjemmeside, SEO og markedsføring. AI for Selvstændige går på tværs af brancher og fokuserer på at bruge AI til content, tilbud, kundesvar, workflows og automatisering." },
    { q: "Er AI for Selvstændige også for begyndere?", a: "Ja. Kurset starter helt fra bunden og kræver ingen teknisk erfaring. Alt er forklaret trin-for-trin med videoer, skabeloner og eksempler du kan kopiere." },
    { q: "Hvad er jeres ydelser?", a: "Vi bygger hjemmesider, web-apps, branding og markedsføring for dig. Du fortæller hvad du har brug for, og vi leverer det færdigt — på dage, ikke måneder. Alt til fast pris." },
    { q: "Hvad er AI-implementering?", a: "Det er en service for virksomheder der vil have AI integreret i deres daglige drift. Vi analyserer jeres processer, finder de bedste muligheder og sætter det hele op så det virker. Kan ske remote eller on-site." },
    { q: "Kan jeg få hjælp til at vælge mellem kursus og ydelse?", a: "Ja — book en gratis samtale, så hjælper vi dig med at finde den løsning der passer bedst til din situation. Ingen forpligtelser." },
    { q: "Hvor lang tid tager det at gennemføre et kursus?", a: "Det er helt op til dig. De fleste gennemfører et branchekursus på 2-4 uger ved 1-2 timer om dagen. AI for Selvstændige tager typisk 3-5 uger." },
    { q: "Hvad hvis jeg ikke er tilfreds?", a: "Vi tilbyder tilfredshedsgaranti. Kontakt os inden for 14 dage, og vi finder en løsning." },
  ];
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <section style={{ padding: "100px 32px", background: "#f8fafc" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <Tag>FAQ</Tag>
            <h2 style={{ fontFamily: SANS, fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 800, color: DARK, margin: "20px 0 0", letterSpacing: "-0.03em" }}>
              Ofte stillede{" "}<span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE, fontWeight: 400 }}>spørgsmål</span>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div onClick={() => setOpenIdx(isOpen ? -1 : i)} style={{
                  background: "#fff", borderRadius: 14, padding: "22px 28px",
                  border: `1px solid ${isOpen ? BLUE + "25" : "#e8ecf4"}`, cursor: "pointer", transition: "all 0.25s ease",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: DARK, margin: 0 }}>{faq.q}</h3>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0, marginLeft: 16,
                      background: isOpen ? BLUE : "#f1f5f9", color: isOpen ? "#fff" : MUTED,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.25s ease", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      fontSize: 20, fontWeight: 300, lineHeight: 1,
                    }}>+</div>
                  </div>
                  <div style={{ maxHeight: isOpen ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(.16,1,.3,1), opacity 0.3s ease", opacity: isOpen ? 1 : 0 }}>
                    <p style={{ fontFamily: SANS, fontSize: 15, color: MUTED, lineHeight: 1.65, margin: "16px 0 0", paddingRight: 48 }}>{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section style={{ padding: "100px 32px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Tag>Vores kontor</Tag>
            <h2 style={{ fontFamily: SANS, fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: DARK, margin: "20px 0 12px", letterSpacing: "-0.03em" }}>
              Vores kontor i{" "}<span style={{ fontFamily: SERIF, fontStyle: "italic", color: BLUE, fontWeight: 400 }}>Hellerup</span>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 17, color: MUTED, maxWidth: 460, margin: "0 auto", lineHeight: 1.6 }}>Vi sidder i Hellerup, men hjælper dig uanset hvor du er i Danmark.</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "start" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #e8ecf4" }}>
              <iframe src={MAPS_SRC} width="100%" height="360" style={{ border: 0, display: "block" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Online Erhverv kontor" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Adresse", value: "Strandvejen 126, 2900 Hellerup" },
                { label: "E-mail", value: "hej@onlineerhverv.dk" },
                { label: "Telefon", value: "+45 93 94 12 06" },
                { label: "Support", value: "Hverdage 10-17, lør 12-14" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#f8fafc", borderRadius: 14, padding: "20px 22px", border: "1px solid #e8ecf4" }}>
                  <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontFamily: SANS, fontSize: 15, color: DARK, fontWeight: 500 }}>{item.value}</div>
                </div>
              ))}
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: BLUE, color: "#fff", fontFamily: SANS, fontSize: 15, fontWeight: 600,
                padding: "16px 24px", borderRadius: 14, textDecoration: "none", transition: "all 0.25s ease",
              }} onMouseEnter={e => e.currentTarget.style.background = "#0026e0"} onMouseLeave={e => e.currentTarget.style.background = BLUE}>
                {icons.arrow} Book et uforpligtende møde — 15 min
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding: "100px 32px", background: `linear-gradient(135deg, ${DARK} 0%, #0f1535 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: "-40%", left: "20%", width: "60%", height: "80%", background: `radial-gradient(ellipse at center, ${BLUE}15 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <h2 style={{ fontFamily: SANS, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#fff", margin: "0 0 20px", letterSpacing: "-0.03em", lineHeight: 1.15 }}>Klar til at komme i gang?</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: SANS, fontSize: 18, color: "#94a3b8", lineHeight: 1.65, maxWidth: 480, margin: "0 auto 40px" }}>Book en gratis samtale — vi hjælper dig med at finde den løsning der passer bedst. Ingen forpligtelser, ingen salgsgas.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn large href={CALENDLY} style={{ background: "#fff", color: DARK, fontWeight: 700 }}>Book en gratis samtale</Btn>
            <Btn large href="mailto:hej@onlineerhverv.dk" style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)" }}>hej@onlineerhverv.dk</Btn>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p style={{ fontFamily: SANS, fontSize: 14, color: "#5a6a82", marginTop: 32 }}>Svar inden for 24 timer · Strandvejen 126, Hellerup · +45 93 94 12 06</p>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        button { cursor: pointer; }
        @media (max-width: 900px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"][style*="gap: 72px"],
          section > div > div[style*="grid-template-columns: 1.4fr"] {
            grid-template-columns: 1fr !important; gap: 32px !important;
          }
          section > div > div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          section > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <Hero />
      <Story />
      <Differentiators />
      <Mission />
      <FAQ />
      <MapSection />
      <CTA />
    </div>
  );
}
