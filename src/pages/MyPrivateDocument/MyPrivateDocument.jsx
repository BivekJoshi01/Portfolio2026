import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { documents } from "./documents";

import { motion } from "framer-motion";
import InitalDocLoad from "./MyPrivateHelper/InitalDocLoad";

const DocumentHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2
        className="
          text-3xl sm:text-4xl md:text-5xl
          font-extrabold leading-tight
        "
      >
        Document{" "}
        <span className="bg-(--secondary) bg-clip-text text-transparent">
          Vault
        </span>
      </h2>
    </motion.div>
  );
};

const DocumentSidebar = ({
  documents,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <motion.div
      layout
      className={`flex items-center justify-center transition-all duration-500 ${
        selectedCategory ? "lg:w-[30%] w-full" : "w-full"
      }`}
    >
      <div
        className={`grid gap-3 w-full transition-all duration-500 ${
          selectedCategory
            ? "grid-cols-1 overflow-y-auto pr-2 custom-scrollbar"
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
                    ? "border-(--primary) bg-(--card) shadow-lg p-3 ring-2 ring-blue-500/10"
                    : "border-(--card-border) bg-(--glow-color) backdrop-blur-md hover:border-blue-300 p-6"
                }`}
            >
              <div
                className={`flex items-center ${
                  isActive ? "flex-col items-start gap-4" : "gap-4"
                }`}
              >
                <div
                  className={`${isActive ? "w-14 h-14 text-2xl" : "w-10 h-10 text-lg"} 
                  ${doc.color} rounded-xl flex items-center justify-center shadow-inner shrink-0 transition-all duration-300`}
                >
                  {doc.icon}
                </div>

                <div className="min-w-0">
                  <h3
                    className={`font-bold truncate transition-all duration-300 ${
                      isActive ? "text-xl" : "text-sm"
                    }`}
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
  );
};

const DocumentPreview = ({ activeDoc, onClose }) => {
  return (
    <motion.div
      key={activeDoc.id}
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className="bg-(--glow-color) rounded-[2.5rem] shadow-2xl border border-(--card-border) w-full h-full flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-8 border-b border-slate-50 shrink-0">
        <div>
          <h2 className="text-2xl font-black text-(--secondary) leading-tight">
            {activeDoc.title}
          </h2>
          <p className="font-medium text-sm italic mt-1">{activeDoc.msg}</p>
        </div>
        <button
          onClick={onClose}
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

      {/* Scrollable Content */}
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
  );
};

const MyPrivateDocument = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const activeDoc = documents?.find((d) => d.id === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">
      <DocumentHeader />
      {!selectedCategory && <InitalDocLoad />}

      <div className="flex flex-col lg:flex-row gap-8 overflow-hidden max-h-[70vh] w-full">
        <DocumentSidebar
          documents={documents}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <AnimatePresence mode="wait">
          {selectedCategory && (
            <div className="w-[90%]">
              <DocumentPreview
                activeDoc={activeDoc}
                onClose={() => setSelectedCategory(null)}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyPrivateDocument;
