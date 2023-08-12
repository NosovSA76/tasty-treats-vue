<template>
  <div class="category-container">
    <button @click="cleanSelectadCategory" :class="['all-category-button', { active: selectedCategory === '' }]" id="all-category-btn">
      All categories
    </button>
    <div class="categories-container">
      <ul class="category-list">
          <li class='cat-items' v-for="(category, index) in categoriesForSelect" :key="index">
          <button :class="['category-btn', { active: selectedCategory === category }]" @click="setSelectedCategory(category)">{{category}}</button>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  name: "AllCategory",

  data() {
    return {
      selectedCategory: ""
    };
  },
  methods: {
    setSelectedCategory(category) {
      this.selectedCategory = category;
      this.getDate();
    },

    cleanSelectadCategory() {
      this.selectedCategory = "";
      this.getDate();
    },

    getDate() {
      store.dispatch("set", { key: "category", value: this.selectedCategory });
      store.dispatch("set", {key: "page", value: 1});
      store.dispatch("setFilterValue");
      store
        .dispatch("fetchRecipesAfterUpdate")
        .then()
        .catch((error) => {
          console.log(error);
        });
    },

  },

    computed: {
      categoriesForSelect() {
      if (store.state.categoriesFilter.length > 0) {
        return store.state.categoriesFilter.sort((a, b) => {
          return a.localeCompare(b, "en", { sensitivity: "base" });
        });
      } else {
        return store.state.categories.sort((a, b) => {
          return a.localeCompare(b, "en", { sensitivity: "base" });
        });
      }
    },
  },

  
}
</script>

<style lang="scss">
.category-container {
  max-height: 402px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    max-height: 496px;
    max-width: 176px;
    margin-bottom: 0;
  }
  @media screen and (min-width: 1280px) {
    max-height: 540px;
    max-width: 174px;
  }
}

.all-category-button {
  width: 176px;
  height: 50px;
  border: 1px solid var(--gray-border-w);
  background-color: var(--background-w);
  border-radius: 15px;
  font-family: var(--main-font);
  font-weight: 500;
  font-size: 18px;
  color: var(--gray-title-w);
  margin-bottom: 24px;
  cursor: pointer;
  padding: 14px 10px;
  transition: var(--trns-general);
  @media screen and (min-width: 768px) {
    margin-bottom: 30px;
  }
  @media screen and (min-width: 1280px) {
    width: 174px;
  }
  &:hover,
  &:focus {
  background-color: var(--green);
  color: var(--white-w);
  border: 1px solid var(--green);
}

}

.all-category-button.active {
  border: 1px solid var(--green);
  background-color: var(--green);
  color: var(--white-w);
}

.category-list {
  height: 198px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow-y: scroll;
  @media screen and (min-width: 768px) {
    width: 176px;
    height: 416px;
    gap: 24px;
  }
  @media screen and (min-width: 1280px) {
    width: 235px;
  }
}

.category-btn {
  border: none;
  background-color: transparent;
  color: var(--gray-ul-w);
  font-size: 14px;
  font-weight: 500;
  font-family: var(--main-font);
  cursor: pointer;
  padding: 0;
  transition: var(--trns-general);
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
}

.category-btn:hover {
  color: var(--green);
}

.category-btn.active {
  color: var(--green);
}
.onFocus {
  color: var(--green);
  background-color: var(--green);
}
</style>
