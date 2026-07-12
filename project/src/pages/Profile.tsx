import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiUrl } from "../config/api";
import {
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Heart,
  Package,
  Bell,
  LogOut,
  ChevronRight,
  Camera,
} from "lucide-react";

interface ProfileProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function Profile({ setIsLogin }: ProfileProps) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<User>({
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [addresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Main Street, Banjara Hills, Hyderabad",
    },
    {
      id: 2,
      type: "Work",
      address: "456 Tech Park, Hitech City, Hyderabad",
    },
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          getApiUrl(`/api/users/${userId}`)
        );

        const data = await response.json();

        if (response.ok) {
          setProfile(data.user);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.log(error);
        alert("Unable to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");

    setIsLogin(false);

    navigate("/login");
  };

  const menuItems = [
    {
      icon: Heart,
      label: "Favorites",
      href: "/favorites",
      count: 4,
    },
    {
      icon: Package,
      label: "Order History",
      href: "/orders",
      count: 2,
    },
    {
      icon: MapPin,
      label: "Saved Addresses",
      href: "#",
      count: 2,
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      href: "#",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "#",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070f] py-10 text-slate-100">
      <div className="max-w-4xl mx-auto px-4">

        {/* Profile Card */}

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl mb-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold text-white">
                    {profile.firstName.charAt(0)}
                    {profile.lastName.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 rounded-full bg-slate-950 border border-white/10 p-2 text-slate-100 shadow-lg hover:bg-slate-900 transition">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-slate-400">@{profile.username}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/update")}
              className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:opacity-95 transition"
            >
              Edit Profile
            </button>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{profile.email}</span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{profile.phone}</span>
              </div>
            </div>
          </div>
        </div>
                {/* Menu Items */}

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center justify-between gap-4 p-4 transition ${
                index !== menuItems.length - 1 ? "border-b border-white/10" : ""
              } bg-slate-950/95 hover:bg-slate-900/80`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900/80 flex items-center justify-center text-orange-400">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-100">{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                {item.count && (
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-300">
                    {item.count}
                  </span>
                )}

                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </Link>
          ))}
        </div>

        {/* Referral Card */}

        <div className="rounded-[2rem] bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white mb-6 shadow-2xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">Invite & Earn</h3>
              <p className="text-orange-100 text-sm">
                Get ₹200 for every friend who orders using your referral code.
              </p>
            </div>

            <div className="rounded-3xl bg-white px-5 py-2 text-orange-600 font-bold">
              {profile.username.toUpperCase()}200
            </div>
          </div>
        </div>

        {/* Saved Addresses */}

        <div className="bg-slate-900 rounded-[2rem] p-6 shadow-2xl border border-white/10 mb-6">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Saved Addresses</h2>
            <button className="text-orange-400 hover:text-orange-300 font-semibold">Add New</button>
          </div>

          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="flex items-start gap-3 rounded-3xl border border-white/10 p-4 bg-slate-950/80 hover:border-orange-400 transition"
              >
                <MapPin className="w-5 h-5 text-orange-400 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">{address.type}</h4>
                  <p className="text-slate-400 text-sm">{address.address}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 py-4 text-white shadow-xl font-semibold hover:opacity-95 transition"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        <p className="text-center text-slate-400 text-sm mt-6">
          BiteBox © 2026. All rights reserved.
        </p>

      </div>
    </div>
  );
}