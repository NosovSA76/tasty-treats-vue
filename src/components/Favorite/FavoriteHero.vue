<template lang="">
<div class="section-fav-hero animate__animated animate__fadeInDown">
  <div class="container container-hero">
    <picture class="favorite-image">
      <source media="(min-width:1280px)" srcset="
        @/images/favorites_hero/favorites-hero-desk-1x.webp 1x,
        @/images/favorites_hero/favorites-hero-desk-2x.webp 2x
      ">
      <source media="(min-width:1280px)" srcset="
        @/images/favorites_hero/favorites-hero-desk-1x.png 1x,
        @/images/favorites_hero/favorites-hero-desk-2x.png 2x
      ">
      <source media="(min-width:1024px)" srcset="
        @/images/favorites_hero/favorites-hero-desk-1x.webp 1x,
        @/images/favorites_hero/favorites-hero-desk-2x.webp 2x
      ">
      <source media="(min-width:1024px)" srcset="
        @/images/favorites_hero/favorites-hero-desk-1x.png 1x,
        @/images/favorites_hero/favorites-hero-desk-2x.png 2x
      ">
      <source media="(min-width:768px)" srcset="
        @/images/favorites_hero/favorites-hero-tab-1x.webp 1x,
        @/images/favorites_hero/favorites-hero-tab-2x.webp 2x
      ">
      <source media="(min-width:768px)" srcset="
        @/images/favorites_hero/favorites-hero-tab-1x.png 1x,
        @/images/favorites_hero/favorites-hero-tab-2x.png 2x
      ">
      <source media="(max-width:767px)" srcset="
        @/images/favorites_hero/favorites-hero-mob-1x.webp 1x,
        @/images/favorites_hero/favorites-hero-mob-2x.webp 2x
      ">
      <source media="(max-width:767px)" srcset="
        @/images/favorites_hero/favorites-hero-mob-1x.png 1x,
        @/images/favorites_hero/favorites-hero-mob-2x.png 2x
      ">
      <img class="image-fav" src="@/images/favorites_hero/favorites-hero-mob-1x.png" alt="Favorite food" loading="lazy">
    </picture>
  </div>
</div>
</template>
<script>
export default {
    name: "HeroFavorite"
}
</script>
<style lang="scss">
    .section-fav-hero {
  margin-top: 52px;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    margin-top: 50px;
    margin-bottom: 64px;
  }
  @media screen and (min-width: 1280px) {
    margin-top: 40px;
  }
}


@media screen and (min-width: 1024px) {
  .image-fav {
    height: 356px;
  }
}
</style>