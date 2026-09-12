import "../index.css";
import { useState } from "react";

function Findself() {
  const [yourName, setYourName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!yourName.trim() || !crushName.trim()) {
      setResult("Please enter both names 💬");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://localhost:8081/api/findSelf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXRhc2hhbWFoYW50YThAZ21haWwuY29tIiwiaWF0IjoxNzg5MTM1ODU4LCJleHAiOjE3ODkxMzcyOTh9.mWOExq-8I2HDC9QsyQm2Nz8q1L70Q85o-Y82U9t9e20"}`, // Include the token here
          // Authorization:
          //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW10YUBnbWFpbC5jb20iLCJpYXQiOjE3NTk1ODk2OTUsImV4cCI6MTc1OTU5MTEzNX0.ocuAhxXY3DZXEXo9rNSYUe-80FdgyZ-XgDRJSRmmPQA", // Replace STATIC_TOKEN_HERE with your static token
        },
        body: JSON.stringify({ yourName, crushName }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // const score =
      //   typeof data.score === "number"
      //     ? data.score
      //     : Math.floor(Math.random() * 100);
      setResult(
        `💘 Your Relationship with your crush is : ${data.relationship}`
      );
    } catch (error) {
      console.error("Compatibility check failed:", error);
      setResult("🚫 Something went wrong. Please try again later.");
      //setResult(`🚫 Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md text-center border-4 border-dashed border-gray-300">
        <h1 className="text-2xl font-bold mb-6 text-green-600">
          Crush Checker 💌
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
            className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Crush Name
          </label>
          <input
            type="text"
            value={crushName}
            onChange={(e) => setCrushName(e.target.value)}
            className="w-full px-4 py-2 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Enter crush's name"
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={loading}
          className={`bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {loading ? "Checking..." : "Check"}
        </button>

        {result && (
          <div className="mt-6 text-lg font-medium text-purple-600">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default Findself;
