import mongoose, { Schema, Document } from "mongoose";

interface IIngredient {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  type: "indiv" | "div";
}

interface IRecipe extends Document {
  name: string;
  link: string;
  image: string;
  basePortion: number;
  author: string;
  likes: string[];
  cost: number;
  ingredients: IIngredient[];
  description: string; // Ajout de l'attribut description
}

const IngredientSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ["indiv", "div"], required: true },
});

const RecipeSchema: Schema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
  basePortion: { type: Number, required: true },
  author: { type: String, required: true },
  likes: { type: [String], default: [] },
  cost: { type: Number, required: true },
  ingredients: { type: [IngredientSchema], required: true },
  description: { type: String, required: true }, // Ajout dans le schéma
});

const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
export type { IRecipe, IIngredient };
