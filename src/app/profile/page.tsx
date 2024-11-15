"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

interface ProfileStats {
  positionsValue: number;
  profitLoss: number;
  volumeTraded: number;
  marketsTraded: number;
}

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Middleware will handle redirect
  }

  const stats: ProfileStats = {
    positionsValue: 0.0,
    marketsTraded: 0,
    profitLoss: 0.0,
    volumeTraded: 0.0,
  };

  return (
    <div className="max-w-5xl mx-auto p-4 py-16">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Image
            src="/default.jpg" // Replace with actual image path
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">jordyx</h1>
            <div className="text-gray-500 text-sm">
              <span>0x26ca...b306</span>
              <span className="ml-4">Joined Nov 2024</span>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
          Edit profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard
          icon="💰"
          label="Total value donated"
          value={`$${stats.positionsValue.toFixed(2)}`}
        />
        <StatCard
          icon="🏠"
          label="Fundraisers supported"
          value={stats.marketsTraded.toString()}
        />
        <StatCard
          icon="📈"
          label="Total raised"
          value={`$${stats.profitLoss.toFixed(2)}`}
        />
        <StatCard
          icon="👍🏻"
          label="Fundraisers started"
          value={`${stats.volumeTraded.toString()}`}
        />
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-6">
          <button className="px-4 py-2 border-b-2 border-black font-medium">
            Supported Causes
          </button>
          <button className="px-4 py-2 text-gray-500">Activity</button>
        </div>
      </div>

      {/* Positions Table */}
      <div className="text-sm">
        <div className="grid grid-cols-4 text-gray-500 uppercase mb-4">
          <div>Market</div>
          <div>Avg</div>
          <div>Current</div>
          <div>Value</div>
        </div>
        <div className="text-center py-8 text-gray-500">No positions found</div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="text-xl mb-2">{icon}</div>
      <div className="text-gray-500 text-sm mb-1">{label}</div>
      <div className="text-xl font-medium">{value}</div>
    </div>
  );
}
