<template lang="">
  <div class="con-select">
    <SearchTitle></SearchTitle>
    <Filter :propName="'time'" :propsName="'times'"></Filter>
    <Filter :propName="'area'" :propsName="'areas'"></Filter>
    <Filter :propName="'ingredient'" :propsName="'ingredients'"></Filter>
  </div>
</template>
<script>
import Filter from "@/components/UI/SearchQuery";
import SearchTitle from "@/components/Home/MainContent/SearchTitle";
export default {
  name: "SelectConteiner",
  components: {
    Filter,
    SearchTitle,
  },
};
</script>
<style lang="scss">
.con-select {
  max-width: 335px;
  display: flex;
  flex-wrap: wrap;
  @media screen and (min-width: 768px) {
    max-width: 496px;
    gap: 16px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 780px;
  }
}
</style>
