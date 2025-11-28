import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { Info, Instagram } from "lucide-react";

export const AboutDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" title="About TapeFlow">
          <Info className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            TapeFlow
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <DialogDescription className="space-y-4 pt-2">
            <div>
              <h4 className="font-medium text-foreground mb-2">About</h4>
              <p className="text-sm">
                TapeFlow is a retro-inspired audio player that brings the nostalgic feel of cassette
                tapes to modern web streaming. Stream YouTube audio or play local files with a
                vintage aesthetic.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-2">Features</h4>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>YouTube audio streaming (Piped/Invidious)</li>
                <li>Local file support (MP3, WAV, OGG, FLAC, M4A)</li>
                <li>Playlist management</li>
                <li>5 beautiful themes</li>
                <li>Keyboard shortcuts</li>
                <li>Download tracks</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-2">API Details</h4>
              <div className="text-sm space-y-2">
                <p>
                  TapeFlow uses free, privacy-respecting APIs to stream YouTube audio without
                  tracking:
                </p>
                <ul className="space-y-1 list-disc list-inside ml-2">
                  <li>
                    <strong>Piped API</strong>: Privacy-focused YouTube proxy (pipedapi.kavin.rocks)
                  </li>
                  <li>
                    <strong>Invidious API</strong>: Alternative YouTube frontend (multiple instances)
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  All APIs are open-source and public. No API keys required. Streams are fetched
                  directly from YouTube servers via these privacy-preserving proxies.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-2">Developer</h4>
              <div className="flex flex-col gap-2">
                <a
                  href="https://instagram.com/shohailmahmud09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@shohailmahmud09</span>
                </a>
                <a
                  href="https://github.com/shohail-mahmud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>github.com/shohail-mahmud</span>
                </a>
              </div>
            </div>

            <div className="text-xs text-muted-foreground pt-2 border-t border-border space-y-1">
              <p>Version 1.0.0</p>
              <p>Built with React, TypeScript & Vite</p>
              <p>Open source • Privacy-focused • No tracking</p>
            </div>
          </DialogDescription>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
