export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-responsive-4xl text-center mb-12">Privacy Policy</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-medium mb-4">Introduction</h2>
          <p className="text-gray-600">
            OpenPisces ("we", "our", or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our decentralized
            fundraising platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Information We Collect</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Wallet Information</h3>
            <p className="text-gray-600">
              When you connect your wallet (Phantom, MetaMask, or other
              supported wallets), we collect your public wallet address and
              transaction history on our platform. We never have access to your
              private keys or seed phrases.
            </p>

            <h3 className="text-xl font-medium">Usage Information</h3>
            <p className="text-gray-600">
              We collect information about how you interact with our platform,
              including fundraisers you create or support, donation amounts, and
              browsing activity.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>To facilitate and process donations</li>
            <li>To maintain and improve our platform</li>
            <li>
              To communicate with you about your fundraisers and donations
            </li>
            <li>
              To prevent fraud and ensure compliance with our terms of service
            </li>
            <li>To analyze platform usage and optimize user experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Blockchain Transparency</h2>
          <p className="text-gray-600">
            Please note that blockchain transactions are public by nature. When
            you make a donation or create a fundraiser, the transaction details
            will be visible on the blockchain. This includes your wallet address
            and transaction amounts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to
            protect your information. However, no internet transmission is
            completely secure. We cannot guarantee the security of information
            transmitted to our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Your Rights</h2>
          <p className="text-gray-600 mb-4">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information (where applicable)</li>
            <li>Object to processing of your information</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy or our
            practices, please contact us at team@openpisces.com
          </p>
        </section>

        <section className="pt-8">
          <div className="border-t pt-8">
            <p className="text-sm text-gray-500">Last updated: March 2024</p>
          </div>
        </section>
      </div>
    </div>
  );
}
