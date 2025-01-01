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

export default router;
