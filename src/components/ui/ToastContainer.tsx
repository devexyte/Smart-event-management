'use client';

import React from 'react';
import { useEvent } from '@/context/EventContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEvent();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
        let border = 'border-emerald-200 bg-white shadow-lg';
        let titleColor = 'text-emerald-900';

        if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
          border = 'border-amber-200 bg-white shadow-lg';
          titleColor = 'text-amber-900';
        } else if (toast.type === 'error') {
          icon = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
          border = 'border-rose-200 bg-white shadow-lg';
          titleColor = 'text-rose-900';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-600 shrink-0" />;
          border = 'border-blue-200 bg-white shadow-lg';
          titleColor = 'text-blue-900';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${border} shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-5`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-semibold ${titleColor}`}>{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed break-words">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
