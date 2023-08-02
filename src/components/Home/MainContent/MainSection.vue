<template lang="">
  <div class="main-section">
    <div class="container section-container">
      <div class="left-contaier animate__animated animate__fadeInLeft">
        <AllCategory></AllCategory>
        <Popular></Popular>
        <SearchTitle></SearchTitle>
        <!-- <include src="./partials/index/main_section/all_categories.html"></include>
              <include src="./partials/index/main_section/popularReciepes1.html"></include> -->
      </div>
      <div class="right-container animate__animated animate__fadeInRight">
        <div class="test">
          <Filter :propName="'time'" :propsName="'times'"></Filter>
          <Filter :propName="'area'" :propsName="'areas'"></Filter>
          <Filter :propName="'ingredient'" :propsName="'ingredients'"></Filter>
          
        </div>
        <AllRecipes></AllRecipes>
        <!-- <include src="./partials/index/main_section/search.html" ></include>
              <include src="./partials/index/main_section/cards.html"></include>
              <include src="./partials/pagination.html"></include> -->
      </div>

      <!-- <include src="./partials/index/main_section/popularRecipes.html"></include> -->
    </div>
  </div>
</template>
<script>
import Popular from "@/components/Home/MainContent/PopularReciepts";
import AllCategory from "@/components/Home/MainContent/AllCategory";
import AllRecipes from "@/components/Home/MainContent/CardsConteiner";
import Filter from "@/components/UI/SearchQuery";
import SearchTitle from "@/components/Home/MainContent/SearchTitle";

export default {
  name: "MainSection",
  components: {
    Filter,
    Popular,
    AllCategory,
    AllRecipes,
  },
};
</script>
<style lang="scss">
.test {
  display: flex;
}

.main-section {
  padding-top: 80px;
}

@media screen and (min-width: 768px) {
  .section-container {
    display: flex;
    gap: 32px;
  }
}

@media screen and (min-width: 1280px) {
  .section-container {
    display: flex;
    gap: 64px;
  }
}

@media screen and (min-width: 768px) {
  .left-contaier {
    padding-top: 26px;
  }
}
</style>
