import React from "react"
import Recipe from "./Recipe.jsx"
import IngredientsList from "./IngredientsList.jsx"

export default function Main() {

    let [ingredients, setIngredients] = React.useState(["All the main spices", "Pasta", "Ground beef", "Tomato paste"]);
    let [recipe, setRecipe] = React.useState("")

    function addIngredient(formData) {
        const ingredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, ingredient])
    }

    const getRecipe = async () => {
      const res = await fetch("http://localhost:5000/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: [...ingredients] }),
      });

      const data = await res.json();
      console.log(data);
      return data.recipe;
    };

    function toggleRecipeShown() {
      const promise = getRecipe()
      promise 
      .then((data) => {
        setRecipe (data);
      })
      .catch((error) => {
        console.error(`Could not get recipe: ${error}`);
      });
    }

    return (
      <main>
        <form action={addIngredient} id="add-ingredient-form">
          <input
            id="ingredient-input"
            type="text"
            placeholder="e.g. oregano"
            name="ingredient"
          ></input>
          <button id="ingredient-submit" type="submit">
            + Add Ingredient
          </button>
        </form>

        {ingredients.length > 0 && <IngredientsList ingredients = {ingredients} toggleRecipeShown = {toggleRecipeShown} />}

        {recipe && <Recipe recipe = {recipe}/>}
      </main>
    );
}