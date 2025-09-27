"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Play, Calculator, TrendingUp } from "lucide-react"

export default function BMI() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".bmi-hero", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })

      gsap.fromTo(
        ".demo-section",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 },
      )

      gsap.fromTo(
        ".info-section",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section ref={heroRef} className="text-center mb-12">
          <div className="bmi-hero">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              BMI <span className="gradient-text">Assessment</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Body composition analysis with AI-powered measurement validation
            </p>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Demo Video Section */}
          <section className="demo-section">
            <div className="glass-effect p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Demo Video</h2>
              <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-green-400 mx-auto mb-2" />
                  <p className="text-gray-200">BMI Test Demo Video</p>
                  <p className="text-sm text-gray-400">(Video will be added here)</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">BMI Test Instructions:</h3>
                <ul className="text-gray-200 space-y-2">
                  <li>• Perform BMI measurement barefoot</li>
                  <li>• Stand on a plain, hard surface</li>
                  <li>• Wear light or fitted clothing for accurate results</li>
                  <li>• Stand straight without stretching your heels upward</li>
                  <li>• Look straight ahead, not down at the device</li>
                  <li>• Ensure proper lighting for accurate measurement</li>
                  <li>• Keep arms at your sides, relaxed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Info Section */}
          <section className="info-section">
            <div className="glass-effect p-6 rounded-xl mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Coming Soon</h2>

              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Body Analysis</h3>
                <p className="text-gray-200">Advanced computer vision for accurate height and weight estimation</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-900/30 rounded-lg">
                  <Calculator className="w-8 h-8 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-white">Smart Calculation</h4>
                    <p className="text-sm text-gray-200">Automated BMI calculation with health categorization</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-teal-900/30 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-teal-400" />
                  <div>
                    <h4 className="font-semibold text-white">Health Insights</h4>
                    <p className="text-sm text-gray-200">Personalized recommendations and health tips</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-900/30 rounded-lg">
                  <Play className="w-8 h-8 text-blue-400" />
                  <div>
                    <h4 className="font-semibold text-white">Measurement Guide</h4>
                    <p className="text-sm text-gray-200">Step-by-step measurement instructions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Test Benefits</h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Assesses body composition and health status</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Identifies optimal weight ranges for athletes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Tracks body composition changes over time</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Essential baseline measurement for all sports</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
