import React from "react";

const IFMISHeader = () => {
  return (
    <header className="bg-[#0C2340] text-white py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Left - CM */}
        <div className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Portrait_of_Telangana_CM_Revanth_Reddy.png/250px-Portrait_of_Telangana_CM_Revanth_Reddy.png"
            alt="CM"
            className="w-12 h-12 rounded-full object-cover border border-gray-400"
          />
          <div>
            <p className="text-sm font-semibold">SRI REVANTH REDDY</p>
            <p className="text-xs">Hon'ble Chief Minister</p>
          </div>
        </div>

        {/* Center - IFMIS Logo */}
        <div className="text-center">
          <img
            src="https://ifmis.telangana.gov.in/images/logo.png"
            alt="IFMIS"
            className="mx-auto w-20"
          />
          <p className="text-xs">Government of Telangana</p>
        </div>

        {/* Right - Finance Minister */}
        <div className="flex items-center gap-3">
          <img
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ5_K9oJ8If9NGDPjquIDROlvdyQZKuWCZYzOcG3uOxWkfdH4DGe3HqwbDPaUp0Syj_I8olTx59mCTVGKgOgTAHKMVsquVBCdJzNDLWQQ"
            alt="Finance Minister"
            className="w-12 h-12 rounded-full object-cover border border-gray-400"
          />
          <div>
            <p className="text-sm font-semibold">SRI T. HARISH RAO</p>
            <p className="text-xs">Hon'ble Finance Minister</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default IFMISHeader;
