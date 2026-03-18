/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  ChevronRight, 
  Star, 
  Scissors, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  Menu, 
  X,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Academy', href: '#academy' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex flex-col">
            <span className={`text-xl sm:text-2xl font-serif font-bold tracking-wider ${scrolled ? 'text-gold' : 'text-white'}`}>
              HEENA
            </span>
            <span className={`text-[10px] sm:text-xs tracking-[0.2em] font-sans ${scrolled ? 'text-gray-500' : 'text-white/80'}`}>
              SALON & ACADEMY
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide hover:text-gold transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#appointment"
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                scrolled 
                ? 'bg-gold text-white hover:bg-gold/90' 
                : 'bg-white text-gold hover:bg-soft-pink'
              }`}
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-gray-700' : 'text-white'}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-gold hover:bg-soft-pink rounded-md"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#appointment"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-6 py-3 bg-gold text-white rounded-full font-semibold"
              >
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ServiceCard = ({ title, items, icon: Icon }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-sm border border-soft-pink hover:shadow-md transition-all"
  >
    <div className="w-12 h-12 bg-soft-pink rounded-full flex items-center justify-center mb-6 text-gold">
      <Icon size={24} />
    </div>
    <h3 className="text-2xl font-serif mb-4 text-gray-900">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center text-gray-600 text-sm">
          <ChevronRight size={14} className="text-gold mr-2" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const AcademyCard = ({ title, duration, description }) => (
  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/80 transition-all">
    <div className="flex justify-between items-start mb-3">
      <h4 className="text-xl font-serif text-gray-900">{title}</h4>
      <span className="text-[10px] uppercase tracking-widest bg-gold/10 text-gold px-2 py-1 rounded">
        {duration}
      </span>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed mb-4">
      {description}
    </p>
    <button className="text-gold text-sm font-semibold flex items-center hover:underline">
      Course Details <ChevronRight size={14} className="ml-1" />
    </button>
  </div>
);

const TestimonialCard = ({ name, role, text, rating }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-soft-pink">
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={16} className="text-gold fill-gold" />
      ))}
    </div>
    <p className="text-gray-600 italic mb-6">"{text}"</p>
    <div className="flex items-center">
      <div className="w-10 h-10 bg-soft-pink rounded-full flex items-center justify-center text-gold font-bold mr-3">
        {name[0]}
      </div>
      <div>
        <h5 className="font-semibold text-gray-900 text-sm">{name}</h5>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hello Heena Beauty Salon! I'd like to inquire about:
Name: ${formData.name}
Phone: ${formData.phone}
Service/Course: ${formData.service}
Preferred Date: ${formData.date}
Message: ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/919594023061?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white selection:bg-gold/20">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Salon Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
              Welcome to Luxury
            </span>
            <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-lg">
              Premium Ladies Beauty <br className="hidden md:block" /> Salon & Academy
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 font-light max-w-2xl mx-auto drop-shadow-md">
              Professional beauty treatments and certified beauty training courses in the heart of Andheri East, Mumbai.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#appointment" 
                className="w-full sm:w-auto px-10 py-4 bg-gold text-white rounded-full font-bold text-lg hover:bg-gold/90 transition-all shadow-lg hover:shadow-gold/20"
              >
                Book Appointment
              </a>
              <a 
                href="tel:+919594023061" 
                className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronRight size={32} className="rotate-90" />
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 bg-soft-pink/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1000" 
                  alt="Professional Beauty Treatment" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-2xl shadow-xl hidden lg:block max-w-[250px]">
                <p className="text-gold font-serif text-4xl mb-2">10+</p>
                <p className="text-gray-600 text-sm font-medium">Years of Excellence in Beauty & Training</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold font-semibold tracking-widest uppercase text-xs mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">HEENA BEAUTY SALON & ACADEMY</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                Located in Andheri East, Mumbai, Heena Beauty Salon & Academy is a premier ladies-only sanctuary dedicated to enhancing your natural beauty. Our salon offers a wide range of professional treatments delivered by experienced beauticians who stay ahead of the latest trends.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Beyond our salon services, we are a leading Beauty Academy, empowering aspiring artists with certified training programs. We use only premium quality products to ensure the best results for our clients and students alike.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-gold" size={20} />
                  <span className="text-sm font-medium text-gray-700">Expert Beauticians</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-gold" size={20} />
                  <span className="text-sm font-medium text-gray-700">Certified Courses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-gold" size={20} />
                  <span className="text-sm font-medium text-gray-700">Premium Products</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-gold" size={20} />
                  <span className="text-sm font-medium text-gray-700">Ladies Only</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Salon Services */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-semibold tracking-widest uppercase text-xs mb-4 block">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Our Salon Services</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              title="Hair Services"
              icon={Scissors}
              items={["Haircut & Styling", "Hair Coloring & Highlights", "Hair Spa & Deep Conditioning", "Keratin Treatment", "Smoothening & Rebonding"]}
            />
            <ServiceCard 
              title="Beauty Services"
              icon={Sparkles}
              items={["Facial & Skin Care", "Waxing & Threading", "Manicure & Pedicure", "Body Polishing", "Detan & Bleach"]}
            />
            <ServiceCard 
              title="Makeup Services"
              icon={Star}
              items={["Bridal Makeup", "Party & Event Makeup", "Engagement Makeup", "HD & Airbrush Makeup", "Saree Draping"]}
            />
          </div>
        </div>
      </section>

      {/* Beauty Academy */}
      <section id="academy" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 -skew-x-12 transform translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold font-semibold tracking-widest uppercase text-xs mb-4 block">Build Your Career</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">Beauty Academy & Training</h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Start your journey in the beauty industry with our professional, certified courses. We provide hands-on training, expert guidance, and industry-recognized certification.
              </p>
              
              <div className="space-y-4 mb-10">
                <AcademyCard 
                  title="Basic Beautician Course" 
                  duration="3 Months" 
                  description="Perfect for beginners. Covers skin care, basic hair, and waxing."
                />
                <AcademyCard 
                  title="Professional Makeup Course" 
                  duration="2 Months" 
                  description="Master the art of bridal, party, and HD makeup techniques."
                />
                <AcademyCard 
                  title="Advanced Hair Styling" 
                  duration="1 Month" 
                  description="Learn trending hairstyles, chemical treatments, and coloring."
                />
              </div>

              <a 
                href="#appointment" 
                className="inline-flex items-center px-8 py-4 bg-gold text-white rounded-full font-bold hover:bg-gold/90 transition-all group"
              >
                Enroll in Academy <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600" 
                  alt="Academy Training" 
                  className="rounded-2xl w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600" 
                  alt="Makeup Course" 
                  className="rounded-2xl w-full h-64 object-cover mt-8"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/20 blur-[100px] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-soft-pink/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We prioritize your comfort and satisfaction above all else.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "Beauty Experts", desc: "Highly skilled and experienced beauticians." },
              { icon: GraduationCap, title: "Certified Training", desc: "Professional courses with recognized certificates." },
              { icon: CheckCircle2, title: "Premium Products", desc: "We use only high-end, safe beauty brands." },
              { icon: Clock, title: "Hygienic Space", desc: "Clean, comfortable, and sanitized environment." }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-gold">
                  <item.icon size={32} />
                </div>
                <h4 className="text-xl font-serif mb-2 text-gray-900">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-semibold tracking-widest uppercase text-xs mb-4 block">Our Work</span>
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Gallery</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1457974182554-a04bb410211b?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1595476108010-b4d1f8c2b1b1?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1527799822344-42ad8c03ef95?auto=format&fit=crop&q=80&w=600"
            ].map((img, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-xl overflow-hidden shadow-sm"
              >
                <img 
                  src={img} 
                  alt={`Gallery ${idx}`} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-soft-pink/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-gray-600">Real stories from our happy customers and students.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Priya Sharma"
              role="Bridal Client"
              text="Heena did my bridal makeup and it was absolutely stunning. I received so many compliments. Highly recommend for any special occasion!"
              rating={5}
            />
            <TestimonialCard 
              name="Anjali Mehta"
              role="Academy Student"
              text="The Professional Makeup Course changed my life. The hands-on training and guidance from the experts here are unmatched."
              rating={5}
            />
            <TestimonialCard 
              name="Sneha Patil"
              role="Regular Customer"
              text="The best hair spa and skin treatments in Andheri. The environment is so clean and the staff is very professional."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Contact & Appointment */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-serif text-gray-900 mb-8">Get In Touch</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-soft-pink rounded-full flex items-center justify-center text-gold flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Our Location</h4>
                    <p className="text-gray-600">
                      Heena Beauty Salon, C5, Khairani Rd, opp. Gurudwara, <br />
                      Nair Wadi, Andheri East, Mumbai, Maharashtra 400072
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-soft-pink rounded-full flex items-center justify-center text-gold flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Call Us</h4>
                    <p className="text-gray-600">+91 95940 23061</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-soft-pink rounded-full flex items-center justify-center text-gold flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Opening Hours</h4>
                    <p className="text-gray-600">Mon - Sun: 10:00 AM - 09:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder/Embed */}
              <div className="rounded-2xl overflow-hidden h-64 bg-gray-100 shadow-inner relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d72.8856!3d19.1085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8663670973d%3A0x8929944f7766567!2sHeena%20Beauty%20Salon!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                  className="w-full h-full border-0" 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <a 
                  href="https://maps.app.goo.gl/T1inoP6ym1BvBSYC9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-bold text-gold flex items-center hover:bg-soft-pink transition-all"
                >
                  Get Directions <ExternalLink size={14} className="ml-2" />
                </a>
              </div>
            </div>

            {/* Appointment Form */}
            <div id="appointment" className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-soft-pink">
              <h3 className="text-3xl font-serif text-gray-900 mb-2">Book Appointment</h3>
              <p className="text-gray-500 mb-8">Fill the form below and we'll get back to you via WhatsApp.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all"
                      placeholder="Your Phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service or Course</label>
                  <select 
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all bg-white"
                  >
                    <option value="">Select a service/course</option>
                    <optgroup label="Salon Services">
                      <option value="Haircut & Styling">Haircut & Styling</option>
                      <option value="Facial & Skin Care">Facial & Skin Care</option>
                      <option value="Bridal Makeup">Bridal Makeup</option>
                      <option value="Waxing & Threading">Waxing & Threading</option>
                    </optgroup>
                    <optgroup label="Academy Courses">
                      <option value="Basic Beautician Course">Basic Beautician Course</option>
                      <option value="Professional Makeup Course">Professional Makeup Course</option>
                      <option value="Hair Styling Course">Hair Styling Course</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gold/20 focus:border-gold outline-none transition-all"
                    placeholder="Anything else you'd like us to know?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-gold text-white rounded-xl font-bold text-lg hover:bg-gold/90 transition-all shadow-lg flex items-center justify-center"
                >
                  Send Inquiry via WhatsApp <MessageCircle size={20} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex flex-col mb-6">
                <span className="text-2xl font-serif font-bold tracking-wider text-gold">HEENA</span>
                <span className="text-xs tracking-[0.2em] font-sans text-gray-400">SALON & ACADEMY</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your destination for premium beauty services and professional training in Andheri East. Ladies Only.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-6 text-white">Quick Links</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-gold transition-colors">Services</a></li>
                <li><a href="#academy" className="hover:text-gold transition-colors">Academy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-6 text-white">Contact Info</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start">
                  <MapPin size={16} className="text-gold mr-3 mt-1 flex-shrink-0" />
                  <span>C5, Khairani Rd, Andheri East, Mumbai 400072</span>
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="text-gold mr-3 flex-shrink-0" />
                  <span>+91 95940 23061</span>
                </li>
                <li className="flex items-center">
                  <Instagram size={16} className="text-gold mr-3 flex-shrink-0" />
                  <span>@heenabeautysalon</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-serif mb-6 text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold transition-all">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
            <p>&copy; {new Date().getFullYear()} Heena Beauty Salon & Academy. All Rights Reserved.</p>
            <p className="mt-2">Designed for Elegance & Excellence.</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
        <a 
          href="https://wa.me/919594023061" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        >
          <MessageCircle size={28} />
        </a>
        <a 
          href="tel:+919594023061" 
          className="w-14 h-14 bg-gold text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform md:hidden"
        >
          <Phone size={28} />
        </a>
      </div>
    </div>
  );
}
