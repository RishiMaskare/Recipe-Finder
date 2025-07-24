const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const mealResult = document.getElementById("meal-result");
const loader = document.getElementById("loader");
const errorDiv = document.getElementById("error");

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
  mealResult.classList.add("hidden");
  setTimeout(() => errorDiv.classList.add("hidden"), 3000);
}

function showLoader() {
  loader.classList.remove("hidden");
  mealResult.classList.add("hidden");
  errorDiv.classList.add("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) {
    showError("Please enter a recipe name.");
    return;
  }

  showLoader();

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((res) => res.json())
    .then((data) => {
      hideLoader();
      if (data.meals) {
        const meal = data.meals[0];
        mealResult.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <h2>${meal.strMeal}</h2>
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Area:</strong> ${meal.strArea}</p>
          <p><strong>Instructions:</strong><br>${meal.strInstructions}</p>
        `;
        mealResult.classList.remove("hidden");
      } else {
        showError("No recipes found. Try a different keyword.");
      }
    })
    .catch(() => {
      hideLoader();
      showError("Something went wrong. Please try again later.");
    });
});
