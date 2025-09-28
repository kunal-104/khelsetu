"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, Target, Lightbulb, Award } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const heroRef = useRef(null)
  const missionRef = useRef(null)
  const teamRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-hero", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })

      gsap.fromTo(
        ".mission-card",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".team-member",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section ref={heroRef} className="text-center mb-20">
          <div className="about-hero">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="gradient-text">KHELSETU</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto text-pretty">
              We're revolutionizing sports talent assessment in India through AI-powered technology, making
              professional-grade evaluation accessible to every athlete across the nation.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "Democratize sports talent assessment by providing AI-powered evaluation tools accessible to athletes nationwide, regardless of location or economic background.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                desc: "Leveraging cutting-edge computer vision and machine learning to deliver accurate, unbiased, and comprehensive fitness assessments through mobile technology.",
              },
              {
                icon: Users,
                title: "Accessibility",
                desc: "Breaking down barriers in sports talent identification by making professional-grade assessment tools available through smartphones and mobile apps.",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Maintaining the highest standards in sports assessment while ensuring fairness, accuracy, and reliability in every evaluation we provide.",
              },
            ].map((item, index) => (
              <div key={index} className="mission-card glass-effect p-6 rounded-xl text-center">
                <item.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Problem Statement */}
        <section className="mb-20">
          <div className="glass-effect p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Problem Statement ID: 25073</h2>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                AI-Powered Mobile Platform for Democratizing Sports Talent Assessment
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Traditional sports talent assessment in India faces significant challenges including limited
                accessibility, geographical barriers, subjective evaluation methods, and lack of standardized
                benchmarking. Our solution addresses these critical issues through innovative AI technology.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">Key Challenges</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Limited access to professional assessment facilities</li>
                    <li>• Geographical barriers for rural athletes</li>
                    <li>• Subjective and inconsistent evaluation methods</li>
                    <li>• Lack of standardized benchmarking systems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">Our Solution</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• AI-powered video analysis for objective assessment</li>
                    <li>• Mobile-first approach for universal accessibility</li>
                    <li>• Standardized benchmarking and scoring system</li>
                    <li>• Real-time feedback and performance insights</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-xl text-gray-300">
              Passionate innovators working to transform sports assessment in India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Team Lead",
                role: "Project Manager & AI Specialist",
                expertise: "Machine Learning, Computer Vision",
              },
              { name: "Developer 1", role: "Full-Stack Developer", expertise: "React, Node.js, Mobile Development" },
              { name: "Developer 2", role: "AI/ML Engineer", expertise: "Deep Learning, OpenCV, TensorFlow" },
              { name: "Developer 3", role: "Mobile App Developer", expertise: "React Native, Flutter, iOS/Android" },
              { name: "Developer 4", role: "Backend Engineer", expertise: "Cloud Architecture, APIs, Databases" },
              { name: "Developer 5", role: "UI/UX Designer", expertise: "User Experience, Interface Design" },
            ].map((member, index) => (
              <div key={index} className="team-member glass-effect p-6 rounded-xl text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-2">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.expertise}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
