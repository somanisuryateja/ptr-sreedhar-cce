import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginHeader from "./LoginHeader";

const EPaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get payment data from navigation state
  const { paymentData, paymentId, submittedAt } = location.state || {};
  
  const handleMakePayment = () => {
    // Navigate to IFMIS payment gateway with payment data
    navigate('/ifmis-payment', {
      state: {
        paymentData: paymentData,
        paymentId: paymentId,
        submittedAt: submittedAt
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LoginHeader />
      
      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <h2 className="text-xl font-semibold text-[#197749] mb-6">
          Telangana Commercial Taxes e-Payment
        </h2>

      <div className="border border-gray-300 rounded-md shadow-md w-full max-w-3xl text-sm">
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 w-1/3 font-medium">
                Payment ID
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {paymentId || "N/A"}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">
                Type of TAX
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {paymentData?.taxType || "N/A"}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">TIN</td>
              <td className="border border-gray-300 px-3 py-2">
                {paymentData?.ptin || "N/A"}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">
                Name of the Firm
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {paymentData?.name || "N/A"}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">
                Tax Purpose
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {paymentData?.purpose || "N/A"}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">
                Tax Period
              </td>
              <td className="border border-gray-300 px-3 py-2">
                {paymentData?.taxPeriodFrom && paymentData?.taxPeriodTo 
                  ? `${paymentData.taxPeriodFrom} to ${paymentData.taxPeriodTo}` 
                  : "N/A"}
              </td>
            </tr>

            <tr>
              <td className="border border-gray-300 px-3 py-2 font-medium">
                Amount
              </td>
              <td className="border border-gray-300 px-3 py-2">
                ₹{paymentData?.amount || "N/A"}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-center py-4">
          <button
            className="bg-[#0D784D] hover:bg-[#09623E] text-white px-5 py-1.5 rounded text-sm"
            onClick={handleMakePayment}
          >
            Make Payment
          </button>
        </div>
      </div>

      </main>
    </div>
  );
};

export default EPaymentConfirmation;
