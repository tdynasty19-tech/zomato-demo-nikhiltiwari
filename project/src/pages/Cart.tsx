import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, ChevronRight, Tag, Percent, Trash2 } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, getCartTotal, clearCart, placeOrder } = useApp();
  const [address, setAddress] = useState('123 Main Street, Banjara Hills, Hyderabad');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  if (cart.length === 0 && !showOrderSuccess) {
    return (
      <div className="min-h-screen bg-[#05070f] flex items-center justify-center px-4 py-12 text-slate-100">
        <div className="max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-orange-400 shadow-lg">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
          <p className="text-slate-400 mb-6">You can go to the home page to view more restaurants.</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 text-sm font-semibold text-white shadow-xl hover:opacity-95 transition"
          >
            See restaurants near you
          </Link>
        </div>
      </div>
    );
  }

  if (showOrderSuccess) {
    return (
      <div className="min-h-screen bg-[#05070f] flex items-center justify-center px-4 py-12 text-slate-100">
        <div className="max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 shadow-inner">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-3">Order Placed Successfully!</h2>
          <p className="text-slate-400 mb-6">Your order has been placed. You can track your order in the orders section.</p>
          <Link
            to="/orders"
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 text-sm font-semibold text-white shadow-xl hover:opacity-95 transition"
          >
            Track Order
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const deliveryFee = 40;
  const taxes = Math.round(subtotal * 0.05);
  const discount = appliedPromo ? 100 : 0;
  const total = subtotal + deliveryFee + taxes - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'BITEBOX100') {
      setAppliedPromo('BITEBOX100');
      setPromoCode('');
    }
  };

  const handlePlaceOrder = () => {
    placeOrder(address);
    setShowOrderSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#05070f] py-10 text-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
              <div className="flex items-center gap-3 text-slate-300 mb-4">
                <MapPin className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-orange-300 font-semibold">Delivery Address</p>
                  <p className="mt-1 text-slate-100">{address}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddressModal(true)}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-4 text-left text-sm text-slate-300 hover:bg-slate-900 transition"
              >
                Change delivery address
              </button>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
              <p className="text-slate-300 font-semibold mb-4">{cart[0].restaurantName}</p>
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item.menuItem.id} item={item} />
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4 text-slate-100 font-semibold">
                <Tag className="w-5 h-5 text-orange-400" />
                Apply Promo Code
              </div>
              {appliedPromo ? (
                <div className="flex items-center justify-between rounded-3xl bg-emerald-500/10 px-4 py-4 text-emerald-300">
                  <span>₹100 discount applied!</span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-emerald-300 hover:text-emerald-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 flex-col sm:flex-row">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-3 text-slate-100 outline-none placeholder:text-slate-500"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-sm font-semibold text-white shadow-xl hover:opacity-95 transition"
                  >
                    Apply
                  </button>
                </div>
              )}
              <p className="mt-3 text-xs text-slate-500">Try BITEBOX100 for ₹100 off</p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-4 text-slate-100 font-semibold">
                <Percent className="w-5 h-5 text-emerald-400" />
                Add a tip for your delivery partner
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['₹10', '₹20', '₹50', '₹100'].map((tip) => (
                  <button
                    key={tip}
                    className="rounded-3xl border border-white/10 bg-slate-900/90 py-3 text-sm font-medium text-slate-200 hover:bg-slate-900 transition"
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>
            <div className="space-y-4 text-slate-300 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-100 font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-slate-100 font-medium">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5%)</span>
                <span className="text-slate-100 font-medium">₹{taxes}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-300">
                  <span>Promo Discount</span>
                  <span className="font-medium">-₹{discount}</span>
                </div>
              )}
              <div className="h-px bg-white/10 my-4" />
              <div className="flex justify-between text-lg font-bold text-white">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="mt-8 w-full rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-lg font-semibold text-white shadow-xl hover:opacity-95 transition"
            >
              Place Order
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              By placing your order, you agree to{' '}
              <Link to="/terms" className="text-orange-400 hover:text-orange-300 transition">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>

      {showAddressModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-[2rem] bg-slate-950 p-6 shadow-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Change Delivery Address</h3>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-900/90 p-4 text-slate-100 outline-none placeholder:text-slate-500 resize-none"
              rows={3}
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-sm font-semibold text-white hover:opacity-95 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
