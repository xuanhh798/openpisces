"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is OpenPisces?",
    answer:
      "OpenPisces is a decentralized fundraising platform that connects donors with causes using blockchain technology. We enable transparent, secure, and efficient charitable giving through cryptocurrency.",
  },
  {
    question: "How do I create a fundraising campaign?",
    answer:
      "To create a fundraising campaign, you need to connect your wallet (Phantom or MetaMask) and click on 'Start A Fund' in the navigation bar. Follow the guided process to set up your campaign, including details, goals, and supporting documentation.",
  },
  {
    question: "What cryptocurrencies are accepted?",
    answer:
      "Currently, OpenPisces accepts donations through Bitcoin (BTC), Solana (SOL), Ethereum (ETH) and (USDC) via MetaMask, Phantom and Coinbase Wallet. We're working on adding support for more cryptocurrencies and wallets.",
  },
  {
    question: "How are funds distributed?",
    answer:
      "Funds are distributed directly to the cause's wallet address through smart contracts. Each transaction is recorded on the blockchain, ensuring complete transparency. Donors can track how their contributions are being used in real-time.",
  },
  {
    question: "Is my donation secure?",
    answer:
      "Yes, all donations are secured by blockchain technology. We use industry-standard security practices and smart contracts that have been audited for safety. Each transaction is verified and immutable once recorded on the blockchain.",
  },
  {
    question: "How can I track my donations?",
    answer:
      "You can track all your donations through your profile page. Each contribution is recorded with transaction details, including the amount, timestamp, and the cause supported. You can also view the overall impact of your donations.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl text-center mb-12">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden"
            onClick={() => toggleFAQ(index)}
          >
            <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50">
              <span className="font-medium text-lg">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-4">
          Can't find the answer you're looking for? Please reach out to our
          support team.
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}
