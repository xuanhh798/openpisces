export default function MissionPage() {
  return (
    <div className="min-h-screen px-4 md:mt-8 mt-4 py-16 mx-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="md:text-5xl text-3xl font-medium text-center">
          OpenPisces Mission
        </h1>

        <p className="text-lg">
          OpenPisces is leading the future of decentralized fundraising. Our
          platform connects donors directly with meaningful causes through
          blockchain technology, ensuring transparency and efficiency in
          charitable giving.
        </p>

        <div className="space-y-6">
          <h2 className="text-4xl font-medium  pt-12">Our Vision</h2>
          <p className="text-lg">
            We envision a world where supporting causes is seamless,
            transparent, and accessible to everyone. By leveraging blockchain
            technology, we're creating a trustless environment where every
            donation can be verified and tracked, ensuring maximum impact for
            beneficiaries.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12 mb-6">
            <div>
              <h3 className="text-2xl font-medium my-4">
                Decentralized Giving
              </h3>
              <p className="text-lg">
                Our platform enables direct connections between donors and
                causes, eliminating intermediaries and reducing overhead costs.
                Through smart contracts, we ensure that funds reach their
                intended recipients efficiently.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-medium my-4">Transparent Impact</h3>
              <p className="text-lg">
                Every transaction on OpenPisces is recorded on the blockchain,
                providing complete visibility into how funds are used. Donors
                can track their contributions and see their real-world impact.
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-medium pt-12">Join the Movement</h2>
          <p className="text-lg">
            Whether you're looking to support causes or create your own
            fundraising campaign, OpenPisces provides the tools and
            infrastructure to make a difference. Connect your wallet today and
            become part of the future of charitable giving.
          </p>
        </div>
      </div>
    </div>
  );
}
