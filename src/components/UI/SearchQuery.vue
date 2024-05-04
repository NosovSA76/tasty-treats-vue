<template>
  <div class="item-select">
    <h2 class="text-search">{{ propName }}</h2>
    <div @click.stop>
    <div
      class="custom-select"
      @click.stop="optonForShow === 'Select' ? toggleOptionsList() : null"
    >
      <div  :class="{'selected-option': true, [propName]: true }">
        <span class="elem-prev">{{
          propName === "time" && optonForShow !== "Select"
            ? optonForShow + " min"
            : propName === "ingredient" && optonForShow !== "Select"
            ? optonForShow.name
            : optonForShow
        }}</span>

        <svg
          v-if="optonForShow === 'Select'"
          :class="{ active: showOptionsList }"
          class="search-arrow"
          width="18px"
          height="18px"
        >
          <use href="@/assets/SPRITE.svg#search-arrow"></use>
        </svg>
        <button
          @click="optonForShow !== 'Select' ? clearSelection() : null"
          :class="{ novisible: optonForShow === 'Select' }"
          class="clearSelection"
        >
          <img
            v-if="optonForShow !== 'Select'"
            width="18px"
            height="18px"
            src="@/assets/x.svg"
          />
        </button>
      </div>
      <ul
        v-show="showOptionsList && optonForShow === 'Select'"
        class="options-list"
        :class="{ active: showOptionsList }"
      >
        <li v-for="(option, index) in options" :key="index" class="option">
          <button
            v-if="option"
            class="option-item"
            @click="setSelectedOption(option)"
          >
            {{
              propName === "time"
                ? option + " min"
                : propName === "ingredient"
                ? option.name
                : option
            }}
          </button>
        </li>
      </ul>
    </div></div>
  </div>
</template>

<script>
import DropDownList from "@/components/UI/DropDownList";
import store from "@/store/index";
import { useRouter } from "vue-router";
import { computed, ref, onMounted } from 'vue';

function universalCompare(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  } else {
    return String(a).localeCompare(String(b), undefined, { numeric: true });
  }
}

export default {
  name: "Filter",
  props: ["propName", "propsName"],
  components: {
    DropDownList,
  },
  

  setup(props){
    const optonForShow = ref("Select");
    const showOptionsList = ref(false);
    const rootElement = ref(null);

     const clearSelection = () => {
      if (optonForShow !== "Select") {
        optonForShow.value = "Select";
        store.dispatch("set", { key: props.propName, value: "" });
        store.dispatch("setFilterValue");
        setSelectedOption();
      }
    };

    const toggleOptionsList = () =>{
      showOptionsList.value = !showOptionsList.value;
    };
    
    const setSelectedOption = (option) => {
      if (option) {
        optonForShow.value = option;
        if (props.propName !== "ingredient") {
          store.dispatch("set", { key: props.propName, value: option });
        } else {
          store.dispatch("set", { key: props.propName, value: option._id });
        }
        store.dispatch("setFilterValue");
      }
      store.dispatch("set", {key: "page", value: 1});
      
      store
        .dispatch("fetchRecipesAfterUpdate")
        .then(() => {
      })
        .catch((error) => {
          console.log(error);
        });
  };

  const optionsForSort = computed(() => {
    const filterPropName = props.propsName + "Filter";
    if (store.state[filterPropName].length > 0) {
      return store.state[filterPropName];
    } else {
      if (props.propsName === "ingredients") {
        return store.state[props.propsName].slice().sort((a, b) => {
          return universalCompare(a.name, b.name);
        });
      }
      return store.state[props.propsName];
    }
  });

    const options = computed(() => {
    return toArray(optionsForSort.value).slice().sort(universalCompare);
  });

  const toArray = (computedValue) => {
    return computedValue instanceof Array ? computedValue : [computedValue];
  };
  

  onMounted(() => {
    store.dispatch("setFilterValue");
  });
  
    return {
      optonForShow,
      showOptionsList,
      options,
      optionsForSort,
      clearSelection,
      toggleOptionsList,
      setSelectedOption,
    };
  }
 }
</script>

<style lang="scss" >
.novisible {
  z-index: -10;
}

.clearSelection {
  position: absolute;
  top: 15px;
  right: 18px;
  bottom: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  cursor: pointer;
}

.search-arrow {
  fill: var(--gray-title-w);
  transition: transform 0.3s ease;
}
.search-arrow.active {
  transform: rotate(180deg);
}

.text-search {
  color: var(--gray-title-w);
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 8px;
  text-transform: capitalize;
}

.custom-select {
  position: relative;
  display: inline-block;
}

.search-arrow {
  position: absolute;
  top: 15px;
  right: 18px;
  bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
  width: 20px;
  height: 20px;
  fill: var(--gray-title-w);
}


.custom-select .selected-option span {
  margin-right: 5px;
}

.custom-select .selected-option {
  background-color: var(--white-w);
  display: flex;
  align-items: center;
  max-width: 100%;
  width: 160px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    width: 125px;
  }
}

@media screen and (min-width: 768px) {
  .custom-select .area {
    width: 141px;
  }
}

.custom-select .options-list {
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 9;
  list-style: none;
  background-color: var(--white-d);
  border-top: none;
  display: none;
}

.options-list {
  z-index: 9;
  overflow-y: auto;
  position: absolute;
  height: 124px;
  padding-top: 6px;
  padding-left: 18px;
  padding-bottom: 6px;
  border-radius: 14px;
  background-color: var(--white-d);
  box-shadow: 0px 4px 36px 0px rgba(0, 0, 0, 0.02);
}

.custom-select .options-list .option {
  text-align: left;
  cursor: pointer;
}

.option:hover .option-item {
  color: var(--black);
  transition: var(--trns-general);
}

.selected-option.ingredient {
  background-color: var(--white-w);
  width: 188px;
  max-width: 100%;
  border-radius: 15px;
  padding: 14px 18px;
  cursor: pointer;
  border: 1px solid var(--gray-border-w);
  align-items: center;
  display: flex;
}

.option-item {
  width: 100%;
  padding: 0;
  text-align: left;
  color: var(--gray-ul-w);
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  line-height: 18px;
}

.selected-option {
  padding: 14px 18px;
  border-radius: 15px;
  border: 1px solid var(--gray-border-w);
}

.elem-prev {
  color: var(--gray-title-w);
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  line-height: 18px;
}

.elem-prev-active {
  color: var(--black);
}

.option {
  color: var(--gray-ul-w);
  font-size: 14px;
  font-family: Inter;
  font-weight: 500;
  line-height: 18px;
}

.option:not(:last-child) {
  margin-bottom: 8px;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: var(--gray-border-w);
}

.options-list.active {
  display: block;
}
</style>
