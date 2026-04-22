"use client";

/**
 * MainNav - Shared navigation bar
 *
 * Used on both the landing page (/) and the demo page (/demo).
 * Provides consistent branding and navigation across the site.
 * On mobile, nav links collapse into a slide-in burger-menu drawer.
 */

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import Link from "next/link";
import { ChevronDown, X, GraduationCap, Home, Menu } from "lucide-react";
import { setDemoDeploymentMode, clearDemoDeploymentMode } from "../lib/deployment-mode";
import PrivacyModal from "./shared/PrivacyModal";
import TermsModal from "./shared/TermsModal";

const modalContent: Record<string, { title: string; content: string }> = {
  Products: {
    title: "Our Products",
    content:
      "EarlyLight offers a complete wellbeing support stack for schools and universities:\n\n• Student Check-ins: Daily wellbeing assessments designed for young people\n• Parent Dashboard: Shared language and gentle prompts to support at home\n• Teacher Dashboard: Classroom trends and early signals across cohorts\n• EarlyLight AI: Pattern recognition that spotlights change over time\n• Counsellor Dashboard: Professional tools with real-time insights\n\nAll products work together to create a calm, human-led ecosystem of care.",
  },
  Pricing: {
    title: "Pricing Plans",
    content:
      "Simple, transparent pricing:\n\n• Family — AED 49/year\n  Daily check-ins, AI weekly digest, Ask EarlyLight chat, 60-day trend charts, co-parent access.\n\n• Family+ — AED 99/year (coming soon)\n  Everything in Family plus school SIS data, teacher check-in visibility, and reverse enrichment from school to home. Available when your child's school is an EarlyLight education partner.\n\n• Schools & Universities — From AED 49 per student/year\n  Everything in Family plus teacher dashboard, counsellor clinical tools, SIS/MIS integration, multi-school analytics, crisis protocol (KCSIE 2023), all stakeholder roles included.\n\nQuestions? info@earlylight.health",
  },
  "About Us": {
    title: "About EarlyLight",
    content:
      "EarlyLight is a research-grounded platform built to help young people, parents, and educators notice change early and respond with care.\n\nWe connect everyday observations with ethical AI so wellbeing teams can support before vulnerability becomes crisis.\n\nBrand story (EarlyLight):\n• Lighthouse: steady orientation — present long before danger, guiding without alarm\n• Signal beams: hundreds of quiet dots that form patterns over time — trends, not incidents\n• Colour restraint: diverse perspectives held in balance for clarity over noise\n• Wordmark: trusted blue into growth green — responsibility and care together\n• Avoids: surveillance metaphors, diagnostic signals, alarmist cues\n\nClosing promise: notice early, act responsibly, and always keep human care at the centre.",
  },
  Mission: {
    title: "Our Mission",
    content:
      "To support young people, parents, and educators with early, research-grounded insight into mental and emotional wellbeing — enabling understanding, acceptance, and growth before vulnerability becomes crisis.\n\nEarlyLight achieves this by:\n• Responsibly bringing together signals from students, parents, educators, and institutional systems\n• Applying evidence-based research through the EarlyLight intelligence engine\n• Surfacing patterns over time that help adults and young people recognise emerging stress early\n\nThis insight exists to support human conversation, guidance, and care — not to diagnose, predict, or label.",
  },
  Vision: {
    title: "Our Vision",
    content:
      "To help raise a generation that understands its inner world as well as its outer one — resilient, self-aware, and supported early in environments shaped by constant social and digital pressure.\n\nWe envision education systems that recognise mental wellbeing not as weakness, but as a foundational strength.",
  },
  Guardrails: {
    title: "Guardrails",
    content:
      "Institutional assurance that keeps people first:\n\n• We do not replace professional judgement\n• We do not medicalise normal emotional development\n• We do not treat wellbeing as risk scoring\n• We do not surveil or profile students\n\nEarlyLight exists to support awareness, acceptance, and growth — always with student agency in mind.",
  },
  Legal: {
    title: "Privacy & Legal",
    content:
      "EarlyLight is built with privacy at its core. Student data is never shared or sold. Role-based access ensures each stakeholder sees only what is appropriate for their role.\n\n• UK GDPR compliant (ICO registration in progress)\n• UAE PDPL compliant — Federal Decree-Law No. 45/2021 on Personal Data Protection\n• End-to-end encryption in transit and at rest\n• Anonymised analytics — data is never shared or sold\n• Role-based access and strict permissions\n• Security audit scheduled (third-party penetration test before first institutional contract)\n• Secure hosting — Vercel/Supabase\n\nCompliance documentation is being prepared for ICO registration, UAE PDPL alignment, and third-party security audit. Available to institutional partners on request.",
  },
};

