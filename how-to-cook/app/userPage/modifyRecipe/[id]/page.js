"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/CreateNewRecipe.module.css";
//import IngredientList from "../../../components/IngredientList";
//import ColorLike from "../../../components/ColorLike";
//import GeolocationComponent from "../../../components/GeoLocalisationComponent";
import { useUser } from "../../../../contexts/UserContext";
import toast from "react-hot-toast";
import { getRecipeById, updateRecipe } from "../../../api/api";

export default function Recipe({ params }) {
  const router = useRouter();
  const { user } = useUser();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupérer l'ID de la recette depuis les paramètres
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  // État pour stocker les informations de la recette
  const [recipeData, setRecipeData] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipeById(id); // Appel de l'API pour récupérer la recette
        const data = response.recipe;
        setRecipe(data);

        // Met à jour les états supplémentaires basés sur la recette
        setRecipeData({
          name: data.name,
          description: data.description,
          basePortion: data.basePortion,
          link: data.link,
          author: data.author,
          image: data.image,
          likes: data.likes,
          cost: data.cost,
        });
        setIngredients(data.ingredients);
      } catch (err) {
        setError(err.message); // Capture l'erreur
      } finally {
        setLoading(false); // Arrête l'état de chargement
      }
    };

    fetchRecipe();
  }, [id]);

  const goBack = () => {
    router.back(); // Revient à la page précédente
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  // Ajouter un ingrédient
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", quantity: "", unit: "unit", price: "", type: "indiv" },
    ]);
  };

  // Fonction pour mettre à jour l'état dynamiquement
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: name === "basePortion" ? parseInt(value) : value, // Convertir les portions en entier
    }));
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
    e.preventDefault();

    const recipeFinal = {
      ...recipeData,
      cost: calculateCost(ingredients),
      ingredients: ingredients,
    };

    try {
      await updateRecipe(id, recipeFinal);
      toast.success("Recette modifiée avec succès !");
      goBack();
    } catch (err) {
      // Gestion des erreurs spécifiques
      if (err.message.includes("non autorisé")) {
        toast.error("Vous n'avez pas les droits pour modifier cette recette");
      } else if (err.message.includes("introuvable")) {
        toast.error("Recette non trouvée");
      } else {
        toast.error(err.message || "Échec de la connexion au serveur");
      }
    }
  };

  // Affichage de la recette
  return user && user.userId == recipe.author ? (
    <div className={styles.container}>
      <div style={{ display: "flex" }}>
        <button onClick={goBack} className={styles.button1}>
          Annuler
        </button>
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

        {/*<p>{JSON.stringify(recipeData)}</p>*/}
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
        {/*<p>{JSON.stringify(ingredients)}</p>*/}
      </div>
      <div className={styles.ingredientForm}>
        <div className={styles.titleForm}>Confirmer les modifications ? :</div>
        <div className={styles.buttonGroup}>
          <button className={styles.button1} onClick={handleSubmit}>
            Enregistrer les modifications
          </button>
          <button className={styles.button1} onClick={goBack}>
            Annuler la modifications de la recette
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      {" "}
      <button onClick={goBack} className={styles.button1}>
        Annuler
      </button>
      <div>Vous n&apos;êtes pas l&apos;auteur de cette recette.</div>
      <p>{user.userId}</p>
      <p>{recipe.author}</p>
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
