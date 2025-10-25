import React from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../Components/LoginHeader";
import GreenNavBar from "../Components/GreenNavBar";

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
      <GreenNavBar 
        rightButtons={[
          { label: "🏠 Home", onClick: handleHome, className: "bg-[#0D784D] hover:bg-[#09623E] px-3 py-1.5 rounded-md text-sm" },
          { label: "🚪 Logout", onClick: handleLogout, className: "bg-[#0D784D] hover:bg-[#09623E] px-3 py-1.5 rounded-md text-sm" }
        ]}
      />

      {/* Body content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center text-gray-600">
        <h2 className="text-xl font-semibold mt-10 text-[#0D784D] font-['Inter']">
          Welcome to the Commercial Taxes Department Portal
        </h2>
        <p className="text-sm mt-2 font-['Inter']">
          Select an option from the menu to continue.
        </p>
      </main>

      {/* Footer */}
      <footer className="text-center bg-black text-white text-xs py-2 mt-auto font-['Inter']">
        Disclaimer :: Copyright © 2025 Government of Telangana. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
