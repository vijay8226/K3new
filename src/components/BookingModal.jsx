import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Calendar, Clock, User, Phone, MapPin, CheckCircle, Wrench } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, selectedService }) {
  const [serviceType, setServiceType] = useState('AC Installation & Repair');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 12 PM)');
  const [address, setAddress] = useState('Paramakudi');
  const [notes, setNotes] = useState('');

  const serviceOptions = [
    'AC Installation & Repair',
    'Camera / CCTV Installation',
    'Electrical Work (Fan, Lights, Wiring)',
    'UPS Battery Sales & Service',
    'Plumbing Work (Tank, Pump, Fittings)',
    'Other Technical Service',
  ];

  useEffect(() => {
    if (selectedService) {
      setServiceType(selectedService.title || selectedService);
    }
  }, [selectedService]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    let text = `Hello K3 Multi Solution!\n`;
    text += `*Service Request:* ${serviceType}\n`;
    if (customerName) text += `*Name:* ${customerName}\n`;
    if (customerPhone) text += `*Phone:* ${customerPhone}\n`;
    if (preferredDate) text += `*Preferred Date:* ${preferredDate}\n`;
    text += `*Preferred Time:* ${preferredTime}\n`;
    text += `*Address:* ${address}\n`;
    if (notes) text += `*Details/Issue:* ${notes}\n`;
    text += `\nPlease confirm technician availability!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/918608114055?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container glass-panel">
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon">
              <MessageSquare size={20} color="#25D366" />
            </div>
            <div>
              <h3 className="modal-title">Instant WhatsApp Booking</h3>
              <p className="modal-subtitle">Direct dispatch to K3 Technicians in Paramakudi</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Service Selection */}
          <div className="form-group">
            <label className="form-label">
              <Wrench size={15} /> Service Required
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="form-control"
              required
            >
              {serviceOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <User size={15} /> Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Phone size={15} /> Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <Calendar size={15} /> Preferred Date
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Clock size={15} /> Preferred Time
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="form-control"
              >
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                <option value="Emergency (As Soon As Possible)">Emergency (ASAP)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <MapPin size={15} /> Location / Address in Paramakudi
            </label>
            <input
              type="text"
              placeholder="e.g. Gandhi Nagar, Paramakudi"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Additional Issue Details / Notes (Optional)</label>
            <textarea
              rows={2}
              placeholder="Describe the issue (e.g. AC not cooling, need 4 CCTV cameras setup...)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn btn-whatsapp w-full btn-lg">
              <MessageSquare size={20} />
              <span>Send & Connect on WhatsApp</span>
            </button>
            <p className="modal-privacy-note">
              <CheckCircle size={13} color="#10B981" /> No login needed. Instant response from technician.
            </p>
          </div>
        </form>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.25s ease;
        }

        .modal-container {
          width: 100%;
          max-width: 540px;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
          overflow: hidden;
          background: #0F172A;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--surface-border);
          background: rgba(18, 24, 39, 0.8);
        }

        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .modal-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(37, 211, 102, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-title {
          font-size: 1.15rem;
          line-height: 1.2;
        }

        .modal-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 6px;
          transition: background 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #FFF;
        }

        .modal-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-sub);
        }

        .form-control {
          width: 100%;
          padding: 0.65rem 0.9rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-sm);
          color: #FFF;
          font-family: var(--font-body);
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-control:focus {
          border-color: #38BDF8;
          background: rgba(255, 255, 255, 0.08);
        }

        .form-control option {
          background: #0F172A;
          color: #FFF;
        }

        .btn-lg {
          padding: 0.95rem;
          font-size: 1rem;
        }

        .modal-privacy-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.775rem;
          color: var(--text-muted);
          margin-top: 0.75rem;
          text-align: center;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 540px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
