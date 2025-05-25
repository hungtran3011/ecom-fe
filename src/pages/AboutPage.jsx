import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
          Our Story
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-[var(--md-sys-color-on-surface-variant)]">
          Creating quality products that enhance your everyday life since 2018
        </p>
      </div>

      {/* Company Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-[var(--md-sys-color-surface-container)] p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center mb-4">
            <span className="mdi text-3xl text-[var(--md-sys-color-primary)]">thumb_up</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-[var(--md-sys-color-on-surface)]">Quality First</h3>
          <p className="text-[var(--md-sys-color-on-surface-variant)]">
            We're committed to sourcing the finest materials and maintaining rigorous quality standards for all our products.
          </p>
        </div>

        <div className="bg-[var(--md-sys-color-surface-container)] p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center mb-4">
            <span className="mdi text-3xl text-[var(--md-sys-color-primary)]">eco</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-[var(--md-sys-color-on-surface)]">Sustainability</h3>
          <p className="text-[var(--md-sys-color-on-surface-variant)]">
            From responsible sourcing to eco-friendly packaging, we're reducing our environmental footprint every step of the way.
          </p>
        </div>

        <div className="bg-[var(--md-sys-color-surface-container)] p-8 rounded-xl shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center mb-4">
            <span className="mdi text-3xl text-[var(--md-sys-color-primary)]">handshake</span>
          </div>
          <h3 className="text-xl font-bold mb-3 text-[var(--md-sys-color-on-surface)]">Customer Focus</h3>
          <p className="text-[var(--md-sys-color-on-surface-variant)]">
            Your satisfaction drives everything we do. We're here to provide exceptional service and products that exceed expectations.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="flex flex-col md:flex-row gap-12 mb-16 items-center">
        <div className="md:w-1/2 order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">Our Journey</h2>
          <div className="space-y-4 text-[var(--md-sys-color-on-surface-variant)]">
            <p>
              Founded in 2018 in Ho Chi Minh City, our company began with a simple vision: to create high-quality, beautiful products that enhance everyday life while remaining accessible to everyone.
            </p>
            <p>
              What started as a small workshop with just three employees has grown into a thriving business with over 50 team members, but our core principles remain unchanged. We believe in ethical manufacturing, sustainable practices, and putting our customers at the heart of everything we do.
            </p>
            <p>
              Each product in our collection is thoughtfully designed, rigorously tested, and carefully crafted to ensure it meets our exacting standards. We're proud of what we've built and excited about where we're heading.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 order-1 md:order-2">
          <img 
            src="/images/about/our-story.jpg" 
            alt="Our workshop" 
            className="rounded-xl shadow-lg w-full h-auto object-cover"
            onError={(e) => {e.target.src = "https://placehold.co/600x400?text=Our+Workshop"}}
          />
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-[var(--md-sys-color-on-surface)] text-center">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {name: "Minh Nguyen", role: "Founder & CEO", img: "team-1.jpg"},
            {name: "Linh Tran", role: "Creative Director", img: "team-2.jpg"},
            {name: "Hai Pham", role: "Head of Operations", img: "team-3.jpg"},
            {name: "Mai Le", role: "Customer Experience", img: "team-4.jpg"}
          ].map((member, index) => (
            <div key={index} className="bg-[var(--md-sys-color-surface-container-low)] p-6 rounded-xl text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src={`/images/about/${member.img}`} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {e.target.src = `https://placehold.co/300x300?text=${member.name.charAt(0)}`}}
                />
              </div>
              <h3 className="text-xl font-medium text-[var(--md-sys-color-on-surface)]">{member.name}</h3>
              <p className="text-[var(--md-sys-color-on-surface-variant)]">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment Section */}
      <div className="bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] p-12 rounded-2xl mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Commitment to Sustainability</h2>
          <p className="mb-8">
            We believe in creating products that not only bring joy to our customers but also minimize harm to our planet. From responsible material sourcing to renewable energy in our facilities, sustainability is woven into everything we do.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 rounded-full bg-[var(--md-sys-color-primary)] flex items-center justify-center mx-auto mb-4">
                <span className="mdi text-xl text-[var(--md-sys-color-on-primary)]">recycling</span>
              </div>
              <h4 className="font-bold mb-2">Recycled Materials</h4>
              <p className="text-sm">60% of our materials come from recycled sources</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-[var(--md-sys-color-primary)] flex items-center justify-center mx-auto mb-4">
                <span className="mdi text-xl text-[var(--md-sys-color-on-primary)]">published_with_changes</span>
              </div>
              <h4 className="font-bold mb-2">Carbon Neutral</h4>
              <p className="text-sm">We offset 100% of our carbon emissions</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-[var(--md-sys-color-primary)] flex items-center justify-center mx-auto mb-4">
                <span className="mdi text-xl text-[var(--md-sys-color-on-primary)]">volunteer_activism</span>
              </div>
              <h4 className="font-bold mb-2">Community Support</h4>
              <p className="text-sm">5% of profits go to local community initiatives</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">Experience Our Products</h2>
        <p className="max-w-2xl mx-auto mb-8 text-[var(--md-sys-color-on-surface-variant)]">
          Browse our collection and discover the perfect items to enhance your home and lifestyle.
        </p>
        <Link 
          to="/products" 
          className="inline-block px-8 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}