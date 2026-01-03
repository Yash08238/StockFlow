import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BsCurrencyRupee,
  BsBoxSeam,
  BsCart3,
  BsExclamationTriangle,
  BsArrowRight,
  BsPlus,
  BsGraphUp,
  BsLightning,
  BsGraphUpArrow,
  BsClock,
  BsArrowUpRight,
} from "react-icons/bs";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";

/**
 * Dashboard - Executive-level overview with Purple theme
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [stats, setStats] = useState({
    products: 0,
    sales: 0,
    revenue: 0,
    lowStock: 0,
  });
  const [recentSales, setRecentSales] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, salesRes, notifRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/products/getproducts`),
        axios.get(`${import.meta.env.VITE_API_URL}/sales/show`),
        axios.get(`${import.meta.env.VITE_API_URL}/notifications`),
      ]);

      const products = productsRes.data.result || [];
      const sales = salesRes.data.result || [];
      const notifs =
        notifRes.data.result?.notifications || notifRes.data.result || [];

      const revenue = sales.reduce((acc, sale) => acc + (sale.amount || 0), 0);
      const lowStockCount = products.filter(
        (p) => p.inventory < (p.minThreshold || 10)
      ).length;

      setStats({
        products: products.length,
        sales: sales.length,
        revenue,
        lowStock: lowStockCount,
      });

      setRecentSales(
        [...sales]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5)
      );
      setNotifications(notifs.slice(0, 4));
    } catch (error) {
      console.error("Dashboard Error", error);
    } finally {
      setLoading(false);
    }
  };

  const isNewBusiness = !loading && stats.products === 0 && stats.sales === 0;

  // Empty Business Welcome Screen
  if (isNewBusiness) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
            <BsLightning className="text-5xl text-white" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Welcome to StockFlow, {user?.username || "there"}!
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Your dashboard is ready. Let's set up your business in just a few
            steps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/inventory")}
              className="w-full sm:w-auto"
            >
              <BsPlus className="text-xl" />
              Add Your First Product
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/categories")}
              className="w-full sm:w-auto"
            >
              Set Up Categories
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <BsBoxSeam />,
                title: "Add Products",
                desc: "Upload with images",
                color: "from-indigo-500 to-indigo-600",
              },
              {
                icon: <BsCart3 />,
                title: "Process Sales",
                desc: "Generate invoices",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: <BsGraphUp />,
                title: "Track Growth",
                desc: "View analytics",
                color: "from-violet-500 to-violet-600",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-left"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-3`}
                >
                  {step.icon}
                </div>
                <p className="font-semibold text-slate-900">{step.title}</p>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Good{" "}
            {new Date().getHours() < 12
              ? "Morning"
              : new Date().getHours() < 18
              ? "Afternoon"
              : "Evening"}
            , {user?.username || "there"}!
          </h1>
          <p className="text-slate-500 mt-1">
            Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/sales">
            <Button variant="primary">
              <BsPlus className="text-lg" />
              New Sale
            </Button>
          </Link>
          <Link to="/reports">
            <Button variant="secondary">View Reports</Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue - Hero Card */}
        <div
          className="rounded-2xl p-5 text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #3C467B 0%, #50589C 100%)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
              <BsCurrencyRupee size={24} />
            </div>
            <div className="flex items-center gap-1 text-emerald-300 text-sm font-medium">
              <BsGraphUpArrow />
              <span>+12%</span>
            </div>
          </div>
          <p className="text-indigo-200 text-sm font-medium">Total Revenue</p>
          <p className="text-3xl font-bold mt-1">
            ₹{loading ? "—" : stats.revenue.toLocaleString()}
          </p>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <BsCart3 size={22} />
            </div>
            <Link to="/bills" className="text-slate-400 hover:text-slate-600">
              <BsArrowUpRight />
            </Link>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Orders</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            {loading ? "—" : stats.sales.toLocaleString()}
          </p>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <BsBoxSeam size={22} />
            </div>
            <Link
              to="/inventory"
              className="text-slate-400 hover:text-slate-600"
            >
              <BsArrowUpRight />
            </Link>
          </div>
          <p className="text-slate-500 text-sm font-medium">Products</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            {loading ? "—" : stats.products.toLocaleString()}
          </p>
        </div>

        {/* Low Stock */}
        <div
          className={`rounded-2xl border p-5 shadow-sm ${
            stats.lowStock > 0
              ? "bg-amber-50 border-amber-200"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                stats.lowStock > 0
                  ? "bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-500/20"
                  : "bg-gradient-to-br from-slate-400 to-slate-500 shadow-slate-500/20"
              } text-white`}
            >
              <BsExclamationTriangle size={22} />
            </div>
            <Link
              to="/inventory"
              className="text-slate-400 hover:text-slate-600"
            >
              <BsArrowUpRight />
            </Link>
          </div>
          <p
            className={`text-sm font-medium ${
              stats.lowStock > 0 ? "text-amber-700" : "text-slate-500"
            }`}
          >
            Low Stock
          </p>
          <p
            className={`text-3xl font-bold mt-1 ${
              stats.lowStock > 0 ? "text-amber-800" : "text-slate-900"
            }`}
          >
            {loading ? "—" : stats.lowStock}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <div className="lg:col-span-2">
          <Card
            title="Recent Transactions"
            subtitle="Latest sales activity"
            action={
              <Link to="/bills">
                <Button variant="ghost" size="sm">
                  View All <BsArrowRight />
                </Button>
              </Link>
            }
          >
            {loading ? (
              <div className="py-8 text-center text-slate-500">
                <div className="animate-pulse">Loading...</div>
              </div>
            ) : recentSales.length === 0 ? (
              <EmptyState
                title="No sales yet"
                description="Process your first sale to see activity here."
                actionLabel="New Sale"
                onAction={() => navigate("/sales")}
              />
            ) : (
              <div className="space-y-3">
                {recentSales.map((sale, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                        <BsCart3 />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {sale.customer}
                        </p>
                        <p className="text-sm text-slate-500">
                          {sale.product?.productName || "Product"} ×{" "}
                          {sale.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">
                        ₹{sale.amount?.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                        <BsClock />
                        {new Date(sale.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <Card title="Quick Actions">
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: <BsPlus size={20} />,
                  label: "Add Product",
                  path: "/inventory",
                  color: "from-indigo-500 to-indigo-600",
                },
                {
                  icon: <BsCart3 size={18} />,
                  label: "New Sale",
                  path: "/sales",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  icon: <BsGraphUp size={18} />,
                  label: "Reports",
                  path: "/reports",
                  color: "from-violet-500 to-violet-600",
                },
                {
                  icon: <BsBoxSeam size={18} />,
                  label: "Restock",
                  path: "/supply",
                  color: "from-fuchsia-500 to-fuchsia-600",
                },
              ].map((action, i) => (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow`}
                  >
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card
            title="Alerts"
            action={
              <Link to="/notifications">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            }
          >
            {loading ? (
              <div className="py-6 text-center text-slate-500">
                <div className="animate-pulse">Loading...</div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <BsExclamationTriangle className="text-xl text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-slate-900">
                  All systems normal
                </p>
                <p className="text-xs text-slate-500">No alerts at this time</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notifications.map((notif, i) => (
                  <div
                    key={notif._id || i}
                    className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                      <BsExclamationTriangle className="text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {notif.message || "Low Stock Alert"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {notif.createdAt
                          ? new Date(notif.createdAt).toLocaleDateString()
                          : "Just now"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
