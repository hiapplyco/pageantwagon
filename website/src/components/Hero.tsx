import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { textReveal, staggerContainer, fadeInUp } from '../lib/animations';

import 'swiper/css';
import 'swiper/css/effect-fade';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroImages = [
    // Original v2 images
    '/images/nanobanana-output/hero-carousel-v2/banana_20251126_202406_425_00.png', // civil rights era
    '/images/nanobanana-output/hero-carousel-v2/banana_20251126_202421_749_00.png', // industrial revolution
    '/images/nanobanana-output/hero-carousel-v2/banana_20251126_202436_656_00.png', // roman colosseum
    '/images/nanobanana-output/hero-carousel-v2/banana_20251126_202450_866_00.png', // corporate workshop
    '/images/nanobanana-output/hero-carousel-v2/banana_20251126_205815_495_00.png', // historical scene
    // New detailed images
    '/images/nanobanana-output/hero-carousel-v2/egypt.png', // Ancient Egypt pyramids
    '/images/nanobanana-output/hero-carousel-v2/declaration.png', // Declaration of Independence
    '/images/nanobanana-output/hero-carousel-v2/moonlanding.png', // Apollo 11 moon landing
    '/images/nanobanana-output/hero-carousel-v2/renaissance.png', // Renaissance Florence
    '/images/nanobanana-output/hero-carousel-v2/greatwall.png', // Great Wall of China
    '/images/nanobanana-output/hero-carousel-v2/washington.png', // March on Washington 1963
  ];

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          slidesPerView={1}
          spaceBetween={0}
          effect={"fade"}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
          style={{ position: 'absolute', inset: 0 }}
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <img
                src={image}
                alt={`Pageant Wagon Interior ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-black/50 to-black/30 z-10"></div>

      {/* Centered Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <motion.div
          className="hero-content text-center px-6 max-w-5xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Headline - Display XL with text reveal animation */}
          <motion.div
            variants={textReveal}
            className="overflow-hidden"
          >
            <h1 className="text-display-xl text-white mb-6 text-hover-glow cursor-default">
              Where The Past Meets The Future
            </h1>
          </motion.div>

          {/* Subtext - Body LG in Inter */}
          <motion.p
            variants={fadeInUp}
            className="text-body-lg text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            An immersive journey through time, brought to life by storytellers of the new age.
          </motion.p>

          {/* CTA Button - UPPERCASE with wide tracking */}
          <motion.div variants={fadeInUp}>
            <a
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#experience');
              }}
              className="cta-button"
            >
              Begin The Experience
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          onClick={() => scrollToSection('#experience')}
          className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="Scroll to experience section"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
