<template>
  <div class="item-select">
    <h2 class="text-search"></h2>
    <div class="custom-select">
      <div
        class="selected-option"
        @click.stop="optonForShow === 'Оберіть' ? toggleOptionsList() : null"
      >
        <span class="elem-prev">{{
          propName === "time" && optonForShow !== "Оберіть"
            ? optonForShow + " min"
            : propName === "ingredient" && optonForShow !== "Оберіть"
            ? optonForShow.name
            : optonForShow
        }}</span>

        <svg
          v-if="optonForShow === 'Оберіть'"
          :class="{ active: showOptionsList }"
          class="search-arrow"
          width="18px"
          height="18px"
        >
          <use href="@/assets/SPRITE.svg#search-arrow"></use>
        </svg>
        <button class="clearSelection" @click.stop="clearSelection()">
          <img
            v-if="optonForShow !== 'Оберіть'"
            width="18px"
            height="18px"
            src="@/assets/x.svg"
          />
        </button>
      </div>
      <ul
        v-show="showOptionsList && optonForShow === 'Оберіть'"
        class="options-list"
        :class="{ active: showOptionsList }"
      >
        <li v-for="(option, index) in options" :key="index" class="option">
          <button
            v-if="option"
            class="option-item"
            @click="setSelectedOption(option)"
          >
            {{
              propName === "time"
                ? option + " min"
                : propName === "ingredient"
                ? option.name
                : option
            }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DropDownList from "@/components/UI/DropDownList";
import store from "@/store/index";

function universalCompare(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  } else {
    return String(a).localeCompare(String(b), undefined, { numeric: true });
  }
}

export default {
  name: "Filter",
  props: ["propName", "propsName"],
  components: {
    DropDownList,
  },

  data() {
    return {
      optonForShow: "Оберіть",
      showOptionsList: false,
      selectedOption: null,
    };
  },

  methods: {
    clearSelection() {
      if (this.optonForShow !== "Оберіть") {
        this.optonForShow = "Оберіть";
        store.dispatch("set", { key: this.propName, value: "" });
        this.setFilterValue();
        this.setSelectedOption();
      }
    },

    toggleOptionsList() {
      this.showOptionsList = !this.showOptionsList;
      console.log(store.state);
      if (this.showOptionsList) {
        document.addEventListener("click", this.toggleOptionsList);
      } else {
        document.removeEventListener("click", this.toggleOptionsList);
      }
    },

    setSelectedOption(option) {
      if (option) {
        this.optonForShow = option;
        if (this.propName !== "ingredient") {
          store.dispatch("set", { key: this.propName, value: option });
        } else {
          store.dispatch("set", { key: this.propName, value: option._id });
        }
        this.setFilterValue();
      }

      store
        .dispatch("fetchRecipesAfterUpdate")
        .then(() => {
          this.isLoading = false;
          this.isLoaded = true;
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },

    setFilterValue() {
      const { area, time, ingredient, category } = store.state;

      const filteredRecipes = store.state.allRicipes.filter((recipe) => {
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
          console.log("waw");
          return false;
        }
        if (category && recipe.category !== category) {
          return false;
        }

        if (
          this.query &&
          !recipe.title.toLowerCase().includes(this.query.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
      console.log(filteredRecipes);
      const uniqueAreas = [
        ...new Set(filteredRecipes.map((recipe) => recipe.area)),
      ];
      console.log(uniqueAreas);
      store.dispatch("set", { key: "areasFilter", value: uniqueAreas });

      const uniqueTimes = [
        ...new Set(filteredRecipes.map((recipe) => recipe.time)),
      ];
      store.dispatch("set", { key: "timesFilter", value: uniqueTimes });

      const uniqueIngredients = [
        ...new Set(
          filteredRecipes.flatMap((recipe) =>
            recipe.ingredients.map((ingredient) => ingredient.id)
          )
        ),
      ];

      const uniqueFromIngredients = store.state.ingredients.filter(
        (ingredient) => uniqueIngredients.includes(ingredient._id)
      );

      store.dispatch("set", {
        key: "ingredientsFilter",
        value: uniqueFromIngredients,
      });

      const uniqueCategories = [
        ...new Set(filteredRecipes.map((recipe) => recipe.category)),
      ];

      store.dispatch("set", {
        key: "categoriesFilter",
        value: uniqueCategories,
      });
    },
  },

  computed: {
    options() {
      return this.optionsForSort.slice().sort(universalCompare);
    },

    optionsForSort() {
      const filterPropName = this.propsName + "Filter";

      if (store.state[filterPropName].length > 0) {
        return store.state[filterPropName];
      } else {
        if (this.propsName === "ingredients") {
          return store.state[this.propsName].slice().sort((a, b) => {
            return universalCompare(a.name, b.name);
          });
        }
        return store.state[this.propsName];
      }
    },
  },
};
</script>

<style lang="scss">
.clearSelection {
  position: absolute;
  top: 15px;
  right: 18px;
  bottom: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
}

.search-arrow {
  fill: var(--gray-title-w);
  transition: transform 0.3s ease;
}
.search-arrow.active {
  transform: rotate(180deg);
}

.text-search {
  color: var(--gray-title-w);
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 8px;
}

.custom-select {
  position: relative;
  display: inline-block;
}

.search-arrow {
  position: absolute;
  top: 15px;
  right: 18px;
  bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
  width: 20px;
  height: 20px;
  fill: var(--gray-title-w);
}

.custom-select .selected-option {
  background-color: var(--white-w);
  display: flex;
  align-items: center;
  max-width: 100%;
  width: 160px;

  cursor: pointer;
  @media screen and (min-width: 768px) {
    width: 125px;
  }
}

@media screen and (min-width: 768px) {
  .custom-select .selected-area {
    width: 141px;
  }
}

.custom-select .selected-option span {
  margin-right: 5px;
}

.custom-select .options-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 9;
  list-style: none;
  background-color: var(--white-d);
  border-top: none;
  display: none;
}

.custom-select .options-list .option {
  text-align: left;
  cursor: pointer;
}

.option:hover .option-item {
  color: var(--black);
  transition: var(--trns-general);
}
.item-ingridienst {
  background-color: var(--white-w);
  width: 188px;
  max-width: 100%;
  border-radius: 15px;
  padding: 14px 18px;
  cursor: pointer;
  border: 1px solid var(--gray-border-w);
  align-items: center;
  display: flex;
}

.options-list {
  overflow-y: auto;
  position: absolute;
  height: 124px;
  padding-top: 6px;
  padding-left: 18px;
  padding-bottom: 6px;
  border-radius: 14px;
  background-color: var(--white-d);
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.02);
}

.option-item {
  width: 100%;
  padding: 0;
  text-align: left;
  color: var(--gray-ul-w);
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  line-height: 18px;
}

.selected-option {
  padding: 14px 18px;
  border-radius: 15px;
  border: 1px solid var(--gray-border-w);
}

.elem-prev {
  color: var(--gray-title-w);
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  line-height: 18px;
}

.elem-prev-active {
  color: var(--black);
}

.option {
  color: var(--gray-ul-w);
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  line-height: 18px;
}

.option:not(:last-child) {
  margin-bottom: 8px;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: var(--gray-border-w);
}

.options-list.active {
  display: block;
}
</style>
