import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../animations/FadeIn';
import Card from '../ui/Card';

const Team = () => {
  const teamMembers = [
    {
      id: 'project-lead',
      name: 'Sarah Moussa',
      role: 'Porteuse de Projet & CEO',
      description: 'Passionnée de technologie et d\'innovation culturelle, Sarah a une vision claire : démocratiser l\'accès à la création artistique. Avec 8 ans d\'expérience dans le développement de plateformes numériques, elle combine expertise technique et sensibilité artistique.',
      avatar: '👩‍💼',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30',
      skills: ['Leadership', 'Innovation', 'Stratégie', 'Culture Tech'],
      experience: '8+ ans',
      education: 'Master en Innovation Digitale',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      },
      quote: '"L\'art doit être accessible à tous, partout, tout le temps."'
    },
    {
      id: 'tech-lead',
      name: 'Arman Touafic',
      role: 'Lead Développeur & CTO',
      description: 'Expert en développement full-stack et architecture cloud, Arman transforme les idées en réalité numérique. Spécialisé dans les technologies modernes et l\'optimisation des performances, il assure la solidité technique de Pandora.',
      avatar: '👨‍💻',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30',
      skills: ['Full-Stack', 'Cloud Architecture', 'AI/ML', 'DevOps'],
      experience: '6+ ans',
      education: 'Ingénieur en Informatique',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      },
      quote: '"La technologie doit servir la créativité, pas l\'inverse."'
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
    <section id="team" className="py-12 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-3">
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              <span className="gradient-text">Notre Équipe</span>
            </h2>
            <p className="text-base text-gray-300 max-w-3xl mx-auto">
              Une équipe passionnée qui combine expertise technique et vision artistique pour révolutionner l'expérience culturelle
            </p>
          </div>
        </FadeIn>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-4 max-w-4xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              className="group"
            >
              <Card 
                className={`${member.borderColor} hover:${member.borderColor.replace('/30', '/50')} h-full`}
                glow
              >
                <div className="text-center mb-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-2 text-lg">
                    {member.avatar}
                  </div>
                  
                  {/* Name & Role */}
                  <h3 className="text-base font-bold text-white mb-1">{member.name}</h3>
                  <p className={`text-xs font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-1`}>
                    {member.role}
                  </p>
                  
                  {/* Quote */}
                  <blockquote className="text-gray-400 italic text-xs mb-2">
                    "{member.quote}"
                  </blockquote>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-2 leading-relaxed text-xs">
                  {member.description}
                </p>

                {/* Skills */}
                <div className="mb-2">
                  <h4 className="text-white font-semibold mb-1 text-xs">Compétences</h4>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-1.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${member.color} bg-opacity-20 text-white border border-opacity-30`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience & Education */}
                <div className="grid grid-cols-2 gap-1 mb-2">
                  <div className="text-center p-1.5 bg-white/5 rounded-lg">
                    <div className="text-white font-bold text-xs">{member.experience}</div>
                    <div className="text-gray-400 text-xs">Expérience</div>
                  </div>
                  <div className="text-center p-1.5 bg-white/5 rounded-lg">
                    <div className="text-white font-bold text-xs">{member.education}</div>
                    <div className="text-gray-400 text-xs">Formation</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4">
                  <motion.a
                    href={member.social.linkedin}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </motion.a>
                  <motion.a
                    href={member.social.twitter}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-twitter"></i>
                  </motion.a>
                  <motion.a
                    href={member.social.github}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-github"></i>
                  </motion.a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <FadeIn direction="up" delay={0.8}>
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-3">
                Nos Valeurs
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-lightbulb text-white"></i>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Innovation</h4>
                  <p className="text-gray-300 text-sm">
                    Pousser les limites de la technologie pour servir la créativité
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-users text-white"></i>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Collaboration</h4>
                  <p className="text-gray-300 text-sm">
                    Créer ensemble, partager les connaissances, grandir ensemble
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-heart text-white"></i>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Passion</h4>
                  <p className="text-gray-300 text-sm">
                    L'amour de l'art et de la technologie au service de tous
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Team;
