"use client";

import Link from "next/link";
import styles from "../styles/RootLayout.module.css";

export default function Sidebar({
  isOpen,
  isAuthenticated,
  toggleSidebar,
  handleLogout,
}) {
  return (
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
  );
}
