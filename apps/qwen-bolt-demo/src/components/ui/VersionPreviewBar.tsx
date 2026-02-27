'use client';

import { useTranslation } from 'react-i18next';
import type { VersionSnapshot } from '@/hooks/useVersionSnapshots';

interface VersionPreviewBarProps {
  snapshot: VersionSnapshot;
  onExitPreview: () => void;
  onRestore: () => void;
}

export function VersionPreviewBar({ snapshot, onExitPreview, onRestore }: VersionPreviewBarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-blue-500 text-white text-sm flex-shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-blue-100">{t('version.previewingVersion')}</span>
        <span className="font-semibold truncate">{snapshot.title}</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onExitPreview}
          className="px-3 py-1 text-sm bg-white/20 hover:bg-white/30 rounded transition-colors"
        >
          {t('version.exitPreview')}
        </button>
        <button
          onClick={onRestore}
          className="px-3 py-1 text-sm bg-white text-blue-600 font-medium hover:bg-blue-50 rounded transition-colors"
        >
          {t('version.restoreThisVersion')}
        </button>
      </div>
    </div>
  );
}
