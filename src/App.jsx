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
import ProtectedRoute from "./Components/ProtectedRoute";
import DisclaimerBanner from "./Components/DisclaimerBanner";

const App = () => {
  return (
    <Router>
      <>
        <DisclaimerBanner />
        <Routes>
        {/* Public routes - no authentication required */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes - authentication required */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/returns" element={
          <ProtectedRoute>
            <ReturnsEntry />
          </ProtectedRoute>
        } />
        <Route path="/epayment" element={
          <ProtectedRoute>
            <EPayment />
          </ProtectedRoute>
        } />
        <Route path="/epayment-confirmation" element={
          <ProtectedRoute>
            <EPaymentConfirmation />
          </ProtectedRoute>
        } />
        <Route path="/ifmis-payment" element={
          <ProtectedRoute>
            <IFMISPayment />
          </ProtectedRoute>
        } />
        <Route path="/payment-gateway" element={
          <ProtectedRoute>
            <PaymentGateway />
          </ProtectedRoute>
        } />
        <Route path="/bank-transaction-success" element={
          <ProtectedRoute>
            <BankTransactionSuccess />
          </ProtectedRoute>
        } />
        <Route path="/payment-success" element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        } />
        <Route path="/payment-fail" element={
          <ProtectedRoute>
            <PaymentFail />
          </ProtectedRoute>
        } />
        </Routes>
      </>
    </Router>
  );
};

export default App;
