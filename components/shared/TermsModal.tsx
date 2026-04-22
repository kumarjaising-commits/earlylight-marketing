'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
      {children}
    </div>
  );
}

export default function TermsModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col" style={{ maxHeight: '80vh' }}>
        <div className="flex items-start justify-between px-8 pt-8 pb-4 flex-shrink-0">
          <div>
            <p className="text-sm font-bold tracking-wide mb-1" style={{ color: '#06B6D4' }}>EarlyLight</p>
            <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
            <p className="text-sm text-gray-400 mt-1">Effective Date: March 2026</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close terms of service"
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto px-8 pb-2 flex-1">
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            By using EarlyLight you agree to these terms. Questions? Contact{' '}
            <a href="mailto:legal@earlylight.health" className="underline" style={{ color: '#06B6D4' }}>legal@earlylight.health</a>
          </p>

          <Section title="1. The Service">
            <p className="text-sm text-gray-600">EarlyLight provides an AI-assisted student wellbeing platform for families, schools, and universities. The platform is not a medical device and does not provide clinical diagnosis or treatment. All AI outputs require human professional review.</p>
          </Section>
          <Section title="2. Eligibility">
            <p className="text-sm text-gray-600">Users under 18 require verifiable parental or guardian consent. Schools and universities accept these terms on behalf of their students.</p>
          </Section>
          <Section title="3. Your Responsibilities">
            <p className="text-sm text-gray-600">You agree to provide accurate information, keep your credentials confidential, and use the platform only for its intended purpose. You must not attempt to reverse-engineer or misuse the AI systems.</p>
          </Section>
          <Section title="4. Data and Privacy">
            <p className="text-sm text-gray-600">Your use of data is governed by our Privacy Policy. By using EarlyLight you consent to data processing as described therein.</p>
          </Section>
          <Section title="5. AI Limitations">
            <p className="text-sm text-gray-600">EarlyLight AI provides pattern detection and suggested actions — it does not diagnose, predict, or replace professional mental health support. Always consult a qualified professional for clinical decisions.</p>
          </Section>
          <Section title="6. Safeguarding">
            <p className="text-sm text-gray-600">EarlyLight operates in compliance with UK KCSIE 2023 safeguarding guidance and UAE Federal Law No. 3/2016 on child protection. In cases of immediate risk, we may contact emergency services or designated safeguarding leads.</p>
          </Section>
          <Section title="7. Intellectual Property">
            <p className="text-sm text-gray-600">All platform content, AI models, and software are the intellectual property of EarlyLight. You may not reproduce or distribute them without written permission.</p>
          </Section>
          <Section title="8. Limitation of Liability">
            <p className="text-sm text-gray-600">EarlyLight is not liable for any indirect, incidental, or consequential damages. Our total liability is limited to the amount paid in the 12 months preceding the claim.</p>
          </Section>
          <Section title="9. Governing Law">
            <p className="text-sm text-gray-600">These terms are governed by the laws of England and Wales for UK users, and the laws of the UAE for UAE users.</p>
          </Section>
          <Section title="10. Changes">
            <p className="text-sm text-gray-600">Material changes will be notified by email or prominent notice. Continued use after notice constitutes acceptance.</p>
          </Section>
        </div>

        <div className="px-8 py-4 border-t border-gray-100 flex-shrink-0">
          <p className="text-xs text-gray-400 text-center">© 2026 EarlyLight · <a href="mailto:legal@earlylight.health" className="underline hover:text-gray-600" style={{ color: '#06B6D4' }}>legal@earlylight.health</a></p>
        </div>
      </div>
    </div>
  );
}
