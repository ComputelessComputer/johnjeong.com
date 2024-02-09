import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="text-gray-600">Last updated: Feb 10, 2024</p>
      <section className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">1. Introduction</h2>
        <p className="text-gray-700">
          My macOS app is designed to help users calculate the percentage of
          days that have passed in the year without collecting or storing any
          personal data.
        </p>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">
          2. Data Collection and Usage
        </h2>
        <p className="text-gray-700">
          My app does not collect, use, store, or share any data about its
          users. There are no user accounts, no analytics tracking, and no data
          sent to servers.
        </p>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">3. Your Consent</h2>
        <p className="text-gray-700">
          By using my app, you consent to this privacy policy.
        </p>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">
          4. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-700">
          Should I decide to change this privacy policy, I will post those
          changes on this page.
        </p>
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">5. Contact Me</h2>
        <p className="text-gray-700">
          If you have any questions regarding this privacy policy, you can
          contact me.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
