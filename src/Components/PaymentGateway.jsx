import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API_BASE_URL from "../utils/api";

const PaymentGateway = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentData, selectedBank, challanNo, ddocode, hoa } = location.state || {};
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bankDetails, setBankDetails] = useState(null);

  // Fetch bank details from backend (Annexure 2)
  useEffect(() => {
    const fetchBankDetails = async () => {
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
          // Find the selected bank details
          const selectedBankDetails = bankData.find(bank => bank.bank === selectedBank);
          setBankDetails(selectedBankDetails);
        }
      } catch (error) {
        // Handle error silently in production
      }
    };

    if (selectedBank) {
      fetchBankDetails();
    }
  }, [selectedBank]);

  // Bank logos mapping (only for banks in Annexure 2)
  const bankLogos = {
    "State Bank of India": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/512px-SBI-logo.svg.png",
    "HDFC Bank": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/HDFC_Bank_Logo.svg/512px-HDFC_Bank_Logo.svg.png",
    "ICICI Bank": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/ICICI_Bank_logo.svg/512px-ICICI_Bank_logo.svg.png",
    "Axis Bank": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/512px-Axis_Bank_logo.svg.png",
    "Kotak Mahindra Bank": "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Kotak_Mahindra_Bank_logo.svg/512px-Kotak_Mahindra_Bank_logo.svg.png",
    "Bank of Baroda": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bank_of_Baroda_logo.svg/512px-Bank_of_Baroda_logo.svg.png",
    "Punjab National Bank": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Punjab_National_Bank_logo.svg/512px-Punjab_National_Bank_logo.svg.png"
  };

  // Bank colors mapping (only for banks in Annexure 2)
  const bankColors = {
    "State Bank of India": "#1F4E79",
    "HDFC Bank": "#FF6600",
    "ICICI Bank": "#F47735",
    "Axis Bank": "#D71E2B",
    "Kotak Mahindra Bank": "#C00000",
    "Bank of Baroda": "#FFD700",
    "Punjab National Bank": "#FF6B35"
  };

  const handleBankLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/validate-bank-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          bankName: selectedBank,
          username: username,
          password: password,
          paymentData: paymentData,
          challanNo: challanNo,
          ddocode: ddocode,
          hoa: hoa
        })
      });

      const result = await response.json();

      if (response.ok && result.valid) {
        // Bank authentication successful
        navigate("/bank-transaction-success", { 
          state: { 
            paymentData: paymentData,
            bankDetails: result.bankDetails,
            transactionDetails: {
              challanNo: challanNo,
              ddocode: ddocode,
              hoa: hoa,
              bankRef: result.bankRef,
              timestamp: new Date().toLocaleString()
            }
          } 
        });
      } else {
        // Bank authentication failed - navigate to payment fail page
        navigate("/payment-fail", {
          state: {
            error: result.message || "Invalid banking credentials. Please check your username and password.",
            paymentData: paymentData,
            selectedBank: selectedBank
          }
        });
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getBankLogo = () => {
    return bankLogos[selectedBank] || bankLogos["Kotak Mahindra Bank"];
  };

  const getBankColor = () => {
    return bankColors[selectedBank] || "#C00000";
  };

  // Show error if bank is not found in Annexure 2
  if (!bankDetails && selectedBank) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-xl font-bold text-red-800 mb-2">
            Bank Not Available
          </h1>
          <p className="text-red-600 mb-4">
            The selected bank "{selectedBank}" is not available in our system.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Bank-specific header */}
      <header 
        className="text-white flex justify-between items-center px-6 py-3"
        style={{ backgroundColor: getBankColor() }}
      >
        <div className="flex items-center gap-2">
          <img
            src={getBankLogo()}
            alt={`${selectedBank} Logo`}
            className="h-8"
          />
          <h1 className="font-semibold text-lg">Secure Payment Gateway</h1>
        </div>
        <p className="font-medium">{selectedBank}</p>
      </header>

      {/* Payment Details */}
      <div className="max-w-2xl mx-auto mt-10 border border-gray-300 rounded-md shadow-sm">
        <div className="bg-blue-50 border-b border-gray-300 p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Payment Details</h2>
          <div className="text-2xl font-bold text-green-600">
            Amount: ₹{paymentData?.amount || "15000"}
          </div>
        </div>

        {/* Bank Login Form */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            {selectedBank} - Secure Login
          </h3>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleBankLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username/Account Number
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username or account number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-2 rounded text-white font-medium ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: getBankColor() }}
              >
                {loading ? 'Processing...' : 'Pay Securely'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>🔒 Your payment is secured with SSL encryption</p>
            <p>This is a secure payment gateway powered by {selectedBank}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;