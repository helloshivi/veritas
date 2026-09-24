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

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-medium text-slate-500">
          Evidence Upload
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Add Product Evidence
        </h1>

        <p className="mt-2 text-slate-500">
          Veritas uses product evidence to evaluate whether the proposed claim
          can be supported.
        </p>

        {product && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">
              Product being evaluated
            </p>

            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {product.productName || "Unnamed Product"}
            </h2>

            <div className="mt-4 flex gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {product.category}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                Claim: {product.claim || "Not specified"}
              </span>
            </div>
          </div>
        )}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8">

          <h2 className="text-lg font-semibold text-slate-900">
            Upload Evidence
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload nutrition labels, product specifications, test reports or
            supporting documents.
          </p>

          <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-12 text-center hover:bg-slate-50">

            <div className="text-3xl">↑</div>

            <p className="mt-3 text-sm font-medium text-slate-700">
              Click to upload evidence
            </p>

            <p className="mt-1 text-xs text-slate-400">
              PDF, JPG, PNG or DOCX
            </p>

            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFileName(file.name);
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
              onClick={() => router.push("/analysis")}
              className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              Analyse with Veritas →
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}