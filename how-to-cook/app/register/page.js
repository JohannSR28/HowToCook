"use client";
import styles from "../styles/register.module.css";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
      const response = await fetch("http://localhost:5000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          username: userName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          setError(true);
          setErrorMessage(data.error);
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        return;
      }

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

      <form>
        <label className={styles.label}>Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="input"
          value={name}
          type="text"
        />

        <label className={styles.label}>Username</label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          className="input"
          value={userName}
          type="text"
        />

        <label className={styles.label}>Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          value={email}
          type="email"
        />

        <label className={styles.label}>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          value={password}
          type="password"
        />

        <div>
          <button
            onClick={() => {
              window.location.href = "/";
            }} // Redirige vers l'accueil
            className={styles.btn}
            type="button"
          >
            Back
          </button>
          <button onClick={handleSubmit} className={styles.btn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
