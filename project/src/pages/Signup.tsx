import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApiUrl } from "../config/api";
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
        getApiUrl("/api/users/create"),
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
    <div className="min-h-screen bg-[#05070f] flex items-center justify-center px-5 py-12 text-slate-100">
      <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-[0_35px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 text-white text-2xl font-bold shadow-xl">
            B
          </div>
          <h1 className="text-4xl font-bold">Create Account</h1>
          <p className="mt-3 text-slate-400">Join BiteBox for premium food delivery</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="font-medium text-slate-200 mb-2 block">Username</label>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-inner">
                <User className="w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-medium text-slate-200 mb-2 block">First Name</label>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-inner">
                <User className="w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="font-medium text-slate-200 mb-2 block">Last Name</label>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-inner">
                <User className="w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-medium text-slate-200 mb-2 block">Phone Number</label>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-inner">
                <Phone className="w-5 h-5 text-slate-500" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="font-medium text-slate-200 mb-2 block">Email</label>
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-inner">
              <Mail className="w-5 h-5 text-slate-500" />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="font-medium text-slate-200 mb-2 block">Password</label>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-inner">
                <Lock className="w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-100 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="font-medium text-slate-200 mb-2 block">Confirm Password</label>
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-inner">
                <Lock className="w-5 h-5 text-slate-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-400 hover:text-slate-100 transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-lg font-semibold text-white shadow-xl hover:opacity-95 transition"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-400 font-semibold hover:text-orange-300 transition">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;