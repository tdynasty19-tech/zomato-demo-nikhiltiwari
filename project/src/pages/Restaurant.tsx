import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Heart, ChevronLeft, Share2 } from 'lucide-react';
import MenuItemCard from '../components/MenuItemCard';
import { sampleRestaurants, useApp } from '../context/AppContext';
import { useState } from 'react';

export default function Restaurant() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite, cart } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const restaurant = sampleRestaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#05070f] text-slate-100 flex items-center justify-center px-4">
        <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-10 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Restaurant not found</h2>
          <Link to="/" className="inline-flex items-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-orange-400 transition">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(restaurant.id);
  const categories = ['All', ...new Set(restaurant.menu.map((item) => item.category))];

  const filteredMenu =
    activeCategory === 'All'
      ? restaurant.menu
      : restaurant.menu.filter((item) => item.category === activeCategory);

  const currentRestaurantItems = cart.filter((item) => item.restaurantId === restaurant.id);
  const currentRestaurantTotal = currentRestaurantItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 pb-28">
      <div className="relative h-[360px] md:h-[420px]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
        <div className="absolute inset-x-0 top-5 px-4 sm:px-6 flex items-center justify-between">
          <Link
            to="/"
            className="rounded-3xl bg-slate-950/90 border border-white/10 p-3 text-slate-100 shadow-xl hover:bg-slate-900 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex gap-3">
            <button
              onClick={() => toggleFavorite(restaurant.id)}
              className={`rounded-3xl p-3 shadow-xl transition ${
                favorite ? 'bg-orange-500 text-slate-950' : 'bg-slate-950/90 text-slate-100 hover:bg-slate-900'
              }`}
            >
              <Heart className="w-5 h-5" />
            </button>
            <button className="rounded-3xl bg-slate-950/90 p-3 text-slate-100 shadow-xl hover:bg-slate-900 transition">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 backdrop-blur-xl shadow-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white">{restaurant.name}</h1>
            <p className="text-slate-300 mb-4">{restaurant.cuisine.join(', ')}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-300 font-semibold">
                <Star className="w-4 h-4" />
                {restaurant.rating}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-slate-300">
                <Clock className="w-4 h-4" />
                {restaurant.deliveryTime}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-slate-300">
                {restaurant.priceRange}
              </div>
            </div>
          </div>
        </div>
      </div>

      {restaurant.offers && restaurant.offers.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-wrap gap-3">
            {restaurant.offers.map((offer, index) => (
              <div
                key={index}
                className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg"
              >
                {offer}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 px-4 py-3 shadow-2xl">
          <div className="flex flex-col gap-3 overflow-x-auto scrollbar-hide md:flex-row md:items-center md:justify-between">
            <div className="flex gap-2 items-center text-sm text-slate-300">
              <MapPin className="w-4 h-4" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex gap-2 items-center text-sm text-slate-300">
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="inline-flex gap-3 py-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeCategory === category
                    ? 'bg-orange-500 text-slate-950 shadow-xl'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        <h2 className="text-2xl font-bold text-white">Menu</h2>
        <div className="space-y-4">
          {filteredMenu.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
            />
          ))}
        </div>
      </div>

      {currentRestaurantItems.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-[#05070f]/95 border-t border-white/10 px-4 py-4 shadow-2xl">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/cart"
              className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4 text-white shadow-xl hover:opacity-95 transition"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold">{currentRestaurantItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                <span className="font-semibold">View Cart</span>
              </div>
              <span className="font-bold">₹{currentRestaurantTotal}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
