import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import PageOTP from "./auth/PageOTP";
import Reinitialisation from "./auth/Reinitialisation";
import AdminDashboard from "./dashboards/admin/AdminDashboard";
import UserDashboard from "./dashboards/user/Dashboard";

export default function App() {
  const handleLogout = () => {
    // Logique de déconnexion à implémenter
    console.log("Déconnexion");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<PageOTP />} />
        <Route path="/reinitialisation" element={<Reinitialisation />} />
        <Route path="/admin" element={<AdminDashboard onLogout={handleLogout} />} />
        <Route path="/user" element={<UserDashboard onLogout={handleLogout} />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}