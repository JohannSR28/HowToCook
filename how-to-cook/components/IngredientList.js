import React, { useState } from "react";

const IngredientList = ({ recipe }) => {
  // État pour suivre les ingrédients cochés
  const [checkedItems, setCheckedItems] = useState([]);

  // Gestion des cases à cocher
  const handleCheck = (index) => {
    setCheckedItems(
      (prev) =>
        prev.includes(index)
          ? prev.filter((item) => item !== index) // Décoche l'élément
          : [...prev, index] // Coche l'élément
    );
  };

  // Calcul du total des éléments non barrés
  const calculateTotal = () => {
    return recipe.ingredients
      .filter((_, index) => !checkedItems.includes(index))
      .reduce((sum, ing) => sum + ing.price, 0)
      .toFixed(2); // Limite à 2 décimales
  };

  return (
    <div>
      <ul>
        {recipe.ingredients.map((ing, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "0px",
              textDecoration: checkedItems.includes(index)
                ? "line-through"
                : "none", // Barre les éléments cochés
            }}
          >
            <input
              type="checkbox"
              checked={checkedItems.includes(index)}
              onChange={() => handleCheck(index)}
              style={{ marginRight: "10px" }}
            />
            <p style={{ marginRight: "10px" }}>
              {ing.name},{" " + ing.quantity}
              {" " + ing.unit}
            </p>
            <p style={{ marginRight: "5px" }}>{" " + ing.price}</p>
            <p>CAD</p>
          </li>
        ))}
      </ul>
      <div
        style={{ marginTop: "10px", fontWeight: "bold", marginLeft: "30px" }}
      >
        Total :{" "}
        <span
          style={{
            color: "orange",
          }}
        >
          {calculateTotal()} CAD
        </span>
      </div>
    </div>
  );
};

export default IngredientList;
