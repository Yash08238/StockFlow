import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import EmptyState from "../components/EmptyState";
import {
  BsBell,
  BsExclamationTriangle,
  BsGraphDown,
  BsArchive,
  BsCheckAll,
  BsInfoCircle,
  BsArrowRepeat,
} from "react-icons/bs";

/**
 * Notifications Page - System alerts and low stock warnings
 * All API logic preserved - UI enhanced
 */
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications - UNCHANGED
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/notifications`
      );
      setNotifications(res.data.result?.notifications || []);
      setUnreadCount(res.data.result?.unreadCount || 0);
    } catch (error) {
      console.error("Fetch error", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  // Mark as read - UNCHANGED
  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/read/${id}`
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Mark as read error", error);
    }
  };

  // Mark all as read - UNCHANGED
  const markAllAsRead = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/notifications/read-all`);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Mark all as read error", error);
      toast.error("Failed to mark all as read");
    }
  };

  const getNotificationConfig = (type) => {
    switch (type) {
      case "LOW_STOCK":
        return {
          icon: <BsExclamationTriangle />,
          color: "from-amber-500 to-amber-600",
          bg: "bg-amber-50",
          label: "Low Stock",
          variant: "warning",
        };
      case "FORECAST_WARNING":
        return {
          icon: <BsGraphDown />,
          color: "from-violet-500 to-violet-600",
          bg: "bg-violet-50",
          label: "Forecast",
          variant: "info",
        };
      case "DEAD_STOCK":
        return {
          icon: <BsArchive />,
          color: "from-slate-500 to-slate-600",
          bg: "bg-slate-100",
          label: "Dead Stock",
          variant: "neutral",
        };
      case "RESTOCK_REMINDER":
        return {
          icon: <BsArrowRepeat />,
          color: "from-sky-500 to-sky-600",
          bg: "bg-sky-50",
          label: "Restock",
          variant: "info",
        };
      case "SYSTEM":
      default:
        return {
          icon: <BsInfoCircle />,
          color: "from-emerald-500 to-emerald-600",
          bg: "bg-emerald-50",
          label: "System",
          variant: "success",
        };
    }
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white">
              <BsBell size={22} />
            </div>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="page-title">Notifications</h1>
            <p className="page-subtitle">
              Alerts, warnings, and system updates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="input-field !mb-0 w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="unread">Unread ({unreadCount})</option>
          </select>
          {unreadCount > 0 && (
            <Button variant="secondary" onClick={markAllAsRead}>
              <BsCheckAll />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <Card padding={false}>
        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <div className="animate-pulse">Loading notifications...</div>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <EmptyState
            icon={<BsBell className="text-3xl text-slate-400" />}
            title={
              filter === "unread"
                ? "No unread notifications"
                : "No notifications"
            }
            description="You're all caught up! Alerts will appear here."
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notif) => {
              const config = getNotificationConfig(notif.type);
              return (
                <div
                  key={notif._id}
                  onClick={() => !notif.isRead && markAsRead(notif._id)}
                  className={`
                    flex items-start gap-4 p-4 cursor-pointer transition-colors
                    ${!notif.isRead ? config.bg : "hover:bg-slate-50"}
                    ${!notif.isRead ? "border-l-4 border-sky-500" : ""}
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white shrink-0`}
                  >
                    {config.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={config.variant} size="sm">
                        {config.label}
                      </Badge>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-sky-500" />
                      )}
                    </div>
                    <p
                      className={`text-slate-800 ${
                        !notif.isRead ? "font-medium" : ""
                      }`}
                    >
                      {notif.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Notifications;
