"use client";

import { useState } from "react";
import Link from "next/link";
import "./styles/globals.css"; // Import des styles globaux
import styles from "./styles/RootLayout.module.css"; // Import des styles spécifiques
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture/fermeture

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Alterne entre ouvert et fermé
  };

  const pathname = usePathname();
  const hiddenPaths = ["/login", "/register"];
  const showNav = !hiddenPaths.includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>How to cook</title>
      </head>
      <body>
        <header className="headder">
          {/* Bouton pour ouvrir/fermer la sidebar */}
          {showNav && (
            <button className="menu-btn" onClick={toggleSidebar}>
              &#9776;
            </button>
          )}

          {/* Sidebar */}
          <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
            <button className={styles.closeBtn} onClick={toggleSidebar}>
              ✖ {/* Icône de fermeture */}
            </button>
            <ul>
              <li>
                <Link href="/" onClick={toggleSidebar}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={toggleSidebar}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={toggleSidebar}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" onClick={toggleSidebar}>
                  login
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <main className={styles.content}>
          {children} {/* Contenu dynamique */}
        </main>
      </body>
    </html>
  );
}

/* 



return (
    <html lang="en">
      <head>
        <title>How to cook</title>
      </head>
      <body>
        <header className={styles.header}>
          <i
            id="menu-icon"
            className={`material-icons ${styles.menuToggle}`}
            style={{ fontSize: 40, cursor: "pointer" }}
          >
            menu
          </i>
        </header>

        <div id="sidebar" className={styles.sidebar}>
          <i
            id="close-icon"
            className={`material-icons ${styles.menuToggle} ${styles.hidden}`}
            style={{ fontSize: 40, cursor: "pointer" }}
          >
            arrow_backward
          </i>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/recipes">Recipes</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/login">Login</Link>
          </nav>
        </div>

        <main>
          {showNav && (
            <nav className={styles.nav}>
              <Link href="/">Home</Link>
              <Link href="/recipes">Recipes</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/login">Login</Link>
            </nav>
          )}
          {children}
        </main>
      </body>
    </html>
  ); */
