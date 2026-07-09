import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";

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
        "http://localhost:8000/api/users/login",
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-red-500">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Phone Number */}

          <div>
            <label className="font-medium mb-2 block">
              Phone Number
            </label>

            <div className="flex items-center border rounded-xl px-3">
              <Phone className="w-5 h-5 text-gray-400" />

              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="font-medium mb-2 block">
              Password
            </label>

            <div className="flex items-center border rounded-xl px-3">
              <Lock className="w-5 h-5 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
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

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-red-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;