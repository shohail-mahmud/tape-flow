import { motion } from "framer-motion";

interface TapeReelProps {
  isSpinning: boolean;
}

export const TapeReel = ({ isSpinning }: TapeReelProps) => {
  return (
    <motion.div
      className="relative rounded-full tape-reel-gradient"
      style={{
        width: "4rem",
        height: "4rem",
        minWidth: "4rem",
        minHeight: "4rem",
        aspectRatio: "1/1",
      }}
      animate={{ rotate: isSpinning ? 360 : 0 }}
      transition={{
        duration: 1.5,
        repeat: isSpinning ? Infinity : 0,
        ease: "linear",
      }}
    >
      {/* Inner circle */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background border-2 border-border"
        style={{
          width: "2rem",
          height: "2rem",
          aspectRatio: "1/1",
        }}
      />
      
      {/* Center hub */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent glow-accent"
        style={{
          width: "0.75rem",
          height: "0.75rem",
          aspectRatio: "1/1",
        }}
      />
    </motion.div>
  );
};
