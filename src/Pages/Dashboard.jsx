import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginHeader from "../Components/LoginHeader";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const navItems = [
    "CHECK RC",
    "Returns",
    "Change Password",
    "Reports",
    "Refunds",
    "E-Payment",
  ];

  const handleHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    // Clear stored data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top header */}
      <LoginHeader />

      {/* Navigation bar */}
      <nav className="w-full bg-[#085A3A] text-white text-sm font-medium">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-4 py-2">
          {/* Left side: menu items */}
          <ul className="flex flex-wrap gap-6">
            <li className="cursor-pointer hover:underline underline-offset-4">CHECK RC</li>
            <li>
              <Link to="/returns" className="cursor-pointer hover:underline underline-offset-4">
                Returns
              </Link>
            </li>
            <li className="cursor-pointer hover:underline underline-offset-4">Change Password</li>
            <li className="cursor-pointer hover:underline underline-offset-4">Reports</li>
            <li className="cursor-pointer hover:underline underline-offset-4">Refunds</li>
            <li>
              <Link to="/epayment" className="cursor-pointer hover:underline underline-offset-4">
                E-Payment
              </Link>
            </li>
          </ul>

          {/* Right side: Home + Logout */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleHome}
              className="flex items-center gap-1 bg-[#0D784D] hover:bg-[#09623E] text-white px-3 py-1.5 rounded-md text-sm"
            >
              <span>🏠</span> Home
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 bg-[#0D784D] hover:bg-[#09623E] text-white px-3 py-1.5 rounded-md text-sm"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Body content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center text-gray-600">
        <h2 className="text-xl font-semibold mt-10 text-[#0D784D]">
          Welcome to the Commercial Taxes Department Portal
        </h2>
        <p className="text-sm mt-2">
          Select an option from the menu to continue.
        </p>
      </main>

      {/* Footer */}
      <footer className="text-center bg-black text-white text-xs py-2 mt-auto">
        Disclaimer :: Copyright © 2025 Government of Telangana. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
