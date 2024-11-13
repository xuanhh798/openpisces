import Link from "next/link";
import {
  ChevronRight,
  Globe,
  //   TikTok,
  //   Discord,
} from "lucide-react";
import { SocialIcon } from "react-social-icons";

export function Banner() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h1 className="text-2xl font-bold mb-2">OpenPisces</h1>
        <p className="text-md text-gray-400">
          Leading the Future of Decentralized Fundraising.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Research Column */}
        <div className="space-y-4">
          <h3 className="font-medium mb-6">Our research</h3>
          <nav className="flex flex-col space-y-4">
            <Link href="/overview" className="text-gray-400 hover:text-white">
              Overview
            </Link>
            <Link href="/index" className="text-gray-400 hover:text-white">
              Index
            </Link>
            <Link href="/latest" className="text-gray-400 hover:text-white">
              Latest advancements
            </Link>
            <Link href="/openai-o1" className="text-gray-400 hover:text-white">
              OpenAI o1
            </Link>
            <Link
              href="/openai-o1-mini"
              className="text-gray-400 hover:text-white"
            >
              OpenAI o1-mini
            </Link>
            <Link href="/gpt-4" className="text-gray-400 hover:text-white">
              GPT-4
            </Link>
            <Link
              href="/gpt-4a-mini"
              className="text-gray-400 hover:text-white"
            >
              GPT-4a mini
            </Link>
            <Link href="/dalle-3" className="text-gray-400 hover:text-white">
              DALL·E 3
            </Link>
            <Link href="/sora" className="text-gray-400 hover:text-white">
              Sora
            </Link>
          </nav>
        </div>

        {/* ChatGPT Column */}
        <div className="space-y-4">
          <h3 className="font-medium mb-6">ChatGPT</h3>
          <nav className="flex flex-col space-y-4">
            <Link
              href="/for-everyone"
              className="text-gray-400 hover:text-white"
            >
              For Everyone
            </Link>
            <Link href="/for-teams" className="text-gray-400 hover:text-white">
              For Teams
            </Link>
            <Link
              href="/for-enterprises"
              className="text-gray-400 hover:text-white"
            >
              For Enterprises
            </Link>
            <Link
              href="/login"
              className="text-gray-400 hover:text-white flex items-center"
            >
              ChatGPT login <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <Link href="/download" className="text-gray-400 hover:text-white">
              Download
            </Link>
          </nav>
        </div>

        {/* API Column */}
        <div className="space-y-4">
          <h3 className="font-medium mb-6">API</h3>
          <nav className="flex flex-col space-y-4">
            <Link
              href="/platform-overview"
              className="text-gray-400 hover:text-white"
            >
              Platform overview
            </Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-gray-400 hover:text-white flex items-center"
            >
              Documentation <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              href="/api-login"
              className="text-gray-400 hover:text-white flex items-center"
            >
              API login <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              href="/explore-more"
              className="text-gray-400 hover:text-white"
            >
              Explore more
            </Link>
            <Link href="/business" className="text-gray-400 hover:text-white">
              OpenAI for business
            </Link>
            <Link href="/stories" className="text-gray-400 hover:text-white">
              Stories
            </Link>
          </nav>
        </div>

        {/* Company Column */}
        <div className="space-y-4">
          <h3 className="font-medium mb-6">Company</h3>
          <nav className="flex flex-col space-y-4">
            <Link href="/about" className="text-gray-400 hover:text-white">
              About us
            </Link>
            <Link href="/news" className="text-gray-400 hover:text-white">
              News
            </Link>
            <Link href="/charter" className="text-gray-400 hover:text-white">
              Our Charter
            </Link>
            <Link href="/security" className="text-gray-400 hover:text-white">
              Security
            </Link>
            <Link href="/residency" className="text-gray-400 hover:text-white">
              Residency
            </Link>
            <Link href="/careers" className="text-gray-400 hover:text-white">
              Careers
            </Link>
          </nav>
        </div>

        {/* Terms & Policies Column */}
        <div className="space-y-4">
          <h3 className="font-medium mb-6">Terms & policies</h3>
          <nav className="flex flex-col space-y-4">
            <Link href="/tos" className="text-gray-400 hover:text-white">
              Terms of use
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy policy
            </Link>
            <Link href="/brand" className="text-gray-400 hover:text-white">
              Brand guidelines
            </Link>
            <Link href="/policies" className="text-gray-400 hover:text-white">
              Other policies
            </Link>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <select
            className="bg-black text-gray-400 hover:text-white focus:outline-none cursor-pointer"
            defaultValue="en-US"
          >
            <option value="en-US">English (US)</option>
            {/* Add other language options as needed */}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-gray-400 text-sm">OpenPisces © 2024</p>
          <div className="flex items-center gap-4">
            <SocialIcon
              url="https://x.com/OpenPiscesTeam"
              bgColor="transparent"
              fgColor="#9CA3AF"
              className="hover:opacity-80"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://youtube.com/openai"
              bgColor="transparent"
              fgColor="#9CA3AF"
              className="hover:opacity-80"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://linkedin.com/company/openai"
              bgColor="transparent"
              fgColor="#9CA3AF"
              className="hover:opacity-80"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://github.com/openai"
              bgColor="transparent"
              fgColor="#9CA3AF"
              className="hover:opacity-80"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://instagram.com/openai"
              bgColor="transparent"
              fgColor="#9CA3AF"
              className="hover:opacity-80"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://discord.gg/openai"
              bgColor="transparent"
              fgColor="#9CA3AF"
              className="hover:opacity-80"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://t.me/openai"
              bgColor="transparent"
              fgColor="#9CA3AF"
              className="hover:opacity-80"
              style={{ height: 40, width: 40 }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
