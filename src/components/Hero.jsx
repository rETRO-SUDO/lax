import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LangContext';
import './Hero.css';

function DashboardCard({ t }) {
    return (
        <div className="dashboard-card">
            <div className="dashboard-header">
                <div className="dashboard-dots"><span /><span /><span /></div>
                <span className="dashboard-title">Automation Dashboard</span>
            </div>
            <div className="dashboard-metrics">
                {[
                    { label: t('dash.tasks'), pct: 85, val: '85%' },
                    { label: t('dash.time'), pct: 72, val: '72%' },
                    { label: t('dash.errors'), pct: 12, val: '↓12%', red: true },
                ].map(m => (
                    <div className="metric-row" key={m.label}>
                        <span className="metric-label">{m.label}</span>
                        <div className="metric-bar">
                            <div className={`metric-fill${m.red ? ' red' : ''}`} style={{ '--w': `${m.pct}%` }} />
                        </div>
                        <span className="metric-val">{m.val}</span>
                    </div>
                ))}
            </div>
            <div className="dashboard-notifications">
                <div className="notif notif-success">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>{t('dash.notif1')}</span>
                </div>
                <div className="notif notif-info">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="3"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    <span>{t('dash.notif2')}</span>
                </div>
                <div className="notif notif-purple">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>{t('dash.notif3')}</span>
                </div>
            </div>
        </div>
    );
}

function AnimatedNumber({ target }) {
    const [val, setVal] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                let start = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    start += step;
                    if (start >= target) { setVal(target); clearInterval(timer); }
                    else setVal(start);
                }, 25);
                obs.disconnect();
            }
        }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);
    return <span ref={ref} className="stat-number">{val}</span>;
}

export default function Hero() {
    const { t } = useLang();

    useEffect(() => {
        const container = document.getElementById('particles');
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.cssText = `left:${Math.random() * 100}%;width:${2 + Math.random() * 3}px;height:${2 + Math.random() * 3}px;--dur:${5 + Math.random() * 8}s;--delay:${Math.random() * 8}s`;
            container.appendChild(p);
        }
    }, []);

    return (
        <section className="hero" id="hero">
            <div className="hero-bg">
                <div className="hero-grid" />
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />
                <div className="hero-orb hero-orb-3" />
                <div id="particles" className="particles" />
            </div>

            <div className="hero-content">
                {/* Left */}
                <div className="hero-left">
                    <div className="hero-badge">
                        <span className="badge-dot" />
                        <span>{t('hero.badge')}</span>
                    </div>
                    <h1 className="hero-title">
                        <span className="hero-title-line">{t('hero.title1')}</span>
                        <span className="hero-title-line gradient-text">{t('hero.title2')}</span>
                        <span className="hero-title-line">{t('hero.title3')}</span>
                    </h1>
                    <p className="hero-subtitle">{t('hero.subtitle')}</p>
                    <div className="hero-actions">
                        <a href="#contact" className="btn btn-primary btn-large">
                            <span>{t('hero.cta1')}</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                        <a href="#process" className="btn btn-ghost btn-large">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                            <span>{t('hero.cta2')}</span>
                        </a>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-row">
                                <AnimatedNumber target={70} />
                                <span className="stat-symbol">%</span>
                            </div>
                            <span className="stat-label">{t('hero.stat1')}</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <div className="stat-row">
                                <AnimatedNumber target={200} />
                                <span className="stat-symbol">+</span>
                            </div>
                            <span className="stat-label">{t('hero.stat2')}</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <div className="stat-row">
                                <AnimatedNumber target={3} />
                                <span className="stat-symbol">x</span>
                            </div>
                            <span className="stat-label">{t('hero.stat3')}</span>
                        </div>
                    </div>
                </div>

                {/* Right – Dashboard card */}
                <div className="hero-right">
                    <DashboardCard t={t} />
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-line" />
                <span>{t('hero.scroll')}</span>
            </div>
        </section>
    );
}
