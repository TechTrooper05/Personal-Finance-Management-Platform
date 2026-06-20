import "./SummaryCard.css";

function SummaryCard({ title, amount, className }) {
    return (
        <>
            <div className={className}>
                <p className="container-heading">{title}</p>
                <p className="summary-text">₹{amount}</p>
            </div>
        </>
    )
};

export default SummaryCard;