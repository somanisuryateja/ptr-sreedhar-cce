import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginHeader from "../Components/LoginHeader";
import GreenNavBar from "../Components/GreenNavBar";
import API_BASE_URL from "../utils/api";

const EPayment = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    taxType: "",
    tin: "",
    firm: "",
    registrationType: "Enrolment",
    purpose: "",
    taxPeriodFrom: "",
    taxPeriodTo: "",
    amount: "",
    remarks: "",
    date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'), // DD-MM-YYYY format
  });

  // Generate tax period options (last 12 months)

  // Get user info from localStorage (saved during login)
  const getUserInfo = () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || 'null');
      return userData || {};
    } catch {
      return {};
    }
  };

  // Function to fetch dealer info by PTIN from backend
  const fetchDealerByPTIN = async (ptin) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dealer-by-ptin/${ptin}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const dealerData = await response.json();
        return dealerData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const taxTypes = [
    "Select",
    "VAT",
    "CST", 
    "TOT",
    "APGST",
    "Entertainment Tax",
    "Profession Tax",
    "Luxury Tax",
    "Entry Tax - Vehicles",
    "Entry Tax - Goods",
    "HRBT",
    "RDCESS",
  ];

  const purposes = [
    "One Time Settlement Scheme",
    "Return Tax",
    "Tax Demand raised on Audit/Assessment",
    "Interest Demand raised on Audit/Assessment",
    "Penalty Demand raised on Audit/Assessment",
    "Penalty",
    "Interest",
    "TDS of Profession Tax by Insurer for Agents",
    "Payment by Turf Club on behalf of Licensed Persons U/S 5A",
  ];

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    // Auto-fill firm name when PTIN is entered
    if (name === 'tin') {
      setForm({ ...form, [name]: value });
      
      // Fetch dealer info from backend if PTIN is entered
      if (value && value.length >= 11) { // Assuming PTIN is at least 11 characters
        const dealerInfo = await fetchDealerByPTIN(value);
        if (dealerInfo) {
          setForm(prev => ({ 
            ...prev, 
            firm: dealerInfo.name 
          }));
        } else {
          setForm(prev => ({ 
            ...prev, 
            firm: "" 
          }));
        }
      } else {
        setForm(prev => ({ 
          ...prev, 
          firm: "" 
        }));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Pre-fill form with logged-in user's information
  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo.ptin && userInfo.name) {
      setForm(prev => ({
        ...prev,
        tin: userInfo.ptin,
        firm: userInfo.name
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Get user info from localStorage
      const userInfo = getUserInfo();
      
      // Prepare payment data
      const paymentData = {
        ptin: form.tin || userInfo.ptin,
        name: form.firm || userInfo.name,
        taxType: form.taxType,
        purpose: form.purpose,
        taxPeriodFrom: form.taxPeriodFrom,
        taxPeriodTo: form.taxPeriodTo,
        amount: parseFloat(form.amount),
        remarks: form.remarks,
        date: form.date
      };
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login again');
        navigate('/login');
        return;
      }
      
      // Send payment data to backend
      const response = await fetch(`${API_BASE_URL}/api/submit-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Navigate to confirmation screen
        navigate('/epayment-confirmation', { 
          state: { 
            paymentData: paymentData,
            paymentId: result.paymentId,
            ctdTransactionId: result.ctdTransactionId, // Include CTD Transaction ID
            submittedAt: result.submittedAt
          } 
        });
      } else {
        const error = await response.json();
        alert(`Payment failed: ${error.message}`);
      }
      
    } catch (error) {
      alert('Payment failed. Please try again.');
    }
  };

  const handleReset = () =>
    setForm({
      taxType: "",
      tin: "",
      firm: "",
      registrationType: "Enrolment",
      purpose: "",
      taxPeriodFrom: "",
      taxPeriodTo: "",
      amount: "",
      remarks: "",
      date: new Date().toLocaleDateString('en-GB').replace(/\//g, '-'), // DD-MM-YYYY format
    });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LoginHeader />

      {/* Green navigation */}
      <GreenNavBar 
        menuItems={[
          { label: "CHECK RC", href: null },
          { label: "Returns", href: "/returns" },
          { label: "Change Password", href: null },
          { label: "Reports", href: null },
          { label: "Refunds", href: null },
          { label: "E-Payment", href: null, active: true }
        ]}
        rightButtons={[
          { label: "Home", href: "/dashboard", className: "bg-[#0D784D] hover:bg-[#09623E] px-3 py-1.5 rounded-md" },
          { label: "Logout", onClick: () => {
            localStorage.clear();
            navigate("/login");
          }, className: "bg-[#0D784D] hover:bg-[#09623E] px-3 py-1.5 rounded-md" }
        ]}
      />

      {/* Body */}
      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <h2 className="text-xl font-semibold text-[#197749] mb-6">
          Telangana Commercial Taxes e-Payment
        </h2>

        <form
          onSubmit={handleSubmit}
          className="border border-gray-300 shadow-md rounded-md w-full max-w-2xl text-sm"
        >
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium w-1/3">
                  Select Type of Tax <span className="text-red-600">*</span>
                </td>
                <td className="border border-gray-300 px-3 py-2">
                   <select
                     name="taxType"
                     value={form.taxType}
                     onChange={handleChange}
                     required
                     className="border border-gray-300 rounded px-2 py-1 w-full"
                   >
                     {taxTypes.map((t) => (
                       <option 
                         key={t} 
                         value={t}
                         disabled={t !== "Select" && t !== "Profession Tax"}
                         style={{ 
                           color: t !== "Select" && t !== "Profession Tax" ? '#999' : 'inherit',
                           backgroundColor: t !== "Select" && t !== "Profession Tax" ? '#f5f5f5' : 'inherit'
                         }}
                       >
                         {t}
                       </option>
                     ))}
                   </select>
                </td>
              </tr>

              <tr>
                <td
                  colSpan={2}
                  className="text-center text-red-600 font-bold py-3 border border-gray-300 text-base"
                >
                  YOU ARE PAYING TAX UNDER PROFESSION TAX ACT
                </td>
              </tr>

               <tr>
                 <td className="border border-gray-300 px-3 py-2">
                   TIN/GRN <span className="text-red-600">*</span>
                 </td>
                 <td className="border border-gray-300 px-3 py-2">
                   <input
                     type="text"
                     name="tin"
                     value={form.tin}
                     onChange={handleChange}
                     placeholder="Enter PTIN"
                     required
                     onKeyPress={(e) => {
                       // Only allow numbers
                       if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                         e.preventDefault();
                       }
                     }}
                     className="border border-gray-300 rounded px-2 py-1 w-full"
                   />
                 </td>
               </tr>

               <tr>
                 <td className="border border-gray-300 px-3 py-2">
                   Name of the Firm <span className="text-red-600">*</span>
                 </td>
                 <td className="border border-gray-300 px-3 py-2">
                   <input
                     type="text"
                     name="firm"
                     value={form.firm}
                     readOnly
                     className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                     placeholder="Auto-filled when PTIN is entered"
                   />
                 </td>
               </tr>

              <tr>
                <td className="border border-gray-300 px-3 py-2">
                  PT Registration Type
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    value={form.registrationType}
                    readOnly
                    className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                  />
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-3 py-2">
                  Select Purpose <span className="text-red-600">*</span>
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <select
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  >
                    <option value="">Select</option>
                    {purposes.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </td>
              </tr>

               <tr>
                 <td className="border border-gray-300 px-3 py-2">
                   Tax Period From – To <span className="text-red-600">*</span>
                 </td>
                 <td className="border border-gray-300 px-3 py-2">
                   <div className="flex items-center gap-2">
                     <input
                       type="date"
                       name="taxPeriodFrom"
                       value={form.taxPeriodFrom}
                       onChange={handleChange}
                       required
                       className="border border-gray-300 rounded px-2 py-1 flex-1"
                     />
                     <span className="text-gray-500">to</span>
                     <input
                       type="date"
                       name="taxPeriodTo"
                       value={form.taxPeriodTo}
                       onChange={handleChange}
                       required
                       className="border border-gray-300 rounded px-2 py-1 flex-1"
                     />
                   </div>
                   <div className="text-xs text-gray-500 mt-1">(DD-MM-yyyy)</div>
                 </td>
               </tr>

               <tr>
                 <td className="border border-gray-300 px-3 py-2">
                   Enter Amount (in Rupees) <span className="text-red-600">*</span>
                 </td>
                 <td className="border border-gray-300 px-3 py-2">
                   <input
                     type="text"
                     name="amount"
                     value={form.amount}
                     onChange={handleChange}
                     required
                     placeholder="0"
                     onKeyPress={(e) => {
                       // Only allow numbers
                       if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                         e.preventDefault();
                       }
                     }}
                     className="border border-gray-300 rounded px-2 py-1 w-full"
                   />
                 </td>
               </tr>

              <tr>
                <td className="border border-gray-300 px-3 py-2">
                  Remarks / Comments
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <textarea
                    name="remarks"
                    value={form.remarks}
                    onChange={handleChange}
                    rows="2"
                    className="border border-gray-300 rounded px-2 py-1 w-full resize-none"
                  />
                </td>
              </tr>

               <tr>
                 <td className="border border-gray-300 px-3 py-2">
                   Date <span className="text-red-600">*</span>
                 </td>
                 <td className="border border-gray-300 px-3 py-2">
                   <input
                     type="text"
                     name="date"
                     value={form.date}
                     readOnly
                     className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                   />
                 </td>
               </tr>
            </tbody>
          </table>

          {/* Buttons */}
          <div className="flex justify-center gap-4 py-4">
            <button
              type="submit"
              className="bg-[#0D784D] hover:bg-[#09623E] text-white px-6 py-1.5 rounded text-sm"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-1.5 rounded text-sm"
            >
              Reset
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-600 mt-6 max-w-2xl text-center">
          e-Payment is enabled with Andhra Bank, Axis Bank, Bank of Baroda,
          Bank of India, City Union Bank (CUB), Corporation Bank, HDFC Bank,
          ICICI Bank, Indian Overseas Bank, Kotak Mahindra Bank, SBI, Union Bank of India, Punjab National Bank, Vijaya Bank, IDBI Bank and others.
        </p>
      </main>

      <footer className="text-center bg-black text-white text-xs py-2 mt-auto">
        Disclaimer :: Copyright © 2025 Government of Telangana. All rights reserved.
      </footer>
    </div>
  );
};

export default EPayment;
