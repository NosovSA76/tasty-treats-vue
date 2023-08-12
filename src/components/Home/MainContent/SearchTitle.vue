<template>
  <div class="con-search">
    <h2 class="text-search">Search</h2>
    <div class="con-inp">
      <input
        v-model="titleName"
        @input="titleName = $event.target.value"
        class="inp-search"
        type="text"
        name="searchQuery"
        autocomplete="off"
        placeholder="Enter Text"
        @focus="showOptionsList = true"
        @blur="onInputBlur"
        :maxlength="isInputDisabled ? titleName.length : 500"
      />
      <button type="button" aria-label="btn search" class="btn-search">
        <svg class="svg-search" width="18px" height="18px">
          <use
            class="svg-search-icon"
            href="@/assets/SPRITE.svg#icon-search-3-1"
          ></use>
        </svg>
      </button>
      <button
        type="button"
        aria-label="btn cancel"
        class="btn-cancel"
        v-show="titleName"
        @click="cleanSelectadTitle"
      >
        <svg class="svg-cacel" width="18px" height="18px">
          <use class="svg-cancel-icon" href="@/assets/SPRITE.svg#icon-x"></use>
        </svg>
      </button>
      <ul class="options-list" v-show="showOptionsList">
        <li
          v-for="(onTitle, index) in filteredTitles"
          :key="index"
          class="option"
        >
          <button
            v-if="onTitle"
            class="option-item"
            @click="setSelectedTitle(onTitle)"
          >
            {{ onTitle }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import { Notify } from "notiflix/build/notiflix-notify-aio";

export default {
  name: "SearchTitle",
  data() {
    return {
      titleName: "",
      titleForFilter: [],
      showOptionsList: false,
      isInputDisabled: false,
    };
  },
  methods: {
    onInputBlur() {
      setTimeout(() => {
        this.showOptionsList = false;
      }, 300);
    },

    setSelectedTitle(selectTitle) {
      this.titleName = selectTitle;
      this.getDate();
    },

    cleanSelectadTitle() {
      this.titleName = "";
      this.getDate();
    },

    getDate() {
      store.dispatch("set", { key: "title", value: this.titleName });
      store.dispatch("setFilterValue");
      store
        .dispatch("fetchRecipesAfterUpdate")
        .then()
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    titleForSelect() {
      if (store.state.titlesFilter.length > 0) {
        return store.state.titlesFilter.sort((a, b) => {
          return a.localeCompare(b, "en", { sensitivity: "base" });
        });
      } else {
        return store.state.titles.sort((a, b) => {
          return a.localeCompare(b, "en", { sensitivity: "base" });
        });
      }
    },

    filteredTitles() {
      return this.titleForSelect.filter((title) => {
        return title.toLowerCase().includes(this.titleName.toLowerCase());
      });
    },
  },
  watch: {
    titleName(newTitle) {
      if (
        newTitle &&
        store.state.titles.filter((tit) =>
          tit.toLowerCase().includes(newTitle.toLowerCase())
        ).length > 0
      ) {
        store.dispatch("set", { key: "query", value: newTitle });
        this.getDate();
        this.isInputDisabled = false;
      } else {
        if (newTitle) {
          this.isInputDisabled = true;
          Notify.failure(
            "The recipe with the name of your request is not in the database, try to correct the text!",
            {
              position: "center-center",
              cssAnimationStyle: "zoom",
              showOnlyTheLastOne: "true",
              cssAnimationDuration: "1000",
            }
          );
        } else {
          store.dispatch("set", { key: "query", value: newTitle });
          this.getDate();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
    top: 15px;
    left: 18px;
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
  outline: 0;
  border: 0;
  background-color: transparent;
  padding: 0;
  width: 18px;
  height: 18px;
  position: absolute;
  top: 15px;
  right: 18px;
}

.btn-cancel .svg-cancel-icon {
  stroke: var(--gray-descrip-w);
}
</style>
