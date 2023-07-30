<template>
  <swiper
    :effect="'creative'"
    :creativeEffect="{
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"
    :grabCursor="true"
    :loop="true"
    :speed=800 
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="pagination"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="event in events" :key="event._id">
      <div class="slide">
        <div class="event">
          <div
            class="cook"
            :style="{ backgroundImage: `url(${event.cook.imgUrl})` }"
          ></div>
          <div class="preview-deash-card">
            <div
              class="preview-deash"
              :style="{ backgroundImage: `url(${event.topic.previewUrl})` }"
            ></div>
            <p class="deash-name">
              {{ event.topic.name }}
            </p>
            <p class="deash-area">
              {{ event.topic.area }}
            </p>
          </div>
          <div
            class="deash"
            :style="{ backgroundImage: `url(${event.topic.previewUrl})` }"
          ></div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import axios from "axios";
import { EffectCube, Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

export default {
  name: "Event",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
        modules: [EffectCube, Pagination, Autoplay, Navigation],
       pagination: {
          clickable: true,
        //   renderBullet: function (index, className) {
        //     return '<span class="' + className + '">' + (index + 1) + '</span>';
        //   },
        },
    };
  },
  data() {
    return {
      events: [],
      isEventLoading: false,
    };
  },
  methods: {
    async fetchEvent() {
      try {
        const response = await axios.get(
          `https://tasty-treats-backend.p.goit.global/api/events`
        );
        console.log(response.data);
        if (response.status === 404) {
          throw new Error(response.status);
        }
        this.events = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isEventLoading = true;
      }
    },
  },
  mounted() {
    this.fetchEvent();
  },
};
</script>

<style>
.cook {
  display: block;
  height: 280px;
  width: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 15px;
}

.preview-deash-card {
  display: flex;
  margin: 0 10px;
  height: 280px;
  width: 200px;
  background-color: black;
  border-radius: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.deash-name {
  display: block;
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
  text-align: center;
  color: var(--gray-slider-title-w);
  text-transform: uppercase;
  width: 172px;
}

.deash-area {
  display: block;
  font-size: 8px;
  line-height: 12px;
  color: rgba(255, 255, 255, 0.2);
}

.preview-deash {
  display: block;
  height: 150px;
  width: 150px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 15px;
}

.deash {
  display: block;
  height: 280px;
  width: 185px;
  background-size: 564px;
  border-radius: 15px;
  background-position: 30%;
  background-color: var(--black);
}

.crunch {
  width: 515px;
  height: 442px;
}
.swiper {
  width: 889px;
  height: 484px;
  position: absolute;
  /* left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px; */
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

.swiper-slide .slide {
  display: block;
  width: 100%;
}
@media screen and (min-width: 768px) {
  .cook {
    height: 442px;
    width: 137px;
  }
  .preview-deash-card {
    margin: 0 16px;
    height: 442px;
    width: 351px;
  }
  .deash-name {
    width: 276px;
    font-size: 14px;
    line-height: 18px;
  }

  .deash-area {
    font-size: 12px;
    line-height: 14px;
  }

  .preview-deash {
    height: 262px;
    width: 262px;
  }
  .deash {
    background-size: 863px;
    height: 442px;
    width: 351px;
  }
}

@media screen and (min-width: 1280px) {
  .preview-deash {
    height: 271px;
    width: 304px;
  }
}
</style>
