import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginHeader from "../Components/LoginHeader";
import API_BASE_URL from "../utils/api";

/* helpers */
const fmt = (n) => (isNaN(n) ? "" : Number(n).toLocaleString("en-IN"));

const DEFAULT_PAYRANGES = [
  { id: 1, label: "Below 15000", rate: 0, employees: "", payable: 0 },
  { id: 2, label: "15001-20000", rate: 150, employees: "", payable: 0 },
  { id: 3, label: "20001 & Above", rate: 200, employees: "", payable: 0 },
];

// Generate current month and year options for tax period
const getTaxPeriodOptions = () => {
  const currentDate = new Date();
  const options = [];
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    options.push(monthYear);
  }
  
  return options;
};

const ReturnsEntry = () => {
  const navigate = useNavigate();

  // Try to pull dealer info (saved after login) -> { ptin, name, division, circle }
  const dealer = useMemo(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("user") || "null");
      return saved || {};
    } catch {
      return {};
    }
  }, []);

  const [returnType, setReturnType] = useState("Monthly");
  const [taxPeriod, setTaxPeriod] = useState(""); // dropdown selection
  const [rows, setRows] = useState(DEFAULT_PAYRANGES);
  
  // Get tax period options
  const taxPeriodOptions = getTaxPeriodOptions();

  // Auto recompute payable when employees change - only whole numbers allowed
  const updateEmployees = (idx, val) => {
    // Only allow whole numbers (no decimals)
    const wholeNumber = val.replace(/[^0-9]/g, "");
    const next = rows.map((r, i) =>
      i === idx
        ? {
            ...r,
            employees: wholeNumber,
            payable: Number(wholeNumber) * Number(r.rate || 0),
          }
        : r
    );
    setRows(next);
  };

  const calcRow = (idx) => {
    const r = rows[idx];
    const payable = Number(r.employees || 0) * Number(r.rate || 0);
    const next = rows.slice();
    next[idx] = { ...r, payable };
    setRows(next);
  };

  const totalPayable = rows.reduce((s, r) => s + (Number(r.payable) || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!taxPeriod) {
      alert("Please select a Tax Period");
      return;
    }
    
    if (totalPayable === 0) {
      alert("Please enter employee counts to calculate tax payable");
      return;
    }
    
    // Show the exact alert as in the screenshot FIRST
    const userChoice = window.confirm(
      "Your Return has been submitted Success - Do you want to file another month return? - If Yes - Click OK"
    );
    
    // Only proceed with API call if user clicked OK
    if (userChoice) {
      try {
        // Prepare return data
        const returnData = {
          ptin: dealer.ptin,
          name: dealer.name,
          division: dealer.division,
          circle: dealer.circle,
          professionType: "Entry 1 salary wages",
          taxPeriod: taxPeriod,
          returnType: "Monthly",
          returnDetails: rows.map(row => ({
            payRange: row.label,
            taxRate: row.rate,
            employeeCount: Number(row.employees) || 0,
            taxPayable: Number(row.payable) || 0
          })),
          totalPayable: totalPayable,
          submittedAt: new Date().toISOString()
        };
        
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          alert("Session expired. Please login again.");
          navigate('/login');
          return;
        }
        
        // Send to backend
        const response = await fetch(`${API_BASE_URL}/api/submit-return`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(returnData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
          // Reset the form to show a new return entry screen
          setReturnType("Monthly");
          setTaxPeriod("");
          setRows(DEFAULT_PAYRANGES);
          // Form will be reset and user can enter new data
        } else {
          alert(`Error: ${result.message || 'Failed to submit return'}`);
        }
        
      } catch (error) {
        alert('Network error. Please check your connection and try again.');
      }
    }
    // If user clicked Cancel, stay on the same screen (no action needed)
  };

  // keyboard Enter inside any "employees" field calculates row
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter") e.preventDefault();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top govt banner */}
      <LoginHeader />

      {/* Green menu bar (like dashboard) */}
      <nav className="w-full bg-[#085A3A] text-white text-sm font-medium">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center px-4 py-2">
          <ul className="flex flex-wrap gap-6">
            <li className="underline underline-offset-4">CHECK RC</li>
            <li className="bg-white/10 px-2 rounded">Returns</li>
            <li>Change Password</li>
            <li>Reports</li>
            <li>Refunds</li>
            <li>E-Payment</li>
          </ul>
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="bg-[#0D784D] hover:bg-[#09623E] px-3 py-1.5 rounded-md"
            >
              Home
            </Link>
            <button
              className="bg-[#0D784D] hover:bg-[#09623E] px-3 py-1.5 rounded-md"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Page body */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-5">
          {/* New Return Entry tab mimic */}
          <div className="mb-3">
            <span className="inline-block bg-[#0D784D] text-white text-sm px-3 py-1.5 rounded">
              New Return Entry
            </span>
          </div>

          {/* Header grid with borders (PTIN/Name/Division/Circle/… ) */}
          <div className="border border-gray-300 rounded-md overflow-hidden">
            {/* top row: demand/return type - should show as Monthly */}
            <div className="grid grid-cols-12 border-b border-gray-300">
              <div className="col-span-4 p-2 text-sm font-medium">
                Demand/Return Type :
              </div>
              <div className="col-span-8 p-2">
                <span className="text-sm">Monthly</span>
              </div>
            </div>

            {/* PTIN / Name */}
            <div className="grid grid-cols-12 border-b border-gray-300">
              <div className="col-span-2 p-2 text-sm">PTIN</div>
              <div className="col-span-4 p-2 border-l border-gray-300">
                {dealer.ptin || "____"}
              </div>
              <div className="col-span-2 p-2 text-sm border-l border-gray-300">
                Name
              </div>
              <div className="col-span-4 p-2 border-l border-gray-300">
                {dealer.name || "____"}
              </div>
            </div>

            {/* Division / Circle */}
            <div className="grid grid-cols-12 border-b border-gray-300">
              <div className="col-span-2 p-2 text-sm">Division</div>
              <div className="col-span-4 p-2 border-l border-gray-300">
                {(dealer.division || "").toString().toUpperCase() || "____"}
              </div>
              <div className="col-span-2 p-2 text-sm border-l border-gray-300">
                Circle
              </div>
              <div className="col-span-4 p-2 border-l border-gray-300">
                {(dealer.circle || "").toString().toUpperCase() || "____"}
              </div>
            </div>

            {/* Profession Type / Tax Period */}
            <div className="grid grid-cols-12">
              <div className="col-span-4 p-2 text-sm">
                Profession Type at the time Registration
              </div>
              <div className="col-span-4 p-2 border-l border-gray-300">
                <span className="text-sm">Entry 1 salary wages</span>
              </div>
              <div className="col-span-2 p-2 text-sm border-l border-gray-300">
                Tax Period
              </div>
              <div className="col-span-2 p-2 border-l border-gray-300">
                <select
                  value={taxPeriod}
                  onChange={(e) => setTaxPeriod(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                >
                  <option value="">Select Period</option>
                  {taxPeriodOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Slab table */}
          <div className="mt-6 border border-gray-300 rounded-md overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-300 px-3 py-2 text-sm font-medium">
              Return Details
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#E9EEF2] text-slate-700">
                    <th className="px-3 py-2 border border-gray-300 w-12">S</th>
                    <th className="px-3 py-2 border border-gray-300">
                      PayRange
                    </th>
                    <th className="px-3 py-2 border border-gray-300">
                      Tax Rate (%)
                    </th>
                    <th className="px-3 py-2 border border-gray-300">
                      No. of Employees
                    </th>
                    <th className="px-3 py-2 border border-gray-300">
                      Tax Payable
                    </th>
                    <th className="px-3 py-2 border border-gray-300 w-36">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, idx) => (
                    <tr key={r.id} className="odd:bg-white even:bg-slate-50">
                      <td className="px-3 py-2 border border-gray-300">
                        {["I", "II", "III"][idx]}
                      </td>
                      <td className="px-3 py-2 border border-gray-300">
                        <span className="text-sm">{r.label}</span>
                      </td>
                      <td className="px-3 py-2 border border-gray-300">
                        <span className="text-sm text-right block">{r.rate}</span>
                      </td>
                      <td className="px-3 py-2 border border-gray-300">
                        <input
                          type="text"
                          value={r.employees}
                          onChange={(e) => updateEmployees(idx, e.target.value)}
                          onKeyPress={(e) => {
                            // Only allow numbers
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
                              e.preventDefault();
                            }
                          }}
                          className="w-28 border border-gray-300 rounded px-2 py-1 text-right"
                          placeholder="0"
                        />
                      </td>
                      <td className="px-3 py-2 border border-gray-300 text-right">
                        ₹ {fmt(r.payable)}
                      </td>
                      <td className="px-3 py-2 border border-gray-300">
                        <button
                          onClick={() => calcRow(idx)}
                          className="text-sky-700 hover:underline"
                          type="button"
                        >
                          Calculate
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* total row */}
                  <tr className="bg-slate-100 font-semibold">
                    <td className="px-3 py-2 border border-gray-300" colSpan={4}>
                      Total Payable Amount
                    </td>
                    <td className="px-3 py-2 border border-gray-300 text-right">
                      ₹ {fmt(totalPayable)}
                    </td>
                    <td className="px-3 py-2 border border-gray-300"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="px-3 py-3 border-t border-gray-300 flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-[#0D784D] hover:bg-[#09623E] text-white px-6 py-1.5 rounded text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center bg-black text-white text-xs py-2 mt-auto">
        Disclaimer :: Copyright © 2025 Government of Telangana. All rights reserved.
      </footer>
    </div>
  );
};

export default ReturnsEntry;
