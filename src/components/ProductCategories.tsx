"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Brain, Car } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Category = {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
  href: string;
  theme: {
    base: string; // e.g. "from-purple-600"
    accent: string; // color hex or tailwind (used inline)
    glow: string; // rgba for glow
  };
};

const categories: Category[] = [
  {
    title: "AI Domain Products",
    description:
      "Cutting-edge AI solutions designed to ease daily tasks and enhance productivity.",
    icon: <Brain className="h-10 w-10" />,
    items: [
      "Invera LLM Proxy",
      "Invera SanjayDrishti",
      "Invera AuraSight",
      "Legal Document Analyzer",
      "Invera Missing Person Finder",
    ],
    href: "/products?tab=ai",
    theme: {
      base: "from-purple-600 via-pink-500 to-purple-500",
      accent: "#A855F7",
      glow: "rgba(53, 96, 239, 0.18)",
    },
  },
  {
    title: "User Usage Products",
    description:
      "Practical solutions for everyday challenges, from parking management to document creation.",
    icon: <Car className="h-10 w-10" />,
    items: [
      "Multilevel Parking Slot Locator",
      "Legal Document Analyzer",
      "Invera Outlier Identifiers",
    ],
    href: "/products?tab=user",
    theme: {
      base: "from-blue-500 via-cyan-400 to-blue-400",
      accent: "#38BDF8",
      glow: "rgba(56,189,248,0.15)",
    },
  },
];

