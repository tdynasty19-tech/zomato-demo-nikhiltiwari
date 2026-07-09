import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

interface SignupForm {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email:string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<SignupForm>({
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    email:"",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/users/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email:formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Account Created Successfully");
        navigate("/login");
      } else {
        alert(data.message || "Signup Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-10">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-red-500">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join us today
        </p>

        <form onSubmit={handleSignup} className="space-y-5">

          {/* Username */}

          <div>
            <label className="font-medium">Username</label>

            <div className="flex items-center border rounded-xl px-3 mt-2">
              <User className="w-5 h-5 text-gray-400" />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* First Name */}

          <div>
            <label className="font-medium">First Name</label>

            <div className="flex items-center border rounded-xl px-3 mt-2">
              <User className="w-5 h-5 text-gray-400" />

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Last Name */}

          <div>
            <label className="font-medium">Last Name</label>

            <div className="flex items-center border rounded-xl px-3 mt-2">
              <User className="w-5 h-5 text-gray-400" />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Phone */}

          <div>
            <label className="font-medium">Phone Number</label>

            <div className="flex items-center border rounded-xl px-3 mt-2">
              <Phone className="w-5 h-5 text-gray-400" />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>
          {/* Email */}

            <div>
            <label className="font-medium">Email</label>

            <div className="flex items-center border rounded-xl px-3 mt-2">
                <Mail className="w-5 h-5 text-gray-400" />

                <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
                />
            </div>
            </div>

          {/* Password */}

          <div>
            <label className="font-medium">Password</label>

            <div className="flex items-center border rounded-xl px-3 mt-2">
              <Lock className="w-5 h-5 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="font-medium">
              Confirm Password
            </label>

            <div className="flex items-center border rounded-xl px-3 mt-2">
              <Lock className="w-5 h-5 text-gray-400" />

              <input
                type={
                  showConfirmPassword ? "text" : "password"
                }
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;