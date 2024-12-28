import Link from "next/link";
import recipes from "../data/recipes.json";

export default function Recipes() {
  return (
    <div>
      <h1>Our Recipes</h1>
      <ul>
        {recipes.recipes.map((recipe) => (
          <li key={recipe._id}>
            <Link href={`/recipes/${recipe._id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
