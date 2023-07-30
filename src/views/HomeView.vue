<template>
  <div class="home">
    <Hero/>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero'



export default {
  name: 'HomeView',
  components: {
    Hero,
  }
}
</script>
