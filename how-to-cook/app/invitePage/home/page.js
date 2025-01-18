"use client";
import React from "react";
import RecipeDisplay from "../../../components/recipeDisplay";
import styles from "../../../styles/userPageHome.module.css";
import usePopularRecipes from "../../../hook/publicHook/usePopularRecipes";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();

  const goToRegister = () => {
    router.push("/register");
  };

  const goToLogin = () => {
    router.push("/login");
  };

  const { recipes } = usePopularRecipes(5);

  return (
    <div className={styles.container}>
      <h1 className={styles.HowToCooklogo}>How To Cook</h1>

      <div className={styles.buttonContainer}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button className={styles.button1} onClick={goToRegister}>
            Créer un compte
          </button>
          <button className={styles.button1} onClick={goToLogin}>
            Se connecter
          </button>
          <button className={styles.button1}>Voir les recettes</button>
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
