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
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              <span className="text-red-400">Le Problème</span>
              <span className="text-white mx-4">vs</span>
              <span className="gradient-text">La Solution</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez pourquoi Pandora révolutionne l'expérience culturelle numérique
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Problème */}
          <FadeIn direction="left" delay={0.4}>
            <Card className="border-red-500/30 hover:border-red-500/50" glow>
              <div className="text-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-exclamation-triangle text-white text-sm"></i>
                </div>
                <h3 className="text-lg font-bold text-red-400 mb-1">Le Problème Actuel</h3>
                <p className="text-gray-400 text-xs">Expérience fragmentée et limitée</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-times text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-xs">3 Apps Séparées</h4>
                    <p className="text-gray-300 text-xs">Spotify, Wattpad, DeviantArt : aucune connexion entre vos passions</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-times text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-xs">Expérience Fragmentée</h4>
                    <p className="text-gray-300 text-xs">Navigation entre apps, perte d'inspiration et de découvertes croisées</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-times text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-xs">Recommandations Limitées</h4>
                    <p className="text-gray-300 text-xs">Algorithme mono-média qui ne comprend pas vos goûts culturels globaux</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-times text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-xs">Pas de Cohérence</h4>
                    <p className="text-gray-300 text-xs">Aucune expérience culturelle unifiée et immersive</p>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Solution */}
          <FadeIn direction="right" delay={0.6}>
            <Card className="border-green-500/30 hover:border-green-500/50" glow>
              <div className="text-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-lightbulb text-white text-sm"></i>
                </div>
                <h3 className="text-lg font-bold text-green-400 mb-1">La Solution Pandora</h3>
                <p className="text-gray-400 text-xs">Expérience unifiée et révolutionnaire</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-xs">Une Seule App Unifiée</h4>
                    <p className="text-gray-300 text-xs">Littérature, musique et art visuel dans une expérience cohérente</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-xs">IA Cross-Média</h4>
                    <p className="text-gray-300 text-xs">Recommandations intelligentes qui comprennent vos goûts culturels globaux</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-xs">Expérience Immersive</h4>
                    <p className="text-gray-300 text-xs">Navigation fluide entre les domaines avec découvertes croisées</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-xs"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-xs">Cohérence Culturelle</h4>
                    <p className="text-gray-300 text-xs">Expériences culturelles personnalisées et contextuelles</p>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* Call to Action */}
        <FadeIn direction="up" delay={0.8}>
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-3">
                Prêt à Révolutionner Votre Expérience Culturelle ?
              </h3>
              <p className="text-gray-300 mb-4 max-w-2xl mx-auto text-sm">
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
