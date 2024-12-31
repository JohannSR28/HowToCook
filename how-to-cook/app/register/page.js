"use client";
import styles from "../styles/register.module.css";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  // States for registration
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const successToast = (name) => {
    toast.success("User " + name + " successfully registered!!");
  };

  const errorToast = (message) => {
    toast.error(message);
  };

  // Appelle la fonction `successToast` lorsque `submitted` devient `true`
  useEffect(() => {
    if (submitted) {
      successToast(name);
      setSubmitted(false); // Réinitialise l'état pour éviter des notifications répétées
      setError(false);
      setName("");
      setUserName("");
      setEmail("");
      setPassword("");
    }
  }, [submitted, name]);

  useEffect(() => {
    if (error) {
      errorToast(errorMessage);
      setError(false); // Réinitialise l'état pour éviter des notifications répétées
    }
  }, [error, errorMessage]);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the username change
  const handleUserName = (e) => {
    setUserName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      // Appelle l'API backend pour enregistrer un utilisateur
      const response = await fetch(
        "http://localhost:5000/api/users/", // Adapter selon l'URL réelle
        {
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

      // Si l'inscription est réussie
      setSubmitted(true);
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
        {/* Labels and inputs for form data */}
        <label className={styles.label}>Name</label>
        <input
          onChange={handleName}
          className="input"
          value={name}
          type="text"
        />

        <label className={styles.label}>Username</label>
        <input
          onChange={handleUserName}
          className="input"
          value={userName}
          type="text"
        />

        <label className={styles.label}>Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
        />

        <label className={styles.label}>Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className={styles.btn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
