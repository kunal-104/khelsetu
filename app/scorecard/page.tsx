"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Award, TrendingUp, Target, Star, User } from "lucide-react"
import Image from "next/image"

export default function Scorecard() {
  const heroRef = useRef(null)
  const scorecardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".scorecard-hero", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" })

      gsap.fromTo(
        ".scorecard-demo",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 },
      )

      gsap.fromTo(
        ".feature-highlight",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.6 },
      )
    })

    return () => ctx.revert()
  }, [])

  // Sample scorecard data
  const sampleData = {
    name: "Meenal Singh",
    age: "17 years",
    gender: "Male",
    id: "AFI-ID-AHRM01234",
    photo: "/Meenal-profile.jpg",
    // photo: "/images/scorecard-demo.png",
    tests: [
      {
        name: "Push-ups",
        result: "38 reps",
        score: 9.6,
        grade: "Excellent",
        remarks: "Outstanding upper body strength",
      },
      { name: "Sit-ups", result: "46 reps", score: 9.2, grade: "Excellent", remarks: "Strong core muscles" },
      { name: "BMI", result: "20.1 kg/m²", score: 9.0, grade: "Healthy", remarks: "Optimal body composition" },
      { name: "Shuttle Run", result: "14.2 sec", score: 9.2, grade: "Excellent", remarks: "Great agility and speed" },
      { name: "Vertical Jump", result: "65 cm", score: 8.8, grade: "Excellent", remarks: "Good explosive power" },
    ],
    overallScore: 92,
    performance: "Excellent Performance",
    recommendation: "Recommended for advanced training",
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "Excellent":
        return "text-green-400"
      case "Good":
        return "text-blue-400"
      case "Healthy":
        return "text-teal-400"
      case "Average":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section ref={heroRef} className="text-center mb-16">
          <div className="scorecard-hero">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Performance <span className="gradient-text">Scorecard</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Comprehensive fitness assessment results with detailed analysis and professional scoring
            </p>
          </div>
        </section>

        <section ref={scorecardRef} className="mb-16">
          <div className="scorecard-demo max-w-5xl mx-auto">
            <div className="glass-effect rounded-2xl overflow-hidden">
              {/* Header with logo and branding */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center relative">
                <div className="absolute top-4 left-4">
                  <Image
                    src="/images/khel-setu-logo.png"
                    alt="Khel Setu"
                    width={60}
                    height={36}
                    className="rounded-lg"
                  />
                </div>
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Khelsetu Score Card</h2>
                <p className="text-blue-100">Physical Fitness Assessment Results</p>
              </div>

              {/* Personal Information */}
              <div className="p-6 bg-white/5">
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  <div className="bg-blue-600/20 px-4 py-2 rounded-full">
                    <span className="text-white font-semibold">{sampleData.name}</span>
                  </div>
                  <div className="bg-blue-600/20 px-4 py-2 rounded-full">
                    <span className="text-white">{sampleData.age}</span>
                  </div>
                  <div className="bg-blue-600/20 px-4 py-2 rounded-full">
                    <span className="text-white">{sampleData.gender}</span>
                  </div>
                  <div className="bg-blue-600/20 px-4 py-2 rounded-full">
                    <span className="text-white">{sampleData.id}</span>
                  </div>
                </div>
              </div>

              {/* Test Results Table */}
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="px-4 py-3 text-left rounded-tl-lg">S.No</th>
                        <th className="px-4 py-3 text-left">Fitness Test</th>
                        <th className="px-4 py-3 text-left">Result</th>
                        <th className="px-4 py-3 text-left">Score (out of 10)</th>
                        <th className="px-4 py-3 text-left">Performance Grade</th>
                        <th className="px-4 py-3 text-left rounded-tr-lg">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.tests.map((test, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white/5" : "bg-white/10"}>
                          <td className="px-4 py-3 text-white">{index + 1}</td>
                          <td className="px-4 py-3 text-blue-400 font-semibold">{test.name}</td>
                          <td className="px-4 py-3 text-white">{test.result}</td>
                          <td className="px-4 py-3 text-white font-bold">{test.score}</td>
                          <td className={`px-4 py-3 font-semibold ${getGradeColor(test.grade)}`}>{test.grade}</td>
                          <td className="px-4 py-3 text-gray-200">{test.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Overall Score */}
              <div className="p-6 bg-gradient-to-r from-blue-600 to-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Overall Fitness Score</h3>
                    <p className="text-xl text-blue-100 mb-1">{sampleData.performance}</p>
                    <p className="text-blue-100">{sampleData.recommendation}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl font-bold text-white">{sampleData.overallScore}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scorecard Features */}
        <section className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Features */}
          <div className="space-y-8">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Scorecard Features</h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Personal information and athlete ID</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Individual test results with scores</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Performance grades (Excellent, Good, Average)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Detailed remarks and feedback</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Overall fitness percentage</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span>Training recommendations</span>
                </li>
              </ul>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Scoring System</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">Excellent</span>
                  <span className="text-green-400 font-semibold">9.0 - 10.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">Good</span>
                  <span className="text-blue-400 font-semibold">7.0 - 8.9</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">Average</span>
                  <span className="text-yellow-400 font-semibold">5.0 - 6.9</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-200">Below Average</span>
                  <span className="text-red-400 font-semibold">&lt; 5.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="space-y-8">
            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Benefits</h3>
              <ul className="space-y-4 text-gray-200">
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Professional Certification</div>
                    <div className="text-sm">Standardized scorecard recognized by sports authorities</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Progress Tracking</div>
                    <div className="text-sm">Monitor improvement over time with historical data</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Talent Identification</div>
                    <div className="text-sm">Identify strengths and areas for development</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">Personalized Guidance</div>
                    <div className="text-sm">Customized training recommendations</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="glass-effect p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Digital Features</h3>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Downloadable PDF format</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Shareable digital link</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>QR code verification</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Mobile-optimized viewing</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
