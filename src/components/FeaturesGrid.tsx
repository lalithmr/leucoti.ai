import { motion } from 'motion/react';
import { Settings, Cpu, LineChart, Zap, ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Streamline Operations with Intelligent Workflows',
    description: 'Automate repetitive processes, saving hours and reducing errors. Let your team focus on high-value work.',
    icon: Settings,
  },
  {
    title: 'Custom Automation Solutions Only',
    description: 'Get AI solutions or tools built exclusively for your business; no off-the-shelf software solutions.',
    icon: Cpu,
  },
  {
    title: 'Evolve with Predictive Analytics',
    description: 'Forecast market trends and optimize resources with AI that adapts to your business growth.',
    icon: LineChart,
  },
  {
    title: 'Slash Costs with Smart Automation',
    description: 'Minimize waste and boost profitability through precision automation tailored to your business needs.',
    icon: Zap,
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="section-padding border-y border-brand-primary/10">
      <div className="w-full px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-end justify-between mb-16 lg:mb-24 gap-8"
        >
          <div className="max-w-3xl">
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-brand-primary leading-none mb-10">
              Systematic <br /><span className="text-brand-accent italic font-serif">Excellence.</span>
            </h2>
            <p className="text-slate-500 text-xl lg:text-2xl font-medium tracking-tight leading-relaxed">
              Our artificial intelligence development services deliver data-driven automation and predictive analytics for elite performance.
            </p>
          </div>
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em] hidden md:block">
            Architectural Approach
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-brand-primary/10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.15)",
                borderColor: "rgba(37, 99, 235, 0.4)"
              }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="card-pop p-8 md:p-12 group cursor-pointer h-full flex flex-col"
            >
              <div className="text-[10px] font-mono font-bold text-brand-primary group-hover:text-brand-accent mb-12 transition-colors">
                0{index + 1}
              </div>
              <div className="mb-10">
                <motion.div
                  whileHover={{
                    scale: [1.15, 1.05, 1.15],
                    filter: [
                      "drop-shadow(0 0 0px rgba(255,255,255,0))",
                      "drop-shadow(0 0 15px rgba(255,255,255,0.6))",
                      "drop-shadow(0 0 0px rgba(255,255,255,0))"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <feature.icon className="w-10 h-10 text-brand-accent group-hover:text-brand-tertiary transition-colors" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-black text-brand-primary group-hover:text-brand-accent mb-6 tracking-tighter transition-colors uppercase leading-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-base leading-relaxed group-hover:text-slate-800 transition-colors font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
