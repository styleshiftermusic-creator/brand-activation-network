"use client";

import { motion } from "framer-motion";

export function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // easeOutExpo for a premium feel
                delay: delay
            }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}
