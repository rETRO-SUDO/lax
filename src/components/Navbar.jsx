import { useState, useEffect } from 'react';
import { useLang } from '../i18n/LangContext';
import './Navbar.css';

const Logo = () => (
    <div className="nav-logo">
        <img src="/logo-icon.png" alt="BS" className="logo-icon-img" />
        <span className="logo-text">Business<span className="logo-accent">Solutions</span></span>
    </div>
);

export default function Navbar() {
    const { lang, setLang, t } = useLang();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { href: '#services', key: 'nav.services' },
        { href: '#process', key: 'nav.process' },
        { href: '#benefits', key: 'nav.benefits' },
        { href: '#pricing', key: 'nav.pricing' },
        { href: '#contact', key: 'nav.contact' },
    ];

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <div className="nav-container">
                <Logo />

                <div className={`nav-links${menuOpen ? ' open' : ''}`}>
                    {navLinks.map(l => (
                        <a key={l.key} href={l.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                            {t(l.key)}
                        </a>
                    ))}
                </div>

                <div className="nav-right">
                    <div className="lang-switcher">
                        {['en', 'uz', 'ru'].map(code => (
                            <button
                                key={code}
                                className={`lang-btn${lang === code ? ' active' : ''}`}
                                onClick={() => { setLang(code); setMenuOpen(false); }}
                            >
                                {code.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <a href="#contact" className="btn btn-primary nav-cta">{t('nav.cta')}</a>
                    <button
                        className={`hamburger${menuOpen ? ' open' : ''}`}
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>
        </nav>
    );
}
