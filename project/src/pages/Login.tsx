import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";
import { getApiUrl } from "../config/api";

interface LoginProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginForm {
  phone: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState<LoginForm>({
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        getApiUrl("/api/users/login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userId", data.user.id);

        setIsLogin(true);

        navigate("/profile");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#05070f] flex items-center justify-center px-5 py-12 text-slate-100">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-[0_35px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 text-white text-2xl font-bold shadow-xl">
            B
          </div>
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="mt-3 text-slate-400">Login to continue with BiteBox</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="font-medium text-slate-200 mb-2 block">Phone Number</label>
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-inner">
              <Phone className="w-5 h-5 text-slate-500" />
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-medium text-slate-200 mb-2 block">Password</label>
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-inner">
              <Lock className="w-5 h-5 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
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

          <button
            type="submit"
            className="w-full rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-lg font-semibold text-white shadow-xl hover:opacity-95 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-slate-400">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-orange-400 font-semibold hover:text-orange-300 transition">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;