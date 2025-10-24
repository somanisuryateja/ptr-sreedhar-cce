import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import GreenNavBar from "../Components/GreenNavBar";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  FaHome,
  FaEnvelope,
  FaUser,
  FaArrowRight,
  FaTruck,
  FaBuilding,
  FaFlask,
  FaDollarSign,
  FaCoins,
  FaUserPlus,
  FaUsers,
  FaCalculator,
  FaWrench,
  FaChartBar,
  FaStar,
  FaDesktop,
  FaPlus,
  FaBell,
  FaRupeeSign,
  FaBriefcase,
  FaArrowCircleRight,
} from "react-icons/fa";
import "../index.css";

/* -------------------------- Small UI helpers -------------------------- */
const SectionCard = ({ title, bg = "bg-white", children, className = "" }) => (
  <div
    className={`rounded-lg shadow-sm border border-gray-200 ${bg} ${className}`}
  >
    {title && (
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-red-600">
        <div className="flex items-center ">
          <div className="w-6 h-6  rounded flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-megaphone-icon lucide-megaphone"
            >
              <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
              <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
              <path d="M8 6v8" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
        </div>
        <button className="text-base font-normal text-white  underline">
          View More
        </button>
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

const PillLink = ({ children }) => (
  <button className="w-full text-left text-[13px] py-2 px-3 rounded-md hover:bg-slate-50 flex items-center gap-2">
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-600" />
    <span className="text-slate-700">{children}</span>
  </button>
);

const ColoredTile = ({
  title,
  subtitle,
  icon,
  className = "",
  gradient = "",
  watermark = "",
}) => (
  <div
    className={`rounded-lg p-4 text-white shadow-sm relative overflow-hidden cursor-pointer hover:opacity-95 transition ${className} ${gradient}`}
  >
    {watermark && (
      <div className="absolute right-3 top-3 opacity-20 text-6xl font-bold">
        {watermark}
      </div>
    )}
    <div className="flex items-center justify-between">
      <h4 className="text-[15px] font-semibold leading-tight">{title}</h4>
      <FaArrowCircleRight className="text-white opacity-80" size={16} />
    </div>
    {subtitle && <p className="text-xs mt-1 opacity-90">{subtitle}</p>}
  </div>
);

const ArrowItem = ({ children }) => (
  <li className="flex items-start gap-2 py-1.5">
    <svg width="16" height="16" viewBox="0 0 24 24" className="mt-0.5">
      <path d="M8 5l8 7-8 7" fill="none" stroke="#0ea5e9" strokeWidth="2" />
    </svg>
    <span className="text-[13px] text-slate-700">{children}</span>
  </li>
);

/* -------------------------- Slideshow Component -------------------------- */
const ImageSlideshow = () => {
  const images = [
    {
      src: "https://www.tgct.gov.in/tgportal/images/GST-1.jpg",
      alt: "Charminar at night",
    },
    {
      src: "https://www.tgct.gov.in/tgportal/images/vat.jpg",
      alt: "Charminar at night",
    },
    {
      src: "https://www.tgct.gov.in/tgportal/images/TG%20bg.jpg",
      alt: "Modern building architecture",
    },

    {
      src: "https://www.tgct.gov.in/tgportal/images/charminar.jpg",
      alt: "Modern building architecture",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg border border-gray-200 bg-slate-100 group">
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="w-full h-full object-cover transition-opacity duration-500"
      />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2  bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Previous image"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2  bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Next image"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

/* ------------------------------ Page ------------------------------ */
const Home = () => {
  const navigate = useNavigate();

  // Accordion data with icons
  const accordionData = [
    {
      title: "Alcoholic Liquor & Petroleum Products",
      icon: FaFlask,
      hasPlus: true,
      links: [
        { text: "Generate WayBill", url: "./DlrServices/DLR_LoginGST.aspx" },
        { text: "WayBill Registration", url: "./DlrServices/Waybill_otp.aspx" },
        {
          text: "WayBill Registration Login",
          url: "./DlrServices/Waybill_reg_Login.aspx",
        },
        {
          text: "WayBill verification (For Officers)",
          url: "./DlrServices/WaybillLogin.aspx",
        },
      ],
    },
    {
      title: "GST info for Dealer",
      icon: FaDollarSign,
      hasPlus: true,
      links: [
        { text: "GST Tax payer login", url: "https://www.gst.gov.in/" },
        { text: "Check GST Jurisdiction", url: "./checkgstjurist.aspx" },
        { text: "Procedure for Advance Ruling", url: "Advance_Ruling.aspx" },
        {
          text: "Application for Advance Rulings",
          url: "AdvanceRuling/AdvanceRuleDtls.aspx",
        },
        {
          text: "Welcome Letter",
          url: "https://www.tgct.gov.in/tgportal/Docs/TG%20welcome%20letter%20proceedings.pdf",
        },
      ],
    },
    {
      title: "TDS",
      icon: FaCoins,
      hasPlus: true,
      links: [{ text: "TDS information", url: "./gstinfo.aspx?tds=1" }],
    },
    {
      title: "New Dealer",
      icon: FaUserPlus,
      hasPlus: true,
      links: [
        {
          text: "PT Registration",
          url: "https://tgct.gov.in/tgpt_dealer/Registration/Email_Login.aspx",
        },
        {
          text: "VAT Registration (For Liquor and Petrol)",
          url: "./DlrServices/DlrEMail_Login.aspx",
        },
        {
          text: "Track registration Status",
          url: "DlrServices/RNRStatus.aspx",
        },
      ],
    },
    {
      title: "Existing Dealer",
      icon: FaUsers,
      hasPlus: true,
      links: [
        {
          text: "VAT/CST/TOT Dealer Login",
          url: "./DlrServices/Dlr_Login.aspx",
        },
        {
          text: "P-Tax Login",
          url: "https://tgct.gov.in/tgpt_dealer/Returns/dealer_login.aspx",
        },
        {
          text: "E-Tax Login",
          url: "https://tgct.gov.in/tget/dlrservices/dlr_login.aspx",
        },
        {
          text: "L-Tax Login",
          url: "./luxurytax/returns/lt_return_Index.aspx",
        },
        {
          text: "e-Payment (All Acts)",
          url: "DLRServices/Payments/e-PaymentGen.aspx",
        },
        {
          text: "e-Receipt (All Acts)",
          url: "DLRServices/Payments/eReceipt.aspx",
        },
        { text: "Help for Manual Payment", url: "Help_ManualPayment.aspx" },
        { text: "e-Checkpost", url: "DlrServices/Index_GIS.aspx" },
        { text: "VAT Form 501, 501 A, 501 B", url: "DlrForms/Form_501.aspx" },
      ],
    },
    {
      title: "Audit Manual Parameters",
      icon: FaCalculator,
      hasPlus: true,
      links: [
        {
          text: "Circular on Risk Parameters",
          url: "auditriskdata/APVAT1804-05-2016.doc",
        },
        {
          text: "Potential Cases for General Audit:16-17",
          url: "audit_risk_info.aspx",
        },
        {
          text: "Goods and Service Tax Audit Manual 2019",
          url: "Docs/00 GST-Audit-Manual-2019.pdf",
        },
        {
          text: "All India GST Audit Manual 2023",
          url: "Docs/MODEL-ALL-INDIA-GST-AUDIT-MANUAL-FINAL.pdf",
        },
      ],
    },
    {
      title: "Statutory Forms",
      icon: FaWrench,
      hasPlus: true,
      links: [
        { text: "Cost of Forms/Services", url: "Cost.aspx" },
        {
          text: "Un Utilised Forms details",
          url: "Search/Dlr_Blankforms.aspx",
        },
        {
          text: "Eligibility for Statutory Forms",
          url: "DLRServices/Dlr_Check_info.aspx",
        },
      ],
    },
    {
      title: "Sales Tax Practitioners",
      icon: FaChartBar,
      hasPlus: true,
      links: [
        { text: "STP Login", url: "DlrServices/Stp_Login.aspx" },
        { text: "STP Registration", url: "others/stpbycct1007.doc" },
        { text: "Issue of ID Cards to STPs", url: "others/STP_IDCards.doc" },
      ],
    },
    {
      title: "Advance Ruling (Online Application)",
      icon: FaStar,
      hasPlus: false,
      links: [
        {
          text: "Advance Ruling (Online Application)",
          url: "https://www.tgct.gov.in/tgportal/DLRServices/Payments/FormVat570.aspx",
        },
      ],
    },
    {
      title: "Old CTD Portal",
      icon: FaDesktop,
      hasPlus: false,
      links: [{ text: "Old CTD Portal", url: "/portal/home.html" }],
    },
  ];

  const [open, setOpen] = useState({
    "Alcoholic Liquor & Petroleum Products": true,
    "GST info for Dealer": false,
    TDS: false,
    "New Dealer": false,
    "Existing Dealer": false,
    "Audit Manual Parameters": false,
    "Statutory Forms": false,
    "Sales Tax Practitioners": false,
    "Advance Ruling (Online Application)": false,
    "Old CTD Portal": false,
  });

  return (
    <div className="min-h-screen bg-[#EEF3F7]">
      <Header />

      {/* top dark green nav strip */}
      <GreenNavBar
        bgColor="bg-[#0B8365]"
        textSize="text-[13px]"
        layout="simple"
        menuItems={[
          { label: "ABOUT US", href: null },
          { label: "ALL ACTS", href: null },
          { label: "TRIBUNAL", href: null },
          { label: "RTI", href: null },
          { label: "CITIZEN'S CHARTER", href: null },
          { label: "GST INFO", href: null },
          { label: "STAFF COLLEGE", href: null },
          { label: "CONTACT US", href: null },
          { label: "KNOW YOUR JURISDICTION", href: null },
          { label: "New", href: null, badge: true },
        ]}
        rightButtons={[]}
      />

      {/* page container */}

      <div className="w-full max-w-10/12   mx-auto px-4">
        {/* announcements + hero */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="md:col-span-2">
              {/* hero slideshow */}
              <ImageSlideshow />
            </div>

            <div className="flex flex-col justify-start space-y-4 h-full">
              <SectionCard title="Announcements">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 py-1.5">
                    <div className="flex-shrink-0">
                      <IoMdArrowDropdown
                        className="text-black transform rotate-270"
                        size={25}
                      />
                    </div>
                    <span className="text-[13px] text-blue-600 underline hover:text-blue-800 cursor-pointer flex-1">
                      Reorganization of jurisdictions for AJC's in Telangana
                      Notification
                    </span>
                    <div className="flex-shrink-0">
                      <span class="burst-horizontal">NEW</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-2 py-1.5">
                    <div className="flex-shrink-0">
                      <IoMdArrowDropdown
                        className="text-black transform rotate-270"
                        size={25}
                      />
                    </div>
                    <span className="text-[13px] text-blue-600 underline hover:text-blue-800 cursor-pointer flex-1">
                      GSTAT Vacancy Circular
                    </span>
                    <div className="flex-shrink-0">
                      <span class="burst-horizontal">NEW</span>
                    </div>
                  </li>
                </ul>
              </SectionCard>

              <SectionCard>
                <div className="flex flex-col gap-2">
                  {[
                    { text: "DEPARTMENT HOME", icon: FaHome },
                    { text: "DEPARTMENT EMAIL", icon: FaEnvelope },
                    { text: "GST TAX OFFICIAL LOGIN", icon: FaUser },
                    { text: "GST PRIME OFFICIAL LOGIN", icon: FaArrowRight },
                    { text: "E-WAYBILL OFFICER LOGIN", icon: FaTruck },
                    { text: "E-OFFICE", icon: FaBuilding },
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={index}
                        className="flex items-center gap-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] px-4 py-3 rounded-md transition-colors"
                      >
                        <IconComponent className="text-white" size={18} />
                        <span className="font-medium">{item.text}</span>
                      </button>
                    );
                  })}
                </div>
              </SectionCard>
            </div>
          </div>

          {/* lower grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 pt-0">
            {/* Left column: Accordion */}
            <div className="space-y-4">
              <SectionCard title="Online Dealer Service">
                {/* Dynamic accordion group */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  {accordionData.map((section, index) => {
                    const IconComponent = section.icon;
                    const isFirst = index === 0;
                    const isLast = index === accordionData.length - 1;

                    return (
                      <div
                        key={index}
                        className={`${
                          !isLast ? "border-b border-gray-200" : ""
                        }`}
                      >
                        <button
                          onClick={() =>
                            setOpen((s) => ({
                              ...s,
                              [section.title]: !s[section.title],
                            }))
                          }
                          className={`w-full flex items-center justify-between py-3 px-4 ${
                            isFirst
                              ? "bg-blue-50 border-l-4 border-blue-500"
                              : "bg-white hover:bg-gray-50"
                          } transition-colors`}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className="text-black" size={16} />
                            <span
                              className={`font-semibold text-[13px] ${
                                isFirst ? "text-blue-800" : "text-slate-800"
                              }`}
                            >
                              {section.title}
                            </span>
                          </div>
                          {section.hasPlus && (
                            <FaPlus className="text-black" size={12} />
                          )}
                        </button>
                        {open[section.title] && (
                          <div className="bg-gray-50 border-t border-gray-200">
                            {section.links.map((link, linkIndex) => {
                              // Check if this is the "P-Tax Login" link in "Existing Dealer" section
                              const isPTaxLogin =
                                section.title === "Existing Dealer" &&
                                link.text === "P-Tax Login";

                              return (
                                <button
                                  key={linkIndex}
                                  onClick={
                                    isPTaxLogin
                                      ? () => navigate("/login")
                                      : undefined
                                  }
                                  className={`w-full text-left text-[13px] py-2 px-6 flex items-center gap-2 ${
                                    isPTaxLogin
                                      ? "hover:bg-slate-100 cursor-pointer opacity-100"
                                      : "cursor-not-allowed opacity-60"
                                  }`}
                                  disabled={!isPTaxLogin}
                                  title={
                                    isPTaxLogin
                                      ? "Click to go to login page"
                                      : "Link disabled - This is a demo"
                                  }
                                >
                                  <IoMdArrowDropdown
                                    className="text-black transform rotate-270"
                                    size={25}
                                  />
                                  <span className="text-slate-700">
                                    {link.text}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </SectionCard>

              <SectionCard title="Other Links">
                <ul className="grid grid-cols-1 gap-1">
                  <ArrowItem>Dept of Revenue Govt of TS</ArrowItem>
                  <ArrowItem>Other States CTDs</ArrowItem>
                  <ArrowItem>EODB</ArrowItem>
                </ul>
              </SectionCard>
            </div>

            {/* Middle column: Colored tiles + Department Corner */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ColoredTile
                  title="GST Circulars"
                  className="bg-gradient-to-r from-red-600 to-purple-600"
                  watermark="C"
                />
                <ColoredTile
                  title="GST Tax Notifications"
                  className="bg-gradient-to-r from-blue-400 to-teal-500"
                  watermark="🔔"
                />
                <ColoredTile
                  title="GST Rate Notifications"
                  className="bg-gradient-to-r from-blue-700 to-purple-700"
                  watermark="₹"
                />
                <ColoredTile
                  title="Professional Tax"
                  className="bg-gradient-to-r from-teal-600 to-green-600"
                  watermark="₹"
                />
                <ColoredTile
                  title="GST Advance Ruling"
                  className="bg-gradient-to-r from-green-600 to-green-400"
                  watermark="👥"
                />
                <ColoredTile
                  title="Appellate Advance Ruling"
                  className="bg-gradient-to-r from-orange-500 to-yellow-600"
                  watermark="👤"
                />
                <ColoredTile
                  title="EODB"
                  className="bg-gradient-to-r from-green-700 to-green-400"
                  watermark="💼"
                />
              </div>

              <SectionCard title="Department Corner">
                <ul className="grid grid-cols-1 gap-1">
                  <ArrowItem>CTD Orders</ArrowItem>
                  <ArrowItem>View CTD Orders Prior to 02-06-2014</ArrowItem>
                  <ArrowItem>TINXSYS</ArrowItem>
                </ul>
              </SectionCard>
            </div>

            {/* Right column: VAT/CST/TOT + Verification + Help Desk */}
            <div className="space-y-4">
              <SectionCard title="VAT/CST/TOT">
                <ul>
                  <ArrowItem>Registration</ArrowItem>
                  <ArrowItem>
                    Advisory Visit / Post Registration Inspection
                  </ArrowItem>
                  <ArrowItem>Returns</ArrowItem>
                  <ArrowItem>Payments</ArrowItem>
                  <ArrowItem>Refunds</ArrowItem>
                </ul>
              </SectionCard>

              <SectionCard title="Verification">
                <ul>
                  <ArrowItem>Verify TIN (All Acts)</ArrowItem>
                  <ArrowItem>Search TIN (All Acts)</ArrowItem>
                  <ArrowItem>Verify Paper based Forms</ArrowItem>
                  <ArrowItem>Cancelled Dealers</ArrowItem>
                  <ArrowItem>Check your e-mail ID</ArrowItem>
                  <ArrowItem>Search by GSTIN/UIN</ArrowItem>
                  <ArrowItem>GST Status</ArrowItem>
                </ul>
              </SectionCard>

              <div className="rounded-lg border border-gray-200 bg-emerald-600 text-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      width="42"
                      height="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.3 1.78.54 2.64a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.44-.11a2 2 0 0 1 2.11.45c.86.24 1.74.42 2.64.54A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">
                      Dealer's Help Desk
                    </h4>
                    <p className="text-sm opacity-90">
                      Get assistance for dealer services and logins
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <footer className="text-center text-white text-sm mt-6 py-3 rounded-md bg-slate-800">
          Copyright © 2025 Government of Telangana. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
