import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const location = useLocation();
  const { getCartItemCount } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartItemCount();
  const isHome = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
      isHome ? 'bg-slate-950/70 text-slate-100' : 'bg-slate-950/95 text-slate-100 shadow-2xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-3xl bg-gradient-to-br from-orange-500 via-red-500 to-fuchsia-600 shadow-lg flex items-center justify-center ring-1 ring-white/10">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-tight">BiteBox</span>
              <span className="text-xs uppercase text-slate-400">Food delivery reimagined</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="font-medium text-slate-200 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="font-medium text-slate-200 hover:text-white transition-colors flex items-center gap-1"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>
            <Link
              to="/favorites"
              className="font-medium text-slate-200 hover:text-white transition-colors flex items-center gap-1"
            >
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
            </Link>
            <Link
              to="/orders"
              className="font-medium text-slate-200 hover:text-white transition-colors"
            >
              Orders
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative p-2 rounded-full bg-slate-900/70 border border-white/10 shadow-sm hover:bg-slate-900 transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-slate-100" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className="p-2 rounded-full bg-slate-900/70 border border-white/10 shadow-sm hover:bg-slate-900 transition-colors"
            >
              <User className="w-6 h-6 text-slate-100" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900/70 border border-white/10 text-slate-100 hover:bg-slate-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-t border-white/10 shadow-2xl">
          <nav className="px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-4 rounded-2xl text-slate-200 hover:bg-slate-900 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-4 rounded-2xl text-slate-200 hover:bg-slate-900 transition-colors font-medium"
            >
              Search
            </Link>
            <Link
              to="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-4 rounded-2xl text-slate-200 hover:bg-slate-900 transition-colors font-medium"
            >
              Favorites
            </Link>
            <Link
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-4 rounded-2xl text-slate-200 hover:bg-slate-900 transition-colors font-medium"
            >
              Orders
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
