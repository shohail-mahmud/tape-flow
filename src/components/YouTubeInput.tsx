import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface YouTubeInputProps {
  onAddTrack: (name: string, url: string, type: "youtube") => void;
}

const API_ENDPOINTS = {
  piped: [
    "https://pipedapi.kavin.rocks",
    "https://pipedapi.tokhmi.xyz",
    "https://pipedapi.moomoo.me",
    "https://pipedapi.syncpundit.io",
    "https://api-piped.mha.fi",
  ],
  invidious: [
    "https://iv.ggtyler.dev",
    "https://invidious.protokolla.fi",
    "https://yt.drgnz.club",
  ],
  invidious2: [
    "https://invidious.private.coffee",
    "https://iv.nboeck.de",
    "https://yewtu.be",
  ],
};

export const YouTubeInput = ({ onAddTrack }: YouTubeInputProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApi, setSelectedApi] = useState<keyof typeof API_ENDPOINTS>("piped");
  const { toast } = useToast();

  const extractVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const fetchFromPiped = async (videoId: string, baseUrl: string) => {
    const response = await fetch(`${baseUrl}/streams/${videoId}`);
    if (!response.ok) throw new Error("Piped API failed");

    const data = await response.json();
    let audioStream = null;

    if (data.audioStreams && data.audioStreams.length > 0) {
      audioStream = data.audioStreams.sort((a: any, b: any) => (b.bitrate || 0) - (a.bitrate || 0))[0];
    }

    if (!audioStream) throw new Error("No audio stream found");

    return {
      title: data.title || "YouTube Audio",
      url: audioStream.url,
    };
  };

  const fetchFromInvidious = async (videoId: string, baseUrl: string) => {
    const response = await fetch(`${baseUrl}/api/v1/videos/${videoId}`);
    if (!response.ok) throw new Error("Invidious API failed");

    const data = await response.json();
    let audioFormat = null;

    if (data.adaptiveFormats) {
      audioFormat = data.adaptiveFormats.find((f: any) => f.type && f.type.includes("audio"));
    }

    if (!audioFormat) throw new Error("No audio format found");

    return {
      title: data.title || "YouTube Audio",
      url: audioFormat.url,
    };
  };

  const handleConvert = async () => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const endpoints = API_ENDPOINTS[selectedApi];
    let result = null;

    for (const endpoint of endpoints) {
      try {
        toast({
          title: "Fetching audio...",
          description: `Trying ${selectedApi} API`,
        });

        if (selectedApi === "piped") {
          result = await fetchFromPiped(videoId, endpoint);
        } else {
          result = await fetchFromInvidious(videoId, endpoint);
        }

        break;
      } catch (error) {
        console.log(`Failed with ${endpoint}:`, error);
        continue;
      }
    }

    setIsLoading(false);

    if (result) {
      onAddTrack(result.title, result.url, "youtube");
      setUrl("");
      toast({
        title: "Success!",
        description: "Track added to playlist",
      });
    } else {
      toast({
        title: "Failed to fetch audio",
        description: "Try a different API or video",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && url && !isLoading) {
      handleConvert();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder="Paste YouTube URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={handleConvert} disabled={isLoading || !url} className="glow-accent">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Play"}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">API:</span>
        <Select value={selectedApi} onValueChange={(v) => setSelectedApi(v as keyof typeof API_ENDPOINTS)}>
          <SelectTrigger className="flex-1 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="piped">Piped (Recommended)</SelectItem>
            <SelectItem value="invidious">Invidious</SelectItem>
            <SelectItem value="invidious2">Invidious (Alt)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-xs text-muted-foreground">
        ⚡ Paste any YouTube URL to stream audio directly
      </p>
    </div>
  );
};
