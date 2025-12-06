"use client";

import Image from "next/image";

export default function LlmPage() {
    return (
        <div className="min-h-screen bg-[#061226] text-[#e6eef6]">
            {/* Container */}
            <div className="max-w-[1100px] mx-auto mt-10 p-7">

                {/* Header */}
                <header className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0b74de] to-[#6ad0ff] flex items-center justify-center shadow-lg">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-white fill-white"
                            >
                                <path d="M12 2c3 0 6 2 7 5 1 3-1 6-4 7-3 1-6 0-8-3C6 8 8 4 12 2z"></path>
                            </svg>
                        </div>

                        <div>
                            <div className="flex items-baseline gap-2">
                                <h1 className="text-2xl font-semibold">Inferalabs LLM Gateway</h1>
                                <span className="text-sm text-[#94a3b8]">
                                    Single Secured Window • Unified LLM API
                                </span>
                            </div>
                            <p className="text-[#94a3b8] mt-1">
                                Model failover • Cost optimization • Observability • Enterprise security
                            </p>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex gap-2 items-center">
                        <a className="px-4 py-2 rounded-lg border border-white/10 text-[#94a3b8]" href="#features">Features</a>
                        <a className="px-4 py-2 rounded-lg border border-white/10 text-[#94a3b8]" href="#pricing">Pricing</a>
                        <a className="px-4 py-2 rounded-lg border border-white/10 text-[#94a3b8]" href="#docs">Docs</a>
                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0b74de] to-[#46c0ff] text-[#012037] font-semibold">
                            Get Started
                        </button>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="grid md:grid-cols-[1fr_420px] gap-7 mt-7 items-start">
                    {/* Left Card */}
                    <div className="p-6 rounded-xl bg-[#0b1220]/90 border border-white/5 shadow-xl">
                        <h2 className="text-xl font-semibold mb-2">One API. All models. Zero lock-in.</h2>
                        <p className="text-[#94a3b8]">
                            Inferalabs LLM Gateway centralizes access to multiple LLM providers behind an OpenAI-compatible API.
                            Route requests intelligently, control costs, enforce policies, and keep sensitive data private —
                            without changing your application code.
                        </p>

                        {/* Features */}
                        <div id="features" className="grid grid-cols-2 gap-4 mt-5">
                            {[
                                {
                                    icon: "🔐",
                                    title: "Single Secured Window",
                                    desc: "API key or SSO, RBAC, audit logs and optional PII redaction — built for compliance."
                                },
                                {
                                    icon: "⚙️",
                                    title: "Smart Router & Failover",
                                    desc: "Automatic routing based on cost, latency and availability — seamless failover."
                                },
                                {
                                    icon: "💸",
                                    title: "Cost Optimization",
                                    desc: "Token metering, cost-per-request, quotas and budget alerts."
                                },
                                {
                                    icon: "📈",
                                    title: "Observability",
                                    desc: "Prometheus/Grafana metrics, logs export, and performance dashboards."
                                }
                            ].map((f, i) => (
                                <div className="flex gap-3" key={i}>
                                    <div className="w-11 h-11 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold">{f.title}</h4>
                                        <p className="text-xs text-[#94a3b8] mt-1">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="flex gap-3 mt-4">
                            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0b74de] to-[#46c0ff] text-[#012037] font-semibold">
                                Start free trial
                            </button>
                            <button className="px-4 py-2 rounded-lg border border-white/10 text-[#94a3b8]">
                                Request demo
                            </button>
                        </div>

                        <p className="text-xs text-[#94a3b8] mt-3">
                            OpenAI-compatible API — drop-in replacement for existing integrations.
                        </p>
                    </div>

                    {/* Right Sidebar */}
                    <aside>
                        <div className="p-6 rounded-xl bg-[#0b1220]/90 border border-white/5 shadow-xl">
                            <h3 className="font-semibold mb-2">Architecture at a glance</h3>
                            <p className="text-sm text-[#94a3b8]">A single gateway routes traffic to self-hosted and cloud LLMs.</p>

                            <div className="relative w-[300px] h-[200px] rounded-xl overflow-hidden">
                                <Image
                                    src="/llm.png"
                                    alt="LLM Diagram"
                                    fill
                                    className="object-contain"
                                />
                            </div>


                            <div className="flex gap-4 mt-4 text-sm text-[#94a3b8]">
                                <div className="flex-1">Observability: Prometheus & Grafana</div>
                                <div className="flex-1">Billing: Stripe & Team Quotas</div>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-[#0b1220]/90 border border-white/5 shadow-xl mt-4">
                            <h4 className="font-semibold mb-2">Why enterprises choose Inferalabs</h4>
                            <ul className="list-disc ml-5 text-sm text-[#94a3b8]">
                                <li>Centralized control for compliance</li>
                                <li>Plug-and-play migration from OpenAI</li>
                                <li>Predictable spend & billing</li>
                                <li>Flexible deployment: cloud or self-hosted</li>
                            </ul>
                        </div>
                    </aside>
                </section>

                {/* Use Cases */}
                <section className="p-6 bg-[#0b1220]/90 border border-white/5 shadow-xl rounded-xl mt-6">
                    <h3 className="font-semibold mb-2">Use cases</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            {
                                title: "Secure Customer Support",
                                desc: "Route chats based on task sensitivity and reduce cost."
                            },
                            {
                                title: "Automated Document Processing",
                                desc: "Redact PII before calling LLMs — audit everything."
                            },
                            {
                                title: "Embedded AI for Products",
                                desc: "One API for all teams with quotas & chargeback."
                            }
                        ].map((u, i) => (
                            <div key={i} className="p-4 rounded-lg border border-white/5 bg-white/5">
                                <h5 className="font-semibold mb-1">{u.title}</h5>
                                <p className="text-sm text-[#94a3b8]">{u.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pricing */}
                <section id="pricing" className="grid md:grid-cols-[1fr_320px] gap-5 mt-6">
                    <div className="p-6 rounded-xl bg-[#0b1220]/90 border border-white/5 shadow-xl">
                        <h3 className="font-semibold mb-2">Pricing</h3>
                        <p className="text-[#94a3b8]">
                            Flexible plans for startups and enterprises.
                        </p>
                        <ul className="list-disc ml-5 text-sm text-[#94a3b8] mt-3">
                            <li>Free: 14-day trial</li>
                            <li>Pro: metering, optimization, webhooks</li>
                            <li>Enterprise: SSO, SLAs, on-prem deployment</li>
                        </ul>

                        <div className="flex gap-3 mt-4">
                            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0b74de] to-[#46c0ff] text-[#012037] font-semibold">
                                See pricing
                            </button>
                            <button className="px-4 py-2 rounded-lg border border-white/10 text-[#94a3b8]">
                                Contact sales
                            </button>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-[#0b1220]/90 border border-white/5 shadow-xl">
                        <h4 className="font-semibold mb-2">Get started</h4>
                        <p className="text-sm text-[#94a3b8]">
                            1. Create account • 2. Connect providers • 3. Switch endpoint
                        </p>
                        <ol className="list-decimal ml-5 text-sm text-[#94a3b8] mt-3">
                            <li>Sign up and obtain API keys</li>
                            <li>Configure providers & quotas</li>
                            <li>Switch endpoint — no code changes</li>
                        </ol>
                        <div className="flex gap-3 mt-4">
                            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#0b74de] to-[#46c0ff] text-[#012037] font-semibold">
                                Start trial
                            </button>
                            <button className="px-4 py-2 rounded-lg border border-white/10 text-[#94a3b8]">
                                View docs
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="flex justify-between items-center mt-7 pt-5 border-t border-white/10">
                    <div>
                        <div className="font-semibold">Inferalabs</div>
                        <p className="text-[#94a3b8] text-sm mt-1">LLM Gateway • Built for enterprises</p>
                    </div>

                    <div className="flex gap-4 text-[#94a3b8] text-sm">
                        <a href="#docs">Docs</a>
                        <a href="#privacy">Privacy</a>
                        <a href="#contact">Contact</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
