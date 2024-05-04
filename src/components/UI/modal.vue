<template lang="">
  <div class="backdrop" v-if="show" @click="hideModal">
    <div @click.stop class="modal-container">
      <button @click.stop="hideModal" class="btn-close">
        <svg class="close" height="24" width="24" >
          <use class="close-icon" href="@/assets/SPRITE.svg#icon-x"></use>
        </svg>
      </button>
      <slot> </slot>
    </div>
  </div>
</template>
<script>
import store from "@/store/index";

export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods:{
    hideModal(){
      store.dispatch("setHeroModal",  false);
      store.dispatch("setRecieptModal",  false);
      document.body.style.overflow = 'auto';
    }
  }
};
</script>
<style lang="scss">
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--gray-title-w);
  transition: opacity var(--trns-modal), visibility var(--trns-modal);
  overflow: auto;
}
.modal-container {
  background: var(--white-w);
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all var(--trns-modal);
  transition-delay: 150ms;
  padding: 28px 20px;
  border: 1px solid var(--gray-border-w);
  // width: 335px;
  // height: 582px;
  border-radius: 15px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14),
  0px 1px 3px rgba(0, 0, 0, 0.12), 0px 2px 1px rgba(0, 0, 0, 0.2);
  @media screen and (min-width: 768px) {
    padding: 40px;
    // width: 440px;
    // height: 632px;
  }
}
.btn-close {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 0;
  transition: var(--trns-modal);

  @media screen and (min-width: 768px) {
    top: 16px;
    right: 16px;
  }
  &:hover {
    transform-origin: center center;
    transform: scale(1.8) rotate(180deg);
  }
}

.close {
  stroke: var(--black);
}
</style>
