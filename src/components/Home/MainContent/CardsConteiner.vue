<template>
  <div class="container-cards">
    <ul class="cards_list">
      <ReceptCards :recipes="recipesForRender"></ReceptCards>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ReceptCards from "@/components/UI/Cards";

export default {
  name: "AllRecipes",
  components: {
    ReceptCards,
  },
  data() {
    return {
      recipesForRender: [],
    };
  },
  computed: {
    ...mapState(["recipes"]),
  },
  methods: {
    ...mapActions({
      set: "set",
      fetchRecipesAfterUpdate: "fetchRecipesAfterUpdate",
    }),
  },

  mounted() {
    this.fetchRecipesAfterUpdate();
  },
  watch: {
    recipes(newValue) {
      this.recipesForRender = newValue;
    },
  },
};
</script>

<style></style>
