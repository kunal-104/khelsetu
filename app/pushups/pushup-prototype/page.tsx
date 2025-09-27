"use client"

import { useEffect, useRef } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PushupPrototype() {
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load p5.js and TensorFlow.js libraries
    const loadScripts = async () => {
      // Load p5.js
      const p5Script = document.createElement("script")
      p5Script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"
      document.head.appendChild(p5Script)

      // Load p5.sound
      const p5SoundScript = document.createElement("script")
      p5SoundScript.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js"
      document.head.appendChild(p5SoundScript)

      // Load TensorFlow.js dependencies
      const tfCoreScript = document.createElement("script")
      tfCoreScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"
      document.head.appendChild(tfCoreScript)

      const tfConverterScript = document.createElement("script")
      tfConverterScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"
      document.head.appendChild(tfConverterScript)

      const tfBackendScript = document.createElement("script")
      tfBackendScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl"
      document.head.appendChild(tfBackendScript)

      const poseDetectionScript = document.createElement("script")
      poseDetectionScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection"
      document.head.appendChild(poseDetectionScript)

      // Wait for all scripts to load
      await new Promise((resolve) => {
        let loadedCount = 0
        const totalScripts = 5

        const checkLoaded = () => {
          loadedCount++
          if (loadedCount === totalScripts) {
            setTimeout(resolve, 1000) // Give extra time for initialization
          }
        }

        p5Script.onload = checkLoaded
        p5SoundScript.onload = checkLoaded
        tfCoreScript.onload = checkLoaded
        tfConverterScript.onload = checkLoaded
        poseDetectionScript.onload = checkLoaded
      })

      // Initialize the pushup detection system
      initializePushupDetection()
    }

    loadScripts()

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll('script[src*="p5"], script[src*="tensorflow"]')
      scripts.forEach((script) => script.remove())

      // Stop any running video streams
      if (window.stream) {
        window.stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const initializePushupDetection = () => {
    // Global variables for the p5.js sketch
    let detector,
      detectorConfig,
      poses,
      video,
      skeleton = true
    let elbowAngle = 999,
      backAngle = 0,
      reps = 0
    let upPosition = false,
      downPosition = false
    let highlightBack = false,
      backWarningGiven = false
    let edges

    // p5.js sketch functions
    window.init = async () => {
      detectorConfig = { modelType: window.poseDetection.movenet.modelType.SINGLEPOSE_THUNDER }
      detector = await window.poseDetection.createDetector(window.poseDetection.SupportedModels.MoveNet, detectorConfig)
      edges = {
        "5,7": "m",
        "7,9": "m",
        "6,8": "c",
        "8,10": "c",
        "5,6": "y",
        "5,11": "m",
        "6,12": "c",
        "11,12": "y",
        "11,13": "m",
        "13,15": "m",
        "12,14": "c",
        "14,16": "c",
      }
      window.getPoses = async () => {
        if (detector && video) {
          poses = await detector.estimatePoses(video.elt)
          setTimeout(window.getPoses, 0)
        }
      }
      await window.getPoses()
    }

    window.videoReady = async () => {
      console.log("[v0] Video ready, camera access granted")
    }

    window.setup = async () => {
      const msg = new SpeechSynthesisUtterance("Camera loading, please wait...")
      window.speechSynthesis.speak(msg)

      const canvas = window.createCanvas(640, 480)
      if (canvasContainerRef.current) {
        canvas.parent(canvasContainerRef.current)
      }

      video = window.createCapture(window.VIDEO, window.videoReady)
      video.hide()

      // Store video stream reference for cleanup
      window.stream = video.elt.srcObject

      await window.init()
    }

    window.draw = () => {
      window.background(20, 20, 30)
      window.translate(window.width, 0)
      window.scale(-1, 1)

      // Draw video feed
      if (video && video.elt && video.elt.videoWidth > 0) {
        window.image(video, 0, 0, video.width, video.height)
      }

      drawKeypoints()
      if (skeleton) {
        drawSkeleton()
      }

      // Reset transformations for text
      window.translate(window.width, 0)
      window.scale(-1, 1)

      window.fill(255, 255, 255, 200)
      window.strokeWeight(2)
      window.stroke(0, 0, 0, 150)
      window.textSize(32)
      window.textAlign(window.LEFT)

      if (poses && poses.length > 0) {
        const pushupString = `Push-ups: ${reps}`
        window.text(pushupString, 20, 50)

        // Show form feedback
        window.textSize(18)
        if (highlightBack) {
          window.fill(255, 100, 100, 200)
          window.text("Keep your back straight!", 20, 80)
        } else {
          window.fill(100, 255, 100, 200)
          window.text("Good form!", 20, 80)
        }
      } else {
        window.text("Loading AI detection...", 20, 50)
      }

      window.textSize(14)
      window.fill(100, 200, 255, 180)
      window.text("AI Pose Detection Active", 20, window.height - 20)
    }

    function drawKeypoints() {
      let count = 0
      if (poses && poses.length > 0) {
        for (const kp of poses[0].keypoints) {
          const { x, y, score } = kp
          if (score > 0.3) {
            count++
            window.fill(0, 255, 150, 200)
            window.stroke(255, 255, 255, 150)
            window.strokeWeight(2)
            window.circle(x, y, 12)

            // Inner dot
            window.fill(255, 255, 255, 250)
            window.noStroke()
            window.circle(x, y, 4)
          }
        }
        updateArmAngle()
        updateBackAngle()
        inUpPosition()
        inDownPosition()
      }
    }

    function drawSkeleton() {
      const confidence_threshold = 0.5
      if (poses && poses.length > 0) {
        for (const [key, value] of Object.entries(edges)) {
          const p = key.split(",")
          const p1 = p[0],
            p2 = p[1]
          const y1 = poses[0].keypoints[p1].y,
            x1 = poses[0].keypoints[p1].x,
            c1 = poses[0].keypoints[p1].score
          const y2 = poses[0].keypoints[p2].y,
            x2 = poses[0].keypoints[p2].x,
            c2 = poses[0].keypoints[p2].score

          if (c1 > confidence_threshold && c2 > confidence_threshold) {
            if (highlightBack === true && (p[1] == 11 || (p[0] == 6 && p[1] == 12) || p[1] == 13 || p[0] == 12)) {
              window.strokeWeight(4)
              window.stroke(255, 80, 80, 200)
              window.line(x1, y1, x2, y2)
            } else {
              window.strokeWeight(3)
              window.stroke(0, 255, 150, 180)
              window.line(x1, y1, x2, y2)
            }
          }
        }
      }
    }

    function updateArmAngle() {
      if (!poses || poses.length === 0) return

      const leftWrist = poses[0].keypoints[9]
      const leftShoulder = poses[0].keypoints[5]
      const leftElbow = poses[0].keypoints[7]

      const angle =
        (Math.atan2(leftWrist.y - leftElbow.y, leftWrist.x - leftElbow.x) -
          Math.atan2(leftShoulder.y - leftElbow.y, leftShoulder.x - leftElbow.x)) *
        (180 / Math.PI)

      if (leftWrist.score > 0.3 && leftElbow.score > 0.3 && leftShoulder.score > 0.3) {
        elbowAngle = angle
      }
    }

    function updateBackAngle() {
      if (!poses || poses.length === 0) return

      const leftShoulder = poses[0].keypoints[5]
      const leftHip = poses[0].keypoints[11]
      const leftKnee = poses[0].keypoints[13]

      let angle =
        (Math.atan2(leftKnee.y - leftHip.y, leftKnee.x - leftHip.x) -
          Math.atan2(leftShoulder.y - leftHip.y, leftShoulder.x - leftHip.x)) *
        (180 / Math.PI)

      angle = angle % 180

      if (leftKnee.score > 0.3 && leftHip.score > 0.3 && leftShoulder.score > 0.3) {
        backAngle = angle
      }

      if (backAngle < 20 || backAngle > 160) {
        highlightBack = false
      } else {
        highlightBack = true
        if (backWarningGiven !== true) {
          const msg = new SpeechSynthesisUtterance("Keep your back straight")
          window.speechSynthesis.speak(msg)
          backWarningGiven = true
        }
      }
    }

    function inUpPosition() {
      if (elbowAngle > 170 && elbowAngle < 200) {
        if (downPosition === true) {
          const msg = new SpeechSynthesisUtterance(String(reps + 1))
          window.speechSynthesis.speak(msg)
          reps = reps + 1
        }
        upPosition = true
        downPosition = false
      }
    }

    function inDownPosition() {
      if (!poses || poses.length === 0) return

      let elbowAboveNose = false
      if (poses[0].keypoints[0].y > poses[0].keypoints[7].y) {
        elbowAboveNose = true
      }

      if (highlightBack === false && elbowAboveNose && Math.abs(elbowAngle) > 70 && Math.abs(elbowAngle) < 100) {
        if (upPosition === true) {
          const msg = new SpeechSynthesisUtterance("Up")
          window.speechSynthesis.speak(msg)
        }
        downPosition = true
        upPosition = false
      }
    }
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tests#pushups"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Tests
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-4 drop-shadow-2xl text-shadow-strong">
            AI Push-up <span className="gradient-text">Prototype</span>
          </h1>
          <p className="text-xl text-cyan-100 drop-shadow-xl text-shadow-medium">
            Real-time pose detection and form analysis using TensorFlow.js
          </p>
        </div>

        {/* Instructions */}
        <div className="glass-effect p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Instructions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Setup</h3>
              <ul className="text-gray-200 space-y-1 text-sm">
                <li>• Allow camera access when prompted</li>
                <li>• Position yourself 3-4 feet from the camera</li>
                <li>• Ensure good lighting and clear background</li>
                <li>• Make sure your full body is visible</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">Form</h3>
              <ul className="text-gray-200 space-y-1 text-sm">
                <li>• Keep your body straight (avoid sagging back)</li>
                <li>• Lower chest to ground level</li>
                <li>• Push up to full arm extension</li>
                <li>• Listen for audio feedback</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="glass-effect p-6 rounded-xl">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white mb-2">Live Detection</h2>
            <p className="text-gray-200">The AI will automatically count your push-ups and provide form feedback</p>
          </div>

          <div className="flex justify-center mb-6">
            <div
              ref={canvasContainerRef}
              className="border-2 border-blue-400 rounded-lg overflow-hidden bg-gray-900 shadow-2xl"
              style={{ width: "640px", height: "480px" }}
            />
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-gray-800 px-6 py-3 rounded-lg">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">AI Detection Active</span>
            </div>
          </div>
        </div>

        {/* Technical Info */}
        <div className="mt-8 glass-effect p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">Technical Details</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Pose Detection</h4>
              <p className="text-gray-200">TensorFlow.js MoveNet model for real-time pose estimation</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Form Analysis</h4>
              <p className="text-gray-200">Angle calculations for elbow and back posture validation</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Rep Counting</h4>
              <p className="text-gray-200">State machine tracking up/down positions with audio feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
