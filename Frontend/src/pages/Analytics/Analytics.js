import './Analytics.css';
import FinancialOverview from '../../components/FinancialOverview/FinancialOverview';
import SpendingAnalytics from '../../components/SpendingAnalytics/SpendingAnalytics';
function Analytics({transactions}) {
    return (
        <>
        <div className="analytics-page">
            <div className="financial-overview-container">
                <FinancialOverview transactions={transactions}/>
            </div>
            <div className="spending-analytics-container">
                <SpendingAnalytics transactions={transactions}/>
            </div>
        </div>
        </>
    );
};
export default Analytics;