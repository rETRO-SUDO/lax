import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LangContext';
import './Sections.css';

/* ── Intersection-observer reveal hook ── */
function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal');
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: 0.12 }
        );
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    });
}

/* ── Animated progress bar (animates when visible) ── */
function AnimBar({ pct, color }) {
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { ref.current.style.width = pct; obs.disconnect(); }
        }, { threshold: 0.4 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [pct]);
    return (
        <div className="result-bar">
            <div ref={ref} className="result-fill" style={{ width: 0, background: color || 'var(--gradient-main)' }} />
        </div>
    );
}

/* ═══════ LOGOS STRIP ═══════ */
export function LogosStrip() {
    const { t } = useLang();
    const companies = ['Retail Pro', 'FinanceHub', 'MedCorp', 'LogiFlow', 'EduTech', 'RealEstateCo', 'ManufactX'];
    const doubled = [...companies, ...companies];
    return (
        <section className="logos-strip">
            <p className="logos-label">{t('logos.label')}</p>
            <div className="logos-track">
                <div className="logos-slide">
                    {doubled.map((c, i) => <span key={i} className="logo-pill">{c}</span>)}
                </div>
            </div>
        </section>
    );
}

/* ═══════ SERVICES ═══════ */
const serviceIcons = [
    <svg key="s1" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill="url(#si1)" opacity="0.15" /><rect x="10" y="10" width="12" height="12" rx="3" stroke="url(#si1)" strokeWidth="2" /><rect x="26" y="10" width="12" height="12" rx="3" stroke="url(#si1)" strokeWidth="2" /><rect x="10" y="26" width="12" height="12" rx="3" stroke="url(#si1)" strokeWidth="2" /><rect x="26" y="26" width="12" height="12" rx="3" stroke="url(#si1)" strokeWidth="2" /><defs><linearGradient id="si1" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#00d4ff" /><stop offset="1" stopColor="#0066ff" /></linearGradient></defs></svg>,
    <svg key="s2" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill="url(#si2)" opacity="0.15" /><rect x="10" y="14" width="28" height="20" rx="3" stroke="url(#si2)" strokeWidth="2" /><path d="M10 20h28M16 14v-3M32 14v-3M15 27h6M15 32h4" stroke="url(#si2)" strokeWidth="2" strokeLinecap="round" /><defs><linearGradient id="si2" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#7c3aed" /><stop offset="1" stopColor="#00d4ff" /></linearGradient></defs></svg>,
    <svg key="s3" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill="url(#si3)" opacity="0.15" /><path d="M24 10v4M24 34v4M10 24h4M34 24h4M18 18l2 2M28 28l2 2M28 18l-2 2M18 28l-2 2" stroke="url(#si3)" strokeWidth="2" strokeLinecap="round" /><circle cx="24" cy="24" r="8" stroke="url(#si3)" strokeWidth="2" /><defs><linearGradient id="si3" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#f59e0b" /><stop offset="1" stopColor="#ef4444" /></linearGradient></defs></svg>,
    <svg key="s4" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill="url(#si4)" opacity="0.15" /><path d="M12 36L24 12l12 24M16 28h16" stroke="url(#si4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><defs><linearGradient id="si4" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#22c55e" /><stop offset="1" stopColor="#00d4ff" /></linearGradient></defs></svg>,
    <svg key="s5" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill="url(#si5)" opacity="0.15" /><rect x="10" y="16" width="28" height="18" rx="3" stroke="url(#si5)" strokeWidth="2" /><path d="M18 16v-4h12v4M24 25v3M21 28h6" stroke="url(#si5)" strokeWidth="2" strokeLinecap="round" /><defs><linearGradient id="si5" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#00d4ff" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs></svg>,
    <svg key="s6" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill="url(#si6)" opacity="0.15" /><path d="M14 24a10 10 0 0 1 20 0M24 28v6M18 32l6-4 6 4" stroke="url(#si6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="24" cy="24" r="4" stroke="url(#si6)" strokeWidth="2" /><defs><linearGradient id="si6" x1="0" y1="0" x2="48" y2="48"><stop stopColor="#f59e0b" /><stop offset="1" stopColor="#7c3aed" /></linearGradient></defs></svg>,
];

export function Services() {
    const { t } = useLang();
    useReveal();
    const cards = [
        { titleK: 's1.title', descK: 's1.desc', feats: ['s1.f1', 's1.f2', 's1.f3'] },
        { titleK: 's2.title', descK: 's2.desc', feats: ['s2.f1', 's2.f2', 's2.f3'] },
        { titleK: 's3.title', descK: 's3.desc', feats: ['s3.f1', 's3.f2', 's3.f3'] },
        { titleK: 's4.title', descK: 's4.desc', feats: ['s4.f1', 's4.f2', 's4.f3'] },
        { titleK: 's5.title', descK: 's5.desc', feats: ['s5.f1', 's5.f2', 's5.f3'] },
        { titleK: 's6.title', descK: 's6.desc', feats: ['s6.f1', 's6.f2', 's6.f3'] },
    ];
    return (
        <section className="section services" id="services">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">{t('services.tag')}</span>
                    <h2 className="section-title">{t('services.title').split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
                    <p className="section-subtitle">{t('services.subtitle')}</p>
                </div>
                <div className="services-grid">
                    {cards.map((c, i) => (
                        <div className="service-card reveal" key={i} style={{ '--delay': `${i * 0.1}s` }}>
                            <div className="service-icon">{serviceIcons[i]}</div>
                            <h3 className="service-title">{t(c.titleK)}</h3>
                            <p className="service-desc">{t(c.descK)}</p>
                            <ul className="service-features">
                                {c.feats.map(f => <li key={f}>{t(f)}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════ PROCESS ═══════ */
export function Process() {
    const { t } = useLang();
    useReveal();
    const steps = [
        { num: '01', tK: 'p1.title', dK: 'p1.desc' },
        { num: '02', tK: 'p2.title', dK: 'p2.desc' },
        { num: '03', tK: 'p3.title', dK: 'p3.desc' },
        { num: '04', tK: 'p4.title', dK: 'p4.desc' },
    ];
    return (
        <section className="section process" id="process">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">{t('process.tag')}</span>
                    <h2 className="section-title">{t('process.title').split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
                </div>
                <div className="process-steps">
                    {steps.map((s, i) => (
                        <div className="process-step reveal" key={i} style={{ '--delay': `${i * 0.12}s` }}>
                            <div className="step-number">{s.num}</div>
                            {i < 3 && <div className="step-connector" />}
                            <div className="step-content">
                                <h3>{t(s.tK)}</h3>
                                <p>{t(s.dK)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════ BENEFITS ═══════ */
export function Benefits() {
    const { t } = useLang();
    useReveal();
    const metrics = [
        { lK: 'r1.label', pct: '80%', color: 'var(--gradient-main)' },
        { lK: 'r2.label', pct: '65%', color: 'linear-gradient(90deg,#7c3aed,#00d4ff)' },
        { lK: 'r3.label', pct: '42%', color: 'linear-gradient(90deg,#22c55e,#00d4ff)' },
        { lK: 'r4.label', pct: '91%', color: 'linear-gradient(90deg,#f59e0b,#ef4444)' },
    ];
    const bens = [
        { tK: 'b1.title', dK: 'b1.desc' }, { tK: 'b2.title', dK: 'b2.desc' },
        { tK: 'b3.title', dK: 'b3.desc' }, { tK: 'b4.title', dK: 'b4.desc' },
    ];
    return (
        <section className="section benefits" id="benefits">
            <div className="container">
                <div className="benefits-inner">
                    <div className="benefits-text reveal">
                        <span className="section-tag">{t('benefits.tag')}</span>
                        <h2 className="section-title">{t('benefits.title').split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
                        <div className="benefit-list">
                            {bens.map((b, i) => (
                                <div className="benefit-item" key={i}>
                                    <div className="benefit-check">✓</div>
                                    <div>
                                        <strong>{t(b.tK)}</strong>
                                        <p>{t(b.dK)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a href="#contact" className="btn btn-primary">{t('benefits.cta')}</a>
                    </div>
                    <div className="benefits-visual reveal" style={{ '--delay': '0.2s' }}>
                        <div className="results-card">
                            <div className="results-header">{t('results.title')}</div>
                            {metrics.map(m => (
                                <div className="result-metric" key={m.lK}>
                                    <div className="result-label">{t(m.lK)}</div>
                                    <div className="result-bar-wrap">
                                        <AnimBar pct={m.pct} color={m.color} />
                                        <span className="result-pct">{m.pct}</span>
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

/* ═══════ TESTIMONIALS ═══════ */
export function Testimonials() {
    const { t } = useLang();
    useReveal();
    const cards = [
        { tK: 't1.text', nK: 't1.name', rK: 't1.role', av: 'AN' },
        { tK: 't2.text', nK: 't2.name', rK: 't2.role', av: 'MP' },
        { tK: 't3.text', nK: 't3.name', rK: 't3.role', av: 'JK' },
    ];
    return (
        <section className="section testimonials">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">{t('testimonials.tag')}</span>
                    <h2 className="section-title">{t('testimonials.title')}</h2>
                </div>
                <div className="testimonials-grid">
                    {cards.map((c, i) => (
                        <div className="testimonial-card reveal" key={i} style={{ '--delay': `${i * 0.12}s` }}>
                            <div className="testimonial-stars">★★★★★</div>
                            <p className="testimonial-text">{t(c.tK)}</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">{c.av}</div>
                                <div>
                                    <div className="author-name">{t(c.nK)}</div>
                                    <div className="author-role">{t(c.rK)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════ PRICING ═══════ */
export function Pricing() {
    const { t } = useLang();
    useReveal();
    const plans = [
        { nameK: 'plan1.name', feats: ['plan1.f1', 'plan1.f2', 'plan1.f3', 'plan1.f4'], descK: 'plan1.desc' },
        { nameK: 'plan2.name', feats: ['plan2.f1', 'plan2.f2', 'plan2.f3', 'plan2.f4', 'plan2.f5'], descK: 'plan2.desc', featured: true },
        { nameK: 'plan3.name', feats: ['plan3.f1', 'plan3.f2', 'plan3.f3', 'plan3.f4', 'plan3.f5'], descK: 'plan3.desc' },
    ];
    return (
        <section className="section pricing" id="pricing">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">{t('pricing.tag')}</span>
                    <h2 className="section-title">{t('pricing.title')}</h2>
                    <p className="section-subtitle">{t('pricing.subtitle')}</p>
                </div>
                <div className="pricing-grid">
                    {plans.map((p, i) => (
                        <div className={`pricing-card reveal${p.featured ? ' featured' : ''}`} key={i} style={{ '--delay': `${i * 0.12}s` }}>
                            {p.featured && <div className="pricing-popular">{t('plan.popular')}</div>}
                            <div className="pricing-tier">{t(p.nameK)}</div>
                            <div className="pricing-price-custom">{t('price.custom')}</div>
                            <p className="pricing-desc">{t(p.descK)}</p>
                            <ul className="pricing-features">
                                {p.feats.map(f => <li key={f}>{t(f)}</li>)}
                            </ul>
                            <a href="https://t.me/Bussiness_solutions_uz" target="_blank" rel="noopener noreferrer" className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'}`}>{t('plan.cta')}</a>
                        </div>
                    ))}
                </div>
                <div className="pricing-note reveal" style={{ '--delay': '0.3s' }}>
                    <span className="pricing-note-icon">💬</span>
                    <p>{t('pricing.note')}</p>
                </div>
            </div>
        </section>
    );
}

/* ═══════ FAQ ═══════ */
export function FAQ() {
    const { t } = useLang();
    useReveal();
    const [open, setOpen] = useState(null);
    const items = ['faq1', 'faq2', 'faq3', 'faq4'];
    return (
        <section className="section faq">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">{t('faq.tag')}</span>
                    <h2 className="section-title">{t('faq.title')}</h2>
                </div>
                <div className="faq-list">
                    {items.map((k, i) => (
                        <div className={`faq-item reveal${open === i ? ' open' : ''}`} key={k} style={{ '--delay': `${i * 0.1}s` }}>
                            <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                                <span>{t(`${k}.q`)}</span>
                                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                            </button>
                            <div className="faq-answer"><p>{t(`${k}.a`)}</p></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════ CONTACT ═══════ */
export function Contact() {
    const { t } = useLang();
    useReveal();
    return (
        <section className="section contact" id="contact">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">{t('contact.tag')}</span>
                    <h2 className="section-title">{t('contact.title').split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</h2>
                    <p className="section-subtitle">{t('contact.subtitle')}</p>
                </div>
                <div className="contact-cta-card reveal" style={{ '--delay': '0.2s' }}>
                    <div className="cta-contact-method">
                        <div className="cta-method-icon tg-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.67l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.889z" /></svg>
                        </div>
                        <div className="cta-method-info">
                            <span className="cta-method-label">{t('contact.tg.label')}</span>
                            <a href="https://t.me/Bussiness_solutions_uz" target="_blank" rel="noopener noreferrer" className="cta-method-value">@Bussiness_solutions_uz</a>
                        </div>
                        <a href="https://t.me/Bussiness_solutions_uz" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <span>{t('contact.tg.btn')}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                    </div>
                    <div className="cta-divider"><span>{t('contact.or')}</span></div>
                    <div className="cta-contact-method">
                        <div className="cta-method-icon phone-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.29 6.29l.98-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        </div>
                        <div className="cta-method-info">
                            <span className="cta-method-label">{t('contact.phone.label')}</span>
                            <a href="tel:+998332499999" className="cta-method-value">+998 33 249 99 99</a>
                        </div>
                        <a href="tel:+998332499999" className="btn btn-ghost">
                            <span>{t('contact.phone.btn')}</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ═══════ FOOTER ═══════ */
export function Footer() {
    const { lang, setLang, t } = useLang();
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="nav-logo">
                            <img src="/logo-icon.png" alt="BS" className="logo-icon-img" />
                            <span className="logo-text">Business<span className="logo-accent">Solutions</span></span>
                        </div>
                        <p className="footer-tagline">{t('footer.tagline')}</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-col">
                            <h4>{t('footer.services')}</h4>
                            <a href="#services">{t('footer.crm')}</a>
                            <a href="#services">{t('footer.finance')}</a>
                            <a href="#services">{t('footer.hr')}</a>
                            <a href="#services">{t('footer.marketing')}</a>
                        </div>
                        <div className="footer-col">
                            <h4>{t('footer.company')}</h4>
                            <a href="#process">{t('footer.how')}</a>
                            <a href="#benefits">{t('footer.why')}</a>
                            <a href="#pricing">{t('footer.pricing')}</a>
                            <a href="#contact">{t('footer.contact')}</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>{t('footer.copy')}</p>
                    <div className="footer-langs">
                        {['en', 'uz', 'ru'].map(c => (
                            <button key={c} className={`lang-btn-sm${lang === c ? ' active' : ''}`} onClick={() => setLang(c)}>
                                {c === 'en' ? 'English' : c === 'uz' ? "O'zbek" : 'Русский'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
