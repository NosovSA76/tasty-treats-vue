<template lang="">
  <div class="con-search">
    <h2 class="text-search">Search</h2>
    <div class="con-inp">
      <input
        class="inp-search"
        type="text"
        name="searchQuery"
        autocomplete="off"
        placeholder="Enter Text"
      />
      <button type="button" aria-label="btn search" class="btn-search">
        <svg class="svg-search" width="18px" height="18px">
          <use
            class="svg-search-icon"
            href="@/assets/SPRITE.svg#icon-search-3-1"
          ></use>
        </svg>
      </button>
      <button type="button" aria-label="btn cancel" class="btn-cancel">
        <svg class="svg-cacel" width="18px" height="18px">
          <use class="svg-cancel-icon" href="@/assets/SPRITE.svg#icon-x"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchTitle",
};
</script>

<style lang="scss">
.con-search {
  margin-bottom: 14px;
  @media screen and (min-width: 768px) {
    margin-bottom: 0px;
  }
  .inp-search {
    background-color: var(--white-w);
    width: 100%;
    outline: 0;
    max-width: 335px;
    padding: 14px 48px;
    border-radius: 15px;
    border: 1px solid var(--gray-border-w);
    @media screen and (min-width: 768px) {
      max-width: 278px;
    }
  }
  .btn-search {
    outline: 0;
    border: 0;
    background-color: transparent;
    padding: 0;
    width: 18px;
    height: 18px;
    position: absolute;
    top: 15;
    left: 18;
  }

  .btn-search .svg-search-icon {
    fill: var(--gray-title-w);
    transition: var(--trns-general);
  }

  .svg-search {
    fill: var(--gray-title-w);
  }
  .text-search {
    color: var(--gray-title-w);
    font-size: 14px;
    font-family: Inter;
    font-weight: 500;
    line-height: 18px;
    margin-bottom: 8px;
  }

  .con-inp {
    position: relative;
  }
}

.inp-search:hover ~ .btn-search .svg-search-icon,
.inp-search:focus ~ .btn-search .svg-search-icon,
.inp-search:active ~ .btn-search .svg-search-icon {
  fill: var(--green);
  transition: var(--trns-general);
}

.btn-cancel {
  display: none;
  outline: 0;
  border: 0;
  background-color: transparent;
  padding: 0;
  width: 18px;
  height: 18px;
  position: absolute;
  top: 15;
  right: 18;
}

.btn-cancel .svg-cancel-icon {
  stroke: var(--gray-descrip-w);
}
</style>
