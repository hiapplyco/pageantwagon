import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleUp } from '../lib/animations';

const TrailerShowcase = () => {
  const images = [
    {
      src: '/images/heroimages/tru.png',
      alt: 'Pageant Wagon exterior - futuristic mobile theater with galaxy display',
    },
    {
      src: '/images/heroimages/Gemini_Generated_Image_1vml8w1vml8w1vml.png',
      alt: 'Pageant Wagon immersive experience showcase',
    },
    {
      src: '/images/heroimages/Gemini_Generated_Image_kpmwtlkpmwtlkpmw.png',
      alt: 'Mobile immersive theater technology',
    },
    {
      src: '/images/heroimages/Gemini_Generated_Image_d4cenvd4cenvd4ce.png',
      alt: 'Educational immersive experience platform',
    },
  ];

  return (
    <section id="trailer" className="section bg-trailer">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-display-md lg:text-display-lg text-white mb-4 text-hover-glow cursor-default"
          >
            The Mobile Classroom of Tomorrow
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-body-lg text-gray-400 max-w-3xl mx-auto"
          >
            A 53-foot immersive theater that travels directly to your school. State-of-the-art LED walls,
            spatial audio, and AI-powered interactions—all contained within a self-sufficient mobile unit
            ready to transform any parking lot into a gateway to history.
          </motion.p>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {images.map((image) => (
            <motion.div
              key={image.src}
              variants={scaleUp}
              className="relative overflow-hidden rounded-xl group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a href="#contact" className="cta-button">
            Schedule a Visit
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TrailerShowcase;
