"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Crée le contexte utilisateur
const UserContext = createContext();

// Fournisseur de contexte
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // État pour stocker les données utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État d'authentification

  // Vérifie et met à jour l'état utilisateur à partir du token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Décoder le token
        const now = Date.now() / 1000; // Heure actuelle en secondes

        if (decodedToken.exp && decodedToken.exp > now) {
          setUser(decodedToken); // Stocke les informations utilisateur
          setIsAuthenticated(true); // Marque l'utilisateur comme connecté
        } else {
          localStorage.removeItem("token"); // Supprime le token expiré
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Supprime le token corrompu ou invalide
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, setUser, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte utilisateur
export const useUser = () => useContext(UserContext);
