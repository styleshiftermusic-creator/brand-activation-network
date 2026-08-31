"use client";

import { useRef, useEffect, useState } from "react";

export function ScrollReveal({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (typeof IntersectionObserver === "undefined") {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            { rootMargin: "-60px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <noscript>
                <style>{`
                    .scroll-reveal-fallback {
                        opacity: 1 !important;
                        transform: none !important;
                    }
                `}</style>
            </noscript>
            <div
                ref={ref}
                className="w-full scroll-reveal-fallback"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                }}
            >
                {children}
            </div>
        </>
    );
}
