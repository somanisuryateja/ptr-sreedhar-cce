import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IFMISHeader from "./IFMISHeader";
import API_BASE_URL from "../utils/api";

const IFMISPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentData, paymentId } = location.state || {};

  const [selectedBank, setSelectedBank] = useState("");
  const [banks, setBanks] = useState([]);
  const [generatedNumbers, setGeneratedNumbers] = useState({
    challanNo: "",
    ddocode: "",
    hoa: ""
  });

  // Generate random numbers according to Table 4
  useEffect(() => {
    // 1. Challan No: 10-digit random number
    const challanNo = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    
    // 2. DDOCODE: 11-digit random number
    const ddocode = Math.floor(10000000000 + Math.random() * 90000000000).toString();
    
    // 3. HOA: 19-digit random number + 3-digit random alphabets
    const hoaNumber = Math.floor(1000000000000000000 + Math.random() * 9000000000000000000).toString();
    const hoaLetters = Math.random().toString(36).substring(2, 5).toUpperCase();
    const hoa = hoaNumber + hoaLetters;

    setGeneratedNumbers({
      challanNo,
      ddocode,
      hoa
    });
  }, []);

  // Fetch banks from backend (Annexure 2)
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/bank-details`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const bankData = await response.json();
          const bankNames = bankData.map(bank => bank.bank);
          setBanks(bankNames);
          if (bankNames.length > 0) {
            setSelectedBank(bankNames[0]); // Set first bank as default
          }
        }
      } catch (error) {
        // Fallback banks if API fails
        setBanks(["State Bank of India", "Bank of Baroda", "Punjab National Bank", "Axis Bank"]);
        setSelectedBank("State Bank of India");
      }
    };

    fetchBanks();
  }, []);

  const handlePayNow = () => {
    // Navigate to payment gateway
    navigate('/payment-gateway', {
      state: {
        paymentData: paymentData,
        selectedBank: selectedBank,
        challanNo: generatedNumbers.challanNo,
        ddocode: generatedNumbers.ddocode,
        hoa: generatedNumbers.hoa
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#E9EEF2] flex flex-col">
      {/* ===== HEADER ===== */}
      <IFMISHeader />

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="bg-white shadow-md rounded-md w-full max-w-lg p-8">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
            e-Payments
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Make Payment Easy
          </p>

          {/* Details */}
          <table className="w-full text-sm border-collapse">
            <tbody>
               <tr>
                 <td className="py-2 px-3 font-medium text-gray-700 w-1/3">
                   Challan No
                 </td>
                 <td className="py-2 px-3 text-gray-900">
                   {generatedNumbers.challanNo || "6204422960"}
                 </td>
               </tr>
               <tr>
                 <td className="py-2 px-3 font-medium text-gray-700">DDOCODE</td>
                 <td className="py-2 px-3 text-gray-900">
                   {generatedNumbers.ddocode || "25002303035"}
                 </td>
               </tr>
               <tr>
                 <td className="py-2 px-3 font-medium text-gray-700">HOA</td>
                 <td className="py-2 px-3 text-gray-900">
                   {generatedNumbers.hoa || "0028001070001000000NVN"}
                 </td>
               </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-gray-700">
                  Remitter
                </td>
                <td className="py-2 px-3 text-gray-900">
                  {paymentData?.name || "BASEMENT BAZAR PRIVATE LIMITED"}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-gray-700">Amount</td>
                <td className="py-2 px-3 text-gray-900 font-semibold">
                  ₹{paymentData?.amount || "15000"}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Bank Dropdown */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please select the Bank to make Payment
            </label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0C2340]"
            >
              {banks.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Pay Now Button */}
          <div className="text-center mt-8">
            <button
              onClick={handlePayNow}
              className="bg-[#0C2340] hover:bg-[#071730] text-white px-8 py-2.5 text-base font-medium rounded transition"
            >
              Pay Now Securely
            </button>
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-100 py-4">
        <div className="flex justify-center items-center">
          <div className="flex items-center bg-green-100 border border-green-400 rounded-lg px-4 py-2 text-xs font-medium text-green-800">
            <span className="text-yellow-600 text-lg mr-2">🔒</span>
            SSL Secure Connection
            <span className="text-green-600 ml-2 font-bold">✓</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IFMISPayment;
