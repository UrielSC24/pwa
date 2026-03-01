"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="main-header">
            <div className="header-content">

                {/* LOGO */}
                <Link href="/" className="brand-logo" onClick={closeMenu}>
                    CAPITAL FLOW
                </Link>

                {/* NAV LINKS (Desktop) */}
                <nav className="nav-desktop">
                    <Link href="/" className={`nav-link ${pathname === "/" ? 'active' : ''}`}>
                        Festival
                    </Link>
                    <Link href="#" className={`nav-link ${pathname === "/horarios" ? 'active' : ''}`}>
                        Horarios
                    </Link>
                    <Link href="#" className={`nav-link ${pathname === "/bandas" ? 'active' : ''}`}>
                        Bandas
                    </Link>
                </nav>

                {/* DESKTOP ACTIONS */}
                <div className="desktop-actions">
                    <Link href="/login" className="login-btn">
                        LOGIN
                    </Link>
                </div>

                {/* MOBILE MENU TOGGLE */}
                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? (
                        /* X Icon */
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '32px', height: '32px' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        /* Hamburger Icon */
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '32px', height: '32px' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* MOBILE NAVIGATION OVERLAY */}
            {isMenuOpen && (
                <div className="mobile-nav-overlay">
                    <nav className="mobile-nav-content">
                        <Link href="/" className={`mobile-nav-link ${pathname === "/" ? 'active' : ''}`} onClick={closeMenu}>
                            Festival
                        </Link>
                        <Link href="#" className="mobile-nav-link" onClick={closeMenu}>
                            Horarios
                        </Link>
                        <Link href="#" className="mobile-nav-link" onClick={closeMenu}>
                            Bandas
                        </Link>
                        <div style={{ width: '100%', height: '1px', background: 'var(--glass-border)', margin: '1rem 0' }}></div>
                        <Link href="/login" className="mobile-login-btn" onClick={closeMenu}>
                            LOGIN ADMIN
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
