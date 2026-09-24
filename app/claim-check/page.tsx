export default function ClaimCheckPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-medium text-slate-500">
          New Claim Check
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Start a New Claim Check
        </h1>

        <p className="mt-2 text-slate-500">
          Enter your product details and proposed claim to begin verification.
        </p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8">

          <div>
            <label className="text-sm font-medium text-slate-700">
              Product Name
            </label>

            <input
              type="text"
              placeholder="e.g. Protein+ Chocolate Bar"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-slate-700">
              Product Category
            </label>

            <select className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500">
              <option>Nutrition / Functional Food</option>
              <option>Snacks</option>
              <option>Beverages</option>
              <option>Dairy</option>
              <option>Other</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-slate-700">
              Proposed Claim
            </label>

            <input
              type="text"
              placeholder="e.g. High Protein"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
            />
          </div>

          <div className="mt-8 border-t border-slate-200 pt-8">

            <h2 className="text-lg font-semibold text-slate-900">
              Product Nutrition
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the available nutrition information.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-4">

              <div>
                <label className="text-sm text-slate-600">
                  Protein (g)
                </label>

                <input
                  type="number"
                  placeholder="20"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">
                  Sugar (g)
                </label>

                <input
                  type="number"
                  placeholder="5"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">
                  Fibre (g)
                </label>

                <input
                  type="number"
                  placeholder="4"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                />
              </div>

            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white">
              Continue →
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}