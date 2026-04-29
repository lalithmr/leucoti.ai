import { motion } from 'motion/react';
import { ArrowRight, Cpu, Zap, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden swiss-grid bg-brand-light">
      {/* Refined Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-accent/5 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            x: [0, -100, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-brand-primary/5 blur-[180px] rounded-full"
        />
        
        {/* Animated Grid System */}
        <div className="absolute inset-0 opacity-[0.1]">
          <svg width="100%" height="100%" className="w-full h-full">
            <defs>
              <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-brand-primary" />
                <circle cx="0" cy="0" r="1.5" fill="currentColor" className="text-brand-accent/40" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Pulse Nodes at Intersections */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`pulse-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              scale: [0, 2, 3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeOut"
            }}
            className="absolute w-4 h-4 bg-brand-accent/20 rounded-full blur-sm"
            style={{
              left: `${15 + (i * 15)%70}%`,
              top: `${10 + (i * 20)%80}%`,
            }}
          />
        ))}
        
        {/* Floating Data Nodes (Refined) */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: [0, -250],
              height: [20, 80, 20]
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
            className="absolute w-[1px] bg-gradient-to-t from-transparent via-brand-accent/50 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${-10}%`,
            }}
          />
        ))}

        {/* Data Scanner Sweep */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 5
          }}
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-brand-accent/5 to-transparent skew-x-12"
        />

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 min-h-[70vh]">
          <div className="lg:col-span-9 flex flex-col justify-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.1
                  }
                }
              }}
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex items-center gap-6 mb-12"
              >
                <div className="relative">
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping absolute inset-0 opacity-50" />
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full relative" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                  Active Neural Link
                </span>
              </motion.div>
              
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 80, rotateX: 25 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
                className="text-5xl md:text-7xl lg:text-[9.5rem] font-black leading-[0.82] tracking-tighter mb-12 lg:mb-16 text-brand-primary flex flex-col perspective-1000"
              >
                <span className="relative">
                  Engineered
                  <motion.span 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute -top-2 -right-8 md:-top-4 md:-right-20 text-[10px] md:text-sm font-mono text-slate-300 tracking-normal"
                  >
                    [0x42_SYS]
                  </motion.span>
                </span>
                <span className="flex flex-wrap items-baseline gap-2 md:gap-8 overflow-hidden">
                  for <motion.span 
                    animate={{ 
                      color: ['#003144', '#2563eb', '#003144'],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="italic font-serif leading-none pt-2 md:pt-4"
                  >
                    Growth.
                  </motion.span>
                </span>
              </motion.h1>

              <div className="max-w-3xl">
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                  className="text-xl md:text-2xl lg:text-4xl mb-12 lg:mb-16 leading-[1.1] md:leading-[1.05] font-medium tracking-tight"
                >
                  leucoti architects custom <span className="text-brand-primary font-black underline decoration-brand-accent/30 underline-offset-4 md:underline-offset-8">autonomous ecosystems</span> that optimize, scale, and transform enterprise performance at lightspeed.
                </motion.p>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="flex flex-col sm:flex-row items-center gap-6"
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.02, 
                      y: -8, 
                      backgroundColor: 'var(--color-brand-accent)',
                      boxShadow: "0 40px 60px -15px rgba(37, 99, 235, 0.4)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-12 py-6 bg-brand-primary text-white text-[12px] font-black uppercase tracking-[0.4em] relative group overflow-hidden rounded-none shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-colors duration-500"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Initialize Protocol <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" 
                    />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ 
                      y: -6, 
                      borderColor: 'rgba(37, 99, 235, 0.4)',
                      backgroundColor: 'rgba(var(--brand-primary-rgb), 0.05)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-12 py-6 border-b-2 border-slate-200 text-brand-primary font-black text-[12px] uppercase tracking-[0.4em] transition-all flex items-center gap-3 rounded-none relative group"
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Data Stack 
                    <span className="text-slate-300 font-mono tracking-normal text-[10px] ml-2 group-hover:text-brand-accent transition-colors">JSON_REVEAL</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-center lg:border-l-2 lg:border-brand-primary/5 lg:pl-16 mt-20 lg:mt-0">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.25,
                    delayChildren: 1.4
                  }
                }
              }}
              className="grid grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-12 lg:gap-24"
            >
              {[
                { val: "99.9%", label: "Uptime", sub: "STABLE" },
                { val: "3.5X", label: "ROI", sub: "GROWTH" },
                { val: "24/7", label: "AI", sub: "SYNC" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: 20, filter: 'blur(10px)' },
                    visible: { 
                      opacity: 1, 
                      x: 0, 
                      filter: 'blur(0px)',
                      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  className="group relative flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                  <div className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 w-8 h-px bg-slate-200 group-hover:w-16 group-hover:bg-brand-accent transition-all duration-700 ease-expo" />
                  <p className="text-2xl sm:text-4xl lg:text-6xl font-black text-brand-primary tracking-tighter mb-1 lg:mb-3 group-hover:text-brand-accent transition-colors duration-500">{stat.val}</p>
                  <div className="space-y-0.5 lg:space-y-1">
                    <p className="text-[8px] sm:text-[10px] lg:text-[12px] font-black text-slate-800 uppercase tracking-[0.1em] sm:tracking-[0.2em]">{stat.label}</p>
                    <p className="text-[7px] sm:text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-mono">{stat.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
