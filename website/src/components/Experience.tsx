import { motion } from 'framer-motion';
import { Truck, Monitor, Users, Brain, Sparkles, GraduationCap } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../lib/animations';

const Experience = () => {
  const features = [
    {
      icon: Truck,
      title: 'Mobile Learning Lab',
      description: 'A fully self-contained 53-foot expandable trailer that transforms into a 360-degree immersive theater. We bring history directly to your school—no field trip logistics required.'
    },
    {
      icon: Monitor,
      title: '360° LED Environment',
      description: 'Floor-to-ceiling curved LED walls create seamless, photorealistic historical environments. From ancient Rome to the Civil Rights movement, students are transported through time.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Conversations',
      description: 'Our proprietary AI brings historical figures to life with authentic personalities, speech patterns, and knowledge bases drawn from primary sources and scholarly research.'
    },
    {
      icon: Users,
      title: 'Interactive Sessions',
      description: 'Students don\'t just watch—they engage. Ask Abraham Lincoln about the Emancipation Proclamation. Debate philosophy with Socrates. Every session is unique.'
    },
    {
      icon: Sparkles,
      title: 'Curriculum Aligned',
      description: 'Our experiences are designed by educators to align with state standards. Pre and post-visit materials help teachers integrate the experience into their lesson plans.'
    },
    {
      icon: GraduationCap,
      title: 'All Grade Levels',
      description: 'Content adapts to your students. Elementary, middle, and high school programs available, each tailored to age-appropriate learning objectives and engagement styles.'
    }
  ];

  return (
    <section id="experience" className="py-24 bg-experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-display-md lg:text-display-lg text-white mb-6 text-hover-glow cursor-default"
          >
            The Pageant Wagon Experience
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-body-lg text-gray-300 max-w-3xl mx-auto"
          >
            Step inside our mobile immersive theater and watch history come alive.
            The Pageant Wagon combines cutting-edge technology with educational expertise
            to create unforgettable learning experiences that students talk about for years.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="bg-dark-900/50 rounded-2xl p-8 border border-gray-800 hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-primary-600/20 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary-500" />
              </div>
              <h3 className="text-heading-md text-white mb-3">{feature.title}</h3>
              <p className="text-body-md text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-primary-600/20 to-primary-500/10 rounded-3xl p-8 sm:p-12 border border-primary-500/30"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-display-sm text-white mb-6">
                How It Works
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-body-sm">1</span>
                  <span className="text-body-md text-gray-300">
                    <strong className="text-white font-semibold">Book Your Visit</strong> — Choose from our catalog of historical experiences or request a custom program for your curriculum.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-body-sm">2</span>
                  <span className="text-body-md text-gray-300">
                    <strong className="text-white font-semibold">We Come to You</strong> — Our team arrives with the Pageant Wagon, handling all setup at your school.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-body-sm">3</span>
                  <span className="text-body-md text-gray-300">
                    <strong className="text-white font-semibold">Immersive Sessions</strong> — Classes rotate through 30-45 minute sessions throughout the day.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-body-sm">4</span>
                  <span className="text-body-md text-gray-300">
                    <strong className="text-white font-semibold">Continued Learning</strong> — Post-visit materials and discussion guides extend the experience back in the classroom.
                  </span>
                </li>
              </ol>
            </div>

            {/* Stats */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-dark-900/80 rounded-2xl p-6 sm:p-8">
                <p className="stat-number mb-1">500+</p>
                <p className="stat-label mb-6">Students per day capacity</p>
                <p className="stat-number mb-1">18</p>
                <p className="stat-label mb-6">Historical figures available</p>
                <p className="stat-number mb-1">100%</p>
                <p className="stat-label">Curriculum aligned</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
