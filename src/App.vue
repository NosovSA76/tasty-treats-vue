<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <Header v-if="isLoaded" />
    <router-view v-if="isLoaded" />
    <Modal v-model:show="cardData">
      <div><HeroModal></HeroModal></div>
    </Modal>
    <Modal v-model:show="showRecipe">
    <div><FuulReciept></FuulReciept></div>
    </Modal>
  </div>
</template>

<script>
import Header from "@/components/Header";
import store from "@/store/index";
import Modal from "@/components/UI/modal.vue";
import HeroModal from "@/components/Modals/OrderModals"
import FuulReciept from "@/components/Modals/RecieptModal.vue"


export default {
  components: {
    Header,
    HeroModal,
    Modal,
    FuulReciept,
  },
  data() {
    return {
      isLoading: true,
      isLoaded: false,
    };
  },
  computed: {
    cardData() {
      return store.state.heroModal; 
    },
    showRecipe() {
      return store.state.recieptModal; 
    },

  },
  mounted() {
    store.dispatch("fetchAllIngredients");
    store
      .dispatch("fetchAllRecipeValues")
      .then(() => {
        this.isLoading = false;
        this.isLoaded = true;
        console.log(store.state);
      })
      .catch((error) => {
        this.isLoading = false;
        console.log(error);
      });
  },
};
</script>

<style>
@import "animate.css";
@import "@/styles/_variables.scss";
#app {
  height: 100%;
  font-family: Inter, sans-serif;
  font-weight: 400;
  color: var(--black);
  background-color: var(--background-w);
}

.header {
  padding-top: 24px;
  @media screen and (min-width: 768px) {
    padding-top: 28px;
  }
}

@media screen and (min-width: 1280px) {
  header {
    padding-top: 40px;
  }
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */

html,
body {
  height: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

p:last-child {
  margin-bottom: 0;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  color: currentColor;
  text-decoration: none;
}

button {
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
}

img {
  display: block;
  width: 100%;
  height: auto;
}

* {
  box-sizing: border-box;
}

input,
button,
textarea,
select {
  font: inherit;
}

.main-content {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 1 auto;
}
</style>
