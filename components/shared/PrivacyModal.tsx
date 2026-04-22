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

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="text-sm font-semibold text-gray-700 mb-1">{title}</p>
      {children}
    </div>
  );
}

export default function PrivacyModal({ isOpen, onClose }: Props) {
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
            <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
            <p className="text-sm text-gray-400 mt-1">Effective Date: March 2026</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close privacy policy"
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto px-8 pb-2 flex-1">
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            At EarlyLight, we are committed to protecting your privacy. We provide an AI-assisted student
            wellbeing platform designed to support children, families, and schools.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            This Privacy Policy complies with the UK General Data Protection Regulation (UK GDPR) and the
            UAE Federal Decree-Law No. 45/2021 on Personal Data Protection (PDPL). Questions? Contact{' '}
            <a href="mailto:privacy@earlylight.health" className="underline" style={{ color: '#06B6D4' }}>privacy@earlylight.health</a>
          </p>

          <Section title="1. Data Controller">
            <p className="text-sm text-gray-600">EarlyLight · <a href="mailto:privacy@earlylight.health" className="underline" style={{ color: '#06B6D4' }}>privacy@earlylight.health</a></p>
          </Section>

          <Section title="2. Information We Collect">
            <Sub title="Personal identifiers">
              <p className="text-sm text-gray-600">Name, date of birth, email address, contact details, and account login credentials.</p>
            </Sub>
            <Sub title="Sensitive health data (special category)">
              <p className="text-sm text-gray-600">Mental health check-in responses, mood logs, AI conversation inputs, and wellbeing assessment scores. Legal basis: explicit consent under Article 9(2)(a) UK GDPR and Article 7 UAE PDPL.</p>
            </Sub>
            <Sub title="Usage data">
              <p className="text-sm text-gray-600">Log data, IP address, browser type, and interaction metrics.</p>
            </Sub>
            <Sub title="AI interaction data">
              <p className="text-sm text-gray-600">Inputs to our AI assistant are processed to generate responses. These may be reviewed by human supervisors for safety purposes only, after anonymisation.</p>
            </Sub>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="text-sm text-gray-600 space-y-2">
              {[
                'To provide the platform — account creation, AI-assisted tools, secure check-in storage.',
                'To improve AI models — using de-identified aggregated data only.',
                'Safety and safeguarding — to detect crisis signals and, where required by law, contact emergency services.',
                'Legal compliance — to meet UK and UAE regulatory obligations.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-1" style={{ color: '#06B6D4' }}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="4. Disclosure">
            <p className="text-sm text-gray-600">We do not sell your personal data. We may share data with service providers bound by strict confidentiality, crisis response services when life-threatening risk is identified, and legal authorities if required by law.</p>
          </Section>

          <Section title="5. Data Security">
            <p className="text-sm text-gray-600">We implement end-to-end encryption for conversations and check-in data, strict role-based access controls, and regular security assessments.</p>
          </Section>

          <Section title="6. Your Rights">
            <p className="text-sm text-gray-600 mb-2">You have the right to access, correct, delete, restrict, or port your data. Contact <a href="mailto:privacy@earlylight.health" className="underline" style={{ color: '#06B6D4' }}>privacy@earlylight.health</a> — we respond within 30 days.</p>
            <p className="text-sm text-gray-600">UK users may complain to the ICO at ico.org.uk. UAE users may object to automated processing under UAE PDPL.</p>
          </Section>

          <Section title="7. Children&apos;s Data">
            <p className="text-sm text-gray-600">EarlyLight processes data for children with verifiable parental consent. Contact <a href="mailto:privacy@earlylight.health" className="underline" style={{ color: '#06B6D4' }}>privacy@earlylight.health</a> if you believe a child&apos;s data has been processed without consent.</p>
          </Section>

          <Section title="8. Changes">
            <p className="text-sm text-gray-600">Material changes will be notified by email or prominent notice on the platform.</p>
          </Section>
        </div>

        <div className="px-8 py-4 border-t border-gray-100 flex-shrink-0">
          <p className="text-xs text-gray-400 text-center">© 2026 EarlyLight · <a href="mailto:privacy@earlylight.health" className="underline hover:text-gray-600" style={{ color: '#06B6D4' }}>privacy@earlylight.health</a></p>
        </div>
      </div>
    </div>
  );
}
