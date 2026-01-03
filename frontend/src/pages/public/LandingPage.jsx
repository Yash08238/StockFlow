import React from "react";
import { Link } from "react-router-dom";
import {
  BsBoxSeam,
  BsGraphUpArrow,
  BsShieldCheck,
  BsLightningCharge,
  BsArrowRight,
  BsCheckCircle,
  BsStarFill,
} from "react-icons/bs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import PublicLayout from "../../layouts/PublicLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

/**
 * Landing Page - SaaS-style landing with Purple theme
 */
const LandingPage = () => {
  const features = [
    {
      icon: <BsBoxSeam className="text-2xl" />,
      title: "Smart Inventory",
      description:
        "Track stock levels in real-time with automatic low-stock alerts and reorder suggestions.",
    },
    {
      icon: <BsGraphUpArrow className="text-2xl" />,
      title: "Sales Analytics",
      description:
        "Visualize revenue trends, identify top products, and make data-driven decisions.",
    },
    {
      icon: <BsLightningCharge className="text-2xl" />,
      title: "Quick Invoicing",
      description:
        "Generate professional PDF invoices instantly and email them to customers.",
    },
    {
      icon: <BsShieldCheck className="text-2xl" />,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with encrypted data storage and regular backups.",
    },
  ];

  const benefits = [
    "Real-time inventory tracking",
    "Automated low-stock alerts",
    "PDF invoice generation",
    "Sales & profit reports",
    "Multi-category management",
    "Cloud-based access",
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #3C467B 0%, #50589C 50%, #636CCB 100%)",
        }}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="/logo.png"
                alt="StockFlow"
                className="w-24 h-24 object-contain contrast-125 brightness-110 drop-shadow-2xl"
              />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-8">
              <BsStarFill className="text-yellow-400 text-sm" />
              <span className="text-sm font-medium text-white/90">
                Trusted by 500+ businesses
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The Modern ERP for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                Growing Businesses
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-indigo-200/90 mb-10 max-w-2xl mx-auto">
              Manage inventory, process sales, generate invoices, and track
              analytics — all in one powerful, easy-to-use platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="btn btn-lg group w-full sm:w-auto bg-white text-indigo-700 font-semibold hover:bg-indigo-50 shadow-lg"
              >
                Get Started
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className="btn btn-lg w-full sm:w-auto bg-white/10 text-white border border-white/20 hover:bg-white/20"
              >
                See How It Works
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-indigo-200/80 text-sm">
              <div className="flex items-center gap-2">
                <BsCheckCircle className="text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <BsCheckCircle className="text-emerald-400" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <BsCheckCircle className="text-emerald-400" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Run Your Business
            </h2>
            <p className="text-lg text-slate-600">
              Powerful features designed to streamline your operations and help
              you focus on growth.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-shadow">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Why Businesses Choose StockFlow
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Built with real business needs in mind, StockFlow helps you stay
                organized, save time, and make smarter decisions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <BsCheckCircle className="text-emerald-600 text-sm" />
                    </div>
                    <span className="text-slate-700 font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link to="/register" className="btn btn-primary btn-lg group">
                  Get Started Now
                  <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                {/* Mock Dashboard Header */}
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #3C467B 0%, #50589C 100%)",
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 text-center text-xs text-white/60">
                    dashboard.stockflow.app
                  </div>
                </div>

                {/* Mock Dashboard Content */}
                <div className="p-6 bg-slate-100">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-xs text-slate-500">Revenue</p>
                      <p className="text-lg font-bold text-slate-900">
                        ₹1,24,500
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-xs text-slate-500">Orders</p>
                      <p className="text-lg font-bold text-slate-900">156</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-xs text-slate-500">Products</p>
                      <p className="text-lg font-bold text-slate-900">48</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-sm h-32 flex items-center justify-center overflow-hidden relative">
                    <Line
                      data={{
                        labels: [
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thu",
                          "Fri",
                          "Sat",
                          "Sun",
                        ],
                        datasets: [
                          {
                            fill: true,
                            data: [12, 19, 15, 25, 22, 30, 28],
                            borderColor: "#6366f1",
                            backgroundColor: "rgba(99, 102, 241, 0.1)",
                            tension: 0.4,
                            pointRadius: 2,
                            borderWidth: 2,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { display: false },
                          tooltip: { enabled: false },
                        },
                        scales: {
                          x: { display: false },
                          y: { display: false, min: 0 },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-8 -right-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, #3C467B 0%, #50589C 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to streamline your business?
          </h2>
          <p className="text-lg text-indigo-200/80 mb-10">
            Join thousands of businesses already using StockFlow to manage their
            inventory and grow their revenue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn btn-lg group w-full sm:w-auto bg-white text-indigo-700 font-semibold hover:bg-indigo-50 shadow-lg"
            >
              Get Started
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="btn btn-lg w-full sm:w-auto bg-white/10 text-white border border-white/20 hover:bg-white/20"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;
