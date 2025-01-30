const BASE_URL = "https://howtocook-backend.onrender.com/api"; // "http://localhost:5000/api";

const headers = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

const publicHeaders = () => {
  return {
    "Content-Type": "application/json",
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

// Récupère les recettes populaires
export const fetchPopularRecipes = async (nb) => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/mostLiked/${nb}`, {
      method: "GET",
      headers: publicHeaders(),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        errorMessage || "Erreur de récupération des recettes populaires"
      );
    }

    return await response.json();
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

// api.js
export const createRecipe = async (recipeData) => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/create/`, {
      method: "POST",
      headers: headers(), // Utilise les headers avec le token si disponible
      body: JSON.stringify(recipeData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || "Une erreur inattendue est survenue";
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    console.error("API Error (createRecipe):", err);
    throw err;
  }
};

export const getUserById = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "GET",
    headers: publicHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch the user.");
  }

  return response.json(); // Retourne les données JSON
};

export const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${id}`, {
      method: "DELETE",
      headers: headers(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete the recipe.");
    }

    return response.json();
  } catch (err) {
    console.error("API Error (deleteRecipe):", err);
    throw err;
  }
};

export const getRecipeById = async (id) => {
  const response = await fetch(`${BASE_URL}/recipes/update/${id}`, {
    method: "PUT",
    headers: publicHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch the recipe.");
  }

  return response.json(); // Retourne les données JSON
};

// api.js
export const updateRecipe = async (id, recipeData) => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/update/${id}`, {
      method: "PUT",
      headers: headers(), // Utilise les headers avec le token
      body: JSON.stringify(recipeData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || "Une erreur inattendue est survenue";
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    console.error("API Error (updateRecipe):", err);
    throw err;
  }
};

// login
export const authUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/users/auth`, {
      method: "POST",
      headers: publicHeaders(),
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || "Erreur d'authentification";
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    console.error("API Error (authUser):", err);
    throw err;
  }
};

//register
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error || "Erreur lors de l'inscription";
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    console.error("API Error (registerUser):", err);
    throw err;
  }
};
