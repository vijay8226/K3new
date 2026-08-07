import React, { useState } from 'react';
import {
  Wrench,
  Camera,
  Zap,
  BatteryCharging,
  Droplets,
  MessageSquare,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function ServicesCatalog({ onSelectService }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', label: 'All Services', icon: <Sparkles size={16} /> },
    { id: 'AC', label: 'AC Services', icon: <Wrench size={16} /> },
    { id: 'CCTV', label: 'CCTV Camera', icon: <Camera size={16} /> },
    { id: 'Electrical', label: 'Electrical', icon: <Zap size={16} /> },
    { id: 'UPS', label: 'UPS Battery', icon: <BatteryCharging size={16} /> },
    { id: 'Plumbing', label: 'Plumbing', icon: <Droplets size={16} /> },
  ];

  const servicesData = [
    {
      id: 'ac-service',
      category: 'AC',
      title: 'AC Installation & Repair',
      badge: 'Popular',
      image: '/images/ac1.webp',
      description: 'Installation, servicing, gas refill, and repair for all major AC types.',
      features: [
        'Full System Cleaning & Servicing',
        'Refrigerant Gas Top-up & Leak Fix',
        'Indoor & Outdoor Unit Mounting',
      ],
      whatsappMsg: 'Hello K3 Multi Solution, I want to book AC Installation & Repair.',
    },
    {
      id: 'cctv-install',
      category: 'CCTV',
      title: 'Camera Installation',
      badge: 'High Security',
      image: '/images/camara.webp',
      description: 'CCTV installation and setup for homes, shops, offices, and security monitoring.',
      features: [
        'HD & IP Camera Installation',
        'DVR / NVR Storage Setup',
        'Mobile App Live Remote Viewing',
      ],
      whatsappMsg: 'Hello K3 Multi Solution, I want to book Camera Installation.',
    },
    {
      id: 'electrical-work',
      category: 'Electrical',
      title: 'Electrical Work',
      badge: 'Certified',
      image: '/images/1.webp',
      description: 'Fan installation, light fitting, home electrical contracts & wiring.',
      features: [
        'Fan Installation & Repair',
        'Light & Fixture Assembly',
        'Home & Shop Electrical Contract',
      ],
      whatsappMsg: 'Hello K3 Multi Solution, I want to book Electrical Work.',
    },
    {
      id: 'ups-battery',
      category: 'UPS',
      title: 'UPS Battery Sales & Service',
      badge: 'Power Backup',
      image: '/images/bt.webp',
      description: 'UPS battery supply, replacement, installation, and support for homes and businesses.',
      features: [
        'New Inverter & Battery Sales',
        'Battery Health Testing & Water Fill',
        'Old Battery Exchange & Buyback',
      ],
      whatsappMsg: 'Hello K3 Multi Solution, I want to book UPS Battery Sales & Service.',
    },
    {
      id: 'plumbing-work',
      category: 'Plumbing',
      title: 'Plumbing Work',
      badge: 'Plumbing Specialist',
      image: '/images/p1.webp',
      description: 'Water tank installation, new water motor pump installation, and pipe fittings.',
      features: [
        'Water Tank Installation',
        'New Water Motor Pump Setup',
        'Pipe Leakage & Sanitary Work',
      ],
      whatsappMsg: 'Hello K3 Multi Solution, I want to book Plumbing Work.',
    },
  ];

  const filteredServices = servicesData.filter((s) =>
    activeCategory === 'All' ? true : s.category === activeCategory
  );

  return (
    <section id="services" className="section services-section">
      <div className="section-container">
        <div className="section-heading">
          <span className="eyebrow">Our Services</span>
          <h2>Services you can swipe and book instantly</h2>
          <p>Scroll sideways through the service cards for a compact Urban Company-style experience.</p>
        </div>

        {/* Filter Category Tabs */}
        <div className="category-row">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`cat-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="cards-grid">
          {filteredServices.map((service) => (
            <article key={service.id} className="service-card">
              <div className="card-img-wrapper">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                  loading="lazy"
                />
                <span className="card-badge">{service.badge}</span>
              </div>

              <div className="card-body">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>

                <ul className="service-list">
                  {service.features.map((feat, i) => (
                    <li key={i}>
                      <CheckCircle2 size={15} color="#10B981" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/916374055143?text=${encodeURIComponent(
                    `Hello K3 Multi Solution, I need ${service.title} service. Please confirm technician availability!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp service-book-btn w-full"
                >
                  <MessageSquare size={16} />
                  <span>Book via WhatsApp</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
          background: transparent;
          position: relative;
          z-index: 1;
        }

        .category-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .cat-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.15rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          color: #475569;
          font-family: var(--font-primary);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }

        .cat-btn:hover {
          color: #0F172A;
          border-color: #CBD5E1;
          background: rgba(255, 255, 255, 0.95);
        }

        .cat-btn.is-active {
          background: #2563EB;
          color: #FFFFFF;
          border-color: #2563EB;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 25px -5px rgba(15, 23, 42, 0.05), 0 4px 10px rgba(0,0,0,0.02);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.15), 0 8px 16px rgba(0, 0, 0, 0.04);
          border-color: rgba(37, 99, 235, 0.4);
        }

        .card-img-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .service-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .service-card:hover .service-image {
          transform: scale(1.05);
        }

        .card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(37, 99, 235, 0.9);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .service-title {
          font-size: 1.25rem;
          color: #0F172A;
          margin-bottom: 0.5rem;
        }

        .service-desc {
          font-size: 0.9rem;
          color: #64748B;
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }

        .service-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .service-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #334155;
        }

        .service-book-btn {
          margin-top: auto;
          font-size: 0.9rem;
        }

        @media (max-width: 640px) {
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
