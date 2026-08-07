import React from 'react';
import { Users, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: <Users size={24} color="#2563EB" />,
      value: '500+',
      label: 'Happy Customers',
      sub: 'In Paramakudi & surround',
    },
    {
      icon: <Award size={24} color="#2563EB" />,
      value: '5+',
      label: 'Core Services',
      sub: 'AC, CCTV, Elec, UPS, Plumbing',
    },
    {
      icon: <ShieldCheck size={24} color="#2563EB" />,
      value: '100%',
      label: 'Verified Guarantee',
      sub: 'Skilled certified work',
    },
    {
      icon: <Clock size={24} color="#2563EB" />,
      value: 'Fast',
      label: 'Express Booking',
      sub: 'Instant WhatsApp response',
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((item, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon-wrapper">{item.icon}</div>
              <div className="stat-text-block">
                <div className="stat-value">{item.value}</div>
                <div className="stat-label">{item.label}</div>
                <div className="stat-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-section {
          background: transparent;
          padding: 2.5rem 1.5rem;
          position: relative;
          z-index: 1;
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 24px;
          padding: 1.75rem 2rem;
          gap: 1.5rem;
          box-shadow: 0 10px 30px -5px rgba(37, 99, 235, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-card:not(:last-child) {
          border-right: 1px solid #F1F5F9;
          padding-right: 1rem;
        }

        .stat-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #EFF6FF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-value {
          font-family: var(--font-primary);
          font-size: 1.6rem;
          font-weight: 800;
          line-height: 1;
          color: #0F172A;
        }

        .stat-label {
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.9rem;
          color: #1E293B;
          margin-top: 0.2rem;
        }

        .stat-sub {
          font-size: 0.775rem;
          color: #64748B;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-card:nth-child(2) {
            border-right: none;
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1.25rem;
          }
          .stat-card:not(:last-child) {
            border-right: none;
            border-bottom: 1px solid #F1F5F9;
            padding-bottom: 1rem;
            padding-right: 0;
          }
        }
      `}</style>
    </section>
  );
}
