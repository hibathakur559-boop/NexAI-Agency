import { useState, useEffect } from 'react';
import {
  Bot,
  Workflow,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  Zap,
  Shield,
  Clock,
  Mail,
  Phone,
  Linkedin,
  Github,
  Twitter,
  Send,
  CheckCircle,
  Calendar,
  User,
} from 'lucide-react';

const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/hiba-thakur-57532628b',
  github: 'https://github.com/hibathakur559-boop',
  twitter: 'https://x.com/hibathakur559',
  email: 'hibathakur559@gmail.com',
  phone: '03111323512',
};

/* ── Navigation ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Approach', href: '#approach' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass bg-ink-950/80 py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">NexAI</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink-300 hover:text-white text-sm font-medium transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105"
          >
            Book a Demo
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass bg-ink-950/95 mt-3 mx-4 rounded-2xl p-5 space-y-3 animate-fade-in-down">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-ink-300 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block bg-brand-500 text-white text-center text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Book a Demo
          </a>
        </div>
      )}
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh pt-24 pb-12">
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-down">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-ink-200 text-sm font-medium">AI-Powered Automation Agency</span>
        </div>

        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-white leading-[1.1] mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          Transform Your Business with{' '}
          <span className="text-gradient">Intelligent AI</span>
        </h1>

        <p className="text-ink-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.25s', opacity: 0 }}>
          I build custom AI agents, automate your workflows, and unlock insights
          from your data — so your team can focus on what matters most.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <a
            href="#contact"
            className="group bg-brand-500 hover:bg-brand-400 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg shadow-brand-500/30"
          >
            Book a Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="glass text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Explore Services
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-14 animate-fade-in" style={{ animationDelay: '0.6s', opacity: 0 }}>
          {[
            { icon: Shield, label: 'Secure & Private' },
            { icon: Zap, label: 'Fast Delivery' },
            { icon: Clock, label: '24/7 AI Support' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-ink-400 text-sm">
              <item.icon className="w-4 h-4 text-brand-400" />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Services ── */
