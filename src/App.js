import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import AdminPage from "./pages/AdminPage";
import ShopPage from "./pages/ShopPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/shop" replace />} />           
                <Route path="/shop" element={<ShopPage/>} />
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/admin" element={<ProtectedRoute> <AdminPage /> </ProtectedRoute>}/>
               
            </Routes>
        </Router>
    );
}

export default App;