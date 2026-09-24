"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EvidencePage() {
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("veritasClaim");

    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  function handleAnalyse() {
    if (!fileName) {
      alert("Please upload supporting evidence before analysis.");
      return;
    }

    router.push("/analysis");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-10">

      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-medium text-slate-500">
          Evidence Upload
        </p>

        <h1 className="mt-2 font-serif text-4xl font-semibold text-slate-900">
          Add Product Evidence
        </h1>

        <p className="mt-2 text-slate-500">
          Veritas uses product evidence to evaluate whether the proposed claim
          can be supported.
        </p>

        {/* Product summary */}
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

        {/* Upload */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-lg font-semibold text-slate-900">
            Upload Evidence
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload nutrition labels, product specifications, test reports or
            supporting documents.
          </p>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-12 text-center transition hover:border-slate-400 hover:bg-slate-50">

            <div className="text-3xl">
              ↑
            </div>

            <p className="mt-3 text-sm font-medium text-slate-700">
              Click to upload evidence
            </p>

            <p className="mt-1 text-xs text-slate-400">
              PDF, JPG, PNG or DOCX
            </p>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setFileName(file.name);

                  localStorage.setItem(
                    "veritasEvidence",
                    JSON.stringify({
                      fileName: file.name,
                      uploaded: true,
                    })
                  );
                }
              }}
            />

          </label>

          {fileName && (
            <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              ✓ Evidence added: {fileName}
            </div>
          )}

          <div className="mt-8 flex justify-end">

            <button
              onClick={handleAnalyse}
              className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Analyse with Veritas →
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}