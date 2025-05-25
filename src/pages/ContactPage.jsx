import React, { useState } from 'react';
import { useToast } from '../hooks/useToast';
import axiosInstance from '../libs/axios';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Here you would typically connect to your backend API
      // For demonstration, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful submission
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast({
        title: "Message Sent",
        description: "We have received your message and will respond soon.",
        type: "success"
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
          Contact Us
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-[var(--md-sys-color-on-surface-variant)]">
          We'd love to hear from you. Get in touch with our team.
        </p>
      </div>
      
      {/* Contact Information and Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Contact Information */}
        <div className="bg-[var(--md-sys-color-surface-container)] p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
            Get In Touch
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center flex-shrink-0">
                <span className="mdi text-xl text-[var(--md-sys-color-primary)]">location_on</span>
              </div>
              <div>
                <h3 className="font-medium text-[var(--md-sys-color-on-surface)]">Address</h3>
                <p className="text-[var(--md-sys-color-on-surface-variant)]">
                  123 Commerce Street, District 1<br />
                  Ho Chi Minh City, Vietnam
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center flex-shrink-0">
                <span className="mdi text-xl text-[var(--md-sys-color-primary)]">email</span>
              </div>
              <div>
                <h3 className="font-medium text-[var(--md-sys-color-on-surface)]">Email</h3>
                <p className="text-[var(--md-sys-color-on-surface-variant)]">
                  support@yourstore.com<br />
                  sales@yourstore.com
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--md-sys-color-primary-container)] flex items-center justify-center flex-shrink-0">
                <span className="mdi text-xl text-[var(--md-sys-color-primary)]">phone</span>
              </div>
              <div>
                <h3 className="font-medium text-[var(--md-sys-color-on-surface)]">Phone</h3>
                <p className="text-[var(--md-sys-color-on-surface-variant)]">
                  +84 (0)28 1234 5678<br />
                  Monday - Friday, 9am - 6pm
                </p>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-8">
            <h3 className="font-medium text-[var(--md-sys-color-on-surface)] mb-4">Find Us</h3>
            <div className="aspect-video w-full bg-[var(--md-sys-color-surface)] rounded-lg overflow-hidden">
              <img 
                src="/images/contact/map.jpg" 
                alt="Location Map" 
                className="w-full h-full object-cover"
                onError={(e) => {e.target.src = "https://placehold.co/600x400?text=Map"}}
              />
            </div>
          </div>
          
          {/* Social Media */}
          <div className="mt-8">
            <h3 className="font-medium text-[var(--md-sys-color-on-surface)] mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--md-sys-color-secondary-container)] flex items-center justify-center hover:opacity-80 transition-opacity">
                <span className="mdi text-xl text-[var(--md-sys-color-secondary)]">facebook</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--md-sys-color-secondary-container)] flex items-center justify-center hover:opacity-80 transition-opacity">
                <span className="mdi text-xl text-[var(--md-sys-color-secondary)]">instagram</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--md-sys-color-secondary-container)] flex items-center justify-center hover:opacity-80 transition-opacity">
                <span className="mdi text-xl text-[var(--md-sys-color-secondary)]">twitter</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--md-sys-color-secondary-container)] flex items-center justify-center hover:opacity-80 transition-opacity">
                <span className="mdi text-xl text-[var(--md-sys-color-secondary)]">linkedin</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-[var(--md-sys-color-surface-container)] p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
            Send a Message
          </h2>
          
          {submitted ? (
            <div className="bg-[var(--md-sys-color-secondary-container)] p-6 rounded-lg text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--md-sys-color-secondary)] flex items-center justify-center mx-auto mb-4">
                <span className="mdi text-3xl text-[var(--md-sys-color-on-secondary)]">check</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--md-sys-color-on-secondary-container)]">
                Thank You!
              </h3>
              <p className="text-[var(--md-sys-color-on-secondary-container)] mb-4">
                Your message has been sent successfully. We'll get back to you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-[var(--md-sys-color-secondary)] text-[var(--md-sys-color-on-secondary)] rounded-full hover:opacity-90 transition-opacity"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                    placeholder="John Doe"
                  />
                  {formErrors.name && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.name}</span>}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                    placeholder="john@example.com"
                  />
                  {formErrors.email && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.email}</span>}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                  placeholder="How can we help you?"
                />
                {formErrors.subject && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.subject}</span>}
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-[var(--md-sys-color-on-surface)]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="p-3 border border-[var(--md-sys-color-outline)] rounded-lg bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                  placeholder="Write your message here..."
                />
                {formErrors.message && <span className="text-[var(--md-sys-color-error)] text-sm">{formErrors.message}</span>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] rounded-full hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-[var(--md-sys-color-on-surface)] text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: "What are your shipping times?",
              answer: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days, and overnight delivery is available for orders placed before 2pm."
            },
            {
              question: "How do I return a product?",
              answer: "You can return any product within 30 days of purchase. Simply log into your account, go to your orders, and select the items you wish to return. Then follow the instructions to print a return label."
            },
            {
              question: "Do you ship internationally?",
              answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination. You can see the exact shipping cost at checkout."
            },
            {
              question: "How can I track my order?",
              answer: "Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can also view the status of your order by logging into your account."
            },
            {
              question: "Are your products eco-friendly?",
              answer: "We're committed to sustainability and source 60% of our materials from recycled sources. We're working toward increasing this percentage every year."
            }
          ].map((faq, index) => (
            <details 
              key={index} 
              className="group bg-[var(--md-sys-color-surface-container-low)] rounded-lg overflow-hidden"
            >
              <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
                <h3 className="font-medium text-[var(--md-sys-color-on-surface)]">{faq.question}</h3>
                <span className="mdi text-[var(--md-sys-color-on-surface-variant)] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="p-4 pt-0 text-[var(--md-sys-color-on-surface-variant)]">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
      
      {/* Hours & Locations */}
      <div className="bg-[var(--md-sys-color-surface-container-high)] p-8 rounded-xl shadow-sm text-center mb-16">
        <h2 className="text-2xl font-bold mb-6 text-[var(--md-sys-color-on-surface)]">
          Store Hours & Locations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="font-medium text-[var(--md-sys-color-on-surface)]">Ho Chi Minh City - Main Store</h3>
            <p className="text-[var(--md-sys-color-on-surface-variant)]">123 Commerce Street, District 1</p>
            <p className="text-[var(--md-sys-color-on-surface-variant)]">
              Monday - Saturday: 10am - 8pm<br />
              Sunday: 11am - 6pm
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-[var(--md-sys-color-on-surface)]">Hanoi</h3>
            <p className="text-[var(--md-sys-color-on-surface-variant)]">456 Retail Avenue, Ba Dinh District</p>
            <p className="text-[var(--md-sys-color-on-surface-variant)]">
              Monday - Saturday: 10am - 8pm<br />
              Sunday: 11am - 6pm
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-[var(--md-sys-color-on-surface)]">Da Nang</h3>
            <p className="text-[var(--md-sys-color-on-surface-variant)]">789 Beach Boulevard, Hai Chau District</p>
            <p className="text-[var(--md-sys-color-on-surface-variant)]">
              Monday - Saturday: 10am - 7pm<br />
              Sunday: 11am - 5pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}