import { useState, useCallback, useRef, useEffect } from 'react';
import type { DevServer } from '@/components/workspace';
import { useWebContainer } from './useWebContainer';
import { findProjectRoot } from '@/lib/file-utils';

// .npmrc content for faster npm install using China mirror
const NPMRC_CONTENT = `registry=https://registry.npmmirror.com
fetch-retries=3
fetch-retry-mintimeout=5000
fetch-retry-maxtimeout=30000
`;

export function useDevServer(sessionId: string, files: Record<string, string>) {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [devServer, setDevServer] = useState<DevServer | null>(null);
  const [isStartingServer, setIsStartingServer] = useState(false);
  const [serverError, setServerError] = useState<string>('');
  const [devServerLogs, setDevServerLogs] = useState<string[]>([]);
  
  const { webcontainer, isLoading: isWebContainerLoading, error: webContainerError } = useWebContainer();
  const npmrcWrittenRef = useRef(false);

  // Write .npmrc to WebContainer for faster npm install
  useEffect(() => {
    async function writeNpmrc() {
      if (!webcontainer || npmrcWrittenRef.current) return;
      
      try {
        await webcontainer.fs.writeFile('.npmrc', NPMRC_CONTENT);
        npmrcWrittenRef.current = true;
        console.log('[DevServer] .npmrc written to WebContainer for faster installs');
        setDevServerLogs(prev => [...prev, '[System] npm mirror configured for faster installs.']);
      } catch (error) {
        console.warn('[DevServer] Failed to write .npmrc:', error);
      }
    }
    
    writeNpmrc();
  }, [webcontainer]);

  // Reset npmrc flag when WebContainer changes
  useEffect(() => {
    if (!webcontainer) {
      npmrcWrittenRef.current = false;
    }
  }, [webcontainer]);

  // Listen for server-ready events from WebContainer
  useEffect(() => {
    if (!webcontainer) return;

    const handleServerReady = (port: number, url: string) => {
      console.log('[DevServer] Server Ready:', url);
      setPreviewUrl(url);
      setDevServer({
        port,
        framework: 'WebContainer',
        url
      });
      setIsStartingServer(false);
      setDevServerLogs(prev => [...prev, `[System] Server ready at ${url}`]);
    };

    webcontainer.on('server-ready', handleServerReady);
  }, [webcontainer]);

  const startDevServer = useCallback(async () => {
    if (!webcontainer || isStartingServer) return;

    setIsStartingServer(true);
    setServerError('');
    setDevServerLogs(prev => [...prev, '[System] Initiating development environment...']);

    try {
      const projectRoot = findProjectRoot(files);
      const rootPath = projectRoot === '.' ? '' : projectRoot;
      const cdCommand = rootPath ? `cd ${rootPath} && ` : '';

      // Find package.json to determine dev script
      const packageJsonPath = Object.keys(files).find(f => {
        const cleanPath = f.startsWith('/') ? f.substring(1) : f;
        return cleanPath === (projectRoot === '.' ? 'package.json' : `${projectRoot}/package.json`);
      });

      if (packageJsonPath) {
          const content = files[packageJsonPath];
          let devScript = 'npm run dev';
          try {
              const pkg = JSON.parse(content);
              if (!pkg.scripts?.dev && pkg.scripts?.start) {
                  devScript = 'npm start';
              }
          } catch (parseError) {
              console.warn('[DevServer] Failed to parse package.json:', parseError);
          }

          // Dispatch install + dev command to the terminal shell
          setTimeout(() => {
            const command = `export HOST=0.0.0.0 && ${cdCommand}npm install && ${devScript} -- --host 0.0.0.0`;
            console.log('[DevServer] Dispatching command:', command);
            window.dispatchEvent(new CustomEvent('bolt:run-command', { 
                detail: { command } 
            }));
          }, 500);

      } else {
          setServerError('No package.json found');
          setDevServerLogs(prev => [...prev, '[Error] No package.json found.']);
          setIsStartingServer(false);
      }

    } catch (error: any) {
      console.error('[DevServer] Error:', error);
      setServerError(error.message);
      setIsStartingServer(false);
    }
  }, [webcontainer, isStartingServer, files]);

  const stopDevServer = useCallback(() => {
    if (webcontainer) {
        webcontainer.spawn('killall', ['node']);
        setDevServerLogs(prev => [...prev, '[System] Server process terminated.']);
        setPreviewUrl('');
        setDevServer(null);
        setIsStartingServer(false);
    }
  }, [webcontainer]);

  const restartDevServer = useCallback(() => {
     stopDevServer();
     setTimeout(() => startDevServer(), 1000);
  }, [stopDevServer, startDevServer]);

  const refreshPreview = useCallback(() => {
     if (previewUrl) {
       const current = previewUrl;
       setPreviewUrl('');
       setTimeout(() => setPreviewUrl(current), 50);
     }
  }, [previewUrl]);

  return {
    previewUrl,
    setPreviewUrl,
    devServer,
    setDevServer,
    isStartingServer,
    serverError,
    devServerLogs,
    startDevServer,
    stopDevServer,
    restartDevServer,
    refreshPreview,
    isWebContainerLoading,
    webContainerError
  };
}
