import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Card from '../ui/Card';

const MarketOpportunity = () => {
  const marketData = [
    {
      id: 'global-market',
      title: 'Marché Global',
      value: '2.1T$',
      label: 'Valeur du marché culturel',
      growth: '+12.5%',
      period: 'par an',
      icon: 'fas fa-globe',
      color: 'from-blue-500 to-cyan-500',
      description: 'Le marché mondial de la création culturelle et du divertissement'
    },
    {
      id: 'digital-content',
      title: 'Contenu Digital',
      value: '450B$',
      label: 'Marché du contenu numérique',
      growth: '+18.2%',
      period: 'par an',
      icon: 'fas fa-laptop',
      color: 'from-purple-500 to-pink-500',
      description: 'Croissance explosive du contenu digital et des plateformes créatives'
    },
    {
      id: 'african-market',
      title: 'Marché Africain',
      value: '25B$',
      label: 'Industries créatives africaines',
      growth: '+25.3%',
      period: 'par an',
      icon: 'fas fa-map-africa',
      color: 'from-orange-500 to-red-500',
      description: 'Le marché africain en pleine expansion avec un potentiel énorme'
    }
  ];

  const opportunities = [
    {
      id: 'fragmentation',
      title: 'Fragmentation du Marché',
      description: 'Les créateurs utilisent 5-7 plateformes différentes pour leurs projets, créant de la complexité et des coûts supplémentaires.',
      icon: 'fas fa-puzzle-piece',
      color: 'from-red-500 to-pink-500',
      impact: 'Opportunité de consolidation'
    },
    {
      id: 'collaboration',
      title: 'Collaboration Limitée',
      description: 'Les outils de collaboration existants sont fragmentés et ne couvrent pas tous les aspects de la création culturelle.',
      icon: 'fas fa-users',
      color: 'from-blue-500 to-cyan-500',
      impact: 'Plateforme unifiée nécessaire'
    },
    {
      id: 'monetization',
      title: 'Monétisation Complexe',
      description: 'Les créateurs perdent 30-40% de leurs revenus en commissions multiples et frais de transaction.',
      icon: 'fas fa-dollar-sign',
      color: 'from-green-500 to-emerald-500',
      impact: 'Solution de paiement intégrée'
    },
    {
      id: 'discovery',
      title: 'Découverte Difficile',
      description: '80% des créateurs talentueux restent invisibles faute d\'outils de découverte et de promotion efficaces.',
      icon: 'fas fa-search',
      color: 'from-purple-500 to-pink-500',
      impact: 'IA de recommandation avancée'
    }
  ];

  const competitiveAdvantages = [
    {
      title: 'Plateforme Unifiée',
      description: 'Une seule plateforme pour tous les aspects de la création culturelle',
      icon: 'fas fa-cube',
      metric: '70%'
    },
    {
      title: 'IA Avancée',
      description: 'Intelligence artificielle pour la recommandation et l\'assistance créative',
      icon: 'fas fa-brain',
      metric: '3x'
    },
    {
      title: 'Monétisation Optimisée',
      description: 'Système de paiement intégré avec des frais réduits',
      icon: 'fas fa-chart-line',
      metric: '40%'
    },
    {
      title: 'Collaboration Réelle',
      description: 'Outils de collaboration en temps réel pour tous les médias',
      icon: 'fas fa-sync',
      metric: '24/7'
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
    <section id="market-opportunity" className="py-12 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
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
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-2xl">
                <i className="fas fa-chart-bar text-white text-2xl"></i>
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="gradient-text">Marché & Opportunité</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Un marché en pleine expansion avec des opportunités uniques pour révolutionner la création culturelle
            </p>
          </div>
        </FadeIn>

                 {/* Market Data */}
         <FadeIn direction="up" delay={0.4}>
           <div className="grid md:grid-cols-3 gap-6 mb-8">
            {marketData.map((data, index) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
              >
                                 <div className={`w-10 h-10 bg-gradient-to-r ${data.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                   <i className={`${data.icon} text-white text-lg`}></i>
                 </div>
                 <h3 className="text-white font-bold text-base mb-2">{data.title}</h3>
                 <div className="text-2xl font-black gradient-text mb-1">{data.value}</div>
                 <div className="text-gray-400 text-xs mb-2">{data.label}</div>
                 <div className="text-green-400 font-bold text-base">{data.growth}</div>
                 <div className="text-gray-500 text-xs">{data.period}</div>
                 <p className="text-gray-300 text-xs mt-2">{data.description}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

                 {/* Opportunities Grid */}
         <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.3 }}
           className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-8"
         >
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              variants={cardVariants}
              className="group"
            >
              <Card 
                className="border-red-500/30 hover:border-red-500/50 h-full transform hover:scale-105 transition-all duration-500"
                glow
              >
                                 <div className="flex items-start space-x-3 mb-3">
                   <motion.div
                     whileHover={{ rotate: 360 }}
                     transition={{ duration: 0.6 }}
                     className={`w-10 h-10 bg-gradient-to-r ${opportunity.color} rounded-lg flex items-center justify-center shadow-lg flex-shrink-0`}
                   >
                     <i className={`${opportunity.icon} text-white text-lg`}></i>
                   </motion.div>
                   <div>
                     <h3 className="text-lg font-bold text-white mb-1">{opportunity.title}</h3>
                     <p className="text-gray-300 leading-relaxed text-sm">{opportunity.description}</p>
                   </div>
                 </div>
                <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg p-3 border border-red-500/30">
                  <p className="text-red-400 font-semibold text-sm">
                    <i className="fas fa-lightbulb mr-2"></i>
                    {opportunity.impact}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

                 {/* Competitive Advantages */}
         <FadeIn direction="up" delay={0.6}>
           <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-white mb-4">Nos Avantages Concurrentiels</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Pandora se distingue par des fonctionnalités uniques qui répondent aux vrais besoins du marché
            </p>
          </div>
        </FadeIn>

                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {competitiveAdvantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
            >
                             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                 <i className={`${advantage.icon} text-white text-lg`}></i>
               </div>
               <h4 className="text-white font-bold text-base mb-2">{advantage.title}</h4>
               <p className="text-gray-300 text-xs mb-3">{advantage.description}</p>
               <div className="text-xl font-black gradient-text">{advantage.metric}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.8}>
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-4 border border-purple-500/30 max-w-4xl mx-auto">
              <h3 className="text-lg font-bold text-white mb-2">
                L'Opportunité est Maintenant
              </h3>
              <p className="text-gray-300 mb-3 max-w-2xl mx-auto text-sm">
                Le marché est prêt, la technologie est mature, et les créateurs attendent une solution comme Pandora. 
                Rejoignez-nous pour capturer cette opportunité unique.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">2.1T$</div>
                  <div className="text-gray-400 text-xs">Marché total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">25.3%</div>
                  <div className="text-gray-400 text-xs">Croissance africaine</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">70%</div>
                  <div className="text-gray-400 text-xs">Réduction de complexité</div>
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
                  <i className="fas fa-file-alt mr-2"></i>
                  Télécharger le Pitch Deck
                </motion.button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default MarketOpportunity;
