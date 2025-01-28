"use client";
import styles from "../../styles/register.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { authUser } from "../api/api";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await authUser({
        username: userName,
        password: password,
      });

      localStorage.setItem("token", data.token);
      toast.success(`Utilisateur ${userName} connecté avec succès !`);
      window.location.href = "/";
    } catch (err) {
      if (err.message.includes("Invalid credentials")) {
        toast.error("Identifiants incorrects");
      } else if (err.message.includes("User not found")) {
        toast.error("Utilisateur introuvable");
      } else {
        toast.error(err.message || "Erreur de connexion au serveur");
      }
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
