import './TransactionRow.css';

function TransactionRow({transaction, transactions, setTransactions, isdelete}) {
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
            {isdelete && <button className='delete-transaction-column' onClick={deleteTransaction}>X</button>}
        </div>
    )
};

export default TransactionRow;