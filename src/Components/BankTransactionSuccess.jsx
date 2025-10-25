import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../utils/api";

const BankTransactionSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { paymentData, bankDetails, transactionDetails } = state || {};
  const [storedTransaction, setStoredTransaction] = useState(null);
  const [countdown, setCountdown] = useState(3000); // 50 minutes = 3000 seconds
  const [transactionRefs, setTransactionRefs] = useState({
    bankRef: null,
    crn: null,
    timestamp: null
  });

  // Function to mask account number - show only last 3 digits
  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber || accountNumber === "N/A") return "N/A";
    if (accountNumber.length <= 3) return accountNumber;
    
    const lastThree = accountNumber.slice(-3);
    const maskedPart = '•'.repeat(accountNumber.length - 3);
    return maskedPart + lastThree;
  };

  // Bank logos mapping
  const bankLogos = {
    "State Bank of India": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/512px-SBI-logo.svg.png",
    "HDFC Bank": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/HDFC_Bank_Logo.svg/512px-HDFC_Bank_Logo.svg.png",
    "ICICI Bank": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/ICICI_Bank_logo.svg/512px-ICICI_Bank_logo.svg.png",
    "Axis Bank": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/512px-Axis_Bank_logo.svg.png",
    "Kotak Mahindra Bank": "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Kotak_Mahindra_Bank_logo.svg/512px-Kotak_Mahindra_Bank_logo.svg.png",
    "Bank of Baroda": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bank_of_Baroda_logo.svg/512px-Bank_of_Baroda_logo.svg.png",
    "Punjab National Bank": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Punjab_National_Bank_logo.svg/512px-Punjab_National_Bank_logo.svg.png"
  };

  // Bank colors mapping
  const bankColors = {
    "State Bank of India": "#1F4E79",
    "HDFC Bank": "#FF6600",
    "ICICI Bank": "#F47735",
    "Axis Bank": "#D71E2B",
    "Kotak Mahindra Bank": "#C00000",
    "Bank of Baroda": "#FFD700",
    "Punjab National Bank": "#FF6B35"
  };

  // Initialize transaction references only once
  useEffect(() => {
    if (!transactionRefs.bankRef) {
      // Generate these values only once when component mounts
      const bankRef = transactionDetails?.bankRef || Math.floor(1000000000 + Math.random() * 9000000000).toString();
      const crn = storedTransaction?.crn || Math.floor(100000000000 + Math.random() * 900000000000).toString();
      const timestamp = transactionDetails?.timestamp || new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      
      setTransactionRefs({
        bankRef: bankRef,
        crn: crn,
        timestamp: timestamp
      });
    }
  }, [transactionDetails, storedTransaction]);

  // Store successful transaction in backend
  useEffect(() => {
    const storeTransaction = async () => {
      if (!paymentData || !bankDetails || !transactionDetails) {
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const transactionData = {
          ptin: paymentData.ptin,
          name: paymentData.name,
          taxType: paymentData.taxType,
          purpose: paymentData.purpose,
          taxPeriodFrom: paymentData.taxPeriodFrom,
          taxPeriodTo: paymentData.taxPeriodTo,
          amount: paymentData.amount,
          remarks: paymentData.remarks,
          date: paymentData.date,
          
          // Bank transaction details
          bankName: bankDetails.bankName,
          accountNumber: bankDetails.accountNumber,
          accountHolder: bankDetails.accountHolder,
          
          // Transaction references
          challanNo: transactionDetails.challanNo,
          ddocode: transactionDetails.ddocode,
          hoa: transactionDetails.hoa,
          bankRef: transactionDetails.bankRef,
          bankTimestamp: transactionDetails.timestamp,
          
          // Essential tracking fields
          etaxPaymentReference: transactionDetails?.ctdTransactionId || paymentData?.paymentId,
          paymentId: paymentData?.paymentId
        };

        const response = await fetch(`${API_BASE_URL}/api/store-transaction-success`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(transactionData)
        });

        if (response.ok) {
          const result = await response.json();
          setStoredTransaction(result);
        }
      } catch (error) {
        // Handle error silently in production
      }
    };

    storeTransaction();
  }, [paymentData, bankDetails, transactionDetails]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          // Auto-redirect to dashboard when countdown reaches 0
          navigate('/dashboard');
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [navigate]);

  // Get bank theme based on selected bank
  const getBankLogo = () => {
    return bankLogos[bankDetails?.bankName] || bankLogos["Kotak Mahindra Bank"];
  };

  const getBankColor = () => {
    return bankColors[bankDetails?.bankName] || "#C00000";
  };

  const getBankName = () => {
    return bankDetails?.bankName || "Kotak Mahindra Bank";
  };

  // Handle manual navigation to dashboard
  const handleCompleteTransaction = () => {
    navigate("/payment-success", { 
      state: { 
        paymentData: paymentData,
        bankDetails: bankDetails,
        transactionDetails: transactionDetails,
        storedTransaction: storedTransaction
      } 
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header 
        className="text-white flex justify-between items-center px-6 py-3"
        style={{ backgroundColor: getBankColor() }}
      >
        <div className="flex items-center gap-2">
          <img
            src={getBankLogo()}
            alt={getBankName()}
            className="h-8"
          />
          <h1 className="font-semibold text-lg">eTAX</h1>
        </div>
        <span className="text-sm font-medium">{getBankName()}</span>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center py-10">
        <div className="w-full max-w-3xl border border-gray-300 shadow-sm rounded-md overflow-hidden">
          {/* Green info banner */}
          <div className="bg-[#E8F9E8] border-b border-gray-300 text-[#066d0a] p-3 text-sm">
            <p>
              ✅ Please don't close or refresh the page. You will be auto-redirected to
              the portal in <b className="text-red-600 font-bold text-lg">{Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</b> (minutes:seconds) or click on "Complete transaction" to proceed.
            </p>
          </div>

          {/* Transaction Table */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Payment Details
            </h2>
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr>
                  <td className="w-1/3 font-medium py-1">Transaction Status</td>
                  <td className="text-green-700 font-semibold">Completed</td>
                </tr>
                <tr>
                  <td className="font-medium py-1">Bank Reference Number</td>
                  <td className="font-mono">{transactionRefs.bankRef || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-medium py-1">E-Tax Payment Reference</td>
                  <td className="font-mono">{transactionDetails?.ctdTransactionId || paymentData?.paymentId || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-medium py-1">Account Number</td>
                  <td className="font-mono tracking-wider">{maskAccountNumber(bankDetails?.accountNumber)}</td>
                </tr>
                <tr>
                  <td className="font-medium py-1">Timestamp</td>
                  <td>{transactionRefs.timestamp || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-medium py-1">Merchant Name</td>
                  <td>Telangana</td>
                </tr>
                <tr>
                  <td className="font-medium py-1">Type of Tax</td>
                  <td>Telangana Commercial Tax</td>
                </tr>
                <tr>
                  <td className="font-medium py-1">Tax Amount</td>
                  <td className="font-semibold text-green-600">₹{paymentData?.amount || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-medium py-1">CRN</td>
                  <td className="font-mono">{transactionRefs.crn || "N/A"}</td>
                </tr>
                <tr>
                  <td className="font-medium py-1">Name</td>
                  <td>{bankDetails?.accountHolder || paymentData?.name || "N/A"}</td>
                </tr>
              </tbody>
            </table>

            {/* Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleCompleteTransaction}
                className="text-white px-6 py-2 text-sm font-medium rounded shadow-sm hover:opacity-90"
                style={{ backgroundColor: getBankColor() }}
              >
                Click Here to Complete Transaction
              </button>
            </div>
          </div>

          {/* Optional: bottom note */}
          <div className="bg-[#FFFBEA] border-t border-gray-300 p-3 text-xs text-gray-600">
            <b>Please Note:</b> You will be redirected automatically to the Telangana
            Commercial Tax Portal after successful transaction.
          </div>
        </div>
      </main>
    </div>
  );
};

export default BankTransactionSuccess;
