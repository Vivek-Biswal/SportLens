"use client";

import { useState } from "react";
import { authApi } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [role, setRole] = useState<"student" | "coach">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const backendRole = role === "student" ? "ATHLETE" : "COACH";
      await authApi.register({ name, email, password, role: backendRole });
      
      // Redirect to login after successful registration
      router.push("/login");
    } catch (err: any) {
      if (err.details && Array.isArray(err.details)) {
        setError(err.details.map((d: any) => d.message).join(" "));
      } else {
        setError(err.message || "An error occurred during registration.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #050816 0%, #0b1230 50%, #1a1040 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {/* BRAND */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "55px",
              height: "55px",
              margin: "0 auto 12px",
              borderRadius: "15px",
              background:
                "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            ⚡
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "32px",
            }}
          >
            SportLens
          </h1>

          <p
            style={{
              color: "#a5b4fc",
              marginTop: "8px",
            }}
          >
            Create your SportLens account
          </p>
        </div>

        {/* REGISTER CARD */}
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "20px",
            padding: "35px",
            backdropFilter: "blur(10px)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginTop: 0,
              fontSize: "25px",
            }}
          >
            Register
          </h2>

          <p
            style={{
              textAlign: "center",
              color: "#9ca3c7",
              marginBottom: "28px",
            }}
          >
            Choose how you want to use SportLens
          </p>

          {/* ROLE SELECTION */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "25px",
            }}
          >
            <button
              type="button"
              onClick={() => setRole("student")}
              style={{
                flex: 1,
                padding: "15px",
                borderRadius: "12px",
                border:
                  role === "student"
                    ? "2px solid #6366f1"
                    : "1px solid rgba(255,255,255,0.15)",
                background:
                  role === "student"
                    ? "rgba(99,102,241,0.2)"
                    : "rgba(255,255,255,0.04)",
                color: "white",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              🎓
              <br />
              Student
            </button>

            <button
              type="button"
              onClick={() => setRole("coach")}
              style={{
                flex: 1,
                padding: "15px",
                borderRadius: "12px",
                border:
                  role === "coach"
                    ? "2px solid #8b5cf6"
                    : "1px solid rgba(255,255,255,0.15)",
                background:
                  role === "coach"
                    ? "rgba(139,92,246,0.2)"
                    : "rgba(255,255,255,0.04)",
                color: "white",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              🏆
              <br />
              Coach
            </button>
          </div>

          <form onSubmit={handleRegister}>
            {/* NAME */}
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />

            {/* EMAIL */}
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />

            {/* PASSWORD */}
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />

            {/* CONFIRM PASSWORD */}
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={inputStyle}
            />

            {error && <p style={{ color: "#ffb4ab", fontSize: "14px", marginTop: "10px", textAlign: "center" }}>{error}</p>}

            {/* REGISTER */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "25px",
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {loading ? "Registering..." : `Register as ${role === "student" ? "Student" : "Coach"} →`}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p
            style={{
              textAlign: "center",
              color: "#9ca3c7",
              marginTop: "25px",
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#a5b4fc",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </a>
          </p>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#6f789b",
            fontSize: "13px",
            marginTop: "20px",
          }}
        >
          © 2026 SportLens. All rights reserved.
        </p>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "14px",
  marginTop: "8px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  fontSize: "14px",
  outline: "none",
};