<template>
  <div class="favorite-cards animate__animated animate__fadeInUp">
    <div class="container">
      <div class="favorite-button-list">
        <ul
          class="categories-list animate__animated animate__fadeInLeft"
          v-if="favoritesReciept.length > 0"
        >
          <li class="cat-items">
            <button
              class="favorite-category-btn"
              :class="{ actived: selectCategory === 'All category' }"
              @click="changeSelectCategory()"
            >
              All categories
            </button>
          </li>
          <li class="cat-items" v-for="(cat, index) in categories" :key="index">
            <button
              :class="{ actived: selectCategory === cat }"
              class="favorite-category-btn"
              @click="changeSelectCategory(cat)"
            >
              {{ cat }}
            </button>
          </li>
        </ul>
      </div>
      <ul class="favorite-render-cards">
        <ReceptCards
          :cardFavouritesClass="'card_favourites'"
          :recipes="filteredReciepts"
        ></ReceptCards>
      </ul>
      <div class="no-recipe-content" v-if="favoritesReciept.length === 0">
        <svg class="no-recipe-icon" width="68" height="58">
          <use href="@/assets/SPRITE.svg#icon-elements"></use>
        </svg>
        <p class="no-recipes">
          It appears that you haven't added any recipes to your favorites yet.
          To get started, you can add recipes that you like to your favorites
          for easier access in the future.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ReceptCards from "@/components/UI/Cards";
import store from "@/store/index";
import { save, load, remove } from '@/utils/localStorageHelpers';

export default {
  name: "FavoriteMain",
  components: {
    ReceptCards,
  },

  data() {
    return {
      favoritesReciept: [],
      selectCategory: "All category",
      filteredReciepts: [],
    };
  },

  methods: {

    changeSelectCategory(cat) {
      this.selectCategory = cat || "All category";
      this.updateFilteredReciepts();
    },

    updateFilteredReciepts() {
      console.log("222")
      if (this.selectCategory === "All category") {
        this.filteredReciepts = this.favoritesReciept;
      } else {
        const filtered = this.favoritesReciept.filter(
          (recipe) => recipe.category === this.selectCategory
        );
        if (filtered.length > 0) {
          this.filteredReciepts = filtered;
        } else {
          this.selectCategory = "All category";
          this.filteredReciepts = this.favoritesReciept;
        }
      }
    },
  },

  watch: {
    favoritesReciept: {
      handler(newFavoritesReciept) {
        this.favoritesReciept = newFavoritesReciept;
        this.updateFilteredReciepts();
      },
      deep: true, 
      // immediate: true, 
    },
  },

  mounted() {
    this.favoritesReciept = store.state.favoritesReciepts || [];
    this.updateFilteredReciepts();
    // this.$watch(
    //   () => store.state.favoritesReciepts,
    //   () => {
    //     this.favorites = load('favorites') || [];
    //     store.dispatch("set", { key: "favoritesReciepts", value: this.favorites });
    //   }
    // );
  },

  computed: {
    categories() {
      return [
        ...new Set(this.favoritesReciept.map((recipe) => recipe.category)),
      ];
    },
  },
};
</script>

<style lang="scss">
.no-recipe-content {
  display: flex;
  flex-direction: column;
}

.no-recipe-icon {
  margin: 0 auto;
  margin-bottom: 32px;
  @media screen and (min-width: 768px) {
    width: 97px;
    height: 83px;
  }
}

.no-recipes {
  text-align: center;
  font-size: 14px;
  line-height: 1.29;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    width: 481px;
    font-size: 16px;
    line-height: 1.5;
  }
}

.card_favourites {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 335px;
  height: 335px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--gallery-gradient);
  @media screen and (max-width: 767px) {
    margin-bottom: 24px;
  }
  @media screen and (min-width: 768px) {
      width: 224px;
    height: 264px;
  }
  @media screen and (min-width: 1280px) {
    width: 258px;
    height: 287px;
  }
}

.favorite-render-cards {
  @media screen and (min-width: 768px) {
    gap: 16px;
    display: flex;
    flex-wrap: wrap;
  }
  @media screen and (min-width: 1280px) {
    gap: 32px 16px;
  }
}

.star-favorite {
  width: 18px;
  height: 18px;
  fill: var(--gray-star-w);
  @media screen and (min-width: 768px) {
    width: 14px;
    height: 14px;
  }
  @media screen and (min-width: 1280px) {
    width: 18px;
    height: 18px;
  }
}

.favorite-categories-btn {
  margin-bottom: 24px;

  @media screen and (min-width: 768px) {
    margin-bottom: 32px;
  }
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;

  @media screen and (min-width: 768px) {
    margin-bottom: 32px;
  }
}

.favorite-category-btn {
  padding: 14px 18px;
  border-radius: 15px;
  border: 1px solid var(--gray-border-w);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.29;
  color: var(--gray-ul-w);
  transition: var(--trns-general);
  @media screen and (min-width: 768px) {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.25;
  }
}

.favorite-category-btn:hover,
.favorite-category-btn:focus {
  color: var(--white-w);
  background-color: var(--green);
  border: 1px solid var(--green);
}

.favorite-category-btn.active {
  border: 1px solid var(--green);
  background-color: var(--green);
  color: var(--white-w);
}

.favorite-category-btn.actived {
  border: 1px solid var(--green);
  background-color: var(--green);
  color: var(--white-w);
}
</style>
