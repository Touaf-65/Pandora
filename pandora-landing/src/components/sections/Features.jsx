import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Card from '../ui/Card';

const Features = () => {
  const features = [
    {
      id: 'literature',
      title: '📚 Littérature',
      subtitle: 'Découvrez & Créez des Histoires',
      description: 'Une bibliothèque numérique immersive où chaque histoire prend vie. Partagez vos créations, découvrez de nouveaux auteurs, et plongez dans des univers littéraires uniques.',
      icon: 'fas fa-book-open',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30',
      features: [
        'Bibliothèque collaborative',
        'Écriture collaborative en temps réel',
        'Système de recommandations IA',
        'Audiobooks avec voix synthétisées',
        'Annotations et commentaires interactifs'
      ],
      stats: {
        value: '10K+',
        label: 'Livres Disponibles'
      }
    },
    {
      id: 'music',
      title: '🎵 Musique',
      subtitle: 'Composez & Partagez Votre Art',
      description: 'Une plateforme musicale révolutionnaire où créateurs et auditeurs se rencontrent. Composez, mixez, et découvrez de nouveaux talents dans un écosystème musical innovant.',
      icon: 'fas fa-music',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30',
      features: [
        'Studio virtuel intégré',
        'Collaboration en temps réel',
        'IA d\'assistance à la composition',
        'Distribution automatique',
        'Analytics avancés pour artistes'
      ],
      stats: {
        value: '50K+',
        label: 'Titres Originaux'
      }
    },
    {
      id: 'art',
      title: '🎨 Art Visuel',
      subtitle: 'Créez & Exposez Votre Vision',
      description: 'Une galerie numérique où l\'art prend une nouvelle dimension. Créez, exposez et découvrez des œuvres d\'art dans un espace immersif et interactif.',
      icon: 'fas fa-palette',
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500/30',
      features: [
        'Galerie virtuelle 3D',
        'Outils de création intégrés',
        'Expositions temporaires',
        'NFT et blockchain',
        'Réalité augmentée'
      ],
      stats: {
        value: '25K+',
        label: 'Œuvres d\'Art'
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="gradient-text">Fonctionnalités</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez les trois piliers de Pandora qui révolutionnent l'expérience culturelle numérique
            </p>
          </div>
        </FadeIn>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className="group"
            >
              <Card 
                className={`${feature.borderColor} hover:${feature.borderColor.replace('/30', '/50')} h-full`}
                glow
              >
                {/* Icon */}
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${feature.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-400 font-medium text-sm">{feature.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-4">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full flex-shrink-0`}></div>
                      <span className="text-gray-300 text-xs">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="border-t border-white/10 pt-3">
                  <div className="text-center">
                    <div className={`text-xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.stats.value}
                    </div>
                    <div className="text-gray-400 text-xs">{feature.stats.label}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.8}>
          <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Une Expérience Culturelle Unifiée
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Pandora brise les frontières entre les arts. Créez des projets multi-médias, 
                collaborez avec des artistes d'autres disciplines, et découvrez de nouvelles 
                formes d'expression artistique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                >
                  <i className="fas fa-play mr-2"></i>
                  Voir la Démo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-secondary"
                >
                  <i className="fas fa-info-circle mr-2"></i>
                  En Savoir Plus
                </motion.button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Features;
