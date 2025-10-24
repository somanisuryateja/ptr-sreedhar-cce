import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import IFMISHeader from "./IFMISHeader";
import html2pdf from 'html2pdf.js';
import { MdCheckCircle } from 'react-icons/md';
import { HiRefresh } from 'react-icons/hi';

const PaymentSuccess = () => {
  const { state } = useLocation();
  const { paymentData, transactionDetails, bankDetails } = state || {};
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePrint = () => {
    // Prevent multiple clicks
    if (isGeneratingPDF) {
      return;
    }

    // Get the receipt content element
    const receiptElement = document.getElementById('receipt-content');
    
    if (!receiptElement) {
      alert('Receipt content not found');
      return;
    }

    // Set loading state
    setIsGeneratingPDF(true);

    // Configure PDF options for clean output
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `Payment_Receipt_${transactionDetails?.challanNo || 'Unknown'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        backgroundColor: '#ffffff',
        removeContainer: true,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      }
    };

    // Create a temporary style element to override colors and ensure clean output
    const tempStyle = document.createElement('style');
    tempStyle.innerHTML = `
      @page {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      body {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
      }
      
      * {
        color: #000000 !important;
        background-color: transparent !important;
        border-color: #cccccc !important;
      }
      
      .bg-\\[\\#F5F8FB\\] {
        background-color: #f5f8fb !important;
      }
      
      .bg-white {
        background-color: #ffffff !important;
      }
      
      .bg-\\[\\#0E2E4F\\] {
        background-color: #0e2e4f !important;
      }
      
      .bg-\\[\\#112F47\\] {
        background-color: #112f47 !important;
      }
      
      .text-white {
        color: #ffffff !important;
      }
      
      .text-gray-600 {
        color: #4b5563 !important;
      }
      
      .text-gray-700 {
        color: #374151 !important;
      }
      
      .text-gray-800 {
        color: #1f2937 !important;
      }
      
      .text-green-600 {
        color: #059669 !important;
      }
      
      .border-gray-200 {
        border-color: #e5e7eb !important;
      }
      
      .border-gray-300 {
        border-color: #d1d5db !important;
      }
      
      .shadow-md {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
      }
      
      /* Hide any unwanted elements */
      .print-hide {
        display: none !important;
      }
      
      /* Ensure clean layout */
      .receipt-content {
        margin: 0 !important;
        padding: 20px !important;
        background: white !important;
      }
    `;
    
    // Add the style to the document
    document.head.appendChild(tempStyle);
    
    // Generate and download clean PDF
    html2pdf()
      .from(receiptElement)
      .set(opt)
      .save()
      .then(() => {
        console.log('Clean PDF generated successfully');
        // Remove the temporary style
        document.head.removeChild(tempStyle);
        // Reset loading state
        setIsGeneratingPDF(false);
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
        // Remove the temporary style even if there's an error
        if (document.head.contains(tempStyle)) {
          document.head.removeChild(tempStyle);
        }
        // Reset loading state
        setIsGeneratingPDF(false);
      });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <IFMISHeader />

      {/* Main Content */}
      <main id="receipt-content" className="flex flex-col items-center justify-center py-10 px-4 bg-[#F5F8FB] flex-1">
        <div className="bg-white shadow-md rounded-md w-full max-w-2xl border border-gray-200">
          {/* Title */}
          <div className="text-center mt-8 mb-4">
            <h2 className="text-xl text-gray-600 mb-4">Make Payment Easy</h2>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <MdCheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <p className="text-green-600 font-semibold text-lg mb-8">
              Payment Completed Successfully!
            </p>
          </div>

          {/* Transaction Details Table */}
          <div className="px-6 pb-6">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="py-3 px-4 font-medium text-gray-700 border-r border-gray-300">
                    Challan No
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {transactionDetails?.challanNo || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 px-4 font-medium text-gray-700 border-r border-gray-300">
                    Remitter
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {paymentData?.name || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 px-4 font-medium text-gray-700 border-r border-gray-300">
                    DDO Code
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {transactionDetails?.ddocode || "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 px-4 font-medium text-gray-700 border-r border-gray-300">
                    HOA
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {transactionDetails?.hoa || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700 border-r border-gray-300">
                    Amount
                  </td>
                  <td className="py-3 text-green-600 text-right font-bold">
                    ₹{paymentData?.amount || "15000"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Print Button */}
          <div className="flex justify-center pb-8">
            <button
              onClick={handlePrint}
              disabled={isGeneratingPDF}
              className={`${isGeneratingPDF 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#0E2E4F] hover:bg-[#112F47]'} 
                text-white px-8 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors duration-200`}
            >
              {isGeneratingPDF ? (
                <>
                  <HiRefresh className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" />
                  Generating PDF...
                </>
              ) : (
                'Print'
              )}
            </button>
          </div>
        </div>

        {/* Footer Badges */}
        <div className="flex items-center justify-center space-x-6 mt-10">
          <div className="flex items-center space-x-2">
            <img
              src="https://t3.ftcdn.net/jpg/05/30/57/82/360_F_530578201_0ymjKwOVhCkGHUsluky70pwtFaNJ6XwF.jpg"
              alt="SSL"
              className="h-8"
            />
            <span className="text-sm text-gray-700 font-medium">
              SSL Secure Connection
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Verified_by_Visa.svg/1200px-Verified_by_Visa.svg.png"
              alt="Verified by Visa"
              className="h-8"
            />
            <span className="text-sm text-gray-700 font-medium">
              Verified by Visa
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccess;