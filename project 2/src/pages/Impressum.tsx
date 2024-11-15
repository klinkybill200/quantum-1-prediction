import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '../components/Link';

export function Impressum() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Predictions
        </Link>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-purple-500/20">
          <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            Impressum (Legal Notice)
          </h1>
          
          <div className="space-y-4 text-purple-200">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Information according to § 5 TMG</h2>
              <p>Quantum Future Sight</p>
              <p>Example Street 123</p>
              <p>12345 Sample City</p>
              <p>Germany</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Contact</h2>
              <p>Phone: +49 (0) 123 456789</p>
              <p>Email: contact@example.com</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Responsible for Content</h2>
              <p>John Doe</p>
              <p>Example Street 123</p>
              <p>12345 Sample City</p>
              <p>Germany</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}