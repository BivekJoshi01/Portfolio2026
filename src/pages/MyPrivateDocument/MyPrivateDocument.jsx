import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { documents } from "./documents";
import InitalDocLoad from "./MyPrivateHelper/InitalDocLoad";

const MyPrivateDocument = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const activeDoc = documents?.find((d) => d.id === selectedCategory);

  return (
    <div className="w-full">
      {/* Header - Stays at top */}
      {!selectedCategory && (
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Document Vault
            </h1>
          </motion.div>
        </div>
      )}

      {/* Main Container - Fixed Height at 80vh */}
      <div className=" max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT SIDE: Sidebar - Stays Centered */}
        <motion.div
          layout
          className={`flex items-center justify-center transition-all duration-500 ${
            selectedCategory ? "lg:w-[30%] w-full" : "w-full"
          }`}
        >
          <div
            className={`grid gap-3 w-full transition-all duration-500 ${
              selectedCategory
                ? "grid-cols-1 max-h-full overflow-y-auto pr-2 custom-scrollbar"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {documents.map((doc, index) => {
              const isActive = selectedCategory === doc.id;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  key={doc.id}
                  onClick={() => setSelectedCategory(doc.id)}
                  className={`group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden
                    ${
                      isActive
                        ? "border-blue-500 bg-white shadow-lg p-3 ring-2 ring-blue-500/10"
                        : "border-slate-200 bg-white/60 backdrop-blur-md hover:border-blue-300 p-6"
                    }`}
                >
                  <div
                    className={`flex items-center ${isActive ? "flex-col items-start gap-4" : "gap-4"}`}
                  >
                    <div
                      className={`${isActive ? "w-14 h-14 text-2xl" : "w-10 h-10 text-lg"} 
                      ${doc.color} rounded-xl flex items-center justify-center shadow-inner shrink-0 transition-all duration-300`}
                    >
                      {doc.icon}
                    </div>

                    <div className="min-w-0">
                      <h3
                        className={`font-bold text-slate-900 truncate transition-all duration-300 ${isActive ? "text-xl" : "text-sm"}`}
                      >
                        {doc.title}
                      </h3>
                      {!isActive && (
                        <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded-md text-slate-500 uppercase mt-2 inline-block">
                          {doc.images.length} Files
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT SIDE: Scrolable Preview Container */}
        <div
          className={`transition-all duration-500 flex items-center justify-center ${
            selectedCategory
              ? "lg:w-[70%] w-full h-full"
              : "w-0 h-0 overflow-hidden"
          }`}
        >
          <AnimatePresence mode="wait">
            {selectedCategory ? (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 w-full h-full flex flex-col overflow-hidden"
              >
                {/* Fixed Preview Header */}
                <div className="flex justify-between items-center p-8 border-b border-slate-50 shrink-0">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">
                      {activeDoc.title}
                    </h2>
                    <p className="text-blue-600 font-medium text-sm italic mt-1 italic">
                      {activeDoc.msg}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="p-3 bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 rounded-2xl transition-all"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* SCROLLABLE CONTENT AREA */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {activeDoc.images.map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="group relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                      >
                        <img
                          src={img}
                          alt="Doc preview"
                          className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Empty State View */}
        {!selectedCategory && <InitalDocLoad />}
      </div>
    </div>
  );
};

export default MyPrivateDocument;
