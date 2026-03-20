import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import AdminPage from "./pages/AdminPage";
import ShopPage from "./pages/ShopPage";

function App() {
    return (
        <Router>
            <Routes>
                {}
                <Route path="/" element={<Navigate to="/shop" replace />} />           
                <Route path="/shop" element={<ShopPage/>} />
                <Route path="/admin" element={<AdminPage />} />
                 </Routes>
                 </Router>
    );
}
export default App;