interface MainNavProps {
  /** Show "Try Demo" or "Back to Demo" CTA */
  variant?: "landing" | "demo";
  /** Additional right-side elements (e.g. logout button, demo badge) */
  rightSlot?: React.ReactNode;
  /** Show admin link (only for admin users) */
  showAdmin?: boolean;
}

export default function MainNav({
  variant = "landing",
  rightSlot,
  showAdmin = false,
}: MainNavProps) {
  const pathname = usePathname();
  const isDemoActive = pathname?.startsWith('/demo') ?? false;
  const isAdminActive = pathname?.startsWith('/admin') ?? false;

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Close any open dropdown when clicking outside
  useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-nav-dropdown]")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openDropdown]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Listen for external modal open requests (from page body buttons)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail && modalContent[detail]) {
        setActiveModal(detail);
      }
    };
    window.addEventListener("pulse-open-modal", handler);
    return () => window.removeEventListener("pulse-open-modal", handler);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <div className="absolute rounded-full bg-yellow-400 w-4 h-4 top-0 left-0" />
                  <div className="absolute rounded-full bg-cyan-400 w-4 h-4 top-0 right-0" />
                  <div className="absolute rounded-full bg-purple-400 w-4 h-4 bottom-0 left-[4px]" />
                </div>
                <span className="text-xl font-bold text-white">EarlyLight</span>
              </Link>
            </div>

            {/* Nav Links — desktop only */}
            <div className="hidden md:flex items-center gap-8">

              {/* Products dropdown */}
              <div className="relative" data-nav-dropdown>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'products' ? null : 'products')}
                  className="flex items-center gap-1 text-text-muted hover:text-white transition-colors"
                >
                  Products <ChevronDown size={14} />
                </button>
                {openDropdown === 'products' && (
                  <div className="absolute left-0 mt-2 w-72 bg-navy border border-white/10 rounded-xl p-4 shadow-xl z-50">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Our Products</p>
                    {[
                      { name: 'Family Pulse', desc: 'Daily check-ins, AI insight, free for families' },
                      { name: 'Pre-School Pulse', desc: 'Ages 2–6 · Coming soon' },
                      { name: 'Education Pulse Plus', desc: 'Complete school wellbeing platform' },
                      { name: 'Counsellor on Demand', desc: 'Qualified counsellors on demand · Coming soon' },
                    ].map(item => (
                      <div key={item.name} className="px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-text-muted">{item.desc}</p>
                      </div>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <a href="/#products" onClick={() => setOpenDropdown(null)} className="px-3 text-sm text-cyan-400 hover:text-cyan-300">
                        See all products →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing dropdown */}
              <div className="relative" data-nav-dropdown>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'pricing' ? null : 'pricing')}
                  className="flex items-center gap-1 text-text-muted hover:text-white transition-colors"
                >
                  Pricing <ChevronDown size={14} />
                </button>
                {openDropdown === 'pricing' && (
                  <div className="absolute left-0 mt-2 w-64 bg-navy border border-white/10 rounded-xl p-4 shadow-xl z-50">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Pricing</p>
                    {[
                      { name: 'Family', desc: 'AED 49/year · Daily check-ins, AI digest, co-parent access' },
                      { name: 'Family+', desc: 'AED 99/year · Coming soon · With participating schools' },
                      { name: 'Schools & Universities', desc: 'From AED 49 per student/year · Contact us' },
                    ].map(item => (
                      <div key={item.name} className="px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-text-muted">{item.desc}</p>
                      </div>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <a href="/#pricing" onClick={() => setOpenDropdown(null)} className="px-3 text-sm text-cyan-400 hover:text-cyan-300">
                        See full pricing →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Mission dropdown */}
              <div className="relative" data-nav-dropdown>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'mission' ? null : 'mission')}
                  className="flex items-center gap-1 text-text-muted hover:text-white transition-colors"
                >
                  Mission <ChevronDown size={14} />
                </button>
                {openDropdown === 'mission' && (
                  <div className="absolute left-0 mt-2 w-80 bg-navy border border-white/10 rounded-xl p-5 shadow-xl z-50 space-y-3">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Our Mission</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      EarlyLight helps parents and schools notice when a child is struggling — weeks before it becomes a crisis.
                    </p>
                    <p className="text-xs text-text-muted">
                      1 in 6 children · 10-year delay to treatment · 18–52 week CAMHS wait
                    </p>
                    <p className="text-[11px] text-white/30 italic">
                      NHS Digital, 2023 · Kessler et al., 2012
                    </p>
                    <div className="border-t border-white/10 pt-2">
                      <a href="/#mission" onClick={() => setOpenDropdown(null)} className="text-sm text-cyan-400 hover:text-cyan-300">
                        Read our story →
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setDemoModalOpen(true)}
                className={`transition-colors ${isDemoActive ? 'text-white font-medium' : 'text-text-muted hover:text-white'}`}
              >
                Demo
              </button>

              {/* About dropdown */}
              <div className="relative" data-nav-dropdown>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                  className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
                >
                  <span>About</span>
                  <ChevronDown size={14} />
                </button>
                {openDropdown === 'about' && (
                  <div className="absolute right-0 mt-2 w-48 bg-navy border border-white/10 rounded-xl p-2 shadow-xl z-50">
                    <button
                      onClick={() => { setActiveModal("About Us"); setOpenDropdown(null); }}
                      className="w-full text-left px-3 py-2 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg"
                    >
                      About EarlyLight
                    </button>
                    <button
                      onClick={() => { setActiveModal("Vision"); setOpenDropdown(null); }}
                      className="w-full text-left px-3 py-2 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg"
                    >
                      Vision
                    </button>
                    <button
                      onClick={() => { setActiveModal("Guardrails"); setOpenDropdown(null); }}
                      className="w-full text-left px-3 py-2 text-sm text-text-muted hover:text-white hover:bg-white/5 rounded-lg"
                    >
                      Guardrails
                    </button>
                  </div>
                )}
              </div>

              {/* Privacy & Legal dropdown */}
              <div className="relative" data-nav-dropdown>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'legal' ? null : 'legal')}
                  className="text-text-muted hover:text-white transition-colors"
                >
                  Legal
                </button>
                {openDropdown === 'legal' && (
                  <div className="absolute right-0 mt-2 w-96 bg-navy border border-white/10 rounded-xl p-5 shadow-xl z-50 space-y-3">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Privacy &amp; Legal</p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      EarlyLight is built with privacy at its core. Student data is never shared or sold. Role-based access ensures each stakeholder sees only what is appropriate for their role.
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        "UK GDPR compliant (ICO registration in progress)",
                        "UAE PDPL compliant — Federal Decree-Law No. 45/2021 on Personal Data Protection",
                        "End-to-end encryption in transit and at rest (Supabase + Vercel — documentation in progress)",
                        "Anonymised analytics — data is never shared or sold",
                        "Role-based access and strict permissions",
                        "Security audit scheduled (third-party penetration test to be completed before first institutional contract)",
                        "Secure hosting — Vercel/Supabase (data residency and backup policy documentation in progress)",
                      ].map(item => (
                        <li key={item} className="flex items-start gap-1.5 text-xs text-gray-400">
                          <span className="mt-0.5 text-cyan-400 flex-shrink-0">•</span>{item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-white/30 italic leading-relaxed">
                      Compliance documentation is being prepared for ICO registration, UAE PDPL alignment, and third-party security audit. Available to institutional partners on request.
                    </p>
                    <div className="flex gap-4 border-t border-white/10 pt-3">
                      <button
                        type="button"
                        onClick={() => { setOpenDropdown(null); setShowPrivacyModal(true); }}
                        className="text-sm text-cyan-400 hover:text-cyan-300"
                      >
                        Privacy Policy →
                      </button>
                      <button
                        type="button"
                        onClick={() => { setOpenDropdown(null); setShowTermsModal(true); }}
                        className="text-sm text-cyan-400 hover:text-cyan-300"
                      >
                        Terms of Service →
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {showAdmin && (
                <Link
                  href="/admin"
                  className={`transition-colors ${isAdminActive ? 'text-white font-medium' : 'text-text-muted hover:text-white'}`}
                >
                  Admin
                </Link>
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {rightSlot}
              {/* Desktop-only CTAs */}
              {variant === "landing" && (
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="hidden md:block px-6 py-2 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-white"
                >
                  Try Demo
                </button>
              )}
              {showAdmin && (
                <Link
                  href="/admin"
                  className="hidden md:block px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/30 transition-all text-white"
                >
                  Admin Panel
                </Link>
              )}

              {/* Burger button — mobile only */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeMobileMenu}
          >
            <FocusTrap active={mobileMenuOpen}>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-xs bg-navy border-l border-white/10 flex flex-col overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <div className="absolute rounded-full bg-yellow-400 w-3 h-3 top-0 left-0" />
                    <div className="absolute rounded-full bg-cyan-400 w-3 h-3 top-0 right-0" />
                    <div className="absolute rounded-full bg-purple-400 w-3 h-3 bottom-0 left-[3px]" />
                  </div>
                  <span className="text-base font-bold text-white">EarlyLight</span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Nav items */}
              <div className="flex-1 px-3 py-4 space-y-1">
                <button
                  onClick={() => { setActiveModal("Products"); closeMobileMenu(); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-text-muted hover:text-white hover:bg-white/5 transition-colors text-[15px]"
                >
                  Products
                </button>
                <button
                  onClick={() => { setActiveModal("Pricing"); closeMobileMenu(); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-text-muted hover:text-white hover:bg-white/5 transition-colors text-[15px]"
                >
                  Pricing
                </button>
                <button
                  onClick={() => { setActiveModal("Mission"); closeMobileMenu(); }}
                  className="w-full text-left px-4 py-3 rounded-xl text-text-muted hover:text-white hover:bg-white/5 transition-colors text-[15px]"
                >
                  Mission
                </button>
                <button
                  onClick={() => { setDemoModalOpen(true); closeMobileMenu(); }}
                  className={`w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-[15px] ${isDemoActive ? 'text-white font-medium' : 'text-text-muted hover:text-white'}`}
                >
                  Demo
                </button>

                {/* About — expanded inline */}
                <div className="pt-3">
                  <div className="px-4 pb-1 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    About
                  </div>
                  {[
                    { key: "About Us", label: "About EarlyLight" },
                    { key: "Vision", label: "Vision" },
                    { key: "Guardrails", label: "Guardrails" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => { setActiveModal(key); closeMobileMenu(); }}
                      className="w-full text-left px-6 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm"
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 px-4">
                  <button
                    type="button"
                    onClick={() => { closeMobileMenu(); setShowPrivacyModal(true); }}
                    className="flex-1 text-left py-3 text-text-muted hover:text-white transition-colors text-[15px]"
                  >
                    Privacy Policy
                  </button>
                  <button
                    type="button"
                    onClick={() => { closeMobileMenu(); setShowTermsModal(true); }}
                    className="flex-1 text-left py-3 text-text-muted hover:text-white transition-colors text-[15px]"
                  >
                    Terms of Service
                  </button>
                </div>

                {/* Admin — only for admin users */}
                {showAdmin && (
                  <div className="pt-3 border-t border-white/10">
                    <Link
                      href="/admin"
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-[15px] ${isAdminActive ? 'text-white font-medium' : 'text-text-muted hover:text-white'}`}
                    >
                      Admin Panel
                    </Link>
                  </div>
                )}
              </div>

              {/* Drawer footer */}
              <div className="px-5 py-4 border-t border-white/10 flex-shrink-0">
                <p className="text-xs text-white/30 text-center">
                  © 2026 EarlyLight
                </p>
              </div>
            </motion.div>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Selection Modal */}
      <AnimatePresence>
        {demoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setDemoModalOpen(false)}
          >
            <FocusTrap active={demoModalOpen}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-navy border border-white/10 rounded-2xl p-8 w-full max-w-lg relative"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setDemoModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-2">Choose a Demo</h2>
              <p className="text-gray-400 text-sm mb-6">Select which experience you'd like to explore</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Family Demo */}
                <button
                  onClick={() => {
                    setDemoDeploymentMode('family_only');
                    setDemoModalOpen(false);
                    window.location.href = '/auth';
                  }}
                  className="group flex flex-col items-start gap-3 p-6 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400/60 rounded-xl transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-all">
                    <Home className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">Family Demo</div>
                    <div className="text-xs text-gray-400 leading-relaxed">See EarlyLight as a family at home — parent and child check-ins, wellbeing trends, and family support tools</div>
                  </div>
                </button>

                {/* Education Demo */}
                <button
                  onClick={() => {
                    clearDemoDeploymentMode();
                    setDemoModalOpen(false);
                    window.location.href = '/auth';
                  }}
                  className="group flex flex-col items-start gap-3 p-6 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-all">
                    <GraduationCap className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">Education Demo</div>
                    <div className="text-xs text-gray-400 leading-relaxed">See EarlyLight in a school or university — student check-ins, teacher observations, and counsellor dashboards</div>
                  </div>
                </button>
              </div>
            </motion.div>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal System */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveModal(null)}
          >
            <FocusTrap active={!!activeModal}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-navy border border-white/10 rounded-2xl p-8 w-full max-w-2xl relative max-h-[80vh] overflow-y-auto"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  {modalContent[activeModal]?.title}
                </h2>
                <p className="text-base text-gray-300 leading-relaxed whitespace-pre-line">
                  {modalContent[activeModal]?.content}
                </p>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 py-3 rounded-full font-bold text-white transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-95"
              >
                CLOSE
              </button>
            </motion.div>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>

      <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </>
  );
}
