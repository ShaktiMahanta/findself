import "./index.css"; // or the path to your CSS file
import { useState } from "react";

function App() {
  const [yourName, setYourName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = () => {
    if (!yourName || !crushName) {
      setResult("Please enter both names 💬");
    } else {
      const score = Math.floor(Math.random() * 100);
      setResult(`💘 Compatibility Score: ${score}%`);
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
            CRUSH NAME
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
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          Check
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

export default App;
