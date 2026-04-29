import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Bot, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Process', href: '#process' },
    { name: 'Projects', href: '#projects' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav 
      id="navbar" 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 ${
        isScrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-none overflow-hidden ${
        isScrolled 
          ? 'glass-strong border border-brand-primary/10 shadow-lg scale-[0.98] md:scale-100' 
          : 'bg-transparent border border-transparent'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 sm:px-8 md:px-10 lg:px-12">
          <div 
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-brand-primary flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
               <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <span className="font-black text-lg sm:text-xl tracking-tighter text-brand-primary uppercase">LEUCOTI</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center gap-6 lg:gap-10">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -3, color: '#2563eb' }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="text-[10px] lg:text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] lg:tracking-[0.3em] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: '#2563eb',
                  boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.2)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="px-6 lg:px-8 py-2.5 lg:py-3 bg-brand-primary text-white transition-all text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] lg:tracking-[0.3em] rounded-none"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Inquiry
              </motion.button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-primary p-2"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden glass-strong border border-brand-primary/10 mt-2 p-8 space-y-8 rounded-none shadow-2xl shadow-brand-primary/10"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ x: 4 }}
                  className="block text-[11px] font-black text-brand-primary uppercase tracking-[0.4em]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-brand-primary text-white py-5 font-black text-[11px] uppercase tracking-[0.3em] rounded-none"
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Inquiry
              </motion.button>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
