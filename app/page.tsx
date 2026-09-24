"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState("Good");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-900">

      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute left-[8%] top-[12%] h-28 w-28 rounded-full bg-blue-200/30 blur-2xl" />

        <div className="absolute right-[10%] top-[18%] h-36 w-36 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="absolute bottom-[8%] left-[42%] h-40 w-40 rounded-full bg-purple-200/25 blur-3xl" />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(#94a3b8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

      </div>

      <div className="relative flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200/80 bg-white/85 p-6 backdrop-blur">

          <div className="mb-10 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white shadow-md">
              V
            </div>

            <div>
              <h1 className="font-serif text-2xl font-semibold tracking-tight">
                Veritas
              </h1>

              <p className="text-xs text-slate-500">
                Product-Proof Intelligence
              </p>
            </div>

          </div>

          <nav className="space-y-2">

            <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium">
              Dashboard
            </div>

            <Link
              href="/claim-check"
              className="block rounded-xl px-4 py-3 text-sm text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              New Claim Check
            </Link>

            <div className="rounded-xl px-4 py-3 text-sm text-slate-500">
              Evaluations
            </div>

            <div className="rounded-xl px-4 py-3 text-sm text-slate-500">
              Proof Library
            </div>

            <div className="rounded-xl px-4 py-3 text-sm text-slate-500">
              Settings
            </div>

          </nav>

        </aside>

        {/* Main */}
        <section className="flex-1 p-10">

          <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="mb-10 flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Product-Proof Intelligence
                </p>

                <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight">
                  {greeting}!
                </h2>

                <p className="mt-2 text-slate-500">
                  Verify product claims before they reach the market.
                </p>

              </div>

              <Link
                href="/claim-check"
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
              >
                + Start New Claim Check
              </Link>

            </div>

            {/* Status cards */}
            <div className="grid grid-cols-3 gap-5">

              <StatusCard
                title="Supported"
                value="12"
                description="Claims with sufficient evidence"
                colour="text-green-600"
              />

              <StatusCard
                title="Review Required"
                value="4"
                description="Claims needing further review"
                colour="text-amber-500"
              />

              <StatusCard
                title="Insufficient Evidence"
                value="2"
                description="Claims lacking required evidence"
                colour="text-red-500"
              />

            </div>

            {/* Recent evaluations */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/95 shadow-sm">

              <div className="border-b border-slate-200 p-6">

                <h3 className="font-semibold">
                  Recent Evaluations
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Recent product claims reviewed by Veritas.
                </p>

              </div>

              <Evaluation
                product="Protein+ Chocolate Bar"
                claim="High Protein"
                status="Supported"
                colour="green"
              />

              <Evaluation
                product="Oat Energy Drink"
                claim="Source of Fibre"
                status="Review Required"
                colour="amber"
              />

              <Evaluation
                product="Low Sugar Cookies"
                claim="Low Sugar"
                status="Insufficient Evidence"
                colour="red"
              />

            </div>

            {/* FSSAI reference */}
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Regulatory Reference
                </p>

                <h3 className="mt-1 font-semibold">
                  FSSAI Product Standards
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Public reference source for food standards and regulatory
                  criteria.
                </p>

              </div>

              <a
                href="https://www.fssai.gov.in/standards/product-standards"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                View FSSAI →
              </a>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

function StatusCard({
  title,
  value,
  description,
  colour,
}: {
  title: string;
  value: string;
  description: string;
  colour: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className={`mt-2 text-3xl font-semibold ${colour}`}>
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}

function Evaluation({
  product,
  claim,
  status,
  colour,
}: {
  product: string;
  claim: string;
  status: string;
  colour: "green" | "amber" | "red";
}) {
  const styles = {
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-100 p-5 transition hover:bg-slate-50">

      <div>
        <p className="font-medium">
          {product}
        </p>

        <p className="text-sm text-slate-500">
          {claim}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${styles[colour]}`}
      >
        {status}
      </span>

    </div>
  );
}