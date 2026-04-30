import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "The team was super responsive and dedicated to solving all of our requirements on time and on budget.",
    author: "Billy Vaughn",
    role: "Founder, Extremewheels",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  },
  {
    text: "Very helpful people who guided us well and helped us build our first tool.",
    author: "Denise Kreft",
    role: "Brand Strategy + Communications",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    text: "They helped me build systems that boosted efficiency and sales. Very communicative, available, and easy to work with.",
    author: "Shanti Chadha",
    role: "VP of Operations, 1/2 Price Movers",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    text: "They always treat our projects as if they're a part of us, with the same pride and commitment to excellence we have.",
    author: "Jeff Baietto",
    role: "COO & Co-Founder, InJoy Global",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="section-padding border-b border-brand-primary/10 bg-brand-primary/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20 items-start mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-4 mb-6">
               <div className="h-px w-10 bg-brand-primary" />
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Review Protocol</p>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-brand-primary mb-10 tracking-tighter uppercase leading-none">
              Client <br /><span className="text-brand-accent italic font-serif">Feedback.</span>
            </h2>
            <p className="text-slate-500 text-xl lg:text-2xl font-medium tracking-tight mb-10 max-w-sm leading-relaxed">
              Discover the voices of our satisfied clients as they recount their journeys with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-primary/10 border border-brand-primary/10">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 md:p-12 hover:bg-brand-muted transition-colors duration-500"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-brand-accent text-brand-accent" />
                  ))}
                </div>
                <p className="text-xl font-bold text-brand-primary leading-tight mb-12 tracking-tight">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-6 pt-8 border-t border-brand-primary/5">
                  <div className="w-12 h-12 bg-slate-100 flex-shrink-0 grayscale">
                    <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="font-black text-brand-primary text-[10px] uppercase tracking-widest">{t.author}</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
