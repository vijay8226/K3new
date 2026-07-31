import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

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
      location: 'Channaikadai St, Paramakudi',
      service: 'CCTV Camera Setup',
      rating: 5,
      comment: 'Got 4 HD CCTV cameras installed for my textile shop. Clear video quality and mobile app live viewing set up smoothly on my phone. Very trustworthy team.',
      date: 'Verified Service • June 2026',
    },
    {
      id: 3,
      name: 'R. Senthamil',
      location: 'Gandhi Nagar, Paramakudi',
      service: 'Electrical Home Wiring',
      rating: 5,
      comment: 'Professional electrician service. Replaced main DB box and installed new ceiling fans cleanly. Prompt response on WhatsApp.',
      date: 'Verified Service • July 2026',
    },
    {
      id: 4,
      name: 'M. Anand',
      location: 'Paramakudi Branch Area',
      service: 'UPS Battery Installation',
      rating: 5,
      comment: 'Bought a new tubular UPS battery for my home inverter. Excellent guidance, free delivery, and immediate setup. Highly recommended in Paramakudi!',
      date: 'Verified Service • May 2026',
    },
    {
      id: 5,
      name: 'P. Karthikeyan',
      location: 'Bazar St, Paramakudi',
      service: 'Plumbing & Water Pump Fit',
      rating: 5,
      comment: 'Installed a new overhead water tank pump. Neat fitting, no leaks, and very polite technicians. Will definitely call K3 for future home work.',
      date: 'Verified Service • June 2026',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
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
          <h2>Trusted by hundreds of happy customers in Paramakudi</h2>
          <p>Read real verified reviews from local home owners and shopkeepers.</p>
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
          <button
            onClick={handlePrev}
            className="slider-nav-btn prev-btn"
            aria-label="Previous customer review"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards Track */}
          <div className="slider-track-container">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {reviews.map((rev) => (
                <div key={rev.id} className="slide-card-item">
                  <div className="review-card">
                    <div className="card-top-row">
                      <div className="quote-box">
                        <Quote size={24} color="#2563EB" />
                      </div>
                      <div className="rating-stars">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
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
          <button
            onClick={handleNext}
            className="slider-nav-btn next-btn"
            aria-label="Next customer review"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="slider-pagination">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`pagination-dot ${idx === currentIndex ? 'is-active' : ''}`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background-color: #F8FAFC;
          border-top: 1px solid #E2E8F0;
          border-bottom: 1px solid #E2E8F0;
        }

        .slider-wrapper {
          position: relative;
          max-width: 820px;
          margin: 0 auto;
          padding: 0 3.5rem;
        }

        .slider-track-container {
          overflow: hidden;
          border-radius: 24px;
        }

        .slider-track {
          display: flex;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
        }

        .slide-card-item {
          min-width: 100%;
          box-sizing: border-box;
          padding: 0.5rem;
        }

        .review-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 2.25rem 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
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
