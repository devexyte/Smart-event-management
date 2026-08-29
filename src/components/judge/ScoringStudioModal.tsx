'use client';

import React, { useState, useEffect } from 'react';
import { useEvent } from '@/context/EventContext';
import {
  Award,
  X,
  Sparkles,
  CheckCircle2,
  GitBranch,
  Globe,
  Video,
  FileText,
  Sliders,
  Check,
} from 'lucide-react';
import { RubricScores } from '@/types';

interface ScoringStudioModalProps {
  submissionId: string | null;
  onClose: () => void;
}

export const ScoringStudioModal: React.FC<ScoringStudioModalProps> = ({
  submissionId,
  onClose,
}) => {
  const {
    currentJudge,
    submissions,
    evaluations,
    teams,
    submitEvaluation,
    addToast,
  } = useEvent();

  const submission = submissions.find((s) => s.id === submissionId);
  const team = teams.find((t) => t.id === submission?.teamId);
  const existingEval = evaluations.find(
    (e) => e.submissionId === submissionId && e.judgeId === currentJudge?.id
  );

  // Rubric state
  const [innovation, setInnovation] = useState<number>(existingEval?.rubric.innovation || 18);
  const [technical, setTechnical] = useState<number>(existingEval?.rubric.technicalImplementation || 22);
  const [problemRelevance, setProblemRelevance] = useState<number>(existingEval?.rubric.problemRelevance || 18);
  const [ux, setUx] = useState<number>(existingEval?.rubric.userExperience || 13);
  const [impact, setImpact] = useState<number>(existingEval?.rubric.impactAndFeasibility || 17);

  const [feedback, setFeedback] = useState<string>(
    existingEval?.feedback ||
      'Strong architecture and impressive performance. The live demo showed great practical feasibility and technical depth.'
  );

  const [selectedStrengths, setSelectedStrengths] = useState<string[]>(
    existingEval?.strengths || ['Low Latency Architecture', 'Intuitive UI', 'High Market Viability']
  );

  const [selectedImprovements, setSelectedImprovements] = useState<string[]>(
    existingEval?.improvementAreas || ['Edge Case Handling']
  );

  // Sync state if existingEval changes
  useEffect(() => {
    if (existingEval) {
      setInnovation(existingEval.rubric.innovation);
      setTechnical(existingEval.rubric.technicalImplementation);
      setProblemRelevance(existingEval.rubric.problemRelevance);
      setUx(existingEval.rubric.userExperience);
      setImpact(existingEval.rubric.impactAndFeasibility);
      setFeedback(existingEval.feedback);
      setSelectedStrengths(existingEval.strengths);
      setSelectedImprovements(existingEval.improvementAreas);
    }
  }, [existingEval]);

  if (!submission || !currentJudge) return null;

  const totalCalculated = innovation + technical + problemRelevance + ux + impact;

  const strengthOptions = [
    'Low Latency Architecture',
    'Novel AI Pipeline',
    'Zero-Knowledge Proofs',
    'Intuitive UI',
    'Robust Error Handling',
    'High Market Viability',
    'Impressive Live Demo',
  ];

  const improvementOptions = [
    'Edge Case Handling',
    'Clarify Regulatory Strategy',
    'Simplify Initial User Flow',
    'Mobile Responsiveness',
    'Scalability Stress Testing',
  ];

  const toggleStrength = (tag: string) => {
    setSelectedStrengths((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleImprovement = (tag: string) => {
    setSelectedImprovements((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const rubric: RubricScores = {
      innovation,
      technicalImplementation: technical,
      problemRelevance,
      userExperience: ux,
      impactAndFeasibility: impact,
    };

    submitEvaluation({
      submissionId: submission.id,
      teamId: submission.teamId,
      judgeId: currentJudge.id,
      judgeName: currentJudge.name,
      rubric,
      totalScore: totalCalculated,
      feedback: feedback.trim(),
      strengths: selectedStrengths,
      improvementAreas: selectedImprovements,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">{submission.title}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-medium">
                  {submission.track}
                </span>
              </div>
              <p className="text-xs text-slate-400">Team: <strong className="text-slate-200">{team?.name}</strong></p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Project Details Briefing */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Problem Statement</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{submission.problemStatement}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Solution & Architecture</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{submission.solution}</p>
            </div>

            {/* Links and Tech Stack */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
              <div className="flex flex-wrap gap-1.5">
                {submission.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono text-indigo-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs">
                {submission.repoUrl && (
                  <a
                    href={submission.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Repo</span>
                  </a>
                )}
                {submission.demoUrl && (
                  <a
                    href={submission.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live App</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Structured Rubric Controls (5 Criteria) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                Structured Evaluation Rubric (100 pts total)
              </h4>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total Calculated Score</span>
                <span className="text-2xl font-black font-mono text-amber-400">
                  {totalCalculated} <span className="text-sm font-normal text-slate-400">/ 100</span>
                </span>
              </div>
            </div>

            {/* 1. Innovation /20 */}
            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-200">1. Innovation & Novelty</span>
                  <p className="text-[10px] text-slate-400">Uniqueness of approach and creative problem solving</p>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">{innovation} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={innovation}
                onChange={(e) => setInnovation(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 2. Technical Implementation /25 */}
            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-200">2. Technical Implementation & Architecture</span>
                  <p className="text-[10px] text-slate-400">Complexity, low-latency, code quality, and engineering depth</p>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">{technical} / 25</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={technical}
                onChange={(e) => setTechnical(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 3. Problem Relevance /20 */}
            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-200">3. Problem & Domain Relevance</span>
                  <p className="text-[10px] text-slate-400">Alignment with track challenge and real-world applicability</p>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">{problemRelevance} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={problemRelevance}
                onChange={(e) => setProblemRelevance(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 4. User Experience & Design /15 */}
            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-200">4. User Experience & Interface Ergonomics</span>
                  <p className="text-[10px] text-slate-400">Design quality, intuitive navigation, responsiveness, and UX</p>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">{ux} / 15</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={ux}
                onChange={(e) => setUx(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 5. Impact & Scalability /20 */}
            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-200">5. Impact & Commercial Viability</span>
                  <p className="text-[10px] text-slate-400">Scalability roadmap, practical feasibility, and potential impact</p>
                </div>
                <span className="font-mono font-bold text-amber-400 text-sm">{impact} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={impact}
                onChange={(e) => setImpact(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          {/* Qualitative Feedback Textarea */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Judge Evaluation Feedback & Notes
            </label>
            <textarea
              rows={3}
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide constructive feedback for the team..."
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 leading-relaxed"
            />
          </div>

          {/* Strengths Chips */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Key Strengths Highlighted</label>
            <div className="flex flex-wrap gap-1.5">
              {strengthOptions.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleStrength(tag)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                    selectedStrengths.includes(tag)
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-950/40 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {selectedStrengths.includes(tag) && <Check className="w-3 h-3 text-emerald-400" />}
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xs font-bold shadow-lg shadow-amber-600/30 transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Submit Score & Update Leaderboard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
