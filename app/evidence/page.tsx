"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EvidencePage() {
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("veritasClaim");

    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  function handleAnalyse() {
    if (!product?.productName || !product?.claim) {
      alert("Please complete the product and claim details first.");
      router.push("/claim-check");
      return;
    }

    localStorage.setItem(
      "veritasEvidence",
      JSON.stringify({
        fileName: "Sample Nutrition Evidence",
        uploaded: true,
      })
    );

    router.push("/analysis");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-10">

      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-medium text-slate-500">
          Evidence Ready
        </p>

        <h1 className="mt-2 font-serif text-4xl font-semibold text-slate-900">
          Product Evidence
        </h1>

        <p className="mt-2 text-slate-500">
          Veritas has structured evidence available for the demonstration.
        </p>

        {/* Product */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <p className="text-sm text-slate-500">
            Product being evaluated
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            {product?.productName || "Product details unavailable"}
          </h2>

          <div className="mt-4 flex gap-3">

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              {product?.category || "Category unavailable"}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              Claim: {product?.claim || "Not specified"}
            </span>

          </div>

        </div>

        {/* Evidence */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                Evidence Available
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Structured nutrition evidence is ready for Veritas analysis.
              </p>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl text-green-600">
              ✓
            </div>

          </div>

          <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sm font-semibold text-slate-700 shadow-sm">
                DOC
              </div>

              <div>

                <p className="font-medium text-slate-900">
                  Sample Nutrition Evidence
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Product nutrition data • Ready for verification
                </p>

              </div>

              <span className="ml-auto text-xs font-medium text-green-700">
                Ready
              </span>

            </div>

          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-5">

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Evidence contains
            </p>

            <div className="mt-4 grid grid-cols-3 gap-4">

              <EvidenceValue
                label="Protein"
                value={`${product?.protein || "—"} g`}
              />

              <EvidenceValue
                label="Sugar"
                value={`${product?.sugar || "—"} g`}
              />

              <EvidenceValue
                label="Fibre"
                value={`${product?.fibre || "—"} g`}
              />

            </div>

          </div>

          <div className="mt-8 flex justify-end">

            <button
              onClick={handleAnalyse}
              className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
            >
              Analyse with Veritas →
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}

function EvidenceValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}