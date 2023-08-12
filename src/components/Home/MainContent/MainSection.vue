<template lang="">
  <div class="main-section">
    <div class="container section-container">
      <div class="left-contaier animate__animated animate__fadeInLeft">
        <AllCategory></AllCategory>
        <Popular></Popular>
      </div>
      <div class="right-container animate__animated animate__fadeInRight">
        <SelectConteiner></SelectConteiner>
        <AllRecipes></AllRecipes>
        <Pagination></Pagination>
      </div>
    </div>
    <Modal v-model:show="showRecipe">
      <div><FuulReciept></FuulReciept></div>
    </Modal>
  </div>
</template>
<script>
import Popular from "@/components/Home/MainContent/PopularReciepts";
import AllCategory from "@/components/Home/MainContent/AllCategory";
import AllRecipes from "@/components/Home/MainContent/CardsConteiner";
import SelectConteiner from "./SelectConteiner";
import Pagination from "@/components/Pagination";

export default {
  name: "MainSection",
  components: {
    Popular,
    AllCategory,
    AllRecipes,
    SelectConteiner,
    Pagination,
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
