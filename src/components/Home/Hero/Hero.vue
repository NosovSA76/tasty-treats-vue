<template>
  <section class="event-list">
    <div class="container hero-container">
      <div class="event-description animate__animated animate__fadeInLeft">
        <h1 class="event-title">
          Learn to Cook
          <span class="tasty-treats">Tasty Treats'</span> Customizable
          Masterclass
        </h1>
        <p class="event-text">
          TastyTreats - Customize Your Meal with Ingredient Options and
          Step-by-Step Video Guides.
        </p>
        <button type="button" class="event-order order-btn">Order now</button>
      </div>
      <div class="crunch animate__animated animate__fadeInRight">
        <div class="events swiper-wrapper">
          <Event></Event>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Event from "@/components/Home/Hero/Event";

export default {
  name: "Hero",
  components: {
    Event,
  },
};
</script>

<style lang="scss">
.container {
  min-width: 320px;
  margin: 0 auto;
  max-width: 375px;
  padding: 0 20px;
  @media screen and (min-width: 768px) {
    max-width: 768px;
    padding: 0 32px;
  }
  @media screen and (min-width: 1280px) {
    max-width: 1104px;
    padding: 0 12px;
  }
}

.event-list {
  padding-top: 91px;
  @media screen and (min-width: 768px) {
    padding-top: 93px;
  }
  @media screen and (min-width: 1280px) {
    margin: 0 auto;
    max-width: 1280px;
    padding-top: 94px;
    overflow: hidden;
  }
}

.event-description {
  margin-bottom: 48px;
  @media screen and (min-width: 768px) {
    width: 446px;
    margin-bottom: 64px;
    margin-right: 32px;
  }
}

.hero-container {
  overflow: hidden;
  @media screen and (min-width: 1280px) {
    display: flex;
    overflow: visible;
    align-items: center;
  }
}

.tasty-treats {
  font-style: oblique;
  color: var(--green);
  font-weight: 400;
}

.event-text {
  margin: 14px 0 28px;
  font-size: 14px;
  line-height: 18px;
  color: var(--black);
  @media screen and (min-width: 768px) {
    margin: 16px 0 32px;
    font-size: 16px;
    line-height: 24px;
    width: 408px;
  }
}

.event-order {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 15px;
  border: 1px solid var(--green);
  font-size: 14px;
  font-weight: 500;
  background-color: var(--white-w);
  transition: all var(--trns-general);
  color: var(--black);
  &:hover,
  &:focus {
    background-color: var(--green);
    color: var(--white-w);
  }
  @media screen and (min-width: 768px) {
    padding: 14px 28px;
  }
}

.events {
  display: flex;
}

.event {
  display: flex;
}

span.swiper-pagination-bullet {
  opacity: 1;
  background-color: black;
}

span.swiper-pagination-bullet-active {
  background: green;
  opacity: 1;
}
</style>
