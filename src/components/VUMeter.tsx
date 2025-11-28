import { motion } from "framer-motion";

interface VUMeterProps {
  level: number;
  label: string;
  isActive: boolean;
}

export const VUMeter = ({ level, label, isActive }: VUMeterProps) => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div
          className={`w-2 h-2 rounded-full transition-all ${
            isActive ? "bg-accent glow-accent" : "bg-muted-foreground"
          }`}
        />
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent)) 70%, #ef4444 100%)",
          }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
};
