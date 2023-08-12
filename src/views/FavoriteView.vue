<template>
  <div>
    <div class="FavoriteView"></div>
    <HeroFavorite></HeroFavorite>
    <FavoriteMain></FavoriteMain>
  </div>
</template>

<script>
import HeroFavorite from "@/components/Favorite/FavoriteHero";
import FavoriteMain from "@/components/Favorite/FavoriteMain"
export default {
  name: 'FavoriteView',
  components: {
    HeroFavorite,
    FavoriteMain
  },
};
</script>
