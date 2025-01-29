"use client";

import RecipeDisplay from "../../../components/recipeDisplay";
import { useUser } from "../../../contexts/UserContext";
import styles from "../../../styles/userPageHome.module.css";
import { useRouter } from "next/navigation";
import useUserRecipes from "../../../hook/userHook/useUserRecipes";
import usePopularRecipes from "../../../hook/publicHook/usePopularRecipes";

export default function UserPage() {
  const { user } = useUser();
  const router = useRouter();

  const goToSeeAllUserRecipe = () => {
    router.push("/userPage/seeAllUserRecipe");
  };

  const { userRecipes } = useUserRecipes();
  const { recipes } = usePopularRecipes(5);

  return (
    <div className={styles.container}>
      <h1 className={styles.HowToCooklogo}>How To Cook</h1>
      <div className={styles.welcomeMessage}>
        Bienvenue, Chef {user?.username || ""}
      </div>
      <div className={styles.buttonContainer}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button className={styles.button1} onClick={goToSeeAllUserRecipe}>
            Voir Toutes vos recttes
          </button>
          <button className={styles.button1Close}>
            Démarrez une planification
          </button>
          <button className={styles.button1Close}>
            Voir vos planifications
          </button>
        </div>
      </div>
      <div className={styles.recipeContainer}>
        <div className={styles.title}>Vos dernières recettes</div>
        <div>
          <div>
            {userRecipes.length > 0 ? (
              (() => {
                const recipesToDisplay =
                  userRecipes.length <= 5
                    ? userRecipes
                    : [...userRecipes].slice(-5).reverse(); // Copie et inversion pour éviter les effets de bord

                return recipesToDisplay.map((recipe) => (
                  <RecipeDisplay key={recipe._id} recipe={recipe} />
                ));
              })()
            ) : (
              <p>Vous n&apos;avez pas encore ajouté de recette</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.recipeContainer}>
        <div className={styles.title}>Les recettes les plus populaires</div>
        <div>
          <div>
            {recipes.length > 0 ? (
              (() => {
                return recipes.map((recipe) => (
                  <RecipeDisplay key={recipe._id} recipe={recipe} />
                ));
              })()
            ) : (
              <p>Pas de recette sur le site actuellement</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
