import './TransactionList.css';

function TransactionList({transaction, transactions, setTransactions, isdelete, setIsdelete}) {
    function deleteTransaction() {
        setTransactions(transactions.filter(t => t.id !== transaction.id)
        );
        setIsdelete(false);
    }
    return (
        <div className="transaction-list-row">
            <div className="details">
                <div className='transaction-list-type'><p className='transaction-list-label'>Type: </p> {transaction.type}</div>
                <div className='transaction-list-category'><p className='transaction-list-label'>Category: </p>{transaction.category}</div>
                <div className='transaction-list-amount'><p className='transaction-list-label'>Amount: </p>₹{transaction.amount}</div>
                <div className='transaction-list-date'><p className='transaction-list-label'>Date: </p>{transaction.date}</div>
                <div className='transaction-description'><p className='transaction-list-label'>Description: </p>{transaction.description}</div>
            </div>
            {isdelete && <div   className="delete-button-container">
                <button className='delete-transaction-list-button' onClick={deleteTransaction}>X</button>
            </div>}
        </div>
    )
};

export default TransactionList;