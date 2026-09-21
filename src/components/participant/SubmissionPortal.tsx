'use client';

import React, { useState } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  Send,
  GitBranch,
  Globe,
  Video,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Code2,
  Layers,
  Clock,
} from 'lucide-react';

export const SubmissionPortal: React.FC = () => {
  const { currentParticipant, teams, submissions, submitProject, addToast } = useEvent();

  if (!currentParticipant) return null;

  const userTeam = teams.find((t) => t.id === currentParticipant.teamId);
  const existingSub = submissions.find((s) => s.teamId === userTeam?.id);

  const [title, setTitle] = useState(existingSub?.title || '');
  const [tagline, setTagline] = useState(existingSub?.tagline || '');
  const [track, setTrack] = useState(existingSub?.track || userTeam?.track || 'AI & Intelligent Systems');
  const [problemStatement, setProblemStatement] = useState(
    existingSub?.problemStatement ||
      'Current workflows in clinical diagnostic triage suffer from excessive latency and manual data consolidation delays.'
  );
  const [solution, setSolution] = useState(
    existingSub?.solution ||
      'An edge-accelerated multimodal neural network processing real-time telemetry and generating structured doctor notes with zero hallucination.'
  );
  const [repoUrl, setRepoUrl] = useState(existingSub?.repoUrl || 'https://github.com/technova2026/project');
  const [demoUrl, setDemoUrl] = useState(existingSub?.demoUrl || 'https://technova-demo.dev');
  const [videoUrl, setVideoUrl] = useState(existingSub?.videoUrl || 'https://youtube.com/watch?v=technova-demo');
  const [slidesUrl, setSlidesUrl] = useState(existingSub?.slidesUrl || 'https://pitch.com/technova-slides');
  const [techStackInput, setTechStackInput] = useState(
    existingSub?.techStack.join(', ') || 'Next.js, PyTorch, FastAPI, Tailwind CSS, TypeScript'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTeam) {
      addToast('Team Required', 'You need to form or join a team first before submitting.', 'error');
      return;
    }
    if (!title.trim()) {
      addToast('Title Required', 'Please enter a project title.', 'error');
      return;
    }

    const techStack = techStackInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    submitProject({
      title: title.trim(),
      tagline: tagline.trim() || userTeam.tagline,
      track,
      problemStatement,
      solution,
      techStack,
      repoUrl,
      demoUrl,
      videoUrl,
      slidesUrl,
    });
  };

  const status = existingSub?.status || 'not_submitted';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-600" />
            Hackathon Project Submission Portal
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Submit your team's code repository, live demo link, and problem/solution architecture for judging evaluation.
          </p>
        </div>

        {userTeam && (
          <span className="text-xs px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono self-start">
            Team: <span className="font-bold">{userTeam.name}</span>
          </span>
        )}
      </div>

      {/* Submission Stepper */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-xs">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
            <div className="text-[10px] font-mono text-blue-600 uppercase">Step 1</div>
            <div>Drafting Details</div>
          </div>
          <div
            className={`p-3 rounded-2xl border font-semibold ${
              status !== 'not_submitted' && status !== 'draft'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="text-[10px] font-mono uppercase">Step 2</div>
            <div>Submitted</div>
          </div>
          <div
            className={`p-3 rounded-2xl border font-semibold ${
              status === 'under_review' || status === 'evaluated'
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="text-[10px] font-mono uppercase">Step 3</div>
            <div>Under Review</div>
          </div>
          <div
            className={`p-3 rounded-2xl border font-semibold ${
              status === 'evaluated'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="text-[10px] font-mono uppercase">Step 4</div>
            <div>Scored / Evaluated</div>
          </div>
        </div>
      </div>

      {/* Main Submission Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Project Title */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Project Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. SurgiVision AI"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">One-line Tagline</label>
            <input
              type="text"
              placeholder="e.g. Edge computer vision co-pilot for laparoscopic surgeries"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Track Selection */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">Track / Category</label>
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
            <option value="AI & Intelligent Systems">AI & Intelligent Systems</option>
            <option value="Web3 & Fintech">Web3 & Fintech</option>
            <option value="Healthcare & Biotech">Healthcare & Biotech</option>
            <option value="Sustainable Tech">Sustainable Tech</option>
          </select>
        </div>

        {/* Problem Statement */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            Problem Statement Being Solved <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            required
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            placeholder="Describe the clinical, societal, or industrial pain point you are tackling..."
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 leading-relaxed"
          />
        </div>

        {/* Solution & Architecture */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            Proposed Solution & Architecture <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            required
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Explain how your solution works, key technical breakthroughs, and architecture..."
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 leading-relaxed"
          />
        </div>

        {/* Tech Stack Chips Input */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1.5">
            Technologies Used (Comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Next.js, PyTorch, CUDA, FastAPI, Tailwind CSS"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <GitBranch className="w-3.5 h-3.5 text-blue-600" />
              <span>GitHub Repository Link</span>
            </label>
            <input
              type="url"
              required
              placeholder="https://github.com/your-org/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Deployment / Demo URL</span>
            </label>
            <input
              type="url"
              placeholder="https://your-demo-app.vercel.app"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Video className="w-3.5 h-3.5 text-blue-600" />
              <span>2-Minute Demo Video Pitch URL</span>
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Presentation Deck / Slides URL</span>
            </label>
            <input
              type="url"
              placeholder="https://pitch.com/your-deck"
              value={slidesUrl}
              onChange={(e) => setSlidesUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            {existingSub ? (
              <span className="text-emerald-700 font-medium">✓ Project already submitted. You can edit anytime.</span>
            ) : (
              <span>Submissions close at 10:00 AM on Day 2.</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{existingSub ? 'Update Submission' : 'Submit for Judging'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
