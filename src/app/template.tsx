"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        mass: 0.5
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
