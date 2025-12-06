"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, FileText, Network, Eye, ShieldAlert, Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
 
  return (
    <div className="min-h-screen bg-black text-foreground pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Our Solutions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Cutting-edge tools designed for both everyday utility and advanced enterprise intelligence.
          </motion.p>
        </div>
      </section>

      {/* Products Tabs */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="ai" className="w-full flex flex-col items-center">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-zinc-900 border border-zinc-800 mb-12">
              <TabsTrigger value="ai" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">AI Domain</TabsTrigger>
              <TabsTrigger value="user" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">User Usage</TabsTrigger>
            </TabsList>
            
            <TabsContent value="user" className="w-full max-w-6xl mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProductCard 
                  title="Multilevel Parking System"
                  description="Smart automated parking management solution for modern urban infrastructure."
                  icon={<Car className="h-8 w-8 text-blue-400" />}
                  features={["Real-time slot availability", "Automated ticketing", "License plate recognition", "Mobile app integration"]}
                  gradient="from-blue-900/20 to-cyan-900/20"
                  borderColor="border-blue-500/20"
                />
                <ProductCard 
                  title="Legal Document Creator"
                  description="AI-powered platform for generating accurate, compliant legal documents in minutes."
                  icon={<FileText className="h-8 w-8 text-blue-400" />}
                  features={["Template library", "Natural language input", "Auto-formatting", "Legal compliance check"]}
                  gradient="from-blue-900/20 to-indigo-900/20"
                  borderColor="border-blue-500/20"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="ai" className="w-full max-w-6xl mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProductCard 
                  title="LLM Gateway"
                  description="Unified API interface for managing multiple Large Language Model providers seamlessly."
                  icon={<Network className="h-8 w-8 text-purple-400" />}
                  features={["Model failover", "Cost optimization", "Unified schema", "Analytics dashboard"]}
                  gradient="from-purple-900/20 to-pink-900/20"
                  borderColor="border-purple-500/20"
                />
                <ProductCard 
                  title="Sanjay Drishti"
                  description="Advanced computer vision system providing real-time surveillance insights."
                  icon={<Eye className="h-8 w-8 text-purple-400" />}
                  features={["Object tracking", "Behavior analysis", "Crowd monitoring", "Incident alerts"]}
                  gradient="from-purple-900/20 to-violet-900/20"
                  borderColor="border-purple-500/20"
                />
                <ProductCard 
                  title="AI Thief Detection"
                  description="Proactive security system that identifies suspicious activities and potential theft."
                  icon={<ShieldAlert className="h-8 w-8 text-purple-400" />}
                  features={["Gesture recognition", "Predictive alerts", "Low-light performance", "Instant notification"]}
                  gradient="from-purple-900/20 to-fuchsia-900/20"
                  borderColor="border-purple-500/20"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-zinc-900/30 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Business?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            Whether you need streamlined user tools or advanced AI infrastructure, invera has the solution.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-zinc-200 rounded-full">
            Contact Sales
          </Button>
        </div>
      </section>
    </div>
  );
};

const ProductCard = ({ title, description, icon, features, gradient, borderColor }: { 
  title: string, 
  description: string, 
  icon: React.ReactNode, 
  features: string[],
  gradient: string,
  borderColor: string,
  
}) =>{

  const router = useRouter();   // ✅ FIX: Now router is available here

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className={`h-full bg-black border ${borderColor} overflow-hidden relative group hover:border-opacity-50 transition-colors duration-300`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
        
        <CardHeader className="relative z-10">
          <div className="mb-4 p-3 rounded-xl bg-black/50 w-fit border border-white/10 backdrop-blur-sm">
            {icon}
          </div>
          <CardTitle className="text-2xl text-white">{title}</CardTitle>
          <CardDescription className="text-zinc-400 text-base mt-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <ul className="space-y-3 mt-4">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="relative z-10 mt-auto">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/llm")}     // ✅ Now works
            className="w-full justify-between hover:bg-white/10 hover:text-white text-zinc-300 group-hover:translate-x-1 transition-all"
          >
            Learn more <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>

      </Card>
    </motion.div>
  );
};
export default ProductsPage;
