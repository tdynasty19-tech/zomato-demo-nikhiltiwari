import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, User, Mail, Phone } from "lucide-react";

function Update() {
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      // Backend API will be connected here later
      alert("Delete API will be connected here.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl p-8">

        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/profile"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft />
          </Link>

          <h1 className="text-3xl font-bold">
            Update Profile
          </h1>
        </div>

        <div className="space-y-6">

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
              <User size={18} />
              Username
            </label>

            <input
              type="text"
              placeholder="Enter Username"
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
              placeholder="Enter Email"
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
              placeholder="Enter Phone"
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Save Changes
          </button>

          <hr className="my-6" />

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">

            <h2 className="text-xl font-bold text-red-600 mb-2">
              Danger Zone
            </h2>

            <p className="text-gray-600 mb-5">
              Deleting your account will permanently remove all your data. This
              action cannot be undone.
            </p>

            <button
              onClick={handleDelete}
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
            >
              <Trash2 size={20} />
              Delete Account
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Update;