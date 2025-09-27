"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Play, TrendingUp, Target, Award } from "lucide-react"

export default function VerticalJump() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".jump-hero", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })

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
          <div className="jump-hero">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Vertical Jump <span className="gradient-text">Assessment</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              AI-powered vertical jump measurement for lower body explosive power evaluation
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
                  <Play className="w-16 h-16 text-blue-400 mx-auto mb-2" />
                  <p className="text-gray-200">Vertical Jump Demo Video</p>
                  <p className="text-sm text-gray-400">(Video will be added here)</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Vertical Jump Instructions:</h3>
                <ul className="text-gray-200 space-y-2">
                  <li>• Stand with feet shoulder-width apart</li>
                  <li>• Keep your back straight and core engaged</li>
                  <li>• Bend your knees and swing your arms back</li>
                  <li>• Jump as high as possible, reaching upward</li>
                  <li>• Land softly on both feet</li>
                  <li>• Ensure proper camera positioning for height measurement</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Info Section */}
          <section className="info-section">
            <div className="glass-effect p-6 rounded-xl mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Coming Soon</h2>

              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Jump Analysis</h3>
                <p className="text-gray-200">Advanced computer vision technology for precise jump height measurement</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-900/30 rounded-lg">
                  <Target className="w-8 h-8 text-blue-400" />
                  <div>
                    <h4 className="font-semibold text-white">Precise Measurement</h4>
                    <p className="text-sm text-gray-200">Accurate jump height calculation using pose detection</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-900/30 rounded-lg">
                  <Award className="w-8 h-8 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-white">Performance Scoring</h4>
                    <p className="text-sm text-gray-200">Standardized scoring based on age and gender</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-purple-900/30 rounded-lg">
                  <Play className="w-8 h-8 text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-white">Real-time Feedback</h4>
                    <p className="text-sm text-gray-200">Instant analysis and improvement suggestions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Test Benefits</h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Measures lower body explosive power</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Evaluates athletic potential for jumping sports</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Tracks improvement over time</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Identifies talent for basketball, volleyball, athletics</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
