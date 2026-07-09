import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          `http://localhost:8000/api/users/${userId}`
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">

        {/* Profile Card */}

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">

            <div className="relative">

              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">

                <span className="text-3xl font-bold text-white">

                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}

                </span>

              </div>

              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50">

                <Camera className="w-4 h-4 text-gray-600" />

              </button>

            </div>

            <div className="flex-1">

              <h1 className="text-2xl font-bold">

                {profile.firstName} {profile.lastName}

              </h1>

              <p className="text-gray-500">

                @{profile.username}

              </p>

              <div className="flex items-center mt-2 text-gray-500">

                <Mail className="w-4 h-4 mr-2" />

                {profile.email}

              </div>

              <div className="flex items-center mt-2 text-gray-500">

                <Phone className="w-4 h-4 mr-2" />

                {profile.phone}

              </div>

            </div>

            <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">

              Edit Profile

            </button>

          </div>

        </div>
                {/* Menu Items */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>

                <span className="font-medium text-gray-900">
                  {item.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.count && (
                  <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-sm font-medium">
                    {item.count}
                  </span>
                )}

                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>

        {/* Referral Card */}

        <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-bold text-lg mb-1">
                Invite & Earn
              </h3>

              <p className="text-amber-100 text-sm">
                Get ₹200 for every friend who orders
                using your referral code.
              </p>

            </div>

            <div className="bg-white text-amber-600 px-5 py-2 rounded-xl font-bold">

              {profile.username.toUpperCase()}200

            </div>

          </div>
        </div>

        {/* Saved Addresses */}

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-bold">
              Saved Addresses
            </h2>

            <button className="text-red-500 hover:text-red-600 font-semibold">
              Add New
            </button>

          </div>

          <div className="space-y-3">

            {addresses.map((address) => (

              <div
                key={address.id}
                className="flex items-start gap-3 border rounded-xl p-4 hover:border-red-500 transition"
              >

                <MapPin className="w-5 h-5 text-gray-500 mt-1" />

                <div>

                  <h4 className="font-semibold">
                    {address.type}
                  </h4>

                  <p className="text-gray-500 text-sm">
                    {address.address}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-white text-red-500 py-4 rounded-2xl shadow-sm hover:bg-red-50 transition font-semibold"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Zomato Clone © 2026. All rights reserved.
        </p>

      </div>
    </div>
  );
}