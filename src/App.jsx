import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ReturnsEntry from "./Pages/ReturnsEntry";
import EPayment from "./Pages/EPayment";
import EPaymentConfirmation from "./Components/EPaymentConfirmation";
import IFMISPayment from "./Components/IFMISPayment";
import PaymentGateway from "./Components/PaymentGateway";
import BankTransactionSuccess from "./Components/BankTransactionSuccess";
import PaymentSuccess from "./Components/PaymentSuccess";
import PaymentFail from "./Components/PaymentFail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/returns" element={<ReturnsEntry />} />
        <Route path="/epayment" element={<EPayment />} />
        <Route path="/epayment-confirmation" element={<EPaymentConfirmation />} />
        <Route path="/ifmis-payment" element={<IFMISPayment />} />
        <Route path="/payment-gateway" element={<PaymentGateway />} />
        <Route path="/bank-transaction-success" element={<BankTransactionSuccess />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-fail" element={<PaymentFail />} />
      </Routes>
    </Router>
  );
};

export default App;
