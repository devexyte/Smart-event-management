'use client';

import React, { useState, useMemo } from 'react';
import { useEvent } from '@/context/EventContext';
import { calculateMatchScore } from '@/lib/utils';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  UserCheck,
  UserPlus,
  Clock,
  Check,
  ChevronRight,
  ExternalLink,
  Layers,
  GraduationCap,
} from 'lucide-react';

export const TeammateMatchmaker: React.FC = () => {
  const {
    currentParticipant,
    participants,
    sendConnectionRequest,
    acceptConnectionRequest,
    teams,
  } = useEvent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [minMatchScore, setMinMatchScore] = useState<number>(0);

  if (!currentParticipant) return null;

  // Filter and Score Candidates
  const matchedCandidates = useMemo(() => {
    return participants
      .filter((p) => p.id !== currentParticipant.id)
      .map((p) => {
        const { score, reasons } = calculateMatchScore(currentParticipant, p);
        return {
          ...p,
          matchScore: score,
          matchReasons: reasons,
        };
      })
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesRole = p.role.toLowerCase().includes(q);
          const matchesSkills = p.skills.some((s) => s.toLowerCase().includes(q));
          const matchesInterests = p.interests.some((i) => i.toLowerCase().includes(q));
          if (!matchesName && !matchesRole && !matchesSkills && !matchesInterests) return false;
        }

        // Role filter
        if (selectedRole !== 'all' && !p.role.toLowerCase().includes(selectedRole.toLowerCase())) {
          return false;
        }

        // Track filter
        if (selectedTrack !== 'all' && p.primaryTrack !== selectedTrack) {
          return false;
        }

        // Availability filter
        if (selectedAvailability !== 'all' && p.availability !== selectedAvailability) {
          return false;
        }

        // Score filter
        if (p.matchScore < minMatchScore) {
          return false;
        }

        return true;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [
    participants,
    currentParticipant,
    searchQuery,
    selectedRole,
    selectedTrack,
    selectedAvailability,
    minMatchScore,
  ]);

  const allRoles = [
    'all',
    'AI / ML Engineer',
    'Frontend Developer',
    'Backend Architect',
    'UI/UX Designer',
    'Fullstack Developer',
    'Data Scientist',
    'Smart Contract & Solidity Dev',
  ];

  const allTracks = [
    'all',
    'AI & Intelligent Systems',
    'Web3 & Fintech',
    'Healthcare & Biotech',
    'Sustainable Tech',
  ];

  return (
    <div className="space-y-6">
      {/* Header with smart matching banner */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Intelligent Team Discovery</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Smart Teammate Matchmaker</h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Our matching engine analyzes complementary skills, preferred tracks, and role gaps to recommend optimal hackathon teammates for you.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-center shrink-0">
            <span className="text-[10px] text-slate-500 font-medium block">Candidates Evaluated</span>
            <span className="text-lg font-bold font-mono text-blue-700">
              {matchedCandidates.length} Matched
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by skill, name, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Role Filter */}
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="all">All Desired Roles</option>
              {allRoles.filter((r) => r !== 'all').map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Track Filter */}
          <div>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="all">All Tracks</option>
              {allTracks.filter((t) => t !== 'all').map((track) => (
                <option key={track} value={track}>
                  {track}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            >
              <option value="all">Any Availability</option>
              <option value="Looking for Team">Looking for Team Only</option>
              <option value="Open to Offers">Open to Offers</option>
              <option value="In a Team">Already in a Team</option>
            </select>
          </div>
        </div>
      </div>

      {/* Match Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {matchedCandidates.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white border border-slate-200 rounded-3xl shadow-xs">
            <Users className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-700">No matching participants found</h3>
            <p className="text-xs text-slate-500 mt-1">Try broadening your search keywords or filter criteria.</p>
          </div>
        ) : (
          matchedCandidates.map((candidate) => {
            const isConnected = currentParticipant.connections.includes(candidate.id);
            const isSent = currentParticipant.connectionRequestsSent.includes(candidate.id);
            const isReceived = currentParticipant.connectionRequestsReceived.includes(candidate.id);

            // Match Score styling
            let badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            if (candidate.matchScore < 70) {
              badgeBg = 'bg-blue-50 text-blue-700 border-blue-200';
            }
            if (candidate.matchScore < 50) {
              badgeBg = 'bg-slate-100 text-slate-700 border-slate-200';
            }

            return (
              <div
                key={candidate.id}
                className="bg-white border border-slate-200 hover:border-blue-300 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative overflow-hidden"
              >
                <div>
                  {/* Top Row: Avatar, Name, Match Score */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-slate-900 truncate">{candidate.name}</h3>
                        <p className="text-xs text-blue-600 font-medium truncate">{candidate.role}</p>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <GraduationCap className="w-3 h-3 text-slate-400" />
                          {candidate.experienceLevel}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono border flex items-center gap-1 shrink-0 ${badgeBg}`}
                    >
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span>{candidate.matchScore}% Match</span>
                    </div>
                  </div>

                  {/* Match Reason highlights */}
                  {candidate.matchReasons.length > 0 && (
                    <div className="mb-3 p-2 rounded-xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-800 font-medium">
                      💡 {candidate.matchReasons[0]}
                    </div>
                  )}

                  {/* Bio */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                    "{candidate.bio}"
                  </p>

                  {/* Skills tags */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-[10px]"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-lg bg-slate-100 text-slate-500 text-[10px]">
                          +{candidate.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Track & Availability status */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4 pt-2 border-t border-slate-100">
                    <span className="truncate max-w-[130px]">{candidate.primaryTrack}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        candidate.availability === 'Looking for Team'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : candidate.availability === 'Open to Offers'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {candidate.availability}
                    </span>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2">
                  {isConnected ? (
                    <div className="w-full py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center justify-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Connected Teammate</span>
                    </div>
                  ) : isReceived ? (
                    <button
                      onClick={() => acceptConnectionRequest(candidate.id)}
                      className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Accept Invitation</span>
                    </button>
                  ) : isSent ? (
                    <div className="w-full py-2 px-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium flex items-center justify-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                      <span>Request Pending...</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => sendConnectionRequest(candidate.id)}
                      className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02]"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Send Team Invite</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
