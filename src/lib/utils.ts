import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Participant } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (isNaN(diffInSeconds) || diffInSeconds < 0) return 'Just now';
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  } catch {
    return dateString;
  }
}

/**
 * Intelligent Teammate Matchmaking Algorithm
 * Calculates compatibility score (0 - 100%) between current participant and target participant
 */
export function calculateMatchScore(
  current: Participant,
  target: Participant,
  desiredRoles: string[] = [],
  desiredSkills: string[] = []
): { score: number; reasons: string[] } {
  if (current.id === target.id) return { score: 0, reasons: [] };

  let score = 50; // Base baseline score
  const reasons: string[] = [];

  // Track match
  if (current.primaryTrack === target.primaryTrack) {
    score += 15;
    reasons.push(`Aligned on track: ${current.primaryTrack}`);
  }

  // Complementary Role Check (e.g. AI engineer seeking UI/UX or Frontend)
  if (desiredRoles.length > 0) {
    if (desiredRoles.some(r => target.role.toLowerCase().includes(r.toLowerCase()))) {
      score += 20;
      reasons.push(`Matches desired role: ${target.role}`);
    }
  } else {
    // If not specified, distinct complementary roles score higher than identical roles
    if (current.role !== target.role) {
      score += 10;
      reasons.push(`Complementary skillset: ${target.role}`);
    }
  }

  // Complementary or Overlapping Skills Check
  const currentSkillsLower = current.skills.map(s => s.toLowerCase());
  const targetSkillsLower = target.skills.map(s => s.toLowerCase());
  
  if (desiredSkills.length > 0) {
    const matchedDesired = targetSkillsLower.filter(s =>
      desiredSkills.some(ds => ds.toLowerCase().includes(s) || s.includes(ds.toLowerCase()))
    );
    if (matchedDesired.length > 0) {
      score += Math.min(25, matchedDesired.length * 10);
      reasons.push(`Has target skills: ${matchedDesired.slice(0, 2).join(', ')}`);
    }
  } else {
    // Common interest tags
    const sharedInterests = current.interests.filter(interest =>
      target.interests.some(ti => ti.toLowerCase() === interest.toLowerCase())
    );
    if (sharedInterests.length > 0) {
      score += Math.min(15, sharedInterests.length * 5);
      reasons.push(`Shared interests in ${sharedInterests.slice(0, 2).join(', ')}`);
    }
  }

  // Availability bonus
  if (target.availability === 'Looking for Team') {
    score += 10;
    reasons.push('Actively seeking a team');
  } else if (target.availability === 'Open to Offers') {
    score += 5;
  } else {
    score -= 15; // Already in a team
  }

  // Clamp score between 20 and 99
  const finalScore = Math.min(99, Math.max(25, score));
  return { score: finalScore, reasons };
}

/**
 * Synthesized Web Audio Chimes (No external audio file dependency)
 */
export function playChime(type: 'success' | 'alert' | 'scan' | 'celebrate') {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (type === 'scan' || type === 'success') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'alert') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(370, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'celebrate') {
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
      });
    }
  } catch {
    // Gracefully ignore audio failure if browser policies block before user interaction
  }
}
