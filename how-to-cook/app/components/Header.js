"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../styles/RootLayout.module.css";

export default function Header({
  isAuthenticated,
  toggleSidebar,
  handleLogout,
}) {
  const pathname = usePathname();
  const hiddenPaths = ["/login", "/register"];
  const showNav = !hiddenPaths.includes(pathname);

  return (
    <header className={styles.header}>
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
                  <button onClick={handleLogout} className={styles.logoutBtn}>
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
    </header>
  );
}
