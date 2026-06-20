import './TransactionRow.css';

function TransactionRow({transaction, transactions, setTransactions}) {
    function deleteTransaction() {
        setTransactions(transactions.filter(t => t.id !== transaction.id)
        );
    }
    return (
        <div className="row">
            <p className='transaction-type'>{transaction.type}</p>
            <p className='transaction-category'>{transaction.category}</p>
            <p className='transaction-amount'>₹{transaction.amount}</p>
            <p className='transaction-date'>{transaction.date}</p>
            <button className='delete-transaction-button' onClick={deleteTransaction}>X Delete</button>
        </div>
    )
};

export default TransactionRow;