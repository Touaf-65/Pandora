import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Card from '../ui/Card';
import Button from '../ui/Button';

const EarlyAccess = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    domain: '',
    userType: '',
    newsletter: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const domains = [
    { value: 'Litterature', label: '📚 Littérature', icon: 'fas fa-book-open' },
    { value: 'Musique', label: '🎵 Musique', icon: 'fas fa-music' },
    { value: 'Art Visuel', label: '🎨 Art Visuel', icon: 'fas fa-palette' },
    { value: 'Tous les domaines', label: '🌟 Tous les domaines', icon: 'fas fa-star' }
  ];

  const userTypes = [
    { value: 'Createur/Artiste', label: 'Créateur/Artiste', icon: 'fas fa-paint-brush' },
    { value: 'Consommateur de contenu', label: 'Consommateur de contenu', icon: 'fas fa-user' },
    { value: 'Investisseur', label: 'Investisseur', icon: 'fas fa-chart-line' },
    { value: 'Developpeur', label: 'Développeur', icon: 'fas fa-code' },
    { value: 'Autre', label: 'Autre', icon: 'fas fa-question' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // URL Google Forms pour Early Access
      const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSftYeyhaFHbZ1q79Wk2bz6PPOrOrmoBLK1W0BUjSw4bywKewg/formResponse';
      
      // Paramètres du formulaire Google
      const googleFormData = new FormData();
      googleFormData.append('entry.1213968582', formData.firstName); // Prénom
      googleFormData.append('entry.445380962', formData.lastName);   // Nom
      googleFormData.append('entry.1719479834', formData.email);     // Email
      
      // Envoyer directement les valeurs (sans émojis) à Google Forms
      googleFormData.append('entry.607364370', formData.domain);     // Domaine
      googleFormData.append('entry.1291402694', formData.userType);  // Type d'utilisateur
      googleFormData.append('entry.984670974', formData.newsletter ? 'Oui, je souhaite recevoir les actualités' : ''); // Newsletter
      
      // Envoyer à Google Forms
      await fetch(GOOGLE_FORMS_URL, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors'
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          domain: '',
          userType: '',
          newsletter: true
        });
      }, 3000);
      
    } catch (error) {
      console.error('Erreur formulaire Early Access:', error);
      setIsSubmitting(false);
      // Afficher un message d'erreur si nécessaire
    }
  };

  const stats = [
    { value: '2,847', label: 'Inscrits', icon: 'fas fa-users' },
    { value: '94%', label: 'Satisfaction', icon: 'fas fa-heart' },
    { value: '15 jours', label: 'Lancement', icon: 'fas fa-rocket' }
  ];

  return (
    <section id="early-access" className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-3"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-2xl">
                <i className="fas fa-rocket text-white text-lg"></i>
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              <span className="gradient-text">Early Access</span>
            </h2>
            <p className="text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Rejoignez l'aventure Pandora en avant-première et soyez parmi les premiers à découvrir la révolution culturelle numérique
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Form Section */}
          <FadeIn direction="left" delay={0.4}>
            <Card className="border-purple-500/30 hover:border-purple-500/50 transform hover:scale-105 transition-all duration-500" glow>
              <div className="text-center mb-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg"
                >
                  <i className="fas fa-rocket text-white text-sm"></i>
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-1">Rejoignez l'Early Access</h3>
                <p className="text-gray-400 text-xs">Accès exclusif • Fonctionnalités premium • Support prioritaire</p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-white font-semibold mb-1 text-xs">Prénom *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300 text-xs"
                        placeholder="Votre prénom"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-white font-semibold mb-1 text-xs">Nom *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300 text-xs"
                        placeholder="Votre nom"
                      />
                    </motion.div>
                  </div>

                  {/* Email */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-white font-semibold mb-1 text-xs">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300 text-xs"
                      placeholder="votre@email.com"
                    />
                  </motion.div>

                  {/* Domain of Interest */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-white font-semibold mb-1 text-xs">Domaine d'intérêt *</label>
                    <select
                      name="domain"
                      value={formData.domain}
                      onChange={handleInputChange}
                      required
                      className="w-full px-2 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-all duration-300 text-xs"
                    >
                      <option value="">Sélectionnez un domaine</option>
                      {domains.map(domain => (
                        <option key={domain.value} value={domain.value}>
                          {domain.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* User Type */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-white font-semibold mb-1 text-xs">Type d'utilisateur *</label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-2 py-1.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none transition-all duration-300 text-xs"
                    >
                      <option value="">Sélectionnez votre profil</option>
                      {userTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Newsletter */}
                  <motion.div 
                    className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-500 bg-white/5 border-white/10 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label className="text-gray-300 text-xs">
                      Recevoir les actualités et offres exclusives
                    </label>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full py-3 text-base font-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Inscription en cours...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-rocket mr-2"></i>
                          Rejoindre l'Early Access
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              ) : (
                <motion.div 
                  className="text-center py-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    <i className="fas fa-check text-white text-2xl"></i>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Inscription réussie !</h3>
                  <p className="text-gray-400">
                    Merci de votre intérêt ! Vous recevrez bientôt un email de confirmation.
                  </p>
                </motion.div>
              )}
            </Card>
          </FadeIn>

          {/* Benefits Section */}
          <FadeIn direction="right" delay={0.6}>
            <div className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm"
                  >
                    <div className="text-lg font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-xs font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Benefits List */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white mb-2 text-center">Avantages Early Access</h3>
                
                <div className="space-y-1">
                  {[
                    {
                      icon: 'fas fa-crown',
                      title: 'Accès Premium',
                      description: 'Accès exclusif à toutes les fonctionnalités avancées dès le lancement',
                      color: 'from-purple-500 to-pink-500'
                    },
                    {
                      icon: 'fas fa-headset',
                      title: 'Support Prioritaire',
                      description: 'Support client dédié et assistance technique en priorité',
                      color: 'from-blue-500 to-cyan-500'
                    },
                    {
                      icon: 'fas fa-gift',
                      title: 'Offres Exclusives',
                      description: 'Remises spéciales et offres limitées aux membres Early Access',
                      color: 'from-orange-500 to-red-500'
                    },
                    {
                      icon: 'fas fa-comments',
                      title: 'Communauté Privée',
                      description: 'Accès à une communauté exclusive de créateurs et passionnés',
                      color: 'from-green-500 to-emerald-500'
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm"
                    >
                                              <motion.div 
                          className={`w-8 h-8 bg-gradient-to-r ${benefit.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-lg`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <i className={`${benefit.icon} text-white text-sm`}></i>
                        </motion.div>
                        <div>
                          <h4 className="text-white font-bold text-base mb-1">{benefit.title}</h4>
                          <p className="text-gray-400 text-xs leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
