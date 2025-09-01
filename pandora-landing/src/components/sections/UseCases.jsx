import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Card from '../ui/Card';

const UseCases = () => {
  const useCases = [
    {
      id: 'author-collaboration',
      title: 'Collaboration Littéraire',
      subtitle: 'Écriture collaborative en temps réel',
      description: 'Un auteur africain et un illustrateur français collaborent sur un roman jeunesse. Pandora permet l\'écriture simultanée, les commentaires en temps réel, et la gestion des versions.',
      icon: 'fas fa-users',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30',
      features: [
        'Écriture simultanée à plusieurs',
        'Commentaires et annotations',
        'Gestion des versions',
        'Export automatique'
      ],
      stats: {
        value: '3x',
        label: 'Plus rapide'
      },
      scenario: 'Marie (France) et Kofi (Ghana) écrivent ensemble "Les Aventures de Zara"'
    },
    {
      id: 'music-production',
      title: 'Production Musicale',
      subtitle: 'Studio virtuel collaboratif',
      description: 'Un producteur de Dakar et un chanteur de Paris créent un album complet via Pandora. Mixage en temps réel, partage d\'instruments virtuels, et mastering collaboratif.',
      icon: 'fas fa-music',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30',
      features: [
        'Studio virtuel intégré',
        'Instruments partagés',
        'Mixage en temps réel',
        'Distribution automatique'
      ],
      stats: {
        value: '50%',
        label: 'Coûts réduits'
      },
      scenario: 'Amadou (Dakar) produit l\'album de Sophie (Paris) à distance'
    },
    {
      id: 'art-exhibition',
      title: 'Exposition Virtuelle',
      subtitle: 'Galerie d\'art immersive',
      description: 'Une galerie virtuelle 3D présente des artistes africains et européens. Visiteurs du monde entier explorent les œuvres en réalité augmentée et achètent des NFT.',
      icon: 'fas fa-palette',
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500/30',
      features: [
        'Galerie 3D immersive',
        'Réalité augmentée',
        'NFT et blockchain',
        'Paiements sécurisés'
      ],
      stats: {
        value: '10K+',
        label: 'Visiteurs/mois'
      },
      scenario: 'Exposition "Afro-Futurisme" avec 50 artistes internationaux'
    },
    {
      id: 'educational-platform',
      title: 'Plateforme Éducative',
      subtitle: 'Apprentissage culturel interactif',
      description: 'Une école utilise Pandora pour enseigner l\'histoire de l\'art africain. Les élèves créent des projets multimédias, collaborent avec des artistes, et partagent leurs découvertes.',
      icon: 'fas fa-graduation-cap',
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-500/30',
      features: [
        'Cours interactifs',
        'Projets collaboratifs',
        'Évaluation en temps réel',
        'Portfolio numérique'
      ],
      stats: {
        value: '95%',
        label: 'Engagement'
      },
      scenario: 'Lycée de Bamako utilise Pandora pour l\'histoire de l\'art'
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
    <section id="use-cases" className="py-12 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <i className="fas fa-lightbulb text-white text-2xl"></i>
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="gradient-text">Cas d'Usage</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment Pandora transforme déjà la création culturelle à travers des exemples concrets et inspirants
            </p>
          </div>
        </FadeIn>

        {/* Use Cases Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              variants={cardVariants}
              className="group"
            >
              <Card 
                className={`${useCase.borderColor} hover:${useCase.borderColor.replace('/30', '/50')} h-full transform hover:scale-105 transition-all duration-500`}
                glow
              >
                                 {/* Header */}
                 <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center space-x-3">
                     <motion.div
                       whileHover={{ rotate: 360 }}
                       transition={{ duration: 0.6 }}
                       className={`w-10 h-10 bg-gradient-to-r ${useCase.color} rounded-lg flex items-center justify-center shadow-lg`}
                     >
                       <i className={`${useCase.icon} text-white text-lg`}></i>
                     </motion.div>
                     <div>
                       <h3 className="text-lg font-bold text-white mb-1">{useCase.title}</h3>
                       <p className="text-gray-400 text-xs">{useCase.subtitle}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className={`text-xl font-bold bg-gradient-to-r ${useCase.color} bg-clip-text text-transparent`}>
                       {useCase.stats.value}
                     </div>
                     <div className="text-gray-400 text-xs">{useCase.stats.label}</div>
                   </div>
                 </div>

                                 {/* Scenario */}
                 <div className="mb-3 p-2 bg-white/5 rounded-lg border border-white/10">
                   <p className="text-gray-300 text-xs italic">
                     <i className="fas fa-play-circle mr-2 text-purple-400"></i>
                     {useCase.scenario}
                   </p>
                 </div>

                 {/* Description */}
                 <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                   {useCase.description}
                 </p>

                 {/* Features */}
                 <div className="space-y-1 mb-4">
                   <h4 className="text-white font-semibold mb-2 text-sm">Fonctionnalités utilisées :</h4>
                   {useCase.features.map((feature, idx) => (
                     <div key={idx} className="flex items-center space-x-3">
                       <div className={`w-2 h-2 bg-gradient-to-r ${useCase.color} rounded-full flex-shrink-0`}></div>
                       <span className="text-gray-300 text-xs">{feature}</span>
                     </div>
                   ))}
                 </div>

                                 {/* CTA */}
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className={`w-full py-2 px-4 bg-gradient-to-r ${useCase.color} bg-opacity-20 text-white rounded-lg border border-opacity-30 hover:bg-opacity-30 transition-all duration-300 font-medium text-sm`}
                 >
                   <i className="fas fa-arrow-right mr-2"></i>
                   Voir le cas complet
                 </motion.button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

                 {/* Bottom CTA */}
         <FadeIn direction="up" delay={0.8}>
           <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Votre Cas d'Usage Existe-t-il ?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Pandora s'adapte à tous les besoins créatifs. Que vous soyez artiste, éducateur, 
                entrepreneur ou passionné, nous avons une solution pour vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                >
                  <i className="fas fa-rocket mr-2"></i>
                  Rejoindre l'Early Access
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-secondary"
                >
                  <i className="fas fa-comments mr-2"></i>
                  Nous Contacter
                </motion.button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default UseCases;
