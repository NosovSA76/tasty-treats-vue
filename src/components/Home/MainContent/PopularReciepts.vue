<template>
  <div v-if="isPopularLoading">
    <div
      class="container-popular container-popular1 animate__animated animate__fadeInDown"
    >
      <h2 class="popular-recipes">POPULAR RECIPES</h2>
      <div class="container-recipies1">
        <div class="recipes" v-for="reciept in popular" :key="reciept._id">
          <img
          @click="modalShow(reciept._id)" 
            :id="reciept._id"
            class="popular-img"
            :src="reciept.preview"
            :alt="reciept.title"
          />
          <div class="popular-description">
            <h3 class="popular-title">{{ reciept.title }}</h3>
            <p class="popular-text">{{ reciept.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index";

export default {
  name: "Popular",
  data() {
    return {
      popular: [],
      isPopularLoading: false,
      img: [],
    };
  },
  methods: {
    async fetchPopular() {
      try {
        const response = await axios.get(
          `https://tasty-treats-backend.p.goit.global/api/recipes/popular`
        );
        if (response.status !== 200) {
          throw new Error(response.status);
        }
        this.popular = response.data;
        this.img = response.data.map((item) => item.preview);
        console.log(this.img);
      } catch (error) {
        console.log(error);
      } finally {
        this.isPopularLoading = true;
      }
    },
    modalShow(id){
      store.dispatch("FechFullRecipe", id );
      console.log(id)
    },
  },
  mounted() {
    this.fetchPopular();
  },
};
</script>

<style lang="scss">
.container-popular1 {
  @media screen and (max-width: 767px) {
    display: none;
  }
}

.container-popular2 {
  @media screen and (min-width: 768px) {
    display: none;
  }
}

.container-popular {
  margin-top: 80px;
  padding-bottom: 80px;
  @media screen and (min-width: 768px) {
    margin-top: 64px;
    width: 176px;
    padding-bottom: 0;
  }
  @media screen and (min-width: 1280px) {
    width: 235px;
  }
}

.popular-recipes {
  color: var(--black);
  font-size: 18px;
  font-family: Inter;
  font-weight: 600;
  line-height: 24px;
  text-transform: uppercase;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    margin-bottom: 32px;
  }
  @media screen and (min-width: 1280px) {
  }
}

.container-recipies {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.container-recipies1 {
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  @media screen and (min-width: 1280px) {
    display: flex;
    gap: 32px;
  }
}

.recipes {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
}

.popular-img {
  width: 64px;
  height: 64px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 16px;
  border-radius: 8px;
  cursor: pointer;

  @media screen and (min-width: 768px) {
    margin-right: 8px;
  }
  @media screen and (min-width: 1280px) {
    margin-right: 16px;
  }
}

.popular-title {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: var(--black);
  font-size: 14px;
  font-family: Inter;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  margin-bottom: 8px;

  @media screen and (min-width: 768px) {
    margin-bottom: 8px;
  }
  @media screen and (min-width: 1280px) {
  }
}

.popular-text {
  overflow: hidden;
  color: var(--gray-descrip-w);
  text-overflow: ellipsis;
  font-size: 12px;
  font-family: Inter;
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
