import React, { useState } from "react";
import { documents } from "./documents";

const MyPrivateDocument = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);



  const activeDoc = documents?.find((d) => d.id === selectedCategory);

  return (
    <div className="max-h-screen w-full bg-slate-50 p-6 md:p-12 font-sans text-slate-800 overflow-y-scroll">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Document Vault</h1>
        <p className="text-slate-500 mt-2">
          Secure access to my academic and personal milestones.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 transition-all duration-500 ease-in-out">
        {/* LEFT SIDE: The Grid/List */}
        <div
          className={`grid gap-4 transition-all duration-500 ${selectedCategory ? "lg:w-1/3 grid-cols-1" : "w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
        >
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedCategory(doc.id)}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 
                ${
                  selectedCategory === doc.id
                    ? "border-blue-500 bg-white shadow-lg"
                    : "border-transparent bg-white shadow-sm hover:shadow-md"
                }`}
            >
              <div
                className={`w-12 h-12 ${doc.color} rounded-xl flex items-center justify-center text-2xl mb-4`}
              >
                {doc.icon}
              </div>
              <h3 className="font-bold text-lg">{doc.title}</h3>
              <p className="text-sm text-slate-50">
                {doc.images.length} Files Attached
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: The Big Preview */}
        {selectedCategory ? (
          <div className="lg:w-2/3 bg-white rounded-3xl shadow-xl p-8 border border-slate-100 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">{activeDoc.title}</h2>
                <p className="text-blue-600 italic mt-1">"{activeDoc.msg}"</p>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeDoc.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl border border-slate-200"
                >
                  <img
                    src={img}
                    alt={`${activeDoc.title} ${idx}`}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-sm font-medium">
                      View Full Size
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex lg:w-2/3 items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl">
            <p className="text-slate-400">
              Select a category to view documents
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPrivateDocument;
