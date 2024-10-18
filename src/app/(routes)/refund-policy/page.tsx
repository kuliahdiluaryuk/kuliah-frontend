"use client";

import { Footer } from "@/components/layouts/footer";

const TermsAndConditionPage: React.FC = () => {
  return (
    <main className="bg-[#F5F5F5] py-6 sm:py-16 flex flex-col items-center justify-center px-10 md:px-80">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
          <p className="text-gray-700">
            We aim to provide excellent service and ensure customer
            satisfaction. However, if you are not satisfied with your purchase,
            please review our refund policy for details on how we handle refund
            requests.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Refund Eligibility</h2>
          <p className="text-gray-700">
            Refunds are available for subscription purchases made within the
            last 7 days. Refunds are only possible if you cannot access the
            service on any device (e.g., PC, laptop, phone, or tablet). To be
            eligible, you must provide a video showing that all devices are
            unable to access the service. The video must include a timer or
            clock in view to ensure it is unedited. Refund requests must include
            a valid reason for dissatisfaction with the service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            3. Non-Refundable Items
          </h2>
          <p className="text-gray-700">
            Once a subscription is utilized (e.g., you have participated in AI
            conversations or received major recommendations), refunds will not
            be issued. All fees for consumed services are final.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            4. How to Request a Refund
          </h2>
          <p className="text-gray-700">
            To request a refund, please contact our customer support at
            [kulmin@kuliahdiluaryuk.com] within 7 days of your purchase. Include
            your account details, the reason for your request, and the required
            video evidence. Our team will review your request and get back to
            you within 3-5 business days.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            5. Payment Refund Process
          </h2>
          <p className="text-gray-700">
            If your refund request is approved, the refund will be processed to
            the original payment method (e-wallet or debit/credit card) within
            10-14 business days. The processing time may vary depending on your
            payment provider.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">
            6. Changes to the Refund Policy
          </h2>
          <p className="text-gray-700">
            We reserve the right to modify this refund policy at any time. Any
            changes will be updated on this page. Please review the policy
            regularly to stay informed.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default TermsAndConditionPage;
