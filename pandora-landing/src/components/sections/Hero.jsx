import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../ui/Button';
import FadeIn from '../animations/FadeIn';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-pink-500 to-red-500 rounded-full opacity-20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -180, -360],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <motion.div
        className="absolute bottom-32 left-1/3 w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-20"
        animate={{
          y: [0, -15, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <FadeIn direction="down" delay={0.4}>
            <motion.h1
              className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6"
              animate={inView ? { 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              PANDORA
            </motion.h1>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.6}>
            <p className="text-base md:text-lg text-gray-300 mb-4 font-light">
              L'Univers Culturel Réinventé
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.8}>
            <h2 className="text-xl md:text-3xl font-bold text-white mb-8 leading-tight">
              Littérature, Musique & Art<br />
              <span className="gradient-text">Réunis en Une Seule App</span>
            </h2>
          </FadeIn>
          
          <FadeIn direction="up" delay={1.0}>
            <p className="text-sm md:text-base text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Découvrez une plateforme révolutionnaire qui transforme votre façon de consommer et créer du contenu culturel. 
              Une expérience immersive où chaque créateur trouve sa voix et chaque amateur sa passion.
            </p>
          </FadeIn>
          
          <FadeIn direction="up" delay={1.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="primary" 
                size="lg"
                icon={<i className="fas fa-rocket"></i>}
                onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Rejoindre l'Early Access
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                icon={<i className="fas fa-play"></i>}
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Découvrir la Vision
              </Button>
            </div>
          </FadeIn>
          
          {/* Stats Preview */}
          <FadeIn direction="up" delay={1.4}>
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">3</div>
                <div className="text-sm text-gray-400">Arts Unifiés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">∞</div>
                <div className="text-sm text-gray-400">Possibilités</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">AI</div>
                <div className="text-sm text-gray-400">Intelligence</div>
              </div>
            </div>
          </FadeIn>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
