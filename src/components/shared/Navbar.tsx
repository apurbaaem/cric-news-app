
'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          CricNews
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/(public)/schedule" className="text-gray-300 hover:text-white">
            Match Schedule
          </Link>
          <Link href="/(public)/stats" className="text-gray-300 hover:text-white">
            Player Stats
          </Link>
          <Link href="/(admin)/dashboard" className="text-gray-300 hover:text-white">
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}
