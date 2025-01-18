import React from "react";

export default function IngredientListItem({ ingredients }) {
  // this component create a modifiable ingredient form
  // the ingredient awaited format is
  /*   
name : "Chicken Breast"
quantity : 500
unit : "g"
price : 7
type : "indiv"
_id : "60f3b3b3b3b3b3b3b3b3b3b3" 
  */

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newIngredients = [...ingredients];
    newIngredients[index][name] = value;
    // Assuming you have a function to update the state of ingredients
    updateIngredients(newIngredients);
  };

  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <div key={ingredient._id}>
          <input
            type="text"
            name="name"
            value={ingredient.name}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="number"
            name="quantity"
            value={ingredient.quantity}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="unit"
            value={ingredient.unit}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="number"
            name="price"
            value={ingredient.price}
            onChange={(e) => handleChange(e, index)}
          />
          <input
            type="text"
            name="type"
            value={ingredient.type}
            onChange={(e) => handleChange(e, index)}
          />
        </div>
      ))}
    </div>
  );
}
