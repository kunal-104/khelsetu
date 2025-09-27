"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play, X, ExternalLink } from "lucide-react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export default function TestsPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate test sections on scroll
      sectionsRef.current.forEach((section, index) => {
        gsap.fromTo(
          section,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  const tests = [
    {
      id: "pushups",
      name: "Push-ups Test",
      icon: "💪",
      description: "AI-powered push-up counter with form analysis and real-time feedback",
      thumbnail: "/pushup-exercise-demonstration.jpg",
      videoSrc: "/videos/Push_ups.mp4",
      instructions: [
        "Wear sports shoes during the test",
        "Perform on a flat, non-slippery surface",
        "Keep your phone/device at the recommended angle for proper tracking",
        "Maintain correct posture - body straight, arms shoulder-width apart",
        "Lower your chest to ground level and push up to full arm extension",
      ],
      hasPrototype: true,
      prototypeLink: "/pushups/pushup-prototype",
    },
    {
      id: "situps",
      name: "Sit-ups Test",
      icon: "🏃",
      description: "Core strength evaluation with precise movement tracking",
      thumbnail: "/situp-exercise-demonstration.jpg",
      videoSrc: "/videos/Sit_ups.mp4",
      instructions: [
        "Wear sports shoes for stability",
        "Lie on a flat, even surface",
        "Ensure fitted clothes so tracking sensors work correctly",
        "Keep hands behind head or crossed on chest as instructed",
        "Perform full range of motion from lying to sitting position",
      ],
      hasPrototype: false,
    },
    {
      id: "vertical-jump",
      name: "Vertical Jump Test",
      icon: "⬆️",
      description: "Lower body explosive power measurement using motion analysis",
      thumbnail: "/vertical-jump-exercise-demonstration.jpg",
      videoSrc: "/vertical-jump-exercise-demonstration.jpg",
      instructions: [
        "Wear appropriate athletic shoes with good grip",
        "Stand on a flat, stable surface",
        "Position device to capture full jump motion",
        "Jump straight up with maximum effort",
        "Land safely in the same position",
      ],
      hasPrototype: false,
    },
    {
      id: "bmi",
      name: "BMI Test",
      icon: "⚖️",
      description: "Body composition analysis using computer vision measurements",
      thumbnail: "/bmi-measurement-demonstration.jpg",
      videoSrc: "/videos/B_M_I.mp4",
      instructions: [
        "Perform BMI measurement barefoot",
        "Stand on a plain, hard surface",
        "Wear light or fitted clothing for accurate results",
        "Stand straight without stretching your heels upward",
        "Maintain steady posture during measurement",
      ],
      hasPrototype: false,
    },
    {
      id: "shuttle-run",
      name: "Shuttle Run (6×10m)",
      icon: "🏃‍♂️",
      description: "Agility and speed assessment with precise timing",
      thumbnail: "/shuttle-run-agility-test-demonstration.jpg",
      videoSrc: "/videos/Shuttle_run.mp4",
      instructions: [
        "Measure distance from initial to final point with back camera",
        "Perform in an open ground or track area",
        "Wear running shoes for grip and safety",
        "Place your device properly for accurate timing and tracking",
        "Complete 6 rounds of 10-meter sprints with direction changes",
      ],
      hasPrototype: false,
    },
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-300 mb-6 drop-shadow-2xl text-shadow-strong">
            Fitness Assessment Tests
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto drop-shadow-xl text-shadow-medium">
            Comprehensive AI-powered testing suite for complete athletic evaluation
          </p>
        </div>

        {/* Test Sections */}
        {tests.map((test, index) => (
          <div key={test.id} id={test.id} ref={addToRefs} className="mb-20 glass-effect p-8 rounded-2xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className={index % 2 === 0 ? "order-1" : "order-2"}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{test.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{test.name}</h2>
                    <p className="text-cyan-100 text-lg text-shadow-light">{test.description}</p>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Test Instructions</h3>
                  <ul className="space-y-2">
                    {test.instructions.map((instruction, idx) => (
                      <li key={idx} className="text-gray-200 flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {test.hasPrototype && (
                    <Link
                      href={test.prototypeLink!}
                      className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                    >
                      <ExternalLink size={20} />
                      Try AI Prototype
                    </Link>
                  )}
                    {test.id !== "pushups" && (
                      <button className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
                        <Play size={20} />
                        {test.hasPrototype ? "View Demo" : "Coming Soon"}
                      </button>
                    )}
                  {/* <button className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
                    <Play size={20} />
                    {test.hasPrototype ? "View Demo" : "Coming Soon"}
                  </button> */}
                </div>
              </div>

              {/* Video */}
              <div className={index % 2 === 0 ? "order-2" : "order-1"}>
                <div className="relative group cursor-pointer" onClick={() => setActiveVideo(test.videoSrc)}>
                  <img
                    // src={test.videoSrc || "/placeholder.svg"}
                    src={test.thumbnail || "/placeholder.svg"}
                    alt={`${test.name} demonstration`}
                    className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Video Modal */}
        {activeVideo && (
          <div className="video-modal" onClick={() => setActiveVideo(null)}>
            <div className="relative">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>
              <video
                src={activeVideo}
                controls
                autoPlay
                className="max-w-[90vw] max-h-[90vh] rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass-effect p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Assessment?</h2>
            <p className="text-xl text-gray-200 mb-8">
              Experience the future of sports talent evaluation with our AI-powered platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Register Now
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
      </div>
    </div>
  )
}
