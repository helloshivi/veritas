"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [evidence, setEvidence] = useState<any>(null);

  useEffect(() => {
    const savedProduct = localStorage.getItem("veritasClaim");
    const savedEvidence = localStorage.getItem("veritasEvidence");

    if (savedProduct) {
      setProduct(JSON.parse(savedProduct));
    }

    if (savedEvidence) {
      setEvidence(JSON.parse(savedEvidence));
    }
  }, []);

  /* Missing data */
  if (
    !product ||
    !product.productName ||
    !product.claim ||
    !product.protein ||
    !product.sugar ||
    !product.fibre ||
    !evidence?.uploaded
  ) {
    return (
      <main className="min-h-screen bg-slate-50 p-10">

        <div className="mx-auto max-w-2xl pt-20 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-2xl text-amber-600">
            !
          </div>

          <h1 className="mt-6 font-serif text-3xl font-semibold text-slate-900">
            Not Enough Input
          </h1>

          <p className="mt-3 leading-7 text-slate-500">
            Veritas needs product details, a proposed claim, nutrition data
            and supporting evidence before it can generate a decision.
          </p>

          <button
            onClick={() => router.push("/claim-check")}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white"
          >
            Start a Claim Check →
          </button>

        </div>

      </main>
    );
  }

  const productName = product.productName;
  const claim = product.claim;
  const protein = Number(product.protein);
  const sugar = Number(product.sugar);
  const fibre = Number(product.fibre);

  const normalisedClaim = claim.toLowerCase().trim();

  let decision = "REVIEW REQUIRED";
  let decisionColour = "amber";
  let decisionReason =
    "Veritas could not confidently support this claim using the configured demo rules.";

  let ruleText = "Claim requires human review.";

  if (normalisedClaim.includes("high protein")) {
    ruleText = "Demo rule: protein ≥ 20 g and sugar ≤ 20 g.";

    if (protein >= 20 && sugar <= 20) {
      decision = "SUPPORTED";
      decisionColour = "green";
      decisionReason =
        "The available product data satisfies the configured demo screening rule.";
    } else {
      decision = "REVIEW REQUIRED";
      decisionColour = "amber";
      decisionReason =
        "The available nutrition data does not satisfy the configured demo screening rule.";
    }
  } else if (normalisedClaim.includes("low sugar")) {
    ruleText = "Demo rule: sugar ≤ 5 g.";

    if (sugar <= 5) {
      decision = "SUPPORTED";
      decisionColour = "green";
      decisionReason =
        "The available product data satisfies the configured demo screening rule.";
    } else {
      decision = "REVIEW REQUIRED";
      decisionColour = "amber";
      decisionReason =
        "The entered sugar value is above the configured demo screening threshold.";
    }
  } else if (
    normalisedClaim.includes("source of fibre") ||
    normalisedClaim.includes("high fibre") ||
    normalisedClaim.includes("fiber")
  ) {
    ruleText = "Demo rule: fibre ≥ 3 g.";

    if (fibre >= 3) {
      decision = "SUPPORTED";
      decisionColour = "green";
      decisionReason =
        "The available product data satisfies the configured demo screening rule.";
    } else {
      decision = "REVIEW REQUIRED";
      decisionColour = "amber";
      decisionReason =
        "The available fibre value does not satisfy the configured demo screening rule.";
    }
  }

  const isSupported = decision === "SUPPORTED";

  return (
    <main className="min-h-screen bg-slate-50 p-10">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div>

          <p className="text-sm font-medium text-slate-500">
            Veritas Analysis
          </p>

          <h1 className="mt-2 font-serif text-4xl font-semibold text-slate-900">
            Product-Proof Analysis
          </h1>

          <p className="mt-2 text-slate-500">
            Veritas has analysed the proposed claim against the available
            product evidence.
          </p>

        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-3 gap-5">

          <SummaryCard
            label="Product"
            value={productName}
          />

          <SummaryCard
            label="Proposed Claim"
            value={claim}
          />

          <SummaryCard
            label="Evidence"
            value="Available"
            green
          />

        </div>

        {/* Proof Graph */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Proof Graph
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                How Veritas connects the claim to product evidence.
              </p>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-xs font-medium ${
                isSupported
                  ? "bg-green-50 text-green-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              Analysis Complete
            </span>

          </div>

          <div className="mt-8 flex items-center justify-between gap-3">

            <GraphNode
              title="CLAIM"
              value={claim}
            />

            <Arrow />

            <GraphNode
              title="RULE"
              value="Claim criterion"
            />

            <Arrow />

            <GraphNode
              title="PRODUCT DATA"
              value={`P ${protein}g • S ${sugar}g • F ${fibre}g`}
            />

            <Arrow />

            <GraphNode
              title="EVIDENCE"
              value="Nutrition evidence"
            />

            <Arrow />

            <GraphNode
              title="DECISION"
              value={decision === "SUPPORTED" ? "Supported" : "Review"}
              success={isSupported}
            />

          </div>

        </div>

        {/* Analysis + Decision */}
        <div className="mt-8 grid grid-cols-2 gap-6">

          {/* Analysis */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Evidence Analysis
            </h2>

            <div className="mt-6 space-y-5">

              <AnalysisStep
                title="Claim identified"
                text={`Detected proposed claim: "${claim}"`}
              />

              <AnalysisStep
                title="Rule identified"
                text={ruleText}
              />

              <AnalysisStep
                title="Product data extracted"
                text={`Protein: ${protein} g • Sugar: ${sugar} g • Fibre: ${fibre} g`}
              />

              <AnalysisStep
                title="Evidence matched"
                text="Structured nutrition evidence is available."
              />

            </div>

          </div>

          {/* Decision */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Veritas Decision
            </p>

            <div
              className={`mt-5 rounded-xl p-6 ${
                isSupported ? "bg-green-50" : "bg-amber-50"
              }`}
            >

              <div className="flex items-center gap-3">

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isSupported
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {isSupported ? "✓" : "!"}
                </div>

                <div>

                  <p
                    className={`text-2xl font-bold ${
                      isSupported
                        ? "text-green-700"
                        : "text-amber-700"
                    }`}
                  >
                    {decision}
                  </p>

                  <p
                    className={`text-sm ${
                      isSupported
                        ? "text-green-700"
                        : "text-amber-700"
                    }`}
                  >
                    {decisionReason}
                  </p>

                </div>

              </div>

            </div>

            <div className="mt-6 space-y-4">

              <DecisionRow
                label="Product data"
                value="✓ Available"
              />

              <DecisionRow
                label="Supporting evidence"
                value="✓ Available"
              />

              <DecisionRow
                label="Rule evaluation"
                value={isSupported ? "✓ Passed" : "⚠ Review"}
              />

            </div>

          </div>

        </div>

        {/* Recommendation */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

          <p className="text-sm font-medium text-slate-500">
            Veritas Recommendation
          </p>

          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            {isSupported
              ? "Proof is available for the proposed claim."
              : "Additional review is recommended before using this claim."}
          </h2>

          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-500">
            {decisionReason} Veritas provides a traceable path from the
            proposed claim through the evaluation rule, product data and
            supporting evidence.
          </p>

          <div className="mt-5 flex items-center justify-between">

            <p className="text-xs text-slate-400">
              Demo screening logic — not a regulatory determination.
            </p>

            <button
              onClick={() => router.push("/")}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Back to Dashboard
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

function SummaryCard({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p
        className={`mt-2 font-semibold ${
          green ? "text-green-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>

    </div>
  );
}

function GraphNode({
  title,
  value,
  success,
}: {
  title: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div
      className={`min-w-0 flex-1 rounded-xl border p-4 text-center ${
        success
          ? "border-green-200 bg-green-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >

      <p className="text-[10px] font-semibold tracking-wider text-slate-400">
        {title}
      </p>

      <p
        className={`mt-2 truncate text-sm font-semibold ${
          success ? "text-green-700" : "text-slate-900"
        }`}
      >
        {value}
      </p>

    </div>
  );
}

function Arrow() {
  return (
    <div className="text-xl text-slate-300">
      →
    </div>
  );
}

function AnalysisStep({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm text-green-600">
        ✓
      </div>

      <div>

        <p className="text-sm font-medium text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}

function DecisionRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-3">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-900">
        {value}
      </span>

    </div>
  );
}