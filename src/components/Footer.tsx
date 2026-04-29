import { motion } from 'motion/react';
import { Bot, Github, Twitter, Linkedin, Mail, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-24 lg:py-32 bg-brand-light border-t border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 lg:gap-20 mb-24 lg:mb-32">
          <div className="col-span-1 md:col-span-2">
            <div 
              className="flex items-center gap-4 mb-10 cursor-pointer group w-fit"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
               <div className="w-12 h-12 bg-brand-primary flex items-center justify-center rounded-none rotate-45 group-hover:rotate-0 transition-transform duration-500">
                  <Bot className="w-7 h-7 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
               </div>
               <span className="font-black text-3xl tracking-tighter text-brand-primary uppercase">LEUCOTI</span>
            </div>
            <p className="text-slate-500 font-medium tracking-tight max-w-sm mb-12 text-xl leading-relaxed">
              Neuro-infrastructure for the businesses of tomorrow. 
              Modern automation for the intelligent enterprise.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ 
                    scale: 1.1, 
                    y: -6,
                    color: "var(--color-brand-accent)",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="p-3 border border-brand-primary/10 hover:bg-slate-900 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black mb-8 text-brand-primary text-[10px] uppercase tracking-[0.4em]">Protocols</h4>
            <ul className="space-y-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              {['Custom AI Agents', 'Workflow Optimization', 'Strategic Deployment', 'Analytics Systems'].map((link) => (
                <motion.li 
                  key={link} 
                  whileHover={{ 
                    scale: 1.05,
                    x: 4,
                    color: "var(--color-brand-primary)"
                  }} 
                  className="w-fit"
                >
                  <a href="#" className="hover:text-brand-accent transition-colors">{link}</a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-8 text-brand-primary text-[10px] uppercase tracking-[0.4em]">Relay</h4>
            <ul className="space-y-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-accent" />
                info@leucoti.com
              </li>
              <li>Silicon Valley, CA</li>
              <li>Innovation Hub 4.0</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-primary/10 flex flex-col md:flex-row justify-between gap-8 text-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest text-center">
          <p>© 2026 leucoti AI Systems Architecture. Operational.</p>
          <div className="flex justify-center gap-10">
            {['Privacy_Protocol', 'Terms_Execution'].map((policy) => (
              <motion.a 
                key={policy}
                href="#" 
                whileHover={{ 
                  scale: 1.05,
                  y: -3, 
                  color: 'var(--color-brand-primary)',
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="hover:text-brand-primary transition-colors px-2 py-1 flex items-center gap-2 group"
              >
                <motion.span
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <FileText className="w-3 h-3 text-slate-300 group-hover:text-brand-accent transition-colors" />
                </motion.span>
                {policy}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
