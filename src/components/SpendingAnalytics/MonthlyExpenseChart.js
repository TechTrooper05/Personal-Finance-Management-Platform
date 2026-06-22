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
                    tick={{ fill: "#ffffff" }}
                    />
                    <YAxis 
                    tick={{ fill: "#ffffff" }}
                    />
                    <Tooltip contentStyle={{
                        backgroundColor: "#100007",
                        border: "1px solid #a855f7"
                    }}
                    labelStyle={{
                        color: "#ffffff"
                    }}
                    itemStyle={{
                        color: "#ffffff"
                    }}
                    />
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