import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, MessageSquare, Loader2 } from 'lucide-react';

type SectionKey = 'hero' | 'features' | 'process' | 'solutions' | 'projects' | 'faq' | 'contact' | 'services' | 'default';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const sectionData: Record<SectionKey, { color: string; text: string; position: { x: string; y: string } }> = {
  'hero': { color: '#3B82F6', text: 'Hi! I am your AI assistant. Click me to chat!', position: { x: '75vw', y: '75vh' } },
  'features': { color: '#8B5CF6', text: 'Want to know more about our features?', position: { x: '10vw', y: '75vh' } },
  'process': { color: '#10B981', text: 'Our process is fully automated.', position: { x: '75vw', y: '50vh' } },
  'solutions': { color: '#F59E0B', text: 'Looking for a specific solution?', position: { x: '15vw', y: '60vh' } },
  'projects': { color: '#EC4899', text: 'Ask me about our past work!', position: { x: '75vw', y: '85vh' } },
  'faq': { color: '#06B6D4', text: 'I can answer your questions!', position: { x: '10vw', y: '80vh' } },
  'contact': { color: '#000000', text: 'Ready to connect? Chat with me.', position: { x: '65vw', y: '65vh' } },
  'services': { color: '#8B5CF6', text: 'Explore our AI services.', position: { x: '10vw', y: '40vh' } },
  'default': { color: '#3B82F6', text: 'How can I help you today?', position: { x: '75vw', y: '75vh' } }
};

const predefinedResponses: Record<string, string> = {
  'pricing': 'Our custom AI solutions are tailored to your needs. Let us schedule a quick discovery call to give you a precise quote!',
  'contact': 'You can reach us through the form at the bottom of the page, or email us at hello@leucoti.com.',
  'service': 'We specialize in building autonomous AI ecosystems, intelligent workflows, and predictive analytics models.',
  'hello': 'Hello there! Welcome to Leucoti. How can I assist you today?',
  'hi': 'Hi! I am the Leucoti AI. What would you like to know?',
  'default': 'That is a great question! I am still learning, but our human team would love to discuss this with you. Please reach out via the contact section!'
};

