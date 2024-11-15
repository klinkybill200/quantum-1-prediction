import React from 'react';
import { Link } from './Link';

export function Footer() {
  return (
    <div className="text-center mt-12 space-y-4">
      <p className="text-purple-300/60 text-sm">
        Results are AI-generated for entertainment purposes only
      </p>
      <nav className="flex justify-center gap-6">
        <Link href="/about" className="text-purple-300/60 hover:text-purple-300 text-sm transition-colors">
          About
        </Link>
        <Link href="/impressum" className="text-purple-300/60 hover:text-purple-300 text-sm transition-colors">
          Impressum
        </Link>
      </nav>
    </div>
  );
}