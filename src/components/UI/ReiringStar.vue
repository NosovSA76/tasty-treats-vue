<template lang="">
  <svg class="star" width="12" height="12" id="all-stars" viewBox="0 0 14 14">
    <use href="@/assets/SPRITE.svg#icon-Star-1"></use>
  </svg>
</template>
<script>
export default {
  name: "Star",
};
</script>
<style lang="scss">
.star {
  width: 18px;
  height: 18px;
  fill: var(--gray-star-w);
  @media screen and (min-width: 768px) {
    width: 16px;
    height: 16px;
  }
  @media screen and (min-width: 1280px) {
    width: 18px;
    height: 18px;
  }
}

.filled {
  fill: var(--yellow-star);
  opacity: 1;
}
</style>
