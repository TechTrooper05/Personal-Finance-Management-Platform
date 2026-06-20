import './TransactionForm.css';
import { useState } from "react";

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

function TransactionForm({transactions, setTransactions, balanceAmount}) {
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
    if (amount>balanceAmount){
      setError("Insufficient Balance!");
      return;
    }
    setError("");
    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount,
      date,
      description
    }
    setTransactions([...transactions,newTransaction]);
    setType("Expense");
    setCategory("");
    setAmount("");
    setDate("");
    setDescription("");
  }
  return (
    <>
    <div className="flex-container">
      <div className='transactionForm-container'>
        <div className="transact-box1">Add Transaction</div>
        <div className="transact-box2">
          <div className="innertransact-box1">
              <p className='input-text'>Type</p>
              <div className="type-dropdown">
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
              <p className='input-text'>Amount</p>
              <div className="amount-input">
                  <input type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
              </div>
              <p className='input-text'>Category</p>
              <div className="category-dropdown">
                  <select
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
              <p className='input-text'>Date</p>
              <div className="date-input">
                  <input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/>
              </div>              
          </div>
          <div className="innertransact-box2">
            <p className='input-text'>Description</p>
            <input type="text" placeholder='Add Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
          </div>
        </div>
        {error && <p className='error-message'>{error}</p>}
        <div className="transact-box3">
          <button onClick={handleSubmit}>+ Add Transaction</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default TransactionForm;