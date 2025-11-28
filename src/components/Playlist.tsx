import { Play, Pause, X, Music, Film } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface Track {
  name: string;
  url: string;
  type: "local" | "youtube";
}

interface PlaylistProps {
  tracks: Track[];
  currentIndex: number;
  isPlaying: boolean;
  onTrackSelect: (index: number) => void;
  onTrackRemove: (index: number) => void;
  onClearAll: () => void;
}

export const Playlist = ({
  tracks,
  currentIndex,
  isPlaying,
  onTrackSelect,
  onTrackRemove,
  onClearAll,
}: PlaylistProps) => {
  if (tracks.length === 0) return null;

  return (
    <div className="card rounded-2xl overflow-hidden transition-smooth">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <span className="text-sm font-medium">Playlist ({tracks.length})</span>
        <button
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear all
        </button>
      </div>

      <ScrollArea className="max-h-64">
        {tracks.map((track, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 p-3 transition-smooth ${
              index === currentIndex ? "bg-accent/10 border-l-2 border-accent" : ""
            }`}
          >
            <div 
              className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
              onClick={() => onTrackSelect(index)}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-secondary">
                {index === currentIndex && isPlaying ? (
                  <Pause className="w-3 h-3 text-accent" />
                ) : (
                  <Play className="w-3 h-3 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-sm truncate block">{track.name}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  {track.type === "youtube" ? (
                    <>
                      <Film className="w-3 h-3" /> YouTube
                    </>
                  ) : (
                    <>
                      <Music className="w-3 h-3" /> Local
                    </>
                  )}
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 min-w-[36px] flex-shrink-0 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground touch-manipulation rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                onTrackRemove(index);
              }}
              title="Remove track"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
