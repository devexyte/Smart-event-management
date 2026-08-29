'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEvent } from '@/context/EventContext';
import { UserRole } from '@/types';
import {
  Sparkles,
  UserCheck,
  Award,
  ShieldCheck,
  RotateCcw,
  Radio,
  ChevronDown,
  Layers,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const {
    currentRole,
    setRole,
    currentParticipant,
    currentParticipantId,
    setCurrentParticipantId,
    currentJudge,
    currentJudgeId,
    setCurrentJudgeId,
    participants,
    judges,
    eventInfo,
    stats,
    resetToDemoData,
  } = useEvent();

  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Event Title */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
                    EventFlow
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  {eventInfo.name} • {eventInfo.location}
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Interactive Role Switcher Pill */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setRole('participant')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentRole === 'participant'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/25 ring-1 ring-white/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Participant</span>
            </button>

            <button
              onClick={() => setRole('judge')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentRole === 'judge'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-500/25 ring-1 ring-white/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Judge</span>
            </button>

            <button
              onClick={() => setRole('organizer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                currentRole === 'organizer'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-500/25 ring-1 ring-white/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Organizer</span>
            </button>
          </div>

          {/* Right: Active Persona Selector & Reset Button */}
          <div className="flex items-center gap-3">
            {/* Active User Persona Dropdown for quick testing */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors"
                title="Switch test persona"
              >
                {currentRole === 'participant' && currentParticipant && (
                  <>
                    <img
                      src={currentParticipant.avatar}
                      alt={currentParticipant.name}
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-indigo-500"
                    />
                    <div className="text-left hidden md:block">
                      <p className="font-medium text-slate-200 truncate max-w-[100px]">{currentParticipant.name}</p>
                    </div>
                  </>
                )}
                {currentRole === 'judge' && currentJudge && (
                  <>
                    <img
                      src={currentJudge.avatar}
                      alt={currentJudge.name}
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-amber-500"
                    />
                    <div className="text-left hidden md:block">
                      <p className="font-medium text-slate-200 truncate max-w-[110px]">{currentJudge.name}</p>
                    </div>
                  </>
                )}
                {currentRole === 'organizer' && (
                  <>
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                      HQ
                    </div>
                    <span className="font-medium text-slate-200 hidden md:inline">Command HQ</span>
                  </>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Persona Dropdown Menu */}
              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in-50">
                  <div className="px-3 py-1.5 border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {currentRole === 'participant' ? 'Switch Participant Persona' : currentRole === 'judge' ? 'Switch Judge Persona' : 'Organizer View'}
                  </div>

                  {currentRole === 'participant' && (
                    <div className="max-h-60 overflow-y-auto py-1">
                      {participants.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setCurrentParticipantId(p.id);
                            setShowPersonaMenu(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs hover:bg-slate-800 transition-colors ${
                            currentParticipantId === p.id ? 'bg-indigo-500/15 text-indigo-300 font-medium' : 'text-slate-300'
                          }`}
                        >
                          <img src={p.avatar} alt={p.name} className="w-6 h-6 rounded-full object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-semibold">{p.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{p.role}</p>
                          </div>
                          {p.checkInStatus === 'checked_in' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Checked in" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {currentRole === 'judge' && (
                    <div className="py-1">
                      {judges.map((j) => (
                        <button
                          key={j.id}
                          onClick={() => {
                            setCurrentJudgeId(j.id);
                            setShowPersonaMenu(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs hover:bg-slate-800 transition-colors ${
                            currentJudgeId === j.id ? 'bg-amber-500/15 text-amber-300 font-medium' : 'text-slate-300'
                          }`}
                        >
                          <img src={j.avatar} alt={j.name} className="w-6 h-6 rounded-full object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="truncate font-semibold">{j.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{j.track}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {currentRole === 'organizer' && (
                    <div className="px-3 py-2 text-xs text-slate-300">
                      <p className="font-semibold text-emerald-400">Chief Event Coordinator</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Full administrative oversight & broadcast authority.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => {
                if (confirm('Reset platform data back to initial TechNova 2026 state?')) {
                  resetToDemoData();
                }
              }}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
