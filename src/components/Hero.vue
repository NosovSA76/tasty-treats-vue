<template>
  <!-- <div class="hello">
    <div v-for="event in events" :key="event._id">
      <div>{{ event.cook.name }}</div>
    </div>
  </div> -->

<section class="event-list">
  <div class="container hero-container">
    <div class="event-description animate__animated animate__fadeInLeft">
      <h1 class="event-title">
        Learn to Cook
        <span class="tasty-treats">Tasty Treats'</span> Customizable Masterclass
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
      <div class="page"></div>
    </div>
  </div>
</section>


</template>

<script>
import Event from '@/components/Event'

export default {
  name: 'Hero',
    components: {
    Event,
  }
}
</script>

<style>
.container {
  min-width: 320px;
  margin: 0 auto;
  max-width: 375px;
  padding: 0 20px;
  /* outline: 2px solid red;
  outline-offset: -2px; */
}

.event-list {
  padding-top: 91px;
  }


.event-description {
  margin-bottom: 48px;
}

.hero-container {
  overflow: hidden;
}

.event-title .tasty-treats {
  font-style: oblique;
  color: green;
  font-weight: 400;
}

.event-text {
  margin: 14px 0 28px;
  font-size: 14px;
  line-height: 18px;
  color: black;
}

.event-order {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 15px;
  border: 1px solid green;
  font-size: 14px;
  font-weight: 500;
  background-color: white;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  color: black;
 }
  .event-order:hover, :focus {
    background-color: green;
    color: white;
}

.events {
  display: flex;
}

.event {
  display: flex;
}

.page {
  margin: 24px 0 0 155px;
}

span.swiper-pagination-bullet {
  opacity: 1;
  background-color: black;
}

span.swiper-pagination-bullet-active {
  background: green;
  opacity: 1;
}

@media screen and (min-width: 768px) {
    .container {
    max-width: 768px;
    padding: 0 32px;
  }

  .event-list {
    padding-top: 93px;
  }

  .event-description {
    width: 446px;
    margin-bottom: 64px;
    margin-right: 32px;
  }

  .event-text {
    margin: 16px 0 32px;
    font-size: 16px;
    line-height: 24px;
    width: 408px;
  }

  .event-order {
    padding: 14px 28px;
  }
}

@media screen and (min-width: 1280px) {
   .container {
    max-width: 1104px;
    padding: 0 12px;
  }

  .hero-container{
    display: flex;
    overflow: visible;
    align-items: center;
  }

  .event-list {
    margin: 0 auto;
    max-width: 1280px;
    padding-top: 94px;
    overflow: hidden;
  }
}
</style>