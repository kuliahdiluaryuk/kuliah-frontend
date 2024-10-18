"use client";

import { Footer } from "@/components/layouts/footer";

const ContactUsPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = "mailto:kuliah.diluar.yuk@gmail.com";
    window.location.href = email;
  };

  return (
    <main className="bg-[#F5F5F5] py-6 sm:py-16 flex flex-col items-center justify-center px-10 md:px-80">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="max-w-lg mx-auto p-6 grid grid-cols-1 gap-12 justify-between">
        <div className="flex flex-col gap-10">
          <div className="">
            <h3 className="text-ls font-bold">Address</h3>
            <p className="text-gray-700">
              Unit 1629 Cityloft, Jl.k.h Mas Mansyur No.121 Rt/rw 13/11, Karet
              Tengsin, Tanah Abang, Kota Jakarta Pusat 10220
            </p>
          </div>
          <div className="">
            <h3 className="text-ls font-bold">Email</h3>
            <p className="text-gray-700">kuliah.diluar.yuk@gmail.com</p>
          </div>
          <div className="">
            <h3 className="text-ls font-bold">Phone</h3>
            <p className="text-gray-700">+62 838 969 088 87</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ContactUsPage;
