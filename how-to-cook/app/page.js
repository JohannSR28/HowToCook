"use client";

import { useUser } from "../contexts/UserContext";
import { toast } from "react-hot-toast";
import UserPage from "./userPage/home/page";
import InvitePage from "./invitePage/home/page";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      {user ? <UserPage /> : <InvitePage />}
      <div>
        <h1>Test Endpoint</h1>
        <button onClick={handleTestEndpoint}>Test Secure Endpoint</button>
      </div>
      <div>
        <h1>Welcome to the Section Page</h1>
        {user ? (
          <p>Logged in as : {JSON.stringify(user)}</p> // Affiche les données utilisateur
        ) : (
          <p>Please log in to see your information.</p>
        )}
      </div>
    </div>
  );
}

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
      toast.error(data.error || "An error occurred.");
      return;
    }

    // Si la requête réussit
    toast.success(data.message || "Access granted.");
  } catch (err) {
    console.error(err);
    toast.error("Failed to connect to the server.");
  }
};
