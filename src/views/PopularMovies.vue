<template>
  <h1>
    Popular Movies
  </h1>
</template>

<script lang="ts">

import { mapActions } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  methods:{
    ...mapActions({
      getPopularMovies : 'getPopularMovies'
    })
  },
  async mounted() {
    const data = await this.getPopularMovies()
    console.log(data)
  }
})

</script>

