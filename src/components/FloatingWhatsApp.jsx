import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function FloatingWhatsApp({ onOpenBooking }) {
  return (
    <div className="floating-whatsapp-wrapper">
      <button
        onClick={() => onOpenBooking()}
        className="floating-whatsapp-btn"
        aria-label="Book service on WhatsApp"
        title="Instant WhatsApp Booking"
      >
        <MessageSquare size={24} color="#FFF" />
        <span className="floating-btn-text">WhatsApp Booking</span>
      </button>

      <style>{`
        .floating-whatsapp-wrapper {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 990;
        }

        .floating-whatsapp-btn {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 1.4rem;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: #FFFFFF;
          border: none;
          outline: none;
          font-family: var(--font-primary);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.45);
          animation: pulseGlow 3s infinite ease-in-out;
          transition: transform 0.25s ease;
        }

        .floating-whatsapp-btn:hover {
          transform: scale(1.06) translateY(-2px);
        }

        @media (max-width: 640px) {
          .floating-whatsapp-wrapper {
            bottom: 1.25rem;
            right: 1.25rem;
          }
          .floating-btn-text {
            display: none;
          }
          .floating-whatsapp-btn {
            padding: 1rem;
            border-radius: 50%;
          }
        }
      `}</style>
    </div>
  );
}
