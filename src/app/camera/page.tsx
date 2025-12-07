'use client';

import Head from 'next/head';

export default function Home() {
  const features = [
    {
      icon: '🗣️',
      title: 'Always-On Scene Narration',
      description: 'Hear your surroundings described continuously — like a human companion, not a scanner.',
    },
    {
      icon: '🔒',
      title: '100% On-Device. Zero Cloud.',
      description: 'Your camera feed never leaves your phone. No storage. No tracking. Ever.',
    },
    {
      icon: '🚶‍♂️',
      title: 'Smart Obstacle & Drop-Off Alerts',
      description: 'Warns you about curbs, stairs, and furniture before you trip — even without LiDAR.',
    },
    {
      icon: '🎙️',
      title: 'Voice-Controlled & Hands-Free',
      description: 'Just ask: “What’s ahead?” or “Is there a seat?” — no touching your phone.',
    },
    {
      icon: '🎧',
      title: 'Calm, Context-Aware Audio',
      description: 'Speaks only what’s important — never overwhelming you with noise.',
    },
    {
      icon: '⚡',
      title: 'Works Fully Offline',
      description: 'No Wi-Fi? No problem. Reliable anywhere — subway, forest, or airport.',
    },
    {
      icon: '🧠',
      title: 'Co-Designed With Blind Users',
      description: 'Built with real feedback from the blind & low-vision community — not just for them.',
    },
  ];

  return (
    <>
      <Head>
        <title>AuraSight — Your Private, Real-Time Environmental Narrator</title>
        <meta
          name="description"
          content="AuraSight describes your surroundings in real time — 100% on your phone, offline, and private. Built for the blind and low-vision community."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Enforce dark background */}
        <style>{'body { background-color: #0f172a; color: #e2e8f0; }'}</style>
      </Head>

      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Header */}
        <div className="container mx-auto px-4 py-6 flex justify-between items-center max-w-6xl">
          <div className="text-xl font-bold text-purple-400">AuraSight</div>
          {/* Dark mode toggle removed — always dark */}
        </div>

        {/* Hero Section */}
        <header className="container mx-auto px-4 py-16 md:py-24 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Your private guide to the
            <span className="text-purple-400"> visual world</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            See nothing? No problem. AuraSight narrates your surroundings in real time —
            <br />
            <strong>on your phone, offline, and 100% private.</strong>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition"
              aria-label="Get AuraSight on the App Store"
            >
              Coming Soon on App Store
            </button>
            <button
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-900/30 font-semibold py-3 px-8 rounded-full text-lg transition"
              onClick={() => alert('Audio demo: “Clear path ahead... door on your left.”')}
              aria-label="Play audio demo"
            >
              ▶️ Hear a Demo
            </button>
          </div>
        </header>

        {/* Trust Badges */}
        <div className="text-center mb-16">
          <div className="inline-flex flex-wrap justify-center gap-6 px-4 text-gray-400">
            <span className="flex items-center gap-1">✅ On-Device AI</span>
            <span className="flex items-center gap-1">✅ Works Offline</span>
            <span className="flex items-center gap-1">✅ Co-Designed with Blind Users</span>
          </div>
        </div>

        {/* Features Section */}
        <section className="container mx-auto px-4 mb-24 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why AuraSight is different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-600 transition"
              >
                <div className="text-3xl mb-4" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* High-Level Architecture Section */}
        <section className="container mx-auto px-4 mb-24 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Built for Privacy & Performance
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Unlike cloud-based apps, AuraSight runs entirely on your device — fast, private, and always available.
          </p>

          <div className="bg-gray-800/60 rounded-2xl p-6 md:p-8 border border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
              {/* Left: Device */}
              <div className="text-center">
                <div className="text-5xl mb-3">📱</div>
                <div className="font-medium text-white">Your Smartphone</div>
                <div className="text-sm text-gray-400 mt-1">
                  Camera + Microphone
                </div>
              </div>

              {/* Arrow */}
              <div className="text-2xl hidden md:block text-gray-400">→</div>

              {/* Center: AI Engine */}
              <div className="bg-gray-900 rounded-xl p-5 border border-gray-600 text-center w-full max-w-xs">
                <div className="font-bold text-purple-400 mb-2">
                  AuraSight AI Engine
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Perceives surroundings</li>
                  <li>• Understands context</li>
                  <li>• Narrates naturally</li>
                </ul>
                <div className="mt-3 text-xs bg-purple-900/30 text-purple-300 py-1 px-2 rounded inline-block">
                  100% On-Device
                </div>
              </div>

              {/* Arrow */}
              <div className="text-2xl hidden md:block text-gray-400">→</div>

              {/* Right: Output */}
              <div className="text-center">
                <div className="text-5xl mb-3">👂</div>
                <div className="font-medium text-white">You Hear</div>
                <div className="text-sm text-gray-400 mt-1">
                  “Clear path... door on left.”
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-400">
              🔒 <strong>No data leaves your device.</strong> Ever.
            </div>
          </div>
        </section>

      </div>
    </>
  );
}