function Services() {
  const services = [
    {
      icon: Bot,
      title: 'AI Chatbots',
      desc: 'Intelligent conversational agents that handle customer support, lead qualification, and sales — available around the clock.',
      features: ['Natural language processing', 'Multi-channel deployment', 'Human handoff', 'Conversation analytics'],
      gradient: 'from-brand-400 to-brand-600',
    },
    {
      icon: Workflow,
      title: 'Workflow Automation',
      desc: 'Eliminate repetitive tasks with AI-powered automation that connects your tools and orchestrates complex processes.',
      features: ['Custom integrations', 'Visual flow builder', 'Conditional logic', 'Real-time monitoring'],
      gradient: 'from-accent-400 to-accent-600',
    },
    {
      icon: BarChart3,
      title: 'AI Data Analysis',
      desc: 'Turn raw data into actionable insights with predictive models, anomaly detection, and automated reporting.',
      features: ['Predictive analytics', 'Anomaly detection', 'Custom dashboards', 'Automated reports'],
      gradient: 'from-brand-300 to-accent-500',
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-ink-950 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-wider mb-3">What I Do</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Services Built for Scale
          </h2>
          <p className="text-ink-400 text-lg max-w-2xl mx-auto">
            Three core solutions, infinite possibilities. Each one designed to
            integrate seamlessly with your existing stack.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group glass rounded-3xl p-8 hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-2xl text-white mb-3">{service.title}</h3>
              <p className="text-ink-400 text-sm leading-relaxed mb-6">{service.desc}</p>
              <ul className="space-y-2.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-ink-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Honest Results ── */
function HonestResults() {
  return (
    <section id="approach" className="py-20 bg-gradient-to-b from-ink-950 to-ink-900 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-brand-400 font-semibold text-sm uppercase tracking-wider mb-3">Current Status</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
          Building Real Case Studies
        </h2>
        <div className="glass rounded-2xl px-8 py-10">
          <p className="text-ink-200 text-lg leading-relaxed">
            I am taking the first three small-business projects at a starter rate
            while I build public case studies. No invented results.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" className="py-24 bg-ink-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-in-up">
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-wider mb-3">Who I Am</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
            An AI Engineer Who Ships
          </h2>
          <p className="text-ink-300 text-lg leading-relaxed mb-6">
            I'm Hiba Thakur, an AI engineer focused on building production-grade
            automation systems. I don't just talk about AI — I build working
            systems that handle real workloads.
          </p>
          <p className="text-ink-400 leading-relaxed mb-8">
            My approach is simple: understand your business, design the right
            solution, ship it fast, and iterate based on real data. No black
            boxes, no buzzwords — just working software.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Core Services', value: '3' },
              { label: 'Starter Projects', value: '3' },
              { label: 'Focus', value: 'SMBs' },
              { label: 'Response Time', value: '24h' },
            ].map((item) => (
              <div key={item.label} className="glass rounded-2xl p-4">
                <div className="font-display font-bold text-2xl text-brand-400">{item.value}</div>
                <div className="text-ink-400 text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="glass rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl" />
            <div className="relative space-y-4">
              {[
                { icon: Bot, title: 'Design', desc: 'I map your workflows and identify automation opportunities' },
                { icon: Workflow, title: 'Build', desc: 'I ship your AI solution in weeks, not months' },
                { icon: BarChart3, title: 'Measure', desc: 'Track every metric with real-time dashboards and reports' },
                { icon: Sparkles, title: 'Optimize', desc: 'Continuous improvement based on production data' },
              ].map((step, i) => (
                <div key={step.title} className="flex gap-4 items-start group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/30 transition-colors">
                      <step.icon className="w-5 h-5 text-brand-400" />
                    </div>
                    {i < 3 && <div className="w-0.5 h-8 bg-white/10 mt-2" />}
                  </div>
                  <div className="pt-1.5">
                    <h4 className="text-white font-semibold text-base mb-1">{step.title}</h4>
                    <p className="text-ink-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact / Booking ── */
function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const submission = {
      name: name || 'Not provided',
      email,
      message: message || 'Demo request',
      date: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('nexai_bookings') || '[]');
      existing.push(submission);
      localStorage.setItem('nexai_bookings', JSON.stringify(existing));
    } catch {
      localStorage.setItem('nexai_bookings', JSON.stringify([submission]));
    }

    setSubmittedName(name || email.split('@')[0]);
    setShowConfirm(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-ink-900 to-ink-950 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: info */}
          <div className="animate-fade-in-up">
            <p className="text-brand-400 font-semibold text-sm uppercase tracking-wider mb-3">Get in Touch</p>
            <h2 className="font-display font-bold text-4xl text-white mb-5">
              Book a Demo
            </h2>
            <p className="text-ink-300 text-lg leading-relaxed mb-8">
              Let's talk about how AI can help your business. Fill out the form
              and I'll get back to you within 24 hours.
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center gap-3 text-ink-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center group-hover:bg-brand-500/25 transition-colors">
                  <Mail className="w-5 h-5 text-brand-400" />
                </div>
                <span className="text-sm">{SOCIAL_LINKS.email}</span>
              </a>
              <a
                href={`https://wa.me/${SOCIAL_LINKS.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center group-hover:bg-brand-500/25 transition-colors">
                  <Phone className="w-5 h-5 text-brand-400" />
                </div>
                <span className="text-sm">{SOCIAL_LINKS.phone}</span>
              </a>
            </div>

            <div className="flex gap-3 mt-8">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass hover:bg-brand-500/20 flex items-center justify-center text-ink-300 hover:text-brand-400 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass hover:bg-brand-500/20 flex items-center justify-center text-ink-300 hover:text-brand-400 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass hover:bg-brand-500/20 flex items-center justify-center text-ink-300 hover:text-brand-400 transition-all"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.15s', opacity: 0 }}>
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 space-y-4">
              <div>
                <label className="text-ink-300 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-white/5 text-white rounded-xl px-4 py-3 text-sm placeholder-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-400/50 border border-white/10"
                />
              </div>
              <div>
                <label className="text-ink-300 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 text-white rounded-xl px-4 py-3 text-sm placeholder-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-400/50 border border-white/10"
                />
              </div>
              <div>
                <label className="text-ink-300 text-xs font-medium mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={3}
                  className="w-full bg-white/5 text-white rounded-xl px-4 py-3 text-sm placeholder-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-400/50 border border-white/10 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-500 hover:bg-brand-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Book Demo
                <Send className="w-4 h-4" />
              </button>
              <p className="text-ink-500 text-xs text-center">I'll respond within 24 hours. No spam.</p>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in px-4"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-ink-900 border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-9 h-9 text-brand-400" />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Request Received!
            </h3>
            <p className="text-ink-300 text-sm leading-relaxed mb-6">
              Thanks, {submittedName}! Your demo request has been saved. I'll
              reach out to you within 24 hours to schedule a session.
            </p>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-brand-500 hover:bg-brand-400 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">NexAI</span>
            </div>
            <p className="text-ink-400 text-sm max-w-xs leading-relaxed">
              Building the AI infrastructure that powers tomorrow's businesses.
              Custom agents, automation, and analytics.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass hover:bg-brand-500/20 flex items-center justify-center text-ink-300 hover:text-brand-400 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass hover:bg-brand-500/20 flex items-center justify-center text-ink-300 hover:text-brand-400 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass hover:bg-brand-500/20 flex items-center justify-center text-ink-300 hover:text-brand-400 transition-all"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="w-9 h-9 rounded-full glass hover:bg-brand-500/20 flex items-center justify-center text-ink-300 hover:text-brand-400 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${SOCIAL_LINKS.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass hover:bg-brand-500/20 flex items-center justify-center text-ink-300 hover:text-brand-400 transition-all"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Services', href: '#services' },
                { label: 'About', href: '#about' },
                { label: 'Approach', href: '#approach' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-ink-400 hover:text-white text-sm transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Get in Touch</h4>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${SOCIAL_LINKS.email}`} className="flex items-center gap-2 text-ink-400 hover:text-white text-sm transition-colors">
                  <Mail className="w-4 h-4 text-brand-400" /> {SOCIAL_LINKS.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${SOCIAL_LINKS.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-400 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4 text-brand-400" /> {SOCIAL_LINKS.phone}
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-400 hover:text-white text-sm transition-colors">
                  <Linkedin className="w-4 h-4 text-brand-400" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ink-400 hover:text-white text-sm transition-colors">
                  <Github className="w-4 h-4 text-brand-400" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ink-500 text-sm">© 2026 NexAI. All rights reserved.</p>
          <p className="text-ink-500 text-sm">Built by Hiba Thakur</p>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <HonestResults />
      <Contact />
      <Footer />
    </div>
  );
}
