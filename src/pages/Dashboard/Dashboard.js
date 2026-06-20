import SummaryCard from '../../components/SummaryCard/SummaryCard';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import TransactionRow from '../../components/TransactionRow/TransactionRow';
import "./Dashboard.css";

function Dashboard({transactions, setTransactions}) {
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
      <p className="main-heading">Summary</p>
      <div className="summary-container">
        <SummaryCard title="Income" amount={incomeAmount} className="income"/>
        <SummaryCard title="Expenses" amount={expenseAmount} className="expenses"/>
        <SummaryCard title="Balance" amount={balanceAmount} className="balance"/>
      </div>
      <p className="main-heading">Recent Transactions</p>   
      {transactions.slice(-5).reverse().map((transaction) => (
        <TransactionRow key={transaction.id} transaction={transaction} transactions={transactions} setTransactions={setTransactions}/>
      ))} 
      <TransactionForm transactions={transactions} setTransactions={setTransactions} balanceAmount={balanceAmount}/>  
    </div>
    </>
  );
}

export default Dashboard;