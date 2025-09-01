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
    { value: 'literature', label: '📚 Littérature', icon: 'fas fa-book-open' },
    { value: 'music', label: '🎵 Musique', icon: 'fas fa-music' },
    { value: 'art', label: '🎨 Art Visuel', icon: 'fas fa-palette' },
    { value: 'all', label: '🌟 Tous les domaines', icon: 'fas fa-star' }
  ];

  const userTypes = [
    { value: 'creator', label: 'Créateur/Artiste', icon: 'fas fa-paint-brush' },
    { value: 'consumer', label: 'Consommateur de contenu', icon: 'fas fa-user' },
    { value: 'investor', label: 'Investisseur', icon: 'fas fa-chart-line' },
    { value: 'developer', label: 'Développeur', icon: 'fas fa-code' },
    { value: 'other', label: 'Autre', icon: 'fas fa-question' }
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
    
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
  };

  const stats = [
    { value: '2,847', label: 'Inscrits', icon: 'fas fa-users' },
    { value: '94%', label: 'Satisfaction', icon: 'fas fa-heart' },
    { value: '15 jours', label: 'Lancement', icon: 'fas fa-rocket' }
  ];

  return (
    <section id="early-access" className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <i className="fas fa-rocket text-white text-2xl"></i>
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="gradient-text">Early Access</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Rejoignez l'aventure Pandora en avant-première et soyez parmi les premiers à découvrir la révolution culturelle numérique
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Form Section */}
          <FadeIn direction="left" delay={0.4}>
            <Card className="border-purple-500/30 hover:border-purple-500/50 transform hover:scale-105 transition-all duration-500" glow>
              <div className="text-center mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <i className="fas fa-rocket text-white text-xl"></i>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Rejoignez l'Early Access</h3>
                <p className="text-gray-400">Accès exclusif • Fonctionnalités premium • Support prioritaire</p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-white font-semibold mb-2">Prénom *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300"
                        placeholder="Votre prénom"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="block text-white font-semibold mb-2">Nom *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300"
                        placeholder="Votre nom"
                      />
                    </motion.div>
                  </div>

                  {/* Email */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-white font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-all duration-300"
                      placeholder="votre@email.com"
                    />
                  </motion.div>

                  {/* Domain of Interest */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block text-white font-semibold mb-2">Domaine d'intérêt *</label>
                    <select
                      name="domain"
                      value={formData.domain}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all duration-300"
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
                    <label className="block text-white font-semibold mb-2">Type d'utilisateur *</label>
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 focus:outline-none transition-all duration-300"
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
                    className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-500 bg-white/5 border-white/10 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label className="text-gray-300 text-sm">
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
                      className="w-full py-4 text-lg font-bold"
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
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Avantages Early Access</h3>
                
                <div className="space-y-3">
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
                      className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
                    >
                      <motion.div 
                        className={`w-10 h-10 bg-gradient-to-r ${benefit.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-lg`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <i className={`${benefit.icon} text-white text-lg`}></i>
                      </motion.div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">{benefit.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
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
