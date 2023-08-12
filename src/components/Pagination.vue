<template lang="">
  <div class="pagination-block" v-if="totalPages > 1">
    <div class="pag-button per-button" @click="setActivPage(1)">&lt&lt&lt</div>
    <div
      class="pag-button per-button"
      v-if="activPage > 1"
      @click="setActivPage(this.activPage - 1)"
    >
      &lt
    </div>
    <div
      class="pag-button per-button"
      v-if="!(this.activPage < 3)"
      @click="setActivPage(this.activPage - 2)"
    >
      ...
    </div>
    <div
      v-for="page in totalPages"
      :key="page"
      :class="[
        'pag-button', 'pag-page',
        { hidden: shouldHide(page) },
        { active: page === this.activPage },
      ]"
      @click="setActivPage(page)"
    >
      {{ page }}
    </div>
    <div
      class="pag-button after-button"
      v-if="activPage < totalPages - 1"
      @click="setActivPage(this.activPage + 2)"
    >
      ...
    </div>
    <div
      class="pag-button after-button"
      v-if="activPage < totalPages - 1"
      @click="setActivPage(this.activPage + 1)"
    >
      >
    </div>
    <div class="pag-button after-button" @click="setActivPage(totalPages)">
      >>>
    </div>
  </div>
</template>
<script>
import store from "@/store/index";
export default {
  name: "Paginetion",
  data() {
    return {
      activPage: 1,
    };
  },
  computed: {
    totalPages() {
      return store.state.totalPages;
    },
  },

  methods: {
    shouldHide(page) {
      return Math.abs(page - this.activPage) > 1;
    },

    updateActiveButton() {
      setTimeout(() => {
        const buttons = document.querySelectorAll('.pag-page');
        buttons.forEach((button, index) => {
          if (index + 1 === parseInt(this.activPage)) {
            button.classList.add("active");
          } else {
            button.classList.remove("active");
          }
        });
      }, 200);
    },

    setActivPage(page) {
      this.activPage = page;
      store.dispatch("set", { key: "page", value: this.activPage });
      this.updateActiveButton()
      store
        .dispatch("fetchRecipesAfterUpdate")
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.activPage = store.state.page;
    this.updateActiveButton();
    console.log(this.activPage);
    this.$watch(
      () => [
        store.state.category,
        store.state.time,
        store.state.area,
        store.state.ingredient,
      ],
      () => {
        this.activPage = 1;
        console.log(this.activPage);
      }
    );
  },
};
</script>
<style lang="scss">
.pagination-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
}
.pag-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.22222;
  display: flex;
  border: 1px solid var(--green);
  cursor: pointer;
  margin: 0 5px;
}
.pag-button.active,
.pag-button.after-button {
  background-color: var(--green);
}
.per-button {
  background-color: var(--black);
  color: gray;
}
.hidden {
  display: none;
}
.counter {
  width: 100px;
  height: 100px;
  border: 1px solid tomato;
}
</style>
