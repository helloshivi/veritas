"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("veritasClaim");

    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  const productName = product?.productName || "Chocolate Protein Bar";
  const claim = product?.claim || "High Protein";
  const protein = product?.protein || "20";

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div>
          <p className="text-sm font-medium text-slate-500">
            Veritas Analysis
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Product-Proof Analysis
          </h1>

          <p className="mt-2 text-slate-500">
            Veritas has analysed the proposed claim against the available
            product evidence.
          </p>
        </div>

        {/* Product summary */}
        <div className="mt-8 grid grid-cols-3 gap-5">

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">Product</p>
            <p className="mt-2 font-semibold text-slate-900">
              {productName}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">Proposed Claim</p>
            <p className="mt-2 font-semibold text-slate-900">
              {claim}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">Evidence</p>
            <p className="mt-2 font-semibold text-green-600">
              Available
            </p>
          </div>

        </div>

        {/* Proof Graph */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8">

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
              active
            />

            <Arrow />

            <GraphNode
              title="RULE"
              value="Claim criterion"
              active
            />

            <Arrow />

            <GraphNode
              title="PRODUCT DATA"
              value={`Protein: ${protein} g`}
              active
            />

            <Arrow />

            <GraphNode
              title="EVIDENCE"
              value="Nutrition document"
              active
            />

            <Arrow />

            <GraphNode
              title="DECISION"
              value="Supported"
              success
            />

          </div>
        </div>

        {/* Analysis steps */}
        <div className="mt-8 grid grid-cols-2 gap-6">

          <div className="rounded-xl border border-slate-200 bg-white p-7">

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
                text="Uploaded nutrition evidence is available for verification."
              />

            </div>
          </div>

          {/* Decision */}
          <div className="rounded-xl border border-slate-200 bg-white p-7">

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

              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">
                  Product data
                </span>

                <span className="text-sm font-medium text-green-600">
                  ✓ Available
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">
                  Supporting evidence
                </span>

                <span className="text-sm font-medium text-green-600">
                  ✓ Available
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-500">
                  Evidence completeness
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  100%
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Recommendation */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-7">

          <div className="flex items-start justify-between">

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
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Back to Dashboard
            </button>

          </div>

        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          MVP demonstration — decision logic will be expanded with
          jurisdiction-specific regulatory rules and document extraction.
        </p>

      </div>
    </main>
  );
}

function GraphNode({
  title,
  value,
  active,
  success,
}: {
  title: string;
  value: string;
  active?: boolean;
  success?: boolean;
}) {
  return (
    <div
      className={`min-w-0 flex-1 rounded-xl border p-4 text-center ${
        success
          ? "border-green-200 bg-green-50"
          : active
          ? "border-slate-200 bg-slate-50"
          : "border-slate-200 bg-white"
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