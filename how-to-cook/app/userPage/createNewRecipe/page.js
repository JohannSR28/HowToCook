"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/CreateNewRecipe.module.css";
import { useUser } from "../../../contexts/UserContext";
import { toast } from "react-hot-toast";

export default function CreateNewRecipe() {
  const { user } = useUser();

  const router = useRouter();
  const goBack = () => {
    router.back(); // Revient à la page précédente
  };

  // État pour stocker les informations de la recette
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    basePortion: 1, // Valeur par défaut
    link: "",
  });

  const [ingredients, setIngredients] = useState([]);

  // Fonction pour mettre à jour l'état dynamiquement
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: name === "basePortion" ? parseInt(value) : value, // Convertir les portions en entier
    }));
  };

  // Ajouter un ingrédient
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", quantity: "", unit: "unit", price: "", type: "indiv" },
    ]);
  };

  // Liste des unités prédéfinies
  const units = [
    "unit",
    "g",
    "mL",
    "cL",
    "L",
    "pincée",
    "cuillère à soupe",
    "cuillère à café",
    "verre",
    "tasse",
    "bol",
    "tranche",
    "feuille",
    "branche",
    "gousse",
    "boîte",
  ];

  // Modifier un ingrédient
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  // Supprimer un ingrédient
  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Prépare l'objet final de la recette
    const recipeFinal = {
      ...recipeData,
      cost: calculateCost(ingredients), // Calcule le coût total
      ingredients: ingredients, // Ajoute les ingrédients
      likes: [], // Initialise les likes
      image: "/Meal image in preparation.png", // Ajout de l'image (chemin relatif pour le serveur)
      author: user.userId, // ID de l'auteur
    };

    try {
      // Envoi de la requête au backend
      const response = await fetch(
        "http://localhost:5000/api/recipes/create/",
        {
          method: "POST", // Type de requête
          headers: {
            "Content-Type": "application/json", // Type des données envoyées
          },
          body: JSON.stringify(recipeFinal), // Convertit les données en JSON
        }
      );

      const data = await response.json(); // Récupère la réponse au format JSON

      // Vérification de la réponse
      if (!response.ok) {
        if (data.error) {
          toast.error(data.error); // Affiche l'erreur retournée par le backend
        } else {
          toast.error("Une erreur inattendue est survenue."); // Message générique
        }
        return;
      }

      // Succès
      toast.success("Recette créée avec succès !");
      goBack();
    } catch (err) {
      // Gestion des erreurs réseau ou serveur
      console.error(err);
      toast.error("Échec de la connexion au serveur. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={goBack} className={styles.button1}>
            Retour
          </button>
          <h1>Créer une nouvelle recette</h1>
        </div>

        <div className={styles.recipeForm}>
          <div className={styles.titleForm}>Informations Globales :</div>
          <div className={styles.formGroup}>
            <label>Nom de la recette</label>
            <input
              type="text"
              name="name"
              value={recipeData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={recipeData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Portion de Base</label>
            <select
              name="basePortion"
              value={recipeData.basePortion}
              onChange={handleInputChange}
            >
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} portions
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Lien de la recette</label>
            <input
              type="text"
              name="link"
              value={recipeData.link}
              onChange={handleInputChange}
            />
          </div>

          <p>{JSON.stringify(recipeData)}</p>
        </div>

        <div className={styles.ingredientForm}>
          <div className={styles.ingredientHeader}>
            <div className={styles.titleForm}>Ingrédients :</div>
            <button
              className={styles.addIngredientButton}
              data-hover-message="Ajouter un ingrédient"
              onClick={addIngredient}
            >
              +
            </button>
            <button
              className={styles.addIngredientButton}
              data-hover-message="Exemple d'ingrédient ajoutés"
            >
              i
            </button>
          </div>

          {ingredients.length > 0 ? (
            <div className={styles.ingredientList}>
              {ingredients.map((ingredient, index) => (
                <div key={index} className={styles.ingredientItem}>
                  <div>{index + 1 + ". "}</div>
                  <input
                    type="text"
                    placeholder="Nom de l'ingrédient"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Quantité"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleIngredientChange(index, "quantity", e.target.value)
                    }
                  />
                  <select
                    name="ingredientUnit"
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                  >
                    {units.map((unit, i) => (
                      <option key={i} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Prix (en CAD)"
                    value={ingredient.price}
                    onChange={(e) =>
                      handleIngredientChange(index, "price", e.target.value)
                    }
                  />
                  <button
                    className={styles.button1}
                    onClick={() => removeIngredient(index)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          <p>{JSON.stringify(ingredients)}</p>
        </div>

        <div className={styles.ingredientForm}>
          <div className={styles.titleForm}>
            Souhaiter vous enregistrées la recette ? :
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.button1} onClick={handleSubmit}>
              Enregistrer la recette
            </button>
            <button className={styles.button1} onClick={goBack}>
              Annuler la création de recette
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateCost(ingredient) {
  let totalCost = 0;
  ingredient.forEach((ing) => {
    totalCost += parseFloat(ing.price);
  });
  return totalCost;
}
