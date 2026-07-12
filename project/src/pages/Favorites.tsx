import { Link } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import { sampleRestaurants, useApp } from '../context/AppContext';

export default function Favorites() {
  const { favorites } = useApp();
  const favoriteRestaurants = sampleRestaurants.filter((r) => favorites.includes(r.id));

  if (favoriteRestaurants.length === 0) {
    return (
      <div className="min-h-screen bg-[#05070f] flex items-center justify-center px-4 py-12 text-slate-100">
        <div className="max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-orange-400 shadow-lg">
            <Heart className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-2">No favorites yet</h2>
          <p className="text-slate-400 mb-6">Start exploring and save your favorite restaurants for quick access.</p>
          <Link
            to="/search"
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:opacity-95 transition"
          >
            <Search className="w-5 h-5 mr-2" />
            Explore Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070f] py-10 text-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-orange-400 font-semibold mb-2">Favorites</p>
            <h1 className="text-4xl font-bold">Your Favorites</h1>
          </div>
          <p className="text-slate-400">Your saved restaurants are ready when you are.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
}
