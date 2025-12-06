"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FeaturedProduct = () => {
   const router = useRouter();   // ✅ initialize correct router
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
            <h2 className="text-2xl md:text-2xl font-bold mb-3 text-white leading-tight">
              Invera LLM Proxy: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                One stop solution for all your LLM interconnection needs
              </span>
            </h2>
            <div className="space-y-4 mb-8">
              {[
                "Public Cloud ReadySSO (Okta, Google, Azure AD)",
                "Fine-grained RBAC & team isolation",
                "Full audit logs + PII redaction",
                "SOC 2 Type II compliant",
                "Deploy anywhere: Cloud, on-prem, or air-gapped"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-500 h-5 w-5 shrink-0" />
                  <span className="text-zinc-300">{feature}</span>
                </div>
              ))}
            </div>

            <Button size="lg" onClick={() => router.push("/products")} className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 h-12 text-base font-medium">
               
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
