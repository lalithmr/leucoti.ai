import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const impacts = [
  {
    title: 'Dynamic Scalability',
    description: 'Our AI solutions grow with your business, delivering long-term business value.'
  },
  {
    title: 'Next-Gen Technology',
    description: 'Use cutting-edge AI tech stack to gain competitive advantage in the industry.'
  },
  {
    title: 'Predictive Insights',
    description: 'Our automation continuously optimizes outcomes based on market insights.'
  }
];

export default function ImpactCTA() {
  return (
    <section className="relative overflow-hidden pt-32 lg:pt-48 bg-brand-primary/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-32 lg:mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
               <div className="h-px w-10 bg-brand-primary" />
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Impact Analysis</p>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-brand-primary mb-12 tracking-tighter leading-none uppercase">
              Drive Real <br /><span className="text-brand-accent italic font-serif">Performance.</span>
            </h2>
            <p className="text-slate-500 text-xl lg:text-2xl font-medium tracking-tight mb-14 max-w-lg leading-relaxed">
              Our AI automation agency delivers custom protocols to drive measurable growth and long-term systemic success.
            </p>

            <div className="space-y-12">
              {impacts.map((impact) => (
                <div key={impact.title} className="flex gap-8 group pt-8 border-t border-brand-primary/10">
                  <span className="text-[10px] font-mono font-bold text-brand-accent">PROTOCOL_ON</span>
                  <div>
                    <h3 className="text-2xl font-black text-brand-primary mb-4 tracking-tighter uppercase">{impact.title}</h3>
                    <p className="text-slate-500 text-base font-medium tracking-tight leading-relaxed">{impact.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden border border-brand-primary/10 rounded-xl grayscale hover:grayscale-0 transition-all duration-1000">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop" 
                alt="Working on AI" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-accent/5 blur-3xl -z-10" />
          </motion.div>

        </div>
      </div>

      <div className="bg-brand-accent py-32 lg:py-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 text-white">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none uppercase max-w-3xl">
            Scale your infrastructure with <span className="italic opacity-80 underline decoration-white/30 underline-offset-8 font-serif">autonomous protocols.</span>
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 25px 35px -5px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            className="px-12 py-6 bg-white text-brand-accent text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-6 shadow-sm transition-all rounded-none"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Initiate Contact <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
