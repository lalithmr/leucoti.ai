import { motion } from 'motion/react';
import { CheckCircle2, Atom } from 'lucide-react';

const reasons = [
  'AI Automation Experts',
  'Custom AI Solutions',
  'End-to-End AI Solutions',
  'Dedicated Support',
  'Advanced Tech Stack',
  'Secure and Compliant',
  'Industry-Wide AI Solutions',
  'Cost-Efficient Deployment'
];

export default function WhyPartner() {
  return (
    <section className="section-padding bg-brand-muted border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative lg:order-2"
          >
            <div className="aspect-[4/3] overflow-hidden relative z-10 border border-brand-primary/10 rounded-xl shadow-2xl shadow-brand-primary/5">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                alt="AI Team" 
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-brand-primary/10 -z-0 hidden lg:block opacity-50" />
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:order-1"
          >
            <div className="flex items-center gap-4 mb-6">
               <div className="h-px w-10 bg-brand-primary" />
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Strategic Partnership</p>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-black text-brand-primary mb-12 tracking-tighter leading-none uppercase">
              Operational <br /><span className="text-brand-accent italic font-serif">Excellence.</span>
            </h2>
            
            <p className="text-slate-500 text-xl lg:text-2xl font-medium tracking-tight mb-14 max-w-xl leading-relaxed">
              Our artificial intelligence development company is a trusted partner for business process automation across industries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-brand-primary/10 border border-brand-primary/10">
              {reasons.map((reason, i) => (
                <div key={reason} className="bg-white p-4 md:p-6 flex items-center gap-4 group hover:bg-brand-muted transition-colors">
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0" />
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest leading-none translate-y-[1px]">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
