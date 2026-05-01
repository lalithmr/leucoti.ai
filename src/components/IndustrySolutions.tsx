import { motion } from 'motion/react';
import {
  BookOpen,
  Hotel,
  ShoppingBag,
  Building2,
  Stethoscope,
  Scale,
  CheckCircle2
} from 'lucide-react';

const solutions = [
  {
    title: 'Education & e-Learning',
    description: 'Our AI automation agency facilitates scalable, data-driven educations in both traditional and digital classrooms.',
    icon: BookOpen,
    features: [
      'Automated grading and feedback tool',
      'Personalized lesson plans',
      'AI teaching assistants & chatbots',
      'Student engagement tracking'
    ],
    bgImage: 'https://images.pexels.com/photos/6281165/pexels-photo-6281165.jpeg',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'Hotels & Restaurants',
    description: 'Our AI automation agency partners with hoteliers to simplify room reservations, inventory tracking and admin work.',
    icon: Hotel,
    features: [
      'Al-driven booking & reservation systems',
      'Smart room allocation',
      'Automated service feedback collection',
      'Supply chain management'
    ],
    bgImage: 'https://images.pexels.com/photos/35022073/pexels-photo-35022073.jpeg',
    color: 'from-orange-500/20 to-red-500/20'
  },
  {
    title: 'Retail & eCommerce',
    description: 'Automate store operations, retail pricing, and order fulfillment with our custom AI automation solutions.',
    icon: ShoppingBag,
    features: [
      'AI product recommendations',
      'Automated order processing',
      'Chatbots for customer queries',
      'Demand forecasting & stock optimization'
    ],
    bgImage: 'https://images.pexels.com/photos/5632382/pexels-photo-5632382.jpeg',
    color: 'from-pink-500/20 to-rose-500/20'
  },
  {
    title: 'Fintech & Banking',
    description: 'Create faster, smarter, and more secure financial operations with our AI automation services.',
    icon: Building2,
    features: [
      'Automated loan/credit approval workflows',
      'Fraud detection & anomaly alerts',
      'Customer onboarding & KYC automation',
      'Chatbots for 24/7 customer support'
    ],
    bgImage: 'https://images.pexels.com/photos/6214369/pexels-photo-6214369.jpeg',
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    title: 'Medical & Healthcare',
    description: 'Our AI automation agency helps healthcare providers to enhance patient outcomes and reduce administrative workload.',
    icon: Stethoscope,
    features: [
      'Automated clinical documentation',
      'Al-driven appointment scheduling',
      'Medical symptoms checking bots',
      'Patient support chatbots'
    ],
    bgImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    color: 'from-purple-500/20 to-indigo-500/20'
  },
  {
    title: 'Legal Research',
    description: 'Streamline legal processes and improve access to justice with our AI-powered automation solutions.',
    icon: Scale,
    features: [
      'Automated case analysis',
      'Legal document summarization',
      'E-discovery and document sorting',
      'Chatbots for legal help/form generation'
    ],
    bgImage: 'https://images.pexels.com/photos/7876087/pexels-photo-7876087.jpeg',
    color: 'from-slate-500/20 to-slate-800/20'
  }
];

export default function IndustrySolutions() {
  return (
    <section id="solutions" className="section-padding relative overflow-hidden border-b border-brand-primary/10">
      <div className="w-full px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-brand-primary" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Get Industry-Centric solutions</p>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-none">
            Our Automation agency <br /><span className="text-brand-accent italic font-serif">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-primary/10 border border-brand-primary/10">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="card-pop p-8 md:p-12 group flex flex-col h-full"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.08] group-hover:opacity-[0.2] transition-opacity duration-700 pointer-events-none mix-blend-luminosity group-hover:mix-blend-normal"
                style={{ backgroundImage: `url(${solution.bgImage})` }}
              />

              <div className="relative z-10 flex justify-between items-center mb-12">
                <div className="p-4 bg-brand-primary/5 rounded-lg group-hover:bg-brand-accent group-hover:text-white transition-colors duration-500">
                  <solution.icon className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-300">0{index + 1}</span>
              </div>

              <h3 className="relative z-10 text-2xl lg:text-3xl font-black text-brand-primary mb-6 tracking-tighter uppercase group-hover:text-brand-accent transition-colors leading-[0.9]">
                {solution.title}
              </h3>

              <p className="relative z-10 text-slate-500 group-hover:text-slate-900 text-base lg:text-lg leading-relaxed mb-10 font-medium group-hover:font-bold tracking-tight transition-all duration-300">
                {solution.description}
              </p>

              <div className="relative z-10 mt-auto pt-10 border-t border-brand-primary/5">
                <ul className="space-y-4">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-1.5 shrink-0" />
                      <span className="text-xs font-bold text-slate-500 group-hover:text-brand-primary group-hover:font-black uppercase tracking-widest leading-snug transition-all duration-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
