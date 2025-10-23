import React from "react";
import { useLocation } from "react-router-dom";
import IFMISHeader from "./IFMISHeader";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const { paymentData, transactionDetails, bankDetails } = state || {};

  const handlePrint = () => {
    // Create a new window for printing/saving as PDF
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Receipt</title>
          <meta charset="utf-8">
          <style>
            @page {
              size: A4;
              margin: 0.5in;
            }
            
            * {
              box-sizing: border-box;
            }
            
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 0; 
              background: white;
              font-size: 14px;
              line-height: 1.4;
            }
            
            .receipt-container {
              max-width: 100%;
              margin: 0 auto;
              padding: 20px;
            }
            
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #0C2340;
              padding-bottom: 20px;
            }
            
            .logo { 
              width: 80px; 
              height: auto; 
              margin: 0 auto 10px; 
            }
            
            .success-icon { 
              width: 60px; 
              height: 60px; 
              margin: 20px auto; 
              background: #10B981;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 30px;
            }
            
            .transaction-details { 
              margin: 20px 0; 
              border: 1px solid #ddd;
              border-radius: 8px;
              overflow: hidden;
            }
            
            .detail-row { 
              display: flex; 
              justify-content: space-between; 
              margin: 0; 
              padding: 15px 20px; 
              border-bottom: 1px solid #eee;
            }
            
            .detail-row:last-child {
              border-bottom: none;
            }
            
            .detail-label { 
              font-weight: bold; 
              color: #374151;
            }
            
            .detail-value {
              color: #111827;
            }
            
            .footer { 
              margin-top: 30px; 
              text-align: center; 
              font-size: 12px; 
              color: #6B7280;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
            
            .amount {
              font-weight: bold;
              color: #059669;
              font-size: 18px;
            }
            
            @media print {
              body { 
                margin: 0; 
                padding: 0;
              }
              .receipt-container {
                margin: 0;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header">
              <img src="https://ifmis.telangana.gov.in/images/logo.png" alt="IFMIS Logo" class="logo">
              <h1 style="color: #0C2340; margin: 10px 0; font-size: 24px;">IFMIS - Government of Telangana</h1>
              <h2 style="color: #059669; margin: 5px 0; font-size: 20px;">Payment Receipt</h2>
            </div>
            
            <div style="text-align: center;">
              <div class="success-icon">✓</div>
              <h2 style="color: #059669; margin: 10px 0; font-size: 18px;">Payment Done Successfully!</h2>
              <p style="color: #6B7280; margin: 5px 0;">Please download the receipt for later reference.</p>
            </div>
            
            <div class="transaction-details">
              <div class="detail-row">
                <span class="detail-label">Challan No:</span>
                <span class="detail-value">${transactionDetails?.challanNo || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Remitter:</span>
                <span class="detail-value">${bankDetails?.accountHolder || paymentData?.name || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">DDO Code:</span>
                <span class="detail-value">${transactionDetails?.ddocode || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">HOA:</span>
                <span class="detail-value">${transactionDetails?.hoa || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Amount:</span>
                <span class="detail-value amount">₹${paymentData?.amount || 'N/A'}</span>
              </div>
            </div>
            
            <div class="footer">
              <p>Generated on: ${new Date().toLocaleString()}</p>
              <p><strong>IFMIS © Government of Telangana</strong></p>
              <p>This is a computer generated receipt and does not require signature.</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    
    // Wait for content to load then trigger print dialog
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    };
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <IFMISHeader />

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center py-10 px-4 bg-[#F5F8FB] flex-1">
        <div className="bg-white shadow-md rounded-md w-full max-w-2xl border border-gray-200">
          {/* Title */}
          <div className="text-center mt-8 mb-4">
            <h2 className="text-xl text-gray-600 mb-4">Make Payment Easy</h2>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-green-600">
              Payment Done Successfully!
            </h1>
            <p className="text-gray-600 mt-2 mb-8">
              Please download the receipt for later reference.
            </p>
          </div>

          {/* Details */}
          <div className="px-10 pb-10">
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium text-gray-700">Challan No</td>
                  <td className="py-3 text-gray-900 text-right">
                    {transactionDetails?.challanNo || "6204422960"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium text-gray-700">Remitter</td>
                  <td className="py-3 text-gray-900 text-right">
                    {bankDetails?.accountHolder ||
                      paymentData?.name ||
                      "BASEMENT BAZAR PRIVATE LIMITED"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium text-gray-700">DDO Code</td>
                  <td className="py-3 text-gray-900 text-right">
                    {transactionDetails?.ddocode || "25002303035"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium text-gray-700">HOA</td>
                  <td className="py-3 text-gray-900 text-right font-mono">
                    {transactionDetails?.hoa || "002801070001000000NVN"}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-gray-700">Amount</td>
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
              className="bg-[#0E2E4F] hover:bg-[#112F47] text-white px-8 py-2 rounded-md text-sm font-medium"
            >
              Print
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
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <span className="text-sm text-gray-700 font-medium">
              100% Safe Payment
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccess;
