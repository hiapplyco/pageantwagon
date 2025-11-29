import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { PlayCircle, Bell, X, CheckCircle, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { fadeInUp, staggerContainer } from '../lib/animations';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Videos that have been generated - all 18 historical figures
const AVAILABLE_VIDEOS = [
  'abraham-lincoln',
  'martin-luther-king-jr',
  'genghis-khan',
  'joan-of-arc',
  'leonardo-da-vinci',
  'cleopatra',
  'albert-einstein',
  'marie-curie',
  'william-shakespeare',
  'harriet-tubman',
  'nelson-mandela',
  'isaac-newton',
  'galileo-galilei',
  'sun-tzu',
  'napoleon-bonaparte',
  'julius-caesar',
  'queen-elizabeth-i',
  'frederick-douglass',
];

interface Figure {
  name: string;
  image: string;
  landscapeImage: string;
  video: string;
  title: string;
  era: string;
  quote: string;
  factoid: string;
}

// Helper to get video slug from figure name
const getVideoSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
};

// Helper to check if video is available
const isVideoAvailable = (name: string): boolean => {
  return AVAILABLE_VIDEOS.includes(getVideoSlug(name));
};

type SubscriptionStatus = 'idle' | 'submitting' | 'success' | 'error';
type CustomFigureStep = 'prompt' | 'contact' | 'success';

