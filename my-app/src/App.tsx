import LandingPage from "./components/landing/LandingPage";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/landing/RegisterPage";
import DashboardPage from "./components/dashboard/DashboardPage";
import TransactionPage from "./components/transaction/TransactionPage";
import LoanPage from "./components/loan/LoanPage";
import ProfilePage from "./components/profile/ProfilePage";
import QrPage from "./components/qr/QRPage";
import ApplyLoanPage from "./components/loan/ApplyLoanPage";
import ScheduleTransfer from "./components/transaction/ScheduleTransfer";
import OrganizeTransfer from "./components/transaction/OrganizeTransfer";
import Transfer from "./components/transaction/Transfer";
import TransactionHistory from "./components/transaction/TransactionHistory";

function App() {
  return (
      <div>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/dashboard" element={<DashboardPage />}/>
              <Route path="/transaction" element={<TransactionPage />}/>
              <Route path="/transaction-history" element={<TransactionHistory />}/>
              <Route path="/loan" element={<LoanPage />}/>
              <Route path="/apply-loan" element={<ApplyLoanPage />}/>
              <Route path="/profile" element={<ProfilePage />}/>
              <Route path="/qr" element={<QrPage />}/>
              <Route path="/transfer" element={<Transfer/>}/>
              <Route path="/schedule-transfer" element={<ScheduleTransfer/>}/>
              <Route path="/organize-transfer" element={<OrganizeTransfer/>}/>
          </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
