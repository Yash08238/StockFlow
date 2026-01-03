import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Badge from "../components/Badge";
import {
  BsGraphUpArrow,
  BsTrophy,
  BsExclamationTriangle,
  BsCashCoin,
  BsCalendar3,
} from "react-icons/bs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Reports Page - Analytics and business insights
 * All API logic preserved - UI enhanced
 */
const Reports = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [year, setYear] = useState(String(new Date().getFullYear()));

  // Report Data States
  const [monthlyData, setMonthlyData] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [deadStock, setDeadStock] = useState([]);
  const [profitSummary, setProfitSummary] = useState(null);
  const [revenueByProduct, setRevenueByProduct] = useState([]);

  // Fetch monthly report - UNCHANGED
  const fetchMonthlyReport = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/report/monthlysales/${month}/${year}`
      );
      setMonthlyData(res.data.result);
    } catch (error) {
      console.error("Monthly report error", error);
      setMonthlyData(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch advanced reports - UNCHANGED
  const fetchAdvancedReports = async () => {
    setLoading(true);
    try {
      const [topRes, deadRes, profitRes, revenueRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/report/top-products`),
        axios.get(`${import.meta.env.VITE_API_URL}/report/dead-stock`),
        axios.get(`${import.meta.env.VITE_API_URL}/report/profit-summary`),
        axios.get(`${import.meta.env.VITE_API_URL}/report/revenue-by-product`),
      ]);

      setTopProducts(topRes.data.result || []);
      setDeadStock(deadRes.data.result || []);
      setProfitSummary(profitRes.data.result || null);
      setRevenueByProduct(revenueRes.data.result || []);
    } catch (error) {
      console.error("Advanced reports error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "monthly") {
      fetchMonthlyReport();
    } else {
      fetchAdvancedReports();
    }
  }, [month, year, activeTab]);

  // Chart styling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { family: "'Inter', sans-serif", size: 12 },
          usePointStyle: true,
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "#64748b", font: { family: "'Inter', sans-serif" } },
        grid: { color: "#f1f5f9" },
      },
      x: {
        ticks: { color: "#64748b", font: { family: "'Inter', sans-serif" } },
        grid: { display: false },
      },
    },
  };

  const barChartColors = {
    revenue: "rgba(14, 165, 233, 0.8)",
    profit: "rgba(16, 185, 129, 0.8)",
  };

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const tabs = [
    { id: "monthly", label: "Monthly Report", icon: <BsCalendar3 /> },
    { id: "products", label: "Top Products", icon: <BsTrophy /> },
    { id: "profit", label: "Profit Summary", icon: <BsCashCoin /> },
    { id: "deadstock", label: "Dead Stock", icon: <BsExclamationTriangle /> },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="page-title">Reports & Analytics</h1>
        <p className="page-subtitle">
          Business insights and performance metrics
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
              ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }
            `}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-16 text-center text-slate-500">
          <div className="animate-pulse">Loading reports...</div>
        </div>
      )}

      {/* Monthly Report Tab */}
      {!loading && activeTab === "monthly" && (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Month
                </label>
                <select
                  className="input-field !mb-0 w-40"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Year
                </label>
                <select
                  className="input-field !mb-0 w-28"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  {[2024, 2025, 2026].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Monthly Stats */}
          {monthlyData && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="kpi-card">
                  <div className="kpi-icon bg-gradient-to-br from-sky-500 to-sky-600">
                    <BsGraphUpArrow size={24} />
                  </div>
                  <div>
                    <p className="kpi-label">Total Sales</p>
                    <p className="kpi-value">{monthlyData.totalSales}</p>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-icon bg-gradient-to-br from-emerald-500 to-emerald-600">
                    <BsCashCoin size={24} />
                  </div>
                  <div>
                    <p className="kpi-label">Revenue</p>
                    <p className="kpi-value">{monthlyData.totalAmount}</p>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-icon bg-gradient-to-br from-violet-500 to-violet-600">
                    <BsTrophy size={24} />
                  </div>
                  <div>
                    <p className="kpi-label">Profit</p>
                    <p className="kpi-value">{monthlyData.profit}</p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              {monthlyData.chartData?.labels?.length > 0 && (
                <Card title="Sales by Product">
                  <div className="h-80">
                    <Bar
                      data={{
                        labels: monthlyData.chartData.labels,
                        datasets: [
                          {
                            label: "Revenue",
                            data: monthlyData.chartData.data,
                            backgroundColor: barChartColors.revenue,
                            borderRadius: 6,
                          },
                          {
                            label: "Profit",
                            data: monthlyData.chartData.profitData,
                            backgroundColor: barChartColors.profit,
                            borderRadius: 6,
                          },
                        ],
                      }}
                      options={chartOptions}
                    />
                  </div>
                </Card>
              )}
            </>
          )}

          {!monthlyData && !loading && (
            <Card>
              <div className="py-12 text-center">
                <p className="text-slate-500">No sales data for this period</p>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Top Products Tab */}
      {!loading && activeTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products List */}
          <Card title="Top 5 Selling Products" subtitle="By quantity sold">
            {topProducts.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                No sales data available
              </div>
            ) : (
              <div className="space-y-3">
                {topProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl"
                  >
                    <div
                      className={`
                      w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                      ${index === 0 ? "bg-amber-100 text-amber-700" : ""}
                      ${index === 1 ? "bg-slate-200 text-slate-700" : ""}
                      ${index === 2 ? "bg-orange-100 text-orange-700" : ""}
                      ${index > 2 ? "bg-slate-100 text-slate-500" : ""}
                    `}
                    >
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">
                        {product.productName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {product.totalQuantity} sold · ₹
                        {product.totalRevenue?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Revenue Distribution Chart */}
          <Card title="Revenue Distribution" subtitle="By product">
            {revenueByProduct.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                No revenue data available
              </div>
            ) : (
              <div className="h-64">
                <Doughnut
                  data={{
                    labels: revenueByProduct
                      .slice(0, 5)
                      .map((p) => p.productName),
                    datasets: [
                      {
                        data: revenueByProduct
                          .slice(0, 5)
                          .map((p) => p.totalRevenue),
                        backgroundColor: [
                          "rgba(14, 165, 233, 0.8)",
                          "rgba(16, 185, 129, 0.8)",
                          "rgba(139, 92, 246, 0.8)",
                          "rgba(245, 158, 11, 0.8)",
                          "rgba(239, 68, 68, 0.8)",
                        ],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: { usePointStyle: true, padding: 16 },
                      },
                    },
                  }}
                />
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Profit Summary Tab */}
      {!loading && activeTab === "profit" && profitSummary && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="kpi-card">
              <div className="kpi-icon bg-gradient-to-br from-sky-500 to-sky-600">
                <BsGraphUpArrow size={24} />
              </div>
              <div>
                <p className="kpi-label">Total Revenue</p>
                <p className="kpi-value">
                  ₹{profitSummary.totalRevenue?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon bg-gradient-to-br from-red-500 to-red-600">
                <BsCashCoin size={24} />
              </div>
              <div>
                <p className="kpi-label">Total Cost</p>
                <p className="kpi-value">
                  ₹{profitSummary.totalCost?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon bg-gradient-to-br from-emerald-500 to-emerald-600">
                <BsTrophy size={24} />
              </div>
              <div>
                <p className="kpi-label">Net Profit</p>
                <p className="kpi-value">
                  ₹{profitSummary.totalProfit?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon bg-gradient-to-br from-violet-500 to-violet-600">
                <BsCalendar3 size={24} />
              </div>
              <div>
                <p className="kpi-label">Transactions</p>
                <p className="kpi-value">
                  {profitSummary.salesCount?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Profit Margin */}
          <Card>
            <div className="text-center py-8">
              <p className="text-sm text-slate-500 mb-2">Profit Margin</p>
              <p className="text-5xl font-bold text-emerald-600">
                {profitSummary.totalRevenue > 0
                  ? (
                      (profitSummary.totalProfit / profitSummary.totalRevenue) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Dead Stock Tab */}
      {!loading && activeTab === "deadstock" && (
        <Card
          title="Dead Stock Items"
          subtitle="Products with no sales in 30+ days"
        >
          {deadStock.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <BsTrophy className="text-3xl text-emerald-600" />
              </div>
              <p className="text-slate-900 font-medium">No dead stock!</p>
              <p className="text-sm text-slate-500">
                All products are selling well
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-5 px-5">
              <table className="table-modern">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th className="text-right">Stock</th>
                    <th>Last Sold</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deadStock.map((item) => (
                    <tr key={item._id}>
                      <td className="font-medium">{item.name}</td>
                      <td className="text-slate-500">{item.category || "—"}</td>
                      <td className="text-right font-mono">{item.inventory}</td>
                      <td className="text-slate-500">
                        {item.lastSoldAt
                          ? new Date(item.lastSoldAt).toLocaleDateString()
                          : "Never"}
                      </td>
                      <td className="text-center">
                        <Badge variant="warning">
                          {item.daysSinceLastSale
                            ? `${item.daysSinceLastSale}d ago`
                            : "Never sold"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default Reports;
