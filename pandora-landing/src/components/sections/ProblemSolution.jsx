import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Card from '../ui/Card';

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-red-400">Le Problème</span>
              <span className="text-white mx-4">vs</span>
              <span className="gradient-text">La Solution</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez pourquoi Pandora révolutionne l'expérience culturelle numérique
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Problème */}
          <FadeIn direction="left" delay={0.4}>
            <Card className="border-red-500/30 hover:border-red-500/50" glow>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-red-400 mb-2">Le Problème Actuel</h3>
                <p className="text-gray-400">Expérience fragmentée et limitée</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-times text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">3 Apps Séparées</h4>
                    <p className="text-gray-300 text-sm">Spotify, Wattpad, DeviantArt : aucune connexion entre vos passions</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-times text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Expérience Fragmentée</h4>
                    <p className="text-gray-300 text-sm">Navigation entre apps, perte d'inspiration et de découvertes croisées</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-times text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Recommandations Limitées</h4>
                    <p className="text-gray-300 text-sm">Algorithme mono-média qui ne comprend pas vos goûts culturels globaux</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-times text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Pas de Cohérence</h4>
                    <p className="text-gray-300 text-sm">Aucune expérience culturelle unifiée et immersive</p>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Solution */}
          <FadeIn direction="right" delay={0.6}>
            <Card className="border-green-500/30 hover:border-green-500/50" glow>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-lightbulb text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">La Solution Pandora</h3>
                <p className="text-gray-400">Expérience unifiée et révolutionnaire</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Une Seule App Unifiée</h4>
                    <p className="text-gray-300 text-sm">Littérature, musique et art visuel dans une expérience cohérente</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">IA Cross-Média</h4>
                    <p className="text-gray-300 text-sm">Recommandations intelligentes qui comprennent vos goûts culturels globaux</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Expérience Immersive</h4>
                    <p className="text-gray-300 text-sm">Navigation fluide entre les domaines avec découvertes croisées</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Cohérence Culturelle</h4>
                    <p className="text-gray-300 text-sm">Expériences culturelles personnalisées et contextuelles</p>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* Call to Action */}
        <FadeIn direction="up" delay={0.8}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                Prêt à Révolutionner Votre Expérience Culturelle ?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Rejoignez Pandora et découvrez une nouvelle façon de consommer et créer du contenu culturel. 
                Une expérience où chaque passion trouve sa place et chaque découverte ouvre de nouvelles portes.
              </p>
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <i className="fas fa-rocket mr-2"></i>
                Rejoindre la Révolution
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ProblemSolution;
