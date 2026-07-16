import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/shaper_logo.png"
              alt="Shaper Logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="text-[15px] font-semibold text-gray-800 tracking-tight">
              Shaper
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className="relative text-sm font-semibold text-gray-900 pb-0.5 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-red-500"
            >
              Home
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="/talent"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Browse Talent
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}
