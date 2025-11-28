import { useState, useRef, useEffect } from "react";
import { TapeReel } from "./TapeReel";
import { VUMeter } from "./VUMeter";
import { Play, Pause, SkipBack, SkipForward, FastForward, Rewind, Volume2, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useToast } from "@/hooks/use-toast";

interface Track {
  name: string;
  url: string;
  type: "local" | "youtube";
}

interface AudioPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
}

export const AudioPlayer = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [vuLeft, setVuLeft] = useState(0);
  const [vuRight, setVuRight] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setVuLeft(20 + Math.random() * 60);
        setVuRight(20 + Math.random() * 60);
      }, 100);
    } else {
      setVuLeft(0);
      setVuRight(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    onSeek(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleFastForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
    }
  };

  const handleDownload = async () => {
    if (!currentTrack) {
      toast({
        title: "No track loaded",
        description: "Please load a track first",
        variant: "destructive",
      });
      return;
    }

    try {
      // For local files, we can download directly
      if (currentTrack.type === "local") {
        const a = document.createElement("a");
        a.href = currentTrack.url;
        a.download = currentTrack.name;
        a.click();
        toast({
          title: "Download started",
          description: currentTrack.name,
        });
      } else {
        // For YouTube streams, fetch and download
        toast({
          title: "Downloading...",
          description: "This may take a moment",
        });

        const response = await fetch(currentTrack.url);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${currentTrack.name}.mp3`;
        a.click();
        URL.revokeObjectURL(url);

        toast({
          title: "Download complete",
          description: currentTrack.name,
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "Unable to download this track",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="card rounded-2xl p-6 transition-smooth">
      {/* Tape Visualization */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6">
        <div className="flex-shrink-0">
          <TapeReel isSpinning={isPlaying} />
        </div>
        
        <div className="flex-1 max-w-[140px] min-w-0">
          <div className="h-0.5 rounded bg-border mb-3" />
          <div className="text-center">
            <p className="text-sm font-medium truncate px-2">
              {currentTrack?.name || "No track loaded"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
          <div className="h-0.5 rounded bg-border mt-3" />
        </div>
        
        <div className="flex-shrink-0">
          <TapeReel isSpinning={isPlaying} />
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="h-1.5 bg-secondary rounded-full overflow-hidden cursor-pointer mb-6"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-accent rounded-full glow-accent transition-all"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      {/* VU Meters */}
      <div className="flex gap-4 mb-6">
        <VUMeter level={vuLeft} label="L" isActive={isPlaying} />
        <VUMeter level={vuRight} label="R" isActive={isPlaying} />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={onPrevious}
          title="Previous track"
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={handleRewind}
          title="Rewind 10s"
        >
          <Rewind className="w-4 h-4" />
        </Button>
        
        <Button
          size="icon"
          className="rounded-full w-14 h-14 glow-accent"
          onClick={onPlayPause}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={handleFastForward}
          title="Forward 10s"
        >
          <FastForward className="w-4 h-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={onNext}
          title="Next track"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Volume & Download */}
      <div className="flex items-center gap-3">
        <Volume2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <Slider
          value={[volume]}
          onValueChange={(val) => setVolume(val[0])}
          max={100}
          step={1}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-10 text-center">{volume}%</span>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-9 h-9 flex-shrink-0"
          onClick={handleDownload}
          disabled={!currentTrack}
          title="Download track"
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNext}
        preload="auto"
      />
    </div>
  );
};
