import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchUserRecipes } from "../../app/api/api";
import { useUser } from "../../contexts/UserContext";

export default function useUserRecipes() {
  const { user } = useUser(); // Ajoutez `isLoading` du contexte utilisateur
  const [userRecipes, setUserRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Indique si les recettes sont en cours de chargement

  useEffect(() => {
    const getUserRecipes = async () => {
      if (!user || !user.userId) {
        // Affiche une erreur uniquement si le contexte utilisateur est prêt
        toast.error("User ID is missing. Please log in again.");
        return;
      }

      try {
        setIsLoading(true);
        //const loadingToast = toast.loading("Fetching your recipes...");
        const data = await fetchUserRecipes(user.userId);

        setUserRecipes(data || []);
        // toast.success("Recipes retrieved successfully!", { id: loadingToast });
      } catch (err) {
        console.error("Error fetching user recipes:", err);
        // toast.error("Failed to fetch recipes.");
      } finally {
        setIsLoading(false);
      }
    };

    getUserRecipes();
  }, [user]); // Ajoutez `isUserLoading` comme dépendance pour attendre l'initialisation

  return { userRecipes, isLoading };
}
