import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from './pages/Transactions/Transactions';
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect } from 'react';
import Analytics from './pages/Analytics/Analytics';

function App() {
  const [page, setPage] = useState("Dashboard");
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);
  const [showForm, setShowForm] = useState(false);
  return (
    <>
    <Navbar page={page} setPage={setPage}/>
    {page==='Dashboard' && <Dashboard transactions={transactions} setTransactions={setTransactions} showForm={showForm} setShowForm={setShowForm}/>}
    {page==='Transactions' && <Transactions transactions={transactions} setTransactions={setTransactions} showForm={showForm} setShowForm={setShowForm}/>}
    {page==='Analytics' && <Analytics transactions={transactions}/>}
    </>
  );
}

export default App;
