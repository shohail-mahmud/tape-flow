import { motion } from "framer-motion";

interface TapeReelProps {
  isSpinning: boolean;
}

export const TapeReel = ({ isSpinning }: TapeReelProps) => {
  return (
    <motion.div
      className="relative w-16 h-16 rounded-full tape-reel-gradient"
      animate={{ rotate: isSpinning ? 360 : 0 }}
      transition={{
        duration: 1.5,
        repeat: isSpinning ? Infinity : 0,
        ease: "linear",
      }}
    >
      {/* Inner circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border-2 border-border" />
      
      {/* Center hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent glow-accent" />
    </motion.div>
  );
};
