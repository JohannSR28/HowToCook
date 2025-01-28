// types/User.ts

export interface IUser {
  name: string;
  username: string;
  email: string;
  password?: string; // Optionnel car pas nécessaire côté client, sauf lors de l'enregistrement
  recipesId: string[]; // Liste des IDs des recettes de l'utilisateur
}
