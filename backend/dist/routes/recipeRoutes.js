"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipeModel_1 = __importDefault(require("../models/recipeModel"));
const router = express_1.default.Router();
// 1. Récupérer toutes les recettes
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipeModel_1.default.find();
        res.status(200).json(recipes);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: "An error occurred while fetching recipes." });
    }
}));
// 1. Récupérer les n premières recettes les plus populaires
router.get("/mostLiked/:nb", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nb = parseInt(req.params.nb); // Convertir le paramètre nb en entier
        if (isNaN(nb) || nb <= 0) {
            return res
                .status(400)
                .json({ error: "Invalid number of recipes requested." });
        }
        // Récupérer les recettes triées par la taille du tableau likes
        const recipes = yield recipeModel_1.default.find()
            .sort({ likes: -1 }) // Trier par la taille du tableau likes décroissante
            .limit(nb); // Limiter le nombre de résultats à nb
        res.status(200).json(recipes);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: "An error occurred while fetching recipes." });
    }
}));
// 2. Récupérer une recette par ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const recipe = yield recipeModel_1.default.findById(id);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found." });
        }
        res.status(200).json(recipe);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: "An error occurred while fetching the recipe." });
    }
}));
// 3. Récupérer les recettes d'un utilisateur
router.get("/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const recipes = yield recipeModel_1.default.find({ author: userId });
        res.status(200).json(recipes);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: "An error occurred while fetching recipes." });
    }
}));
// 4. Créer une recette
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupération des données depuis le corps de la requête
        const { name, link, image, basePortion, author, likes, cost, ingredients, description, } = req.body;
        // Validation simple des données requises
        if (!name ||
            !link ||
            !image ||
            !basePortion ||
            !author ||
            !cost ||
            !ingredients ||
            !description) {
            return res.status(400).json({ error: "All fields are required." });
        }
        // Création d'une nouvelle recette
        const newRecipe = new recipeModel_1.default({
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
        yield newRecipe.save();
        // Réponse avec succès
        res.status(201).json({
            message: "Recipe created successfully.",
            recipe: newRecipe,
        });
    }
    catch (err) {
        console.error("Error creating recipe:", err);
        res
            .status(500)
            .json({ error: "An error occurred while creating the recipe." });
    }
}));
// 5. Mettre à jour une recette par ID
router.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // Récupération de l'ID de la recette à modifier
        const updateData = req.body; // Récupération des données de mise à jour
        // Rechercher la recette et appliquer les modifications
        const updatedRecipe = yield recipeModel_1.default.findByIdAndUpdate(id, updateData, {
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
    }
    catch (err) {
        console.error("Error updating recipe:", err);
        res
            .status(500)
            .json({ error: "An error occurred while updating the recipe." });
    }
}));
// 6. Supprimer une recette par ID
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Vérifiez si la recette existe avant de la supprimer
        const recipe = yield recipeModel_1.default.findById(id);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found." });
        }
        // Supprimez la recette
        yield recipeModel_1.default.findByIdAndDelete(id);
        // Répondez avec un message de confirmation
        res.status(200).json({ message: "Recipe successfully deleted." });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ error: "An error occurred while deleting the recipe." });
    }
}));
exports.default = router;
