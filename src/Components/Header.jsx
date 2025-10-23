import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-[#F2F6F8] flex justify-between items-center px-6 py-3 border-b border-gray-200">
      {/* Left Section - Telangana Logos */}
      <div className="flex items-center space-x-4">
        <img
          src="https://tgct.gov.in/tgportal/images/raising%20telangana.png"
          alt="Telangana Rising"
          className="h-16 w-auto object-contain"
        />
        <img
          src="https://tgct.gov.in/tgportal/images/logo.png"
          alt="Government of Telangana Logo"
          className="h-16 w-auto object-contain"
        />
        <div className="ml-2">
          <h1 className="text-[#184A66] font-semibold text-xl tracking-wide">
            COMMERCIAL TAXES DEPARTMENT
          </h1>
          <p className="text-gray-700 text-sm font-medium">
            Government of Telangana
          </p>
        </div>
      </div>

      {/* Right Section - CM Photo */}
      <div className="flex flex-col items-center">
        <img
          src="https://tgct.gov.in/tgportal/images/CM-Sri-Anumula-Revanth-Reddy.jpg"
          alt="Sri Anumula Revanth Reddy"
          className="h-16 w-auto object-cover rounded"
        />
        <p className="text-[#184A66] text-sm font-semibold mt-1 text-center">
          SRI ANUMULA REVANTH REDDY
        </p>
        <p className="text-gray-700 text-xs font-medium -mt-1 text-center">
          Hon’ble Chief Minister
        </p>
      </div>
    </header>
  );
};

export default Header;
