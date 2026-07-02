import "./SummaryCard.css";
const icons = {
    income: <i className="fa-solid fa-arrow-trend-up" style={{color: "rgb(99, 230, 190)"}}></i>,
    expenses: <i className="fa-solid fa-arrow-trend-down" style={{color: "rgb(255, 0, 0)"}}></i>,
    balance: <i className="fa-solid fa-wallet" style={{color: "rgb(255, 212, 59)"}}></i>
};
function SummaryCard({ title, amount, className }) {
    return (
        <>
            <div className={className}>
                <div className="card-header">
                    <span className="card-icon">{icons[className]}</span>
                    <p className="container-heading">{title}</p>
                </div>
                <p className="summary-text">₹{amount}</p>
            </div>
        </>
    )
};

export default SummaryCard;