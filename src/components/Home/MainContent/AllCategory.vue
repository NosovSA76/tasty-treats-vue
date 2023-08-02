<template>
  <div class="category-container">
    <button class="all-category-button active" id="all-category-btn">
      All categories
    </button>
    <div class="categories-container">
      <ul class="category-list">
          <li class='cat-items' v-for="catedory in catedoryes" :key="catedory._id">
          <button class='category-btn'>{{catedory.name}}</button>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AllCategory",
  data() {
    return {
      catedoryes: [],
      isPopularLoading: false,
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(
          'https://tasty-treats-backend.p.goit.global/api/categories');

        console.log(response.data)
        if (response.status === 404) {
          throw new Error(response.status);
        }
        this.catedoryes = response.data
      } catch (error) {
        console.log(error);
      };
    }
  },
    mounted() {
      this.fetchCategories();
    },
  
}
</script>

<style lang="scss">
.category-container {
  max-height: 402px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    max-height: 496px;
    max-width: 176px;
    margin-bottom: 0;
  }
  @media screen and (min-width: 1280px) {
    max-height: 540px;
    max-width: 174px;
  }
}

.all-category-button {
  width: 176px;
  height: 50px;
  border: 1px solid var(--gray-border-w);
  background-color: var(--background-w);
  border-radius: 15px;
  font-family: var(--main-font);
  font-weight: 500;
  font-size: 18px;
  color: var(--gray-title-w);
  margin-bottom: 24px;
  cursor: pointer;
  padding: 14px 10px;
  transition: var(--trns-general);
  @media screen and (min-width: 768px) {
    margin-bottom: 30px;
  }
  @media screen and (min-width: 1280px) {
    width: 174px;
  }
  &:hover,
  &:focus {
  background-color: var(--green);
  color: var(--white-w);
  border: 1px solid var(--green);
}

}

.all-category-button.active {
  border: 1px solid var(--green);
  background-color: var(--green);
  color: var(--white-w);
}

.category-list {
  height: 198px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow-y: scroll;
  @media screen and (min-width: 768px) {
    width: 176px;
    height: 416px;
    gap: 24px;
  }
  @media screen and (min-width: 1280px) {
    width: 235px;
  }
}

.category-btn {
  border: none;
  background-color: transparent;
  color: var(--gray-ul-w);
  font-size: 14px;
  font-weight: 500;
  font-family: var(--main-font);
  cursor: pointer;
  padding: 0;
  transition: var(--trns-general);
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
}

.category-btn:hover {
  color: var(--green);
}

.category-btn.active {
  color: var(--green);
}
.onFocus {
  color: var(--green);
  background-color: var(--green);
}
</style>
