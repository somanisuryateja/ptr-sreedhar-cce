import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../Components/LoginHeader";
import API_BASE_URL from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [ptin, setPtin] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef(null);

  // Generate random captcha
  const generateCaptcha = () => {
    const newCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptcha(newCaptcha);
  };

  // Clear authentication data on component mount (logout functionality)
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  // Draw captcha on canvas
  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (canvasRef.current && captcha) {
      const ctx = canvasRef.current.getContext("2d");
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, w, h);

      // Random text rotation
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate((Math.random() - 0.5) * 0.2);
      ctx.font = "italic bold 36px Georgia";
      ctx.fillStyle = "#1B7C14";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(captcha, 0, 5);
      ctx.restore();

      // Add noise lines
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(0,128,0,${Math.random()})`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * w, Math.random() * h);
        ctx.lineTo(Math.random() * w, Math.random() * h);
        ctx.stroke();
      }
    }
  }, [captcha]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate captcha first
    if (inputCaptcha !== captcha) {
      setError("❌ Invalid verification code!");
      generateCaptcha();
      setInputCaptcha("");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ptin, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        // Show the exact alert message as in the original system
        alert("Login Failed, Invalid User ID or Password");
        generateCaptcha();
        setInputCaptcha("");
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      generateCaptcha();
      setInputCaptcha("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <LoginHeader />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start py-10 px-4">
        <h2 className="text-[#197749] text-2xl font-semibold mb-6">
          Profession Tax
        </h2>

        <div className="bg-[#F8F9F8] border border-gray-300 rounded-md shadow-md w-full max-w-md p-6">
          <h3 className="text-[#197749] text-lg font-semibold mb-4">
            Dealer Login
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            {/* PTIN */}
            <div className="flex flex-col text-left">
              <label className="text-sm text-gray-700 font-medium mb-1">
                PTIN <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={ptin}
                onChange={(e) => setPtin(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col text-left">
              <label className="text-sm text-gray-700 font-medium mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            {/* Captcha */}
            <div className="flex flex-col text-left">
              <label className="text-sm text-gray-700 font-medium mb-1">
                Verification Code
              </label>
              <div className="flex items-center gap-2 mb-2">
                <canvas
                  ref={canvasRef}
                  width={120}
                  height={40}
                  className="border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-sm text-green-700 underline hover:text-green-800"
                >
                  ↻ Refresh
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter Verification Code Shown"
                value={inputCaptcha}
                onChange={(e) => setInputCaptcha(e.target.value)}
                className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-2 rounded-md text-sm ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#197749] hover:bg-[#15633D]'
              }`}
            >
              {loading ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-center mt-3 text-sm text-[#197749] gap-3 flex-wrap">
            <button className="hover:underline">RESET PASSWORD !!</button>
          </div>

          <div className="flex justify-center mt-1 text-sm text-[#197749] gap-2 flex-wrap">
            <button className="font-semibold hover:underline text-blue-800">
              FIRST TIME LOGIN
            </button>
            <span>|</span>
            <button className="hover:underline text-[#197749]">
              NEW USER SIGN UP HERE !
            </button>
          </div>

          <p className="text-red-600 text-[13px] font-semibold mt-4 leading-5 text-center">
            For any queries please mail us to{" "}
            <span className="uppercase">TG_CTDHELPDESK@TGCT.GOV.IN</span>
            <br />
            or call to <span className="text-red-700 font-bold">040-24600173</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center bg-black text-white text-xs py-2 mt-10">
        Disclaimer :: Copyright © 2025 Government of Telangana. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Login;
