"use client";

import { useState, useEffect } from "react";
import RecipeDisplay from "./recipeDisplay";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-hot-toast";
import styles from "../styles/Home.module.css";

export default function UserPage() {
  const { user } = useUser();
  const [userRecipes, setUserRecipes] = useState([]);

  const getMyRecipes = async () => {
    try {
      // Vérifie si l'utilisateur est défini
      if (!user || !user.userId) {
        toast.error("User ID is missing. Please log in again.");
        return;
      }

      const token = localStorage.getItem("token");
      const userId = user.userId;
      const requestName = `http://localhost:5000/api/recipes/user/${userId}`;

      // Affiche un toast de chargement
      const loadingToast = toast.loading("Fetching your recipes...", {
        duration: 3000,
      });

      const response = await fetch(requestName, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "", // Ajoute le token si disponible
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "An error occurred.", { id: loadingToast });
        setUserRecipes([]); // Réinitialise les recettes
        return;
      }

      // Met à jour les recettes et affiche un succès
      setUserRecipes(data || []);
      toast.success("Recipes retrieved successfully!", { id: loadingToast });
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to the server.");
    }
  };

  // Appelle `getMyRecipes` lorsque la page est montée
  useEffect(() => {
    getMyRecipes();
  }, []); // Tableau vide : exécute l'effet une seule fois

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        className={styles.HowToCooklogo}
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        How To Cook
      </h1>
      <div
        style={{
          color: "white",
          width: "100%",
          textAlign: "left",
          backgroundColor: "orange",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        Bienvenue Chef {user.username}
      </div>
      <button className={styles.button1}>Démarrez une planification</button>
      <button className={styles.button1}>Voir vos planifications</button>
      <div>
        <h1>My Recipes</h1>
        <div>
          {userRecipes.length > 0 ? (
            userRecipes.map((recipe) => (
              <RecipeDisplay key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <p>Vous n&apos;avez pas encore ajouté de recette</p>
          )}
        </div>
      </div>
    </div>
  );
}
