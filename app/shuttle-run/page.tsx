"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Play, Timer, Zap } from "lucide-react"

export default function ShuttleRun() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".shuttle-hero", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })

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
          <div className="shuttle-hero">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Shuttle Run <span className="gradient-text">6×10m Test</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Agility and speed assessment with precision timing and movement analysis
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
                  <Play className="w-16 h-16 text-orange-400 mx-auto mb-2" />
                  <p className="text-gray-200">Shuttle Run Demo Video</p>
                  <p className="text-sm text-gray-400">(Video will be added here)</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Shuttle Run (6×10 m) Instructions:</h3>
                <ul className="text-gray-200 space-y-2">
                  <li>• Measure distance from initial to final point with back camera</li>
                  <li>• Perform in an open ground or track area</li>
                  <li>• Wear running shoes for grip and safety</li>
                  <li>• Place your device properly for accurate timing and tracking</li>
                  <li>• Sprint 10 meters, touch the line, and return</li>
                  <li>• Complete 6 total runs (3 round trips)</li>
                  <li>• Maintain maximum speed throughout the test</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Info Section */}
          <section className="info-section">
            <div className="glass-effect p-6 rounded-xl mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Coming Soon</h2>

              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Timer className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Agility Analysis</h3>
                <p className="text-gray-200">Advanced motion tracking for precise timing and agility assessment</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-orange-900/30 rounded-lg">
                  <Timer className="w-8 h-8 text-orange-400" />
                  <div>
                    <h4 className="font-semibold text-white">Precision Timing</h4>
                    <p className="text-sm text-gray-200">Accurate timing with millisecond precision</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-red-900/30 rounded-lg">
                  <Zap className="w-8 h-8 text-red-400" />
                  <div>
                    <h4 className="font-semibold text-white">Agility Analysis</h4>
                    <p className="text-sm text-gray-200">Movement pattern analysis and efficiency scoring</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-yellow-900/30 rounded-lg">
                  <Play className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h4 className="font-semibold text-white">Turn Detection</h4>
                    <p className="text-sm text-gray-200">AI-powered turn validation and counting</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Test Benefits</h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Measures agility and change of direction speed</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Evaluates acceleration and deceleration ability</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Important for sports requiring quick direction changes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Identifies talent for football, basketball, tennis</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
