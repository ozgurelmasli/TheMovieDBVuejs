<template>
  <h1>
    Discover
  </h1>
</template>

<script lang="ts">

import { mapActions } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  methods:{
    ...mapActions({
      getDiscoverMovies : 'getDiscoverMovies'
    })
  },
  async mounted() {
    const data = await this.getDiscoverMovies()
    console.log(data)
  }
})

</script>