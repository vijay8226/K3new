import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  const slides = [
    '/images/1.webp',
    '/images/3.webp',
    '/images/company.webp',
    '/images/ac.webp',
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    slides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero-root">
      {/* Background Image Slideshow */}
      <div className="hero-slideshow">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === activeSlide ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      {/* Hero Center Card Container */}
      <div className="hero-container">
        <div className="hero-glass-card">
          {/* Top Badge */}
          <div className="hero-top-badge">
            <span>Trusted technical support in Paramakudi</span>
          </div>

          {/* Title Row with K3 Icon */}
          <div className="hero-title-row">
            <div className="hero-title-badge">K3</div>
            <h1 className="hero-title">K3 Multi Solution</h1>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Your trusted partner for complete technical solutions
          </p>

          {/* Inner Text Card Box */}
          <div className="hero-inner-card">
            <p>
              We deliver dependable home and business services with skilled technicians,
              clear communication, and quick WhatsApp booking. From AC repair to electrical
              and plumbing work, we help you get the job done right.
            </p>
          </div>

          {/* Action Pill Buttons */}
          <div className="hero-actions">
            <button onClick={() => onOpenBooking()} className="btn btn-primary hero-btn-whatsapp">
              <span>Book Now on WhatsApp</span>
            </button>

            <a href="#services" className="btn btn-secondary hero-btn-explore">
              <span>Explore Services</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .hero-root {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6.5rem 1.5rem 4rem 1.5rem;
          overflow: hidden;
          background: #090D16;
        }

        .hero-slideshow {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }

        .hero-slide.is-active {
          opacity: 1;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
        }

        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }

        .hero-glass-card {
          width: 100%;
          background: rgba(23, 30, 46, 0.78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 28px;
          padding: 2.75rem 2.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .hero-top-badge {
          display: inline-block;
          padding: 0.35rem 1.2rem;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          color: #F8FAFC;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1.25rem;
        }

        .hero-title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        .hero-title-badge {
          width: 50px;
          height: 50px;
          background: #FFFFFF;
          color: #2563EB;
          font-family: var(--font-primary);
          font-weight: 800;
          font-size: 1.3rem;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .hero-title {
          font-family: var(--font-primary);
          font-size: 3rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          color: #CBD5E1;
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 1.25rem;
        }

        .hero-inner-card {
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.25rem 1.6rem;
          max-width: 580px;
          margin-bottom: 1.75rem;
        }

        .hero-inner-card p {
          color: #E2E8F0;
          font-size: 0.95rem;
          line-height: 1.65;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-btn-whatsapp {
          padding: 0.8rem 1.75rem;
          font-size: 0.975rem;
        }

        .hero-btn-explore {
          padding: 0.8rem 1.75rem;
          font-size: 0.975rem;
        }

        @media (max-width: 768px) {
          .hero-glass-card {
            padding: 2rem 1.25rem;
            border-radius: 20px;
          }
          .hero-title {
            font-size: 2.1rem;
          }
          .hero-title-badge {
            width: 42px;
            height: 42px;
            font-size: 1.05rem;
            border-radius: 10px;
          }
          .hero-subtitle {
            font-size: 0.925rem;
          }
          .hero-inner-card {
            padding: 1rem;
          }
          .hero-inner-card p {
            font-size: 0.875rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
