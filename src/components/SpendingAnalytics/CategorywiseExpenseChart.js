import './CategorywiseExpenseChart.css';
import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
    ResponsiveContainer
} from "recharts";

function CategorywiseExpenseChart({categoryData}) {
    const pieChartData = Object.entries(categoryData).map(
        ([category, amount]) => ({
            category,
            amount
        })
    );
    const category_colors = {
        Food: "#51E5FF",
        Transportation: "#a140fc",
        Shopping: "#EC368D",
        Entertainment: "#FFA5A5",
        Bills: "#FFD6C0",
        Healthcare: "#8AC926",
        Education: "#FFCA3A",
        Other: "#1982C4"
    }
    return (
        <div className="pie-chart">
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <PieChart>
                    <Pie
                        data={pieChartData}
                        dataKey="amount"
                        nameKey="category"
                        outerRadius={120}
                        label
                        animationBegin={2000}
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={
                                    category_colors[entry.category]
                                    || "#94A3B8"
                                }
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
export default CategorywiseExpenseChart;