export default function ProductCategories() {
  // Section-level cursor motion values (for the large soft blob)
  const sectionRef = useRef<HTMLElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // normalized coordinates relative to section
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    };

    // track mouse anywhere over the section
    el.addEventListener("mousemove", onMove);
    el.addEventListener("touchmove", (ev: TouchEvent) => {
      if (ev.touches && ev.touches[0]) {
        onMove(ev.touches[0] as unknown as MouseEvent);
      }
    });

    return () => {
      el.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY]);

  // Card-level per-card cursor state
  // We'll keep a map of card index => {x,y,active}
  const [cardState, setCardState] = useState<
    Record<
      number,
      { x: number; y: number; active: boolean; size: number; intensity: number }
    >
  >({});

  // helper to update card state (debounced-ish by requestAnimationFrame inside handler by browser)
  const handleCardMove = (
    index: number,
    e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCardState((prev) => ({ ...prev, [index]: { x, y, active: true, size: Math.max(rect.width, rect.height), intensity: 1 } }));
  };

  const handleCardLeave = (index: number) => {
    setCardState((prev) => ({ ...prev, [index]: { ...(prev[index] || { x: 0, y: 0 }), active: false, size: prev[index]?.size || 400, intensity: 0 } }));
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-black relative overflow-hidden select-none"
      aria-labelledby="solutions-heading"
    >
      {/* Section-level soft follow blob */}
      <motion.div
        style={{
          translateX: smoothX,
          translateY: smoothY,
        }}
        // We'll offset the blob so it's centered on cursor
        className="pointer-events-none absolute -z-10 left-0 top-0"
      >
        <div
          // blob size + blend mode for soft effect
          style={{
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            filter: "blur(80px)",
            mixBlendMode: "screen",
            background:
              "radial-gradient(closest-side, rgba(168,85,247,0.12), transparent 40%), radial-gradient(closest-side, rgba(56,189,248,0.06), transparent 40%)",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            id="solutions-heading"
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white"
          >
            Our Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our range of intelligent products designed to solve basic
            problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => {
            const theme = category.theme;
            const cs = cardState[index] || { x: 0, y: 0, active: false, size: 400, intensity: 0 };

            // Card-level neon background (radial at cursor)
            const cardGlowStyle: React.CSSProperties = {
              // using background image radial gradient positioned by percentage
              backgroundImage: cs.active
                ? `radial-gradient(circle at ${cs.x}px ${cs.y}px, ${category.theme.glow}, transparent 40%)`
                : `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.00), transparent 30%)`,
              transition: cs.active ? "background 0.12s linear" : "background 0.5s ease",
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="transform-gpu"
              >
                <Link
                  href={category.href}
                  className="block h-full group"
                  // card-level mouse handlers (for desktop)
                  onMouseMove={(e) => handleCardMove(index, e)}
                  onMouseLeave={() => handleCardLeave(index)}
                  onTouchStart={(e) => {
                    // touch: set to center of touch
                    const t = e.touches?.[0];
                    if (t) {
                      // create a fake mouse event-like object
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      const x = t.clientX - rect.left;
                      const y = t.clientY - rect.top;
                      setCardState((prev) => ({ ...prev, [index]: { x, y, active: true, size: Math.max(rect.width, rect.height), intensity: 1 } }));
                    }
                  }}
                  onTouchMove={(e) => {
                    const t = e.touches?.[0];
                    if (t) {
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      const x = t.clientX - rect.left;
                      const y = t.clientY - rect.top;
                      setCardState((prev) => ({ ...prev, [index]: { x, y, active: true, size: Math.max(rect.width, rect.height), intensity: 1 } }));
                    }
                  }}
                  onTouchEnd={() => handleCardLeave(index)}
                >
                  <div
                    className={`relative h-full rounded-xl overflow-hidden transition-shadow duration-300 border border-white/8 group-hover:border-opacity-40`}
                    style={{
                      // neon border using box-shadow + border color derived from theme accent
                      boxShadow: cs.active
                        ? `0 8px 40px ${category.theme.glow}, inset 0 0 30px rgba(255,255,255,0.02)`
                        : `0 6px 20px rgba(0,0,0,0.6)`,
                      border: `1px solid rgba(255,255,255,0.04)`,
                    }}
                  >
                    {/* animated neon outline (inset pseudo-like) */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none -z-1"
                      style={{
                        // gradient border via mask: use background + padding to simulate neon outline
                        background: `linear-gradient(90deg, ${theme.accent} 0%, rgba(255,255,255,0.06) 50%, ${theme.accent} 100%)`,
                        opacity: 0.08,
                        filter: "blur(20px)",
                        transform: "scale(1.02)",
                      }}
                    />

                    {/* inner content with small translucent backdrop */}
                    <div
                      className="relative p-6 md:p-8 bg-gradient-to-b from-white/2 to-transparent"
                      style={{
                        ...cardGlowStyle,
                        // keep GPU friendly transforms for smoother motion
                        willChange: "transform, background",
                        minHeight: 220,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div className="flex items-start gap-4">
                          {/* Icon + pulse ring */}
                          <div className="relative">
                            {/* Pulse ring */}
                            <motion.div
                              animate={{
                                scale: cs.active ? [1, 1.5, 1] : [1, 1.15, 1],
                                opacity: cs.active ? [0.6, 0.18, 0.6] : [0.35, 0.12, 0.35],
                              }}
                              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                              className="absolute -inset-2 rounded-2xl"
                              style={{
                                boxShadow: `0 0 40px ${category.theme.glow}`,
                                background: `radial-gradient(circle, ${category.theme.glow} 0%, transparent 50%)`,
                                zIndex: -1,
                              }}
                              aria-hidden
                            />

                            <div
                              className="p-3 rounded-2xl w-fit border border-white/8"
                              style={{
                                background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 2,
                              }}
                            >
                              {/* colored icon (accent) */}
                              {React.cloneElement(category.icon as React.ReactElement, {
                                className: "h-10 w-10",
                                style: { color: category.theme.accent },
                              })}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-2xl text-white">{category.title}</h3>
                            <p className="text-sm text-zinc-400 mt-1">{category.description}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2 mt-6 mb-6">
                          {category.items.map((item, i) => (
                            <span
                              key={i}
                              className="relative px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-zinc-300 border border-white/5 overflow-hidden"
                              style={{
                                // subtle inner sheen using linear gradient and slight blur
                                boxShadow: `inset 0 -6px 12px rgba(0,0,0,0.25)`,
                                backdropFilter: "blur(2px)",
                              }}
                            >
                              <span
                                className="absolute -inset-0"
                                style={{
                                  background:
                                    "linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.00) 100%)",
                                  transform: "translateX(-100%)",
                                }}
                              />
                              {item}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                            <span className="flex items-center gap-2">
                              <span>Explore Category</span>
                              <ArrowRight className="ml-2 h-4 w-4" style={{ color: category.theme.accent }} />
                            </span>
                          </div>

                          {/* small decorative neon ring */}
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0.8 }}
                            animate={{ scale: cs.active ? 1.06 : 1, opacity: cs.active ? 1 : 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                              border: `1px solid ${category.theme.accent}`,
                              boxShadow: `0 6px 18px ${category.theme.glow}`,
                              background: "rgba(255,255,255,0.01)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
