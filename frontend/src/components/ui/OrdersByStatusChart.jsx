import { Card, CardHeader, CardTitle, CardContent } from "./card";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from "recharts";

const STATUS_COLORS = {
	Pending: "#eab308",
	Paid: "#3b82f6",
	Shipped: "#a855f7",
	Delivered: "#22c55e",
	Cancelled: "#ef4444",
};

const OrdersByStatusChart = ({ data = {} }) => {
	const chartData = Object.entries(data || {}).map(([status, count]) => ({
		status,
		count,
	}));

	if (chartData.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Orders by Status</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-[300px] flex items-center justify-center text-gray-500">
						No data available
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Orders by Status</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-[300px]">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={chartData}
							layout="vertical"
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" horizontal={false} />
							<XAxis type="number" allowDecimals={false} />
							<YAxis
								type="category"
								dataKey="status"
								width={80}
								tick={{ fontSize: 12 }}
							/>
							<Tooltip />
							<Bar
								dataKey="count"
								name="Orders"
								radius={[0, 4, 4, 0]}
							>
								{chartData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={STATUS_COLORS[entry.status] || "#6b7280"}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default OrdersByStatusChart;
