import { Link } from 'react-router-dom';
import { Package, ChefHat, Truck, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const statusConfig = {
  preparing: {
    icon: ChefHat,
    label: 'Preparing',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  'on-the-way': {
    icon: Truck,
    label: 'On the Way',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  delivered: {
    icon: CheckCircle,
    label: 'Delivered',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
};

export default function Orders() {
  const { orders } = useApp();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#05070f] flex items-center justify-center px-4 py-12 text-slate-100">
        <div className="max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-orange-400 shadow-lg">
            <Package className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-3">No orders yet</h2>
          <p className="text-slate-400 mb-6">Looks like you haven't placed any orders. Start ordering your favorite food!</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 text-sm font-semibold text-white shadow-xl hover:opacity-95 transition"
          >
            Order Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070f] py-10 text-slate-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-orange-400 font-semibold mb-2">Order history</p>
            <h1 className="text-4xl font-bold">Your Orders</h1>
          </div>
          <p className="text-slate-400">Review past deliveries and reorder favorites instantly.</p>
        </div>
        <div className="space-y-6">
          {orders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;

            return (
              <div key={order.id} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-xl">{order.restaurantName}</h3>
                    <p className="text-slate-400 text-sm">{order.id}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bgColor}`}>
                    <StatusIcon className={`w-4 h-4 ${status.color}`} />
                    <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-300">
                      {item.quantity}x {item.name}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 text-sm text-slate-400 mb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{order.date}</span>
                  </div>
                  <div className="text-slate-100 font-semibold">Total: ₹{order.total}</div>
                </div>

                {order.status !== 'delivered' && (
                  <div className="relative pt-2">
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-1 bg-slate-800 rounded-full">
                      <div
                        className="h-1 bg-orange-500 rounded-full transition-all duration-500"
                        style={{
                          width:
                            order.status === 'preparing'
                              ? '33%'
                              : order.status === 'on-the-way'
                              ? '66%'
                              : '100%',
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
                  <button className="flex-1 rounded-3xl border border-white/10 bg-slate-900/90 py-3 text-sm font-medium text-slate-200 hover:bg-slate-900 transition">
                    View Details
                  </button>
                  <button className="flex-1 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 py-3 text-sm font-semibold text-white hover:opacity-95 transition">
                    Reorder
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
