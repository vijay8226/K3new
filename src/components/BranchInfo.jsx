import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';

export default function BranchInfo() {
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Channaikadai+Street+Paramakudi+623707";

  return (
    <section id="branch" className="section section-muted branch-section">
      <div className="section-container">
        <div className="section-heading">
          <span className="eyebrow">Branch Address</span>
          <h2>Visit our Paramakudi branch</h2>
          <p>Get in-person assistance for technical queries, UPS sales, and equipment servicing.</p>
        </div>

        <div className="branch-card-container">
          <div className="branch-card">
            <div className="branch-icon-box">
              <MapPin size={28} color="#2563EB" />
            </div>

            <div className="branch-details">
              <h3 className="branch-title">Paramakudi Branch</h3>
              <p className="branch-address">Channaikadai Street, Paramakudi – 623707, Tamil Nadu</p>
              
              <div className="branch-meta">
                <div className="meta-item">
                  <Clock size={16} color="#64748B" />
                  <span>Mon – Sat: 8:00 AM – 8:30 PM</span>
                </div>
                <div className="meta-item">
                  <Phone size={16} color="#64748B" />
                  <a href="tel:+918608114055" className="phone-link">+91 8608114055</a>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary branch-dir-btn"
              >
                <Navigation size={16} />
                <span>Get Directions on Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="branch-img-box">
              <img
                src="images/company.webp"
                alt="K3 Paramakudi Branch"
                className="branch-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .branch-section {
          background-color: #F8FAFC;
        }

        .branch-card-container {
          max-width: 960px;
          margin: 0 auto;
        }

        .branch-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 24px;
          padding: 2.5rem;
          display: grid;
          grid-template-columns: auto 1fr 1fr;
          gap: 2rem;
          align-items: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        .branch-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: #EFF6FF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .branch-title {
          font-size: 1.5rem;
          color: #0F172A;
          margin-bottom: 0.3rem;
        }

        .branch-address {
          font-size: 1rem;
          color: #475569;
          margin-bottom: 1rem;
        }

        .branch-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #64748B;
        }

        .phone-link {
          color: #2563EB;
          font-weight: 700;
          text-decoration: none;
        }

        .branch-dir-btn {
          font-size: 0.9rem;
          padding: 0.65rem 1.4rem;
        }

        .branch-img-box {
          width: 100%;
          height: 220px;
          border-radius: 16px;
          overflow: hidden;
        }

        .branch-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 900px) {
          .branch-card {
            grid-template-columns: 1fr;
          }
          .branch-icon-box {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
