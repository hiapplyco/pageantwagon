import { motion } from 'framer-motion';

interface ContentSectionProps {
  id: string;
  backgroundImage: string;
  title: string;
  children: React.ReactNode;
}

const ContentSection = ({ id, backgroundImage, title, children }: ContentSectionProps) => {
  return (
    <section id={id} className="section">
      <img
        src={backgroundImage}
        alt={title}
        className="section-background"
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
            {title}
          </h2>
          <div className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContentSection;
