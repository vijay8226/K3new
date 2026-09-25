import React, { useState, useRef } from 'react';
import { X, Star, Upload, Camera, Image, User, MapPin, Wrench, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

const PRESET_AVATARS = [
  { id: 'av1', label: 'Avatar 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'av2', label: 'Avatar 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'av3', label: 'Avatar 3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
  { id: 'av4', label: 'Avatar 4', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
  { id: 'av5', label: 'Avatar 5', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
  { id: 'av6', label: 'Avatar 6', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
];

const SERVICE_OPTIONS = [
  'AC Servicing & Gas Refill',
  'AC Installation & Jet Wash',
  'CCTV Camera Setup & Security',
  'Inverter & UPS Battery Setup',
  'Electrical Home Wiring & DB Box',
  'Washing Machine Repair',
  'Double Door / Single Fridge Repair',
  'Submersible Water Pump & Tank',
  'Solar Inverter & Panel Cabling',
  'Other Home Appliance Service',
];

const LOCATION_OPTIONS = [
  'Paramakudi Town',
  'Maninagar, Paramakudi',
  'Gandhi Nagar, Paramakudi',
  'Ramanathapuram Bazar',
  'Salai St, Ramanathapuram',
  'Rameshwaram Temple St',
  'Madurai Ring Road',
  'Manamadurai NH Road',
  'Parthipanur Junction',
  'Ilayangudi Town',
  'Sivagangai Highway',
  'Other Local Area',
];

const RATING_LABELS = {
  1: 'Poor Service (1/5)',
  2: 'Fair Service (2/5)',
  3: 'Good Service (3/5)',
  4: 'Very Good Service (4/5)',
  5: 'Outstanding & Highly Recommended! (5/5)',
};

export default function AddReviewModal({ isOpen, onClose, onAddReview }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Paramakudi Town');
  const [customLocation, setCustomLocation] = useState('');
  const [service, setService] = useState('AC Servicing & Gas Refill');
  const [customService, setCustomService] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [workPhotoUrl, setWorkPhotoUrl] = useState('');
  const [photoMethod, setPhotoMethod] = useState('upload'); // 'upload', 'preset', 'url'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef(null);
  const workFileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = (e, target = 'avatar') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size should be under 5MB.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (target === 'avatar') {
        setPhotoUrl(event.target.result);
      } else {
        setWorkPhotoUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveWorkPhoto = () => {
    setWorkPhotoUrl('');
    if (workFileInputRef.current) workFileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!comment.trim()) {
      setErrorMsg('Please enter your review feedback.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const finalLocation = location === 'Other Local Area' && customLocation.trim()
      ? customLocation.trim()
      : location;

    const finalService = service === 'Other Home Appliance Service' && customService.trim()
      ? customService.trim()
      : service;

    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = `Verified Service • ${monthNames[today.getMonth()]} ${today.getFullYear()}`;

    const newReview = {
      id: 'rev_' + Date.now(),
      name: name.trim(),
      location: finalLocation,
      service: finalService,
      rating: Number(rating),
      comment: comment.trim(),
      photoUrl: photoUrl || null,
      workPhotoUrl: workPhotoUrl || null,
      date: formattedDate,
      isUserAdded: true,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      onAddReview(newReview);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        // Reset form
        setName('');
        setComment('');
        setPhotoUrl('');
        setWorkPhotoUrl('');
        setRating(5);
        setCustomLocation('');
        setCustomService('');
      }, 1400);
    }, 400);
  };

  return (
    <div className="review-modal-overlay" onClick={onClose}>
      <div className="review-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="review-modal-header">
          <div className="header-info">
            <div className="header-icon-badge">
              <Sparkles size={20} color="#2563EB" />
            </div>
            <div>
              <h3>Share Your Feedback</h3>
              <p>Help others in Ramanathapuram & Madurai region find quality service</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="review-success-view">
            <div className="success-icon-anim">
              <CheckCircle2 size={56} color="#10B981" />
            </div>
            <h3>Thank You for Your Review!</h3>
            <p>Your review with rating and photo has been published to K3 Multi Solution feedback.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="review-form">
            {errorMsg && (
              <div className="form-error-alert">
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Star Rating Selector */}
            <div className="form-group rating-form-group">
              <label className="group-label">
                Your Star Rating <span className="req-star">*</span>
              </label>
              <div className="star-selection-wrapper">
                <div className="stars-row" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((starNum) => {
                    const isFilled = (hoverRating || rating) >= starNum;
                    return (
                      <button
                        type="button"
                        key={starNum}
                        className={`star-btn ${isFilled ? 'active' : ''}`}
                        onClick={() => setRating(starNum)}
                        onMouseEnter={() => setHoverRating(starNum)}
                        aria-label={`Rate ${starNum} stars`}
                      >
                        <Star
                          size={32}
                          fill={isFilled ? '#F59E0B' : 'transparent'}
                          color={isFilled ? '#F59E0B' : '#CBD5E1'}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="rating-desc-badge">
                  {RATING_LABELS[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* Name & Location Row */}
            <div className="form-grid-2">
              <div className="form-group">
                <label className="group-label">
                  <User size={15} color="#2563EB" /> Your Name <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Murugan / Anitha K."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label className="group-label">
                  <MapPin size={15} color="#2563EB" /> Location / Area
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="modal-input modal-select"
                >
                  {LOCATION_OPTIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                {location === 'Other Local Area' && (
                  <input
                    type="text"
                    placeholder="Type your area/village name"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    className="modal-input custom-input-mt"
                  />
                )}
              </div>
            </div>

            {/* Service Availed */}
            <div className="form-group">
              <label className="group-label">
                <Wrench size={15} color="#2563EB" /> Service Taken
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="modal-input modal-select"
              >
                {SERVICE_OPTIONS.map((srv) => (
                  <option key={srv} value={srv}>{srv}</option>
                ))}
              </select>
              {service === 'Other Home Appliance Service' && (
                <input
                  type="text"
                  placeholder="e.g. Microwave Oven, Water Heater, TV Mounting"
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  className="modal-input custom-input-mt"
                />
              )}
            </div>

            {/* User Profile Photo Upload / Selection */}
            <div className="form-group photo-section-box">
              <div className="photo-header-row">
                <label className="group-label mb-0">
                  <Camera size={15} color="#2563EB" /> Customer Photo / Avatar (Optional)
                </label>
                <div className="photo-tab-pills">
                  <button
                    type="button"
                    className={`pill-btn ${photoMethod === 'upload' ? 'active' : ''}`}
                    onClick={() => setPhotoMethod('upload')}
                  >
                    Upload Photo
                  </button>
                  <button
                    type="button"
                    className={`pill-btn ${photoMethod === 'preset' ? 'active' : ''}`}
                    onClick={() => setPhotoMethod('preset')}
                  >
                    Choose Avatar
                  </button>
                  <button
                    type="button"
                    className={`pill-btn ${photoMethod === 'url' ? 'active' : ''}`}
                    onClick={() => setPhotoMethod('url')}
                  >
                    Image URL
                  </button>
                </div>
              </div>

              {/* Upload UI */}
              {photoMethod === 'upload' && (
                <div className="photo-upload-container">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'avatar')}
                    style={{ display: 'none' }}
                    id="customer-photo-upload"
                  />
                  {photoUrl ? (
                    <div className="photo-preview-card">
                      <img src={photoUrl} alt="Customer avatar preview" className="avatar-preview-img" />
                      <div className="preview-meta">
                        <span className="preview-label">Photo Uploaded Successfully</span>
                        <button type="button" onClick={handleRemovePhoto} className="remove-photo-btn">
                          Remove Photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label htmlFor="customer-photo-upload" className="dropzone-box">
                      <Upload size={24} color="#2563EB" />
                      <div>
                        <span className="dropzone-title">Click to upload your profile photo</span>
                        <span className="dropzone-sub">PNG, JPG, WebP up to 5MB</span>
                      </div>
                    </label>
                  )}
                </div>
              )}

              {/* Preset Avatars */}
              {photoMethod === 'preset' && (
                <div className="preset-avatars-grid">
                  {PRESET_AVATARS.map((av) => (
                    <button
                      type="button"
                      key={av.id}
                      className={`avatar-preset-btn ${photoUrl === av.url ? 'is-chosen' : ''}`}
                      onClick={() => setPhotoUrl(av.url)}
                    >
                      <img src={av.url} alt={av.label} />
                      {photoUrl === av.url && (
                        <span className="preset-check">
                          <CheckCircle2 size={14} color="#FFFFFF" />
                        </span>
                      )}
                    </button>
                  ))}
                  {photoUrl && (
                    <button type="button" onClick={handleRemovePhoto} className="clear-preset-link">
                      Clear avatar
                    </button>
                  )}
                </div>
              )}

              {/* URL Input */}
              {photoMethod === 'url' && (
                <div className="photo-url-box">
                  <input
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="modal-input"
                  />
                  {photoUrl && (
                    <div className="avatar-preview-inline">
                      <img src={photoUrl} alt="Avatar URL preview" />
                      <span>Preview Active</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Optional Service Work Photo */}
            <div className="form-group">
              <label className="group-label">
                <Image size={15} color="#2563EB" /> Work / Appliance Photo (Optional)
              </label>
              <input
                type="file"
                ref={workFileInputRef}
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'work')}
                style={{ display: 'none' }}
                id="work-photo-upload"
              />
              {workPhotoUrl ? (
                <div className="photo-preview-card">
                  <img src={workPhotoUrl} alt="Work preview" className="work-preview-img" />
                  <div className="preview-meta">
                    <span className="preview-label">Work Photo Attached</span>
                    <button type="button" onClick={handleRemoveWorkPhoto} className="remove-photo-btn">
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label htmlFor="work-photo-upload" className="dropzone-box compact-dropzone">
                  <Upload size={18} color="#2563EB" />
                  <span className="dropzone-title">Upload photo of AC / Inverter / CCTV installation</span>
                </label>
              )}
            </div>

            {/* Review Comment */}
            <div className="form-group">
              <div className="label-with-count">
                <label className="group-label">
                  Your Review / Experience <span className="req-star">*</span>
                </label>
                <span className="char-count">{comment.length}/500</span>
              </div>
              <textarea
                required
                rows={4}
                maxLength={500}
                placeholder="How was the service quality, speed, pricing, and technician behavior? Would you recommend K3 Multi Solution to your neighbours?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="modal-textarea"
              />
            </div>

            {/* Actions */}
            <div className="modal-actions-row">
              <button
                type="button"
                onClick={onClose}
                className="btn-cancel"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary submit-review-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Submitting Review...</>
                ) : (
                  <>
                    <Star size={18} fill="#FFFFFF" /> Submit Customer Review
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .review-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          animation: overlayFadeIn 0.25s ease-out;
          overflow-y: auto;
        }

        .review-modal-container {
          background: #FFFFFF;
          border: 1px solid rgba(226, 232, 240, 0.95);
          border-radius: 24px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(0,0,0,0.03);
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .review-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.75rem;
          border-bottom: 1px solid #F1F5F9;
          position: sticky;
          top: 0;
          background: #FFFFFF;
          z-index: 10;
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .header-icon-badge {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #EFF6FF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .header-info h3 {
          font-size: 1.2rem;
          color: #0F172A;
          margin: 0;
        }

        .header-info p {
          font-size: 0.825rem;
          color: #64748B;
          margin: 0;
        }

        .close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: #EF4444;
          color: #FFFFFF;
          border-color: #EF4444;
        }

        .review-form {
          padding: 1.5rem 1.75rem 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-error-alert {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #FEF2F2;
          color: #B91C1C;
          border: 1px solid #FECACA;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .group-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1E293B;
        }

        .mb-0 {
          margin-bottom: 0;
        }

        .req-star {
          color: #EF4444;
        }

        .rating-form-group {
          background: #F8FAFC;
          padding: 1.15rem;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          align-items: center;
          text-align: center;
        }

        .star-selection-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }

        .stars-row {
          display: flex;
          gap: 0.5rem;
        }

        .star-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.2rem;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .star-btn:hover {
          transform: scale(1.2);
        }

        .star-btn.active {
          transform: scale(1.05);
        }

        .rating-desc-badge {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #D97706;
          background: #FEF3C7;
          padding: 0.2rem 0.85rem;
          border-radius: 9999px;
          border: 1px solid #FDE68A;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .modal-input, .modal-select, .modal-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          font-family: inherit;
          font-size: 0.925rem;
          color: #0F172A;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 12px;
          outline: none;
          transition: all 0.2s ease;
        }

        .modal-input:focus, .modal-select:focus, .modal-textarea:focus {
          background: #FFFFFF;
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .custom-input-mt {
          margin-top: 0.5rem;
        }

        .modal-textarea {
          resize: vertical;
          min-height: 90px;
          line-height: 1.5;
        }

        .label-with-count {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .char-count {
          font-size: 0.775rem;
          color: #94A3B8;
        }

        /* Photo Upload UI */
        .photo-section-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 1rem;
        }

        .photo-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .photo-tab-pills {
          display: flex;
          gap: 0.35rem;
          background: #E2E8F0;
          padding: 0.2rem;
          border-radius: 9999px;
        }

        .pill-btn {
          background: transparent;
          border: none;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748B;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pill-btn.active {
          background: #FFFFFF;
          color: #2563EB;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        }

        .dropzone-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1rem;
          background: #FFFFFF;
          border: 2px dashed #CBD5E1;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dropzone-box:hover {
          border-color: #2563EB;
          background: #EFF6FF;
        }

        .compact-dropzone {
          padding: 0.65rem 1rem;
        }

        .dropzone-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #1E293B;
          display: block;
        }

        .dropzone-sub {
          font-size: 0.75rem;
          color: #94A3B8;
        }

        .photo-preview-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #FFFFFF;
          padding: 0.65rem 1rem;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
        }

        .avatar-preview-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #2563EB;
        }

        .work-preview-img {
          width: 60px;
          height: 48px;
          border-radius: 8px;
          object-fit: cover;
          border: 1.5px solid #2563EB;
        }

        .preview-meta {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .preview-label {
          font-size: 0.825rem;
          font-weight: 600;
          color: #10B981;
        }

        .remove-photo-btn {
          background: none;
          border: none;
          color: #EF4444;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          padding: 0;
        }

        .remove-photo-btn:hover {
          text-decoration: underline;
        }

        .preset-avatars-grid {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .avatar-preset-btn {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: none;
          cursor: pointer;
          padding: 0;
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .avatar-preset-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-preset-btn:hover {
          transform: scale(1.1);
        }

        .avatar-preset-btn.is-chosen {
          border-color: #2563EB;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.4);
        }

        .preset-check {
          position: absolute;
          inset: 0;
          background: rgba(37, 99, 235, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .clear-preset-link {
          background: none;
          border: none;
          color: #64748B;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          margin-left: 0.5rem;
        }

        .avatar-preview-inline {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.5rem;
        }

        .avatar-preview-inline img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid #2563EB;
        }

        .avatar-preview-inline span {
          font-size: 0.8rem;
          color: #10B981;
          font-weight: 600;
        }

        /* Actions */
        .modal-actions-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.85rem;
          padding-top: 0.5rem;
          border-top: 1px solid #F1F5F9;
        }

        .btn-cancel {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #475569;
          padding: 0.75rem 1.4rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-cancel:hover {
          background: #E2E8F0;
          color: #1E293B;
        }

        .submit-review-btn {
          min-width: 220px;
        }

        /* Success View */
        .review-success-view {
          padding: 3.5rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .success-icon-anim {
          animation: bounceSuccess 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes bounceSuccess {
          0% { transform: scale(0.3); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }

        .review-success-view h3 {
          font-size: 1.4rem;
          color: #0F172A;
        }

        .review-success-view p {
          color: #64748B;
          font-size: 0.95rem;
          max-width: 380px;
        }

        @media (max-width: 640px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
          .modal-actions-row {
            flex-direction: column;
          }
          .btn-cancel, .submit-review-btn {
            width: 100%;
          }
          .photo-header-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
