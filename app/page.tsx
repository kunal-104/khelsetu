"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play, Target, Zap, Shield, Award } from "lucide-react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const testsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".hero-title",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 },
      )

      gsap.fromTo(
        ".hero-subtitle",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 },
      )

      gsap.fromTo(
        ".hero-buttons",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.9 },
      )

      // Features animation
      gsap.fromTo(
        ".feature-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        },
      )

      // Test cards animation
      gsap.fromTo(
        ".test-card",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: testsRef.current,
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  const testCards = [
    { name: "Push-ups", href: "/tests#pushups", icon: "💪", description: "Upper body strength assessment" },
    { name: "Sit-ups", href: "/tests#situps", icon: "🏃", description: "Core strength evaluation" },
    { name: "Vertical Jump", href: "/tests#vertical-jump", icon: "⬆️", description: "Lower body explosive power" },
    { name: "BMI Test", href: "/tests#bmi", icon: "⚖️", description: "Body composition analysis" },
    { name: "Shuttle Run", href: "/tests#shuttle-run", icon: "🏃‍♂️", description: "Agility and speed test" },
  ]

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      // style={{ backgroundImage: 'url("/images/stadium-background.jpg")' }}
    >
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/khel-setu-logo.png")' }}
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            AI-Powered Sports
            <span className="block text-yellow-400 drop-shadow-2xl text-shadow-strong">
              Talent Assessment
            </span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Democratizing sports talent assessment in India through cutting-edge AI technology and mobile accessibility
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg">
              <Play size={20} />
              Watch Demo
            </button>
            <Link
              href="/register"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    <div style={{ backgroundImage: 'url("/images/stadium-background.jpg")' }}>
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-4 drop-shadow-2xl">
              Revolutionary Features
            </h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Our AI-powered platform brings professional sports assessment to every athlete
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "AI Analysis", desc: "Advanced computer vision for precise movement analysis" },
              { icon: Zap, title: "Real-time Feedback", desc: "Instant performance evaluation and scoring" },
              { icon: Shield, title: "Cheat Detection", desc: "Sophisticated algorithms prevent assessment fraud" },
              { icon: Award, title: "Professional Scoring", desc: "Industry-standard benchmarking and certification" },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-card glass-effect p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-200">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Cards Section */}
      <section ref={testsRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-4 drop-shadow-2xl">
              Fitness Assessments
            </h2>
            <p className="text-xl text-cyan-100">
              Comprehensive testing suite for complete athletic evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testCards.map((test, index) => (
              <Link key={index} href={test.href}>
                <div className="test-card glass-effect p-8 rounded-xl text-center hover:scale-105 transition-all duration-300 cursor-pointer group">
                  <div className="text-4xl mb-4 animate-float">{test.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {test.name}
                  </h3>
                  <p className="text-gray-200 text-sm">{test.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Sports Assessment?</h2>
            <p className="text-xl text-gray-200 mb-8">
              Join the revolution in democratizing sports talent identification across India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Assessment
              </Link>
              <Link
                href="/flow"
                className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                View Process
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
