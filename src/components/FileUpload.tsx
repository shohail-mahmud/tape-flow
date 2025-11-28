import { useRef } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

export const FileUpload = ({ onFilesSelected }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-accent", "bg-accent/10");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-accent", "bg-accent/10");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-accent", "bg-accent/10");
    
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("audio/")
    );
    
    if (files.length) {
      onFilesSelected(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) {
      onFilesSelected(files);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-smooth hover:border-accent hover:bg-accent/10"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <Upload className="w-10 h-10 text-muted-foreground" />
      <span className="text-sm text-muted-foreground text-center">
        Drop audio files or click to browse
      </span>
      <span className="text-xs text-muted-foreground">
        MP3, WAV, OGG, FLAC, M4A
      </span>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        multiple
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
};
