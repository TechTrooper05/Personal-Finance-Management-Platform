import MonthlyExpenseChart from './MonthlyExpenseChart';
import CategorywiseExpenseChart from './CategorywiseExpenseChart'
import './SpendingAnalytics.css';


function SpendingAnalytics({transactions}) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const monthlyExpenses = transactions.reduce(
        (acc, transaction) => {
            if (transaction.type === "Expense") {
                const monthIndex = new Date(transaction.date).getMonth();
                acc[monthIndex].expense += Number(transaction.amount);
            }
            return acc;
        },
        [
            { month: "Jan", fullMonth: "January", expense: 0 },
            { month: "Feb", fullMonth: "February", expense: 0 },
            { month: "Mar", fullMonth: "March", expense: 0 },
            { month: "Apr", fullMonth: "April", expense: 0 },
            { month: "May", fullMonth: "May", expense: 0 },
            { month: "Jun", fullMonth: "June", expense: 0 },
            { month: "Jul", fullMonth: "July", expense: 0 },
            { month: "Aug", fullMonth: "August", expense: 0 },
            { month: "Sep", fullMonth: "September", expense: 0 },
            { month: "Oct", fullMonth: "October", expense: 0 },
            { month: "Nov", fullMonth: "November", expense: 0 },
            { month: "Dec", fullMonth: "December", expense: 0 }
        ]
    );
    const categoryData = transactions.reduce((acc, transaction) => {
        if (transaction.type === "Expense") {
            if (!acc[transaction.category]) {
                acc[transaction.category] = 0;
            }
            acc[transaction.category] += Number(transaction.amount);
        }
        return acc;
    }, {});
    const currentMonthExpense = monthlyExpenses[currentMonth].expense;
    const highestExpenseMonth = monthlyExpenses.reduce((highest, current)=>current.expense>highest.expense?current:highest);
    const avergeMonthlyExpense = transactions.filter((transaction)=>{
        const transactionYear = new Date(transaction.date);
        return(
            transaction.type==='Expense' &&
            transactionYear.getFullYear()===currentYear
        );
    }).reduce((sum, transaction)=>{
            return sum+=Number(transaction.amount);
    },0)/(currentMonth+1);
    const topCategory = Object.entries(categoryData).reduce((max, current)=>current[1]>max[1]?current:max);
    console.log(topCategory);
    const [topCategoryItem, topCategoryExpense] = topCategory;
    const topCategoryShare = (topCategoryExpense/currentMonthExpense)*100;
    return (
    <>
    <div className="analytics-heading">
        Spending Analytics
    </div>
    <div className="line-graph-container">
        <div className="monthly-expense-trend">Monthly Expense Trend</div>
        <div className='inner-line-graph-container'>
            <MonthlyExpenseChart monthlyData = {monthlyExpenses}/>
            <div className="spending-analytics-summary">
                <p className='spending-analytics-h2'>Current Month Expense</p>
                <p>₹{currentMonthExpense}</p>
                <p className='spending-analytics-h2'>Highest Spending Month</p>
                <p>{highestExpenseMonth.fullMonth} {currentYear} - ₹{highestExpenseMonth.expense}</p>
                <p className='spending-analytics-h2'>Average Monthly Expense</p>
                <p>₹{avergeMonthlyExpense.toFixed(2)}/month</p>
            </div>
        </div>
    </div>
    <div className="pie-chart-container">
        <div className="category-expense-distribution-chart">Category Expense Distribution Chart ({monthlyExpenses[currentMonth].fullMonth} {currentYear})</div>
        <div className="inner-pie-chart-container">
            <div className="category-distribution-summary">
                <p className='spending-analytics-h2'>Top Spending Category</p>
                <p>{topCategoryItem}</p>
                <br />
                <p className='spending-analytics-h2'>Amount Spent in Top Category</p>
                <p>₹{topCategoryExpense} - {topCategoryShare.toFixed(1)}% of total expenses</p>
                <br />
                <p>💡You spend most of your money on {topCategoryItem}!</p>
            </div>
            <CategorywiseExpenseChart categoryData={categoryData}/>
        </div>
    </div>
    <br /><br /><br />
    </>
  );
}
export default SpendingAnalytics;