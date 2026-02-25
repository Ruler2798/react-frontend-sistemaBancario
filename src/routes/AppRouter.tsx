import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import ClientsPage from "../modules/clients/ClientsPage.tsx";
import LoansPage from "../modules/loans/LoansPage.tsx";
import LoanRequestsPage from "../modules/loans/LoanRequestPage.tsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/clients" />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/solicitudes" element={<LoanRequestsPage />} />
          <Route path="/prestamos" element={<LoansPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;