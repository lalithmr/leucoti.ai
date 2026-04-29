import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Zap, Shield, Code, Search } from 'lucide-react';

const models = [
  { 
    name: 'Gemini', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Google_Gemini_icon_2025.svg',
    feature: 'Multimodal',
    description: 'DeepMind\'s most capable multimodal model, optimized for complex reasoning and long-context understanding.',
    capabilities: ['2M+ token context window', 'Native multimodality', 'Advanced logical reasoning'],
    useCases: ['Large codebase analysis', 'Complex document processing', 'Video understanding'],
    icon: Zap
  },
  { 
    name: 'ChatGPT', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    feature: 'Reasoning',
    description: 'OpenAI\'s flagship model offering industry-leading performance in conversational AI and complex problem solving.',
    capabilities: ['State-of-the-art reasoning', 'Highly creative generation', 'Robust plugin ecosystem'],
    useCases: ['Creative writing', 'General assistance', 'Strategic planning'],
    icon: Code
  },
  { 
    name: 'Claude', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg',
    feature: 'Safety',
    description: 'Anthropic\'s high-performance model focused on reliability, safety, and nuanced instruction following.',
    capabilities: ['Constitutional AI safety', 'Exceptional nuance handling', 'Large context window'],
    useCases: ['Legal document review', 'Risk assessment', 'Precision writing'],
    icon: Shield
  },
  { 
    name: 'Llama 3.1', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    feature: 'Open Source',
    description: 'Meta\'s state-of-the-art open source model, enabling customizable AI at scale.',
    capabilities: ['Fully open weights', 'Optimized for local hosting', 'Broad language support'],
    useCases: ['Self-hosted AI solutions', 'Fine-tuning projects', 'Cost-effective scaling'],
    icon: Zap
  },
  { 
    name: 'Mistral', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Mistral_AI_logo_%282025%E2%80%93%29.svg',
    feature: 'Efficiency',
    description: 'European-born AI designed for high efficiency and impressive performance with smaller model sizes.',
    capabilities: ['Unmatched efficiency', 'Specialized coding models', 'Data sovereignty focused'],
    useCases: ['Edge computing', 'Optimized inference', 'European compliance'],
    icon: Code
  },
  { 
    name: 'DeepSeek', 
    logo: 'https://www.deepseek.com/favicon.ico',
    feature: 'Logic',
    description: 'Advanced Chinese model specialized in mathematics, logic, and professional coding tasks.',
    capabilities: ['Superior math reasoning', 'Deep coding knowledge', 'Logic-heavy processing'],
    useCases: ['Software development', 'Scientific research', 'Mathematical proofs'],
    icon: Search
  },
  { 
    name: 'Perplexity', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Perplexity_AI_logo.svg',
    feature: 'Search',
    description: 'AI-powered answer engine that searches the web in real-time to provide cited, accurate information.',
    capabilities: ['Real-time web search', 'Source citations', 'Multi-source synthesis'],
    useCases: ['Active research', 'Fact checking', 'Real-time monitoring'],
    icon: Search
  },
  { 
    name: 'Firefly', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adobe_Firefly_Logo.svg',
    feature: 'Creative',
    description: 'Adobe\'s generative AI built specifically for safe, high-quality creative asset production.',
    capabilities: ['Commercial-safe generation', 'Native Adobe integration', 'Hyper-realistic output'],
    useCases: ['Brand asset generation', 'Photo manipulation', 'Concept art'],
    icon: Zap
  },
];

const SkeletonItem = () => (
  <div className="flex items-center gap-4 px-8 py-3 animate-pulse">
    <div className="h-4 w-32 bg-slate-100 rounded" />
  </div>
);

