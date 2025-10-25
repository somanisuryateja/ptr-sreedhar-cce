import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentFail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { error, paymentData, selectedBank } = location.state || {};

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg shadow-lg">
        {/* Failure Header */}
        <div className="bg-red-100 border-b border-red-200 p-6 text-center rounded-t-lg">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-red-600">
            Your payment could not be processed.
          </p>
        </div>

        {/* Error Details */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-red-600">₹{paymentData?.amount || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bank:</span>
                <span>{selectedBank || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax Type:</span>
                <span>{paymentData?.taxType || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="bg-red-100 border border-red-300 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Error Details</h3>
            <p className="text-red-700 text-sm">
              {error || "Invalid banking credentials. Please check your username and password."}
            </p>
          </div>

          {/* Timestamp */}
          <div className="mt-4 text-center text-sm text-gray-500">
            Payment failed on: {new Date().toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-red-200 p-6 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/ifmis-payment", { 
              state: { 
                paymentData: paymentData, 
                selectedBank: selectedBank 
              } 
            })}
            className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
