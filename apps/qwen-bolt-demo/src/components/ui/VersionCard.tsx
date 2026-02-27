'use client';

import { Eye, Undo2, Bookmark } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';
import { useTranslation } from 'react-i18next';
import type { VersionSnapshot } from '@/hooks/useVersionSnapshots';

interface VersionCardProps {
  snapshot: VersionSnapshot;
  isCurrentVersion: boolean;
  onPreview: (snapshotId: string) => void;
  onRestore: (snapshotId: string) => void;
}

export function VersionCard({ snapshot, isCurrentVersion, onPreview, onRestore }: VersionCardProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl max-w-[85%]">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Bookmark className="w-4 h-4 text-blue-500 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
            {snapshot.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('version.versionLabel', { number: snapshot.version })}
          </p>
        </div>
      </div>

      {!isCurrentVersion && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <Tooltip content={t('version.preview')} side="top">
            <button
              onClick={() => onPreview(snapshot.id)}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </Tooltip>

          <Tooltip content={t('version.restore')} side="top">
            <button
              onClick={() => onRestore(snapshot.id)}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Undo2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
