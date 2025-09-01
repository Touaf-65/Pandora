import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerSections = [
    {
      title: 'Pandora',
      links: [
        { label: 'À propos', action: () => scrollToSection('hero') },
        { label: 'Fonctionnalités', action: () => scrollToSection('features') },
        { label: 'Cas d\'Usage', action: () => scrollToSection('use-cases') },
        { label: 'Roadmap', action: () => scrollToSection('roadmap') },
        { label: 'Équipe', action: () => scrollToSection('team') }
      ]
    },
    {
      title: 'Ressources',
      links: [
        { label: 'Documentation', action: () => window.open('#', '_blank') },
        { label: 'API Developer', action: () => window.open('#', '_blank') },
        { label: 'Blog', action: () => window.open('#', '_blank') },
        { label: 'Support', action: () => window.open('#', '_blank') },
        { label: 'FAQ', action: () => window.open('#', '_blank') }
      ]
    },
    {
      title: 'Légal',
      links: [
        { label: 'Conditions d\'utilisation', action: () => window.open('#', '_blank') },
        { label: 'Politique de confidentialité', action: () => window.open('#', '_blank') },
        { label: 'RGPD', action: () => window.open('#', '_blank') },
        { label: 'Cookies', action: () => window.open('#', '_blank') },
        { label: 'Mentions légales', action: () => window.open('#', '_blank') }
      ]
    }
  ];

  const socialLinks = [
    { icon: 'fab fa-twitter', label: 'Twitter', url: 'https://twitter.com/pandora_platform' },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', url: 'https://linkedin.com/company/pandora-platform' },
    { icon: 'fab fa-instagram', label: 'Instagram', url: 'https://instagram.com/pandora_platform' },
    { icon: 'fab fa-youtube', label: 'YouTube', url: 'https://youtube.com/@pandora-platform' },
    { icon: 'fab fa-github', label: 'GitHub', url: 'https://github.com/pandora-platform' }
  ];

  const contactInfo = [
    { icon: 'fas fa-envelope', label: 'contact@pandora.africa', action: () => window.open('mailto:contact@pandora.africa') },
    { icon: 'fas fa-phone', label: '+33 1 23 45 67 89', action: () => window.open('tel:+33123456789') },
    { icon: 'fas fa-map-marker-alt', label: 'Paris, France & Dakar, Sénégal', action: () => window.open('https://maps.google.com', '_blank') }
  ];

  return (
    <footer className="bg-slate-900 border-t border-white/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <FadeIn direction="up" delay={0.2}>
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <i className="fas fa-music text-white text-lg"></i>
                  </div>
                  <span className="text-2xl font-bold gradient-text">PANDORA</span>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  La plateforme universelle qui révolutionne la création culturelle en unifiant littérature, 
                  musique et arts visuels dans un écosystème collaboratif innovant.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4 mb-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.label}
                    >
                      <i className={`${social.icon} text-lg`}></i>
                    </motion.a>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <motion.button
                      key={index}
                      onClick={contact.action}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300 w-full text-left"
                      whileHover={{ x: 4 }}
                    >
                      <i className={`${contact.icon} text-purple-400 w-4`}></i>
                      <span className="text-sm">{contact.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Footer Sections */}
            {footerSections.map((section, sectionIndex) => (
              <FadeIn key={section.title} direction="up" delay={0.2 + sectionIndex * 0.1}>
                <div>
                  <h3 className="text-white font-bold text-lg mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <motion.button
                          onClick={link.action}
                          className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                          whileHover={{ x: 4 }}
                        >
                          {link.label}
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Newsletter Section */}
          <FadeIn direction="up" delay={0.6}>
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Restez Connecté avec Pandora
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Recevez les dernières actualités, les nouvelles fonctionnalités et les opportunités 
                      exclusives directement dans votre boîte mail.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Votre adresse email"
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                      S'abonner
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom Footer */}
        <FadeIn direction="up" delay={0.8}>
          <div className="py-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>© 2024 Pandora. Tous droits réservés.</span>
                <span>•</span>
                <span>Made with ❤️ in Africa & Europe</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <motion.button
                  onClick={() => scrollToSection('early-access')}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  Rejoindre l'Early Access
                </motion.button>
                <span className="text-gray-600">•</span>
                <motion.button
                  onClick={() => window.open('#', '_blank')}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  Télécharger l'App
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
