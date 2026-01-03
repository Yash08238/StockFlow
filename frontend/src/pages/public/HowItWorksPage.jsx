import React from "react";
import { Link } from "react-router-dom";
import {
  BsPersonPlus,
  BsBoxSeam,
  BsCart3,
  BsGraphUp,
  BsArrowRight,
  BsCheckLg,
  BsPlayCircle,
} from "react-icons/bs";
import PublicLayout from "../../layouts/PublicLayout";

/**
 * How It Works Page - Visual product flow with Premium Purple theme
 */
const HowItWorksPage = () => {
  const steps = [
    {
      step: "01",
      icon: <BsPersonPlus className="text-3xl" />,
      title: "Create Your Account",
      description:
        "Sign up in seconds with email or Google. Set up your business profile and you're ready to go.",
      color: "from-indigo-500 to-indigo-600",
      features: ["Free to start", "Google sign-in", "Secure authentication"],
    },
    {
      step: "02",
      icon: <BsBoxSeam className="text-3xl" />,
      title: "Add Your Products",
      description:
        "Upload your product catalog with images, prices, and stock levels. Capture product photos directly from your camera.",
      color: "from-purple-500 to-purple-600",
      features: [
        "Camera capture",
        "Category management",
        "Low-stock thresholds",
      ],
    },
    {
      step: "03",
      icon: <BsCart3 className="text-3xl" />,
      title: "Process Sales",
      description:
        "Create sales with our intuitive POS interface. Auto-generate invoices and email them to customers instantly.",
      color: "from-violet-500 to-violet-600",
      features: ["Quick checkout", "PDF invoices", "Email receipts"],
    },
    {
      step: "04",
      icon: <BsGraphUp className="text-3xl" />,
      title: "Analyze & Grow",
      description:
        "Track revenue, monitor profit margins, identify top products, and make data-driven decisions.",
      color: "from-fuchsia-500 to-fuchsia-600",
      features: ["Revenue reports", "Profit tracking", "Dead stock alerts"],
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28"
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-8 backdrop-blur-sm">
            <BsPlayCircle className="text-indigo-300 text-sm" />
            <span className="text-sm font-medium text-white/90">
              See it in action
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            How StockFlow
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
              Powers Your Business
            </span>
          </h1>

          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get up and running in minutes. Our intuitive platform simplifies
            every step of your business operations, from inventory to invoicing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn btn-lg group w-full sm:w-auto bg-white text-indigo-700 font-semibold hover:bg-indigo-50 shadow-lg shadow-indigo-900/20"
            >
              Start for Free
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24 md:space-y-32">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-12 lg:gap-20`}
              >
                {/* Visual */}
                <div className="flex-1 w-full">
                  <div className="relative group perspective-1000">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    />
                    <div
                      className={`relative bg-gradient-to-br ${step.color} rounded-3xl p-8 md:p-12 text-white shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500`}
                    >
                      <span className="absolute top-6 right-6 text-8xl font-bold text-white/5 font-sans pointer-events-none select-none">
                        {step.step}
                      </span>

                      <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 border border-white/10 shadow-inner">
                        {step.icon}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {step.features.map((feature, fIndex) => (
                          <div
                            key={fIndex}
                            className="flex items-center gap-4 bg-black/10 rounded-xl px-5 py-4 border border-white/5 backdrop-blur-sm"
                          >
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                              <BsCheckLg className="text-white text-xs" />
                            </div>
                            <span className="font-medium tracking-wide">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full lg:py-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} text-white font-bold text-lg shadow-lg`}
                    >
                      {step.step}
                    </span>
                    <span className="h-px flex-1 bg-slate-200"></span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                    {step.title}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {step.description}
                  </p>

                  <ul className="space-y-4">
                    {step.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center gap-3 text-slate-700 font-medium"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`}
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Ready to streamline your business?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses using StockFlow to manage their
            inventory and sales efficiently.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn btn-primary btn-lg group shadow-xl shadow-indigo-500/20"
            >
              Create Free Account
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 rounded-xl font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HowItWorksPage;
