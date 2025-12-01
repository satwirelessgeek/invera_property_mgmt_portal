"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const FeaturedProduct = () => {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" /> Featured Innovation
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">
              Invera Drishti: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Vision Beyond Sight
              </span>
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">
              Invera LLM Proxy: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                One stop solution for all your LLM interconnection needs
              </span>
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">
              Invera Missing Person Finder: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Single platform to locate missing individuals using AI-powered search
              </span>
            </h2>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">
              Invera Legal Document Analyzer: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                One stop solution to analyze and summarize legal documents efficiently
              </span>
            </h2>
            <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
              Our AI-powered intelligent solutions redefines security through intelligent vision.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Real-time threat detection and alerts",
                "Advanced pattern recognition algorithms",
                "Seamless integration with existing hardware",
                "Privacy-first architecture"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-500 h-5 w-5 shrink-0" />
                  <span className="text-zinc-300">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-12 text-base font-medium">
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 backdrop-blur-sm shadow-2xl shadow-purple-900/20">
              {/* Placeholder for actual product image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
                <div className="relative w-full h-full opacity-80">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent" />
                  {/* Abstract grid lines representing vision */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              </div>

              {/* Overlay UI elements to look like AI vision */}
              <div className="absolute top-8 left-8 right-8 bottom-8 border border-dashed border-purple-500/50 rounded-lg p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-mono text-green-400 border border-green-500/30">
                    LIVE FEED ● REC
                  </div>
                  <div className="bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-mono text-purple-400 border border-purple-500/30">
                    CONFIDENCE: 98.5%
                  </div>
                </div>

                <div className="self-center p-4 border-2 border-purple-500/50 rounded w-32 h-32 flex items-center justify-center relative">
                  <div className="absolute -top-3 -left-1 text-[10px] bg-purple-600 text-white px-1">OBJECT DETECTED</div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                </div>

                <div className="font-mono text-xs text-zinc-500">
                  &gt; Analyzing stream...<br />
                  &gt; Pattern matched: THREAT_LEVEL_0<br />
                  &gt; Logging entry #8492
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