const HistoricalFigures = () => {
  const [playingFigure, setPlayingFigure] = useState<string | null>(null);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscribeFigure, setSubscribeFigure] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('idle');
  const [email, setEmail] = useState('');

  // Custom figure creation state
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customStep, setCustomStep] = useState<CustomFigureStep>('prompt');
  const [customPrompt, setCustomPrompt] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customStatus, setCustomStatus] = useState<SubscriptionStatus>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus('submitting');

    try {
      await addDoc(collection(db, 'figureSubscriptions'), {
        email,
        figureName: subscribeFigure,
        createdAt: serverTimestamp(),
      });
      setSubscriptionStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscriptionStatus('error');
    }
  };

  const openSubscribeModal = (figureName: string) => {
    setSubscribeFigure(figureName);
    setShowSubscribeModal(true);
    setSubscriptionStatus('idle');
  };

  const closeSubscribeModal = () => {
    setShowSubscribeModal(false);
    setSubscribeFigure(null);
    setSubscriptionStatus('idle');
  };

  // Custom figure modal handlers
  const openCustomModal = () => {
    setShowCustomModal(true);
    setCustomStep('prompt');
    setCustomPrompt('');
    setCustomEmail('');
    setCustomName('');
    setCustomStatus('idle');
  };

  const closeCustomModal = () => {
    setShowCustomModal(false);
    setCustomStep('prompt');
    setCustomStatus('idle');
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomStatus('submitting');

    try {
      // Save the custom figure request
      await addDoc(collection(db, 'customFigureRequests'), {
        name: customName,
        email: customEmail,
        prompt: customPrompt,
        status: 'pending',
        notifyEmail: 'james@hiapply.co',
        createdAt: serverTimestamp(),
      });

      // Send confirmation email to the user via Firebase Trigger Email extension
      await addDoc(collection(db, 'mail'), {
        to: customEmail,
        message: {
          subject: 'Your Pageant Wagon Custom Figure Request',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #7c3aed;">Thank you for your request, ${customName}!</h2>
              <p>We've received your custom historical figure request and are excited to bring your vision to life.</p>
              <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #374151;">Your Request:</h3>
                <p style="color: #4b5563;">${customPrompt}</p>
              </div>
              <p>Our team will review your request and reach out soon to discuss the details.</p>
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                Best regards,<br>
                The Pageant Wagon Team
              </p>
            </div>
          `,
        },
      });

      // Send notification email to james@hiapply.co
      await addDoc(collection(db, 'mail'), {
        to: 'james@hiapply.co',
        message: {
          subject: `New Custom Figure Request from ${customName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #7c3aed;">New Custom Figure Request</h2>
              <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${customName}</p>
                <p><strong>Email:</strong> ${customEmail}</p>
                <h3 style="margin-top: 16px; color: #374151;">Request:</h3>
                <p style="color: #4b5563;">${customPrompt}</p>
              </div>
              <p style="color: #6b7280; font-size: 14px;">
                Reply directly to ${customEmail} to follow up.
              </p>
            </div>
          `,
        },
      });

      setCustomStatus('success');
      setCustomStep('success');
    } catch (error) {
      console.error('Error submitting custom figure request:', error);
      setCustomStatus('error');
    }
  };

  const figures: Figure[] = [
    {
      name: 'Abraham Lincoln',
      image: '/images/nanobanana-output/banana_20251125_224821_193_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065100_481_00.png',
      video: '/images/nanobanana-output/videos/abraham-lincoln.mp4',
      title: '16th President of the United States',
      era: '1809–1865',
      quote: '"I view education as the most important subject which we as a people can be engaged in."',
      factoid: "The site of the pivotal Civil War battle and Lincoln's profound address that redefined the nation's purpose."
    },
    {
      name: 'Martin Luther King Jr.',
      image: '/images/nanobanana-output/banana_20251125_224828_414_00.png',
      landscapeImage: '/images/nanobanana-output/environments/mlk-march-washington.png',
      video: '/images/nanobanana-output/videos/martin-luther-king-jr.mp4',
      title: 'Civil Rights Leader & Nobel Laureate',
      era: '1929–1968',
      quote: '"Intelligence plus character—that is the goal of true education."',
      factoid: "The Lincoln Memorial, where Dr. King delivered his 'I Have a Dream' speech to over 250,000 people during the March on Washington."
    },
    {
      name: 'Genghis Khan',
      image: '/images/nanobanana-output/banana_20251125_225813_763_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065118_358_00.png',
      video: '/images/nanobanana-output/videos/genghis-khan.mp4',
      title: 'Founder of the Mongol Empire',
      era: '1162–1227',
      quote: '"Conquering the world on horseback is easy; it is dismounting and governing that is hard."',
      factoid: 'The vast, unforgiving steppe that forged the Mongol Empire, stretching from the Pacific Ocean to Central Europe under Genghis Khan.'
    },
    {
      name: 'Joan of Arc',
      image: '/images/nanobanana-output/banana_20251125_225820_982_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065125_187_00.png',
      video: '/images/nanobanana-output/videos/joan-of-arc.mp4',
      title: 'French Heroine & Catholic Saint',
      era: '1412–1431',
      quote: '"I am not afraid... I was born to do this."',
      factoid: "The city of Orléans in 1429, where Joan of Arc, a teenage peasant girl, led the French army to a momentous victory against the English."
    },
    {
      name: 'Leonardo da Vinci',
      image: '/images/nanobanana-output/banana_20251125_225828_265_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065148_495_00.png',
      video: '/images/nanobanana-output/videos/leonardo-da-vinci.mp4',
      title: 'Renaissance Polymath & Artist',
      era: '1452–1519',
      quote: '"Learning never exhausts the mind."',
      factoid: "The cradle of the Renaissance, Florence's artistic and intellectual energy fueled Leonardo's boundless curiosity and genius."
    },
    {
      name: 'Cleopatra',
      image: '/images/nanobanana-output/banana_20251125_225834_407_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065155_428_00.png',
      video: '/images/nanobanana-output/videos/cleopatra.mp4',
      title: 'Last Pharaoh of Ancient Egypt',
      era: '69–30 BC',
      quote: '"I will not be triumphed over."',
      factoid: 'The cosmopolitan capital of ancient Egypt, Alexandria was a center of culture and learning, home to the great library and the legendary lighthouse.'
    },
    {
      name: 'Albert Einstein',
      image: '/images/nanobanana-output/banana_20251125_225850_465_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065203_429_00.png',
      video: '/images/nanobanana-output/videos/albert-einstein.mp4',
      title: 'Theoretical Physicist & Nobel Laureate',
      era: '1879–1955',
      quote: '"Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world."',
      factoid: "In 1905, while working as a patent clerk in Bern, Einstein published four groundbreaking papers that revolutionized our understanding of space, time, and matter."
    },
    {
      name: 'Marie Curie',
      image: '/images/nanobanana-output/banana_20251125_225856_410_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065209_844_00.png',
      video: '/images/nanobanana-output/videos/marie-curie.mp4',
      title: 'Physicist & Chemist, Pioneer of Radioactivity',
      era: '1867–1934',
      quote: '"Nothing in life is to be feared, it is only to be understood."',
      factoid: "In a humble Parisian shed, Marie Curie's pioneering research on radioactivity laid the foundation for modern nuclear physics and cancer treatments."
    },
    {
      name: 'William Shakespeare',
      image: '/images/nanobanana-output/banana_20251125_225903_457_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065231_851_00.png',
      video: '/images/nanobanana-output/videos/william-shakespeare.mp4',
      title: 'Playwright & Poet, The Bard of Avon',
      era: '1564–1616',
      quote: '"All the world\'s a stage, and all the men and women merely players."',
      factoid: "The Globe Theatre was Shakespeare's stage, where his timeless plays, from Hamlet to Romeo and Juliet, came to life for audiences of all classes."
    },
    {
      name: 'Harriet Tubman',
      image: '/images/nanobanana-output/banana_20251125_225909_776_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065238_919_00.png',
      video: '/images/nanobanana-output/videos/harriet-tubman.mp4',
      title: 'Abolitionist & Underground Railroad Conductor',
      era: '1822–1913',
      quote: '"I never ran my train off the track and I never lost a passenger."',
      factoid: "A secret network of routes and safe houses, the Underground Railroad, guided by 'conductors' like Harriet Tubman, helped enslaved African Americans escape to freedom."
    },
    {
      name: 'Nelson Mandela',
      image: '/images/nanobanana-output/banana_20251125_225924_762_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065246_349_00.png',
      video: '/images/nanobanana-output/videos/nelson-mandela.mp4',
      title: 'Anti-Apartheid Revolutionary & President',
      era: '1918–2013',
      quote: '"I learned that courage was not the absence of fear, but the triumph over it."',
      factoid: "For 18 of his 27 years in prison, Nelson Mandela was held on Robben Island, a symbol of the brutality of apartheid and the resilience of the human spirit."
    },
    {
      name: 'Isaac Newton',
      image: '/images/nanobanana-output/banana_20251125_225931_692_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_065253_558_00.png',
      video: '/images/nanobanana-output/videos/isaac-newton.mp4',
      title: 'Mathematician & Father of Classical Physics',
      era: '1643–1727',
      quote: '"If I have seen further, it is by standing upon the shoulders of giants."',
      factoid: "At Cambridge, Newton's experiments with light and motion led to his formulation of the laws of motion and universal gravitation, the bedrock of classical physics."
    },
    {
      name: 'Galileo Galilei',
      image: '/images/nanobanana-output/banana_20251125_225938_407_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_070347_797_00.png',
      video: '/images/nanobanana-output/videos/galileo-galilei.mp4',
      title: 'Father of Modern Science & Astronomy',
      era: '1564–1642',
      quote: '"All truths are easy to understand once they are discovered; the point is to discover them."',
      factoid: "Galileo's observations of the heavens with his telescope challenged the established geocentric model of the universe, sparking a scientific revolution."
    },
    {
      name: 'Sun Tzu',
      image: '/images/nanobanana-output/banana_20251125_225948_209_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_070354_707_00.png',
      video: '/images/nanobanana-output/videos/sun-tzu.mp4',
      title: 'Military Strategist & Philosopher',
      era: 'c. 544–496 BC',
      quote: '"The supreme art of war is to subdue the enemy without fighting."',
      factoid: "The timeless strategies in Sun Tzu's 'The Art of War,' written over 2,500 years ago, continue to influence military tactics, business strategy, and legal discourse."
    },
    {
      name: 'Napoleon Bonaparte',
      image: '/images/nanobanana-output/banana_20251125_230001_659_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_070401_519_00.png',
      video: '/images/nanobanana-output/videos/napoleon-bonaparte.mp4',
      title: 'French Emperor & Military Genius',
      era: '1769–1821',
      quote: '"Impossible is a word to be found only in the dictionary of fools."',
      factoid: 'The Battle of Waterloo marked the final defeat of Napoleon, ending his reign as Emperor of the French and reshaping the map of Europe.'
    },
    {
      name: 'Julius Caesar',
      image: '/images/nanobanana-output/banana_20251125_230009_317_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_070409_670_00.png',
      video: '/images/nanobanana-output/videos/julius-caesar.mp4',
      title: 'Roman Dictator & Conqueror of Gaul',
      era: '100–44 BC',
      quote: '"Veni, vidi, vici." (I came, I saw, I conquered.)',
      factoid: "The heart of the Roman Republic, the Forum was the center of political, commercial, and judicial life, witnessing both the triumphs and the tragic end of Julius Caesar."
    },
    {
      name: 'Queen Elizabeth I',
      image: '/images/nanobanana-output/banana_20251125_230017_070_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_070418_379_00.png',
      video: '/images/nanobanana-output/videos/queen-elizabeth-i.mp4',
      title: 'Queen of England, The Virgin Queen',
      era: '1533–1603',
      quote: '"I have already joined myself in marriage to a husband, namely the kingdom of England."',
      factoid: "Queen Elizabeth I's decisive victory over the Spanish Armada in 1588 secured England's independence and marked the beginning of its rise as a global naval power."
    },
    {
      name: 'Frederick Douglass',
      image: '/images/nanobanana-output/banana_20251125_230023_900_00.png',
      landscapeImage: '/images/nanobanana-output/environments/banana_20251126_070426_427_00.png',
      video: '/images/nanobanana-output/videos/frederick-douglass.mp4',
      title: 'Abolitionist, Orator & Statesman',
      era: '1818–1895',
      quote: '"If there is no struggle, there is no progress."',
      factoid: "A powerful orator and writer, Frederick Douglass, a former slave, became a leading voice in the abolitionist movement, demanding freedom and equality for all."
    },
  ];

  return (
    <section id="figures" className="section bg-figures">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-display-md lg:text-display-lg text-white mb-4 text-hover-glow cursor-default"
          >
            Step Into Any Moment in History
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-body-lg text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Our AI-powered immersive platform recreates historically accurate figures and authentic environments from any era. From ancient Alexandria to the steps of the Lincoln Memorial—every detail grounded in documented research, every conversation driven by real quotes and verified historical records.
          </motion.p>
        </motion.div>

        {/* Figure Carousel */}
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {figures.map((figure) => (
            <SwiperSlide key={figure.name}>
              <div className="figure-card group" style={{ backgroundImage: `url(${figure.landscapeImage})` }}>
                {/* Full-card video overlay when playing */}
                {playingFigure === figure.name && (
                  <video
                    src={figure.video}
                    autoPlay
                    onEnded={() => setPlayingFigure(null)}
                    onError={() => setPlayingFigure(null)}
                    className="figure-card-video"
                  />
                )}
                <div className="figure-card-image">
                  <img
                    src={figure.image}
                    alt={figure.name}
                  />
                  {isVideoAvailable(figure.name) ? (
                    <button
                      onClick={() => setPlayingFigure(figure.name)}
                      className="play-button"
                      aria-label={`Play ${figure.name} animation`}
                    >
                      <PlayCircle size={32} />
                    </button>
                  ) : (
                    <div className="generating-overlay">
                      <div className="generating-content">
                        <Bell size={24} className="generating-icon" />
                        <p className="generating-text">Generating...</p>
                        <button
                          onClick={() => openSubscribeModal(figure.name)}
                          className="subscribe-link"
                        >
                          Subscribe for updates
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="figure-card-overlay"></div>
                </div>
                <div className="figure-card-content">
                  <span className="figure-era">{figure.era}</span>
                  <h3 className="figure-name">{figure.name}</h3>
                  <p className="figure-title">{figure.title}</p>
                  <blockquote className="figure-quote">{figure.quote}</blockquote>
                  <div className="figure-factoid">
                    <p>{figure.factoid}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Create Your Own CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-primary-600/20 via-primary-500/10 to-transparent rounded-3xl p-8 sm:p-12 border border-primary-500/30 text-center">
            <div className="w-16 h-16 bg-primary-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-display-sm text-white mb-4">
              Create Your Own Historical Figure
            </h3>
            <p className="text-body-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Don't see who you're looking for? Request any historical figure from any era.
              Describe your vision and we'll bring them to life with AI-powered portraits,
              animations, and immersive environments tailored to your curriculum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={openCustomModal}
                className="cta-button inline-flex items-center gap-2"
              >
                <Sparkles size={18} />
                Request a Figure
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showSubscribeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="subscribe-modal-backdrop"
            onClick={closeSubscribeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="subscribe-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeSubscribeModal}
                className="subscribe-modal-close"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {subscriptionStatus === 'success' ? (
                <div className="subscribe-success">
                  <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                  <h3 className="text-heading-lg text-white mb-2">Subscribed!</h3>
                  <p className="text-body-md text-gray-300 mb-4">
                    We'll notify you when {subscribeFigure}'s reenactment is ready.
                  </p>
                  <button
                    onClick={closeSubscribeModal}
                    className="cta-button-secondary"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="subscribe-modal-header">
                    <Bell size={32} className="text-primary-400 mb-3" />
                    <h3 className="text-heading-lg text-white mb-2">
                      Get Notified
                    </h3>
                    <p className="text-body-md text-gray-300">
                      {subscribeFigure}'s reenactment is being generated. Subscribe to be notified when it's ready!
                    </p>
                  </div>

                  <form onSubmit={handleSubscribe} className="subscribe-form">
                    <div>
                      <label htmlFor="subscribe-email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="subscribe-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                        placeholder="you@example.com"
                      />
                    </div>

                    {subscriptionStatus === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-body-sm">
                        <AlertCircle size={18} />
                        <span>Something went wrong. Please try again.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={subscriptionStatus === 'submitting'}
                      className="cta-button w-full"
                    >
                      {subscriptionStatus === 'submitting' ? (
                        <>
                          <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Bell size={18} className="inline mr-2" />
                          Subscribe for Updates
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Figure Creation Modal */}
      <AnimatePresence>
        {showCustomModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="subscribe-modal-backdrop"
            onClick={closeCustomModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="custom-figure-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeCustomModal}
                className="subscribe-modal-close"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Step 1: Prompt */}
              {customStep === 'prompt' && (
                <div className="custom-figure-step">
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-primary-600/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-7 h-7 text-primary-400" />
                    </div>
                    <h3 className="text-heading-lg text-white mb-2">
                      Describe Your Historical Figure
                    </h3>
                    <p className="text-body-md text-gray-400">
                      Tell us who you'd like to bring to life. Be as specific as you'd like about the era, appearance, and context.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="custom-prompt" className="form-label">
                        Your Historical Figure *
                      </label>
                      <textarea
                        id="custom-prompt"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        required
                        rows={4}
                        className="form-input resize-none"
                        placeholder="e.g., Nikola Tesla in his laboratory in 1899, surrounded by electrical equipment. He should look focused and innovative, perhaps holding a glowing bulb..."
                      />
                    </div>

                    <div className="text-body-sm text-gray-500">
                      <p className="font-medium text-gray-400 mb-2">Example prompts:</p>
                      <ul className="space-y-1 text-gray-500">
                        <li>• Amelia Earhart beside her Lockheed Electra, 1937</li>
                        <li>• Alexander Hamilton at his writing desk, 1787</li>
                        <li>• Ada Lovelace working on the Analytical Engine</li>
                      </ul>
                    </div>

                    <button
                      onClick={() => customPrompt.trim() && setCustomStep('contact')}
                      disabled={!customPrompt.trim()}
                      className="cta-button w-full"
                    >
                      Continue
                      <ArrowRight size={18} className="inline ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Info */}
              {customStep === 'contact' && (
                <div className="custom-figure-step">
                  <div className="text-center mb-6">
                    <h3 className="text-heading-lg text-white mb-2">
                      Complete Your Request
                    </h3>
                    <p className="text-body-md text-gray-400">
                      We'll send you a confirmation email once your request is received.
                    </p>
                  </div>

                  {/* Request Summary */}
                  <div className="bg-dark-900/50 rounded-xl p-4 mb-6 border border-gray-800">
                    <h4 className="text-body-sm font-semibold text-gray-400 mb-3">Your Request</h4>
                    <p className="text-body-sm text-white">{customPrompt}</p>
                  </div>

                  <form onSubmit={handleCustomSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="custom-name" className="form-label">Your Name *</label>
                      <input
                        type="text"
                        id="custom-name"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        required
                        className="form-input"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="custom-email" className="form-label">Email Address *</label>
                      <input
                        type="email"
                        id="custom-email"
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        required
                        className="form-input"
                        placeholder="you@example.com"
                      />
                    </div>

                    {customStatus === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-body-sm">
                        <AlertCircle size={18} />
                        <span>Something went wrong. Please try again.</span>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCustomStep('prompt')}
                        className="cta-button-secondary flex-1"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={customStatus === 'submitting'}
                        className="cta-button flex-1"
                      >
                        {customStatus === 'submitting' ? (
                          <>
                            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                            Submitting...
                          </>
                        ) : (
                          'Submit Request'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Success */}
              {customStep === 'success' && (
                <div className="custom-figure-step text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-heading-lg text-white mb-2">
                    Request Submitted!
                  </h3>
                  <p className="text-body-md text-gray-300 mb-4">
                    Thank you, {customName}! We've received your request for a custom historical figure.
                  </p>
                  <p className="text-body-sm text-gray-400 mb-6">
                    A confirmation email will be sent to <span className="text-white">{customEmail}</span>. We'll be in touch soon to discuss bringing your figure to life.
                  </p>
                  <button
                    onClick={closeCustomModal}
                    className="cta-button"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HistoricalFigures;
