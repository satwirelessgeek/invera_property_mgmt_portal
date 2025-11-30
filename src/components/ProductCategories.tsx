"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Shield, Database, Car, FileText, Network } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const categories = [
  {
    title: "User Usage Products",
    description: "Practical solutions for everyday challenges, from parking management to document creation.",
    icon: <Car className="h-10 w-10 text-blue-400" />,
    items: ["Multilevel Parking", "Legal Document Creator"],
    href: "/products?tab=user"
  },
  {
    title: "AI Domain Products",
    description: "Cutting-edge AI solutions designed to ease daily tasks and enhance productivity.",
    icon: <Brain className="h-10 w-10 text-purple-400" />,
    items: ["Invera LLM Proxy", "Invera Drishti", "Invera Outlier Identifiers", "Legal Document Analyzer","Invera Missing Person Finder"],
    href: "/products?tab=ai"
  }
];

const ProductCategories = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
          >
            Our Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Explore our range of intelligent products designed to solve basic problems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link href={category.href} className="block h-full">
                <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                  <CardHeader>
                    <div className="mb-4 p-3 rounded-2xl bg-white/5 w-fit border border-white/10 group-hover:border-white/20 transition-colors">
                      {category.icon}
                    </div>
                    <CardTitle className="text-2xl text-white">{category.title}</CardTitle>
                    <CardDescription className="text-base text-zinc-400">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {category.items.map((item, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-zinc-300 border border-white/5">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                      Explore Category <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
