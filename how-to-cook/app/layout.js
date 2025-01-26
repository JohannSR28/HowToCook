"use client";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { UserProvider, useUser } from "../contexts/UserContext";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture/fermeture de la sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <html lang="en">
      <head>
        <title>How to cook</title>
      </head>
      <body>
        {/* Fournit le contexte utilisateur à tous les composants enfants */}
        <UserProvider>
          {/* Header et Sidebar consomment `useUser()` après le contexte */}
          <ContentLayout isOpen={isOpen} toggleSidebar={toggleSidebar}>
            {children}
          </ContentLayout>
          <Toaster position="top-center" />
        </UserProvider>
      </body>
    </html>
  );
}

function ContentLayout({ isOpen, toggleSidebar, children }) {
  const { isAuthenticated, handleLogout } = useUser(); // Appel correct après `UserProvider`

  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <Sidebar
        isOpen={isOpen}
        isAuthenticated={isAuthenticated}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <main className={styles.content}>{children}</main>
    </>
  );
}
