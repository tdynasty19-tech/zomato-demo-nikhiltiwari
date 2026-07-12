import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Heart } from 'lucide-react';
import { Restaurant, useApp } from '../context/AppContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const favorite = isFavorite(restaurant.id);

  return (
    <div className="group bg-slate-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_40px_120px_-45px_rgba(255,69,0,0.45)] transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/restaurant/${restaurant.id}`}>
        <div className="relative h-52 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          {restaurant.offers && restaurant.offers.length > 0 && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                {restaurant.offers[0]}
              </span>
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(restaurant.id);
            }}
            className={`absolute top-4 right-4 p-2 rounded-full shadow-xl transition-all ${
              favorite
                ? 'bg-orange-500 text-slate-950'
                : 'bg-slate-900/80 text-slate-200 hover:bg-orange-500 hover:text-slate-950'
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/restaurant/${restaurant.id}`}>
          <h3 className="font-semibold text-slate-100 text-lg mb-2 group-hover:text-orange-400 transition-colors">
            {restaurant.name}
          </h3>
        </Link>
        <p className="text-slate-400 text-sm mb-4">{restaurant.cuisine.join(', ')}</p>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 bg-emerald-500/15 text-emerald-300 px-3 py-1 rounded-full font-semibold">
            <Star className="w-4 h-4" />
            <span>{restaurant.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="w-4 h-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="text-slate-400">{restaurant.priceRange}</div>
        </div>

        <div className="flex items-center mt-4 gap-2 text-slate-400 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{restaurant.distance}</span>
        </div>
      </div>
    </div>
  );
}
