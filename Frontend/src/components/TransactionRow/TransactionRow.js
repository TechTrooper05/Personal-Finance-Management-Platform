import './TransactionRow.css';
import api from "../../Utils/api";
import toast from "react-hot-toast";

function TransactionRow({transaction, setTransactions, isdelete}) {
    function deleteTransaction() {
        api.delete(
            `/api/transactions/${transaction._id}`,
            { withCredentials: true }
        ).then(() => {
            setTransactions(prev =>
                prev.filter(
                    t => t._id !== transaction._id
                )
            );
        })
        .catch((err) => {
            toast.error(err);
        });
    }
    return (
        <div className="row">
            <p className='transaction-type'>{transaction.type}</p>
            <p className='transaction-category'>{transaction.category}</p>
            <p className='transaction-amount'>₹{transaction.amount}</p>
            <p className='transaction-date'>{transaction.date.split("T")[0]}</p>
            {isdelete && <button className='delete-transaction-column' onClick={deleteTransaction}>X</button>}
        </div>
    )
};

export default TransactionRow;