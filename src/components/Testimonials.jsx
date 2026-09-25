import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  MapPin, 
  Plus, 
  Sparkles, 
  Camera, 
  Image as ImageIcon, 
  Trash2, 
  SlidersHorizontal,
  LayoutGrid,
  Layers,
  ThumbsUp,
  X
} from 'lucide-react';
import AddReviewModal from './AddReviewModal';

const INITIAL_DEFAULT_REVIEWS = [
  {
    id: 'def_1',
    name: 'K. Muthusamy',
    location: 'Paramakudi Town',
    service: 'AC Servicing & Gas Refill',
    rating: 5,
    comment: 'Extremely quick service! Called them for split AC cooling issue. Technicians arrived within 45 minutes, diagnosed gas leak, and fixed it clean. Reasonable cost.',
    date: 'Verified Service • July 2026',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'def_2',
    name: 'S. Vijayalakshmi',
    location: 'Maninagar, Paramakudi',
    service: 'CCTV Camera Setup',
    rating: 5,
    comment: 'Got 4 HD CCTV cameras installed for my textile shop in Maninagar. Clear video quality and mobile app live viewing set up smoothly on my phone. Very trustworthy team.',
    date: 'Verified Service • June 2026',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'def_3',
    name: 'V. Ramanathan',
    location: 'Ramanathapuram Bazar',
    service: 'Inverter & UPS Battery Setup',
    rating: 5,
    comment: 'Prompt delivery of 150Ah tubular battery to Ramanathapuram town. The technician explained backup calculation and warranty clearly. Top notch work!',
    date: 'Verified Service • August 2026',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'def_4',
    name: 'T. Jegadeesh',
    location: 'Rameshwaram Temple St',
    service: 'AC Repair & Jet Service',
    rating: 4,
    comment: 'Serviced 3 air conditioners at our Rameshwaram guest lodge. Good deep foam cleaning and filter replacement. Technicians did a very thorough job.',
    date: 'Verified Service • July 2026',
    photoUrl: null,
  },
  {
    id: 'def_5',
    name: 'M. Selvakumar',
    location: 'Madurai Ring Road',
    service: 'Commercial Solar Inverter Wiring',
    rating: 5,
    comment: 'Handled heavy duty electrical paneling and solar setup for our warehouse near Madurai Ring Road. Very knowledgeable engineers and neat cabling.',
    date: 'Verified Service • May 2026',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'def_6',
    name: 'A. Pitchai',
    location: 'Manamadurai NH Road',
    service: 'Washing Machine Repair',
    rating: 4,
    comment: 'Front load washing machine drum noise fixed quickly in Manamadurai. Replaced bearing kit with original spare parts. Fair pricing and friendly behavior.',
    date: 'Verified Service • June 2026',
    photoUrl: null,
  },
  {
    id: 'def_7',
    name: 'S. Meenakshi',
    location: 'Parthipanur Junction',
    service: 'Complete Home Wiring',
    rating: 5,
    comment: 'Full electrical wiring done for our new house in Parthipanur. Neat concealed conduit work, safety MCB installation, and perfect switch placement.',
    date: 'Verified Service • July 2026',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'def_8',
    name: 'R. Senthamil',
    location: 'Gandhi Nagar, Paramakudi',
    service: 'Electrical Home Wiring',
    rating: 5,
    comment: 'Professional electrician service. Replaced main DB box and installed new ceiling fans cleanly. Prompt response on WhatsApp.',
    date: 'Verified Service • July 2026',
    photoUrl: null,
  },
  {
    id: 'def_9',
    name: 'P. Murugan',
    location: 'Salai St, Ramanathapuram',
    service: 'Double Door Fridge Repair',
    rating: 4,
    comment: 'Cooling issue resolved on the spot in Ramanathapuram. Replaced thermostat sensor and checked gas pressures. Good after-service support.',
    date: 'Verified Service • May 2026',
    photoUrl: null,
  },
  {
    id: 'def_10',
    name: 'K. Soundarapandian',
    location: 'Ilayangudi Town',
    service: 'Overhead Tank Pump Fit',
    rating: 5,
    comment: 'Submersible water pump installation done smoothly in Ilayangudi. No pipe leakage and smooth automatic starter panel wiring.',
    date: 'Verified Service • August 2026',
    photoUrl: null,
  },
  {
    id: 'def_11',
    name: 'M. Anand',
    location: 'Paramakudi Branch Area',
    service: 'UPS Battery Installation',
    rating: 5,
    comment: 'Bought a new tubular UPS battery for my home inverter. Excellent guidance, free delivery, and immediate setup. Highly recommended in Paramakudi!',
    date: 'Verified Service • May 2026',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'def_12',
    name: 'B. Thenmozhi',
    location: 'Sivagangai Highway',
    service: 'IP Camera & NVR Setup',
    rating: 4,
    comment: 'Security camera fitting for farmhouse near Sivagangai. Motion detection alert setup on mobile is working very reliably.',
    date: 'Verified Service • June 2026',
    photoUrl: null,
  },
];

