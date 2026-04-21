"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              About Me
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="h-96 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image
                  src="/images/SE_Photo.jpeg"
                  alt="Mohammad Harake"
                  width={500}
                  height={500}
                  className="block w-full h-full object-cover object-top rounded-2xl"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                I build reliable software that turns complex ideas into
                practical products. Over the last 1.5 years, I have delivered 26
                web projects from concept to production with a strong focus on
                usability, clean implementation, and performance.
              </p>

              <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Highlights
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1.5">
                      •
                    </span>
                    <span>
                      Built 26 web projects, including 20 landing pages and 6
                      full platforms with responsive user journeys.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1.5">
                      •
                    </span>
                    <span>
                      At The Ark Networks, I develop React and MUI interfaces,
                      plus live chat and notifications for production systems.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1.5">
                      •
                    </span>
                    <span>
                      As a freelance developer, I delivered 20 websites and
                      apps, integrated APIs, and built reusable CMS workflows.
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
