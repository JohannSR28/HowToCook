"use client";
import { useState } from "react";
import styles from "../styles/GeoLocalisationComponent.module.css";

export default function GeolocationComponent() {
  const [location, setLocation] = useState(null); // Stocker les coordonnées
  const [error, setError] = useState(null); // Stocker les erreurs éventuelles

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);
      },
      (err) => {
        setError("Impossible d'obtenir votre position. Veuillez réessayer.");
        console.error(err);
      }
    );
  };

  return (
    <div>
      <h1>Géolocalisation</h1>
      <button onClick={handleGeolocation} className={styles.button1}>
        Trouver ma position
      </button>

      {location && (
        <p>
          Votre position actuelle :
          <br />
          Latitude : {location.latitude} <br />
          Longitude : {location.longitude}
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