export default function RobotAssistant() {
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Hello! I am the Leucoti AI Assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxIntersectionRatio = 0;
        let visibleSection: SectionKey | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            visibleSection = entry.target.id as SectionKey;
          }
        });

        if (visibleSection && sectionData[visibleSection]) {
          setActiveSection(visibleSection);
        } else if (visibleSection) {
          setActiveSection('default');
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7, 0.9], rootMargin: '-20% 0px -20% 0px' }
    );

    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const data = sectionData[activeSection] || sectionData['default'];

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newUserMessage: Message = { id: Date.now().toString(), sender: 'user', text: userText };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simple mock logic for bot response
    setTimeout(() => {
      const lowerText = userText.toLowerCase();
      let responseText = predefinedResponses['default'];

      for (const key in predefinedResponses) {
        if (lowerText.includes(key)) {
          responseText = predefinedResponses[key];
          break;
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'bot', text: responseText }
      ]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5 to 2.5s delay
  };

  // On mobile, keep it strictly fixed to bottom-right to prevent overflowing the screen when scrolling.
  // On desktop, use the dynamic positioning.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div
      className="fixed z-[100] flex flex-col items-end gap-3 pointer-events-auto"
      // Disable dragging when chat is open to avoid conflicts with interacting with the chat UI
      drag={!isChatOpen}
      dragConstraints={{ left: 10, right: typeof window !== 'undefined' ? window.innerWidth - 90 : 1000, top: 10, bottom: typeof window !== 'undefined' ? window.innerHeight - 90 : 800 }}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 200)}
      initial={isMobile ? { bottom: '24px', right: '24px' } : { x: '50vw', y: '100vh', opacity: 0 }}
      animate={
        isMobile
          ? { bottom: '24px', right: '24px', opacity: 1 }
          : {
            x: isChatOpen ? 'calc(100vw - 420px)' : data.position.x,
            y: isChatOpen ? 'calc(100vh - 600px)' : data.position.y,
            opacity: 1
          }
      }
      transition={{
        x: { type: 'spring', stiffness: 50, damping: 20 },
        y: { type: 'spring', stiffness: 50, damping: 20 },
        opacity: { duration: 1 }
      }}
      style={isMobile ? { position: 'fixed', bottom: '24px', right: '24px' } : { position: 'fixed', top: 0, left: 0 }}
    >
      <AnimatePresence mode="wait">
        {isChatOpen ? (
          /* Chat Window */
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col w-[350px] sm:w-[380px] h-[500px] max-h-[80vh]"
            style={{ transformOrigin: 'bottom right' }}
          >
            {/* Chat Header */}
            <div className="bg-brand-primary p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center p-1.5">
                  <svg viewBox="0 0 463.00 463.00" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M207.5,127c4.143,0,7.5-3.358,7.5-7.5v-8c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v8 C200,123.642,203.357,127,207.5,127z" /> <path d="M255.5,127c4.143,0,7.5-3.358,7.5-7.5v-8c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v8 C248,123.642,251.357,127,255.5,127z" /> <path d="M386.854,312.792L375,306.865v-69.099c9.29-3.138,16-11.93,16-22.266c0-12.958-10.542-23.5-23.5-23.5H335v-8.5 c0-4.142-3.357-7.5-7.5-7.5H311v-40.5c0-26.05-12.595-49.213-32.014-63.721C278.989,71.686,279,71.594,279,71.5V45.766 c9.29-3.138,16-11.93,16-22.266C295,10.542,284.458,0,271.5,0S248,10.542,248,23.5c0,10.336,6.71,19.128,16,22.266v17.209 C254.07,58.507,243.076,56,231.5,56s-22.57,2.507-32.5,6.975V45.766c9.29-3.138,16-11.93,16-22.266C215,10.542,204.458,0,191.5,0 S168,10.542,168,23.5c0,10.336,6.71,19.128,16,22.266V71.5c0,0.094,0.011,0.186,0.014,0.279C164.595,86.287,152,109.45,152,135.5 V176h-16.5c-4.143,0-7.5,3.358-7.5,7.5v8.5H95.5C82.542,192,72,202.542,72,215.5c0,10.336,6.71,19.128,16,22.266v69.099 l-11.854,5.927c-2.54,1.27-4.146,3.867-4.146,6.708v24c0,2.841,1.605,5.438,4.146,6.708l16,8c1.077,0.539,2.222,0.793,3.349,0.793 c2.751,0,5.4-1.52,6.714-4.147c1.853-3.705,0.351-8.21-3.354-10.062L87,338.865v-14.729l8.5-4.25l8.5,4.25V335.5 c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16c0-2.841-1.605-5.438-4.146-6.708L103,306.865V239h25v32.5 c0,26.05,12.595,49.213,32.014,63.721c-0.003,0.093-0.014,0.185-0.014,0.279v48c0,10.336,6.71,19.128,16,22.266V416h-16.5 c-2.807,0-5.378,1.566-6.665,4.06L138.415,448H135.5c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h72c4.143,0,7.5-3.358,7.5-7.5 v-32c0-4.142-3.357-7.5-7.5-7.5H191v-10.234c9.29-3.138,16-11.93,16-22.266v-32.513c0.167,0.001,0.332,0.013,0.5,0.013h48 c0.168,0,0.333-0.012,0.5-0.013V383.5c0,10.336,6.71,19.128,16,22.266V416h-16.5c-4.143,0-7.5,3.358-7.5,7.5v32 c0,4.142,3.357,7.5,7.5,7.5h72c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-2.915l-14.42-27.94 c-1.287-2.494-3.858-4.06-6.665-4.06H287v-10.234c9.29-3.138,16-11.93,16-22.266v-48c0-0.094-0.011-0.186-0.014-0.279 C322.405,320.713,335,297.55,335,271.5V239h25v67.865l-11.854,5.927c-2.54,1.27-4.146,3.867-4.146,6.708v16 c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-11.365l8.5-4.25l8.5,4.25v14.729l-11.854,5.927 c-3.704,1.852-5.206,6.357-3.354,10.062c1.313,2.628,3.963,4.148,6.714,4.147c1.127,0,2.271-0.255,3.349-0.793l16-8 c2.54-1.27,4.146-3.867,4.146-6.708v-24C391,316.659,389.395,314.062,386.854,312.792z M271.5,15c4.687,0,8.5,3.813,8.5,8.5 s-3.813,8.5-8.5,8.5s-8.5-3.813-8.5-8.5S266.813,15,271.5,15z M191.5,15c4.687,0,8.5,3.813,8.5,8.5s-3.813,8.5-8.5,8.5 s-8.5-3.813-8.5-8.5S186.813,15,191.5,15z M200,448h-44.705l8.774-17H200V448z M307.705,448H263v-17h35.931L307.705,448z M367.5,224c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5S372.187,224,367.5,224z M231.5,71 c35.565,0,64.5,28.935,64.5,64.5v8.5H167v-8.5C167,99.935,195.935,71,231.5,71z M167,159h129v17H167V159z M95.5,207 c4.687,0,8.5,3.813,8.5,8.5s-3.813,8.5-8.5,8.5s-8.5-3.813-8.5-8.5S90.813,207,95.5,207z M117.403,224 c1.027-2.638,1.597-5.503,1.597-8.5s-0.57-5.862-1.597-8.5H128v17H117.403z M183.5,392c-4.687,0-8.5-3.813-8.5-8.5 s3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5S188.187,392,183.5,392z M192,361.597c-2.638-1.027-5.503-1.597-8.5-1.597 s-5.862,0.57-8.5,1.597v-17.572c5.38,2.421,11.069,4.27,17,5.447V361.597z M143,271.5V191h81v25h-24.5 c-17.369,0-31.5,14.131-31.5,31.5s14.131,31.5,31.5,31.5H224v57h-16.5C171.935,336,143,307.065,143,271.5z M199.5,264 c-9.098,0-16.5-7.402-16.5-16.5s7.402-16.5,16.5-16.5h64c9.098,0,16.5,7.402,16.5,16.5s-7.402,16.5-16.5,16.5H199.5z M279.5,392 c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5S284.187,392,279.5,392z M288,361.597 c-2.638-1.027-5.503-1.597-8.5-1.597s-5.862,0.57-8.5,1.597v-12.125c5.931-1.177,11.62-3.026,17-5.447V361.597z M320,271.5 c0,35.565-28.935,64.5-64.5,64.5H239v-57h24.5c17.369,0,31.5-14.131,31.5-31.5S280.869,216,263.5,216H239v-25h81V271.5z M335,207 h10.597c-1.027,2.638-1.597,5.503-1.597,8.5s0.57,5.862,1.597,8.5H335V207z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight leading-none">TinkAI</h3>
                  <span className="text-[10px] text-brand-accent font-medium mt-0.5 block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                      ? 'bg-brand-primary text-white rounded-br-sm'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-brand-primary text-white p-2.5 rounded-full hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
              >
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        ) : (
          /* Tooltip Bubble */
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="bg-white/90 backdrop-blur-md text-slate-800 text-sm font-semibold py-3 px-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-white/40 max-w-[220px] text-center pointer-events-none mb-1 mr-4"
            style={{ transformOrigin: 'bottom right' }}
          >
            {data.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Character Button */}
      <motion.button
        className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 focus:outline-none ${isMobile ? 'cursor-pointer' : (isChatOpen ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing')}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!isDragging) {
            setIsChatOpen(!isChatOpen);
          }
        }}
        animate={{
          y: isChatOpen ? 0 : [0, -12, 0],
          color: isChatOpen ? '#003144' : data.color,
          filter: isChatOpen ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' : `drop-shadow(0 10px 15px ${data.color}40)`
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          color: { duration: 0.8, ease: 'easeInOut' }
        }}
      >
        <div className="relative w-full h-full">
          <svg viewBox="0 0 463.00 463.00" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transition-colors duration-500 relative z-10">
            <path d="M207.5,127c4.143,0,7.5-3.358,7.5-7.5v-8c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v8 C200,123.642,203.357,127,207.5,127z" /> <path d="M255.5,127c4.143,0,7.5-3.358,7.5-7.5v-8c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v8 C248,123.642,251.357,127,255.5,127z" /> <path d="M386.854,312.792L375,306.865v-69.099c9.29-3.138,16-11.93,16-22.266c0-12.958-10.542-23.5-23.5-23.5H335v-8.5 c0-4.142-3.357-7.5-7.5-7.5H311v-40.5c0-26.05-12.595-49.213-32.014-63.721C278.989,71.686,279,71.594,279,71.5V45.766 c9.29-3.138,16-11.93,16-22.266C295,10.542,284.458,0,271.5,0S248,10.542,248,23.5c0,10.336,6.71,19.128,16,22.266v17.209 C254.07,58.507,243.076,56,231.5,56s-22.57,2.507-32.5,6.975V45.766c9.29-3.138,16-11.93,16-22.266C215,10.542,204.458,0,191.5,0 S168,10.542,168,23.5c0,10.336,6.71,19.128,16,22.266V71.5c0,0.094,0.011,0.186,0.014,0.279C164.595,86.287,152,109.45,152,135.5 V176h-16.5c-4.143,0-7.5,3.358-7.5,7.5v8.5H95.5C82.542,192,72,202.542,72,215.5c0,10.336,6.71,19.128,16,22.266v69.099 l-11.854,5.927c-2.54,1.27-4.146,3.867-4.146,6.708v24c0,2.841,1.605,5.438,4.146,6.708l16,8c1.077,0.539,2.222,0.793,3.349,0.793 c2.751,0,5.4-1.52,6.714-4.147c1.853-3.705,0.351-8.21-3.354-10.062L87,338.865v-14.729l8.5-4.25l8.5,4.25V335.5 c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16c0-2.841-1.605-5.438-4.146-6.708L103,306.865V239h25v32.5 c0,26.05,12.595,49.213,32.014,63.721c-0.003,0.093-0.014,0.185-0.014,0.279v48c0,10.336,6.71,19.128,16,22.266V416h-16.5 c-2.807,0-5.378,1.566-6.665,4.06L138.415,448H135.5c-4.143,0-7.5,3.358-7.5,7.5s3.357,7.5,7.5,7.5h72c4.143,0,7.5-3.358,7.5-7.5 v-32c0-4.142-3.357-7.5-7.5-7.5H191v-10.234c9.29-3.138,16-11.93,16-22.266v-32.513c0.167,0.001,0.332,0.013,0.5,0.013h48 c0.168,0,0.333-0.012,0.5-0.013V383.5c0,10.336,6.71,19.128,16,22.266V416h-16.5c-4.143,0-7.5,3.358-7.5,7.5v32 c0,4.142,3.357,7.5,7.5,7.5h72c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-2.915l-14.42-27.94 c-1.287-2.494-3.858-4.06-6.665-4.06H287v-10.234c9.29-3.138,16-11.93,16-22.266v-48c0-0.094-0.011-0.186-0.014-0.279 C322.405,320.713,335,297.55,335,271.5V239h25v67.865l-11.854,5.927c-2.54,1.27-4.146,3.867-4.146,6.708v16 c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-11.365l8.5-4.25l8.5,4.25v14.729l-11.854,5.927 c-3.704,1.852-5.206,6.357-3.354,10.062c1.313,2.628,3.963,4.148,6.714,4.147c1.127,0,2.271-0.255,3.349-0.793l16-8 c2.54-1.27,4.146-3.867,4.146-6.708v-24C391,316.659,389.395,314.062,386.854,312.792z M271.5,15c4.687,0,8.5,3.813,8.5,8.5 s-3.813,8.5-8.5,8.5s-8.5-3.813-8.5-8.5S266.813,15,271.5,15z M191.5,15c4.687,0,8.5,3.813,8.5,8.5s-3.813,8.5-8.5,8.5 s-8.5-3.813-8.5-8.5S186.813,15,191.5,15z M200,448h-44.705l8.774-17H200V448z M307.705,448H263v-17h35.931L307.705,448z M367.5,224c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5S372.187,224,367.5,224z M231.5,71 c35.565,0,64.5,28.935,64.5,64.5v8.5H167v-8.5C167,99.935,195.935,71,231.5,71z M167,159h129v17H167V159z M95.5,207 c4.687,0,8.5,3.813,8.5,8.5s-3.813,8.5-8.5,8.5s-8.5-3.813-8.5-8.5S90.813,207,95.5,207z M117.403,224 c1.027-2.638,1.597-5.503,1.597-8.5s-0.57-5.862-1.597-8.5H128v17H117.403z M183.5,392c-4.687,0-8.5-3.813-8.5-8.5 s3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5S188.187,392,183.5,392z M192,361.597c-2.638-1.027-5.503-1.597-8.5-1.597 s-5.862,0.57-8.5,1.597v-17.572c5.38,2.421,11.069,4.27,17,5.447V361.597z M143,271.5V191h81v25h-24.5 c-17.369,0-31.5,14.131-31.5,31.5s14.131,31.5,31.5,31.5H224v57h-16.5C171.935,336,143,307.065,143,271.5z M199.5,264 c-9.098,0-16.5-7.402-16.5-16.5s7.402-16.5,16.5-16.5h64c9.098,0,16.5,7.402,16.5,16.5s-7.402,16.5-16.5,16.5H199.5z M279.5,392 c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5S284.187,392,279.5,392z M288,361.597 c-2.638-1.027-5.503-1.597-8.5-1.597s-5.862,0.57-8.5,1.597v-12.125c5.931-1.177,11.62-3.026,17-5.447V361.597z M320,271.5 c0,35.565-28.935,64.5-64.5,64.5H239v-57h24.5c17.369,0,31.5-14.131,31.5-31.5S280.869,216,263.5,216H239v-25h81V271.5z M335,207 h10.597c-1.027,2.638-1.597,5.503-1.597,8.5s0.57,5.862,1.597,8.5H335V207z" />
          </svg>
          {/* Notification Dot */}
          {!isChatOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
          )}
        </div>
      </motion.button>
    </motion.div>
  );
}
