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

            <div className="text-xs text-muted-foreground pt-2 border-t border-border">
              <p>Version 1.0.0</p>
              <p className="mt-1">Made with ❤️ using React & TypeScript</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
