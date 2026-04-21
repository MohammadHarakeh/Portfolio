"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    const y = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    setTilt({ x, y });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="about" ref={ref} className="section-shell">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="section-title">About Me</h2>
            <div className="section-divider" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              className="relative flex justify-center md:justify-start [perspective:1100px]"
            >
              {/* Depth only behind the photo */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="h-[22rem] w-[22rem] max-w-[90vw] rounded-3xl bg-slate-300/25 blur-3xl dark:bg-slate-500/20" />
              </div>

              <motion.div
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full max-w-md"
              >
                <div className="h-96 minimal-card overflow-hidden shadow-lg ring-1 ring-gray-200 dark:ring-gray-700">
                  <Image
                    src="/images/SE_Photo.jpeg"
                    alt="Mohammad Harake"
                    width={500}
                    height={500}
                    className="block h-full w-full object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I build reliable software that turns complex ideas into practical
                products. Over the last 1.5 years, I have delivered 26 web projects
                from concept to production with a strong focus on usability, clean
                implementation, and performance.
              </p>

              <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Highlights
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span
                      className="mr-2 mt-1.5 shrink-0 text-[rgb(30,41,59)] dark:text-primary-400"
                      aria-hidden
                    >
                      •
                    </span>
                    <span>
                      Built 26 web projects, including 20 landing pages and 6 full
                      platforms with responsive user journeys.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className="mr-2 mt-1.5 shrink-0 text-[rgb(30,41,59)] dark:text-primary-400"
                      aria-hidden
                    >
                      •
                    </span>
                    <span>
                      At The Ark Networks, I develop React and MUI interfaces, plus
                      live chat and notifications for production systems.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span
                      className="mr-2 mt-1.5 shrink-0 text-[rgb(30,41,59)] dark:text-primary-400"
                      aria-hidden
                    >
                      •
                    </span>
                    <span>
                      As a freelance developer, I delivered 20 websites and apps,
                      integrated APIs, and built reusable CMS workflows.
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I love connecting with new people, you can reach me at:{" "}
                {personalInfo.email}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
