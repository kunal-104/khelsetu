"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Play, Pause, RotateCcw, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Pushups() {
  const heroRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [count, setCount] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [status, setStatus] = useState<"idle" | "active" | "pass" | "fail">("idle")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".pushup-hero", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })

      gsap.fromTo(
        ".demo-section",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 },
      )

      gsap.fromTo(
        ".counter-section",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 },
      )
    })

    return () => ctx.revert()
  }, [])

  const startTest = () => {
    setIsActive(true)
    setStatus("active")
    setCount(0)
    setFeedback("Keep your body straight and lower your chest to the ground")
  }

  const stopTest = () => {
    setIsActive(false)
    if (count >= 20) {
      setStatus("pass")
      setFeedback(`Excellent! You completed ${count} push-ups. Test passed!`)
    } else {
      setStatus("fail")
      setFeedback(`You completed ${count} push-ups. Minimum 20 required to pass.`)
    }
  }

  const resetTest = () => {
    setIsActive(false)
    setCount(0)
    setStatus("idle")
    setFeedback("")
  }

  // Simulate push-up detection (in real app, this would be AI-powered)
  const simulatePushup = () => {
    if (isActive) {
      setCount((prev) => prev + 1)
      setFeedback("Good form! Keep going...")
    }
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section ref={heroRef} className="text-center mb-12">
          <div className="pushup-hero">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Push-up <span className="gradient-text">Assessment</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              AI-powered push-up counter with form analysis and real-time feedback
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
                  <p className="text-gray-200">Push-up Demo Video</p>
                  <p className="text-sm text-gray-400">(Video will be added here)</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Push-up Instructions:</h3>
                <ul className="text-gray-200 space-y-2">
                  <li>• Wear sports shoes during the test</li>
                  <li>• Perform on a flat, non-slippery surface</li>
                  <li>• Keep your phone/device at the recommended angle for proper tracking</li>
                  <li>• Maintain correct posture - body straight, arms shoulder-width apart</li>
                  <li>• Lower your chest to the ground and push back up completely</li>
                </ul>
              </div>

              <div className="mt-6">
                <Link
                  href="/pushups/pushup-prototype"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <ExternalLink size={20} />
                  Try AI Prototype
                </Link>
                <p className="text-sm text-gray-400 mt-2">Experience real-time AI pose detection</p>
              </div>
            </div>
          </section>

          {/* Counter Section */}
          <section className="counter-section">
            <div className="glass-effect p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Live Counter</h2>

              {/* Counter Display */}
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-white mb-2">{count}</div>
                <div className="text-xl text-gray-200">Push-ups completed</div>

                {/* Status Indicator */}
                <div className="mt-4">
                  {status === "pass" && (
                    <div className="flex items-center justify-center text-green-400">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      <span>Test Passed!</span>
                    </div>
                  )}
                  {status === "fail" && (
                    <div className="flex items-center justify-center text-red-400">
                      <XCircle className="w-6 h-6 mr-2" />
                      <span>Test Failed</span>
                    </div>
                  )}
                  {status === "active" && (
                    <div className="text-blue-400">
                      <span className="animate-pulse">● Recording...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback */}
              {feedback && (
                <div className="bg-blue-900/30 border border-blue-400/30 rounded-lg p-4 mb-6">
                  <p className="text-blue-200 text-center">{feedback}</p>
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-4 justify-center">
                {!isActive ? (
                  <button
                    onClick={startTest}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300"
                  >
                    <Play size={20} />
                    Start Test
                  </button>
                ) : (
                  <button
                    onClick={stopTest}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300"
                  >
                    <Pause size={20} />
                    Stop Test
                  </button>
                )}

                <button
                  onClick={resetTest}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300"
                >
                  <RotateCcw size={20} />
                  Reset
                </button>

                {/* Simulate button for demo */}
                <button
                  onClick={simulatePushup}
                  disabled={!isActive}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Simulate Push-up
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-200 mb-2">
                  <span>Progress</span>
                  <span>{count}/20 (minimum to pass)</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((count / 20) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
