"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Add these interfaces at the top of the file
interface RecentActivity {
  id: string;
  question: string;
  user: string;
  answer: "Yes" | "No";
  price: number;
  amount: number;
  time: string;
  icon?: string;
}

interface TopVolume {
  id: string;
  name: string;
  amount: number;
  avatar?: string;
  rank: number;
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [count, setCount] = useState(123456789);

  // Add new state for mock data
  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: "1",
      question: "Will Man Utd win on 2024-11-10?",
      user: "mieba9",
      answer: "Yes",
      price: 0.74,
      amount: 10.0,
      time: "20s ago",
      icon: "/manchester-united.png",
    },
    {
      id: "2",
      question: "Will Jared Kushner be a member of the Trump administration?",
      user: "DGjh",
      answer: "Yes",
      price: 0.34,
      amount: 7.48,
      time: "20s ago",
    },
    // Add more mock data as needed
  ]);

  const [topVolumes] = useState<TopVolume[]>([
    {
      id: "1",
      name: "0x971f91a412236cc942a6f4485d3d...",
      amount: 92499704,
      rank: 1,
    },
    {
      id: "2",
      name: "fgtr",
      amount: 32782077,
      rank: 2,
    },
    {
      id: "3",
      name: "walletmobile",
      amount: 32196692,
      rank: 3,
    },
    // Add more mock data as needed
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const startCount = 0; // Start from 0
    const duration = 2000; // Animation duration in milliseconds
    const steps = 60; // Number of steps in the animation
    const stepValue = (count - startCount) / steps;

    let current = startCount;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= count) {
        setCount(count);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []); // Run once on mount

  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Main hero section */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        {/* Black bars container */}
        <div className="absolute inset-0 flex">
          <div className="w-[4vw] bg-black"></div>
          <div className="flex-1">
            {/* Video container */}
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-black/20">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/landing.webm" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <div className="w-[4vw] bg-black"></div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-6xl font-medium mb-4 text-center">OpenPisces</h1>
          <p className="text-xl mb-8 text-center">
            Where Dreams Come True. You And Others.
          </p>
          <Link href="/mission">
            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors">
              Learn more
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Purchase counter section */}
      <div className="w-full py-8 bg-white border-b-2 border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl font-bold tracking-tight">
              ${count.toLocaleString()}
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2"></span>
            </h2>
            <p className="text-gray-600">Total Funds Raised on OpenPisces</p>
          </div>
        </div>
      </div>

      {/* Fundraiser section */}
      <div className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="md:text-3xl text-2xl font-medium text-center mb-8">
            Support a cause or fundraiser that inspires you
          </h2>
          <div className="flex items-center justify-between mb-8">
            <button className="px-4 py-2 border rounded-full hover:bg-gray-50">
              Trending
            </button>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                {/* Add left arrow icon here if needed */}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                {/* Add right arrow icon here if needed */}
              </button>
            </div>
          </div>

          {/* Fundraiser cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add fundraiser cards here */}
          </div>
        </div>
      </div>

      {/* Activity and Volume section - now at the bottom */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Activity
              </h2>
              <button className="text-gray-600 hover:text-gray-900">
                See all
              </button>
            </div>
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {activity.icon ? (
                      <img
                        src={activity.icon}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 truncate">
                      {activity.question}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-medium">{activity.user}</span>{" "}
                      bought{" "}
                      <span
                        className={`font-medium ${
                          activity.answer === "Yes"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {activity.answer}
                      </span>{" "}
                      at {activity.price}¢ (${activity.amount})
                    </p>
                  </div>
                  <span className="text-gray-400 whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Volume This Week */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Top Volume This Week
              </h2>
              <button className="text-gray-600 hover:text-gray-900">
                See all
              </button>
            </div>
            <div className="space-y-4">
              {topVolumes.map((volume) => (
                <div key={volume.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium">
                    {volume.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {volume.name}
                    </p>
                    <p className="text-gray-500">
                      ${volume.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
