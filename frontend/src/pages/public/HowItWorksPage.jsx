import React from "react";
import { Link } from "react-router-dom";
import {
  BsPersonPlus,
  BsBoxSeam,
  BsCart3,
  BsGraphUp,
  BsArrowRight,
  BsCheckLg,
} from "react-icons/bs";
import PublicLayout from "../../layouts/PublicLayout";

/**
 * How It Works Page - Visual product flow with Purple theme
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
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How StockFlow Works
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Get your business running on StockFlow in four simple steps. No
            training required – it's designed to be intuitive.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8 md:gap-16`}
              >
                {/* Visual */}
                <div className="flex-1 w-full">
                  <div
                    className={`relative bg-gradient-to-br ${step.color} rounded-2xl p-8 md:p-12 text-white shadow-xl`}
                  >
                    <span className="absolute top-4 right-4 text-6xl font-bold text-white/10">
                      {step.step}
                    </span>

                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                      {step.icon}
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {step.features.map((feature, fIndex) => (
                        <div
                          key={fIndex}
                          className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3"
                        >
                          <BsCheckLg className="text-white/80" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${step.color} text-white font-bold text-sm`}
                    >
                      {step.step}
                    </span>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                      Step {index + 1}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Create your free account and see how easy business management can
            be.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="btn btn-primary btn-lg group">
              Create Free Account
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HowItWorksPage;
