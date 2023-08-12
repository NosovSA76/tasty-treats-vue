<template>
  <div class="home">

    <Hero></Hero>
    <MainSection></MainSection>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Home/Hero/Hero'
import MainSection from '@/components/Home/MainContent/MainSection'



export default {
  name: 'HomeView',
  components: {
    Hero,
MainSection,
  },

}
</script>
