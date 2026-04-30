import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'leucoti Logistics AI',
    category: 'Supply Chain',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    tags: ['Next.js', 'Python', 'Forecasting']
  },
  {
    title: 'MedFlow Automator',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    tags: ['NLP', 'HIPAA', 'Analytics']
  }
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding border-b border-brand-primary/10 bg-brand-primary/[0.02]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-end justify-between mb-16 lg:mb-24 gap-8"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
               <div className="h-px w-10 bg-brand-primary" />
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Case Archives</p>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-brand-primary tracking-tighter leading-none mb-4">
              System <br /><span className="text-brand-accent italic font-serif">Deployment.</span>
            </h2>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-4 transition-all"
          >
            Archive <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-5xl">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-8 border border-brand-primary/10 rounded-xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white border border-brand-primary/10 text-[9px] font-bold text-brand-primary uppercase tracking-widest w-fit">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-brand-primary/10 pt-6">
                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-2">{project.category}</p>
                <h3 className="text-2xl font-black text-brand-primary tracking-tighter group-hover:text-brand-accent transition-colors uppercase">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
