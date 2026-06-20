import './Transactions.css';
// import Navbar from "../../components/Navbar/Navbar";
import TransactionList from '../../components/TransactionList/TransactionList';
import { useState } from 'react';
const filterCategories = [
    "Salary",
    "Freelancing",
    "Investments",
    "Food",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills",
    "Healthcare",
    "Education",
    "Other"
  ];
function Transactions({transactions, setTransactions}) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState("");
    const filteredTransactions = transactions.filter((t) => {
        const matchesCategory =
            selectedCategory === "All" ||
            t.category === selectedCategory;

        const matchesSearch =
            t.description
                .toLowerCase()
                .includes(searchText.toLowerCase());

        return matchesCategory && matchesSearch;
    });
    let sortedTransactions = [...filteredTransactions];
    if (sortBy === "amount-asc") {
        sortedTransactions.sort((a, b) => Number(a.amount) - Number(b.amount));
    }
    if (sortBy === "amount-desc") {
        sortedTransactions.sort((a, b) => Number(b.amount) - Number(a.amount));
    }
    if (sortBy === "date-asc") {
        sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    if (sortBy === "date-desc") {
        sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return (
        <>
        <div className="search-sort-container">
            <div className="sort-container">
                <i className="fa-solid fa-sort sort-icon"></i>
                <select value={sortBy} className='sort-button' onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">No Sorting</option>
                    <option value="date-desc">Date (Newest First)</option>
                    <option value="date-asc">Date (Oldest First)</option>
                    <option value="amount-desc">Amount (High → Low)</option>
                    <option value="amount-asc">Amount (Low → High)</option>
                </select>
            </div>
            <div className="filter-container">
                <i className="fa-solid fa-filter filter-icon"></i>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                >
                    <option value="All">All Categories</option>
                    {filterCategories.map((item)=>(
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}  
                </select>
            </div>
            <div className="search-container">
                <i className="fa-brands fa-sistrix search-icon"></i>
                <input className='search-button' type="search" placeholder='Search' value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
            </div>
        </div>

        <p className='main-heading'>Transaction List</p>
        {sortedTransactions.map((transaction) => (
        <TransactionList key={transaction.id} transaction={transaction} transactions={transactions} setTransactions={setTransactions}/>
        ))}
        </>
    );
};

export default Transactions;