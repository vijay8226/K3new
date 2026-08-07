import React from 'react';
import { Phone, Mail, MessageSquare, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-container">
        <div className="section-heading">
          <span className="eyebrow">Contact</span>
          <h2>Reach us anytime</h2>
          <p>We are available for quick phone support and WhatsApp bookings.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">
              <Phone size={24} color="#2563EB" />
            </div>
            <h3>Phone Support</h3>
            <div className="contact-phone-list">
              <a href="tel:+918608114055" className="contact-val">+91 8608114055</a>
              <a href="tel:9688804848" className="contact-val">+91 9688804848</a>
              <a href="tel:+916374055143" className="contact-val">+91 6374055143</a>
            </div>
          </div>

          <a href="mailto:nmuthukumar5@gmail.com" className="contact-card">
            <div className="contact-icon">
              <Mail size={24} color="#2563EB" />
            </div>
            <h3>Email</h3>
            <span className="contact-val">nmuthukumar5@gmail.com</span>
          </a>

          <a
            href="https://wa.me/916374055143?text=Hello%20K3%20Multi%20Solution%2C%20I%20want%20to%20book%20a%20service."
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-icon">
              <MessageSquare size={24} color="#25D366" />
            </div>
            <h3>WhatsApp Booking</h3>
            <span className="contact-val">Start chat</span>
          </a>

          <div className="contact-card">
            <div className="contact-icon">
              <MapPin size={24} color="#2563EB" />
            </div>
            <h3>Address</h3>
            <span className="contact-val">Channaikadai Street, Paramakudi</span>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.75rem;
          max-width: 1080px;
          margin: 0 auto;
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          text-align: center;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 8px 25px -5px rgba(15, 23, 42, 0.05), 0 4px 10px rgba(0,0,0,0.02);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border-color: #2563EB;
        }

        .contact-icon {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .contact-card h3 {
          font-size: 1.1rem;
          color: #0F172A;
          margin-bottom: 0.4rem;
        }

        .contact-val {
          font-size: 0.95rem;
          color: #2563EB;
          font-weight: 600;
          word-break: break-all;
          text-decoration: none;
        }

        .contact-phone-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        @media (max-width: 640px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
