import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, User, Mail, Phone } from "lucide-react";
import { getApiUrl } from "../config/api";

interface UserData {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function Update() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserData>({
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(getApiUrl(`/api/users/${userId}`));
        const data = await response.json();

        if (response.ok) {
          setFormData(data.user);
        } else {
          alert(data.message || "Unable to load profile");
        }
      } catch (error) {
        console.error(error);
        alert("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(getApiUrl(`/api/users/${userId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Profile updated successfully");
        navigate("/profile");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(getApiUrl(`/api/users/${userId}`), {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        alert("Account deleted successfully");
        navigate("/login");
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete account");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070f] flex justify-center items-center p-6 text-slate-100">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-[0_35px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/profile" className="rounded-3xl bg-slate-900/90 p-3 text-slate-100 shadow-lg hover:bg-slate-800 transition">
            <ArrowLeft />
          </Link>

          <div>
            <h1 className="text-3xl font-bold">Update Profile</h1>
            <p className="text-slate-400">Keep your BiteBox account details up to date.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold flex items-center gap-2 mb-2 text-slate-200">
                <User size={18} />
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-3 text-slate-100 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2 mb-2 text-slate-200">
                <User size={18} />
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                required
                className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-3 text-slate-100 outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2 text-slate-200">
              <User size={18} />
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              required
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-3 text-slate-100 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2 text-slate-200">
              <Mail size={18} />
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-3 text-slate-100 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2 text-slate-200">
              <Phone size={18} />
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Phone"
              required
              className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-3 text-slate-100 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white font-semibold shadow-xl hover:opacity-95 transition disabled:bg-slate-700"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <hr className="my-6 border-white/10" />

          <div className="rounded-[2rem] bg-slate-900/80 border border-white/10 p-5">
            <h2 className="text-xl font-bold text-orange-300 mb-2">Danger Zone</h2>

            <p className="text-slate-400 mb-5">
              Deleting your account will permanently remove all your data. This action cannot be undone.
            </p>

            <button
              type="button"
              onClick={handleDelete}
              className="w-full flex items-center justify-center gap-2 rounded-3xl bg-red-600 hover:bg-red-700 text-white py-3 font-semibold transition"
            >
              <Trash2 size={20} />
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;