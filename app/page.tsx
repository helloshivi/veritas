import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-white p-6">
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              VERITAS
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Product-Proof Intelligence
            </p>
          </div>

          <nav className="space-y-2">
            <div className="rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900">
              Dashboard
            </div>

            <Link
              href="/claim-check"
              className="block rounded-lg px-4 py-3 text-sm text-slate-500 hover:bg-slate-50"
            >
              New Claim Check
            </Link>

            <div className="px-4 py-3 text-sm text-slate-500">
              Evaluations
            </div>

            <div className="px-4 py-3 text-sm text-slate-500">
              Proof Library
            </div>

            <div className="px-4 py-3 text-sm text-slate-500">
              Settings
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <section className="flex-1 p-10">

          {/* Header */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Product-Proof Intelligence
              </p>

              <h2 className="mt-2 text-3xl font-semibold text-slate-900">
                Good morning
              </h2>

              <p className="mt-2 text-slate-500">
                Verify product claims before they reach the market.
              </p>
            </div>

            <Link
              href="/claim-check"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
            >
              + Start New Claim Check
            </Link>
          </div>

          {/* Status cards */}
          <div className="grid grid-cols-3 gap-5">

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm text-slate-500">
                Supported
              </p>

              <p className="mt-2 text-3xl font-semibold text-green-600">
                12
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Claims with sufficient evidence
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm text-slate-500">
                Review Required
              </p>

              <p className="mt-2 text-3xl font-semibold text-amber-500">
                4
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Claims needing further review
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm text-slate-500">
                Insufficient Evidence
              </p>

              <p className="mt-2 text-3xl font-semibold text-red-500">
                2
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Claims lacking required evidence
              </p>
            </div>

          </div>

          {/* Recent evaluations */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-white">

            <div className="border-b border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">
                Recent Evaluations
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Recent product claims reviewed by Veritas.
              </p>
            </div>

            <div className="divide-y divide-slate-100">

              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="font-medium text-slate-900">
                    Protein+ Chocolate Bar
                  </p>

                  <p className="text-sm text-slate-500">
                    High Protein
                  </p>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  Supported
                </span>
              </div>

              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="font-medium text-slate-900">
                    Oat Energy Drink
                  </p>

                  <p className="text-sm text-slate-500">
                    Source of Fibre
                  </p>
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  Review Required
                </span>
              </div>

              <div className="flex items-center justify-between p-5">
                <div>
                  <p className="font-medium text-slate-900">
                    Low Sugar Cookies
                  </p>

                  <p className="text-sm text-slate-500">
                    Low Sugar
                  </p>
                </div>

                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                  Insufficient Evidence
                </span>
              </div>

            </div>
          </div>

        </section>
      </div>
    </main>
  );
}