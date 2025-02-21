"use client";
import React, { useEffect, useState } from "react";
import { getRecipeById, deleteRecipe, getUserById } from "../../api/api";
import { useRouter } from "next/navigation";
import styles from "../../../styles/RecipeIdPage.module.css";
import IngredientList from "../../../components/IngredientList";
import ColorLike from "../../../components/ColorLike";
import GeolocationComponent from "../../../components/GeoLocalisationComponent";
import { useUser } from "../../../contexts/UserContext";
import toast from "react-hot-toast";

export default function Recipe({ params }) {
  const router = useRouter();
  const { user } = useUser();
  const [author, setAuthor] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [loadingAuthor, setLoadingAuthor] = useState(true);
  const [error, setError] = useState(null);

  // Déstructure les paramètres avec React.use()
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingRecipe(true);
        const recipeRequest = await getRecipeById(id);
        const recipeData = recipeRequest.recipe;

        console.log("Données reçues pour la recette :", recipeData);
        if (!recipeData || !recipeData.author) {
          console.error("recipeData.author est undefined !");
          return;
        }

        setRecipe(recipeData);

        if (recipeData && recipeData.author) {
          setLoadingAuthor(true);
          console.log(
            `Récupération de l'auteur avec l'ID: ${recipeData.author}`
          );
          const authorData = await getUserById(recipeData.author);
          console.log("Données reçues pour l'auteur :", authorData);
          setAuthor(authorData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingRecipe(false);
        setLoadingAuthor(false);
      }
    };

    fetchData();
  }, [id]);

  const goBack = () => {
    router.back(); // Revient à la page précédente
  };

  const goModifyRecipe = () => {
    router.push(`/userPage/modifyRecipe/${id}`);
  };

  const deleteRecipeEvent = async (id) => {
    try {
      deleteRecipe(id); // Appel de l'API pour supprimer la recette
      toast.success("Recette supprimée avec succès !");
      router.back();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loadingRecipe || (recipe && loadingAuthor)) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  // Affichage de la recette
  return (
    <div>
      <div style={{ display: "flex" }}>
        <button onClick={goBack} className={styles.button1}>
          Retour
        </button>
        {user && user.userId == recipe.author ? (
          <button onClick={goModifyRecipe} className={styles.button1}>
            Modifier la recette
          </button>
        ) : null}
        {user && user.userId == recipe.author ? (
          <button
            onClick={() => deleteRecipeEvent(recipe._id)}
            className={styles.button1}
          >
            Supprimer la recette
          </button>
        ) : null}
      </div>
      <div
        style={{
          border: "1.5px solid orange",
          borderRadius: "25px",
          overflow: "hidden", // Assure que rien ne dépasse des bordures
          backgroundColor: "white",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex", // Utilise Flexbox
            alignItems: "center", // Centre verticalement
            justifyContent: "flex-start", // Aligne à gauche
            textAlign: "left", // Assure que le texte est aligné à gauche
            padding: "10px",
            fontSize: "30px",
            color: "black",
            fontWeight: "bold",
            backgroundImage: `linear-gradient(to right, white 40%, rgba(255, 255, 255, 0) 60%), url(${recipe.image})`,
            backgroundSize: "cover", // Assure que l'image couvre tout l'espace
            backgroundPosition: "center", // Centre l'image dans la div
            backgroundRepeat: "no-repeat", // Empêche la répétition
            width: "100%", // Largeur de la div enfant
            height: "50px", // Hauteur de l'image
          }}
        >
          {recipe.name}
        </div>

        <div
          style={{
            fontSize: "16px",
            color: "black",
            padding: "10px",
          }}
        >
          <div
            style={{
              fontFamily: "Brittany Signature, sans-serif",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Description: ( Pour {recipe.basePortion} portions)
          </div>
          <p style={{ paddingLeft: "20px" }}>{recipe.description}</p>
          <div
            style={{
              fontFamily: "Brittany Signature, sans-serif",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Ingredients:
          </div>
          <IngredientList recipe={recipe} />
        </div>
        <div
          style={{
            padding: "10px",
            fontSize: "16px",
            marginLeft: "10px",
            display: "flex",
          }}
        >
          <ColorLike />
          {recipe && recipe.likes ? recipe.likes.length : 0}
        </div>
      </div>
      <div className={styles.customBackground}>
        <div style={{ fontSize: "30px", color: "black", fontWeight: "bold" }}>
          Informations
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            padding: "15px",
          }}
        >
          <div
            style={{
              fontFamily: "Brittany Signature, sans-serif",
              fontSize: "25px",
            }}
          >
            Link :
          </div>
          {recipe.link && recipe.link.trim() !== "" ? (
            <a
              href={recipe.link}
              style={{ marginLeft: "30px", color: "orange" }}
            >
              Lien vers la recette
            </a>
          ) : (
            <div style={{ marginLeft: "30px", color: "orange" }}>
              Pas de lien
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            padding: "15px",
          }}
        >
          <div
            style={{
              fontFamily: "Brittany Signature, sans-serif",
              fontSize: "25px",
            }}
          >
            Auteur :
          </div>
          {author ? (
            <div styles={{ marginLeft: "30px", color: "orange" }}>
              {author.user.username}
            </div>
          ) : (
            <div styles={{ marginLeft: "30px", color: "orange" }}>
              Auteur inconnu(e)
            </div>
          )}
        </div>
      </div>
      <div className={styles.customBackground}>
        <GeolocationComponent />
      </div>
    </div>
  );
}
