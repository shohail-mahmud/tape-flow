import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            TapeFlow
          </DialogTitle>
          <DialogDescription className="space-y-4 pt-4">
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
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com/shohailmahmud09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-accent transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@shohailmahmud09</span>
                </a>
              </div>
            </div>

            <div className="text-xs text-muted-foreground pt-2 border-t border-border space-y-1">
              <p>Version 1.0.0</p>
              <p>Built with React, TypeScript & Vite</p>
              <p>Open source • Privacy-focused • No tracking</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
