const BASE_URL = "http://localhost:5000/api";

const headers = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Fetch all recipes for a user
export const fetchUserRecipes = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/user/${userId}`, {
      method: "GET",
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching user recipes:", err);
    throw err;
  }
};

// Create a new recipe
export const createRecipe = async (recipeData) => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/create`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (err) {
    console.error("Error creating recipe:", err);
    throw err;
  }
};

// Add more API functions as needed...
