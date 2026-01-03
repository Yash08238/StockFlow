import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BsSearch,
  BsDownload,
  BsReceipt,
  BsFileEarmarkPdf,
  BsCalendar3,
  BsFunnel,
} from "react-icons/bs";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Input from "../components/Input";
import EmptyState from "../components/EmptyState";

/**
 * Bills Page - Transaction history with Purple theme
 */
const Bills = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/sales/show`);
      setSales(res.data.result || []);
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.customer?.toLowerCase().includes(search.toLowerCase()) ||
      sale.product?.productName?.toLowerCase().includes(search.toLowerCase());

    if (dateFilter === "all") return matchesSearch;

    const saleDate = new Date(sale.date);
    const today = new Date();
    const diffDays = Math.ceil((today - saleDate) / (1000 * 60 * 60 * 24));

    switch (dateFilter) {
      case "today":
        return matchesSearch && diffDays <= 1;
      case "week":
        return matchesSearch && diffDays <= 7;
      case "month":
        return matchesSearch && diffDays <= 30;
      default:
        return matchesSearch;
    }
  });

  const getOrderStatus = (sale) => {
    if (sale.pdfUrl) return { label: "Completed", variant: "success" };
    return { label: "Processing", variant: "warning" };
  };

  const totalRevenue = sales.reduce((acc, s) => acc + (s.amount || 0), 0);
  const todaySales = sales.filter(
    (s) => new Date(s.date).toDateString() === new Date().toDateString()
  );
  const todayRevenue = todaySales.reduce((acc, s) => acc + (s.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Billing & Invoices</h1>
        <p className="page-subtitle">
          View transaction history and download invoices
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="kpi-card">
          <div className="kpi-icon bg-gradient-to-br from-indigo-500 to-indigo-600">
            <BsReceipt size={24} />
          </div>
          <div>
            <p className="kpi-label">Total Orders</p>
            <p className="kpi-value">{sales.length}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon bg-gradient-to-br from-purple-500 to-purple-600">
            <BsFileEarmarkPdf size={24} />
          </div>
          <div>
            <p className="kpi-label">Total Revenue</p>
            <p className="kpi-value">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon bg-gradient-to-br from-violet-500 to-violet-600">
            <BsCalendar3 size={24} />
          </div>
          <div>
            <p className="kpi-label">Today</p>
            <p className="kpi-value">₹{todayRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search by customer or product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<BsSearch />}
            />
          </div>
          <div className="flex items-center gap-3">
            <BsFunnel className="text-slate-400 hidden sm:block" />
            <select
              className="input-field !mb-0 w-full sm:w-auto min-w-[140px]"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card padding={false}>
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <div className="animate-pulse">Loading transactions...</div>
          </div>
        ) : filteredSales.length === 0 ? (
          <EmptyState
            icon={<BsReceipt className="text-3xl text-slate-400" />}
            title={
              sales.length === 0 ? "No transactions yet" : "No matches found"
            }
            description={
              sales.length === 0
                ? "Process your first sale to see it here"
                : "Try adjusting your search or filter"
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th className="text-center">Qty</th>
                  <th className="text-right">Amount</th>
                  <th>Date</th>
                  <th className="text-center">Status</th>
                  <th className="text-center w-24">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => {
                  const status = getOrderStatus(sale);
                  return (
                    <tr key={sale._id}>
                      <td>
                        <div>
                          <p className="font-medium text-slate-900">
                            {sale.customer}
                          </p>
                          <p className="text-xs text-slate-400 truncate max-w-[200px]">
                            {sale.customermail}
                          </p>
                        </div>
                      </td>
                      <td className="text-slate-700">
                        {sale.product?.productName || "N/A"}
                      </td>
                      <td className="text-center font-mono">{sale.quantity}</td>
                      <td className="text-right font-semibold">
                        ₹{sale.amount?.toLocaleString()}
                      </td>
                      <td className="text-slate-500">
                        {new Date(sale.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="text-center">
                        <Badge variant={status.variant} dot>
                          {status.label}
                        </Badge>
                      </td>
                      <td className="text-center">
                        {sale.pdfUrl ? (
                          <a
                            href={sale.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                            title="View/Download Invoice"
                          >
                            <BsDownload />
                            Download
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Bills;
