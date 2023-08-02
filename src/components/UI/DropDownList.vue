<template>
<option value="{{ name }}}">{{  name}}</option>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },

};
</script>

<style>
</style>
