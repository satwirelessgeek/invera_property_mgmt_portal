'use client';

import { useState } from 'react';
import { 
  Users, 
  Heart, 
  Smartphone, 
  Cloud, 
  Globe, 
  Shield, 
  Zap, 
  Upload, 
  Search, 
  Mail, 
  MapPin, 
  TrendingUp 
} from 'lucide-react';

export default function FindMyMitraBrochure() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to your backend
    console.log('Contact email submitted:', email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Heart className="w-5 h-5 mr-2 text-pink-300" />
            <span>Reuniting Lives with the Power of AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Find<span className="text-cyan-300">My</span>Mitra
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            An AI-powered solution to reunite missing persons with their families—faster, smarter, and with compassion.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/30">
              Get the App
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full text-lg transition-all border border-white/30">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* The Challenge */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">The Growing Challenge</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Widespread Problem", desc: "Millions go missing annually across urban and rural areas." },
              { icon: Heart, title: "Family Distress", desc: "Families endure immense emotional and logistical burdens." },
              { icon: Search, title: "Inefficient Methods", desc: "Traditional search techniques are slow and often ineffective." }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-100 to-purple-100 flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-blue-50 rounded-2xl p-6 border border-blue-100 max-w-4xl mx-auto">
            <div className="flex items-start">
              <MapPin className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <p className="text-blue-800">
                <span className="font-bold">Kumbh Mela Case Study:</span> Over 20,000 people went missing at Maha Kumbh 2025—yet it recorded the lowest lost-and-found count since 1946, underscoring the urgent need for innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">By the Numbers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="flex items-center">
                <div className="bg-rose-100 p-4 rounded-xl mr-6">
                  <Users className="w-8 h-8 text-rose-600" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-slate-800">⅔</p>
                  <p className="text-slate-600">of missing persons in India are female</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="flex items-center">
                <div className="bg-emerald-100 p-4 rounded-xl mr-6">
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-slate-800">50%+</p>
                  <p className="text-slate-600">of missing persons are eventually traced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">How FindMyMitra Works</h2>
            <p className="text-xl max-w-3xl mx-auto text-slate-600">
              A simple, powerful AI-driven process to reunite families
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", icon: Upload, title: "Upload Photo", desc: "User uploads a photo of the missing person" },
              { step: "2", icon: Search, title: "AI Face Match", desc: "Advanced facial recognition identifies potential matches" },
              { step: "3", icon: Smartphone, title: "Get Details", desc: "Matched contact info & location provided securely" },
              { step: "4", icon: Heart, title: "Reunite", desc: "Facilitate safe, rapid family reunification" }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100">
                  <item.icon className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Tech */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FindMyMitra?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Smartphone, title: "Intuitive Design", desc: "Simple interface for all users—tech-savvy or not" },
              { icon: Cloud, title: "Lightweight Architecture", desc: "Easy to deploy and scale across platforms" },
              { icon: Zap, title: "Minimal Input", desc: "Works with just a single face image" }
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur rounded-2xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold mb-6 text-center">Technology Stack</h3>
            <div className="flex flex-wrap justify-center gap-4 text-center">
              {['Flutter (Mobile)', 'Python + FastAPI (Backend)', 'SQLite (Database)', 'face_recognition (AI)', 'AWS/Azure (Cloud)'].map((tech, i) => (
                <div key={i} className="bg-slate-700 px-5 py-3 rounded-full">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Transformative Impact</h2>
              <div className="space-y-6">
                {[
                  { value: "90%", label: "Faster reunions", desc: "Drastically reduce search time" },
                  { value: "100M+", label: "Global potential", desc: "Through police & NGO partnerships" },
                  { value: "Priceless", label: "Family joy", desc: "Our ultimate reward" }
                ].map((item, i) => (
                  <div key={i} className="flex">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-2xl font-bold text-purple-700">{item.value}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.label}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-cyan-50 p-8 rounded-2xl border border-purple-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Accessible to All</h3>
              <div className="space-y-4">
                {[
                  { plan: "Free for Individuals", desc: "Ensuring widespread access to those in need" },
                  { plan: "Future Freemium", desc: "Premium features for advanced users" },
                  { plan: "SaaS for Agencies", desc: "Subscription model for police & rescue orgs" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <Shield className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">{item.plan}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Help Us Reunite More Lives</h2>
          <p className="text-xl mb-10 opacity-90">
            Join our mission to build a safer tomorrow through compassionate technology.
          </p>
          
          {submitted ? (
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl inline-block">
              <p className="text-lg">Thank you! We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                required
              />
              <button
                type="submit"
                className="bg-white text-cyan-700 font-bold px-8 py-4 rounded-full hover:bg-cyan-50 transition-colors whitespace-nowrap"
              >
                Contact Us
              </button>
            </form>
          )}
          
          <div className="mt-8 flex justify-center items-center text-sm opacity-80">
            <Mail className="w-4 h-4 mr-2" />
            info@findmymitra.com
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900 text-slate-400 text-center">
        <p>© {new Date().getFullYear()} FindMyMitra. All rights reserved. Building a safer tomorrow, one reunion at a time.</p>
      </footer>
    </div>
  );
}

