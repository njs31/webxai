import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  Check,
  Layers,
  MessageSquare,
  Search,
  Sparkles,
  Workflow,
} from 'lucide-react';
import './Landing.css';

const EASE = [0.16, 1, 0.3, 1];
const WHATSAPP = 'https://wa.me/916360334274';
const CAL_NAMESPACE = '20min';
const CAL_LINK = 'webxai/20min';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

function CalEmbed() {
  useEffect(() => {
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    window.Cal('init', CAL_NAMESPACE, { origin: 'https://app.cal.com' });
    window.Cal.config = window.Cal.config || {};
    window.Cal.config.forwardQueryParams = true;

    window.Cal.ns[CAL_NAMESPACE]('inline', {
      elementOrSelector: '#my-cal-inline-20min',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: CAL_LINK,
    });

    window.Cal.ns[CAL_NAMESPACE]('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }, []);

  return <div className="cal-embed" id="my-cal-inline-20min" />;
}

const TOP_ORBIT = '0deg 0deg 115%';
const TOP_FOV = '32deg';
// Wobble stays within this range so the model never tilts far enough to
// become hard to read — small, slow sway rather than a full rotation.
const WOBBLE_THETA_DEG = 9;
const WOBBLE_PHI_CENTER = 9;
const WOBBLE_PHI_RANGE = 7;
const RESUME_DELAY_MS = 2000;

function Model3D({ src, alt }) {
  const frameRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import('@google/model-viewer').then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return undefined;
    const viewer = frameRef.current?.querySelector('model-viewer');
    if (!viewer) return undefined;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let rafId;
    let paused = false;
    let resumeTimer;
    let start = performance.now();

    const tick = (now) => {
      if (!paused) {
        const t = (now - start) / 1000;
        const theta = WOBBLE_THETA_DEG * Math.sin(t * 0.22);
        const phi = WOBBLE_PHI_CENTER + WOBBLE_PHI_RANGE * Math.sin(t * 0.31);
        viewer.cameraOrbit = `${theta.toFixed(2)}deg ${phi.toFixed(2)}deg 115%`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const handleLoad = () => {
      viewer.fieldOfView = TOP_FOV;
      if (reduceMotion) {
        viewer.cameraOrbit = TOP_ORBIT;
        return;
      }
      start = performance.now();
      rafId = requestAnimationFrame(tick);
    };

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };

    const scheduleResume = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        start = performance.now();
        paused = false;
      }, RESUME_DELAY_MS);
    };

    const handleCameraChange = (event) => {
      if (event.detail?.source === 'user-interaction') {
        pause();
        scheduleResume();
      }
    };

    viewer.addEventListener('load', handleLoad);
    viewer.addEventListener('camera-change', handleCameraChange);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      viewer.removeEventListener('load', handleLoad);
      viewer.removeEventListener('camera-change', handleCameraChange);
    };
  }, [ready]);

  return (
    <div className="model-frame" ref={frameRef}>
      {ready ? (
        <model-viewer
          src={src}
          alt={alt}
          camera-controls
          disable-zoom
          touch-action="pan-y"
          camera-orbit={TOP_ORBIT}
          min-camera-orbit="auto 0deg auto"
          max-camera-orbit="auto 80deg auto"
          field-of-view={TOP_FOV}
          min-field-of-view={TOP_FOV}
          max-field-of-view={TOP_FOV}
          interaction-prompt="none"
          environment-image="neutral"
          shadow-intensity="0.6"
          shadow-softness="1"
          exposure="1.05"
          tone-mapping="commerce"
          loading="eager"
          reveal="auto"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div className="model-frame__placeholder">Loading 3D model…</div>
      )}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="page">
      <div className="glow glow--hero" aria-hidden="true" />
      <div className="glow glow--features" aria-hidden="true" />

      <main id="top">
        <section className="hero">
          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Model3D src="/models/webxaiii.glb" alt="WEBXAI 3D logo" />
          </motion.div>

          <motion.div
            className="hero__booking"
            id="book"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1, ease: EASE }}
          >
            <div className="hero__booking-head">
              <h2>Book a call</h2>
              <p>Pick a time that works — 20 minutes, no pressure.</p>
            </div>
            <div className="hero__booking-frame">
              <CalEmbed />
            </div>
          </motion.div>
        </section>

        <section className="proof">
          <p className="proof__label">Inspiring experiences</p>
          <h2>Trusted by teams from startup to enterprise.</h2>
          <div className="proof__logos">
            {['React', 'Next.js', 'Supabase', 'OpenAI'].map((name) => (
              <div key={name} className="proof__logo">
                {name}
              </div>
            ))}
          </div>
        </section>

        <section className="features" id="features">
          <motion.div className="section-head" {...fadeUp()}>
            <span className="badge">
              <Sparkles size={12} /> Features
            </span>
            <h2>Powerful capabilities to ship intelligent products.</h2>
          </motion.div>

          <div className="bento">
            <motion.article className="glass glass--tall" {...fadeUp(0.05)}>
              <div className="agent-chip">
                <Bot size={16} />
                <span>
                  <strong>AI Agent</strong>
                  <small>Automation online</small>
                </span>
              </div>
              <h3>AI Automation</h3>
              <p>Custom agents, LLM integrations, and workflows that remove repetitive ops.</p>
            </motion.article>

            <motion.article className="glass glass--wide" {...fadeUp(0.12)}>
              <h3>Smart Insights</h3>
              <p>Turn conversations, jobs, and product data into decisions you can act on.</p>
              <div className="task-list">
                {[
                  ['Create Task', Search],
                  ['Find Task', Layers],
                  ['Completed Task', Check],
                ].map(([label, Icon]) => (
                  <div key={label} className="task">
                    <Icon size={14} />
                    {label}
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article className="glass glass--wide" {...fadeUp(0.08)}>
              <h3>WhatsApp &amp; Messaging</h3>
              <p>Business API, bots, templates, and CRM-ready flows that convert.</p>
              <div className="devices">
                <span>Mobile</span>
                <span className="is-on">Chat</span>
                <span>Web</span>
              </div>
            </motion.article>

            <motion.article className="glass glass--tall" {...fadeUp(0.16)}>
              <div className="avatars">
                <span>A</span>
                <span>R</span>
                <span>M</span>
              </div>
              <h3>Brand &amp; Full Stack</h3>
              <p>Identity systems and React/Next apps engineered to last.</p>
              <div className="collab">
                <MessageSquare size={14} />
                Design + engineering in one studio.
              </div>
            </motion.article>
          </div>
        </section>

        <section className="process" id="process">
          <motion.div className="section-head" {...fadeUp()}>
            <span className="badge">
              <Workflow size={12} /> Work Process
            </span>
            <h2>Getting started with WEBXAI.</h2>
          </motion.div>

          <motion.article className="glass process-card" {...fadeUp(0.1)}>
            <div className="process-card__top">
              <div>
                <h3>Input Intelligence</h3>
                <p>
                  We map your data, users, and workflows so the product understands
                  patterns — then we design the automation layer around them.
                </p>
              </div>
              <span className="step">Step 01</span>
            </div>
            <div className="process-tags">
              <span>Workflow</span>
              <span>Optimization</span>
            </div>
          </motion.article>

          <div className="steps">
            {[
              ['02', 'Interface', 'High-fidelity product UI, brand, and flows before we write production code.'],
              ['03', 'Engineering', 'APIs, agents, WhatsApp, and frontends built to perform under real traffic.'],
              ['04', 'Launch', 'Testing, deploy, monitoring, and iteration after go-live.'],
            ].map(([n, title, text]) => (
              <motion.article key={n} className="glass step-card" {...fadeUp(0.08)}>
                <span className="step">Step {n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <motion.div className="glass contact-card" {...fadeUp()}>
            <h2>Ready to build the next generation?</h2>
            <p>
              Share your goals, timeline, and scope. We’ll reply with a clear
              technical plan.
            </p>
            <div className="contact-actions">
              <a className="btn btn--primary" href={WHATSAPP} target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
              <a className="btn btn--ghost" href="tel:+916360334274">
                +91 6360 334 274
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer">
        <span>© 2026 WEBXAI</span>
        <a href="privacy-policy.html">Privacy Policy</a>
      </footer>
    </div>
  );
}
