import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    page: 1,
    query: "",
    area: "",
    time: "",
    ingredient: "",
    category: "",
    title: "",
    limit: 6,
    categories: [],
    areas: [],
    ingredients: [],
    times: [],
    recipes: [],
    ingredientsForFiltr: [],
    allRicipes: [],
    timesFilter: [],
    areasFilter: [],
    categoriesFilter: [],
    ingredientsFilter: [],
  },

  getters: {},
  mutations: {
    setLimit(state, limit) {
      state.limit = limit;
    },

    setRecipes(state, recipes) {
      state.recipes = recipes;
    },

    set(state, { key, value }) {
      if (state.hasOwnProperty(key)) {
        state[key] = value;
      }
    },
  },
  actions: {
    set({ commit }, { key, value }) {
      commit("set", { key, value });
    },

    async fetchAllIngredients({ commit }) {
      const INGREDIENTS_URL =
        "https://tasty-treats-backend.p.goit.global/api/ingredients";

      try {
        const response = await axios.get(INGREDIENTS_URL);
        const ingredientsData = response.data;

        // Convert ingredientsData to the desired format
        const formattedIngredients = ingredientsData.map((ingredient) => {
          return {
            _id: ingredient._id,
            name: ingredient.name,
          };
        });

        commit("set", {
          key: "ingredientsForFiltr",
          value: formattedIngredients,
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchAllRecipeValues({ state, commit, dispatch }) {
      // Встановлюємо ліміт великим числом (5000)
      this.commit("setLimit", 5000);
      const BASE_URL = "https://tasty-treats-backend.p.goit.global/api/recipes";
      const url = BASE_URL;
      const params = {
        category: state.category,
        page: state.page,
        limit: state.limit,
        time: state.time,
        area: state.area,
        ingredient: state.ingredient,
        title: state.title,
      };

      try {
        const Allrecipes = await axios.get(url, { params });
        const allCategories = Array.from(
          new Set(Allrecipes.data.results.map((recipe) => recipe.category))
        );
        const allAreas = Array.from(
          new Set(Allrecipes.data.results.map((recipe) => recipe.area))
        );
        const allIngredientsIds = Array.from(
          new Set(
            Allrecipes.data.results.flatMap((recipe) =>
              recipe.ingredients.map((ingredient) => ingredient.id)
            )
          )
        );
        const allIngredients = allIngredientsIds.map((ingredientId) => {
          const foundIngredient = state.ingredientsForFiltr.find(
            (ingredient) => ingredient._id === ingredientId
          );
          return {
            _id: foundIngredient._id,
            name: foundIngredient.name,
          };
        });

        const allTimes = Array.from(
          new Set(Allrecipes.data.results.map((recipe) => recipe.time))
        );
        commit("set", { key: "allRicipes", value: Allrecipes.data.results });
        commit("set", { key: "categories", value: allCategories });
        commit("set", { key: "areas", value: allAreas });
        commit("set", { key: "ingredients", value: allIngredients });
        commit("set", { key: "times", value: allTimes });
      } catch (error) {
        console.log(error);
      }
    },

    setLimitValue({ state }) {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        return 6;
      } else if (windowWidth < 1280) {
        return 8;
      } else {
        return 9;
      }
    },

    async fetchRecipesAfterUpdate({ state, commit, dispatch }) {
      const BASE_URL = "https://tasty-treats-backend.p.goit.global/api/recipes";
      const url = BASE_URL;
      const searchLimit = await dispatch("setLimitValue");
      const params = {
        category: state.category,
        page: state.page,
        limit: searchLimit,
        time: state.time,
        area: state.area,
        ingredient: state.ingredient,
        title: state.title,
      };

      try {
        const Allrecipes = await axios.get(url, { params });
        commit("setRecipes", Allrecipes.data.results);
        console.log(Allrecipes.data.results);
        // console.log(store.state);
      } catch (error) {
        console.log(error);
      } finally {
        console.log(state.recipes);
      }
    },
  },
  modules: {},
});
