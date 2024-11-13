"use client";
import Image from "next/image";
import { useState } from "react";

interface DonationInfo {
  name: string;
  amount: string;
  timeAgo: string;
}

function truncateAddress(address: string): string {
  if (address === "Anonymous") return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

interface CommentInfo {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
}

export default function CausePage() {
  const donations: DonationInfo[] = [
    {
      name: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      amount: "$500",
      timeAgo: "2 hrs",
    },
    {
      name: "0x1234567890abcdef1234567890abcdef12345678",
      amount: "$200",
      timeAgo: "1 mo",
    },
    {
      name: "0xabcdef1234567890abcdef1234567890abcdef12",
      amount: "$800",
      timeAgo: "2 mos",
    },
    { name: "Anonymous", amount: "$200", timeAgo: "2 mos" },
    {
      name: "0x9876543210fedcba9876543210fedcba98765432",
      amount: "$40",
      timeAgo: "2 mos",
    },
  ];

  const comments: CommentInfo[] = [
    {
      id: "1",
      author: "qwdqdqwd-1730919...",
      content: "winkom hah https://x.com/Official/status/185441181626624364",
      timeAgo: "26m ago",
    },
  ];

  const images = [
    "/fundraiser-image.jpg",
    "/fundraiser-image-2.webp",
    "/fundraiser-image-3.webp",
    // Add more images as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );

  const nextImage = () => {
    setSlideDirection("left");
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSlideDirection("right");
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-8">
      <h1 className="text-4xl font-bold mb-6">
        UNICEF: Always There for Children in Crisis (Placeholder Text Lorem
        Ipsum)
      </h1>

      <div className="grid md:grid-cols-[2.5fr,1.5fr] gap-12">
        <div className="max-w-3xl">
          {/* Updated image slider */}
          <div className="rounded-lg overflow-hidden mb-6 relative">
            <Image
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Fundraiser image ${currentImageIndex + 1}`}
              width={800}
              height={600}
              className={`w-full ${
                slideDirection === "left" ? "slide-left" : "slide-right"
              }`}
            />

            {/* Navigation buttons */}
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />{" "}
            {/* Organizer avatar */}
            <p className="text-gray-600">UNICEF</p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full mb-6">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Donation protected
          </div>

          <p className="text-gray-700">
            Kids need UNICEF more than ever: Learning poverty has deepened in
            recent years. Well over half of children in low- and middle-income
            countries leave primary school unable to read and understand a
            simple story. Conflict and displacement, disease outbreaks, natural
            disasters and other disruptions have heightened the risks of kids
            dropping out of school permanently. Climate crises such as severe
            drought in the Horn of Africa have pushed millions of families
            deeper into poverty, increasing economic pressures that lead
            children to go to work instead of school. <br />
            <br />
            When children are not in school, their health and well-being
            suffers. In many parts of the world, school is where children get
            health care, immunizations and their one nutritious meal of the day.
            Girls who are not in school are often forced into early marriage.
          </p>
        </div>

        <div className="min-w-[340px] md:block hidden">
          {/* Sidebar - hidden on mobile */}
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6 w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold">$94,136</h2>
                <p className="text-gray-600">
                  raised of $100K goal · 161 donations
                </p>
              </div>
              <div className="w-12 h-12 relative">
                <svg viewBox="0 0 36 36" className="text-blue-500">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="94, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-500">
                    94%
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-100 hover:bg-blue-200 py-3 rounded-lg font-semibold mb-3">
              Share
            </button>
            <button className="relative w-full bg-red-600 hover:bg-red-500 py-3 rounded-lg text-white font-semibold mb-6 flex items-center justify-center gap-2 overflow-hidden animate-flash">
              <svg
                className="w-5 h-5 animate-heartbeat"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Donate
            </button>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-2 text-blue-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                This fundraiser is located near you
              </div>
            </div>

            {/* Recent donations */}
            <div className="space-y-4">
              {donations.map((donation, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div>
                    <p className="font-medium">
                      {truncateAddress(donation.name)}
                    </p>
                    <p className="text-gray-600">
                      {donation.amount} · {donation.timeAgo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New floating container for mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 p-4 flex gap-3">
        <button className="flex-1 bg-blue-100 hover:bg-blue-200 py-3 rounded-lg font-semibold">
          Share
        </button>
        <button className="flex-1 bg-red-600 hover:bg-red-500 py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Donate
        </button>
      </div>

      {/* Add padding at the bottom to prevent content from being hidden behind floating buttons */}
      <div className="h-20 md:hidden" />

      <div className="mt-12">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button className="border-b-2 border-gray-900 pb-4 font-medium">
              Comments ({comments.length})
            </button>
            <button className="text-gray-500 pb-4">Updates (0)</button>
            <button className="text-gray-500 pb-4">Top Donaters</button>
            <button className="text-gray-500 pb-4">Activity</button>
          </nav>
        </div>

        {/* Comment input */}
        <div className="mt-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Add a comment"
              className="flex-1 p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="text-blue-500 font-medium">Post</button>
          </div>
        </div>

        {/* Security warning */}
        <div className="bg-gray-50 p-4 rounded-lg mt-6 flex items-center gap-2">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-gray-700">
            Beware of external links, they may be phishing attacks.
          </p>
        </div>

        {/* Comments list */}
        <div className="mt-6 space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{comment.author}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">{comment.timeAgo}</span>
                    <button className="text-gray-500">•••</button>
                  </div>
                </div>
                <p className="mt-1">{comment.content}</p>
                <div className="mt-2 flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    0
                  </button>
                  <button className="text-gray-500">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
