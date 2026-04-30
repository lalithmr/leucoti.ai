import { motion } from 'motion/react';
import { Bot, LineChart, MessageSquare, Workflow } from 'lucide-react';

const services = [
  {
    title: 'Custom AI Agents',
    description: 'Autonomous agents built to handle customer support, sales, and complex decision-making tasks.',
    icon: Bot,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'Workflow Automation',
    description: 'Connect your entire tech stack with intelligent triggers and autonomous data routing.',
    icon: Workflow,
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    title: 'Intelligent Analytics',
    description: 'Predictive modeling and real-time insights derived from your business data streams.',
    icon: LineChart,
    color: 'from-orange-500/20 to-yellow-500/20'
  },
  {
    title: 'AI Advisory',
    description: 'Strategic roadmap development to seamlessly integrate AI into your existing operations.',
    icon: MessageSquare,
    color: 'from-green-500/20 to-emerald-500/20'
  }
];

export default function Services() {
  return (
    <section id="services" className="section-padding border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16 lg:mb-24">
          <div className="lg:w-1/2">
            <h2 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter text-brand-primary leading-none">
               Protocol <br /><span className="text-brand-accent italic font-serif">& Performance.</span>
            </h2>
          </div>
          <div className="lg:w-1/2 lg:pt-12">
            <p className="text-slate-500 text-xl lg:text-2xl leading-relaxed font-medium tracking-tight">
              We don't just build automation; we architect competitive advantages via custom autonomous systems tailored for high-growth enterprises.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-primary/10 border border-brand-primary/10 overflow-hidden">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="bg-white p-8 md:p-12 hover:bg-brand-muted transition-colors duration-500 group flex flex-col justify-between min-h-[300px] md:min-h-[320px]"
            >
              <div>
                <div className="flex justify-between items-start mb-12">
                   <service.icon className="w-8 h-8 text-brand-accent" />
                   <span className="text-6xl font-black text-brand-primary/5 group-hover:text-brand-primary/10 transition-colors">0{index + 1}</span>
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tighter text-brand-primary group-hover:text-brand-accent transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed tracking-tight">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
