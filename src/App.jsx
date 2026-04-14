import Home from "./pages/home";
import History from "./pages/history";
import Products from "./pages/products";
import Sell from "./pages/sell";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
      <Route path="/products" element={<Products />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
