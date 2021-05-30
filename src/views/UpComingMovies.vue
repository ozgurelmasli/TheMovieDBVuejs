<template>
  <h1>
    Upcoming
  </h1>
</template>



<script lang="ts">

import { mapActions } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  methods:{
    ...mapActions({
      getUpcomingMovies : 'getUpcomingMovies'
    })
  },
  async mounted() {
    const data = await this.getUpcomingMovies()
    console.log(data)
  }
})

</script>