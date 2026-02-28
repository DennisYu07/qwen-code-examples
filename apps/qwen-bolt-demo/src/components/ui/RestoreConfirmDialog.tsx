'use client';

import { Info, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { VersionSnapshot } from '@/hooks/useVersionSnapshots';

interface RestoreConfirmDialogProps {
  snapshot: VersionSnapshot;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RestoreConfirmDialog({ snapshot, onConfirm, onCancel }: RestoreConfirmDialogProps) {
  const { t } = useTranslation();

  const formattedDate = new Date(snapshot.timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Info className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-4">
          {t('version.restoreConfirmTitle')}
        </h3>

        {/* Snapshot info */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 mb-6">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {snapshot.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {formattedDate}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            {t('version.cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            {t('version.restoreVersion')}
          </button>
        </div>
      </div>
    </div>
  );
}
