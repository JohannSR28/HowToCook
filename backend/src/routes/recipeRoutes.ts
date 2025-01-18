import express, { Request, Response, Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import Recipe from "../models/recipeModel";

const router: Router = express.Router();

// 1. Récupérer toutes les recettes
router.get("/", async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching recipes." });
  }
});

// 1. Récupérer les n premières recettes les plus populaires
router.get("/mostLiked/:nb", async (req: Request, res: Response) => {
  try {
    const nb = parseInt(req.params.nb); // Convertir le paramètre nb en entier

    if (isNaN(nb) || nb <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid number of recipes requested." });
    }

    // Récupérer les recettes triées par la taille du tableau likes
    const recipes = await Recipe.find()
      .sort({ likes: -1 }) // Trier par la taille du tableau likes décroissante
      .limit(nb); // Limiter le nombre de résultats à nb

    res.status(200).json(recipes);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching recipes." });
  }
});

// 2. Récupérer une recette par ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }
    res.status(200).json(recipe);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the recipe." });
  }
});

// 3. Récupérer les recettes d'un utilisateur
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const recipes = await Recipe.find({ author: userId });
    res.status(200).json(recipes);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching recipes." });
  }
});

// 4. Créer une recette
router.post("/create", async (req: Request, res: Response) => {
  try {
    // Récupération des données depuis le corps de la requête
    const {
      name,
      link,
      image,
      basePortion,
      author,
      likes,
      cost,
      ingredients,
      description,
    } = req.body;

    // Validation simple des données requises
    if (
      !name ||
      !link ||
      !image ||
      !basePortion ||
      !author ||
      !cost ||
      !ingredients ||
      !description
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Création d'une nouvelle recette
    const newRecipe = new Recipe({
      name,
      link,
      image,
      basePortion,
      author,
      likes: likes || [], // Par défaut, un tableau vide si non fourni
      cost,
      ingredients,
      description,
    });

    // Sauvegarde dans la base de données
    await newRecipe.save();

    // Réponse avec succès
    res.status(201).json({
      message: "Recipe created successfully.",
      recipe: newRecipe,
    });
  } catch (err) {
    console.error("Error creating recipe:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the recipe." });
  }
});

// 5. Mettre à jour une recette par ID
router.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Récupération de l'ID de la recette à modifier
    const updateData = req.body; // Récupération des données de mise à jour

    // Rechercher la recette et appliquer les modifications
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
      new: true, // Retourne la recette mise à jour
      runValidators: true, // Valide les données avant mise à jour
    });

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    res.status(200).json({
      message: "Recipe updated successfully.",
      recipe: updatedRecipe,
    });
  } catch (err) {
    console.error("Error updating recipe:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the recipe." });
  }
});

// 6. Supprimer une recette par ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Vérifiez si la recette existe avant de la supprimer
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    // Supprimez la recette
    await Recipe.findByIdAndDelete(id);

    // Répondez avec un message de confirmation
    res.status(200).json({ message: "Recipe successfully deleted." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the recipe." });
  }
});

export default router;
