"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Play, Clock, Target } from "lucide-react"

export default function Situps() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".situp-hero", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })

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
          <div className="situp-hero">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Sit-up <span className="gradient-text">Assessment</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Core strength evaluation with AI-powered form analysis
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
                  <p className="text-gray-200">Sit-up Demo Video</p>
                  <p className="text-sm text-gray-400">(Video will be added here)</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Sit-up Instructions:</h3>
                <ul className="text-gray-200 space-y-2">
                  <li>• Wear sports shoes for stability</li>
                  <li>• Lie on a flat, even surface</li>
                  <li>• Ensure fitted clothes so tracking sensors work correctly</li>
                  <li>• Keep hands behind head or crossed on chest as instructed</li>
                  <li>• Keep your feet flat on the ground, knees bent at 90 degrees</li>
                  <li>• Lift your torso up until your elbows touch your knees</li>
                  <li>• Lower back down with control until shoulder blades touch the ground</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Info Section */}
          <section className="info-section">
            <div className="glass-effect p-6 rounded-xl mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Coming Soon</h2>

              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Core Analysis</h3>
                <p className="text-gray-200">
                  Advanced computer vision technology for precise sit-up counting and form validation
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-blue-900/30 rounded-lg">
                  <Play className="w-8 h-8 text-blue-400" />
                  <div>
                    <h4 className="font-semibold text-white">Video Analysis</h4>
                    <p className="text-sm text-gray-200">AI-powered movement tracking and form correction</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-900/30 rounded-lg">
                  <Clock className="w-8 h-8 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-white">Real-time Counting</h4>
                    <p className="text-sm text-gray-200">Accurate repetition counting with instant feedback</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-purple-900/30 rounded-lg">
                  <Target className="w-8 h-8 text-purple-400" />
                  <div>
                    <h4 className="font-semibold text-white">Performance Scoring</h4>
                    <p className="text-sm text-gray-200">Standardized scoring based on form and endurance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Test Benefits</h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Measures core strength and endurance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Evaluates abdominal muscle development</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Tracks fitness improvement over time</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Essential for overall athletic performance</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
