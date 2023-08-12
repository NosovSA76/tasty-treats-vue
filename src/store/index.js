import { createStore } from "vuex";
import axios from "axios";
import { useRouter, router, useRoute } from "vue-router";

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
    totalPages: 1,

    fullRecipe: {},
    categories: [],
    areas: [],
    ingredients: [],
    times: [],
    recipes: [],
    titles: [],
    allRicipes: [],

    ingredientsForFiltr: [],
    favoritesReciepts: [],

    timesFilter: [],
    areasFilter: [],
    titlesFilter: [],
    categoriesFilter: [],
    ingredientsFilter: [],

    heroModal: false,
    recieptModal: false,
  },

  getters: {
    
  },
  mutations: {
    setLimit(state, limit) {
      state.limit = limit;
    },

    set(state, { key, value }) {
      if (state.hasOwnProperty(key)) {
        state[key] = value;
      }
    }, 
    setHeroModal(state, value) {
      state.heroModal = value;
    },
    setRecieptModal(state, value) {
      state.recieptModal = value;
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
        const allTitles = Array.from(
          new Set(Allrecipes.data.results.map((recipe) => recipe.title))
        );
        commit("set", { key: "allRicipes", value: Allrecipes.data.results });
        commit("set", { key: "categories", value: allCategories });
        commit("set", { key: "areas", value: allAreas });
        commit("set", { key: "ingredients", value: allIngredients });
        commit("set", { key: "times", value: allTimes });
        commit("set", { key: "titles", value: allTitles });
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

    async fetchRecipesAfterUpdate({ state, commit, dispatch }, query) {
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
        commit("set", {
          key: "recipes",
          value: Allrecipes.data.results,
        },);
        
        commit("set", { key: "totalPages", value: Allrecipes.data.totalPages });
        
      } catch (error) {
        console.log(error);
      }
    },

    async  FechFullRecipe({ commit }, id, dispatch, state) {
      const BASE_URL = `https://tasty-treats-backend.p.goit.global/api/recipes`;
      try {
        const Recipe = await axios.get(`${BASE_URL}/${id}`);
        commit("set", {
          key: "fullRecipe",
          value: Recipe.data,
        })
      } catch (error) {
        console.log(error);
      } finally{ 
        commit("set", { key: "recieptModal", value: true })
        }
    },

    setFilterValue({ state, commit, dispatch }) {
      const { area, time, ingredient, category, title } = state;
      
      const filteredRecipes = state.allRicipes.filter((recipe) => {
        if (area && recipe.area !== area) {
          return false;
        }
        if (time && recipe.time !== time) {
          return false;
        }
        if (
          ingredient &&
          !recipe.ingredients.some((ingr) => ingr.id === ingredient)
        ) {
          return false;
        }
        if (category && recipe.category !== category) {
          return false;
        }

        if (
          title &&
          !recipe.title.toLowerCase().includes(title.toLowerCase())
        ) {
          return false;
        }
        return true;
      });
     
      const uniqueAreas = [
        ...new Set(filteredRecipes.map((recipe) => recipe.area)),
      ];
      dispatch("set", { key: "areasFilter", value: uniqueAreas });

      const uniqueTimes = [
        ...new Set(filteredRecipes.map((recipe) => recipe.time)),
      ];
      dispatch("set", { key: "timesFilter", value: uniqueTimes });

      const uniqueIngredients = [
        ...new Set(
          filteredRecipes.flatMap((recipe) =>
            recipe.ingredients.map((ingredient) => ingredient.id)
          )
        ),
      ];

      const uniqueFromIngredients = state.ingredients.filter((ingredient) =>
        uniqueIngredients.includes(ingredient._id)
      );

      dispatch("set", {
        key: "ingredientsFilter",
        value: uniqueFromIngredients,
      });

      const uniqueCategories = [
        ...new Set(filteredRecipes.map((recipe) => recipe.category)),
      ];

      dispatch("set", {
        key: "categoriesFilter",
        value: uniqueCategories,
      });

      const uniqueTitles = [
        ...new Set(filteredRecipes.map((recipe) => recipe.title)),
      ];

      dispatch("set", {
        key: "titlesFilter",
        value: uniqueTitles,
      });
    },

    setHeroModal({ commit }, value) {
      commit("setHeroModal", value);
    },

    setRecieptModal({ commit }, value) {
      commit("setRecieptModal", value);
    },

  },
});
