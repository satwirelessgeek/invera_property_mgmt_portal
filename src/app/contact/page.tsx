"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-foreground pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Have a question about our products or want to explore a partnership? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-900/20 p-3 rounded-lg shrink-0">
                      <MapPin className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Headquarters</h3>
                      <p className="text-zinc-400">123 Innovation Drive, Tech Valley<br/>San Francisco, CA 94107</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-900/20 p-3 rounded-lg shrink-0">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Email Us</h3>
                      <p className="text-zinc-400">hello@xtract.ai<br/>support@xtract.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-900/20 p-3 rounded-lg shrink-0">
                      <Phone className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-1">Call Us</h3>
                      <p className="text-zinc-400">+1 (555) 123-4567<br/>Mon-Fri, 9am-6pm PST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden aspect-video relative group">
                <div className="absolute inset-0 bg-zinc-800/50 flex items-center justify-center">
                   <div className="text-center">
                     <MapPin className="h-12 w-12 text-zinc-600 mx-auto mb-2 group-hover:text-purple-500 transition-colors group-hover:scale-110 transform duration-300" />
                     <span className="text-zinc-500 text-sm">Interactive Map Placeholder</span>
                   </div>
                </div>
                {/* Decorative grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-black border border-white/10 shadow-2xl shadow-purple-900/10">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-2 text-white">Send us a message</h2>
                  <p className="text-zinc-400 mb-8">Fill out the form below and our team will get back to you shortly.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-zinc-300">First Name</Label>
                        <Input id="firstName" placeholder="John" className="bg-zinc-900/50 border-white/10 focus:border-purple-500" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-zinc-300">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="bg-zinc-900/50 border-white/10 focus:border-purple-500" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="bg-zinc-900/50 border-white/10 focus:border-purple-500" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-zinc-300">Subject</Label>
                      <Input id="subject" placeholder="Product Inquiry" className="bg-zinc-900/50 border-white/10 focus:border-purple-500" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-zinc-300">Message</Label>
                      <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px] bg-zinc-900/50 border-white/10 focus:border-purple-500" required />
                    </div>
                    
                    <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message <Send className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
