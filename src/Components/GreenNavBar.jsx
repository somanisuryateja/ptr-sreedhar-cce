import React from "react";
import { Link } from "react-router-dom";

const GreenNavBar = ({ 
  menuItems = [], 
  rightButtons = [], 
  bgColor = "bg-[#085A3A]",
  textSize = "text-sm",
  layout = "default" // "default" or "simple"
}) => {
  const defaultMenuItems = [
    { label: "CHECK RC", href: null },
    { label: "Returns", href: "/returns" },
    { label: "Change Password", href: null },
    { label: "Reports", href: null },
    { label: "Refunds", href: null },
    { label: "E-Payment", href: "/epayment" }
  ];

  const defaultRightButtons = [
    { label: "Home", href: "/dashboard", className: "bg-[#0D784D] hover:bg-[#09623E] px-3 py-1.5 rounded-md" },
    { label: "Logout", onClick: true, className: "bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-md" }
  ];

  const menuItemsToUse = menuItems.length > 0 ? menuItems : defaultMenuItems;
  const rightButtonsToUse = rightButtons.length > 0 ? rightButtons : defaultRightButtons;

  if (layout === "simple") {
    // Simple layout for Home page (no right buttons, different styling)
    return (
      <nav className={`w-full ${bgColor} text-white ${textSize}`}>
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 py-2">
            {menuItemsToUse.map((item, index) => (
              <li key={index} className="hover:underline underline-offset-4">
                {item.badge ? (
                  <span className="ml-2 rounded-full bg-[#FF5E66] text-white px-2 py-[2px] text-[11px]">
                    {item.label}
                  </span>
                ) : (
                  <button>{item.label}</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`w-full ${bgColor} text-white ${textSize} font-medium`}>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-4 py-2">
        {/* Left side: menu items */}
        <ul className="flex flex-wrap gap-6">
          {menuItemsToUse.map((item, index) => (
            <li key={index}>
              {item.href ? (
                <Link 
                  to={item.href} 
                  className="cursor-pointer hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="cursor-pointer hover:underline underline-offset-4">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Right side: buttons */}
        <div className="flex items-center gap-3">
          {rightButtonsToUse.map((button, index) => (
            <div key={index}>
              {button.href ? (
                <Link
                  to={button.href}
                  className={button.className || "bg-[#0D784D] hover:bg-[#09623E] px-3 py-1.5 rounded-md"}
                >
                  {button.label}
                </Link>
              ) : button.onClick ? (
                <button
                  onClick={button.onClick}
                  className={button.className || "bg-[#0D784D] hover:bg-[#09623E] px-3 py-1.5 rounded-md"}
                >
                  {button.label}
                </button>
              ) : (
                <span className={button.className || ""}>
                  {button.label}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default GreenNavBar;
