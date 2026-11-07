import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGrantly } from '../../context/GrantlyContext';
import { ArrowRight, Check } from 'lucide-react';
import { LiquidEther } from '../../components/canvas/LiquidEther';

export function LoginPage() {
  const navigate = useNavigate();
  const { switchRole } = useGrantly();

  const [selectedRole, setSelectedRole] = useState('Student');

  const personas = [
    {
      role: 'Student',
      name: 'Aisha Patel',
      desc: 'Junior · Computer Science (3.84 GPA)',
      tag: 'Tuition Gap: $19,800',
    },
    {
      role: 'Financial Aid Advisor',
      name: 'Dr. Marcus Vance',
      desc: 'Dean of Undergraduate Financial Assistance',
      tag: '142 Active Cohorts',
    },
    {
      role: 'Scholarship Donor',
      name: 'Claire Sterling',
      desc: 'Director · Sterling Memorial Trust',
      tag: 'Disbursement Desk',
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    switchRole(selectedRole);
    if (selectedRole === 'Student') {
      navigate('/discover');
    } else {
      navigate('/oversight');
    }
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden flex items-center justify-center p-4 sm:p-8 relative select-none font-sans bg-[#08090d]">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* LIQUID ETHER FLUID SIMULATION BACKGROUND                      */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <LiquidEther
          colors={['#141418', '#8c694b', '#a78b71', '#c9b8a0', '#f5e6c8']}
          mouseForce={28}
          cursorSize={130}
          autoDemo={true}
          autoSpeed={0.6}
          autoIntensity={2.5}
          resolution={0.55}
          BFECC={true}
        />
      </div>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* CENTRAL FLOATING GLASS CARD WIDGET (LabTrack Architecture)        */}
      {/* ───────────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-4xl rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.12)] border border-white/10 backdrop-blur-2xl bg-[#141416]/90 overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 min-h-[500px]">
        {/* Specular Edge Bevel (Top glass reflection) */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* ───────────────────────────────────────────────────────────── */}
        {/* LEFT PANEL: Pure Typographic "Grantly" Display in Glass       */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="relative hidden md:flex flex-col items-center justify-center overflow-hidden border-r border-white/10 p-10 bg-[#121215]/80">
          {/* Ambient Warm Gold Radial Glow shining from behind */}
          <div className="absolute w-64 h-64 rounded-full bg-[#a78b71]/20 blur-[80px] pointer-events-none" />

          {/* Pure Grantly Wordmark */}
          <div className="relative z-10 text-center select-none">
            <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0] leading-none drop-shadow-[0_4px_30px_rgba(201,184,160,0.35)]">
              Grantly
            </h1>
            <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-[#c9b8a0]/70 to-transparent mx-auto mt-4 mb-3" />
            <p className="text-xs font-sans font-semibold uppercase tracking-[0.28em] text-[#c9b8a0]/80">
              Rethinking Scholarships
            </p>
            <p className="text-xs text-[#8c91a0] mt-3 max-w-xs mx-auto leading-relaxed">
              Find relevant opportunities. Track every dollar. Graduate debt-free.
            </p>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* RIGHT PANEL: Persona Selection & Instant Access Gateway       */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center p-8 sm:p-10 bg-[#141416]/90 space-y-6">
          <div>
            <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#c9b8a0]">
              The Outpost Hackathon
            </div>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight mt-0.5">
              Select Your Perspective
            </h2>
            <p className="text-xs text-[#8c91a0] mt-1 font-sans">
              Choose an authenticated demo persona to explore Grantly.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              {personas.map((p) => {
                const isSelected = selectedRole === p.role;
                return (
                  <div
                    key={p.role}
                    onClick={() => setSelectedRole(p.role)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#c9b8a0]/15 border-[#c9b8a0]/50 shadow-[0_0_20px_rgba(201,184,160,0.15)]'
                        : 'bg-[#181920]/80 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-xs text-white">
                          {p.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-[#c9b8a0] font-semibold">
                          {p.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#8c91a0]">{p.desc}</div>
                    </div>

                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#c9b8a0] bg-[#c9b8a0]' : 'border-white/20'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-sans font-semibold text-xs sm:text-sm bg-gradient-to-r from-white via-[#f5e6c8] to-[#c9b8a0] text-black shadow-[0_4px_20px_rgba(201,184,160,0.3)] hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Enter Grantly Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-white/10 text-[11px] text-[#6b7182] text-center">
            Built for THE OUTPOST 6-Hour Challenge by Frontend Arena.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