const LazyLogo = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse rounded-full w-6 h-6" />
      )}
      <img 
        src={src} 
        alt={alt} 
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default function ModelCarousel() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<typeof models[0] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Triple the array to create a long seamless loop
  const duplicatedModels = [...models, ...models, ...models];

  return (
    <div className="section-padding border-y border-brand-primary/5 overflow-hidden relative bg-white">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/40 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/40 to-transparent z-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 lg:mb-24 flex flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center items-center gap-6 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-slate-200 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Top-rated on</span>
            <span className="text-sm font-black text-brand-primary tracking-tight">Clutch</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 fill-orange-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-600">4.9/5</span>
          </div>
          <div className="h-4 w-px bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Verified by</span>
            <span className="text-sm font-black bg-gradient-to-r from-blue-700 via-red-600 to-yellow-500 bg-clip-text text-transparent">Google Search</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 fill-orange-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-primary/10" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.6em] whitespace-nowrap">
            Integrated Intelligence Stack
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-primary/10" />
        </div>
      </div>

      <div className="flex py-4">
        {isLoading ? (
          <div className="flex gap-24 items-center whitespace-nowrap px-12">
            {[...Array(8)].map((_, i) => (
              <SkeletonItem key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              x: ["0%", "-33.33%"],
            }}
            transition={{
              opacity: { duration: 1 },
              x: {
                duration: 80,
                repeat: Infinity,
                ease: "linear",
              }
            }}
            className="flex gap-24 items-center whitespace-nowrap px-16"
          >
            {duplicatedModels.map((model, index) => {
              const isActive = selectedModel?.name === model.name;
              return (
                <motion.button
                  key={`${model.name}-${index}`}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: isActive ? 'var(--color-brand-primary)' : 'rgba(248, 250, 252, 0.8)',
                    y: isActive ? -4 : -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedModel(model)}
                  animate={isActive ? {
                    y: [-4, -8, -4],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  } : { y: 0 }}
                  className={`flex items-center gap-3 md:gap-6 group cursor-pointer px-4 py-2 md:px-10 md:py-5 rounded-none transition-all duration-500 outline-none relative ${
                    isActive 
                      ? 'bg-brand-primary text-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)] z-10' 
                      : 'hover:bg-slate-50 border-l-2 border-transparent hover:border-brand-accent/40'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-glow"
                      className="absolute inset-0 bg-brand-accent/10 blur-xl -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                  <div className="flex flex-col items-start relative">
                    <div className="flex items-center gap-2 md:gap-4">
                      <span className={`text-base md:text-2xl font-black transition-all tracking-tighter uppercase ${
                        isActive ? 'text-white' : 'text-slate-700 group-hover:text-brand-primary group-hover:tracking-normal'
                      }`}>
                        {model.name}
                      </span>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="w-2 md:w-2.5 h-2 md:h-2.5 bg-brand-accent rounded-full shadow-[0_0_12px_rgba(var(--brand-accent-rgb),0.8)]"
                        />
                      )}
                    </div>
                    <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[.3em] mt-0.5 md:mt-1 transition-colors ${
                      isActive ? 'text-brand-accent animate-pulse' : 'text-slate-500 group-hover:text-brand-accent/60'
                    }`}>
                      {model.feature}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedModel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-2 bg-brand-primary" />
              <div className="p-8 md:p-12">
                <div className="flex items-start justify-between mb-12">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                      <LazyLogo 
                        src={selectedModel.logo} 
                        alt={selectedModel.name} 
                        className="h-10 w-auto !opacity-100"
                      />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-brand-primary tracking-tighter uppercase mb-1">
                        {selectedModel.name}
                      </h3>
                      <p className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em]">
                        {selectedModel.feature} Specialist
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedModel(null)}
                    className="p-2 hover:bg-slate-50 transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-12">
                  <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                    {selectedModel.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="flex items-center gap-3 text-xs font-black text-brand-primary uppercase tracking-[0.3em] mb-6">
                        <selectedModel.icon className="w-4 h-4 text-brand-accent" />
                        Core Capabilities
                      </h4>
                      <ul className="space-y-4">
                        {selectedModel.capabilities.map((cap) => (
                          <li key={cap} className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-3 text-xs font-black text-brand-primary uppercase tracking-[0.3em] mb-6">
                        <ExternalLink className="w-4 h-4 text-brand-accent" />
                        Key Use Cases
                      </h4>
                      <ul className="space-y-4">
                        {selectedModel.useCases.map((useCase) => (
                          <li key={useCase} className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                            <div className="w-1.5 h-1.5 bg-brand-primary/20 rounded-full" />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100 flex justify-end">
                    <button 
                      onClick={() => setSelectedModel(null)}
                      className="px-8 py-4 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-slate-900 active:scale-95"
                    >
                      Close Overview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
