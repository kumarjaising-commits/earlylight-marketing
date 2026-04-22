'use client';
/* eslint-disable react/no-unescaped-entities */

/**
 * Platforms Landing Page
 * Main landing page for PULSE - shows platform selection and authentication
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PrimaryCTA from '@/components/PrimaryCTA';
import MainNav from '@/components/MainNav';
import { X, ChevronDown, GraduationCap, Calendar, AlertTriangle, User, TrendingUp, Users, FileText, Brain, Heart, Baby, Stethoscope } from 'lucide-react';

export default function PlatformsLandingPage() {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dotPositions, setDotPositions] = useState<{
    cyan: Array<{ left: number; top: number; duration: number; delay: number }>;
    purple: Array<{ left: number; top: number; duration: number; delay: number }>;
    yellow: Array<{ left: number; top: number; duration: number; delay: number }>;
  } | null>(null);

  // Generate dot positions only on client side to prevent hydration mismatch
  useEffect(() => {
    setDotPositions({
      cyan: [...Array(25)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
      purple: [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 2,
        delay: Math.random() * 3,
      })),
      yellow: [...Array(15)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3.5 + Math.random() * 2,
        delay: Math.random() * 2.5,
      })),
    });
  }, []);

  const handleDemoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      datetime: formData.get('datetime'),
      message: formData.get('message'),
      source: 'Desktop Landing Page',
    };

    try {
      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setIsDemoFormOpen(false);
          setSubmitSuccess(false);
        }, 2000);
      } else {
        alert('Failed to submit demo request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting demo request:', error);
      alert('Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white font-['Inter',system-ui,sans-serif] relative overflow-hidden">

      {/* --- FIXED LIGHTHOUSE BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none opacity-15 z-0">
        <Image
          src="/mobilelanding/LighthouseHeroImage.png"
          alt="Lighthouse Background"
          fill
          className="object-contain object-center"
          priority
        />
      </div>

      {/* Animated AI Dots Network Background */}
      {dotPositions && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Cyan dots */}
          {dotPositions.cyan.map((pos, i) => (
            <motion.div
              key={`cyan-${i}`}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: pos.delay,
              }}
            />
          ))}
          {/* Purple dots */}
          {dotPositions.purple.map((pos, i) => (
            <motion.div
              key={`purple-${i}`}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: pos.delay,
              }}
            />
          ))}
          {/* Yellow dots */}
          {dotPositions.yellow.map((pos, i) => (
            <motion.div
              key={`yellow-${i}`}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                opacity: [0.15, 0.5, 0.15],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: pos.duration,
                repeat: Infinity,
                delay: pos.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <MainNav variant="landing" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side - Text Content */}
          <div className="space-y-8 relative z-30">
            {/* Tagline Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-sm text-text-muted">Powered by</span>
              <span className="text-sm font-semibold bg-gradient-to-r from-brand-yellow via-brand-cyan to-brand-purple bg-clip-text text-transparent">
                EarlyLight AI
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              PULSE
              <br />
              <span className="bg-gradient-to-r from-brand-yellow via-brand-cyan to-brand-purple bg-clip-text text-transparent">
                Early Awareness, Earlier Support
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-xl md:text-2xl text-text-muted leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Everyday observations from students, families, and educators — translated into research-grounded insight so young people can understand their inner and outer worlds, notice change early, and get support before vulnerability becomes crisis.
            </motion.p>

            {/* Key Features */}
            <motion.div
              className="grid grid-cols-3 gap-4 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:border-[#FBBF24]/30 transition-all">
                <div className="text-3xl font-bold text-brand-yellow">✓</div>
                <div className="text-sm text-text-muted">Everyday Observations</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:border-[#06B6D4]/30 transition-all">
                <div className="text-3xl font-bold text-brand-cyan">✓</div>
                <div className="text-sm text-text-muted">Human-Led Decisions</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:border-[#9333EA]/30 transition-all">
                <div className="text-3xl font-bold text-brand-purple">✓</div>
                <div className="text-sm text-text-muted">Earlier Support</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <PrimaryCTA href="https://pulse.earlylight.health">
                Try the Demo
              </PrimaryCTA>
              <button
                className="px-8 py-3.5 font-semibold text-white border-2 border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transition-all"
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("pulse-open-modal", { detail: "About Us" }))}
              >
                How early insight works
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="pt-8 flex items-center gap-6 text-sm text-text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-brand-yellow border-2 border-navy" />
                  <div className="w-8 h-8 rounded-full bg-brand-cyan border-2 border-navy" />
                  <div className="w-8 h-8 rounded-full bg-brand-purple border-2 border-navy" />
                </div>
                <span>Informed by global wellbeing research</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - 4-Bubble Venn Diagram */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ height: '550px', width: '550px' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">

              {/* Pulsating AI light at center convergence - BEHIND the bubbles */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 bg-gradient-to-br from-cyan-400 via-blue-400 to-cyan-500 rounded-full blur-lg"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-cyan-300 via-blue-300 to-teal-400 rounded-full blur-md"
                />
              </motion.div>

              {/* Student Bubble - Purple (Bottom position on Y-axis) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{
                  opacity: { delay: 0.8 },
                  scale: { delay: 0.8, type: 'spring', damping: 15 },
                  y: { delay: 2, duration: 4.3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute left-1/2 -translate-x-1/2 z-5"
                style={{ top: 'calc(50% + 57px)' }}
              >
                <div className="relative w-44 h-44">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
                  {/* Bubble */}
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-500/70 via-purple-600/60 to-purple-800/70 backdrop-blur-sm border-2 border-purple-400/70 rounded-full flex flex-col items-center justify-center p-5 text-center shadow-2xl shadow-purple-500/40">
                    <h4 className="font-bold text-lg mb-1.5 text-white drop-shadow-lg">Student</h4>
                    <p className="text-[10px] text-purple-100/90 leading-tight">How am I feeling?</p>
                  </div>
                </div>
              </motion.div>

              {/* Parent Bubble - Yellow (Right position on X-axis) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: [0, -20, 0]
                }}
                transition={{
                  opacity: { delay: 0.9 },
                  scale: { delay: 0.9, type: 'spring', damping: 15 },
                  x: { delay: 2, duration: 4.3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-1/2 -translate-y-1/2 z-10"
                style={{ left: 'calc(50% + 85px)' }}
              >
                <div className="relative w-44 h-44">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-3xl animate-pulse" />
                  {/* Bubble */}
                  <div className="relative w-full h-full bg-gradient-to-br from-yellow-400/70 via-yellow-500/60 to-yellow-700/70 backdrop-blur-sm border-2 border-yellow-300/70 rounded-full flex flex-col items-center justify-center p-5 text-center shadow-2xl shadow-yellow-500/40">
                    <h4 className="font-bold text-lg mb-1.5 text-white drop-shadow-lg">Parent</h4>
                    <p className="text-[10px] text-yellow-100/90 leading-tight">How are they seeming?</p>
                  </div>
                </div>
              </motion.div>

              {/* Teacher Bubble - Cyan (Left position on X-axis) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: [0, 20, 0]
                }}
                transition={{
                  opacity: { delay: 1.0 },
                  scale: { delay: 1.0, type: 'spring', damping: 15 },
                  x: { delay: 2, duration: 4.3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-1/2 -translate-y-1/2 z-10"
                style={{ right: 'calc(50% + 85px)' }}
              >
                <div className="relative w-44 h-44">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" />
                  {/* Bubble */}
                  <div className="relative w-full h-full bg-gradient-to-br from-cyan-400/70 via-cyan-500/60 to-blue-700/70 backdrop-blur-sm border-2 border-cyan-300/70 rounded-full flex flex-col items-center justify-center p-5 text-center shadow-2xl shadow-cyan-500/40">
                    <h4 className="font-bold text-lg mb-1.5 text-white drop-shadow-lg">Teacher</h4>
                    <p className="text-[10px] text-cyan-100/90 leading-tight">How are they engaging?</p>
                  </div>
                </div>
              </motion.div>

              {/* System Bubble - Green (Top position on Y-axis) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, 35, 0]
                }}
                transition={{
                  opacity: { delay: 1.1 },
                  scale: { delay: 1.1, type: 'spring', damping: 15 },
                  y: { delay: 2, duration: 4.3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute left-1/2 -translate-x-1/2 z-10"
                style={{ top: 'calc(50% - 276px)' }}
              >
                <div className="relative w-44 h-44">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-3xl animate-pulse" />
                  {/* Bubble */}
                  <div className="relative w-full h-full bg-gradient-to-br from-emerald-400/70 via-emerald-500/60 to-green-700/70 backdrop-blur-sm border-2 border-emerald-300/70 rounded-full flex flex-col items-center justify-center p-5 text-center shadow-2xl shadow-emerald-500/40">
                    <h4 className="font-bold text-lg mb-1.5 text-white drop-shadow-lg">System</h4>
                    <p className="text-[10px] text-emerald-100/90 leading-tight">Structured Data</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Context & Belief Section */}
      <section id="mission" className="relative py-20 px-6">
        <div className="relative z-10 max-w-6xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Why This Matters Now</h2>
            <p className="text-lg text-text-muted">Built for a generation navigating constant social and digital pressure — with adults who want to help sooner.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Gen Z & Gen Alpha", desc: "More emotionally aware than any generation — ready for language and tools that respect that awareness." },
              { title: "Parents Connected", desc: "Families see more, sooner — but lack shared language to start calm conversations." },
              { title: "Institutions Under Pressure", desc: "Schools and universities are asked to respond faster, yet signals often arrive too late." },
              { title: "Beyond Crisis-Only Models", desc: "Traditional systems focus on physical education or emergency response, not everyday inner resilience." }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm"
              >
                <div className="text-sm uppercase tracking-wide text-cyan-300/80 mb-2">{String(idx + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 rounded-2xl p-8 space-y-4 shadow-2xl shadow-cyan-500/10"
            >
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-cyan-300" />
                <span className="text-sm uppercase tracking-wide text-cyan-200/80">Our Mission</span>
              </div>
              <p className="text-2xl md:text-3xl font-semibold leading-relaxed">
                EarlyLight helps parents and schools notice when a child is struggling — weeks before it becomes a crisis.
              </p>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 py-2">
                {[
                  { stat: '1 in 6', label: 'children has a probable mental health condition' },
                  { stat: '10 years', label: 'average delay between first symptoms and first treatment' },
                  { stat: '18–52 weeks', label: 'average CAMHS waiting time in the UK' },
                ].map(({ stat, label }) => (
                  <div key={stat}>
                    <p className="text-3xl md:text-4xl font-bold" style={{ color: '#06B6D4' }}>{stat}</p>
                    <p className="text-xs text-text-muted mt-1 leading-snug">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted/60">
                NHS Digital, 2023 · Kessler et al., 2012 · YoungMinds, 2023
              </p>
              <p className="text-sm text-text-muted leading-relaxed">
                EarlyLight exists to close that gap. By giving parents, teachers, and counsellors a shared
                early-warning system, we catch the signals weeks before crisis — at the most underfunded and
                overlooked layer of the mental health system. Before the CAMHS waiting list. Before the
                exclusion. Before it&apos;s too late.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-300" />
                <span className="text-sm uppercase tracking-wide text-yellow-200/80">Guardrails</span>
              </div>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>• We do not replace professional judgement</li>
                <li>• We do not medicalise normal emotional development</li>
                <li>• We do not treat wellbeing as risk scoring</li>
                <li>• We do not surveil or profile students</li>
              </ul>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("pulse-open-modal", { detail: "Guardrails" }))}
                className="text-sm text-cyan-300 hover:text-white transition-colors underline underline-offset-4"
              >
                View our assurance approach
              </button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Students", icon: <User className="w-5 h-5" />, copy: "Simple, respectful check-ins that help name feelings, track change, and build language for inner and outer worlds." },
              { title: "Parents", icon: <Users className="w-5 h-5" />, copy: "Shared signals and guidance to start calm conversations at home — without alarms or labels." },
              { title: "Educators", icon: <GraduationCap className="w-5 h-5" />, copy: "Patterns over time that surface early shifts, helping teams act sooner with human-led support." }
            ].map((tile, idx) => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm space-y-3"
              >
                <div className="flex items-center gap-3 text-cyan-200">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    {tile.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{tile.title}</h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{tile.copy}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white/5 via-white/10 to-transparent border border-white/15 rounded-2xl p-8 space-y-4 shadow-2xl shadow-purple-500/10"
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Image src="/mobilelanding/LighthouseHeroImage.png" alt="EarlyLight lighthouse" width={36} height={36} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-purple-200/80">Brand Story</p>
                <h3 className="text-2xl font-semibold text-white">EarlyLight — A Lighthouse, Not a Siren</h3>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 text-sm text-text-muted leading-relaxed">
                <p>A restrained lighthouse signals quiet awareness: present long before danger, guiding without intrusion.</p>
                <p>Two symmetrical beams are formed from hundreds of individual dots — everyday signals that only gain meaning together. They show patterns over time, not incidents in isolation.</p>
                <p>Colour stays contained and balanced, reinforcing clarity over noise and empathy over alarm.</p>
              </div>
              <div className="space-y-3 text-sm text-text-muted leading-relaxed">
                <p>We avoid surveillance metaphors, diagnostic symbols, and alarmist cues. The brand exists to strengthen human judgment, not replace it.</p>
                <p className="text-white font-semibold">Brand promise: notice early, act responsibly, and keep human care at the centre of every insight.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 px-6">
        <div className="relative z-10 max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How PULSE Works</h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              From everyday observations to earlier support
            </p>
          </motion.div>

          {/* Check-In Preview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">

            {/* Student Check-in */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-purple-600 px-4 py-2 rounded-t-lg border-t border-l border-r border-white/20 inline-block">
                <span className="text-xs font-bold text-white">STUDENT</span>
              </div>
              <div className="border border-white/20 rounded-tr-lg rounded-b-lg backdrop-blur-sm bg-white/5 p-4 min-h-[180px]">
                <p className="text-sm text-gray-400 mb-3 text-center">Daily Check-in</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Feeling:</span>
                    <div className="flex gap-2">
                      <span className="text-lg">😊</span>
                      <span className="text-lg">😐</span>
                      <span className="text-lg opacity-50">😟</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Energy:</span>
                    <div className="flex gap-2">
                      <span className="text-lg">⚡</span>
                      <span className="text-lg">🔋</span>
                      <span className="text-lg opacity-50">🪫</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Connected:</span>
                    <div className="flex gap-2">
                      <span className="text-lg">🤝</span>
                      <span className="text-lg">👥</span>
                      <span className="text-lg opacity-50">😶</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Parent Check-in */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="bg-yellow-500 px-4 py-2 rounded-t-lg border-t border-l border-r border-white/20 inline-block">
                <span className="text-xs font-bold text-white">PARENT</span>
              </div>
              <div className="w-full border border-white/20 rounded-tl-lg rounded-br-lg rounded-bl-lg backdrop-blur-sm bg-white/5 p-4 min-h-[180px]">
                <p className="text-sm text-gray-400 mb-3 text-center">Home Observations</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Seeming:</span>
                    <div className="flex gap-2">
                      <span className="text-lg">😊</span>
                      <span className="text-lg">😐</span>
                      <span className="text-lg opacity-50">😟</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Sleep:</span>
                    <div className="flex gap-2">
                      <span className="text-lg">😴</span>
                      <span className="text-lg">😌</span>
                      <span className="text-lg opacity-50">😫</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Social:</span>
                    <div className="flex gap-2">
                      <span className="text-lg">🎉</span>
                      <span className="text-lg">🙂</span>
                      <span className="text-lg opacity-50">🏠</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Teacher Check-in */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-end"
            >
              <div className="bg-cyan-500 px-4 py-2 rounded-t-lg border-t border-l border-r border-white/20 inline-block">
                <span className="text-xs font-bold text-white">TEACHER</span>
              </div>
              <div className="w-full border border-white/20 rounded-tl-lg rounded-bl-lg rounded-br-lg backdrop-blur-sm bg-white/5 p-4 min-h-[180px]">
                <p className="text-sm text-gray-400 mb-3 text-center">Classroom Insights</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Engagement:</span>
                    <div className="flex gap-2">
                      <span className="text-lg">🙋</span>
                      <span className="text-lg">📝</span>
                      <span className="text-lg opacity-50">😶</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Social:</span>
                    <div className="flex gap-2">
                      <span className="text-lg">👫</span>
                      <span className="text-lg">🤝</span>
                      <span className="text-lg opacity-50">🚶</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Concerns:</span>
                    <div className="flex gap-2">
                      <span className="text-lg">✅</span>
                      <span className="text-lg">⚠️</span>
                      <span className="text-lg opacity-50">🚨</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Data Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {/* Student Information System */}
            <div className="relative border-2 border-emerald-400/40 rounded-lg backdrop-blur-sm bg-gradient-to-br from-emerald-500/20 via-emerald-600/15 to-green-700/20 overflow-hidden mb-8 p-6">
              {/* System Tab Header */}
              <div className="bg-gradient-to-r from-emerald-400/70 via-emerald-500/60 to-green-700/70 px-4 py-2 rounded-t-md -mx-6 -mt-6 mb-4 border-b-2 border-emerald-300/30">
                <span className="text-sm font-bold text-white uppercase tracking-wider">System - Structured Data</span>
              </div>

              {/* ABC Model Data Categories */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Academic Performance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-emerald-400/40 hover:border-emerald-400/70 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-all">
                    <TrendingUp className="w-6 h-6 text-emerald-300 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-emerald-100 font-bold mb-1">Academic</div>
                    <div className="text-[10px] text-emerald-300/70">Grades & GPA</div>
                  </div>
                </motion.div>

                {/* Attendance Patterns */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-emerald-400/40 hover:border-emerald-400/70 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-all">
                    <Calendar className="w-6 h-6 text-emerald-300 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-emerald-100 font-bold mb-1">Attendance</div>
                    <div className="text-[10px] text-emerald-300/70">Daily Tracking</div>
                  </div>
                </motion.div>

                {/* Behavioral Data */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-emerald-400/40 hover:border-emerald-400/70 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-all">
                    <AlertTriangle className="w-6 h-6 text-emerald-300 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-emerald-100 font-bold mb-1">Behavior</div>
                    <div className="text-[10px] text-emerald-300/70">Incidents</div>
                  </div>
                </motion.div>

                {/* Student Profile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="group relative flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-emerald-400/40 hover:border-emerald-400/70 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-all">
                    <FileText className="w-6 h-6 text-emerald-300 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-emerald-100 font-bold mb-1">Profile</div>
                    <div className="text-[10px] text-emerald-300/70">Demographics</div>
                  </div>
                </motion.div>
              </div>

              {/* Pulsating indicators */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-emerald-400/20">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                />
                <span className="text-xs text-emerald-300/70 ml-2">Real-time SIS Integration</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6 text-cyan-400" />
              </motion.div>
            </div>

            {/* EarlyLight AI */}
            <div className="relative overflow-visible mb-8 py-12">
              {/* Cloud glow */}
              <div className="absolute inset-0 -inset-x-24">
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-gradient-to-r from-cyan-500/20 via-purple-500/30 to-cyan-500/20 rounded-full blur-3xl"
                />
              </div>

              {/* Text */}
              <div className="relative flex flex-col items-center justify-center">
                <span className="text-2xl text-cyan-200 font-bold uppercase tracking-wider drop-shadow-lg">EarlyLight</span>
                <span className="text-lg text-purple-200/80 uppercase tracking-wide mt-1">Supporting Pattern Analysis</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-green-400" />
              </motion.div>
            </div>

            {/* Counsellor Dashboard */}
            <div className="flex flex-col items-center">
              <div className="w-full bg-emerald-700 px-4 py-2 rounded-t-lg border-t border-l border-r border-white/20">
                <span className="text-xs font-bold text-white">COUNSELLOR DASHBOARD</span>
              </div>
              <div className="w-full border border-white/20 rounded-b-lg backdrop-blur-sm bg-white/5 p-6">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">🔔</span>
                    <span className="text-xs text-gray-400">Attention Needed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">📊</span>
                    <span className="text-xs text-gray-400">Patterns Over Time</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">👥</span>
                    <span className="text-xs text-gray-400">Student Overview</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Real-time support</span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Conversation Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-green-400">Early Conversations</h3>

            {/* Parent-Child Conversation */}
            <div className="space-y-4 mb-12">
              <p className="text-center text-sm text-gray-400 font-semibold mb-4">Parent-Child Conversation</p>

              {/* Parent Opening */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex justify-start"
              >
                <div className="bg-yellow-900/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                  <p className="text-sm text-yellow-400 font-semibold mb-1">Parent</p>
                  <p className="text-base text-gray-200">I noticed you've seemed quieter this week. Everything okay at school?</p>
                </div>
              </motion.div>

              {/* Student Response */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex justify-end"
              >
                <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                  <p className="text-sm text-purple-400 font-semibold mb-1 text-right">Student</p>
                  <p className="text-base text-gray-200">Just feeling a bit overwhelmed with assignments...</p>
                </div>
              </motion.div>

              {/* Parent Follow-up */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex justify-start"
              >
                <div className="bg-yellow-900/30 backdrop-blur-sm border border-yellow-500/20 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                  <p className="text-sm text-yellow-400 font-semibold mb-1">Parent</p>
                  <p className="text-base text-gray-200">Let's talk about it. We can figure this out together.</p>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center pt-4"
              >
                <p className="text-sm text-gray-500 italic">Home observations → proactive support</p>
              </motion.div>
            </div>

            {/* Counsellor-Student Conversation */}
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-400 font-semibold mb-4">Counsellor-Student Conversation</p>

              {/* Counsellor to Student */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex justify-start"
              >
                <div className="bg-cyan-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                  <p className="text-sm text-cyan-400 font-semibold mb-1">Counsellor</p>
                  <p className="text-base text-gray-200">Hey, I've noticed you've been feeling a bit low lately. Want to chat?</p>
                </div>
              </motion.div>

              {/* Student Response */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex justify-end"
              >
                <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                  <p className="text-sm text-purple-400 font-semibold mb-1 text-right">Student</p>
                  <p className="text-base text-gray-200">Yeah, would be good to talk</p>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center pt-4"
              >
                <p className="text-sm text-gray-500 italic">Early signals → caring support</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative py-20 px-6">
        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Our Products</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Choose the right EarlyLight product for your family or institution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Card 1 — Family Pulse */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0 }}
              className="bg-white rounded-2xl border p-6 flex flex-col"
              style={{ borderColor: '#06B6D4' }}
            >
              <Heart style={{ color: '#06B6D4', width: 32, height: 32 }} />
              <h3 className="text-lg font-semibold mt-3 text-gray-900">Family Pulse</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Daily check-ins for parents and children. AI-powered insight. Earlier support. Free for every family.
              </p>
              <Link href="/auth" className="mt-4 text-sm font-medium" style={{ color: '#06B6D4' }}>
                Get started free →
              </Link>
            </motion.div>

            {/* Card 2 — Pre-School Pulse */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="bg-white rounded-2xl border p-6 flex flex-col opacity-60"
              style={{ borderColor: '#e5e7eb' }}
            >
              <Baby style={{ color: '#FBBF24', width: 32, height: 32 }} />
              <h3 className="text-lg font-semibold mt-3 text-gray-900">Pre-School Pulse</h3>
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full text-amber-700 bg-amber-100">Coming soon</span>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Age-appropriate wellbeing tracking designed for children aged 2–6 and their families.
              </p>
            </motion.div>

            {/* Card 3 — Education Pulse Plus */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="bg-white rounded-2xl border p-6 flex flex-col"
              style={{ borderColor: '#9333EA' }}
            >
              <GraduationCap style={{ color: '#9333EA', width: 32, height: 32 }} />
              <h3 className="text-lg font-semibold mt-3 text-gray-900">Education Pulse Plus</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                The complete school wellbeing platform — parents, teachers, counsellors, and SIS data in one view.
              </p>
              <Link href="/#demo" className="mt-4 text-sm font-medium" style={{ color: '#9333EA' }}>
                Request a demo →
              </Link>
            </motion.div>

            {/* Card 4 — Counsellor on Demand */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.24 }}
              className="bg-white rounded-2xl border p-6 flex flex-col opacity-60"
              style={{ borderColor: '#e5e7eb' }}
            >
              <Stethoscope style={{ color: '#0A1128', width: 32, height: 32 }} />
              <h3 className="text-lg font-semibold mt-3 text-gray-900">Counsellor on Demand</h3>
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full text-gray-500 bg-gray-100">Coming soon</span>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Connect families with qualified counsellors directly through the EarlyLight platform.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20 px-6">
        <div className="relative z-10 max-w-6xl mx-auto space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Simple, transparent pricing</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              EarlyLight is free for every family. Institutions pay per student — all roles included.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 items-start">

            {/* Card 1 — Family (most popular) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0 }}
              className="bg-white rounded-2xl border-2 p-6 flex flex-col gap-4"
              style={{ borderColor: '#06B6D4' }}
            >
              <div className="flex justify-start">
                <span className="text-xs font-semibold text-white rounded-full px-3 py-1" style={{ backgroundColor: '#06B6D4' }}>Most popular</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">For Families</p>
                <p className="text-4xl font-black text-gray-900">AED 49</p>
                <p className="text-sm text-gray-400 mt-1">per year</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {["Daily parent check-ins", "Child self check-in", "AI-powered weekly digest", "Ask EarlyLight chat", "Trend charts — 60 day view", "Co-parent / guardian access"].map(f => (
                  <li key={f} className="flex items-center gap-2"><span style={{ color: '#06B6D4' }}>✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/auth" className="mt-auto block text-center py-2.5 px-4 rounded-xl font-semibold text-white text-sm" style={{ backgroundColor: '#06B6D4' }}>
                Get started
              </Link>
            </motion.div>

            {/* Card 2 — Family+ (Coming soon) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 opacity-80"
            >
              <div className="flex justify-start">
                <span className="text-xs font-semibold text-amber-700 bg-amber-100 rounded-full px-3 py-1">Coming soon</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Family+</p>
                <p className="text-4xl font-black text-gray-900">AED 99</p>
                <p className="text-sm text-gray-400 mt-1">per year · with participating schools</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {["Everything in Family", "School SIS data for your child", "Teacher check-in visibility", "Reverse enrichment from school to home"].map(f => (
                  <li key={f} className="flex items-center gap-2"><span className="text-gray-400">✓</span>{f}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 italic">
                Available when your child&apos;s school is an EarlyLight education partner.
              </p>
            </motion.div>

            {/* Card 3 — Education Institutes */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="bg-white rounded-2xl border-2 p-6 flex flex-col gap-4"
              style={{ borderColor: '#9333EA' }}
            >
              <div className="flex justify-start">
                <span className="text-xs font-semibold text-white rounded-full px-3 py-1" style={{ backgroundColor: '#9333EA' }}>For institutions</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">For Schools &amp; Universities</p>
                <p className="text-4xl font-black text-gray-900">From AED 49</p>
                <p className="text-sm text-gray-400 mt-1">per student per year</p>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                {["Everything in Family", "Teacher observation dashboard", "Counsellor clinical tools", "SIS / MIS data integration", "Multi-school analytics", "All stakeholder roles included"].map(f => (
                  <li key={f} className="flex items-center gap-2"><span style={{ color: '#9333EA' }}>✓</span>{f}</li>
                ))}
              </ul>
              <a href="mailto:info@earlylight.health" className="mt-auto block text-center py-2.5 px-4 rounded-xl font-semibold text-white text-sm" style={{ backgroundColor: '#9333EA' }}>
                Contact us for pricing →
              </a>
            </motion.div>

          </div>

          <p className="text-center text-xs text-text-muted max-w-2xl mx-auto leading-relaxed">
            Pre-School Pulse and Counsellor on Demand coming soon. The core EarlyLight platform including Ask EarlyLight AI is free for all families connected to a partner school.
            Questions?{' '}
            <a href="mailto:info@earlylight.health" className="underline hover:text-white transition-colors">info@earlylight.health</a>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Support Your Students Earlier?</h2>
            <p className="text-xl text-gray-400 mb-8">See how research-grounded, human-led insight helps teams notice change and respond with care.</p>

            <PrimaryCTA href="https://pulse.earlylight.health">
              Try the Demo
            </PrimaryCTA>

            <p className="text-sm text-gray-500 mt-6">Prefer to talk first? Open the Guardrails modal above to learn how we keep people at the centre.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-navy/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-text-muted">
              © {new Date().getFullYear()} Pulse — Powered by EarlyLight AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Request Form Modal */}
      <AnimatePresence>
        {isDemoFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsDemoFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-navy border border-white/10 rounded-2xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsDemoFormOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Request a Demo</h2>
                <p className="text-gray-400 text-sm">Let's schedule a personalized demonstration of PULSE</p>
              </div>

              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-3">Request Sent!</h3>
                  <p className="text-gray-400">We'll be in touch soon to schedule your demo.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleDemoSubmit}>
                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                        First name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        disabled={isSubmitting}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                        Last name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        disabled={isSubmitting}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                      placeholder="john.doe@school.edu"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Preferred Date/Time */}
                  <div>
                    <label htmlFor="datetime" className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred date & time *
                    </label>
                    <input
                      type="datetime-local"
                      id="datetime"
                      name="datetime"
                      required
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all disabled:opacity-50"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      What would you like to see in the demo?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none disabled:opacity-50"
                      placeholder="Tell us about your school and what features interest you most..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 py-3.5 rounded-full font-bold text-white transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SENDING REQUEST...' : 'REQUEST DEMO'}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    We respect your privacy. Your information is secure and will never be shared.
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
