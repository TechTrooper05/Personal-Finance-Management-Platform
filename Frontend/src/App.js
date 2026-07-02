import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from './pages/Transactions/Transactions';
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect } from 'react';
import Analytics from './pages/Analytics/Analytics';
import axios from "axios";
import Landing from "./pages/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./Context/AuthContext";
import VerifyOtp from './pages/VerifyOtp/VerifyOtp';
import Settings from './pages/Settings/Settings';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import PasswordReset from './pages/PasswordReset/PasswordReset';
import { Toaster } from "react-hot-toast";

function App() {
  
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated, setUser } = useAuth();

  useEffect(() => {

      if (!isAuthenticated) return;

      axios.get(
          "http://localhost:5000/api/transactions",
          {
              withCredentials: true
          }
      )
      .then((res) => {
          setTransactions(res.data.transactions);
      });

  }, [isAuthenticated]);
  useEffect(() => {
    if (!isAuthenticated) return;

    axios.get(
      "http://localhost:5000/api/auth/me",
      {
        withCredentials: true
      }
    )
    .then((res) => {
      setUser(res.data.user);
    });
  }, [isAuthenticated, setUser])
  
  return (
    <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Routes>
      <Route
        path="/"
        element={<Landing />}
      />
      <Route
        path='/verify-otp'
        element={
          <VerifyOtp />
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ForgotPassword />
        }
      />
      <Route
        path='/password-reset'
        element={
          <PasswordReset />
        }
      />
      <Route 
        path="/settings"
        element={
        <>
        <Navbar />
        <Settings />
        </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
          <>
            <Navbar />
            <Dashboard
              transactions={transactions}
              setTransactions={setTransactions}
              showForm={showForm}
              setShowForm={setShowForm}
            />
          </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
          <>
            <Navbar />
            <Transactions
              transactions={transactions}
              setTransactions={setTransactions}
              showForm={showForm}
              setShowForm={setShowForm}
            />
          </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
          <>
            <Navbar />
            <Analytics
              transactions={transactions}
            />
          </>
          </ProtectedRoute>
        }
      />

    </Routes>
    </>
  );
}

export default App;
