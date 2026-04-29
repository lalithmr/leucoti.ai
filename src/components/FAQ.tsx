import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    kettle: "How long does a typical AI integration take?",
    answer: "Most custom agents and basic workflow automations are deployed within 4-6 weeks. Enterprise-scale migrations usually range from 3-5 months depending on data complexity."
  },
  {
    kettle: "Do you offer post-deployment support?",
    answer: "Yes, we provide 24/7 technical monitoring and bi-weekly performance audits to ensure your AI models adapt to fresh data streams without drift."
  },
  {
    kettle: "Is our business data secure with your LLMs?",
    answer: "Absolutely. we utilize private VPC deployments and local processing where possible. Your data is nunca (never) used for training public foundation models."
  },
  {
    kettle: "Can you automate legacy software systems?",
    answer: "Our specialized RPA (Robotic Process Automation) layer allows us to bridge modern AI intelligence with legacy ERPs and CRMs that lack native APIs."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-brand-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-6">
               <div className="h-px w-10 bg-brand-primary" />
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Query Protocol</p>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-brand-primary tracking-tighter uppercase leading-none">
              Commonly Asked <br /><span className="text-brand-accent italic font-serif">Clarifications.</span>
            </h2>
          </div>

        <div className="space-y-0 border-t border-brand-primary/10">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border-b border-brand-primary/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono font-bold text-slate-300">0{i + 1}</span>
                  <span className={`text-lg md:text-xl font-black transition-colors uppercase tracking-tighter ${openIndex === i ? 'text-brand-accent' : 'text-brand-primary'}`}>
                    {faq.kettle}
                  </span>
                </div>
                <div className={`shrink-0 ml-4 transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`}>
                   <Plus className={`w-5 h-5 ${openIndex === i ? 'text-brand-accent' : 'text-slate-300'}`} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pl-8 md:pl-12 text-slate-500 text-xl font-medium tracking-tight leading-relaxed max-w-2xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
