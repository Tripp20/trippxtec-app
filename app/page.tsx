import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <span className="text-2xl font-bold text-blue-700">TrippXTec</span>
        <div className="flex gap-4">
          <Link href="/login" className="text-gray-600 hover:text-blue-700 text-sm font-medium">Login</Link>
          <Link href="/submit" className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">Get Help Now</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Trusted Tech Support — Africa & Beyond</span>
        <h1 className="mt-6 text-5xl font-extrabold text-gray-900 leading-tight">
          Your tech problem solved by a <span className="text-blue-700">vetted expert</span> — fast.
        </h1>
        <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
          Submit your issue. Get matched to a trusted, verified technical expert. Problem resolved remotely — within hours, not days.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/submit" className="bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 transition">
            Submit a Problem →
          </Link>
          <Link href="/expert-signup" className="border border-blue-700 text-blue-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition">
            Become an Expert
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How TrippXTec Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Describe Your Problem', desc: 'Tell us what is broken — software, website, computer, network, or any digital tool.' },
              { step: '02', title: 'Get Matched Instantly', desc: 'We match you to a vetted expert with the exact skills your problem requires. No guessing.' },
              { step: '03', title: 'Problem Solved Remotely', desc: 'Your expert connects remotely and resolves the issue. You only pay after it is fixed.' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm">
                <span className="text-4xl font-extrabold text-blue-100">{item.step}</span>
                <h3 className="mt-4 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Simple, Transparent Pricing</h2>
        <p className="text-center text-gray-500 mb-12">Pay only after your problem is resolved. No hidden fees.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tier: 'Quick Fix', price: '₦3,500', desc: 'Single issue resolved within 2 hours. Best for individuals and students.', features: ['Software issues', 'Basic setup', 'Connectivity problems', 'Mobile problems'], highlight: false },
            { tier: 'Pro Fix', price: '₦8,000', desc: 'Complex issues, up to 3 hours. Best for SME owners and freelancers.', features: ['Data recovery', 'Network config', 'Software licensing', 'Email setup'], highlight: true },
            { tier: 'Business Fix', price: '₦15,000', desc: 'Business-critical issues, multiple systems, same-day resolution.', features: ['Server issues', 'Multi-system fix', 'Priority matching', 'End-to-end resolution'], highlight: false },
          ].map((p) => (
            <div key={p.tier} className={`rounded-2xl p-8 ${p.highlight ? 'bg-blue-700 text-white shadow-xl scale-105' : 'bg-gray-50 text-gray-900'}`}>
              <h3 className={`text-xl font-bold ${p.highlight ? 'text-white' : 'text-gray-900'}`}>{p.tier}</h3>
              <p className={`text-4xl font-extrabold mt-2 ${p.highlight ? 'text-white' : 'text-blue-700'}`}>{p.price}</p>
              <p className={`mt-3 text-sm ${p.highlight ? 'text-blue-100' : 'text-gray-500'}`}>{p.desc}</p>
              <ul className="mt-6 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className={`text-sm flex items-center gap-2 ${p.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                    <span className={p.highlight ? 'text-white' : 'text-blue-700'}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/submit" className={`mt-8 block text-center py-3 rounded-xl font-semibold text-sm transition ${p.highlight ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-blue-700 text-white hover:bg-blue-800'}`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Every expert on TrippXTec is vetted before you ever speak to them.</h2>
          <p className="text-blue-100 text-lg">Skills tested. Communication assessed. Background verified. We do not let anyone through who has not earned it.</p>
          <Link href="/expert-signup" className="mt-8 inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition">
            Apply as an Expert
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-gray-400 text-sm">
        <p>© 2026 TrippXTec. Built in Lagos, Nigeria. Serving the world.</p>
      </footer>

    </main>
  )
}
