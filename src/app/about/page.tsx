"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb, Users, Award, Calendar, Microscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Mail } from "lucide-react";


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-foreground pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500"
          >
            Pioneering the Future of AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            At Invera Labs, we bridge the gap between complex artificial intelligence and practical business solutions.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-black border border-zinc-800"
            >
              <div className="h-12 w-12 rounded-lg bg-purple-900/20 flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed">
                To democratize access to advanced AI technologies, enabling businesses of all sizes to automate workflows, enhance security, and unlock new opportunities for growth through intelligent data einveraion and analysis.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-black border border-zinc-800"
            >
              <div className="h-12 w-12 rounded-lg bg-blue-900/20 flex items-center justify-center mb-6">
                <Lightbulb className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-zinc-400 leading-relaxed">
                We envision a world where AI is seamlessly integrated into everyday business operations, acting as a silent but powerful partner that empowers human creativity and decision-making rather than replacing it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Lab Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
                <Microscope className="w-4 h-4" /> Invera Labs
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pushing the Boundaries of Possibility
              </h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Our dedicated research division, Invera Labs, is constantly exploring new frontiers in computer vision, natural language processing, and neural architecture. We don't just use existing models; we build, fine-tune, and optimize them for specific industry challenges.
              </p>
              <ul className="space-y-4">
                {["Custom LLM Fine-tuning", "Real-time Computer Vision", "Automated Decision Systems"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 backdrop-blur-sm p-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Abstract visualization of AI Lab */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-purple-500/30 animate-[spin_10s_linear_infinite]" />
                    <div className="w-48 h-48 rounded-full border border-zinc-700/30 absolute" />
                    <div className="w-64 h-64 rounded-full border border-zinc-800/30 absolute" />
                    <div className="absolute z-10 bg-black border border-zinc-800 px-4 py-2 rounded-lg shadow-xl">
                      <span className="text-xs font-mono text-green-400">Training: 99.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestone Timeline */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Journey and Future Plan</h2>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 transform md:-translate-x-1/2" />
            {[
              { year: "2025", title: "Inception", desc: "Invera was founded with a vision to simplify AI adoption." },
              { year: "2026", title: "First Product Launch", desc: "Launched our MVP for Legal Document Automation." },
              { year: "2027", title: "Seed Funding", desc: "Secured initial funding to expand our research team." },
              { year: "2028", title: "Global Expansion", desc: "Opened offices in 3 new countries and launched Sanjay Drishti." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 w-full md:w-1/2 p-4">
                  <div className={`bg-black border border-zinc-800 p-6 rounded-xl ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="text-purple-400 font-bold text-xl mb-2 block">{item.year}</span>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-black border-4 border-purple-900 transform -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                </div>
                <div className="flex-1 w-full md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Placeholders */}
     <section className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
      <p className="text-muted-foreground">The minds behind the machines.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* --- CARD TEMPLATE FUNCTION --- */}
      {[
        { name: "Aarshia Verma", role: "Founder & CEO", img: "/aarshia.jpeg" },
        { name: "Aarsh Verma", role: "Director", img: "/aarsh.jpeg" },
        { name: "SVerma", role: "Advisor", img: "/public/satish.jpg" },
        { name: "Manjula", role: "Advisor", img: "/manju.jpg" }
      ].map((person, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.15 }}
          className="relative group"
        >

          {/* 🔥 Neon Ring Glow */}
          <div className="
            absolute inset-0 rounded-2xl blur-xl opacity-0 
            group-hover:opacity-70 transition-all duration-500
            bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500
          "></div>

          {/* 🌈 Animated Gradient Border */}
          <div className="
            relative rounded-2xl p-[2px]
            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
            animate-gradient-x
            hover:shadow-[0_0_25px_5px_rgba(168,85,247,0.5)]
            transition-all duration-500
          ">
            <div className="
              rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
              overflow-hidden shadow-xl
              group-hover:-translate-y-2 transition-all duration-300
            ">

              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={person.img}
                  alt={person.name}
                  className="
                    w-full h-60 object-cover rounded-t-2xl 
                    group-hover:scale-110 transition-transform duration-700
                  "
                />
              </div>

              {/* Content */}
              <div className="p-5 text-center" >
                <h3 className="text-lg font-semibold text-white">{person.name}</h3>
               <p className="text-sm mb-4" style={{ color: "#FFD700" }}>{person.role}</p>

                {/* Social Icons */}
                <div className="flex items-center justify-center gap-5">
                  <a href="#" className="hover:text-blue-400 transition">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-pink-400 transition">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      ))}

    </div>
  </div>
</section>

    </div>
  );
};

export default AboutPage;
