"use client";

import { useState, useEffect } from "react";
import { fetchPopularRecipes } from "../../app/api/api"; // Importez la fonction API
//import toast from "react-hot-toast";

const usePopularRecipes = (nb) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // État de chargement
  const [error, setError] = useState(null); // État d'erreur

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Démarre le chargement
      setError(null); // Réinitialise l'erreur

      try {
        const data = await fetchPopularRecipes(nb);
        setRecipes(data);
      } catch (err) {
        setError(err.message); // Met à jour l'erreury
        // toast.dismiss(); // Supprime le toast de chargement
        // toast.error(`Erreur : ${err.message}`);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchRecipes();
  }, [nb]); // Exécuté lorsque `nb` change

  return { recipes, loading, error };
};

export default usePopularRecipes;
