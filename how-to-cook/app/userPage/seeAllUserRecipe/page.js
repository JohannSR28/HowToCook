"use client";
import RecipeDisplay from "../../../components/recipeDisplay";
import { useRouter } from "next/navigation";
import useUserRecipes from "../../../hook/userHook/useUserRecipes";
import styles from "../../../styles/Home.module.css";

export default function SeeAllUserRecipe() {
  const router = useRouter();

  const goBack = () => {
    router.back(); // Revient à la page précédente
  };

  const goToCreateNewRecipe = () => {
    router.push("/userPage/createNewRecipe"); // Navigue à la page de création
  };

  const { userRecipes } = useUserRecipes();

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={goBack} className={styles.button1}>
          Retour
        </button>
        <h1>Vos recettes</h1>
        <button onClick={goToCreateNewRecipe} className={styles.button1}>
          Créer une nouvelle recette
        </button>
      </div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "25px",
          padding: "20px",
        }}
      >
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
