"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import styles from "../../styles/register.module.css";
import { registerUser } from "../api/api";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter(); // Utilisation de useRouter pour gérer les redirections

  const successToast = (name) => {
    toast.success("User " + name + " successfully registered!!");
  };

  const errorToast = (message) => {
    toast.error(message);
  };

  // Affiche un toast et redirige l'utilisateur après un enregistrement réussi
  useEffect(() => {
    if (submitted) {
      successToast(name);
      setSubmitted(false);
      setError(false);
      setName("");
      setUserName("");
      setEmail("");
      setPassword("");
      router.push("/login"); // Redirige vers la page de connexion
    }
  }, [submitted, name, router]);

  // Affiche un toast pour les erreurs
  useEffect(() => {
    if (error) {
      errorToast(errorMessage);
      setError(false); // Réinitialise l'état pour éviter des notifications répétées
    }
  }, [error, errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      await registerUser({
        name,
        username: userName,
        email,
        password,
      });

      setSubmitted(true); // Déclenche le succès
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to connect to the server. Please try again.");
      setError(true);
    }
  };

  return (
    <div className={styles.form}>
      <div>
        <h1>User Registration</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label className={styles.label}>Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          value={name}
          type="text"
        />

        <label className={styles.label}>Username</label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          className={styles.input}
          value={userName}
          type="text"
        />

        <label className={styles.label}>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          value={email}
          type="email"
        />

        <label className={styles.label}>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          value={password}
          type="password"
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
          <button
            onClick={handleSubmit}
            className={styles.button1}
            type="submit"
          >
            Créer le compte
          </button>
        </div>
      </form>
    </div>
  );
}
