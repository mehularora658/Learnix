"use client"
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, BrainCircuit, BookOpenCheck, Rocket } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link";

function App() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-br from-indigo-100 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
          <motion.h1
            className="text-5xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Unlock Your Potential with <span className="text-indigo-600">Learnix</span>
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            AI-generated, personalized courses to help you learn anything faster — from coding to creativity.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/workspace"><Button size="lg">Get Started</Button></Link>
            <Link href="/workspace/explore"><Button variant="outline" size="lg">Browse Courses</Button></Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Why Learnix ?</h2>
          <p className="text-gray-500 mb-12">AI-crafted content tailored to your goals and pace.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <BrainCircuit className="h-8 w-8 text-indigo-600" />
                <h3 className="text-lg font-semibold">AI-Powered Learning</h3>
                <p className="text-sm text-gray-600">Courses dynamically created to fit your learning style.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <BookOpenCheck className="h-8 w-8 text-indigo-600" />
                <h3 className="text-lg font-semibold">Verified Curriculum</h3>
                <p className="text-sm text-gray-600">Content reviewed and structured for quality & clarity.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <Sparkles className="h-8 w-8 text-indigo-600" />
                <h3 className="text-lg font-semibold">Interactive Modules</h3>
                <p className="text-sm text-gray-600">Engaging quizzes, real-world projects, and adaptive tests.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-4">
                <Rocket className="h-8 w-8 text-indigo-600" />
                <h3 className="text-lg font-semibold">Instant Feedback</h3>
                <p className="text-sm text-gray-600">Know your progress with real-time AI feedback.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Text content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold text-lg">1.</span>
                <div>
                  <h4 className="text-lg font-semibold">Tell us your goal</h4>
                  <p className="text-gray-600 text-sm">Whether it’s learning Python or preparing for an exam, we start with your ambition.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold text-lg">2.</span>
                <div>
                  <h4 className="text-lg font-semibold">AI crafts your course</h4>
                  <p className="text-gray-600 text-sm">Our AI builds a personalized learning path, content, and practice based on your level.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold text-lg">3.</span>
                <div>
                  <h4 className="text-lg font-semibold">Learn and master</h4>
                  <p className="text-gray-600 text-sm">Track your progress, get real-time feedback, and achieve your learning goals.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <Image
              src="/how-it-works.png" // Replace with your image path
              alt="How Learnix works"
              width={600}
              height={400}
              className="rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
          <h2 className="text-3xl font-semibold">Loved by Learners</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-sm text-gray-700">
                "This platform completely changed how I learn. I just set my goal, and the AI built a course that actually fit my pace and style. It's like having a personal tutor 24/7!"
                <div className="mt-4 font-medium text-indigo-600">Sophie M.</div>
                <div className="text-xs text-gray-500">Marketing Analyst</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-sm text-gray-700">
                "The interface is clean, intuitive, and the progress I’ve made is unreal. I went from beginner to confident in just weeks. Highly recommend!"
                <div className="mt-4 font-medium text-indigo-600">Raj P.</div>
                <div className="text-xs text-gray-500">Aspiring Data Scientist</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-sm text-gray-700">
                "What I love most is how personalized everything feels. The AI truly understands what I need and adjusts my learning path automatically. Brilliant use of tech!"
                <div className="mt-4 font-medium text-indigo-600">Lena K.</div>
                <div className="text-xs text-gray-500">Freelance Designer</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 bg-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-bold">Ready to unlock your learning potential?</h2>
          <p className="text-lg">Join thousands of learners accelerating with AI.</p>
          <Link href="/workspace"><Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">Start Learning</Button></Link>
        </div>
      </section>
      <footer className="bg-white border-t mt-2">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm text-gray-600">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Learnix</h3>
            <p>Personalized learning powered by AI. Set your goal, and let the system do the rest.</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Platform</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-indigo-600">Features</a></li>
              <li><a href="#" className="hover:text-indigo-600">Courses</a></li>
              <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-600">Testimonials</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Resources</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-600">Support</a></li>
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Connect</h4>
            <div className="flex space-x-4">
              {/* Replace with actual icons or <LucideIcon /> components if using lucide-react */}
              <a href="#" aria-label="Twitter" className="hover:text-indigo-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.28 3.9A12.14 12.14 0 013 5.1a4.28 4.28 0 001.32 5.71 4.23 4.23 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.29 4.29 0 01-1.93.07 4.28 4.28 0 004 2.98 8.6 8.6 0 01-5.32 1.83A8.66 8.66 0 012 19.54a12.13 12.13 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.6 8.6 0 0024 5.5a8.5 8.5 0 01-2.54.7z" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-indigo-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5H4.5V24H.5V8.5zm7.5 0h3.5v2.11h.05c.49-.93 1.69-1.91 3.49-1.91 3.73 0 4.42 2.45 4.42 5.64V24h-4.5v-7.4c0-1.77-.03-4.05-2.47-4.05-2.48 0-2.86 1.94-2.86 3.93V24H8V8.5z" /></svg>
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-indigo-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.84 10.91.57.1.78-.25.78-.55v-2.02c-3.19.69-3.87-1.54-3.87-1.54-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.18-3.08-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.93 10.93 0 015.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.73.8 1.18 1.82 1.18 3.08 0 4.43-2.7 5.4-5.27 5.68.41.36.77 1.07.77 2.16v3.2c0 .3.21.65.79.54A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t py-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} AI Learn. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
export default App