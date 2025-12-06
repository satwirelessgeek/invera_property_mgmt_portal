"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";   // ✅ correct router

const CosmicHero = () => {
  const router = useRouter();   // ✅ initialize correct router

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background text-foreground flex flex-col items-center justify-center">

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center gap-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300 backdrop-blur-sm mb-6">
            New: Automated Lead Generation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2"
        >
          AI powered Intelligent solutions for <br /> Everyday Challenges
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <Button
            size="lg"
            onClick={() => router.push("/contact")}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 h-12 text-base"
          >
            Get in touch <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <Button
            size="lg"
            //variant="outline"
            onClick={() => router.push("/products")}
            className="rounded-full px-8 h-12 text-base bg-white/5 border-white/10 hover:bg-white/10 text-white backdrop-blur-sm"
          >
            View services
          </Button>
        </motion.div>

      </div>
    </div>
  );
};

export default CosmicHero;
