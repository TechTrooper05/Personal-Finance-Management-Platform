import './TransactionList.css';

function TransactionList({transaction, transactions, setTransactions}) {
    function deleteTransaction() {
        setTransactions(transactions.filter(t => t.id !== transaction.id)
        );
    }
    return (
        <div className="transaction-list-row">
            <div className="details">
                <p className='transaction-list-type'>{transaction.type}</p>
                <p className='transaction-list-category'>{transaction.category}</p>
                <p className='transaction-list-amount'>₹{transaction.amount}</p>
                <p className='transaction-list-date'>{transaction.date}</p>
                <button className='delete-transaction-list-button' onClick={deleteTransaction}>X Delete</button>
                <p className='transaction-description'>Description: {transaction.description}</p>
            </div>
        </div>
    )
};

export default TransactionList;