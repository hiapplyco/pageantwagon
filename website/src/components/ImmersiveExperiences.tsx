import { motion } from 'framer-motion';
import { School, Building2, PartyPopper, Landmark, ArrowRight, CheckCircle, Zap, DollarSign, Users, Maximize } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../lib/animations';

interface ExperienceTier {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  idealFor: string[];
  scale: string;
  investment: string;
}

const ImmersiveExperiences = () => {
  const experienceTiers: ExperienceTier[] = [
    {
      id: 'classroom',
      icon: School,
      title: 'Classroom Experience',
      subtitle: 'Accessible History for Every School',
      description: 'Transform any classroom into an immersive history lesson with just your existing A/V equipment. Our software-based solution works with standard projectors, smart boards, or large displays to bring historical figures into your learning space.',
      image: '/images/experiences/classroom.png',
      features: [
        'Works with existing projectors and displays',
        'Low-cost subscription model',
        'Curriculum-aligned content packages',
        'Teacher dashboard and controls',
        'Student interaction tracking',
        'Pre and post-lesson materials included'
      ],
      idealFor: ['K-12 Schools', 'Community Colleges', 'Libraries', 'After-school Programs'],
      scale: 'Single classroom to entire school district',
      investment: 'Starting at $99/month per classroom'
    },
    {
      id: 'museum',
      icon: Landmark,
      title: 'Museum & Institution',
      subtitle: 'Permanent Interactive Exhibits',
      description: 'Create captivating permanent installations that transform museum spaces into living history experiences. Multi-station setups allow visitors to explore different eras and interact with multiple historical figures simultaneously.',
      image: '/images/experiences/museum.png',
      features: [
        'Custom exhibit design and integration',
        'Multiple interactive stations',
        'Visitor analytics and engagement metrics',
        'Multilingual support',
        'Accessibility features (captions, audio descriptions)',
        'Regular content updates and expansions'
      ],
      idealFor: ['History Museums', 'Presidential Libraries', 'Cultural Centers', 'Science Centers'],
      scale: 'Single exhibit to full museum integration',
      investment: 'Custom pricing based on scope'
    },
    {
      id: 'planetarium',
      icon: Building2,
      title: 'Planetarium & Dome',
      subtitle: '360° Historical Immersion',
      description: 'Leverage existing planetarium infrastructure to create breathtaking 360-degree historical experiences. Our dome-formatted content transforms standard planetarium shows into fully immersive journeys through time.',
      image: '/images/experiences/planetarium.png',
      features: [
        'Full-dome 360° video content',
        'Compatible with major dome systems',
        'Interactive Q&A sessions',
        'Synchronized multi-speaker audio',
        'Custom show development available',
        'Educational programming packages'
      ],
      idealFor: ['Planetariums', 'Science Museums', 'Universities', 'IMAX Theaters'],
      scale: 'Individual shows to seasonal programming',
      investment: 'License per show or annual subscription'
    },
    {
      id: 'festival',
      icon: PartyPopper,
      title: 'Festival & Large-Scale',
      subtitle: 'History at Entertainment Scale',
      description: 'Bring history to thousands with our large-format outdoor experiences. Giant LED screens, mobile staging, and crowd-scale interactivity create unforgettable moments at festivals, commemorations, and public events.',
      image: '/images/experiences/festival.png',
      features: [
        'Giant outdoor LED screen setups',
        'Mobile stage and production support',
        'Crowd interaction technology',
        'Live host integration options',
        'Full production crew available',
        'Weather-resistant equipment'
      ],
      idealFor: ['Music Festivals', 'State Fairs', 'July 4th Celebrations', 'Historical Commemorations'],
      scale: 'Hundreds to tens of thousands of attendees',
      investment: 'Event-based pricing with production'
    }
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="immersive-experiences" className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 bg-primary-600/20 rounded-full text-primary-400 text-body-sm font-medium mb-6"
          >
            Scale Your Impact
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-display-md lg:text-display-lg text-white mb-6 text-hover-glow cursor-default"
          >
            Immersive Experiences for Every Scale
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-body-lg text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            From a single classroom to a festival of thousands, our technology adapts to meet you where you are.
            Whether you're an educator with a modest budget or an event producer planning the next big celebration,
            we have a solution that brings history to life for your audience.
          </motion.p>
        </motion.div>

        {/* Value Propositions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { icon: DollarSign, label: 'Flexible Pricing', desc: 'Solutions for every budget' },
            { icon: Maximize, label: 'Any Scale', desc: 'From 1 to 100,000 people' },
            { icon: Zap, label: 'Quick Setup', desc: 'Deploy in hours, not months' },
            { icon: Users, label: 'Full Support', desc: 'Training and ongoing help' },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeInUp}
              className="text-center p-6 rounded-2xl bg-dark-800/50 border border-gray-800"
            >
              <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary-500" />
              </div>
              <h4 className="text-white font-semibold mb-1">{item.label}</h4>
              <p className="text-gray-400 text-body-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Tiers */}
        <div className="space-y-24">
          {experienceTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <motion.div
                variants={fadeInUp}
                className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video group">
                  <img
                    src={tier.image}
                    alt={tier.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                        <tier.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{tier.title}</p>
                        <p className="text-primary-400 text-body-sm">{tier.scale}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                variants={fadeInUp}
                className={index % 2 === 1 ? 'lg:order-1' : ''}
              >
                <span className="inline-block px-3 py-1 bg-gold-500/20 rounded-full text-gold-400 text-body-sm font-medium mb-4">
                  {tier.subtitle}
                </span>
                <h3 className="text-display-sm text-white mb-4">{tier.title}</h3>
                <p className="text-body-lg text-gray-300 mb-6 leading-relaxed">
                  {tier.description}
                </p>

                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-body-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Ideal For */}
                <div className="mb-6">
                  <p className="text-body-sm text-gray-400 mb-2">Ideal for:</p>
                  <div className="flex flex-wrap gap-2">
                    {tier.idealFor.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-dark-800 rounded-lg text-body-sm text-gray-300 border border-gray-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Investment */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl border border-gray-800 mb-6">
                  <div>
                    <p className="text-body-sm text-gray-400">Investment</p>
                    <p className="text-white font-semibold">{tier.investment}</p>
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="cta-button-secondary flex items-center gap-2"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600/20 via-primary-500/10 to-primary-600/20 rounded-3xl p-12 border border-primary-500/30">
            <h3 className="text-display-sm text-white mb-4">
              Not Sure Which Experience Is Right for You?
            </h3>
            <p className="text-body-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Our team can help you determine the best solution for your audience, budget, and goals.
              From initial consultation to full deployment, we're here to make history come alive.
            </p>
            <button onClick={scrollToContact} className="cta-button">
              Schedule a Consultation
            </button>
          </div>
        </motion.div>

        {/* From Academia to Entertainment Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-24"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h3 className="text-display-sm text-white mb-4">
              From Academia to Entertainment
            </h3>
            <p className="text-body-lg text-gray-300 max-w-3xl mx-auto">
              Our technology bridges the gap between rigorous historical scholarship and engaging entertainment.
              Whether you're teaching a college course or producing a summer festival, we maintain
              the same commitment to accuracy, authenticity, and impact.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="p-8 rounded-2xl bg-dark-800/50 border border-gray-800">
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                <School className="w-7 h-7 text-blue-400" />
              </div>
              <h4 className="text-heading-md text-white mb-3">Educational Rigor</h4>
              <p className="text-body-md text-gray-400 leading-relaxed">
                Every experience is built on primary sources, peer-reviewed scholarship, and input from
                historians. Our AI doesn't make things up—it draws from the historical record.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-dark-800/50 border border-gray-800">
              <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-purple-400" />
              </div>
              <h4 className="text-heading-md text-white mb-3">Cutting-Edge Technology</h4>
              <p className="text-body-md text-gray-400 leading-relaxed">
                Proprietary AI models, real-time conversation engines, and state-of-the-art visual
                production combine to create experiences that feel genuinely magical.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-dark-800/50 border border-gray-800">
              <div className="w-14 h-14 bg-gold-600/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-gold-400" />
              </div>
              <h4 className="text-heading-md text-white mb-3">Universal Accessibility</h4>
              <p className="text-body-md text-gray-400 leading-relaxed">
                From rural schools to major metropolitan events, we believe everyone deserves access
                to immersive historical experiences. Our flexible model makes that possible.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImmersiveExperiences;
