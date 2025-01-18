"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const usePopularRecipes = (nb) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // État de chargement
  const [error, setError] = useState(null); // État d'erreur

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Démarre le chargement
      setError(null); // Réinitialise l'erreur

      try {
        toast.loading("Chargement des recettes populaires...");
        const response = await fetch(
          `http://localhost:5000/api/recipes/mostLiked/${nb}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Erreur de récupération.");
        }

        const data = await response.json();
        setRecipes(data); // Met à jour les recettes
        toast.dismiss(); // Supprime le toast de chargement
        toast.success("Recettes populaires récupérées avec succès !");
      } catch (err) {
        setError(err.message); // Met à jour l'erreur
        toast.dismiss(); // Supprime le toast de chargement
        toast.error(`Erreur : ${err.message}`);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchRecipes();
  }, [nb]); // Exécuté lorsque `nb` change

  return { recipes, loading, error };
};

export default usePopularRecipes;
