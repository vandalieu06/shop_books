import { Card, CardHeader, CardTitle, CardContent } from "./card";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const OrdersChart = ({ data = [] }) => {
	if (!data || data.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Monthly Orders</CardTitle>
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
				<CardTitle className="text-lg">Monthly Orders</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="h-[300px]">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={data}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis allowDecimals={false} />
							<Tooltip />
							<Bar dataKey="count" fill="#3b82f6" />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default OrdersChart;
