import { useState, useEffect } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { YouTubeInput } from "@/components/YouTubeInput";
import { FileUpload } from "@/components/FileUpload";
import { Playlist } from "@/components/Playlist";
import { ThemeSelector } from "@/components/ThemeSelector";
import { AboutDialog } from "@/components/AboutDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music } from "lucide-react";

interface Track {
  name: string;
  url: string;
  type: "local" | "youtube";
}

const Index = () => {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAddTrack = (name: string, url: string, type: "local" | "youtube") => {
    const newTrack: Track = { name, url, type };
    setPlaylist((prev) => [...prev, newTrack]);
    
    // Auto-play if this is the first track
    if (playlist.length === 0) {
      setCurrentIndex(0);
      setIsPlaying(true);
    } else if (currentIndex === -1) {
      setCurrentIndex(playlist.length);
      setIsPlaying(true);
    }
  };

  const handleFilesSelected = (files: File[]) => {
    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      const name = file.name.replace(/\.[^/.]+$/, "");
      handleAddTrack(name, url, "local");
    });
  };

  const handleTrackSelect = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const handleTrackRemove = (index: number) => {
    const newPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(newPlaylist);

    if (index === currentIndex) {
      setIsPlaying(false);
      setCurrentIndex(-1);
    } else if (index < currentIndex) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleClearAll = () => {
    setPlaylist([]);
    setCurrentIndex(-1);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (playlist.length === 0) return;
    const nextIndex = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (playlist.length === 0) return;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (currentIndex === -1 && playlist.length > 0) {
      setCurrentIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlayPause();
          break;
        case "KeyN":
          handleNext();
          break;
        case "KeyP":
          handlePrevious();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, playlist, isPlaying]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-lg space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight flex items-center gap-2">
              <Music className="w-6 h-6 text-accent" />
              TapeFlow
            </h1>
            <p className="text-xs text-muted-foreground">YouTube Audio Player</p>
          </div>
          <div className="flex items-center gap-2">
            <AboutDialog />
            <ThemeSelector />
          </div>
        </div>

        {/* Main Player */}
        <AudioPlayer
          currentTrack={currentIndex >= 0 ? playlist[currentIndex] : null}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSeek={() => {}}
        />

        {/* Input Tabs */}
        <div className="card rounded-2xl overflow-hidden">
          <Tabs defaultValue="youtube" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-transparent border-b border-border rounded-none h-auto">
              <TabsTrigger
                value="youtube"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-accent"
              >
                YouTube URL
              </TabsTrigger>
              <TabsTrigger
                value="upload"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-accent"
              >
                Upload File
              </TabsTrigger>
            </TabsList>

            <TabsContent value="youtube" className="p-5 m-0">
              <YouTubeInput onAddTrack={handleAddTrack} />
            </TabsContent>

            <TabsContent value="upload" className="p-5 m-0">
              <FileUpload onFilesSelected={handleFilesSelected} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Playlist */}
        <Playlist
          tracks={playlist}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          onTrackSelect={handleTrackSelect}
          onTrackRemove={handleTrackRemove}
          onClearAll={handleClearAll}
        />

        {/* Info */}
        <div className="text-center space-y-1 pt-2">
          <p className="text-xs text-muted-foreground">
            🎵 Stream YouTube audio or upload local files
          </p>
          <p className="text-xs text-muted-foreground">
            ⌨️ Space: Play/Pause | N: Next | P: Previous
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
