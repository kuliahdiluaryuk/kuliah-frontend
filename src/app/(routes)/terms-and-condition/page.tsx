"use client";

import { Footer } from "@/components/layouts/footer";

const TermsAndConditionPage: React.FC = () => {
  return (
    <main className="bg-[#F5F5F5] py-6 sm:py-16 flex flex-col items-center justify-center px-10 md:px-80">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
          <p className="text-gray-700">
            This website provides AI-driven recommendations to help users
            improve their English conversation skills through interactive forms
            and AI conversations. The service is designed to assist users in
            choosing a suitable major based on their responses and provide
            English conversation practice. By using this website, you agree to
            the following terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. User Obligations</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Users are allowed to use the service, update their profiles, and
              purchase a subscription.
            </li>
            <li>Users must be at least 13 years old to access the service.</li>
            <li>
              Users are not permitted to share, distribute, or misuse the
              content or services in any way.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Payments and Fees</h2>
          <p className="text-gray-700">
            Our website offers subscription-based services, which can be paid
            for using e-wallets (OVO & ShopeePay) and Debit/Credit Cards via our
            payment gateway.
          </p>
          <p className="text-gray-700">
            Refund policies are available upon request. Please refer to the
            specific refund terms once published.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Account Management</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Users must create an account using either email or Google OAuth
              login.
            </li>
            <li>
              Users are responsible for maintaining the security of their
              account.
            </li>
            <li>
              If a user violates these terms, their account may be deleted
              without notice.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            5. Intellectual Property
          </h2>
          <p className="text-gray-700">
            The website does not offer any copyrighted content for public use.
          </p>
          <p className="text-gray-700">
            Users are not allowed to share or redistribute any materials from
            the website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            We are not responsible for server downtimes, rejected payments, or
            incorrect payments made by users.
          </p>
          <p className="text-gray-700">
            Any issues arising from third-party services or unforeseen
            circumstances are outside of our liability.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            7. Privacy and Data Collection
          </h2>
          <p className="text-gray-700">
            We collect and encrypt user data to ensure protection and privacy.
          </p>
          <p className="text-gray-700">
            We do not share any user data with third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p className="text-gray-700">
            These terms are governed by the laws of Indonesia. Any disputes will
            be handled in accordance with Indonesian law.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default TermsAndConditionPage;
