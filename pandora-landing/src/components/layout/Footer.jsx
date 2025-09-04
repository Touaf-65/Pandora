import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    if (!newsletterEmail) {
      setSubmitMessage('Veuillez entrer une adresse email valide.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // URL Google Forms
      const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScHSdhzTmah6ByC_EBQBOMjjd8g-5r4IzVhVt3wSHxYKDqe6w/formResponse';
      
      // Paramètres du formulaire Google
      const formData = new FormData();
      formData.append('entry.143721983', newsletterEmail);
      
      // Envoyer à Google Forms
      fetch(GOOGLE_FORMS_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      setSubmitMessage('Merci ! Votre email a été enregistré.');
      setNewsletterEmail('');
    } catch (error) {
      setSubmitMessage('Erreur lors de l\'enregistrement. Veuillez réessayer.');
      console.error('Erreur formulaire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = [
    { label: 'À propos', action: () => scrollToSection('hero') },
    { label: 'Fonctionnalités', action: () => scrollToSection('features') },
    { label: 'Cas d\'Usage', action: () => scrollToSection('use-cases') },
    { label: 'Roadmap', action: () => scrollToSection('roadmap') },
    { label: 'Équipe', action: () => scrollToSection('team') },
    { label: 'Early Access', action: () => scrollToSection('early-access') }
  ];

  const socialLinks = [
    { icon: 'fab fa-github', label: 'GitHub', url: 'https://github.com/pandora-platform' }
  ];

  const contactInfo = [
    { icon: 'fas fa-envelope', label: 'contact@pandora.africa', action: () => window.open('mailto:contact@pandora.africa') },
    { icon: 'fas fa-phone', label: '+33 1 23 45 67 89', action: () => window.open('tel:+33123456789') }
  ];

  return (
    <footer className="bg-slate-900 border-t border-white/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-4">
          {/* First Row: Brand & Navigation */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-4">
            {/* Brand Section */}
            <FadeIn direction="up" delay={0.2}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <i className="fas fa-music text-white text-sm"></i>
                  </div>
                  <span className="text-2xl font-bold gradient-text">PANDORA</span>
                </div>
                
                {/* Social Links */}
                <div className="flex space-x-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.label}
                    >
                      <i className={`${social.icon} text-sm`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Navigation Links */}
            <FadeIn direction="up" delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6">
                {footerLinks.map((link, index) => (
                  <motion.button
                    key={index}
                    onClick={link.action}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-base font-medium"
                    whileHover={{ scale: 1.05, y: -1 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Second Row: Contact Info */}
          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
              {contactInfo.map((contact, index) => (
                <motion.button
                  key={index}
                  onClick={contact.action}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <i className={`${contact.icon} text-purple-400 text-sm`}></i>
                  <span className="text-sm">{contact.label}</span>
                </motion.button>
              ))}
            </div>
          </FadeIn>
        </div>

          {/* Newsletter Section */}
          <FadeIn direction="up" delay={0.6}>
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-3 border border-purple-500/30">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-bold text-white mb-1">
                      Restez Connecté avec Pandora
                    </h3>
                    <p className="text-gray-300 text-xs">
                      Recevez les dernières actualités et opportunités exclusives.
                    </p>
                  </div>
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <input
                        type="email"
                        placeholder="Votre email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="w-48 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300 text-sm"
                        required
                      />
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        className={`px-4 py-2 font-semibold rounded-lg transition-all duration-300 text-sm ${
                          isSubmitting 
                            ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                        }`}
                      >
                        {isSubmitting ? 'Envoi...' : 'S\'abonner'}
                      </motion.button>
                    </div>
                    {submitMessage && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-xs ${
                          submitMessage.includes('Merci') 
                            ? 'text-green-400' 
                            : 'text-red-400'
                        }`}
                      >
                        {submitMessage}
                      </motion.p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </FadeIn>

        {/* Bottom Footer */}
        <FadeIn direction="up" delay={0.8}>
          <div className="py-2 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <span>© 2024 Pandora. Tous droits réservés.</span>
                <span>•</span>
                <span>Made with ❤️ in Africa & Europe</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => scrollToSection('early-access')}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  Early Access
                </motion.button>
                <span className="text-gray-600">•</span>
                <motion.button
                  onClick={() => window.open('#', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  Télécharger
                </motion.button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => scrollToSection('hero')}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <i className="fas fa-arrow-up"></i>
      </motion.button>
    </footer>
  );
};

export default Footer;
