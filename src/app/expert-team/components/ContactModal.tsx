'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactModalProps {
  expertName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ expertName, isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          message: '',
        });
      }, 2000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-card rounded-2xl shadow-brand-lg max-w-2xl w-full">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-muted rounded-full hover:bg-border transition-brand"
          >
            <Icon name="XMarkIcon" size={24} variant="outline" className="text-text-primary" />
          </button>

          {/* Header */}
          <div className="p-8 border-b border-border">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Icon name="ChatBubbleLeftRightIcon" size={28} variant="outline" className="text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Contact {expertName}</h2>
                <p className="text-text-secondary">We'll connect you within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
                  <Icon name="CheckCircleIcon" size={40} variant="solid" className="text-success" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h3>
                <p className="text-text-secondary">
                  {expertName} will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-text-primary mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Project Type & Budget */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-semibold text-text-primary mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
                    >
                      <option value="">Select project type</option>
                      <option value="Kitchen Design">Kitchen Design</option>
                      <option value="Bathroom Renovation">Bathroom Renovation</option>
                      <option value="Living Spaces">Living Spaces</option>
                      <option value="Commercial Interiors">Commercial Interiors</option>
                      <option value="Full Home">Full Home</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold text-text-primary mb-2">
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary"
                    >
                      <option value="">Select budget range</option>
                      <option value="₹3-10 Lakhs">₹3-10 Lakhs</option>
                      <option value="₹10-25 Lakhs">₹10-25 Lakhs</option>
                      <option value="₹25+ Lakhs">₹25+ Lakhs</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary resize-none"
                    placeholder="Tell us about your project requirements..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-cta transition-brand shadow-brand hover:shadow-brand-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="PaperAirplaneIcon" size={20} variant="outline" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}