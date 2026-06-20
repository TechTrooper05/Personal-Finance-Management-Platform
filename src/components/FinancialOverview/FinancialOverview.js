import './FinancialOverview.css';
function FinancialOverview({transactions}) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentMonthName = currentDate.toLocaleString("default", {
    month: "long",
    });
    const monthlyExpense = transactions
        .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
            transaction.type === "Expense" &&
            transactionDate.getMonth() === currentMonth &&
            transactionDate.getFullYear() === currentYear
        );
        })
        .reduce((total, transaction) => total + Number(transaction.amount), 0);

    const yearlyExpense = transactions
        .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
            transaction.type === "Expense" &&
            transactionDate.getFullYear() === currentYear
        );
        })
        .reduce((total, transaction) => total + Number(transaction.amount), 0);
    const yearlyIncome = transactions
        .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
            transaction.type === "Income" &&
            transactionDate.getFullYear() === currentYear
        );
        })
        .reduce((total, transaction) => total + Number(transaction.amount), 0);
    // const totalIncome = transactions
    //     .filter((transaction) => transaction.type === "Income")
    //     .reduce((total, transaction) => total + Number(transaction.amount), 0);
    const monthlyIncome = transactions
        .filter((transaction) => {
            const transactionDate = new Date(transaction.date);
        return (
            transaction.type === "Income" &&
            transactionDate.getMonth() === currentMonth
        );
    })
        .reduce((total, transaction) => total + Number(transaction.amount), 0);
    // const totalExpense = transactions
    //     .filter((transaction) => transaction.type === "Expense")
    //     .reduce((total, transaction) => total + Number(transaction.amount), 0);   
    const monthlySavingsRate = monthlyIncome > 0
    ? ((monthlyIncome - monthlyExpense) / monthlyIncome) * 100 : 0; 
    
    return (
        <>
        <div className="analytics-heading">
            Financial Overview
        </div>
        <div className="monthly-overview">
            <p className='overview-h2'>{currentMonthName} {currentYear}</p>
            <p className='overview-h3'>Income: ₹{monthlyIncome}</p>
            <p className='overview-h3'>Expense: ₹{monthlyExpense}</p>
            <p className='overview-h3'>Savings: {monthlySavingsRate.toFixed(2)}%</p>
        </div>
        <div className="yearly-overview">
            <p className='overview-h2'>Year {currentYear}</p>
            <p className='overview-h3'>Income: ₹{yearlyIncome}</p>
            <p className='overview-h3'>Expense: ₹{yearlyExpense}</p>
            <p className='overview-h3'>Net Savings: {yearlyIncome-yearlyExpense}</p>
        </div>
        </>
    );
};
export default FinancialOverview;