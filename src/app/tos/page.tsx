export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-medium mb-8">Terms of Service</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-medium mb-4">1. Agreement to Terms</h2>
          <p className="text-gray-600">
            By accessing and using OpenPisces, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not
            use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">2. Platform Overview</h2>
          <p className="text-gray-600">
            OpenPisces is a decentralized fundraising platform that enables
            users to create and contribute to fundraising campaigns using
            cryptocurrency. Our platform utilizes blockchain technology to
            ensure transparency and security in all transactions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">
            3. User Responsibilities
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>As a user of OpenPisces, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Provide accurate and truthful information when creating
                fundraising campaigns
              </li>
              <li>Not engage in fraudulent or deceptive activities</li>
              <li>
                Maintain the security of your wallet and account credentials
              </li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use the platform for illegal or unauthorized purposes</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">
            4. Fundraising Campaigns
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>When creating a fundraising campaign:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must have the right to create and manage the campaign</li>
              <li>Campaign descriptions must be accurate and not misleading</li>
              <li>
                You are responsible for fulfilling any promises made to donors
              </li>
              <li>
                OpenPisces reserves the right to remove campaigns that violate
                our terms
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">
            5. Cryptocurrency Transactions
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              All transactions on OpenPisces are conducted using cryptocurrency.
              Users acknowledge:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Transactions are irreversible once confirmed on the blockchain
              </li>
              <li>
                Users are responsible for ensuring correct wallet addresses
              </li>
              <li>Market volatility may affect the value of contributions</li>
              <li>
                Gas fees and network costs are the responsibility of the user
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">6. Privacy and Data</h2>
          <p className="text-gray-600">
            We respect your privacy and handle your data in accordance with our
            Privacy Policy. While blockchain transactions are public by nature,
            we protect any additional personal information you provide to us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">
            7. Limitation of Liability
          </h2>
          <p className="text-gray-600">
            OpenPisces is not responsible for any losses or damages resulting
            from your use of the platform, including but not limited to
            cryptocurrency transaction errors, market volatility, or technical
            issues.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">8. Changes to Terms</h2>
          <p className="text-gray-600">
            We reserve the right to modify these terms at any time. Users will
            be notified of significant changes, and continued use of the
            platform constitutes acceptance of modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium mb-4">9. Contact Information</h2>
          <p className="text-gray-600">
            For questions about these terms, please contact us at
            team@openpisces.com
          </p>
        </section>

        <div className="pt-8 text-sm text-gray-500">
          <p>Last updated: March 2024</p>
        </div>
      </div>
    </div>
  );
}
