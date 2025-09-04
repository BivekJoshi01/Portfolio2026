import React from "react";
import Satellite from "../../assets/textures/Satellight.png";

const ContactCard = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row max-w-5xl w-900">
        {/* Contact Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Contact Me
          </h2>
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side (Map + Satellite overlay) */}
        <div className="w-full md:w-1/2 h-80 md:h-auto">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.124394665182!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1909f76f4e51%3A0xf14b6f4b2e2d2d7!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 90,
          right: 290,
          animation: "float 4s ease-in-out infinite",
        }}
      >
        <img
          src={Satellite}
          alt="Satellite"
          className="w-96 h-86 object-contain z-10 drop-shadow-2xl"
        />

        <style>
          {`
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-12px); }
            }
        `}
        </style>
      </div>
      <div className="absolute top-[180px] left-[720px] bg-orange-500/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        9865466989
      </div>

      <div className="absolute top-[230px] left-[750px] bg-orange-500/80 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        bvkjosi03@gmail.com
      </div>
    </div>
  );
};

export default ContactCard;
