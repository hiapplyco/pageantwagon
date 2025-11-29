import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { fadeInUp, staggerContainer } from '../lib/animations';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await addDoc(collection(db, 'contactRequests'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', organization: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section bg-contact">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.h2
            variants={fadeInUp}
            className="text-display-md lg:text-display-lg text-white mb-8 text-hover-glow cursor-default"
          >
            Start the Conversation
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-body-lg text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Interested in bringing the Pageant Wagon to your institution or event? We'd love to hear from you.
          </motion.p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-dark-900/50 rounded-2xl p-8 border border-green-500/30"
            >
              <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
              <h3 className="text-heading-lg text-white mb-2">Message Sent!</h3>
              <p className="text-body-md text-gray-300 mb-6">We'll be in touch soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="cta-button-secondary"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="text-left space-y-6"
            >
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Organization */}
              <div>
                <label htmlFor="organization" className="form-label">Organization</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="School, Museum, or Organization name"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Tell us about your event or how we can help..."
                />
              </div>

              {/* Error State */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-red-400 text-body-sm"
                >
                  <AlertCircle size={18} />
                  <span>Something went wrong. Please try again.</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="cta-button"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="inline mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
