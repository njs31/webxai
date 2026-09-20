import { useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
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

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function DashboardMock() {
  return (
    <div className="dash">
      <aside className="dash__side">
        <div className="dash__brand">
          <LogoMark />
        </div>
        {['Dashboard', 'Workflows', 'Agents', 'Inbox', 'Analytics'].map((item, i) => (
          <div key={item} className={`dash__nav ${i === 0 ? 'is-active' : ''}`}>
            {item}
          </div>
        ))}
      </aside>
      <div className="dash__main">
        <header className="dash__top">
          <div>
            <p className="dash__kicker">Overview</p>
            <h3>Operations pulse</h3>
          </div>
          <div className="dash__pills">
            <span>Live</span>
            <span>Last 30 days</span>
          </div>
        </header>
        <div className="dash__grid">
          <div className="dash__card dash__card--chart">
            <div className="dash__card-head">
              <span>Automation volume</span>
              <strong>+38%</strong>
            </div>
            <svg viewBox="0 0 320 120" className="dash__chart" aria-hidden="true">
              <defs>
                <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c5cff" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <path
                d="M8 88 C 48 80, 70 40, 110 52 C 150 64, 170 20, 210 36 C 250 52, 270 18, 312 28"
                fill="none"
                stroke="url(#lineGlow)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="312" cy="28" r="4.5" fill="#c4b5fd" />
            </svg>
          </div>
          <div className="dash__card">
            <p>Active workflows</p>
            <strong>128</strong>
            <span className="dash__muted">12 agents online</span>
          </div>
          <div className="dash__card">
            <p>Messages handled</p>
            <strong>45.5K</strong>
            <span className="dash__muted">WhatsApp + web</span>
          </div>
        </div>
      </div>
    </div>
  );
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

export default function Landing() {
  return (
    <div className="page">
      <div className="glow glow--hero" aria-hidden="true" />
      <div className="glow glow--features" aria-hidden="true" />

      <motion.header
        className="nav"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <a href="#top" className="nav__logo">
          <LogoMark />
          WEBXAI
        </a>
        <nav className="nav__links">
          <a href="#features">Features</a>
          <a href="#process">How it Works</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn btn--ghost" href={WHATSAPP} target="_blank" rel="noreferrer">
          Book a Call
        </a>
      </motion.header>

      <main id="top">
        <section className="hero">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Transform ideas into products
            <br />
            <span>With AI.</span>
          </motion.h1>
          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
          >
            WEBXAI engineers AI automation, WhatsApp systems, brand identity, and
            full-stack applications — built for speed, clarity, and scale.
          </motion.p>
          <motion.a
            className="btn btn--primary"
            href="#contact"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: EASE }}
          >
            Get Started <ArrowRight size={16} />
          </motion.a>
          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35, duration: 1, ease: EASE }}
          >
            <DashboardMock />
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
