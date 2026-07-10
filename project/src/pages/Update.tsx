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
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/profile" className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft />
          </Link>

          <h1 className="text-3xl font-bold">Update Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold flex items-center gap-2 mb-2">
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
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2 mb-2">
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
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
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
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
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
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
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
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-3 rounded-xl font-semibold transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <hr className="my-6" />

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <h2 className="text-xl font-bold text-red-600 mb-2">Danger Zone</h2>

            <p className="text-gray-600 mb-5">
              Deleting your account will permanently remove all your data. This
              action cannot be undone.
            </p>

            <button
              type="button"
              onClick={handleDelete}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
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