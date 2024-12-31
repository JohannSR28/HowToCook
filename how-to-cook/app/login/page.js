"use client";
import styles from "../styles/register.module.css";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  // States for registration
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [IsConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const successToast = (name) => {
    toast.success("User " + name + " successfully connected!!");
  };

  const errorToast = (message) => {
    toast.error(message);
  };

  useEffect(() => {
    if (IsConnected) {
      successToast(userName);
      setIsConnected(false); // Réinitialise l'état pour éviter des notifications répétées
      setError(false);
      setUserName("");
      setPassword("");
      window.location.href = "/"; // Redirige vers la page d'accueil
    }
  }, [IsConnected, userName]);

  useEffect(() => {
    if (error) {
      errorToast(errorMessage);
      setError(false); // Réinitialise l'état pour éviter des notifications répétées
    }
  }, [error, errorMessage]);

  // Handling the username change
  const handleUserName = (e) => {
    setUserName(e.target.value);
    setIsConnected(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setIsConnected(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      // Appelle l'API backend pour enregistrer un utilisateur
      const response = await fetch(
        "http://localhost:5000/api/users/auth", // Adapter selon l'URL réelle
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: password,
          }),
        }
      );

      const data = await response.json(); // Parse la réponse en JSON

      // Gestion des erreurs côté backend
      if (!response.ok) {
        if (data.error) {
          setError(true);
          setErrorMessage(data.error); // Affiche le message d'erreur du backend
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
        return;
      }

      // Si la connexion est réussie, stocke le token dans localStorage
      localStorage.setItem("token", data.token);

      // Si l'inscription est réussie
      setIsConnected(true);
    } catch (err) {
      console.error(err); // Log the error to the console
      // Gestion des erreurs de connexion avec le backend
      setError("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <div className={styles.form}>
      <div>
        <h1>User Registration</h1>
      </div>

      <form>
        <label className={styles.label}>Username</label>
        <input
          onChange={handleUserName}
          className="input"
          value={userName}
          type="text"
        />

        <label className={styles.label}>Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className={styles.btn} type="submit">
          Connection
        </button>
      </form>
    </div>
  );
}
