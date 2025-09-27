"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { UserPlus, Shield, BookOpen, Play, Award, ChevronRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Flow() {
  const heroRef = useRef(null)
  const flowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".flow-hero", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })

      gsap.fromTo(
        ".flow-step",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          scrollTrigger: {
            trigger: flowRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".flow-arrow",
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          stagger: 0.3,
          delay: 0.5,
          scrollTrigger: {
            trigger: flowRef.current,
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  const flowSteps = [
    {
      icon: UserPlus,
      title: "User Registration",
      description: "Athletes create their profile with basic information and sports preferences",
      details: ["Personal information", "Sports category selection", "Contact details", "Profile photo upload"],
    },
    {
      icon: Shield,
      title: "Aadhaar Verification",
      description: "Secure identity verification using Aadhaar authentication system",
      details: ["Aadhaar number validation", "OTP verification", "Identity confirmation", "Security compliance"],
    },
    {
      icon: BookOpen,
      title: "Guidelines Review",
      description: "Comprehensive instructions and guidelines for each fitness assessment",
      details: ["Test instructions", "Equipment requirements", "Safety guidelines", "Scoring criteria"],
    },
    {
      icon: Play,
      title: "Fitness Tests",
      description: "AI-powered assessment of various fitness parameters with real-time analysis",
      details: ["Push-ups assessment", "Sit-ups evaluation", "BMI calculation", "Agility tests"],
    },
    {
      icon: Award,
      title: "Scorecard Generation",
      description: "Comprehensive performance report with scores, grades, and recommendations",
      details: ["Individual test scores", "Overall fitness grade", "Performance analysis", "Improvement suggestions"],
    },
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section ref={heroRef} className="text-center mb-16">
          <div className="flow-hero">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Assessment <span className="gradient-text">Workflow</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Step-by-step process of our AI-powered sports talent assessment platform
            </p>
          </div>
        </section>

        {/* Flow Steps */}
        <section ref={flowRef} className="space-y-8">
          {flowSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              {/* Step Card */}
              <div className="flow-step flex-1">
                <div className="glass-effect p-8 rounded-xl">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-sm font-semibold text-blue-400">Step {index + 1}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-300 text-lg mb-4">{step.description}</p>

                      <div className="grid md:grid-cols-2 gap-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow (except for last step) */}
              {index < flowSteps.length - 1 && (
                <div className="flow-arrow mx-8 flex-shrink-0">
                  <ChevronRight className="w-8 h-8 text-blue-400" />
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Summary Section */}
        <section className="mt-20">
          <div className="glass-effect p-12 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Complete Assessment Journey</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Our streamlined process ensures accurate, fair, and comprehensive sports talent assessment while
              maintaining the highest standards of security and user experience.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
                <div className="text-gray-300">Simple Steps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">10+</div>
                <div className="text-gray-300">Fitness Parameters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">AI</div>
                <div className="text-gray-300">Powered Analysis</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
