import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

/* -------------------------- Small UI helpers -------------------------- */
const SectionCard = ({ title, bg = "bg-white", children, className = "" }) => (
  <div className={`rounded-lg shadow-sm border border-gray-200 ${bg} ${className}`}>
    {title && (
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold text-slate-800">{title}</h3>
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

const ColoredTile = ({ title, subtitle, icon, className = "" }) => (
  <div
    className={`rounded-lg p-4 text-white shadow-sm relative overflow-hidden cursor-pointer hover:opacity-95 transition ${className}`}
  >
    <div className="absolute right-3 top-3 opacity-30 text-4xl">{icon ?? "⬤"}</div>
    <h4 className="text-[15px] font-semibold leading-tight">{title}</h4>
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

/* ------------------------------ Page ------------------------------ */
const Home = () => {
  const navigate = useNavigate();
  
  // Accordion data
  const accordionData = [
    {
      "title": "Alcoholic Liquor & Petroleum Products",
      "links": [
        { "text": "Generate WayBill", "url": "./DlrServices/DLR_LoginGST.aspx" },
        { "text": "WayBill Registration", "url": "./DlrServices/Waybill_otp.aspx" },
        { "text": "WayBill Registration Login", "url": "./DlrServices/Waybill_reg_Login.aspx" },
        { "text": "WayBill verification (For Officers)", "url": "./DlrServices/WaybillLogin.aspx" }
      ]
    },
    {
      "title": "GST info for Dealer",
      "links": [
        { "text": "GST Tax payer login", "url": "https://www.gst.gov.in/" },
        { "text": "Check GST Jurisdiction", "url": "./checkgstjurist.aspx" },
        { "text": "Procedure for Advance Ruling", "url": "Advance_Ruling.aspx" },
        { "text": "Application for Advance Rulings", "url": "AdvanceRuling/AdvanceRuleDtls.aspx" },
        { "text": "Welcome Letter", "url": "https://www.tgct.gov.in/tgportal/Docs/TG%20welcome%20letter%20proceedings.pdf" }
      ]
    },
    {
      "title": "TDS",
      "links": [
        { "text": "TDS information", "url": "./gstinfo.aspx?tds=1" }
      ]
    },
    {
      "title": "New Dealer",
      "links": [
        { "text": "PT Registration", "url": "https://tgct.gov.in/tgpt_dealer/Registration/Email_Login.aspx" },
        { "text": "VAT Registration (For Liquor and Petrol)", "url": "./DlrServices/DlrEMail_Login.aspx" },
        { "text": "Track registration Status", "url": "DlrServices/RNRStatus.aspx" }
      ]
    },
    {
      "title": "Existing Dealer",
      "links": [
        { "text": "VAT/CST/TOT Dealer Login", "url": "./DlrServices/Dlr_Login.aspx" },
        { "text": "P-Tax Login", "url": "https://tgct.gov.in/tgpt_dealer/Returns/dealer_login.aspx" },
        { "text": "E-Tax Login", "url": "https://tgct.gov.in/tget/dlrservices/dlr_login.aspx" },
        { "text": "L-Tax Login", "url": "./luxurytax/returns/lt_return_Index.aspx" },
        { "text": "e-Payment (All Acts)", "url": "DLRServices/Payments/e-PaymentGen.aspx" },
        { "text": "e-Receipt (All Acts)", "url": "DLRServices/Payments/eReceipt.aspx" },
        { "text": "Help for Manual Payment", "url": "Help_ManualPayment.aspx" },
        { "text": "e-Checkpost", "url": "DlrServices/Index_GIS.aspx" },
        { "text": "VAT Form 501, 501 A, 501 B", "url": "DlrForms/Form_501.aspx" }
      ]
    },
    {
      "title": "Audit Manual Parameters",
      "links": [
        { "text": "Circular on Risk Parameters", "url": "auditriskdata/APVAT1804-05-2016.doc" },
        { "text": "Potential Cases for General Audit:16-17", "url": "audit_risk_info.aspx" },
        { "text": "Goods and Service Tax Audit Manual 2019", "url": "Docs/00 GST-Audit-Manual-2019.pdf" },
        { "text": "All India GST Audit Manual 2023", "url": "Docs/MODEL-ALL-INDIA-GST-AUDIT-MANUAL-FINAL.pdf" }
      ]
    },
    {
      "title": "Statutory Forms",
      "links": [
        { "text": "Cost of Forms/Services", "url": "Cost.aspx" },
        { "text": "Un Utilised Forms details", "url": "Search/Dlr_Blankforms.aspx" },
        { "text": "Eligibility for Statutory Forms", "url": "DLRServices/Dlr_Check_info.aspx" }
      ]
    },
    {
      "title": "Sales Tax Practitioners",
      "links": [
        { "text": "STP Login", "url": "DlrServices/Stp_Login.aspx" },
        { "text": "STP Registration", "url": "others/stpbycct1007.doc" },
        { "text": "Issue of ID Cards to STPs", "url": "others/STP_IDCards.doc" }
      ]
    },
    {
      "title": "Advance Ruling (Online Application)",
      "links": [
        { "text": "Advance Ruling (Online Application)", "url": "https://www.tgct.gov.in/tgportal/DLRServices/Payments/FormVat570.aspx" }
      ]
    },
    {
      "title": "Old CTD Portal",
      "links": [
        { "text": "Old CTD Portal", "url": "/portal/home.html" }
      ]
    }
  ];

  const [open, setOpen] = useState({
    "Alcoholic Liquor & Petroleum Products": true,
    "GST info for Dealer": false,
    "TDS": false,
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
      <nav className="w-full bg-[#0B8365] text-white text-[13px]">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 py-2">
            {[
              "ABOUT US",
              "ALL ACTS",
              "TRIBUNAL",
              "RTI",
              "CITIZEN'S CHARTER",
              "GST INFO",
              "STAFF COLLEGE",
              "CONTACT US",
              "KNOW YOUR JURISDICTION",
            ].map((item) => (
              <li key={item} className="hover:underline underline-offset-4">
                <button>{item}</button>
              </li>
            ))}
            <li>
              <span className="ml-2 rounded-full bg-[#FF5E66] text-white px-2 py-[2px] text-[11px]">
                New
              </span>
            </li>
          </ul>
        </div>
      </nav>

      {/* page container */}
      <div className="max-w-6xl mx-auto px-4">
        {/* announcements + hero */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="md:col-span-2">
              {/* hero image (replace src with your preferred banner) */}
              <div className="aspect-[16/7] w-full overflow-hidden rounded-lg border border-gray-200 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=1600&auto=format&fit=crop"
                  alt="Department Building"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-3">
              <SectionCard title="Announcements">
                <ul className="space-y-2">
                  <ArrowItem>SDP for multiple Orders.</ArrowItem>
                  <ArrowItem>
                    Tender call for Rate Contract for Supply of Computer Consumables, Media and Stationery items (CMS) to
                    CTO offices located across the State of Telangana.
                  </ArrowItem>
                </ul>
                <div className="pt-3">
                  <button className="text-xs font-semibold text-sky-700 hover:underline">
                    View More
                  </button>
                </div>
              </SectionCard>

              <SectionCard>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "DEPARTMENT HOME",
                    "DEPARTMENT EMAIL",
                    "GST TAX OFFICIAL LOGIN",
                    "GST PRIME OFFICIAL LOGIN",
                    "E-WAYBILL OFFICER LOGIN",
                    "E-OFFICE",
                  ].map((b) => (
                    <button
                      key={b}
                      className="text-left w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] px-3 py-2 rounded-md"
                    >
                      {b}
                    </button>
                  ))}
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
                <div className="divide-y divide-gray-200">
                  {accordionData.map((section, index) => (
                    <div key={index}>
                      <button
                        onClick={() => setOpen((s) => ({ ...s, [section.title]: !s[section.title] }))}
                        className="w-full flex items-center justify-between py-2.5"
                      >
                        <span className="font-semibold text-[13px] text-slate-800">
                          {section.title}
                        </span>
                        <span className="text-sky-600">{open[section.title] ? "−" : "+"}</span>
                      </button>
                      {open[section.title] && (
                        <div className="pl-1">
                          {section.links.map((link, linkIndex) => {
                            // Check if this is the "P-Tax Login" link in "Existing Dealer" section
                            const isPTaxLogin = section.title === "Existing Dealer" && link.text === "P-Tax Login";
                            
                            return (
                              <button
                                key={linkIndex}
                                onClick={isPTaxLogin ? () => navigate('/login') : undefined}
                                className={`w-full text-left text-[13px] py-2 px-3 rounded-md flex items-center gap-2 ${
                                  isPTaxLogin 
                                    ? 'hover:bg-slate-50 cursor-pointer opacity-100' 
                                    : 'cursor-not-allowed opacity-60'
                                }`}
                                disabled={!isPTaxLogin}
                                title={isPTaxLogin ? "Click to go to login page" : "Link disabled - This is a demo"}
                              >
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-600" />
                                <span className="text-slate-700">{link.text}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
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
                <ColoredTile title="GST Circulars" className="bg-rose-600" />
                <ColoredTile title="GST Tax Notifications" className="bg-slate-700" />
                <ColoredTile title="GST Rate Notifications" className="bg-sky-700" />
                <ColoredTile title="Professional Tax" className="bg-pink-600" />
                <ColoredTile title="GST Advance Ruling" className="bg-emerald-600" />
                <ColoredTile title="Appellate Advance Ruling" className="bg-amber-500" />
                <ColoredTile title="EODB" className="bg-lime-600" />
                <div className="sm:col-span-2">
                  <SectionCard title="Department Corner">
                    <ul className="grid grid-cols-1 gap-1">
                      <ArrowItem>DTD orders</ArrowItem>
                      <ArrowItem>GOVT ORDERS Prior to 02-06-2014</ArrowItem>
                      <ArrowItem>TINXSYS</ArrowItem>
                    </ul>
                  </SectionCard>
                </div>
              </div>
            </div>

            {/* Right column: VAT/CST/TOT + Verification + Help Desk */}
            <div className="space-y-4">
              <SectionCard title="VAT/CST/TOT">
                <ul>
                  <ArrowItem>Registration</ArrowItem>
                  <ArrowItem>Advisory Visit / Post Registration Inspection</ArrowItem>
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
                  <ArrowItem>Check your email ID</ArrowItem>
                  <ArrowItem>Search by GSTIN/UIN</ArrowItem>
                  <ArrowItem>GST Status</ArrowItem>
                </ul>
              </SectionCard>

              <div className="rounded-lg border border-gray-200 bg-emerald-600 text-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.3 1.78.54 2.64a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.44-.11a2 2 0 0 1 2.11.45c.86.24 1.74.42 2.64.54A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Dealer’s Help Desk</h4>
                    <p className="text-sm opacity-90">Get assistance for dealer services and logins</p>
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
