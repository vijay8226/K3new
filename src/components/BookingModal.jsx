import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Clock, User, Phone, MapPin, CheckCircle, Wrench, Navigation, Loader2 } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, selectedService }) {
  const [serviceType, setServiceType] = useState('AC Installation & Repair');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (9 AM - 12 PM)');
  const [address, setAddress] = useState('Paramakudi');
  const [notes, setNotes] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');

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

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationStatus('Detecting location...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        setAddress(`Paramakudi (GPS: ${mapsLink})`);
        setIsLocating(false);
        setLocationStatus('Location detected & added!');
        setTimeout(() => setLocationStatus(''), 4000);
      },
      (error) => {
        setIsLocating(false);
        setLocationStatus('Unable to detect location. Please type manually.');
        setTimeout(() => setLocationStatus(''), 4000);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let text = `Hello K3 Multi Solution!\n`;
    text += `*Service Request:* ${serviceType}\n`;
    if (customerName) text += `*Name:* ${customerName}\n`;
    if (customerPhone) text += `*Phone:* ${customerPhone}\n`;
    text += `*Preferred Time:* ${preferredTime}\n`;
    text += `*Address / Location:* ${address}\n`;
    if (notes) text += `*Details/Issue:* ${notes}\n`;
    text += `\nPlease confirm technician availability!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/918608114055?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon">
              <MessageSquare size={20} color="#16A34A" />
            </div>
            <div>
              <h3 className="modal-title">Instant WhatsApp Booking</h3>
              <p className="modal-subtitle">Direct dispatch to K3 Technicians in Paramakudi</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {/* Service Selection */}
          <div className="form-group">
            <label className="form-label">
              <Wrench size={15} color="#2563EB" /> Service Required
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
                <User size={15} color="#2563EB" /> Your Name
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
                <Phone size={15} color="#2563EB" /> Phone Number
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

          <div className="form-group">
            <label className="form-label">
              <Clock size={15} color="#2563EB" /> Preferred Time
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

          <div className="form-group">
            <div className="label-with-action">
              <label className="form-label">
                <MapPin size={15} color="#2563EB" /> Location / Address in Paramakudi
              </label>
              <button
                type="button"
                onClick={handleGetLocation}
                className="btn-location"
                disabled={isLocating}
                title="Get current GPS location"
              >
                {isLocating ? <Loader2 size={13} className="spin-icon" /> : <Navigation size={13} />}
                <span>{isLocating ? 'Detecting...' : 'Use GPS Location'}</span>
              </button>
            </div>
            <input
              type="text"
              placeholder="e.g. Gandhi Nagar, Paramakudi"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              required
            />
            {locationStatus && <span className="location-status-text">{locationStatus}</span>}
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
              <CheckCircle size={14} color="#10B981" /> No login needed. Instant response from technician.
            </p>
          </div>
        </form>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.25s ease;
        }

        .modal-container {
          width: 100%;
          max-width: 540px;
          border-radius: 24px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
          overflow: hidden;
          background: #FFFFFF;
          color: #0F172A;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #F1F5F9;
          background: #F8FAFC;
        }

        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .modal-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #DCFCE7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-title {
          font-size: 1.15rem;
          line-height: 1.2;
          color: #0F172A;
          font-weight: 700;
        }

        .modal-subtitle {
          font-size: 0.8rem;
          color: #64748B;
        }

        .modal-close-btn {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #64748B;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: #E2E8F0;
          color: #0F172A;
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

        .label-with-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .btn-location {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          color: #2563EB;
          font-size: 0.775rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: all 0.2s ease;
        }

        .btn-location:hover:not(:disabled) {
          background: #2563EB;
          color: #FFFFFF;
          border-color: #2563EB;
        }

        .btn-location:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .location-status-text {
          font-size: 0.775rem;
          color: #2563EB;
          font-weight: 500;
          margin-top: 0.2rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1E293B;
        }

        .form-control {
          width: 100%;
          padding: 0.7rem 0.95rem;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 12px;
          color: #0F172A;
          font-family: var(--font-body);
          font-size: 0.925rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-control:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .form-control::placeholder {
          color: #94A3B8;
        }

        .form-control option {
          background: #FFFFFF;
          color: #0F172A;
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
          font-size: 0.8rem;
          color: #64748B;
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
