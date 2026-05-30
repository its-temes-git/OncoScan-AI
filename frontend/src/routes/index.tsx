import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Particles } from "@/components/Particles";
import { CountUp, Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "OncoScan — Detecting Cancer. Saving Lives." },
      { name: "description", content: "AI-powered breast cancer detection using deep learning on histopathology images." },
    ],
  }),
});

function Typewriter({ text, speed = 65, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (i >= text.length) { onDone?.(); return; }
    const t = setTimeout(() => setI(i + 1), speed);
    return () => clearTimeout(t);
  }, [i, text, speed, onDone]);
  return (
    <span>
      {text.slice(0, i)}
      <span className="inline-block w-[3px] h-[0.85em] -mb-1 bg-primary ml-1 animate-pulse" />
    </span>
  );
}

function Home() {
  const [doneTyping, setDoneTyping] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen hero-gradient text-white overflow-hidden flex items-center">
        <Particles className="opacity-70" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/30 blur-3xl pulse-glow" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl pulse-glow" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-blue-300 mb-6 font-semibold"
          >
            <span className="w-8 h-px bg-blue-400" /> Histopathology AI · Deep Learning
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.02] max-w-5xl">
            <Typewriter text="Detecting Cancer. Saving Lives." onDone={() => setDoneTyping(true)} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={doneTyping ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mt-8 text-lg md:text-2xl text-blue-100/80 max-w-3xl font-light leading-relaxed"
          >
            A deep-learning diagnostic system trained on hundreds of thousands of histopathology images to identify Invasive Ductal Carcinoma with hospital-grade precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={doneTyping ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/detection"
              className="btn-shimmer btn-glow inline-flex items-center gap-2 px-8 h-14 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 transition"
            >
              Start Detection
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
            <Link
              to="/how-it-works"
              className="btn-shimmer inline-flex items-center gap-2 px-8 h-14 rounded-xl glass-dark text-white font-semibold text-base hover:bg-white/10 transition"
            >
              How It Works
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-blue-200/60 text-xs uppercase tracking-widest flex flex-col items-center gap-2"
        >
          Scroll
          <span className="w-px h-8 bg-blue-300/40" />
        </motion.div>
      </section>

      {/* COUNTERS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { label: "Images Analyzed", value: 0, custom: "65,000 +" },
            { label: "Model Accuracy", value: 80.53, suffix: "%" },
            { label: "Detection Type", value: 0, custom: "IDC" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="glass rounded-2xl p-8 text-center">
                <div className="text-5xl md:text-6xl font-extrabold text-navy tabular-nums tracking-tight">
                  {s.custom ?? <><CountUp to={s.value} />{s.suffix}</>}
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TWO COLUMN */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="relative aspect-square rounded-3xl glass overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-teal-500/10" />
            <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 relative">
              <defs>
                <linearGradient id="cellGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1e40af" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const x = 100 + Math.cos(angle) * 60;
                const y = 100 + Math.sin(angle) * 60;
                return (
                  <motion.circle
                    key={i}
                    cx={x} cy={y} r="14"
                    fill="url(#cellGrad)" opacity="0.6"
                    animate={{ r: [14, 18, 14], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
                  />
                );
              })}
              <circle cx="100" cy="100" r="28" fill="url(#cellGrad)" />
              <circle cx="100" cy="100" r="10" fill="white" opacity="0.7" />
            </svg>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4">What we do</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight leading-tight">
            Histopathology image analysis, powered by deep learning.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            OncoScan examines microscope-level tissue patches and predicts whether they contain Invasive Ductal Carcinoma — the most common form of breast cancer.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Built on a fine-tuned MobileNetV2 architecture and trained on the Kaggle Breast Histopathology dataset, our system delivers a confidence score within seconds of upload.
          </p>
          <Link to="/about-disease" className="mt-8 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            Learn about breast cancer
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </Link>
        </Reveal>
      </section>

      {/* BIOLOGY SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface via-[#f4f7ff] to-surface py-24 border-t border-blue-100/50">
        <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] rounded-full bg-teal-400/5 blur-3xl" />
        <div className="absolute bottom-10 -left-40 w-[450px] h-[450px] rounded-full bg-primary/5 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative group">
              {/* Decorative background glow matching the cell colors */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/25 to-teal-500/25 blur-2xl opacity-60 group-hover:opacity-80 transition duration-500" />
              
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass border border-white/40 shadow-2xl">
                <img 
                  src="/cancer_cells.png" 
                  alt="Breast Cancer Cell Division" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white/90 backdrop-blur-md bg-navy/35 py-2 px-4 rounded-full border border-white/10">
                  <span className="font-medium tracking-wide">Microscopic Cellular Mitosis</span>
                  <span className="text-teal-300 font-semibold uppercase tracking-wider">Histopathology</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-teal-600 font-bold mb-4">Understanding the Biology</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight leading-[1.1]">
                What is Invasive Ductal Carcinoma?
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Invasive Ductal Carcinoma (IDC) is the most common form of breast cancer, representing approximately <strong>80%</strong> of all diagnoses. It begins in the milk ducts and penetrates the surrounding breast tissues.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Through histopathology, pathologists examine biopsied tissue under a microscope to spot abnormal cell growth, irregular nuclei, and rapid mitotic divisions. Early identification is the single most critical factor in successful clinical outcomes.
              </p>
              
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 border border-blue-50/50 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-bold shrink-0">
                    🔬
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm">Cell Anomalies</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Detects cellular structure variations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 border border-blue-50/50 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-bold shrink-0">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm">Rapid Analysis</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Identifies IDC features in seconds.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
