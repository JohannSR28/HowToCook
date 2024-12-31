"use client";

import { useState } from "react";

export default function Home() {
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const handleTestEndpoint = async () => {
    try {
      // Récupère le token JWT stocké dans localStorage
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Ajoute le token si disponible
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Si le serveur renvoie une erreur
        setError(data.error || "An error occurred.");
        setResponseMessage(""); // Réinitialise la réponse
        return;
      }

      // Si la requête réussit
      setResponseMessage(data.message || "Access granted.");
      setError(""); // Réinitialise l'erreur
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server.");
      setResponseMessage(""); // Réinitialise la réponse
    }
  };

  return (
    <div>
      <h1>Test Endpoint</h1>
      <button onClick={handleTestEndpoint}>Test Secure Endpoint</button>
      {responseMessage && <p style={{ color: "green" }}>{responseMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
