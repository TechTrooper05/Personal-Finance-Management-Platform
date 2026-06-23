import { useState } from 'react';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import TransactionRow from '../../components/TransactionRow/TransactionRow';
import "./Dashboard.css";

function Dashboard({transactions, setTransactions, showForm, setShowForm}) {
  const [isdelete, setIsdelete] = useState(false);
  function deleteTransactionTrigger() {
    setIsdelete(!isdelete);
  };
  const incomeAmount = transactions
    .filter(t => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expenseAmount = transactions
    .filter(t => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const balanceAmount = incomeAmount - expenseAmount;
  return (
    <>
    <div className="dashboard-container">
      <div className="summary-container">
        <p className="main-heading">Summary</p>
        <div className="summary-inner-container">
          <SummaryCard title="Income" amount={incomeAmount} className="income"/>
          <SummaryCard title="Expenses" amount={expenseAmount} className="expenses"/>
          <SummaryCard title="Balance" amount={balanceAmount} className="balance"/>
        </div>
      </div>
      <div className="transaction-container">
        <p className="main-heading">Recent Transactions</p>
        <div className="row">
            <p className='transaction-type'>Type</p>
            <p className='transaction-category'>Category</p>
            <p className='transaction-amount'>Amount</p>
            <p className='transaction-date'>Date</p>
            {isdelete && <p className='delete-transaction-column delete-text'>Delete</p>}
        </div>
        <hr />
        {transactions.slice(-5).reverse().map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} transactions={transactions} setTransactions={setTransactions} isdelete={isdelete}/>
        ))} 
        <div className="transaction-buttons">
          <button className="add-transaction-button" onClick={()=>setShowForm(true)}>Add</button>
          <button className="delete-transaction-button" onClick={deleteTransactionTrigger}>Delete</button>
        </div>
      </div>
      {showForm && <TransactionForm transactions={transactions} setTransactions={setTransactions} balanceAmount={balanceAmount} showForm={showForm} setShowForm={setShowForm}/>}
    </div>
    </>
  );
}

export default Dashboard;