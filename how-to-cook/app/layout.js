"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./styles/globals.css"; // Import des styles globaux
import styles from "./styles/RootLayout.module.css"; // Import des styles spécifiques
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture/fermeture de la sidebar
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État de connexion de l'utilisateur

  const pathname = usePathname();
  const hiddenPaths = ["/login", "/register"];
  const showNav = !hiddenPaths.includes(pathname);

  // Simuler la vérification d'authentification
  useEffect(() => {
    // Vérifier la session ou le token
    const token = localStorage.getItem("token"); // Récupérer un token stocké
    setIsAuthenticated(!!token); // Si le token existe, l'utilisateur est connecté
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Alterne entre ouvert et fermé
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    setIsAuthenticated(false); // Met à jour l'état
    window.location.href = "/";
  };

  return (
    <html lang="en">
      <head>
        <title>How to cook</title>
      </head>
      <body>
        <header className="headder">
          <div className={styles.container}>
            {/* Bouton pour ouvrir/fermer la sidebar */}
            {showNav && (
              <button className={styles.menubtn} onClick={toggleSidebar}>
                &#9776;
              </button>
            )}
            {showNav && (
              <ul className={styles.nav}>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link href="/">Dashboard</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className={styles.logoutBtn}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/login">Login</Link>
                    </li>
                    <li>
                      <Link href="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
          {/* Sidebar */}
          <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
            <button className={styles.closeBtn} onClick={toggleSidebar}>
              ✖ {/* Icône de fermeture */}
            </button>
            <ul>
              {isAuthenticated ? (
                <>
                  <li>
                    <Link href="/" onClick={toggleSidebar}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/" onClick={toggleSidebar}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" onClick={toggleSidebar}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" onClick={toggleSidebar}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </header>
        <main className={styles.content}>
          {children} {/* Contenu dynamique */}
          <Toaster position="top-center" /> {/* Composant de notification */}
        </main>
      </body>
    </html>
  );
}