const FILTER_LOCATIONS = [
  'All',
  'Paramakudi',
  'Maninagar',
  'Ramanathapuram',
  'Rameshwaram',
  'Madurai',
  'Manamadurai',
  'Parthipanur',
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('k3_customer_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...parsed, ...INITIAL_DEFAULT_REVIEWS];
        }
      }
    } catch (err) {
      console.error('Failed to parse saved reviews:', err);
    }
    return INITIAL_DEFAULT_REVIEWS;
  });

  const [activeLocation, setActiveLocation] = useState('All');
  const [minRating, setMinRating] = useState(0); // 0 = all, 5 = 5 stars only, 4 = 4+ stars
  const [viewMode, setViewMode] = useState('slider'); // 'slider' or 'grid'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewWorkPhoto, setPreviewWorkPhoto] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Filter reviews
  const filteredReviews = reviews.filter((rev) => {
    const matchesLoc =
      activeLocation === 'All' ||
      rev.location.toLowerCase().includes(activeLocation.toLowerCase());
    const matchesRating = minRating === 0 || rev.rating >= minRating;
    return matchesLoc && matchesRating;
  });

  // Calculate stats
  const totalReviewsCount = reviews.length;
  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (totalReviewsCount || 1)
  ).toFixed(1);

  const handleFilterSelect = (loc) => {
    setActiveLocation(loc);
    setCurrentIndex(0);
  };

  // Auto-play interval
  useEffect(() => {
    if (isPaused || viewMode !== 'slider' || filteredReviews.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, viewMode, filteredReviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredReviews.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Support for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  // Add new customer review
  const handleAddNewReview = (newReview) => {
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Save user-created reviews to localStorage
    try {
      const existingUserReviews = JSON.parse(
        localStorage.getItem('k3_customer_reviews') || '[]'
      );
      const updatedUserList = [newReview, ...existingUserReviews];
      localStorage.setItem('k3_customer_reviews', JSON.stringify(updatedUserList));
    } catch (e) {
      console.error('Failed to save review to storage', e);
    }

    setActiveLocation('All');
    setMinRating(0);
    setCurrentIndex(0);
    setToastMessage('🎉 Thank you! Your review is now live on our website.');
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Delete user review
  const handleDeleteUserReview = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this review?')) {
      const updated = reviews.filter((r) => r.id !== id);
      setReviews(updated);
      try {
        const existingUserReviews = JSON.parse(
          localStorage.getItem('k3_customer_reviews') || '[]'
        );
        const filtered = existingUserReviews.filter((r) => r.id !== id);
        localStorage.setItem('k3_customer_reviews', JSON.stringify(filtered));
      } catch (err) {
        console.error(err);
      }
      setCurrentIndex(0);
    }
  };

  return (
    <section id="testimonials" className="section section-muted testimonials-section">
      <div className="section-container">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="review-toast-notification">
            <Sparkles size={18} />
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage('')} className="toast-close-btn">
              <X size={15} />
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="testimonials-header-block">
          <div className="heading-left">
            <span className="eyebrow">
              <Sparkles size={14} color="#2563EB" /> Customer Feedback & Reviews
            </span>
            <h2>Trusted across Ramanathapuram, Paramakudi & Madurai</h2>
            <p>Real experiences from local households, retail shops, and commercial offices.</p>
          </div>

          <div className="heading-right">
            <div className="rating-summary-card">
              <div className="rating-num-box">
                <span className="rating-big-val">{averageRating}</span>
                <div className="rating-stars-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>
              <div className="rating-meta-text">
                <strong>{totalReviewsCount}+ Verified Reviews</strong>
                <span>100% Genuine Local Service</span>
              </div>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-primary add-review-btn"
              id="btn-write-review"
            >
              <Plus size={18} /> Write a Review
            </button>
          </div>
        </div>

        {/* Filters and Controls Bar */}
        <div className="testimonials-control-panel">
          {/* Location Filters */}
          <div className="location-filter-bar">
            <span className="filter-label">
              <MapPin size={15} color="#2563EB" /> Region:
            </span>
            <div className="location-chips">
              {FILTER_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleFilterSelect(loc)}
                  className={`location-chip ${activeLocation === loc ? 'is-active' : ''}`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Rating filter & View switcher */}
          <div className="view-and-rating-controls">
            <div className="rating-filter-pills">
              <button
                className={`rating-pill ${minRating === 0 ? 'is-active' : ''}`}
                onClick={() => { setMinRating(0); setCurrentIndex(0); }}
              >
                All Stars
              </button>
              <button
                className={`rating-pill ${minRating === 5 ? 'is-active' : ''}`}
                onClick={() => { setMinRating(5); setCurrentIndex(0); }}
              >
                ★ 5 Stars Only
              </button>
              <button
                className={`rating-pill ${minRating === 4 ? 'is-active' : ''}`}
                onClick={() => { setMinRating(4); setCurrentIndex(0); }}
              >
                ★ 4+ Stars
              </button>
            </div>

            <div className="view-mode-toggle">
              <button
                className={`mode-btn ${viewMode === 'slider' ? 'is-active' : ''}`}
                onClick={() => setViewMode('slider')}
                title="Slider View"
                aria-label="Slider View"
              >
                <Layers size={16} /> Slider
              </button>
              <button
                className={`mode-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid size={16} /> Grid ({filteredReviews.length})
              </button>
            </div>
          </div>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="no-reviews-box">
            <p>No reviews match your selected filter.</p>
            <button
              onClick={() => { setActiveLocation('All'); setMinRating(0); }}
              className="reset-filter-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'slider' ? (
          /* ================= SLIDER VIEW ================= */
          <div
            className="slider-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Arrow Left */}
            {filteredReviews.length > 1 && (
              <button
                onClick={handlePrev}
                className="slider-nav-btn prev-btn"
                aria-label="Previous customer review"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Cards Track */}
            <div className="slider-track-container">
              <div
                className="slider-track"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {filteredReviews.map((rev) => (
                  <div key={rev.id} className="slide-card-item">
                    <div className={`review-card ${rev.isUserAdded ? 'user-submitted-card' : ''}`}>
                      <div className="card-top-row">
                        <div className="quote-badge-box">
                          <div className="quote-box">
                            <Quote size={22} color="#2563EB" />
                          </div>
                          {rev.isUserAdded && (
                            <span className="just-added-pill">
                              <Sparkles size={12} /> Recent Review
                            </span>
                          )}
                        </div>

                        <div className="rating-stars" title={`${rev.rating} out of 5 stars`}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={19}
                              fill={i < rev.rating ? '#F59E0B' : '#E2E8F0'}
                              color={i < rev.rating ? '#F59E0B' : '#CBD5E1'}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="review-text">"{rev.comment}"</p>

                      {/* Work Photo Attachment */}
                      {rev.workPhotoUrl && (
                        <div
                          className="review-work-photo-thumb"
                          onClick={() => setPreviewWorkPhoto(rev.workPhotoUrl)}
                          title="Click to view full photo"
                        >
                          <img src={rev.workPhotoUrl} alt="Service work photo" />
                          <span className="photo-badge">
                            <Camera size={13} /> Work Photo Attached
                          </span>
                        </div>
                      )}

                      <div className="card-bottom-row">
                        {/* User Photo / Avatar */}
                        {rev.photoUrl ? (
                          <img
                            src={rev.photoUrl}
                            alt={rev.name}
                            className="user-avatar-img"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="user-avatar-fallback"
                          style={{ display: rev.photoUrl ? 'none' : 'flex' }}
                        >
                          {rev.name.charAt(0)}
                        </div>

                        <div className="user-info">
                          <div className="user-name-line">
                            <h4>{rev.name}</h4>
                            <span className="verified-badge">
                              <CheckCircle2 size={13} color="#10B981" /> Verified
                            </span>
                          </div>
                          <span className="user-meta">{rev.service} • {rev.location}</span>
                          <span className="review-date">{rev.date}</span>
                        </div>

                        {rev.isUserAdded && (
                          <button
                            onClick={(e) => handleDeleteUserReview(rev.id, e)}
                            className="delete-review-btn"
                            title="Delete your review"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrow Right */}
            {filteredReviews.length > 1 && (
              <button
                onClick={handleNext}
                className="slider-nav-btn next-btn"
                aria-label="Next customer review"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>
        ) : (
          /* ================= GRID VIEW ================= */
          <div className="reviews-grid-container">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className={`review-grid-card ${rev.isUserAdded ? 'user-submitted-card' : ''}`}
              >
                <div className="card-top-row">
                  <div className="quote-badge-box">
                    <div className="quote-box sm">
                      <Quote size={18} color="#2563EB" />
                    </div>
                    {rev.isUserAdded && (
                      <span className="just-added-pill">
                        <Sparkles size={11} /> New
                      </span>
                    )}
                  </div>
                  <div className="rating-stars" title={`${rev.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < rev.rating ? '#F59E0B' : '#E2E8F0'}
                        color={i < rev.rating ? '#F59E0B' : '#CBD5E1'}
                      />
                    ))}
                  </div>
                </div>

                <p className="review-text">"{rev.comment}"</p>

                {rev.workPhotoUrl && (
                  <div
                    className="review-work-photo-thumb"
                    onClick={() => setPreviewWorkPhoto(rev.workPhotoUrl)}
                    title="Click to view work photo"
                  >
                    <img src={rev.workPhotoUrl} alt="Service photo" />
                    <span className="photo-badge">
                      <Camera size={12} /> Work Photo Attached
                    </span>
                  </div>
                )}

                <div className="card-bottom-row">
                  {rev.photoUrl ? (
                    <img
                      src={rev.photoUrl}
                      alt={rev.name}
                      className="user-avatar-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="user-avatar-fallback"
                    style={{ display: rev.photoUrl ? 'none' : 'flex' }}
                  >
                    {rev.name.charAt(0)}
                  </div>

                  <div className="user-info">
                    <div className="user-name-line">
                      <h4>{rev.name}</h4>
                      <span className="verified-badge">
                        <CheckCircle2 size={12} color="#10B981" /> Verified
                      </span>
                    </div>
                    <span className="user-meta">{rev.service} • {rev.location}</span>
                    <span className="review-date">{rev.date}</span>
                  </div>

                  {rev.isUserAdded && (
                    <button
                      onClick={(e) => handleDeleteUserReview(rev.id, e)}
                      className="delete-review-btn"
                      title="Delete your review"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Dots (Only in slider mode) */}
        {viewMode === 'slider' && filteredReviews.length > 1 && (
          <div className="slider-pagination">
            {filteredReviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`pagination-dot ${idx === currentIndex ? 'is-active' : ''}`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA for adding review */}
        <div className="testimonials-bottom-cta">
          <div className="bottom-cta-inner">
            <div className="bottom-cta-text">
              <h3>Have you used K3 Multi Solution recently?</h3>
              <p>Share your photo, star rating, and feedback to help neighbors get the best service.</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-primary cta-btn-glow"
            >
              <Camera size={18} /> Add Your Review & Photo
            </button>
          </div>
        </div>
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddReview={handleAddNewReview}
      />

      {/* Photo Lightbox Popup */}
      {previewWorkPhoto && (
        <div className="lightbox-overlay" onClick={() => setPreviewWorkPhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={previewWorkPhoto} alt="Work Full Preview" className="lightbox-img" />
            <button className="lightbox-close" onClick={() => setPreviewWorkPhoto(null)}>
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .testimonials-section {
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Review Toast */
        .review-toast-notification {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #ECFDF5;
          color: #065F46;
          border: 1px solid #A7F3D0;
          padding: 0.85rem 1.25rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.2);
          animation: slideDownToast 0.3s ease-out;
        }

        @keyframes slideDownToast {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .toast-close-btn {
          background: none;
          border: none;
          color: #065F46;
          cursor: pointer;
          margin-left: auto;
          display: flex;
          align-items: center;
          padding: 0.2rem;
        }

        /* Header Block */
        .testimonials-header-block {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .heading-left {
          flex: 1;
          min-width: 300px;
        }

        .heading-left h2 {
          font-size: 2.15rem;
          line-height: 1.25;
          color: #0F172A;
          margin: 0.5rem 0 0.5rem 0;
        }

        .heading-left p {
          color: #64748B;
          font-size: 1rem;
          margin: 0;
        }

        .heading-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .rating-summary-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          padding: 0.65rem 1.15rem;
          border-radius: 16px;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.06);
        }

        .rating-num-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .rating-big-val {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1;
        }

        .rating-stars-gold {
          display: flex;
          gap: 0.1rem;
          margin-top: 0.2rem;
        }

        .rating-meta-text {
          display: flex;
          flex-direction: column;
          font-size: 0.775rem;
          color: #64748B;
        }

        .rating-meta-text strong {
          color: #0F172A;
          font-size: 0.85rem;
        }

        .add-review-btn {
          white-space: nowrap;
          padding: 0.85rem 1.6rem;
          box-shadow: 0 8px 20px -4px rgba(37, 99, 235, 0.4);
        }

        /* Controls Panel */
        .testimonials-control-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 18px;
          padding: 0.85rem 1.25rem;
          margin-bottom: 2rem;
        }

        .location-filter-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
        }

        .location-chips {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .location-chip {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          color: #475569;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .location-chip:hover {
          border-color: #2563EB;
          color: #2563EB;
        }

        .location-chip.is-active {
          background: #EFF6FF;
          border-color: #2563EB;
          color: #2563EB;
        }

        .view-and-rating-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .rating-filter-pills {
          display: flex;
          gap: 0.35rem;
          background: #F1F5F9;
          padding: 0.25rem;
          border-radius: 9999px;
        }

        .rating-pill {
          background: transparent;
          border: none;
          font-size: 0.775rem;
          font-weight: 600;
          color: #64748B;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .rating-pill.is-active {
          background: #FFFFFF;
          color: #D97706;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }

        .view-mode-toggle {
          display: flex;
          gap: 0.25rem;
          background: #F1F5F9;
          padding: 0.25rem;
          border-radius: 9999px;
        }

        .mode-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: transparent;
          border: none;
          font-size: 0.775rem;
          font-weight: 600;
          color: #64748B;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mode-btn.is-active {
          background: #2563EB;
          color: #FFFFFF;
          box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
        }

        /* No reviews */
        .no-reviews-box {
          text-align: center;
          padding: 3rem 1rem;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 20px;
          border: 1px dashed #CBD5E1;
        }

        .no-reviews-box p {
          color: #64748B;
          margin-bottom: 1rem;
        }

        .reset-filter-btn {
          background: #2563EB;
          color: #FFFFFF;
          border: none;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Slider Wrapper */
        .slider-wrapper {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          padding: 0 3.5rem;
        }

        .slider-track-container {
          overflow: hidden;
          border-radius: 24px;
        }

        .slider-track {
          display: flex;
          transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
          width: 100%;
        }

        .slide-card-item {
          min-width: 100%;
          box-sizing: border-box;
          padding: 0.5rem;
        }

        .review-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 24px;
          padding: 2.25rem 2.25rem;
          box-shadow: 0 16px 36px -10px rgba(37, 99, 235, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: transform 0.2s ease;
        }

        .user-submitted-card {
          border-color: rgba(37, 99, 235, 0.35);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 247, 255, 0.85) 100%);
          box-shadow: 0 16px 36px -10px rgba(37, 99, 235, 0.15), 0 0 0 1.5px rgba(37, 99, 235, 0.2);
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .quote-badge-box {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .quote-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #EFF6FF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quote-box.sm {
          width: 36px;
          height: 36px;
        }

        .just-added-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: #EFF6FF;
          color: #2563EB;
          border: 1px solid #BFDBFE;
          font-size: 0.725rem;
          font-weight: 700;
          padding: 0.2rem 0.65rem;
          border-radius: 9999px;
        }

        .rating-stars {
          display: flex;
          gap: 0.2rem;
        }

        .review-text {
          font-size: 1.075rem;
          color: #1E293B;
          line-height: 1.65;
          font-style: italic;
        }

        /* Work photo thumbnail */
        .review-work-photo-thumb {
          position: relative;
          width: 140px;
          height: 90px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid #2563EB;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          transition: transform 0.2s ease;
        }

        .review-work-photo-thumb:hover {
          transform: scale(1.04);
        }

        .review-work-photo-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photo-badge {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(15, 23, 42, 0.75);
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          padding: 0.2rem;
          backdrop-filter: blur(4px);
        }

        .card-bottom-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #F1F5F9;
        }

        .user-avatar-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #2563EB;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
          flex-shrink: 0;
        }

        .user-avatar-fallback {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
          flex-shrink: 0;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .user-name-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .user-name-line h4 {
          font-size: 1.05rem;
          color: #0F172A;
          margin: 0;
        }

        .verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.725rem;
          font-weight: 600;
          color: #10B981;
          background: #ECFDF5;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          border: 1px solid #A7F3D0;
        }

        .user-meta {
          font-size: 0.85rem;
          color: #2563EB;
          font-weight: 600;
        }

        .review-date {
          font-size: 0.775rem;
          color: #94A3B8;
        }

        .delete-review-btn {
          background: #FEE2E2;
          border: 1px solid #FECACA;
          color: #DC2626;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .delete-review-btn:hover {
          background: #DC2626;
          color: #FFFFFF;
        }

        .slider-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          color: #1E293B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.25s ease;
          z-index: 10;
        }

        .slider-nav-btn:hover {
          background: #2563EB;
          color: #FFFFFF;
          border-color: #2563EB;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
        }

        .prev-btn {
          left: 0;
        }

        .next-btn {
          right: 0;
        }

        .slider-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .pagination-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #CBD5E1;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pagination-dot.is-active {
          width: 28px;
          border-radius: 10px;
          background: #2563EB;
        }

        /* Grid View */
        .reviews-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }

        .review-grid-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 20px;
          padding: 1.75rem;
          box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.05);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: space-between;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .review-grid-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -8px rgba(37, 99, 235, 0.12);
        }

        .review-grid-card .review-text {
          font-size: 0.95rem;
        }

        /* Bottom CTA */
        .testimonials-bottom-cta {
          margin-top: 3.5rem;
          background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
          border-radius: 24px;
          padding: 2.25rem 2.5rem;
          color: #FFFFFF;
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .bottom-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .bottom-cta-text h3 {
          font-size: 1.4rem;
          color: #FFFFFF;
          margin-bottom: 0.35rem;
        }

        .bottom-cta-text p {
          color: #94A3B8;
          font-size: 0.95rem;
          margin: 0;
        }

        .cta-btn-glow {
          box-shadow: 0 0 25px rgba(37, 99, 235, 0.6);
          padding: 0.85rem 1.8rem;
          white-space: nowrap;
        }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: overlayFadeIn 0.2s ease;
        }

        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 85vh;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .lightbox-close {
          position: absolute;
          top: -16px;
          right: -16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FFFFFF;
          border: none;
          color: #0F172A;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        @media (max-width: 768px) {
          .testimonials-header-block {
            flex-direction: column;
            align-items: flex-start;
          }
          .heading-right {
            width: 100%;
            justify-content: space-between;
          }
          .slider-wrapper {
            padding: 0;
          }
          .slider-nav-btn {
            display: none;
          }
          .review-card {
            padding: 1.5rem;
          }
          .reviews-grid-container {
            grid-template-columns: 1fr;
          }
          .bottom-cta-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .cta-btn-glow {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
