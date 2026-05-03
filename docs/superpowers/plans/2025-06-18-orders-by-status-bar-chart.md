# Orders by Status Bar Chart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the tags-based "Orders by Status" display in the admin dashboard with a horizontal bar chart showing order counts per status.

**Architecture:** Create a reusable `OrdersByStatusChart` component using Recharts BarChart (horizontal orientation), integrate it into Dashboard.jsx by replacing the existing tags Card, leveraging existing `ordersByStatus` data from the backend API.

**Tech Stack:** React, Recharts (3.8.0), Tailwind CSS, existing Card UI components

---

## Task 1: Create OrdersByStatusChart Component

**Files:**
- Create: `frontend/src/components/ui/OrdersByStatusChart.jsx`

- [ ] **Step 1: Write the component file**

Create `frontend/src/components/ui/OrdersByStatusChart.jsx` with the following content:

```jsx
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
								(name="Orders")
								radius={[0, 4, 4, 0]}
								dot
							>
								{chartData.map((entry, index) => (
									<Bar
										key={`bar-${index}`}
										dataKey="count"
										fill={STATUS_COLORS[entry.status] || "#6b7280"}
										radius={[0, 4, 4, 0]}
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
```

- [ ] **Step 2: Verify file was created correctly**

Run: `ls -la frontend/src/components/ui/OrdersByStatusChart.jsx`
Expected: File exists with size > 0

- [ ] **Step 3: Commit**

```bash
cd /home/jhonny/dev/projects/shop_books
git add frontend/src/components/ui/OrdersByStatusChart.jsx
git commit -m "feat: add OrdersByStatusChart component with horizontal bar chart"
```

---

## Task 2: Update Dashboard to Use the Chart

**Files:**
- Modify: `frontend/src/pages/admin/Dashboard.jsx:111-127` (replace the "Orders by Status" Card section)

- [ ] **Step 1: Remove unused import and add new component import**

In `frontend/src/pages/admin/Dashboard.jsx`, line 3 has `BookOpen` imported but never used — remove it. Add `OrdersByStatusChart` import.

Edit the imports section:

```jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, ShoppingCart, TrendingUp, Package, ArrowRight } from "lucide-react";
import { adminApi } from "../../api";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import OrdersChart from "../../components/ui/OrdersChart";
import OrdersByStatusChart from "../../components/ui/OrdersByStatusChart";
```

Changes:
- Remove `BookOpen` from lucide-react import
- Add `OrdersByStatusChart` import

- [ ] **Step 2: Replace "Orders by Status" Card section**

Remove lines 111-127 (the existing Card with tags) and replace with the chart component:

```jsx
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<OrdersChart data={metrics?.monthlyOrders || []} />
				<OrdersByStatusChart data={metrics?.ordersByStatus || {}} />
			</div>
```

The full structure after replacement:

```jsx
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<OrdersChart data={metrics?.monthlyOrders || []} />
				<OrdersByStatusChart data={metrics?.ordersByStatus || {}} />
			</div>
```

- [ ] **Step 3: Commit**

```bash
cd /home/jhonny/dev/projects/shop_books
git add frontend/src/pages/admin/Dashboard.jsx
git commit -m "feat: replace status tags with OrdersByStatusChart bar chart"
```

---

## Task 3: Verify Linting and Build

- [ ] **Step 1: Run ESLint on modified files**

Run: `cd frontend && pnpm run lint`
Expected: No new errors in modified files; pre-existing errors may remain

- [ ] **Step 2: Check TypeScript/import resolution (if applicable)**

Run: `cd frontend && pnpm exec tsc --noEmit` (if TypeScript is used) or verify Vite dev server starts without import errors.
Expected: No module resolution errors for new component

- [ ] **Step 3: Run build to verify compilation**

Run: `cd frontend && pnpm run build`
Expected: Successful build with no errors

- [ ] **Step 4: Commit if build succeeds**

```bash
cd /home/jhonny/dev/projects/shop_books
git add .
git commit -m "build: verify orders by status chart integration"
```

---

## Task 4: Manual Testing Checklist

**Files:**
- Test manually: `frontend/src/pages/admin/Dashboard.jsx`

- [ ] **Step 1: Start development server**

```bash
cd frontend
pnpm run dev
```
Expected: Dev server starts on http://localhost:xxxx

- [ ] **Step 2: Navigate to admin dashboard**

Open browser to admin dashboard route (e.g., `/admin` or login as admin).
Expected: Dashboard loads without errors

- [ ] **Step 3: Verify Orders by Status card displays**

Check that:
- A card titled "Orders by Status" appears next to the Monthly Orders chart
- It shows a horizontal bar chart (status on Y-axis, count on X-axis)
- Bars are colored according to status (Pending=yellow, Paid=blue, Shipped=purple, Delivered=green, Cancelled=red)
- Tooltip appears on hover showing exact count
- Bars render left-to-right in order of status values from data

- [ ] **Step 4: Verify empty state**

If there are no orders in the system:
- Chart area shows "No data available" centered message
- No console errors

- [ ] **Step 5: Verify responsive layout**

Resize browser window:
- On mobile (single column): charts stack vertically
- On desktop (2-column grid): charts sit side-by-side
- Chart remains readable, no overflow or clipping

- [ ] **Step 6: Check console for errors**

Open browser DevTools Console.
Expected: No React errors, no Recharts warnings, no 404s for the new component

- [ ] **Step 7: Commit manual test results**

```bash
git add .
git commit -m "test: verify OrdersByStatusChart renders correctly on dashboard"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Replace tags display with bar chart
- [x] Horizontal bar chart with status on Y-axis
- [x] Color-coded bars per status
- [x] Responsive layout alongside Monthly Orders chart
- [x] Empty state handling

**No placeholders:** All code is explicit, file paths exact, commands complete.

**Type consistency:** `data` prop is `{ [status: string]: number }` object matching `ordersByStatus` from backend; chart transforms to `{ status, count }[]` array. Consistent across component and Dashboard usage.

---

## Plan Handoff Summary

**Files created:** `frontend/src/components/ui/OrdersByStatusChart.jsx`

**Files modified:** `frontend/src/pages/admin/Dashboard.jsx`

**Dependencies used:** Recharts (already in package.json), Card components (existing)

**Estimated effort:** ~20 minutes (4 tasks × 5 steps, simple UI change)

**Plan saved to:** `docs/superpowers/plans/2025-06-18-orders-by-status-bar-chart.md`
