import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <h3>K3 Multi Solution</h3>
          <p>Your trusted partner for complete technical solutions.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div className="social-links" aria-label="Social media links">
            <a href="#" aria-label="Facebook" className="social-icon"><span>f</span></a>
            <a href="#" aria-label="Instagram" className="social-icon"><span>◎</span></a>
            <a href="#" aria-label="LinkedIn" className="social-icon"><span>in</span></a>
          </div>
        </div>
      </div>
      <p className="copyright">Copyright © K3 Multi Solution 2026.</p>

      <style>{`
        .site-footer {
          background: #0F172A;
          color: #94A3B8;
          padding: 4rem 1.5rem 2rem 1.5rem;
          border-top: 1px solid #1E293B;
        }

        .footer-inner {
          max-width: 1100px;
          margin: 0 auto 3rem auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
        }

        .footer-inner h3 {
          font-size: 1.35rem;
          color: #FFFFFF;
          margin-bottom: 0.5rem;
        }

        .footer-inner h4 {
          font-size: 1.05rem;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-links a {
          color: #94A3B8;
          text-decoration: none;
          font-size: 0.925rem;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: #38BDF8;
        }

        .social-links {
          display: flex;
          gap: 0.75rem;
        }

        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #1E293B;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          text-decoration: none;
          font-weight: 700;
          transition: background 0.2s ease;
        }

        .social-icon:hover {
          background: #2563EB;
        }

        .copyright {
          text-align: center;
          font-size: 0.85rem;
          color: #64748B;
          border-top: 1px solid #1E293B;
          padding-top: 1.5rem;
        }

        @media (max-width: 768px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </footer>
  );
}
