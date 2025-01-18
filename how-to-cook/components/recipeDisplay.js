import Image from "next/image"; // Utilisez Image si vous êtes sous Next.js ou remplacez par une balise <img>
import styles from "../styles/recipeDisplay.module.css"; // Importe le CSS

export default function RecipeDisplay({ recipe }) {
  return (
    <a href={`/recipes/${recipe._id}`} className={styles.meal_preview}>
      <div className={styles.meal_img_container}>
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={200}
          height={150} // Taille correspondant au CSS
          className={styles.image_fit} // Si vous utilisez next/image
        />
      </div>
      <div className={styles.meal_info}>
        <p className={styles.meal_name}>{recipe.name}</p>
        <div className={styles.texte_price}>
          Price per portion :{" "}
          <span className={styles.price}>{recipe.cost} CAD</span>
        </div>
      </div>
    </a>
  );
}
