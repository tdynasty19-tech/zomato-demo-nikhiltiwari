import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter, X, SlidersHorizontal } from 'lucide-react';
import RestaurantCard from '../components/RestaurantCard';
import { sampleRestaurants } from '../context/AppContext';

const filterOptions = [
  { id: 'rating4', label: 'Rating 4.0+' },
  { id: 'fastDelivery', label: 'Fast Delivery' },
  { id: 'veg', label: 'Pure Veg' },
  { id: 'offers', label: 'Offers' },
  { id: 'price300', label: '₹300-Rs 400' },
];

const sortOptions = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'deliveryTime', label: 'Delivery Time' },
  { id: 'rating', label: 'Rating' },
  { id: 'priceLowHigh', label: 'Cost: Low to High' },
  { id: 'priceHighLow', label: 'Cost: High to Low' },
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || searchParams.get('category') || '');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || searchParams.get('category') || '');
  }, [searchParams]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery('');
    setSearchParams({});
  };

  let filteredRestaurants = sampleRestaurants;

  if (searchQuery) {
    filteredRestaurants = filteredRestaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  if (activeFilters.includes('rating4')) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.rating >= 4.0);
  }
  if (activeFilters.includes('fastDelivery')) {
    filteredRestaurants = filteredRestaurants.filter((r) => parseInt(r.deliveryTime) <= 25);
  }
  if (activeFilters.includes('veg')) {
    // For this demo, we'll skip the pure veg filter as restaurant data doesn't have this attribute
  }
  if (activeFilters.includes('offers')) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.offers && r.offers.length > 0);
  }

  switch (activeSort) {
    case 'deliveryTime':
      filteredRestaurants = [...filteredRestaurants].sort(
        (a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
      );
      break;
    case 'rating':
      filteredRestaurants = [...filteredRestaurants].sort((a, b) => b.rating - a.rating);
      break;
    case 'priceLowHigh':
      filteredRestaurants = [...filteredRestaurants].sort(
        (a, b) => parseInt(a.priceRange.replace(/[^0-9]/g, '')) - parseInt(b.priceRange.replace(/[^0-9]/g, ''))
      );
      break;
    case 'priceHighLow':
      filteredRestaurants = [...filteredRestaurants].sort(
        (a, b) => parseInt(b.priceRange.replace(/[^0-9]/g, '')) - parseInt(a.priceRange.replace(/[^0-9]/g, ''))
      );
      break;
  }

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100">
      <div className="sticky top-16 z-20 bg-[#05070f]/95 backdrop-blur-xl border-b border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <form onSubmit={handleSearch} className="flex w-full gap-3 lg:w-[65%]">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for restaurants, cuisine or a dish"
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition"
              />
            </div>
            <button
              type="submit"
              className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-500/20 hover:opacity-95 transition"
            >
              Search
            </button>
          </form>
          <div className="flex flex-wrap gap-3">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilters.includes(filter.id)
                    ? 'bg-orange-500 text-slate-950'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Restaurants'}
            </h1>
            <p className="text-slate-400 mt-2">
              {filteredRestaurants.length} restaurant{filteredRestaurants.length === 1 ? '' : 's'} found
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-sm text-slate-300 flex items-center gap-3">
            <span>Sort by:</span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="bg-transparent outline-none text-slate-100"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-12 text-center text-slate-400">
            <p className="text-lg font-semibold text-slate-100 mb-3">No restaurants found</p>
            <button
              onClick={clearFilters}
              className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-orange-400 transition"
            >
              Clear all filters and try again
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
