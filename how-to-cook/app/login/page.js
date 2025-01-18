"use client";
import styles from "../../styles/register.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "An unexpected error occurred.");
        return;
      }

      localStorage.setItem("token", data.token);
      toast.success("User " + userName + " successfully connected!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <div className={styles.form}>
      <div>
        <h1>Login page</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>Username</label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          className={styles.input}
          value={userName}
          type="text"
          aria-label="Enter your username"
        />

        <label className={styles.label}>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          value={password}
          type="password"
          aria-label="Enter your password"
        />

        <div className={styles.btnContainer}>
          <button
            onClick={() => {
              window.location.href = "/";
            }} // Redirige vers l'accueil
            className={styles.button1}
            type="button"
          >
            Retour
          </button>
          <button className={styles.button1} type="submit">
            Connection
          </button>
        </div>
      </form>
    </div>
  );
}
