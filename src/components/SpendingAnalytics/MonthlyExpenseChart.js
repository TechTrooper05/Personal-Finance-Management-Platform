import './MonthlyExpenseChart.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function MonthlyExpenseChart({monthlyData}){
    return (
        <>
        <div className="line-graph">
            <ResponsiveContainer width="90%" height="90%">
                <LineChart data={monthlyData}>
                    <CartesianGrid 
                    stroke="#ffffff" 
                    strokeDasharray="3 3" />
                    <XAxis 
                    dataKey="month"
                    tick={{ fill: "#000000" }}
                    />
                    <YAxis 
                    tick={{ fill: "#000000" }}
                    />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="expense"
                        animationBegin={1000}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
        </>
    );
}
export default MonthlyExpenseChart;