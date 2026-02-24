import React, { useState } from "react";

const AccessDocument = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const correctPassword = "mysecurepassword"; // Change this

  const handleAccess = (e) => {
    e.preventDefault();

    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setIsAuthenticated(false);
    }
  };

  const handleLimitedAccess = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email to access limited documents.");
    } else {
      alert(`Access link sent to ${email}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {!isAuthenticated ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Private Documents Access
            </h2>

            <p className="text-gray-600 text-sm mb-6 text-center">
              These documents are private and only accessible upon request.
              Please enter the password provided to you.
            </p>

            <form onSubmit={handleAccess} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Unlock Documents
              </button>
            </form>

            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-600 mb-3 text-center">
                To view limited documents, enter your email:
              </p>

              <form onSubmit={handleLimitedAccess} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Request Limited Access
                </button>
              </form>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
              Access Granted
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                📄 Private Document 1 (Confidential Proposal)
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                📄 Private Document 2 (Project Architecture)
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                📄 Private Document 3 (Case Study)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessDocument;