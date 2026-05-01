import { motion } from 'motion/react';
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setEmailError(true);
      return;
    }
    
    setEmailError(false);
    setStatus('loading');

    try {
      const leadsRef = collection(db, 'leads');
      await addDoc(leadsRef, {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      // handleFirestoreError(error, OperationType.CREATE, 'leads'); // This will throw and stop UI execution if used here directly as in instructions, but we want to catch it for UI feedback
    }
  };

  return (
    <section id="contact" className="section-padding relative border-b border-brand-primary/10 bg-brand-primary/[0.02]">
      <div className="w-full px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-px w-10 bg-brand-primary" />
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Inquiry Protocol</p>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-brand-primary mb-10 tracking-tighter leading-none uppercase">
                System <br /><span className="text-brand-accent italic font-serif">Audit.</span>
              </h2>
              <p className="text-slate-500 text-xl lg:text-2xl font-medium tracking-tight mb-14 max-w-md leading-relaxed">
                Book a free 15-minute consultation with our automation engineers and discover your scaling potential.
              </p>

              <div className="grid grid-cols-1 gap-10">
                <div className="flex items-start gap-6 pt-10 border-t border-brand-primary/10">
                  <span className="text-[10px] font-mono font-bold text-brand-accent">98.2%</span>
                   <div>
                    <p className="font-black text-brand-primary uppercase text-sm tracking-tighter">Response Efficiency</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Automated Relay</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 pt-10 border-t border-brand-primary/10">
                  <span className="text-[10px] font-mono font-bold text-brand-accent">3.5X</span>
                   <div>
                    <p className="font-black text-brand-primary uppercase text-sm tracking-tighter">Conversion Delta</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Predictive Model</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-muted p-6 sm:p-12 border border-brand-primary/10 rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="CARTER_J"
                    className="w-full bg-white border border-brand-primary/10 px-6 py-5 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-brand-accent transition-all duration-500 text-brand-primary placeholder:text-slate-200 focus:ring-0 focus:shadow-xl focus:shadow-brand-accent/5 rounded-none"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Work Email</label>
                  <input
                    required
                    type="email"
                    placeholder="PROTOCOL@DOMAIN.COM"
                    className={`w-full bg-white border ${emailError ? 'border-red-500' : 'border-brand-primary/10'} px-6 py-5 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-brand-accent transition-colors text-brand-primary placeholder:text-slate-200 rounded-none`}
                    value={formData.email}
                    onChange={e => {
                      setFormData({ ...formData, email: e.target.value });
                      if (emailError) setEmailError(false);
                    }}
                  />
                  {emailError && (
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-2 ml-1 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Invalid Protocol Address
                    </p>
                  )}
                </div>
 
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="DEFINE OBJECTIVES..."
                    className="w-full bg-white border border-brand-primary/10 px-6 py-5 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-brand-accent transition-colors resize-none text-brand-primary placeholder:text-slate-200 rounded-none"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
 
                <motion.button
                  whileHover={{ scale: 1.02, y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'loading'}
                  className="w-full bg-brand-primary text-white text-[11px] font-black uppercase tracking-[0.4em] py-6 transition-all disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden relative group"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                      Audit Confirmed
                    </>
                  ) : (
                    'Initialize Audit'
                  )}
                </motion.button>
                
                <p className="text-[10px] text-center text-slate-500 mt-4 px-4 leading-relaxed">
                  By clicking, you agree to our terms and to receive AI insights. No credit card required.
                </p>

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-wider justify-center"
                  >
                    <AlertCircle className="w-3 h-3" />
                    Submission failed. Retry.
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
