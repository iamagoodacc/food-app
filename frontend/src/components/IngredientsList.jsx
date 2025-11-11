
export default function IngredientsList(props) {

    const ingredientsList = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
              {ingredientsList}
            </ul>

            {ingredientsList.length > 3 && (
              <div className="get-recipe-container">
                <div>
                  <h3>Ready for a recipe?</h3>
                  <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.toggleRecipeShown}>Get a recipe</button>
              </div>
            )}
          </section>
    )
}