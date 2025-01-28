// Définir le type des ingrédients
export interface IIngredient {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  type: "indiv" | "div";
}

// Définir le type des recettes
export interface IRecipe {
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
