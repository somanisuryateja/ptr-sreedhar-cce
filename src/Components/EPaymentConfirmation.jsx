import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginHeader from "./LoginHeader";

const EPaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get payment data from navigation state
  const { paymentData, paymentId, ctdTransactionId, submittedAt } = location.state || {};

  const handleMakePayment = () => {
    // Navigate to IFMIS payment gateway with payment data
    navigate('/ifmis-payment', {
      state: {
        paymentData: paymentData,
        paymentId: paymentId,
        ctdTransactionId: ctdTransactionId,
        submittedAt: submittedAt
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LoginHeader />

      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="border-2 border-gray-300 w-full max-w-3xl p-4">
          <h2 className="text-xl font-semibold text-[#197749] mb-6 font-['Inter'] text-center">
            Telangana Commercial Taxes e-Payment
          </h2>

          <div className="border border-gray-300 rounded-md shadow-md text-sm">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 w-1/3 font-medium text-right">
                  CTD Transaction ID
                </td>
                <td className="border border-gray-300 px-3 py-2 text-left">
                  {ctdTransactionId || "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium text-right">
                  Type of TAX
                </td>
                <td className="border border-gray-300 px-3 py-2 text-left">
                  {paymentData?.taxType || "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium text-right">TIN</td>
                <td className="border border-gray-300 px-3 py-2 text-left">
                  {paymentData?.ptin || "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium text-right">
                  Name of the Firm
                </td>
                <td className="border border-gray-300 px-3 py-2 text-left">
                  {paymentData?.name || "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium text-right">
                  Tax Purpose
                </td>
                <td className="border border-gray-300 px-3 py-2 text-left">
                  {paymentData?.purpose || "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium text-right">
                  Tax Period
                </td>
                <td className="border border-gray-300 px-3 py-2 text-left">
                  {paymentData?.taxPeriodFrom && paymentData?.taxPeriodTo
                    ? `${paymentData.taxPeriodFrom} to ${paymentData.taxPeriodTo}`
                    : "N/A"}
                </td>
              </tr>

              <tr>
                <td className="border border-gray-300 px-3 py-2 font-medium text-right">
                  Amount
                </td>
                <td className="border border-gray-300 px-3 py-2 text-left">
                  ₹{paymentData?.amount || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>

            <div className="flex justify-center py-4">
              <button
                className="bg-[#0D784D] hover:bg-[#09623E] text-white px-5 py-1.5 rounded text-sm font-['Inter']"
                onClick={handleMakePayment}
              >
                Make Payment
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default EPaymentConfirmation;
