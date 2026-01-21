import React from "react";
import Satellite from "../../assets/textures/Satellight.png";

const ContactCard = () => {
  return (
    <div className="w-full overflow-hidden flex flex-col md:flex-row">
      {/* Left Side: Visual/Branding Section */}
      <div className="md:w-1/3 bg-indigo-600 p-8 text-white flex flex-col justify-between items-center text-center">
        <div>
          <h3 className="text-3xl font-bold mb-2">Let's Talk</h3>
          <p className="text-indigo-100 text-sm">
            Have a project in mind? Reach out and let's build something amazing
            together.
          </p>
        </div>

        {/* Using your Satellite asset here */}
        <div className="my-8 transform hover:scale-105 transition-transform duration-500">
          <img
            src={Satellite}
            alt="Satellite"
            className="w-48 h-48 object-contain drop-shadow-2xl"
          />
        </div>

        <div className="space-y-2 text-xs text-indigo-200">
          <p>Ready for liftoff? 🚀</p>
        </div>
      </div>

      {/* Right Side: The Form */}
      <div className="md:w-2/3 p-8">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="email@gmail.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Subject (Optional addition for standard UI) */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="How can I help?"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Message */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-600 ml-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactCard;
