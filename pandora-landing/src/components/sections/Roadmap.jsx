import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Card from '../ui/Card';

const Roadmap = () => {
  const phases = [
    {
      id: 'phase-1',
      title: 'Phase 1 - MVP',
      period: 'Q1 2024',
      status: 'En cours',
      statusColor: 'from-green-500 to-emerald-500',
      icon: 'fas fa-rocket',
      description: 'Développement du produit minimum viable avec les fonctionnalités essentielles',
      features: [
        'Application mobile Flutter (iOS/Android)',
        'Système d\'authentification et profils utilisateurs',
        'Upload et gestion de contenu basique',
        'Interface de collaboration simple',
        'Paiements intégrés (Moov Africa)',
        'Base de données PostgreSQL'
      ],
      milestones: [
        { text: 'Architecture technique validée', completed: true },
        { text: 'Design system finalisé', completed: true },
        { text: 'Backend API développé', completed: false },
        { text: 'Application mobile MVP', completed: false },
        { text: 'Tests utilisateurs initiaux', completed: false }
      ],
      metrics: {
        users: '1K+',
        content: '5K+',
        revenue: '50K€'
      }
    },
    {
      id: 'phase-2',
      title: 'Phase 2 - Beta',
      period: 'Q2-Q3 2024',
      status: 'Planifié',
      statusColor: 'from-blue-500 to-cyan-500',
      icon: 'fas fa-flask',
      description: 'Lancement de la version beta avec des fonctionnalités avancées',
      features: [
        'IA de recommandation et découverte',
        'Collaboration en temps réel avancée',
        'Système de monétisation complet',
        'Analytics et insights créateurs',
        'API publique pour développeurs',
        'Intégrations tierces (Spotify, YouTube)'
      ],
      milestones: [
        { text: 'Early Access Program', completed: false },
        { text: 'Beta privée (1000 créateurs)', completed: false },
        { text: 'Système de paiement complet', completed: false },
        { text: 'IA de recommandation', completed: false },
        { text: 'Partnerships initiaux', completed: false }
      ],
      metrics: {
        users: '10K+',
        content: '50K+',
        revenue: '500K€'
      }
    },
    {
      id: 'phase-3',
      title: 'Phase 3 - Lancement',
      period: 'Q4 2024',
      status: 'Prévu',
      statusColor: 'from-purple-500 to-pink-500',
      icon: 'fas fa-globe',
      description: 'Lancement public et expansion sur le marché africain',
      features: [
        'Lancement public officiel',
        'Expansion géographique (Afrique de l\'Ouest)',
        'Programme de créateurs partenaires',
        'Événements et festivals intégrés',
        'Marketplace de services créatifs',
        'Système de certification et badges'
      ],
      milestones: [
        { text: 'Lancement public officiel', completed: false },
        { text: 'Expansion 5 pays africains', completed: false },
        { text: '100 créateurs partenaires', completed: false },
        { text: 'Premier festival Pandora', completed: false },
        { text: 'Série A fundraising', completed: false }
      ],
      metrics: {
        users: '100K+',
        content: '500K+',
        revenue: '2M€'
      }
    },
    {
      id: 'phase-4',
      title: 'Phase 4 - Expansion',
      period: '2025-2026',
      status: 'Vision',
      statusColor: 'from-orange-500 to-red-500',
      icon: 'fas fa-star',
      description: 'Expansion internationale et développement de nouvelles fonctionnalités',
      features: [
        'Expansion Europe et Amérique',
        'Réalité virtuelle et augmentée',
        'Blockchain et NFT marketplace',
        'Intelligence artificielle avancée',
        'Plateforme éducative intégrée',
        'Écosystème de développeurs'
      ],
      milestones: [
        { text: 'Expansion internationale', completed: false },
        { text: 'Technologies immersives', completed: false },
        { text: 'Marketplace NFT', completed: false },
        { text: 'IA créative avancée', completed: false },
        { text: 'IPO ou acquisition', completed: false }
      ],
      metrics: {
        users: '1M+',
        content: '5M+',
        revenue: '20M€'
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const phaseVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="roadmap" className="py-12 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
                <i className="fas fa-route text-white text-2xl"></i>
              </div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="gradient-text">Roadmap</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Notre vision stratégique pour révolutionner la création culturelle et construire l'écosystème Pandora
            </p>
          </div>
        </FadeIn>

        {/* Roadmap Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 to-pink-500 h-full hidden lg:block"></div>

          {/* Phases */}
                     <div className="space-y-8">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                variants={phaseVariants}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-slate-900 z-10 hidden lg:block"></div>

                {/* Phase Card */}
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <Card className="border-purple-500/30 hover:border-purple-500/50 transform hover:scale-105 transition-all duration-500" glow>
                                         {/* Header */}
                     <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center space-x-3">
                         <motion.div
                           whileHover={{ rotate: 360 }}
                           transition={{ duration: 0.6 }}
                           className={`w-10 h-10 bg-gradient-to-r ${phase.statusColor} rounded-lg flex items-center justify-center shadow-lg`}
                         >
                           <i className={`${phase.icon} text-white text-lg`}></i>
                         </motion.div>
                         <div>
                           <h3 className="text-lg font-bold text-white mb-1">{phase.title}</h3>
                           <p className="text-gray-400 text-xs">{phase.period}</p>
                         </div>
                       </div>
                       <div className="text-right">
                         <div className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${phase.statusColor} text-white`}>
                           {phase.status}
                         </div>
                       </div>
                     </div>

                                         {/* Description */}
                     <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                       {phase.description}
                     </p>

                     {/* Features */}
                     <div className="mb-4">
                       <h4 className="text-white font-semibold mb-2 text-sm">Fonctionnalités principales :</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                         {phase.features.map((feature, idx) => (
                           <div key={idx} className="flex items-center space-x-2">
                             <div className={`w-2 h-2 bg-gradient-to-r ${phase.statusColor} rounded-full flex-shrink-0`}></div>
                             <span className="text-gray-300 text-xs">{feature}</span>
                           </div>
                         ))}
                       </div>
                     </div>

                                         {/* Milestones */}
                     <div className="mb-4">
                       <h4 className="text-white font-semibold mb-2 text-sm">Milestones :</h4>
                       <div className="space-y-1">
                         {phase.milestones.map((milestone, idx) => (
                           <div key={idx} className="flex items-center space-x-3">
                             <div className={`w-3 h-3 rounded-full flex items-center justify-center ${
                               milestone.completed 
                                 ? 'bg-green-500' 
                                 : 'bg-gray-600 border border-gray-500'
                             }`}>
                               {milestone.completed && (
                                 <i className="fas fa-check text-white text-xs"></i>
                               )}
                             </div>
                             <span className={`text-xs ${milestone.completed ? 'text-green-400' : 'text-gray-400'}`}>
                               {milestone.text}
                             </span>
                           </div>
                         ))}
                       </div>
                     </div>

                                         {/* Metrics */}
                     <div className="grid grid-cols-3 gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                       <div className="text-center">
                         <div className="text-lg font-bold gradient-text">{phase.metrics.users}</div>
                         <div className="text-gray-400 text-xs">Utilisateurs</div>
                       </div>
                       <div className="text-center">
                         <div className="text-lg font-bold gradient-text">{phase.metrics.content}</div>
                         <div className="text-gray-400 text-xs">Contenus</div>
                       </div>
                       <div className="text-center">
                         <div className="text-lg font-bold gradient-text">{phase.metrics.revenue}</div>
                         <div className="text-gray-400 text-xs">Revenus</div>
                       </div>
                     </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

                 {/* Bottom CTA */}
         <FadeIn direction="up" delay={0.8}>
           <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Rejoignez l'Aventure Pandora
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Chaque phase de notre roadmap représente une étape vers la révolution culturelle. 
                Soyez parmi les premiers à participer à cette transformation.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">4</div>
                  <div className="text-gray-400 text-sm">Phases stratégiques</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">24</div>
                  <div className="text-gray-400 text-sm">Mois de développement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">1M+</div>
                  <div className="text-gray-400 text-sm">Utilisateurs cibles</div>
                </div>
              </div>
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
                  <i className="fas fa-calendar mr-2"></i>
                  Voir le Planning Détaillé
                </motion.button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Roadmap;
