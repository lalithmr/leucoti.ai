import { motion } from 'motion/react';

const stats = [
  { label: 'Processes Automated', value: '500+', sublabel: 'Across 12 industries' },
  { label: 'Client ROI', value: '310%', sublabel: 'Average first-year return' },
  { label: 'Hours Saved', value: '1.2M', sublabel: 'Estimated annual impact' },
  { label: 'Uptime Guarantee', value: '99.9%', sublabel: 'Enterprise-grade reliability' },
];

export default function StatsSection() {
  return (
    <section className="section-padding bg-white border-b border-brand-primary/10 swiss-grid">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-brand-primary/10 shadow-2xl shadow-brand-primary/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-12 border-brand-primary/10 group hover:bg-brand-muted transition-colors duration-500
                [&:not(:nth-child(2n))]:border-r sm:[&:not(:nth-child(2n))]:border-r
                lg:[&:not(:nth-child(4n))]:border-r
                [&:not(:nth-last-child(-n+2))]:border-b lg:[&:not(:nth-last-child(-n+4))]:border-b"
            >
              <div className="text-5xl md:text-6xl font-black text-brand-primary mb-6 tracking-tighter group-hover:text-brand-accent transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">
                {stat.label}
              </div>
              <div className="h-px w-8 bg-brand-accent mx-auto mb-3" />
              <div className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
