"use client";

import { useState } from "react";
import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authApi.login({ email, password });
      
      const token = data.token || data.access_token;
      if (token) {
        localStorage.setItem("token", token);
      }
      
      await refreshUser();

      // Based on user role, we could redirect appropriately. For now:
      if (data.user?.role === 'COACH') {
        router.push("/coach/dashboard");
      } else {
        router.push("/dashboard");
      }
      
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <div className="login-container">
        
        {/* Logo / App Name */}
        <div className="brand">
          <div className="logo">⚡</div>
          <h1>SportLens</h1>
          <p>See the game. Understand the game.</p>
        </div>

        {/* Login Box */}
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">
            Login to continue to SportLens
          </p>

          <form onSubmit={handleLogin}>
            
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="forgot">
              <a href="#">Forgot password?</a>
            </div>

            {error && <p style={{ color: "#ffb4ab", fontSize: "14px", marginTop: "10px" }}>{error}</p>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="register-text">
            Don't have an account?
          </p>

          <a href="/register" className="register-button">
            Create Account
          </a>
        </div>

        <p className="footer-text">
          © 2026 SportLens. All rights reserved.
        </p>
      </div>
    </main>
  );
}