import './TransactionForm.css';
import { useState } from "react";
import api from "../../Utils/api";
import toast from "react-hot-toast";

const categories = {
  Income: [
    "Salary",
    "Freelancing",
    "Investments",
    "Other"
  ],
  Expense: [
    "Food",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills",
    "Healthcare",
    "Education",
    "Other"
  ]
};

function TransactionForm({setTransactions, balanceAmount, setShowForm}) {
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!category){
      setError("Please choose category");
      return;
    }
    if (!amount){
      setError("Please enter amount");
      return;
    }
    if (!date){
      setError("Please enter date");
      return;
    }
    if (!description){
      setError("Please enter description");
      return;
    }
    if (type==='Expense' && Number(amount)>balanceAmount){
      setError("Insufficient Balance!");
      return;
    }
    setError("");
    const newTransaction = {
      type,
      category,
      amount: Number(amount),
      date,
      description
    }
    api.post("/api/transactions", newTransaction, { withCredentials: true }).then((res) => {
      toast.success("Transaction added successfully!");
      setTransactions(prev => [...prev, res.data.transaction]);
      setType("Expense");
      setCategory("");
      setAmount("");
      setDate("");
      setDescription("");
      setShowForm(false);
    }).catch((err)=>{
      setError("Failed to save transaction");
      toast.error(err);
    })  
  }
  return (
    <>
    <div className="flex-container">
      <div className='transactionForm-container'>
        <p className='transaction-form-header'>Add Transaction</p>
        <div className="row-1">
          <div className="column1">
            <p className='transaction-form-text'>Type</p>
            <select
                value={type}
                onChange={(e) => {
                setType(e.target.value);
                setCategory("");
                }}
            >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
            </select>
          </div>
          <div className="column2">
            <p className='transaction-form-text column2-content'>Category</p>
            <select className='column2-content'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Choose Category</option>

              {categories[type].map((item) => (
              <option key={item} value={item}>
                  {item}
              </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row-2">
          <div className="column1">
            <p className='transaction-form-text'>Amount</p>
            <input type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
          </div>
          <div className="column2">
            <p className='transaction-form-text column2-content'>Date</p>
            <input className='column2-content' type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
          </div>
        </div>
        <div className="row-3">
          <p className='transaction-form-text'>Description</p>
          <input className='description-box' type="text" placeholder='Add Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
        </div>
        {error && <p className='error-message'>{error}</p>}
        <div className="row-4">
          <button onClick={()=>setShowForm(false)}>Close</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default TransactionForm;