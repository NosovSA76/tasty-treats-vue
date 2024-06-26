<template lang="">
  <li
    class="card_container" :class="[cardFavouritesClass]"
    v-for="recipe in recipes"
    :key="recipe._id"
  >
    <button aria-label="Favorite Button" class="card_favourites_btn button" @click="toggleFavorite(recipe)" @mouseup="removeFocus">
      <svg class="card_heart" :class="{ 'filled-heart': isFavorite(recipe) }" width="22" height="22" viewBox="0 0 32 32">
        <use href="@/assets/SPRITE.svg#icon-heart"></use>
      </svg>
    </button>
    <img
      v-if="recipe.preview"
      :src="recipe.preview"
      alt=""
      class="card_background"
    />
    <img v-else :src="notFound" alt="" class="card_background" />

    <div class="card_content-container">
      <div class="card_text-container">
        <h3 class="card_title">{{ recipe.title }}</h3>
        <p class="card_description">{{ recipe.description }}</p>
      </div>
      <div class="card_footer-container">
        <div class="card_star-rating">
          <p class="star-rating_value">{{ computedRating(recipe.rating) }}</p>
          <star
            v-for="index in 5"
            :key="index"
            :class="{ filled: index <= Math.round(recipe.rating) }"
          ></star>
        </div>
        <button @click="modalShow(recipe._id)" id="{{recipe._id}}" class="card_btn">See recipe</button>
      </div>
    </div>
  </li>
  
</template>
<script>
import Star from "@/components/UI/ReiringStar";

import store from "@/store/index";
import { save, load, remove } from '@/utils/localStorageHelpers';

export default {
  name: "ReceptCards",
  components: {
    Star,
  },
  data() {
  return {
    favorites: [],
    receiptRend: [], 
  };
},
  props: {
    recipes: {
      type: Array,
      required: true,
    },
      cardFavouritesClass: String,

  },
  mounted() {
   
  if (!Array.isArray(this.recipes)) {
      console.error("Властивість recipes має бути масивом.");
      return;
    }
    this.favorites = load('favorites') || [],
    store.dispatch("set", {key: "favoritesReciepts", value: this.favorites});
    this.recieptRend = this.recipes
    this.$watch(
      () => store.state.favoritesReciepts,
      () => {
        this.favorites = load('favorites') || [];
      }
    );

  },

  computed: {
    isFavorite() {
      return (recipe) =>
        this.favorites.some((favRecipe) => favRecipe._id === recipe._id);
    },
  },
    

  methods: {
    computedRating(rating) {
      return Math.round(rating * 10) / 10;
    },

    modalShow(id) {
      store.dispatch("FechFullRecipe", id);
      document.body.style.overflow = 'hidden';
    },

    toggleFavorite(recipe) {
      const existingRecipeIndex = this.favorites.findIndex(
        (favRecipe) => favRecipe._id === recipe._id
      );
      if (existingRecipeIndex !== -1) {
        this.favorites.splice(existingRecipeIndex, 1);
      } else {
        this.favorites.push(recipe);
      }
      save("favorites", this.favorites);
      store.dispatch("set", {key: "favoritesReciepts", value: this.favorites});
    },

    removeFocus() {
      document.activeElement.blur();
    },
    
 
  },
  onMounted() {
    this.favorites = load('favorites')
  },
  
};
</script>

<style lang="scss">
.container-cards {
  min-height: 287px;
  margin-top: 50px;
  @media screen and (min-width: 768px) {
    margin-top: 32px;
  }
}
@media screen and (min-width: 768px) {
  .cards_list {
    max-width: 496px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    row-gap: 32px;
  }
}
@media screen and (min-width: 1280px) {
  .cards_list {
    max-width: 782px;
  }
}
.card_container {
  position: relative;
  display: flex;
  flex-direction: column;
  
  max-width: 335px;
  height: 335px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  background: var(--gallery-gradient);
}
@media screen and (max-width: 768px) {
  .card_container {
    margin-bottom: 24px;
  }
}
@media screen and (min-width: 768px) {
  .card_container {
    max-width: calc((100% - 16px) / 2);
    height: 264px;
  }
}
@media screen and (min-width: 1280px) {
  .card_container {
    max-width: calc((100% - 32px) / 3);
    height: 287px;
  }
}
.card_favourites_btn {
  width: 22px;
  height: 22px;
  position: absolute;
  top: 16;
  right: 16;
}
.card_heart {
  display: block;
  fill: transparent;
  stroke: #f8f8f8;
  opacity: "1";
  stroke-linejoin: "round";
  stroke-linecap: "round";
  stroke-miterlimit: "4";
  stroke-width: "2.9091";
}
.card_favourites_btn:hover .card_heart {
  fill: var(--background-w);
}
.card_favourites_btn:focus .card_heart {
  fill: var(--background-w);
}
.heart_use {
  transition: fill var(--trns-general);
}
.card_background {
  position: absolute;
  z-index: -22;
  min-height: 100%;
  border-radius: 8px;
  width: 335px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card_content-container {
  margin-top: auto;
  padding: 16px;
}
.card_text-container {
  margin-top: auto;
  margin-bottom: 16px;
}
.card_title {
  color: var(--background-w);
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}

.card_description {
  color: var(--background-w);
  font-size: 12px;
  line-height: 16px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
.card_footer-container {
  display: flex;
}
.card_star-rating {
  display: flex;
  gap: 3px;
  align-items: center;
}
.star-rating_value {
  color: var(--background-w);
  font-size: 14px;

  font-weight: 500;
  line-height: 18px;
}

.card_btn {
  display: inline-block;
  background-color: var(--green);
  border-radius: 8px;
  padding: 8px 14px;
  font-family: var(--main-font);

  color: var(--background-w);
  font-size: 12px;
  font-weight: 500;
  margin-left: auto;
  transition: var(--trns-general);
}

.card_btn:focus,
.card_btn:hover {
  color: var(--black);
}

.is-hidden-cook {
  display: none;
}
.filled-heart {
  fill: var(--yellow-star);
}

</style>
