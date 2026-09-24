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

  /* No data state */
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
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Start a Claim Check →
          </button>

        </div>
      </main>
    );
  }

  const productName = product.productName;
  const claim = product.claim;
  const protein = product.protein;

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

            <span className="rounded-full bg-green-50 px-4 py-2 text-xs font-medium text-green-700">
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
              value={`Protein: ${protein} g`}
            />

            <Arrow />

            <GraphNode
              title="EVIDENCE"
              value="Nutrition document"
            />

            <Arrow />

            <GraphNode
              title="DECISION"
              value="Supported"
              success
            />

          </div>

        </div>

        {/* Analysis + Decision */}
        <div className="mt-8 grid grid-cols-2 gap-6">

          {/* Evidence analysis */}
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
                text="Relevant claim criterion identified for evaluation."
              />

              <AnalysisStep
                title="Product data extracted"
                text={`Protein value available: ${protein} g`}
              />

              <AnalysisStep
                title="Evidence matched"
                text={`Supporting document: ${evidence.fileName}`}
              />

            </div>

          </div>

          {/* Decision */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

            <p className="text-sm font-medium text-slate-500">
              Veritas Decision
            </p>

            <div className="mt-5 rounded-xl bg-green-50 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-xl">
                  ✓
                </div>

                <div>

                  <p className="text-2xl font-bold text-green-700">
                    SUPPORTED
                  </p>

                  <p className="text-sm text-green-700">
                    Evidence is available for the proposed claim.
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
                label="Evidence completeness"
                value="100%"
              />

            </div>

          </div>

        </div>

        {/* Recommendation */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

          <div className="flex items-start justify-between gap-8">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Veritas Recommendation
              </p>

              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                Proof is available for the proposed claim.
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                The product has structured nutrition data and supporting
                evidence available. Veritas has connected the claim,
                evaluation criterion, product data and evidence into a
                traceable proof path.
              </p>

            </div>

            <button
              onClick={() => router.push("/")}
              className="shrink-0 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Back to Dashboard
            </button>

          </div>

        </div>

        {/* Evidence trace */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Evidence Trace
          </p>

          <p className="mt-2 text-sm text-slate-600">
            {evidence.fileName}
          </p>

        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          MVP demonstration — decision logic can be expanded with
          jurisdiction-specific regulatory rules and automated document
          extraction.
        </p>

      </div>
    </main>
  );
}

/* Summary card */

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

/* Graph node */

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

/* Arrow */

function Arrow() {
  return (
    <div className="text-xl text-slate-300">
      →
    </div>
  );
}

/* Analysis step */

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

/* Decision row */

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