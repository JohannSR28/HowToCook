import recipesData from "../../data/recipes.json";

export default async function Recipe({ params }) {
  const { id } = await params;
  const recipe = recipesData.recipes.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <div>Ingredients: {recipe.ingredients.join(", ")}</div>
    </div>
  );
}
