import { useState, useCallback } from 'react';

export interface VersionSnapshot {
  id: string;
  messageId: string;
  title: string;
  version: number;
  timestamp: number;
  files: Record<string, string>;
}

export function useVersionSnapshots() {
  const [snapshots, setSnapshots] = useState<VersionSnapshot[]>([]);

  const createSnapshot = useCallback((
    messageId: string,
    title: string,
    files: Record<string, string>,
  ): VersionSnapshot => {
    const snapshot: VersionSnapshot = {
      id: `snapshot-${Date.now()}`,
      messageId,
      title: title.slice(0, 60) + (title.length > 60 ? '...' : ''),
      version: 0,
      timestamp: Date.now(),
      files: { ...files },
    };

    setSnapshots(prev => {
      const newVersion = prev.length + 1;
      snapshot.version = newVersion;
      return [...prev, snapshot];
    });

    return snapshot;
  }, []);

  const getSnapshotByMessageId = useCallback((messageId: string): VersionSnapshot | undefined => {
    return snapshots.find(snapshot => snapshot.messageId === messageId);
  }, [snapshots]);

  const restoreSnapshot = useCallback((snapshotId: string): Record<string, string> | null => {
    const snapshot = snapshots.find(snapshotItem => snapshotItem.id === snapshotId);
    if (!snapshot) return null;
    return { ...snapshot.files };
  }, [snapshots]);

  return {
    snapshots,
    createSnapshot,
    getSnapshotByMessageId,
    restoreSnapshot,
  };
}
