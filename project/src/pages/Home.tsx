import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import RestaurantCard from '../components/RestaurantCard';
import { sampleRestaurants } from '../context/AppContext';

const categories = [
  { name: 'Biryani', image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=150', count: 254 },
  { name: 'Pizza', image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=150', count: 187 },
  { name: 'Burgers', image: 'https://images.pexels.com/photos/1633565/pexels-photo-1633565.jpeg?auto=compress&cs=tinysrgb&w=150', count: 143 },
  { name: 'Chinese', image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=150', count: 221 },
  { name: 'North Indian', image: 'https://t4.ftcdn.net/jpg/08/36/02/45/360_F_836024580_GMq3eGTwA8WS6JeHUP9I6iT2epmNIINx.jpg', count: 312 },
  { name: 'South Indian', image: 'https://cdn.pixabay.com/photo/2017/06/16/11/38/breakfast-2408818_640.jpg', count: 178 },
  { name: 'Desserts', image: 'https://images.pexels.com/photos/5408352/pexels-photo-5408352.jpeg?auto=compress&cs=tinysrgb&w=150', count: 89 },
  { name: 'Beverages', image: 'https://media.istockphoto.com/id/1395736637/photo/spring-or-summer-cold-cocktail-raspberry-lemonade.jpg?s=612x612&w=0&k=20&c=Eim8oSm-ycxAVssFPrOVwWpeo6iOaoZkkglKrmbKSk4=', count: 156 },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Hyderabad');

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Food"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-slate-950/80 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(248,113,113,0.18),_transparent_25%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-orange-300 font-semibold">
                premium delivery
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                BiteBox delivers your next meal faster, fresher, and more delicious.
              </h1>
              <p className="max-w-2xl text-slate-300 text-lg leading-relaxed">
                Browse curated restaurants, discover trending dishes, and enjoy a premium food delivery experience built for modern tastes.
              </p>
              <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-center">
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl backdrop-blur-xl">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-3 flex-1 rounded-2xl bg-slate-900/90 p-3">
                      <MapPin className="w-5 h-5 text-orange-400" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-transparent outline-none text-slate-100 placeholder:text-slate-500"
                        placeholder="Enter your location"
                      />
                    </div>
                    <div className="flex items-center gap-3 flex-1 rounded-2xl bg-slate-900/90 p-3">
                      <Search className="w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent outline-none text-slate-100 placeholder:text-slate-500"
                        placeholder="Search for restaurant, cuisine or a dish"
                      />
                    </div>
                  </div>
                </div>
                <Link
                  to={`/search?q=${encodeURIComponent(searchQuery)}`}
                  className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-orange-500/20 hover:opacity-95 transition"
                >
                  Search BiteBox
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/80 p-6 shadow-[0_60px_120px_-65px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                <div className="grid gap-4">
                  <div className="rounded-3xl bg-[#0f172a] p-4 grid gap-3">
                    <div className="flex items-center justify-between text-slate-300 text-sm">
                      <span>Fast delivery</span>
                      <span className="text-orange-400 font-semibold">02:15</span>
                    </div>
                    <div className="rounded-3xl overflow-hidden">
                      <img
                        src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Premium meal"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">The Spice Route</h3>
                      <p className="text-slate-400 text-sm">Authentic flavors delivered with care.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['Hot & Fresh', 'Premium Picks', 'Top Rated', 'Exclusive Offers'].map((badge) => (
                      <div key={badge} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-sm text-slate-300">
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-orange-400 font-semibold mb-2">
                Browse by category
              </p>
              <h2 className="text-3xl font-bold text-white">What are you craving today?</h2>
            </div>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-3xl border border-orange-400/20 bg-white/5 px-5 py-3 text-sm font-semibold text-orange-300 hover:bg-white/10 transition"
            >
              Explore all categories
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-950/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-emerald-400 font-semibold mb-2">
                Culinary journeys
              </p>
              <h2 className="text-3xl font-bold text-white">Popular collections</h2>
            </div>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-3xl border border-slate-700 bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-900 transition"
            >
              View all collections
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { title: 'Best Biryani Places', subtitle: '23 Places', image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { title: 'Top Pizza Places', subtitle: '19 Places', image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { title: 'Trending Cafes', subtitle: '31 Places', image: 'https://m.media-amazon.com/images/I/71PGOXjwL8L._AC_UF894,1000_QL80_.jpg' },
              { title: 'Late Night Cravings', subtitle: '17 Places', image: 'https://images.pexels.com/photos/1633565/pexels-photo-1633565.jpeg?auto=compress&cs=tinysrgb&w=600' },
            ].map((collection) => (
              <Link key={collection.title} to="/search" className="group relative overflow-hidden rounded-3xl shadow-2xl hover:-translate-y-1 transition-transform duration-300">
                <img src={collection.image} alt={collection.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-xl font-bold">{collection.title}</h3>
                  <p className="text-sm text-slate-200">{collection.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 items-center rounded-[2rem] border border-white/10 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-950/95 p-8 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.8)]">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-orange-400 font-semibold mb-3">BiteBox mobile</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Order on the go from the BiteBox app</h2>
              <p className="text-slate-400 leading-7 mb-6">
                Get instant delivery updates, personalized recommendations, and exclusive offers when you download the BiteBox app.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:opacity-95 transition">
                  Download iOS
                </button>
                <button className="rounded-3xl border border-slate-700 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-900 transition">
                  Download Android
                </button>
              </div>
            </div>
            <div className="rounded-[2rem] overflow-hidden bg-slate-900/80 p-5 shadow-2xl">
              <div className="aspect-[3/4] rounded-[2rem] bg-gradient-to-b from-slate-800 to-slate-950 p-5">
                <div className="w-full h-full rounded-[1.75rem] overflow-hidden border border-white/10 bg-[url('https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
