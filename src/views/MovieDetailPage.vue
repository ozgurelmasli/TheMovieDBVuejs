<template>
  <h2>{{ movieId }}</h2>
</template>


<script>
import { defineComponent } from "vue";

export default defineComponent({
  props : ['movieId']
})

</script>