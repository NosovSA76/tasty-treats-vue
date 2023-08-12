<template lang="">
  <div class="modal-recipe">
    <div class="wrap-recipe">
 
      <iframe
        v-if="reciept && reciept.youtube"
        class="recipe-video"
        id="vimeo-player"
        :src="formattedYoutubeLink"
        frameborder="0"
        allow="autoplay; encrypted-media; fullscreen"
      ></iframe>


      <div class="recipe-container">
        <h2 class="title-recipe">{{ reciept.title }}</h2>
        <div class="recipe-rating">
          <div class="card_star-rating card_star-rating-modal">
            <p class="rating star-rating_value">{{ reciept.rating }}</p>
          </div>
          <p class="time-cooking">{{ reciept.time }} min</p>
        </div>
        <div class="overflow-scroll">
          <ul class="recipe-ingridient">
            <li
              v-for="ingredient in reciept.ingredients"
              :key="ingredient.id"
              class="list-item"
            >
              <p class="ingridient">{{ ingredient.name }}</p>
              <p class="portion">{{ ingredient.measure }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="tags">
      <li
        v-for="(tag, index) in reciept.tags"
        :key="index"
        class="teg-item"
      >
        <p>#{{ tag }}</p>
      </li>
    </ul>
    <div class="recipe-text">
        <p v-if="reciept && reciept.instructions" v-html="formatInstructions(reciept.instructions)"></p>
    </div>
    <div class="btn">
      <button type="button" class="btn-addToFavorite"  @click="toggleFavorite(reciept)">
        {{ !inFavorites ? 'Add to favorite' : 'Remove from favorite' }}</button>
      <button type="button" class="btn-giveARating">Give a rating</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import store from "@/store/index";
import { save, load, remove } from '@/utils/localStorageHelpers';

const favoritesForModal = ref([]);
const inFavorites = ref("")
const reciept = computed(() => store.state.fullRecipe);
const router = useRouter();

const formattedYoutubeLink = computed(() => {
  if (reciept.value && reciept.value.youtube) {
    const youtubeLink = reciept.value.youtube;
    const videoId = youtubeLink.substring(youtubeLink.length - 11);
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
});

const formatInstructions = (instructions) => {
  return instructions.split('.').join('<br>');
};

const toggleFavorite = (recipe) => {
  const existingRecipeIndex = favoritesForModal.value.findIndex(
    (favRecipe) => favRecipe._id === recipe._id
  );
  if (existingRecipeIndex !== -1) {
    fert = 
    favoritesForModal.value.splice(existingRecipeIndex, 1);
  } else {
    favoritesForModal.value.push(recipe);
  }
  save("favorites", favoritesForModal.value);
  store.dispatch("set", { key: "favoritesReciepts", value: favoritesForModal.value });
  if (router.currentRoute.value.path === '/favorites') {
    store.dispatch("setRecieptModal", false);
  }
  console.log(store.state.favoritesReciepts)
};

onMounted(() => {
  favoritesForModal.value = load('favorites') || [];

  if (!inFavorites.value) { // Якщо початкове значення ще не було встановлено
    inFavorites.value = favoritesForModal.value.some(
      (favRecipe) => favRecipe._id === reciept.value._id
      
    );console.log("333")
  }
});

</script>

<style lang="scss">
.modal-recipe {
  width: 335px;
  padding: 40px 20px;
  border-radius: 15px;
  background-color: var(--white-w);

  @media screen and(max-width:374px) {
    width: 320px;
  }
  @media screen and(min-width:768px) {
    width: 685px;
    padding: 32px;
  }
}

.wrap-recipe {
  margin-bottom: 40px;
  @media screen and(min-width:768px) {
    display: flex;
    column-gap: 32px;
    margin-bottom: 16px;
  }
}

.recipe-container {
  margin-top: 20px;
  @media screen and(min-width:768px) {
    margin-top: 0;
  }
}

.recipe-video {
  @media screen and(max-width:374px) {
    width: 285px;
  }
  border-radius: 8px;
  width: 295px;
  height: 295px;
  @media screen and(min-width:768px) {
    width: 332px;
    height: 285px;
  }
}

.title-recipe {
  font-size: 18px;
  line-height: calc(24 / 18);
  font-weight: 600;
  text-transform: uppercase;
  font-family: var(--main-font), sans-serif;
  margin-bottom: 14px;
  @media screen and(min-width:768px) {
    line-height: calc(22 / 18);
    margin-bottom: 16px;
  }
}

.recipe-rating {
  display: flex;
  margin-bottom: 32px;
}

.rating {
  font-size: 14px;
  line-height: calc(18 / 14);
  font-weight: 500;
  color: var(--gray-title-w);
  margin-right: 6px;
}

.time-cooking {
  font-size: 14px;
  line-height: calc(18 / 14);
  font-weight: 500;
  color: var(--gray-title-w);
  margin-left: 16px;
}

.overflow-scroll {
  height: 204px;
  overflow-y: auto;
}

.recipe-ingridient {
  display: flex;
  flex-wrap: wrap;
  row-gap: 24px;
}

.list-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 277px;

  @media screen and(max-width:374px) {
    width: 267px;
  }
  @media screen and(min-width:768px) {
    width: 238px;
  }
}

.list-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 100%;
  border: 1px solid var(--gray-border-modal-w);
}

.ingridient {
  font-size: 14px;
  line-height: calc(18 / 14);
  color: var(--black);
}

.portion {
  font-size: 14px;
  line-height: calc(18 / 14);
  color: var(--gray-title-w);
  width: 90px;
  text-align: right;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  margin-bottom: 24px;
  column-gap: 8px;
  @media screen and(min-width:768px) {
    margin-bottom: 32px;
  }
}

.teg-item {
  font-size: 12px;
  line-height: calc(14 / 12);
  font-weight: 500;
  color: var(--black);
  border: 1px solid var(--gray-border-w);
  border-radius: 35px;
  padding: 8px 16px;
}

.recipe-text {
  height: 162px;
  overflow-y: auto;
  font-size: 14px;
  line-height: calc(18 / 14);
  color: var(--gray-descrip-w);
  margin-bottom: 40px;
  @media screen and(min-width:768px) {
    margin-bottom: 32px;
  }
}

.btn {
  display: flex;
  column-gap: 14px;
  @media screen and(min-width:768px) {
    column-gap: 16px;
  }
}

.btn-addToFavorite {
  font-size: 14px;
  padding: 12px 24px;
  background-color: var(--green);
  color: var(--white-w);
  border-radius: 15px;
  transition: var(--trns-general);

  @media screen and(max-width:374px) {
    padding: 12px 17px;
  }
  @media screen and(min-width:768px) {
    padding: 14px 28px;
  }
}

.btn-addToFavorite:focus,
.btn-addToFavorite:hover {
  color: var(--black);
}

.btn-giveARating {
  font-size: 14px;
  font-weight: 500;
  padding: 12px 24px;
  background-color: transparent;
  color: var(--black);
  border-radius: 15px;
  border: 1px solid var(--green);
  transition: var(--trns-general);

  @media screen and(max-width:374px) {
    padding: 12px 17px;
  }
  @media screen and(min-width:768px) {
    padding: 14px 28px;
  }
}

.btn-giveARating:focus,
.btn-giveARating:hover {
  background: var(--green);
  color: var(--white-w);
}

.scroll-lock {
  overflow: hidden;
}

.star-modal {
  fill: rgba(5, 5, 5, 0.1);
}

.card_star-rating-modal {
  align-items: flex-end;
}

.filled {
  fill: var(--yellow-star);
  opacity: 1;
}
</style>
