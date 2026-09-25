import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

export default function Header({ onOpenBooking }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Branch', href: '#branch' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#home" className="brand-logo">
          <div className="logo-mark">K3</div>
          <div className="brand-text">
            <strong>K3 Multi Solution</strong>
            <small>Complete technical solutions</small>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-item">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Header Button */}
        <div className="header-actions">
          <button onClick={() => onOpenBooking()} className="btn btn-primary header-cta-btn">
            <MessageSquare size={16} />
            <span>Book Now</span>
          </button>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-nav-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-actions">
            <a href="tel:+918608114055" className="mobile-call-btn">
              <Phone size={16} /> Call +91 8608114055
            </a>
            <a href="tel:+919688804848" className="mobile-call-btn">
              <Phone size={16} /> Call +91 9688804848
            </a>
            <a href="tel:+916374055143" className="mobile-call-btn">
              <Phone size={16} /> Call +91 6374055143
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="btn btn-whatsapp w-full"
            >
              <MessageSquare size={16} /> Book via WhatsApp
            </button>
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
          padding: 0.85rem 0;
          box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.05);
        }

        .site-header.is-scrolled {
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 10px 30px -5px rgba(37, 99, 235, 0.08);
        }

        .header-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .logo-mark {
          width: 44px;
          height: 44px;
          background: #2563EB;
          color: #FFFFFF;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-primary);
          font-weight: 800;
          font-size: 1.2rem;
          box-shadow: 0 3px 8px rgba(37, 99, 235, 0.3);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-text strong {
          font-family: var(--font-primary);
          font-size: 1.15rem;
          color: #111827;
          line-height: 1.2;
        }

        .brand-text small {
          font-size: 0.75rem;
          color: #6B7280;
          font-weight: 500;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-item {
          text-decoration: none;
          color: #374151;
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }

        .nav-item:hover {
          color: #2563EB;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-cta-btn {
          padding: 0.6rem 1.25rem;
          font-size: 0.9rem;
        }

        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: #111827;
          cursor: pointer;
          padding: 0.3rem;
        }

        .mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #FFFFFF;
          border-bottom: 1px solid #E5E7EB;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: calc(100dvh - 75px);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .mobile-nav-item {
          text-decoration: none;
          color: #111827;
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 1.05rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #F3F4F6;
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .mobile-call-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: var(--radius-full);
          background: #F3F4F6;
          color: #111827;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .w-full {
          width: 100%;
        }

        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }
          .mobile-toggle {
            display: flex;
            align-items: center;
          }
          .header-cta-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
