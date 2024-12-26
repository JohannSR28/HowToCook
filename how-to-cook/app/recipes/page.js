import Link from "next/link";
import recipes from "../data/recipes.json";

export default function Recipes() {
  return (
    <div>
      <h1>Our Recipes</h1>
      <ul>
        {recipes.recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
