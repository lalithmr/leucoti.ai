import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { 
  ChevronDown, 
  Navigation, 
  Search, 
  Database, 
  Cpu, 
  Code, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { useRef, useState } from 'react';

const steps = [
  {
    number: '1',
    title: 'Identify Business Needs',
    description: 'Understand your unique business architecture and identify high-leverage points for AI automation – inventory, customer support, or complex logistics.',
    icon: Search,
  },
  {
    number: '2',
    title: 'Prepare Robust Data',
    description: 'Source, clean, and format data at scale. We architect data pipelines that feed high-fidelity training sets into specialized neural environments.',
    icon: Database,
  },
  {
    number: '3',
    title: 'Train AI Models',
    description: 'Fine-tune proprietary models using your business logic. We deliver specialized intelligence that outperforms generalized foundation models.',
    icon: Cpu,
  },
  {
    number: '4',
    title: 'Integrate into Workflows',
    description: 'Seamless integration via secure APIs into your existing stack. We ensure zero-friction handovers between human and machine logic.',
    icon: Code,
  },
  {
    number: '5',
    title: 'Monitor AI Solution',
    description: 'Real-time observability and autonomous optimization. We ensure your systems adapt and evolve alongside your scaling business needs.',
    icon: Activity,
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const markerTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      id="process"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 lg:mb-32"
        >
          <div className="flex items-center gap-4 mb-6">
             <div className="h-px w-10 bg-brand-primary" />
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Protocol Execution</p>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-none">
            Structural <br /><span className="text-brand-accent italic font-serif">Methodology.</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated Progress Track */}
          <div className="absolute left-4 lg:left-8 top-0 bottom-0 w-px bg-slate-100 hidden sm:block">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 w-full bg-brand-accent origin-top shadow-[0_0_10px_rgba(37,99,235,0.4)]"
            />
            {/* Moving Head */}
            <motion.div 
              style={{ y: markerTransform }}
              className="absolute -left-1.5 top-0 w-4 h-4 bg-brand-primary flex items-center justify-center rotate-45 z-10"
            >
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
            </motion.div>
          </div>

          <div className="space-y-12 lg:space-y-32 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                onMouseEnter={() => setHoveredStep(step.number)}
                onMouseLeave={() => setHoveredStep(null)}
                className="group relative sm:pl-20 lg:pl-32"
              >
                {/* Node with Ring */}
                <div className="absolute left-3.5 lg:left-7.5 top-8 w-1 h-1 bg-brand-accent rounded-full hidden sm:block z-20" />
                <motion.div 
                  animate={{ 
                    scale: hoveredStep === step.number ? 1.5 : 1,
                    opacity: hoveredStep === step.number ? 1 : 0 
                  }}
                  className="absolute left-2.5 lg:left-6.5 top-7 w-3 h-3 border border-brand-accent rounded-full hidden sm:block z-10"
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start p-6 lg:p-10 bg-slate-50/0 hover:bg-slate-50/50 transition-colors duration-500 rounded-none border border-transparent hover:border-slate-100">
                  <div className="lg:col-span-2 flex items-center gap-6 lg:block">
                    <span className={`text-[40px] lg:text-[100px] font-black leading-none transition-all duration-700 ${hoveredStep === step.number ? 'text-brand-accent' : 'text-slate-100'}`}>
                      0{step.number}
                    </span>
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center border transition-all duration-500 ${hoveredStep === step.number ? 'border-brand-accent bg-brand-accent text-white' : 'border-slate-200 text-slate-400'}`}>
                      <step.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                  </div>
                  
                  <div className="lg:col-span-10">
                    <div className="max-w-3xl">
                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-brand-primary mb-3 lg:mb-6 tracking-tighter leading-tight uppercase group-hover:text-brand-accent transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-base lg:text-xl font-medium tracking-tight text-slate-500 leading-relaxed max-w-2xl">
                        {step.description}
                      </p>
                      
                      <motion.div 
                        animate={{ x: hoveredStep === step.number ? 10 : 0, opacity: hoveredStep === step.number ? 1 : 0 }}
                        className="mt-6 flex items-center gap-3 text-brand-accent font-black text-[10px] uppercase tracking-widest"
                      >
                        Initiate Phase {step.number} <ArrowRight className="w-3 h-3" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="h-px w-full bg-slate-100 mt-12 sm:hidden" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
