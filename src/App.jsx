import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payment from "./pages/Payment.jsx";
import OrderPlaced from "./pages/OrderPlaced.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";

// Client flow: Login > Home > Product > Cart > Checkout (address) > Payment > Order placed
export default function App() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute role="client"><Home /></ProtectedRoute>} />
          <Route path="/flower/:id" element={<ProtectedRoute role="client"><ProductDetail /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute role="client"><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute role="client"><Checkout /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute role="client"><Payment /></ProtectedRoute>} />
          <Route path="/order-placed" element={<ProtectedRoute role="client"><OrderPlaced /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="owner"><AdminOrders /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}
