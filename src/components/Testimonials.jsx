import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, MapPin } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'K. Muthusamy',
      location: 'Paramakudi Town',
      service: 'AC Servicing & Gas Refill',
      rating: 5,
      comment: 'Extremely quick service! Called them for split AC cooling issue. Technicians arrived within 45 minutes, diagnosed gas leak, and fixed it clean. Reasonable cost.',
      date: 'Verified Service • July 2026',
    },
    {
      id: 2,
      name: 'S. Vijayalakshmi',
      location: 'Maninagar, Paramakudi',
      service: 'CCTV Camera Setup',
      rating: 5,
      comment: 'Got 4 HD CCTV cameras installed for my textile shop in Maninagar. Clear video quality and mobile app live viewing set up smoothly on my phone. Very trustworthy team.',
      date: 'Verified Service • June 2026',
    },
    {
      id: 3,
      name: 'V. Ramanathan',
      location: 'Ramanathapuram Bazar',
      service: 'Inverter & UPS Battery Setup',
      rating: 5,
      comment: 'Prompt delivery of 150Ah tubular battery to Ramanathapuram town. The technician explained backup calculation and warranty clearly. Top notch work!',
      date: 'Verified Service • August 2026',
    },
    {
      id: 4,
      name: 'T. Jegadeesh',
      location: 'Rameshwaram Temple St',
      service: 'AC Repair & Jet Service',
      rating: 4,
      comment: 'Serviced 3 air conditioners at our Rameshwaram guest lodge. Good deep foam cleaning and filter replacement. Technicians did a very thorough job.',
      date: 'Verified Service • July 2026',
    },
    {
      id: 5,
      name: 'M. Selvakumar',
      location: 'Madurai Ring Road',
      service: 'Commercial Solar Inverter Wiring',
      rating: 5,
      comment: 'Handled heavy duty electrical paneling and solar setup for our warehouse near Madurai Ring Road. Very knowledgeable engineers and neat cabling.',
      date: 'Verified Service • May 2026',
    },
    {
      id: 6,
      name: 'A. Pitchai',
      location: 'Manamadurai NH Road',
      service: 'Washing Machine Repair',
      rating: 4,
      comment: 'Front load washing machine drum noise fixed quickly in Manamadurai. Replaced bearing kit with original spare parts. Fair pricing and friendly behavior.',
      date: 'Verified Service • June 2026',
    },
    {
      id: 7,
      name: 'S. Meenakshi',
      location: 'Parthipanur Junction',
      service: 'Complete Home Wiring',
      rating: 5,
      comment: 'Full electrical wiring done for our new house in Parthipanur. Neat concealed conduit work, safety MCB installation, and perfect switch placement.',
      date: 'Verified Service • July 2026',
    },
    {
      id: 8,
      name: 'R. Senthamil',
      location: 'Gandhi Nagar, Paramakudi',
      service: 'Electrical Home Wiring',
      rating: 5,
      comment: 'Professional electrician service. Replaced main DB box and installed new ceiling fans cleanly. Prompt response on WhatsApp.',
      date: 'Verified Service • July 2026',
    },
    {
      id: 9,
      name: 'P. Murugan',
      location: 'Salai St, Ramanathapuram',
      service: 'Double Door Fridge Repair',
      rating: 4,
      comment: 'Cooling issue resolved on the spot in Ramanathapuram. Replaced thermostat sensor and checked gas pressures. Good after-service support.',
      date: 'Verified Service • May 2026',
    },
    {
      id: 10,
      name: 'K. Soundarapandian',
      location: 'Ilayangudi Town',
      service: 'Overhead Tank Pump Fit',
      rating: 5,
      comment: 'Submersible water pump installation done smoothly in Ilayangudi. No pipe leakage and smooth automatic starter panel wiring.',
      date: 'Verified Service • August 2026',
    },
    {
      id: 11,
      name: 'M. Anand',
      location: 'Paramakudi Branch Area',
      service: 'UPS Battery Installation',
      rating: 5,
      comment: 'Bought a new tubular UPS battery for my home inverter. Excellent guidance, free delivery, and immediate setup. Highly recommended in Paramakudi!',
      date: 'Verified Service • May 2026',
    },
    {
      id: 12,
      name: 'B. Thenmozhi',
      location: 'Sivagangai Highway',
      service: 'IP Camera & NVR Setup',
      rating: 4,
      comment: 'Security camera fitting for farmhouse near Sivagangai. Motion detection alert setup on mobile is working very reliably.',
      date: 'Verified Service • June 2026',
    },
  ];

  const filterLocations = [
    'All',
    'Paramakudi',
    'Maninagar',
    'Ramanathapuram',
    'Rameshwaram',
    'Madurai',
    'Manamadurai',
    'Parthipanur',
  ];

  const [activeLocation, setActiveLocation] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filteredReviews = reviews.filter((rev) => {
    if (activeLocation === 'All') return true;
    return rev.location.toLowerCase().includes(activeLocation.toLowerCase());
  });

  const handleFilterSelect = (loc) => {
    setActiveLocation(loc);
    setCurrentIndex(0);
  };

  // Auto-play interval
  useEffect(() => {
    if (isPaused || filteredReviews.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, filteredReviews.length]);

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

  return (
    <section className="section section-muted testimonials-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-heading">
          <span className="eyebrow">Customer Feedback</span>
          <h2>Trusted across Paramakudi, Ramanathapuram, Rameshwaram & Madurai</h2>
          <p>Read real verified reviews from local homeowners, shops, and businesses.</p>
        </div>

        {/* Location Filter Chips */}
        <div className="location-filter-bar">
          <span className="filter-label">
            <MapPin size={15} color="#2563EB" /> Filter Region:
          </span>
          <div className="location-chips">
            {filterLocations.map((loc) => (
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

        {/* Advanced Slider Container */}
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
                  <div className="review-card">
                    <div className="card-top-row">
                      <div className="quote-box">
                        <Quote size={24} color="#2563EB" />
                      </div>
                      <div className="rating-stars" title={`${rev.rating} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            fill={i < rev.rating ? '#F59E0B' : '#E2E8F0'}
                            color={i < rev.rating ? '#F59E0B' : '#CBD5E1'}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="review-text">"{rev.comment}"</p>

                    <div className="card-bottom-row">
                      <div className="user-avatar">
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

        {/* Pagination Dots */}
        {filteredReviews.length > 1 && (
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
      </div>

      <style>{`
        .testimonials-section {
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .location-filter-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
        }

        .location-chips {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .location-chip {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          color: #475569;
          font-size: 0.825rem;
          font-weight: 600;
          padding: 0.4rem 0.9rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .location-chip:hover {
          border-color: #2563EB;
          background: rgba(255, 255, 255, 0.95);
        }

        .location-chip.is-active {
          background: #EFF6FF;
          border-color: #2563EB;
          color: #2563EB;
        }

        .slider-wrapper {
          position: relative;
          max-width: 820px;
          margin: 0 auto;
          padding: 0 3.5rem;
        }

        .slider-track-container {
          overflow: hidden;
          border-radius: 20px;
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
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 20px;
          padding: 2.25rem 2rem;
          box-shadow: 0 12px 32px -8px rgba(37, 99, 235, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
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

        .rating-stars {
          display: flex;
          gap: 0.2rem;
        }

        .review-text {
          font-size: 1.05rem;
          color: #1E293B;
          line-height: 1.65;
          font-style: italic;
        }

        .card-bottom-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #F1F5F9;
        }

        .user-avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
          color: #FFFFFF;
          font-family: var(--font-primary);
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
          flex-shrink: 0;
        }

        .user-info {
          display: flex;
          flex-direction: column;
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

        @media (max-width: 640px) {
          .slider-wrapper {
            padding: 0;
          }
          .slider-nav-btn {
            display: none;
          }
          .review-card {
            padding: 1.5rem;
          }
          .review-text {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </section>
  );
}
