import React from 'react';
import { ShieldCheck, Zap, DollarSign, HeartHandshake, Wrench, Camera, BatteryCharging, Droplets } from 'lucide-react';

export default function AboutSection() {
  const serviceHighlights = [
    { icon: <Wrench size={22} color="#2563EB" />, title: 'AC Installation & Repair' },
    { icon: <Camera size={22} color="#2563EB" />, title: 'Camera / CCTV Setup' },
    { icon: <Zap size={22} color="#2563EB" />, title: 'Electrical Contracts & Wiring' },
    { icon: <BatteryCharging size={22} color="#2563EB" />, title: 'UPS Battery Sales & Support' },
    { icon: <Droplets size={22} color="#2563EB" />, title: 'Plumbing & Water Motor Pump' },
  ];

  return (
    <section id="about" className="section section-muted about-section">
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-heading">
          <span className="eyebrow">About Us</span>
          <h2>Reliable service, affordable cost, and quicker response</h2>
        </div>

        {/* Main Content Card */}
        <div className="about-main-card">
          <p className="about-text-lead">
            At <strong>K3 Multi Solution</strong>, we provide reliable service, affordable cost, and quicker response for all your technical needs in Paramakudi and surrounding areas.
          </p>
          <p className="about-text-sub">
            Our expertise covers AC installation & repair, camera installation, electrical work, UPS battery sales & service, and plumbing solutions. We are committed to customer satisfaction and long-term trust.
          </p>

          <div className="about-grid">
            {serviceHighlights.map((item, idx) => (
              <div key={idx} className="about-service-pill">
                <div className="service-icon-box">{item.icon}</div>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: #F8FAFC;
        }

        .about-main-card {
          max-width: 900px;
          margin: 0 auto;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-lg);
          padding: 3rem 2.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          text-align: center;
        }

        .about-text-lead {
          font-size: 1.2rem;
          color: #1E293B;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .about-text-sub {
          font-size: 1rem;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .about-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }

        .about-service-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.4rem;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-full);
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.925rem;
          color: #1E293B;
          transition: all 0.25s ease;
        }

        .about-service-pill:hover {
          background: #FFFFFF;
          border-color: #2563EB;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
        }

        .service-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .about-main-card {
            padding: 1.75rem 1.25rem;
          }
          .about-text-lead {
            font-size: 1.05rem;
          }
          .about-service-pill {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
